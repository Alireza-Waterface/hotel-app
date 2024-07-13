import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

import ButtonIcon from './ButtonIcon';
import { useToggleTheme } from "../context/ThemeContext";

function ThemeToggle () {
	const { isDark, toggleTheme } = useToggleTheme();
	
	return (
		<ButtonIcon onClick={toggleTheme}>
			{ isDark ? <HiOutlineSun title="Switch to light-mode" /> : <HiOutlineMoon title="Switch to dark-mode" /> }
		</ButtonIcon>
	)
}

export default ThemeToggle;