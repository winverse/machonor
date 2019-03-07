import * as React from 'react';
import styled from 'styled-components';
import { fromNow } from 'lib/common';
import oc from 'open-color';
import { media } from 'styles/styleUtils';

const Positional = styled.div`
  margin-top: 1rem;
`;

const Title = styled.h1`
  padding: 0;
  margin: 0;
  margin-top: 1rem;
  @media ${media.xxMobile} {
    font-size: 1.2rem;
    margin-top: 0;
  }
`;

const BodyHeader = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-flow: row nowrap;
  padding: 0.5rem;
  border-bottom: 1px solid ${oc.gray[1]};
  font-size: 0.8rem;
  letter-spacing: -1px;
  color: ${oc.gray[5]};
  vertical-align: bottom;
`;

const Date = styled.div`

`;

const TotalViews = styled.div`
  margin-left: 0.5rem;
`;

const LikesCount = styled.div`
  margin-left: 0.5rem;
`;

const Body = styled.div`
  margin-top: 2rem;
  word-break: break-word;
  line-height: 1.6;
  font-size: 13px;
  color: #333;
  font-family: sans-serif, Arial, Verdana, "Trebuchet MS";
  letter-spacing: 0px;
  @media ${media.xxMobile} {
    font-size: 12px;
    img {
      max-width: 100%;
      height: auto !important;
    }
  }
`;

interface IProps {
  title: string;
  body: string;
  date: string;
  totalViews: number;
  commentCount: number;
}

class PostBody extends React.Component<IProps> {
  public onSetEditor = () => {
    const { body } = this.props;
    const editor = document.getElementById('editor');
    if (!editor) return;
    editor.innerHTML = body;
  }
  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.body !== this.props.body) {
      this.onSetEditor();
    }
  }
  public componentDidMount() {
    this.onSetEditor();
  }
  public render() {
    const { title, date, totalViews, commentCount } = this.props;
    return (
      <Positional className="PostBody">
        <Title>{title}</Title>
        <BodyHeader>
          <Date>{fromNow(date)}</Date>
          <TotalViews>조회 {totalViews}</TotalViews>
          <LikesCount>댓글 {commentCount}</LikesCount>
        </BodyHeader>
        <Body id="editor"/>
      </Positional>
    );
  }
}

export default PostBody;