import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext()

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if(!context){
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState( () => {
        const savedTheme  = localStorage.getItem('theme')
        return savedTheme || 'dark'
    })

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark')
        document.documentElement.classList.add(theme)

        localStorage.setItem('theme', theme)
    },[theme])

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
            </ThemeContext.Provider>
    )
}