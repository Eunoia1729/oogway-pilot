import { commentClass, replyClass } from '../../../styles/feed'
import ReplyHeader from './ReplyHeader'
import ReplyEngagementBar from './ReplyEngagementBar'
import firebase from 'firebase/compat/app'
import { staticPostData } from '../../../utils/types/params'
import { PreviewDecider } from '../../Utils/PreviewDecider'
import { isValidURL } from '../../../utils/helpers/common'
import Linkify from 'react-linkify'
import { Link } from '@mui/material'
import React from 'react'

type ReplyProps = {
    replyOwner: string
    postId: string | string[] | undefined
    commentId: string
    replyId: string
    reply: firebase.firestore.DocumentData
    parentPostData: staticPostData
}

const Reply: React.FC<ReplyProps> = ({
    replyOwner,
    postId,
    commentId,
    replyId,
    reply,
    parentPostData,
}) => {
    return (
        <div className={replyClass.outerDiv}>
            {/* Header */}
            <ReplyHeader
                postId={postId as string}
                commentId={commentId}
                replyId={replyId}
                authorUid={replyOwner}
                name={reply.author}
                email={reply.email}
                timestamp={reply.timestamp}
                parentPostData={parentPostData}
            />

            <div className={replyClass.innerDiv}>
                <div className={replyClass.dividerLeft} />
                <div className={replyClass.dividerRight}>
                    {/* Body */}
                    <div className={replyClass.body}>
                        {isValidURL(reply.message) ? (
                            <Linkify
                                componentDecorator={(
                                    decoratedHref,
                                    decoratedText,
                                    key,
                                ) => (
                                    <Link
                                        className={
                                            replyClass.bodyDescription + ' ml-0'
                                        }
                                        target="blank"
                                        href={decoratedHref}
                                        key={key}
                                    >
                                        {decoratedText}
                                    </Link>
                                )}
                            >
                                <p className={replyClass.bodyDescription}>
                                    {reply.message}
                                </p>
                            </Linkify>
                        ) : (
                            <p className={replyClass.bodyDescription}>
                                {reply.message}
                            </p>
                        )}

                        {isValidURL(reply.message || '') && (
                            <PreviewDecider
                                textToDetect={reply.message || ''}
                            />
                        )}
                    </div>

                    {/* Engagement */}
                    <ReplyEngagementBar
                        postId={postId as string}
                        commentId={commentId}
                        replyId={replyId}
                    />
                </div>
            </div>
        </div>
    )
}

export default Reply
