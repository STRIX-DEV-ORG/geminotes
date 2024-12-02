// import { useState, useCallback } from 'react';
import styled from 'styled-components';
import GeminoteButton from '@geminotes/atoms/GeminoteButton';
import applyTypography from '@geminotes/themes/applyTypography';

interface MainToolbarNavbarProps {
    currentNoteId?: string;
}

const StyledNavbarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({ theme }) => theme.spacing(2)};
`;

const StyledTitle = styled.h1`
    color: ${({ theme }) => theme.palette.text};
    font-size: ${({ theme }) => applyTypography(theme.typography.h1)};
    text-align: center;
    margin: auto;
`;

const GeminoteMainToolbarNavbar = ({
    currentNoteId,
}: MainToolbarNavbarProps) => {
    const handleGoBack = () => {};

    return (
        <header>
            <nav>
                <StyledNavbarWrapper>
                    {currentNoteId && (
                        <GeminoteButton
                            color="primary"
                            variant="text"
                            onClick={handleGoBack}
                            aria-label="Clear search"
                        >
                            <i className="icon-back"></i>
                        </GeminoteButton>
                    )}
                    <StyledTitle>My Geminotes</StyledTitle>
                </StyledNavbarWrapper>
            </nav>
        </header>
    );
};

export default GeminoteMainToolbarNavbar;
