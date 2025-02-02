import React, { Fragment, useRef } from 'react'

// Styles and components
import PostCard from './Post'

// Custom hook
import useIntersectionObserver from '../../../hooks/useIntersectionObserver'

// Queries
import { useInfinitePostsQuery } from '../../../queries/posts'
import {
    GeneratePostCardLoaders,
    PostCardLoader,
} from '../../Loaders/PostContentLoader'
import EndOfFeedMessage from '../../Utils/EndOfFeedMessage'
import { FirebasePost } from '../../../utils/types/firebase'

function PostsAPI() {
    // Instantiate infinite posts query
    const {
        status,
        data,
        error,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfinitePostsQuery()

    // Instantiate intersection observer
    const loadMoreRef = useRef<HTMLDivElement>(null)
    useIntersectionObserver({
        target: loadMoreRef,
        onIntersect: fetchNextPage,
        enabled: !!hasNextPage,
    })

    return (
        <>
            {status === 'loading' ? (
                // Post Placeholders While Content Fetching
                <GeneratePostCardLoaders n={5} />
            ) : status === 'error' ? (
                // TODO: need nicer error component
                // @ts-ignore
                <div>Error: {error.message}</div>
            ) : (
                <>
                    {/* Infinite Scroller / Lazy Loader */}
                    {data?.pages.map(page => (
                        <Fragment key={page?.lastTimestamp?.seconds}>
                            {/* If posts collection exists */}
                            {page.posts &&
                                page.posts.map((post: FirebasePost) => (
                                    <PostCard
                                        key={post.id}
                                        id={post.id!}
                                        authorUid={post.uid}
                                        name={post.name}
                                        message={post.message}
                                        description={post.description}
                                        isCompare={post.isCompare}
                                        timestamp={post.timestamp}
                                        postImage={post.postImage}
                                        comments={null}
                                        isCommentThread={false}
                                        previewImage={post?.previewImage || ''}
                                        isAnonymous={post?.isAnonymous || false}
                                    />
                                ))}
                        </Fragment>
                    ))}

                    {/* Lazy Loader Sentinel and End of Feed*/}
                    {isFetchingNextPage || hasNextPage ? (
                        <PostCardLoader ref={loadMoreRef} />
                    ) : (
                        <EndOfFeedMessage
                            topMessage={
                                data?.pages[0].posts
                                    ? "You've read it all..."
                                    : 'No Posts...'
                            }
                            bottomMessage={
                                data?.pages[0].posts
                                    ? 'Now share your wisdom!'
                                    : 'Be the first!'
                            }
                        />
                    )}
                </>
            )}
        </>
    )
}

export default PostsAPI
