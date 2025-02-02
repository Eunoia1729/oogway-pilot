import { useState, useEffect, FC } from 'react'
import { Switch } from '@headlessui/react'
import { Moon } from 'react-feather'
import { useTheme } from 'next-themes'
import { toggleThemeClass } from '../../styles/header'

interface ToggleThemeProps {
    hasText: boolean
}

const ToggleTheme: FC<ToggleThemeProps> = ({ hasText }) => {
    const { theme, setTheme } = useTheme()
    const [enabled, setEnabled] = useState(false)

    // Maintain state on (re)mount
    useEffect(() => {
        theme === 'light' ? setEnabled(false) : setEnabled(true)
    }, [theme])

    // Helper function to update theme and switch state
    const handleChangeTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
        setEnabled(!enabled)
    }

    // Set specs
    const enabledColor = 'bg-primary'
    const disabledColor = 'bg-secondary/30'

    return (
        <a className={toggleThemeClass.a} onClick={handleChangeTheme}>
            {hasText && (
                <>
                    <Moon className="mx-1" /> Night Mode
                </>
            )}
            <Switch
                checked={enabled}
                onChange={handleChangeTheme}
                className={
                    toggleThemeClass.switchSlide +
                    (enabled ? ` ${enabledColor}` : ` ${disabledColor}`)
                }
            >
                <span className="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    className={
                        toggleThemeClass.switchButton +
                        (enabled ? ' translate-x-3' : ' translate-x-0')
                    }
                ></span>
            </Switch>
        </a>
    )
}

ToggleTheme.defaultProps = {
    hasText: false,
}

export default ToggleTheme