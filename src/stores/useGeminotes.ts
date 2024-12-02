import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import Geminote from '@geminotes/models/Geminote';
import { GeminoteProps } from '@geminotes/props';

interface GeminotesStore {
    notes: Geminote[];
    currentNote: Geminote | null;
    setCurrentNote: (id: string) => void;
    addNote: (
        title: string,
        content: string[],
        tags: string[],
        sources: Record<string, any>
    ) => void;
    editNote: (id: string, updates: Partial<GeminoteProps>) => boolean;
    deleteNote: (id: string) => void;
    findNote: (params: {
        id?: string;
        title?: string;
        tags?: string[];
    }) => Geminote | null;
}

const useGeminotes = create<GeminotesStore>()(
    persist(
        (set, get) => ({
            notes: [],
            currentNote: null,

            setCurrentNote: (id) => {
                const note = get().findNote({ id });
                set({ currentNote: note });
            },

            addNote: (title, content, tags, sources) => {
                const newNote = new Geminote(title, content, tags, sources);
                const notes = get().notes;
                notes.unshift(newNote);
                set({ notes });
            },

            editNote: (id, updates) => {
                const notes = get().notes;

                const note = notes.find((note) => note.id === id);
                if (!note) return false;

                note.update(updates);
                set({ notes, currentNote: note });

                return true;
            },

            deleteNote: (id) => {
                const notes = get().notes.filter((note) => note.id !== id);
                set({ notes });
            },

            findNote: ({ id, title, tags }) => {
                const notes = get().notes;
                if (id) return notes.find((note) => note.id === id) || null;
                if (title)
                    return (
                        notes.find(
                            (note) =>
                                note.title.toLowerCase() === title.toLowerCase()
                        ) || null
                    );
                if (tags) {
                    const filteredNotes = notes.filter((note) =>
                        note.tags.some((tag) => tags.includes(tag))
                    );
                    return filteredNotes.length > 0 ? filteredNotes[0] : null;
                }
                return null;
            },
        }),
        {
            name: 'geminotes',
            storage: createJSONStorage(() => localStorage, {
                reviver: (key, value) => {
                    if (key === 'notes' && Array.isArray(value)) {
                        return value.map((noteData: GeminoteProps) => {
                            return Geminote.fromJSON(noteData);
                        });
                    }
                    if (
                        value &&
                        typeof value === 'string' &&
                        (key === 'createdAt' || key === 'updatedAt')
                    )
                        return new Date(new Date(value).setHours(0, 0, 0, 0));
                    else return value;
                },
            }),
        }
    )
);

export default useGeminotes;
