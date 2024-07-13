import { createContext, useContext, useEffect } from "react";

import useLocalStorageState from '../hooks/useLocalStorageState';

const ThemeContext = createContext();

function ThemeProvider({children}) {
	const [isDark, setIsDark] = useLocalStorageState(false, 'isDark');

	const toggleTheme = () => setIsDark(prev => !prev);

	useEffect(() => {
		document.documentElement.classList.toggle('dark-mode');
	}, [isDark]);

	return (
		<ThemeContext.Provider
			value={{
				isDark,
				toggleTheme,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
}

function useToggleTheme() {
	const context = useContext(ThemeContext);

	if (!context) throw new Error('Theme context can not be used outside its provider');

	return context;
}

export { ThemeProvider, useToggleTheme };