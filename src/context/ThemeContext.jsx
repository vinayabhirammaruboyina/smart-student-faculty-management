import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const ThemeContext = createContext();

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }) {
  const [themePreference, setThemePreference] = useState(() => {
    const saved = localStorage.getItem('sms-theme');
    return saved || 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState(() => {
    const saved = localStorage.getItem('sms-theme');
    if (saved && saved !== 'system') return saved;
    return getSystemTheme();
  });

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (themePreference === 'system') {
        setResolvedTheme(getSystemTheme());
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themePreference]);

  // Apply theme to DOM
  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [resolvedTheme]);

  // Persist preference
  useEffect(() => {
    localStorage.setItem('sms-theme', themePreference);
  }, [themePreference]);

  const setTheme = useCallback((pref) => {
    setThemePreference(pref);
    if (pref === 'system') {
      setResolvedTheme(getSystemTheme());
    } else {
      setResolvedTheme(pref);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  const setLight = useCallback(() => setTheme('light'), [setTheme]);
  const setDark = useCallback(() => setTheme('dark'), [setTheme]);
  const setSystem = useCallback(() => setTheme('system'), [setTheme]);

  return (
    <ThemeContext.Provider value={{
      theme: resolvedTheme,
      themePreference,
      setTheme,
      toggleTheme,
      setLight,
      setDark,
      setSystem,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
