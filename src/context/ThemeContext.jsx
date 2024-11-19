import { createContext, useContext, useEffect } from "react";

import useLocalStorageState from '../hooks/useLocalStorageState';

const ThemeContext = createContext();

function ThemeProvider({children}) {
	const [isDark, setIsDark] = useLocalStorageState(JSON.parse(localStorage.getItem('isDark')) || true, 'isDark');

	const toggleTheme = () => setIsDark(prev => !prev);

	useEffect(() => {
		const rootClassList = document.documentElement.classList;
		if (isDark) rootClassList.add('dark-mode');
		else rootClassList.remove('dark-mode');
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