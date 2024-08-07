import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";

import { HiOutlineUser } from "react-icons/hi2";
import ThemeToggle from "./ThemeToggle";

const StyledHeaderMenu = styled.ul`
	display: flex;
	gap: 0.4rem;
`;

function HeaderMenu() {
	const navigate = useNavigate();

	return (
		<StyledHeaderMenu>
			<li>
				<ThemeToggle />
			</li>
			<li>
				<ButtonIcon title="Account" onClick={() => navigate('/account')}>
					<HiOutlineUser />
				</ButtonIcon>
			</li>
			<li title="Logout"><Logout /></li>
		</StyledHeaderMenu>
	);
}

export default HeaderMenu;