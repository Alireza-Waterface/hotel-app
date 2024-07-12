import styled from "styled-components";

import HeaderMenu from "./HeaderMenu";
import UserAvatar from '../features/authentication/UserAvatar';

const StyledHeader = styled.header`
	padding: 1.2rem 4.8rem;
	border-bottom: 1px solid var(--color-grey-100);
	background-color: var(--color-grey-0);
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

function Header() {


	return (
		<StyledHeader>
			<UserAvatar />
			<HeaderMenu />
		</StyledHeader>
	);
}

export default Header;