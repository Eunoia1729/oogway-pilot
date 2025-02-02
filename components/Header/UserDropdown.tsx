import React from 'react'

// JSX and styling
import {Avatar} from '@mui/material'
import Button from '../Utils/Button'
import ProfileButton from './ProfileButton'
import {loginButtons} from '../../styles/login'
import {userDropdownClass} from '../../styles/header'
import ToggleTheme from './ToggleTheme'
import LogoutButton from './LogoutButton'
import DropdownMenu from '../Utils/DropdownMenu'


// Auth0
import {useUser} from '@auth0/nextjs-auth0'
import {useRouter} from 'next/router'

// Recoil state
import {userProfileState} from '../../atoms/user'
import {useRecoilValue} from 'recoil'

// User profile

const UserDropdown: React.FC = () => {
    const router = useRouter()
    const {user, isLoading} = useUser()
    const userProfile = useRecoilValue(userProfileState)

    // Listen to userProfile rather than using static values from recoil
    // Why? Recoil only updates state on refreshes so when the user first
    // const [authorProfile] = useProfileData(userProfile.uid)

    // Navigate to user settings
    // TODO: Implement page
    // const goToUserSettings = () => {
    //     router.push(`/settings/${userProfile.uid}`)
    // }

    const signIn = () => {
        router.push('/api/auth/login')
    }

    // Dropdown menu props
    // TODO: use user profile image (if exists) from recoil state
    const menuButton = (
        <Avatar
            className={userDropdownClass.avatar}
            src={userProfile?.profilePic || user?.picture || undefined}
        />
    )

    {/*TODO: uncomment settings when its done. */
    }
    const menuItems = [
        <ProfileButton key={"ProfileButton"} hasText={true} uid={userProfile?.uid}/>,
        // <SettingsButton hasText={true} onClick={needsHook}/>,
        <LogoutButton key={"LogoutButton"} hasText={true}/>,
        <ToggleTheme key={"ToggleTheme"} hasText={true}/>,
    ]

    //<button className="" onClick={signIn}>
    //    Sign In
    //</button>

    return !isLoading && !user ? (
        <Button
            onClick={signIn}
            addStyle={loginButtons.loginButtonWFullStyle}
            text="Sign In"
            keepText={true}
            icon={null}
            type="button"
        />
    ) : (
        <DropdownMenu
            menuButtonClass={userDropdownClass.menuButtonClass}
            menuItemsClass={userDropdownClass.menuItemsClass}
            menuButton={menuButton}
            menuItems={menuItems}
        />
    )
}

export default UserDropdown
