import React from 'react';
import styled from 'styled-components';
import SliderView from './SliderView';

interface Props {
    html: string;
}

const HtmlContents: React.FC<Props> = ({ html }) => {
    const P_TAGS_REG = new RegExp(
        /<(p|(pre)|(ol)|(ul)|(iframe)|(opengraph))(.*?)<\/(p|(pre)|(ol)|(ul)|(iframe)|(opengraph))>/gs,
    );
    const IMG_TAGS_REG = new RegExp(/data:image[\\"']?([^>\\"']+)[\\"']*">/g);
    const htmlTag = html.match(P_TAGS_REG);

    const TagToInnerHTML = (tags: any) => {
        const imgObject = {};
        tags.map((m: any, i: number) => {
            const ImgReg = m.match(IMG_TAGS_REG);
            if (ImgReg) {
                if (ImgReg.length > 1) {
                    imgObject[i] = ImgReg;
                }
            }
            return m;
        });
        return tags.map((m: any, i: number) =>
            imgObject[i] ? (
                <InnerHTML key={i}>
                    <SliderView list={imgObject[i]} />
                </InnerHTML>
            ) : (
                <InnerHTML
                    key={i}
                    dangerouslySetInnerHTML={{
                        __html: m,
                    }}></InnerHTML>
            ),
        );
    };

    return <Wrapper>{TagToInnerHTML(htmlTag)}</Wrapper>;
};

const Wrapper = styled.div`
    padding: 0 1rem;

    img {
        max-width: 100%;
    }
`;

const InnerHTML = styled.div`
    .slick-slide img {
        max-height: 50vh;
        margin: 0 auto;
    }
    .slick-dots {
        bottom: -40px;
    }
    .slick-dots,
    .slick-dots > li {
        padding: 0;
        &::before {
            color: transparent;
        }
    }
`;

export default HtmlContents;
