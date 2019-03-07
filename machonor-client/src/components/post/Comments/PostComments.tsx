import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';
import { MdSubdirectoryArrowRight } from 'react-icons/md';

import Comment from './Comment';

const Wrapper = styled.div`
  width: 100%;
  background: white;
`;

const BuyerWrapper = styled.div`
  background-color: white;
  border-top: 1px solid ${oc.gray[4]};
  padding: 1rem 2rem;
`;

export const LineOne = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

export const Username = styled(Link)`
  color: ${oc.red[5]};
  font-weight: 500;
  font-size: 0.9rem;
  margin-right: 0.5rem;
`;

export const Time = styled.div`
  color: ${oc.gray[6]};
  font-size: 0.8rem;
`;

export const Text = styled.div`
  margin-top: 1rem;
  font-size: 0.95rem;
`;

const Reply = styled.div`
  margin-top: 2rem;
`;

const CommentWrapper = styled.div`
  padding: 1rem 2rem;
  background-color: white;
  border-bottom: 1px solid ${oc.gray[4]};
`;

const InputBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  padding: 1rem;
  border-top: 1px solid ${oc.gray[4]};
  border-bottom: 1px solid ${oc.gray[4]};
  svg {
    font-size: 0.8rem;
    color: ${oc.gray[5]};
    margin-right: 0.25rem;
  }
`;

const Input = styled.div`
  background-color: white;
  border: 0.8px solid ${oc.gray[4]};
  width: 100%;
  height: 55px;
  border-radius: 5px;
  cursor: pointer;
`;

const InputText = styled.div`
  padding: 1rem;
  color: ${oc.gray[4]};
  font-size: 0.8rem;
  font-weight: 600;
`;

const SeeMoreBox = styled.div`
  margin-top: 1rem;
  width: 100%;
`;

const SeeMore = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid ${oc.gray[4]};
  width: 100%;
  height: 55px;
  cursor: pointer;
  user-select: none;
  &:hover {
    background-color: ${oc.gray[2]};
  }
  &:active {
    background-color: ${oc.gray[1]};
  }
`;

const SeeMoreText = styled.div`
  color: ${oc.gray[4]};
  font-size: 0.9rem;
  font-weight: 600;
`;

interface ISeeMore {
  text: string;
  onFolding?(): void;
  onReadMore?(): void;
}

const SeeMoreButton: React.SFC<ISeeMore> = ({ text, onReadMore, onFolding }) => {
  return (
    <SeeMoreBox className="SeeMoreComponent">
      <SeeMore onClick={onReadMore || onFolding}>
        <SeeMoreText>{text}</SeeMoreText>
      </SeeMore>
    </SeeMoreBox>
  );
};

interface IProps {
  post: any;
  visible: boolean;
}

interface IState {
  limit: number;
}

class PostComments extends React.Component<IProps, IState> {
  public box: any;

  constructor(props: IProps) {
    super(props);
    this.box = React.createRef();
  }

  public state = {
    limit: 5,
  };

  public onReadMore = () => {
    this.setState({
      limit: this.state.limit + 5,
    });
  }

  public onFolding = () => {
    const { box } = this;
    this.setState({
      limit: 5,
    });
    window.scrollTo(0, box.current.offsetTop - 100);
  }

  public render() {
    const { onReadMore, onFolding } = this;
    const { limit } = this.state;
    const { post, visible } = this.props;
    const { comments, inShort } = post;

    const commentList = comments.length !== 0 && comments.slice(0, limit).map(
      (comment: any) => (
        <Comment 
          key={comment.id} 
          username={comment.username} 
          text={comment.text}
        />
      ),
    );

    if (!visible) return null;
      
    return (
      <Wrapper className="PostComment">
        <BuyerWrapper ref={this.box}>
          <Text>{inShort}</Text>
          <Reply>답글 {comments.length}</Reply>
        </BuyerWrapper>
        <CommentWrapper>
          <InputBox>
            <MdSubdirectoryArrowRight />
            <Input>
            <InputText>로그인을 해주세요</InputText>
            </Input>
          </InputBox>
          {commentList}
          {limit < comments.length && <SeeMoreButton onReadMore={onReadMore} text="답글 더보기"/>}
          {(comments.length > 5 && limit >= comments.length) && <SeeMoreButton onFolding={onFolding} text="답글 접기"/>}
        </CommentWrapper>
      </Wrapper>
    );
  }
} 

export default PostComments;