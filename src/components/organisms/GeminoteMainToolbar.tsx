import { useState, useEffect } from 'react';
import styled from 'styled-components';

import GeminoteCard from './GeminoteCard';
import useGeminotes from '@geminotes/stores/useGeminotes';
import GeminoteSearchBar from '@geminotes/molecules/GeminoteSearchBar';
import GeminoteButton from '@geminotes/atoms/GeminoteButton';
import Geminote from '@geminotes/models/Geminote';
import GeminoteMainToolbarNavbar from '@geminotes/molecules/GeminoteMainToolbarNavbar';

interface GeminoteMainToolbarProps {
    onNoteId?: (value: string) => void;
}

const StyledMenuWrapper = styled.div`
    display: grid;
    gap: ${({ theme }) => theme.spacing(3)};
`;

const StyledCardWrapper = styled.div`
    min-height: 20rem;
`;

const NoResultsText = styled.p`
    color: ${({ theme }) => theme.palette.info};
    text-align: center;
    padding: ${({ theme }) =>
        theme.spacing(2)}; /* Opcional, agrega algo de espacio */
`;

const GeminoteMainToolbar = ({ onNoteId }: GeminoteMainToolbarProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNotes, setFilteredNotes] = useState<Geminote[]>([]);

    const { findNote, addNote } = useGeminotes();

    const handleDelete = (noteId: string) => {
        useGeminotes.getState().deleteNote(noteId);
        const allNotes = useGeminotes.getState().notes;
        setFilteredNotes(allNotes);
    };

    const handleSearch = (value: string) => {
        setSearchQuery(value);

        if (value.trim() === '') {
            const allNotes = useGeminotes.getState().notes;
            setFilteredNotes(allNotes);
        } else {
            const resultByTitle = findNote({ title: value });
            const resultByTags = findNote({ tags: [value] });

            const result = resultByTitle || resultByTags;
            if (result) {
                setFilteredNotes([result]);
            } else {
                const allNotes = useGeminotes.getState().notes;
                const notes = allNotes.filter(
                    (note) =>
                        note.title
                            .toLowerCase()
                            .includes(value.toLowerCase()) ||
                        note.tags.some((tag) =>
                            tag.toLowerCase().includes(value.toLowerCase())
                        )
                );
                setFilteredNotes(notes);
            }
        }
    };

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredNotes(useGeminotes.getState().notes);
        }
    }, []);

    const handleCreateNote = () => {
        const newNote = {
            title: 'Untitled',
            content: [],
            tags: [],
            sources: {},
        };
        addNote(newNote.title, newNote.content, newNote.tags, newNote.sources);
        setFilteredNotes(useGeminotes.getState().notes);
    };

    const handleSelectNote = (noteId: string) => {
        if (onNoteId) {
            onNoteId(noteId);
        }
    };

    return (
        <StyledMenuWrapper>
            <GeminoteMainToolbarNavbar currentNoteId=""></GeminoteMainToolbarNavbar>
            <GeminoteSearchBar
                placeholder="Search geminotes..."
                onSearch={handleSearch}
            />

            {/* Botón para crear la nueva nota */}
            <GeminoteButton
                style={{ width: '100%' }}
                onClick={handleCreateNote}
            >
                Create Geminote <i className="icon-add"></i>
            </GeminoteButton>

            {/* Mostrar las notas filtradas */}
            <StyledCardWrapper>
                {filteredNotes.length > 0 ? (
                    filteredNotes.map((note) => (
                        <GeminoteCard
                            key={note.id}
                            id={note.id}
                            title={note.title}
                            tags={note.tags}
                            updatedAt={note.updatedAt}
                            onDelete={handleDelete}
                            onSelect={handleSelectNote}
                        />
                    ))
                ) : (
                    <NoResultsText>No results found</NoResultsText>
                )}
            </StyledCardWrapper>
        </StyledMenuWrapper>
    );
};

export default GeminoteMainToolbar;
