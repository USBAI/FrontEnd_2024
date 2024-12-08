import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = {
  name: string;
  gradientFrom: string;
  gradientTo: string;
  textColor: string;
  buttonGradient: string;
  accentColor: string;
};

const themes: Theme[] = [
  {
    name: 'pink',
    gradientFrom: 'from-pink-500',
    gradientTo: 'to-purple-500',
    textColor: 'text-pink-500',
    buttonGradient: 'from-pink-500 to-purple-500',
    accentColor: 'pink',
  },
  {
    name: 'orange',
    gradientFrom: 'from-orange-500',
    gradientTo: 'to-red-500',
    textColor: 'text-orange-500',
    buttonGradient: 'from-orange-500 to-red-500',
    accentColor: 'orange',
  },
  {
    name: 'darkblue',
    gradientFrom: 'from-blue-600',
    gradientTo: 'to-indigo-800',
    textColor: 'text-blue-600',
    buttonGradient: 'from-blue-600 to-indigo-800',
    accentColor: 'blue',
  },
  {
    name: 'white',
    gradientFrom: 'from-gray-100',
    gradientTo: 'to-gray-200',
    textColor: 'text-gray-800',
    buttonGradient: 'from-gray-100 to-gray-200',
    accentColor: 'gray',
  },
];

type ThemeContextType = {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
  themes: Theme[];
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('store-theme');
    return savedTheme ? JSON.parse(savedTheme) : themes[0];
  });

  useEffect(() => {
    localStorage.setItem('store-theme', JSON.stringify(currentTheme));
  }, [currentTheme]);

  const value = {
    currentTheme,
    setTheme: setCurrentTheme,
    themes,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};