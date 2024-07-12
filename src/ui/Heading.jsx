import styled, { css } from "styled-components";

const Heading = styled.h1`
	font-weight: 600;
	text-align: left;

	${
		props =>
			props.as === 'h1' &&
			css`
				font-size: 3rem;
			`
	}
	
	${
		props =>
			props.as === 'h2' &&
			css`
				font-size: 2.5rem;
			`
	}

	${
		props =>
			props.as === 'h3' &&
			css`
				font-size: 2rem;
			`
	}

	${
		props =>
			props.position === 'center' &&
			css`
				text-align: center;
			`
	}	
`;

export default Heading;