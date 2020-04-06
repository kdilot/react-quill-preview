/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import HtmlContents from './HtmlContents';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

interface Props {
    html: string;
}

const DISPLAY = [
    [360, 640],
    [412, 725],
    [768, 1024],
];

const Preview: React.FC<Props> = ({ html }) => {
    const [size, setSize] = useState([360, 640]);
    const reSize = (type: number) => {
        setSize(DISPLAY[type]);
    };

    useEffect(() => setSize(DISPLAY[0]), []);

    return (
        <Container>
            <DeviceGroup>
                <Tag
                    onClick={() => reSize(0)}
                    className={size === DISPLAY[0] ? 'selected' : ''}>
                    360*640
                </Tag>
                <Tag
                    onClick={() => reSize(1)}
                    className={size === DISPLAY[1] ? 'selected' : ''}>
                    412*725
                </Tag>
                <Tag
                    onClick={() => reSize(2)}
                    className={size === DISPLAY[2] ? 'selected' : ''}>
                    768*1024
                </Tag>
            </DeviceGroup>
            <PreviewContainer
                className="ql-container ql-snow "
                style={{ width: size[0], height: size[1] }}>
                <Scrollbars
                    className="ql-editor"
                    style={{ width: size[0], height: size[1] }}>
                    {html ? (
                        <HtmlContents html={html} />
                    ) : (
                        <WrapperNon>
                            <div className="preview">PREVIEW</div>
                        </WrapperNon>
                    )}
                </Scrollbars>
            </PreviewContainer>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-top: 25px;
`;

const DeviceGroup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.5rem;
`;

const Tag = styled.div`
    font-size: 0.8rem;
    padding: 5px;
    border: 1px solid black;
    color: black;
    cursor: pointer;
    & + div {
        margin-left: 5px;
    }
    &:hover {
        background: black;
        color: white;
    }
    &.selected {
        background: black;
        color: white;
    }
`;

const PreviewContainer = styled.div`
    border: 0.2rem solid black;
    border-radius: 4px;
`;

const WrapperNon = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    background: darkgray;
    color: #fff;
    font-size: 2rem;
    font-weight: 600;
    border-radius: 3px;
    padding-top: 10%;

    div {
        font-size: 0.8rem;
        width: 100%;
        padding: 0 5%;
        font-weight: normal;
    }
    .preview {
        font-size: 3rem;
        font-weight: bold;
        margin-bottom: 1rem;
        text-align: center;
    }
    .title {
        margin-top: 1rem;
        margin-bottom: 0.25rem;
        font-weight: bold;
    }
`;

export default Preview;
