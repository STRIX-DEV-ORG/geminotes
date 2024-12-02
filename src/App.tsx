import { useState } from 'react';
import { ThemeProvider } from 'styled-components';

import ZustandHydration from '@geminotes/atoms/ZustandHydration';
import DefaultTheme from '@geminotes/themes/DefaultTheme';
import GlobalStyle from '@geminotes/themes/GlobalStyles';
import GeminoteContainer from '@geminotes/atoms/GeminoteContainer';
import GeminoteEditor from '@geminotes/organisms/GeminoteEditor';
import GeminoteMainToolbar from '@geminotes/organisms/GeminoteMainToolbar';
import GeminoteTypography from '@geminotes/atoms/GeminoteTypography';
import GeminoteButton from '@geminotes/atoms/GeminoteButton';
import useGeminotes from './stores/useGeminotes';
import useApi from './stores/useApi';

function App() {
    const [currentNoteId, setCurrentNoteId] = useState('');

    const handleNoteId = (noteId: string) => {
        setCurrentNoteId(noteId);
    };

    const { summarize, summary, extractKeyPoints, keyPoints } = useApi();
    const { notes } = useGeminotes();

    const selectedNote = notes.find((note) => note.id === currentNoteId);

    return (
        <ZustandHydration>
            <ThemeProvider theme={DefaultTheme}>
                <GlobalStyle />
                <GeminoteContainer>
                    {/* Renderiza el toolbar si no hay nota seleccionada */}
                    {!currentNoteId && (
                        <GeminoteMainToolbar onNoteId={handleNoteId} />
                    )}

                    {/* Renderiza el editor si hay una nota seleccionada */}
                    {currentNoteId && selectedNote && (
                        <GeminoteEditor
                            id={selectedNote.id}
                            title={selectedNote.title}
                            tags={selectedNote.tags}
                            content={selectedNote.content}
                            updatedAt={selectedNote.updatedAt}
                        />
                    )}
                </GeminoteContainer>
                <GeminoteButton onClick={() => summarize()}>
                    Summarize
                </GeminoteButton>
                <GeminoteButton onClick={() => extractKeyPoints()}>
                    Extract key points
                </GeminoteButton>
                <GeminoteTypography variant="body1">
                    {summary}
                </GeminoteTypography>
                <GeminoteTypography variant="body1">
                    {keyPoints}
                </GeminoteTypography>
            </ThemeProvider>
        </ZustandHydration>
    );
}

export default App;
