import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

const EditorWrapper = styled.div`
    .ql-editor {
        min-height: 200px;
        font-size: 1rem;
        line-height: 1.5;
        background: white;
    }
`;

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link'],
        ['clean']
    ],
};

export default function RichTextEditor({ value, onChange }) {
    return (
        <EditorWrapper>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
            />
        </EditorWrapper>
    );
} 