// import { useState, useCallback } from 'react';
import styled from 'styled-components';
import GeminoteButton from '@geminotes/atoms/GeminoteButton';

interface EditorNavbarProps {
    currentNoteId?: string;
}

const StyledNavbarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({ theme }) => theme.spacing(2)};
`;

const StyledNavbarActionsWrapper = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing(2)};
`;

const GeminoteEditorNavbar = ({}: EditorNavbarProps) => {
    const handleOpenMenu = () => {};

    return (
        <header>
            <nav>
                <StyledNavbarWrapper>
                    <GeminoteButton
                        color="primary"
                        variant="text"
                        onClick={handleOpenMenu}
                        aria-label="Open menu"
                    >
                        <i className="icon-menu"></i>
                    </GeminoteButton>
                    <StyledNavbarActionsWrapper>
                        <GeminoteButton
                            color="primary"
                            variant="text"
                            onClick={handleOpenMenu}
                            aria-label="Open options"
                        >
                            <i className="icon-options"></i>
                        </GeminoteButton>
                        <GeminoteButton
                            color="primary"
                            variant="text"
                            onClick={handleOpenMenu}
                            aria-label="Save note"
                        >
                            <i className="icon-save"></i>
                        </GeminoteButton>
                        <GeminoteButton
                            color="primary"
                            variant="text"
                            onClick={handleOpenMenu}
                            aria-label="Add note"
                        >
                            <i className="icon-add"></i>
                        </GeminoteButton>
                    </StyledNavbarActionsWrapper>
                </StyledNavbarWrapper>
            </nav>
        </header>
    );
};

export default GeminoteEditorNavbar;
