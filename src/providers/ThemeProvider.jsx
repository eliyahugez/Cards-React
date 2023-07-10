import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { node } from 'prop-types';
import React, { useCallback, useContext, useMemo, useState } from 'react';

const ThemeContext = React.createContext(null);

export const ThemeProvider = ({ children }) => {
    let [isDark, setDark] = useState(false);

    const toggleDarkMode = useCallback(() => setDark((prev) => !prev), 
        [setDark]) ;
    
    const theme = createTheme({
        palette: {
            mode: isDark ? 'dark' : 'light',
        }
    });

    const value = useMemo(() => {
        return { isDark, toggleDarkMode };
    }, [isDark, toggleDarkMode])

    return (
        <MuiThemeProvider theme={theme}>
            <ThemeContext.Provider value={value}>
                {children}
            </ThemeContext.Provider>
        </MuiThemeProvider>
    )
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within a ThemeProvider');
    return context;
}

ThemeProvider.propTypes = {
    children: node.isRequired,
}
