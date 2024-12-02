import styled from 'styled-components';
import { useState } from 'react';

import GeminoteTypography from '@geminotes/atoms/GeminoteTypography';
import GeminoteEditableTypography from '@geminotes/molecules/GeminoteEditableTypography';
import GeminoteEditableTag from '@geminotes/molecules/GeminoteEditableTag';
import GeminoteTagsInput from '@geminotes/molecules/GeminoteTagsInput';
import GeminotePaper from '@geminotes/atoms/GeminotePaper';
import { GeminoteProps } from '@geminotes/props';
// import { NEW_LINE, SOURCE_REFERENCE } from '@geminotes/utils/validation';
import getFormattedDate from '@geminotes/utils/getFormattedDate';
import GeminoteButton from '@geminotes/atoms/GeminoteButton';
import GeminoteEditorNavbar from '@geminotes/molecules/GeminoteEditorNavbar';

import useGeminotes from '@geminotes/stores/useGeminotes';

interface GeminoteEditorProps extends Omit<GeminoteProps, 'createdAt'> {}

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(4)};
    margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const StyledEditorHeader = styled.div`
    padding: 0 ${({ theme }) => theme.spacing(4)};
`;

const StyledEditorContent = styled(GeminotePaper)`
    & p:not(:last-child)) {
        margin-bottom: ${({ theme }) => theme.spacing(1)};
    }
`;

const StyledEditorFooter = styled.div`
    padding: 0 ${({ theme }) => theme.spacing(4)};
`;

const StyledTagsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing(1)};
    margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const GeminoteEditor = ({
    id,
    title,
    tags,
    content,
    updatedAt,
}: GeminoteEditorProps) => {
    const [editableTitle, setEditableTitle] = useState<string>(
        title || 'Untitled'
    );
    const [editableContent, setEditableContent] = useState<string[]>(
        content || ['Start typing...']
    );
    const [editableTags, setEditableTags] = useState<string[]>(tags || []);

    const { editNote } = useGeminotes();

    const handleTitleChange = (newTitle: string) => {
        setEditableTitle(newTitle);
    };

    const handleTitleEdit = (newTitle: string) => {
        handleTitleChange(newTitle);
    };

    const handleContentChange = (index: number, newText: string) => {
        const updatedContent = [...editableContent];
        updatedContent[index] = newText;
        setEditableContent(updatedContent);
    };

    const handleContentEdit = (index: number, newText: string) => {
        handleContentChange(index, newText);
    };

    const handleTagAddition = (newTag: string) => {
        const hasTag = editableTags.includes(newTag);
        if (hasTag) return;
        setEditableTags([...editableTags, newTag]);
    };

    const handleTagDeletion = (index: number) => {
        const updatedTags = [...editableTags];
        updatedTags.splice(index, 1);
        setEditableTags(updatedTags);
    };

    const handleTagEdit = (index: number, newTag: string) => {
        const updatedTags = [...editableTags];
        updatedTags[index] = newTag;
        setEditableTags(updatedTags);
    };

    const handleSave = () => {
        editNote(id, {
            title: editableTitle,
            content: editableContent,
            tags: editableTags,
        });
    };

    return (
        <StyledWrapper>
            {/* {id} */}
            <GeminoteEditorNavbar />
            <StyledEditorHeader>
                <GeminoteEditableTypography
                    name="note-title"
                    variant="h1"
                    style={{ marginBottom: '0.5rem ' }}
                    onEdit={handleTitleEdit}
                >
                    {editableTitle}
                </GeminoteEditableTypography>
                <StyledTagsWrapper>
                    {editableTags?.map((tag, index) => (
                        <GeminoteEditableTag
                            key={tag}
                            onEdit={(newTag) => handleTagEdit(index, newTag)}
                            onDelete={() => handleTagDeletion(index)}
                        >
                            {tag}
                        </GeminoteEditableTag>
                    ))}
                    <GeminoteTagsInput onCreate={handleTagAddition} />
                </StyledTagsWrapper>
                <GeminoteTypography variant="body1" color="info">
                    Updated at {getFormattedDate(updatedAt) || 'unknown date'}
                </GeminoteTypography>
            </StyledEditorHeader>
            <StyledEditorContent>
                {editableContent &&
                    editableContent.map((line, index) => (
                        <GeminoteEditableTypography
                            name="note-content"
                            key={index}
                            index={index}
                            onEdit={(newText) =>
                                handleContentEdit(index, newText)
                            }
                        >
                            {line}
                        </GeminoteEditableTypography>
                    ))}
            </StyledEditorContent>
            <StyledEditorFooter>
                <GeminoteButton onClick={handleSave}>Save</GeminoteButton>
            </StyledEditorFooter>
        </StyledWrapper>
    );
};

export default GeminoteEditor;
