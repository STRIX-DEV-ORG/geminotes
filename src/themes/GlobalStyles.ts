import { createGlobalStyle } from 'styled-components';
import Fontello from './Fontello';

const GlobalStyle = createGlobalStyle`
    ${Fontello}
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        border: none;
        outline: none;
        color: inherit;
        list-style: inherit;
        line-height: inherit;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        text-transform: inherit;
        text-decoration: inherit;
    }

    html {
        font-size: 16px;
        scroll-behavior: smooth;
    }

    body {
        cursor: ${({ theme }) => theme.cursor.default};
        color: ${({ theme }) => theme.palette.text};
        background-color: ${({ theme }) => theme.palette.background};
        list-style: none;
        text-transform: none;
        text-decoration: none;
        overflow-x: hidden;

        ${({ theme }) => theme.applyTypography(theme.typography.body1)}
    }

    a,
    button {
        cursor: ${({ theme }) => theme.cursor.pointer};
    }
`;

export default GlobalStyle;
