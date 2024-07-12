import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import useUser from "../features/authentication/useUser";

import Spinner from "./Spinner";

const FullPage = styled.div`
	height: 100dvh;
	width: 100dvw;
	background-color: var(--color-grey-50);
	display: grid;
	place-items: center;
`;

function ProtectedRoute({children}) {
	const navigate = useNavigate();

	const { isLoading, isAuthenticated } = useUser();

	useEffect(() => {
		if (!isAuthenticated && !isLoading) {
			navigate('/login');
		}
	}, [isAuthenticated, isLoading, navigate]);

	if (isLoading) return <FullPage><Spinner /></FullPage>

	if (isAuthenticated) return children;
}

export default ProtectedRoute;