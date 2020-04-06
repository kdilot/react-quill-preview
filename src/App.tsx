import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Preview from 'components/Preview';
import styled from 'styled-components';

const App: React.FC = () => {
    const [value, setValue] = useState<string>('');
    return (
        <Container>
            <h1>React Quill Editor Preview</h1>
            <ContentsLayout>
                <WriteLayout>
                    <ReactQuill
                        theme={'snow'}
                        onChange={(c, d, s, e) => {
                            setValue(c === '<p><br></p>' ? '' : c);
                        }}
                        value={value}
                        modules={Modules}
                    />
                </WriteLayout>
                <Br />
                <Preview html={value} />
            </ContentsLayout>
        </Container>
    );
};

const Modules = {
    toolbar: [
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike'],
        [
            { align: [false, 'center', 'right'] },
            { list: 'ordered' },
            { list: 'bullet' },
        ],
        [{ color: [] }, { background: [] }],
        ['image', 'link', 'video'],
        ['code-block'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: auto;
    margin: 5rem 10rem;
`;

const ContentsLayout = styled.div`
    display: flex;
    flex-direction: row;
`;

const WriteLayout = styled.div`
    max-width: 800px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .quill {
        display: inline-block;
        width: 800px;
        height: 700px;
    }
    .ql-toolbar {
        background: #eaecec;
    }
`;

const Br = styled.div`
    width: 50px;
`;

export default App;
