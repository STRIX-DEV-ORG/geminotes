import { useState, useCallback } from 'react';
import styled from 'styled-components';
import GeminoteButton from '@geminotes/atoms/GeminoteButton';
import GeminoteTooltip from '@geminotes/atoms/GeminoteTooltip';

interface SearchBarProps {
    placeholder?: string;
    onSearch?: (value: string) => void;
    debounceTime?: number;
}

const StyledSearchBar = styled.div<{}>`
    display: flex;
    gap: ${({ theme }) => theme.spacing(2)};
    align-items: center;
    padding: ${({ theme }) => theme.spacing(1)};
    border: ${({ theme }) => theme.border.width} solid
        ${({ theme }) => theme.palette.info};
    border-radius: ${({ theme }) => theme.border.radius};
    background-color: ${({ theme }) => theme.palette.white};
    transition: border-color
        ${({ theme }) =>
            `${theme.animation.timing.normal} ${theme.animation.timingFunction.ease}`};

    &:focus-within {
        border-color: ${({ theme }) => theme.palette.primary};
    }
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-grow: 1;
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left: ${({ theme }) => theme.spacing(1)};
    cursor: pointer;
`;

const GeminoteSearchBar = ({
    placeholder = 'Search...',
    onSearch,
    debounceTime = 300,
}: SearchBarProps) => {
    const [inputValue, setInputValue] = useState('');
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setInputValue(value);

            if (timer) {
                clearTimeout(timer);
            }

            // Configuramos el nuevo temporizador
            const newTimer = setTimeout(() => {
                if (onSearch) {
                    onSearch(value);
                }
            }, debounceTime);

            setTimer(newTimer);
        },
        [timer, onSearch, debounceTime]
    );

    const handleClear = () => {
        setInputValue('');
        if (onSearch) {
            onSearch('');
        }
    };

    return (
        <StyledSearchBar>
            <IconWrapper>
                <i className="icon-search"></i>
            </IconWrapper>
            <InputWrapper>
                <input
                    type="text"
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={handleChange}
                    style={{
                        border: 'none',
                        width: '100%',
                    }}
                />
            </InputWrapper>
            {inputValue && (
                <GeminoteTooltip title="Remove Search">
                    <GeminoteButton
                        color="primary"
                        variant="text"
                        onClick={handleClear}
                        aria-label="Clear search"
                    >
                        <i className="icon-cancel"></i>
                    </GeminoteButton>
                </GeminoteTooltip>
            )}
        </StyledSearchBar>
    );
};

export default GeminoteSearchBar;
