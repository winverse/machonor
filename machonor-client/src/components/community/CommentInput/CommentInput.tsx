import * as React from 'react';
import styled, { css } from 'styled-components';
import Textarea from 'react-textarea-autosize';
import oc from 'open-color';
import { shadow, media } from 'styles/styleUtils';
import Logged from './Logged';
import { MdSubdirectoryArrowRight } from 'react-icons/md';
import { ILoggedInfo } from 'store/modules/user';

interface IStyled {
  visible?: boolean;
  focus?: boolean;
  reply?: string;
  isEdit?: boolean;
  editMode?: boolean;
}

const Positioner = styled.div`
  ${(props: IStyled) => {
    return css`
      ${props.reply === 'true' || props.editMode ? 
      (css`
        box-shadow: none; 
        background-color: transparent;
        margin-top: 0rem;
        padding: 0;
        padding-bottom: 1rem;
      `)
      : (css`
        margin-top: 1rem;
        padding: 1rem 2.5rem;
        ${(shadow(0))};
        border-radius: 5px;
        background-color: white;
        @media ${media.xxMobile} {
          padding: 0.5rem;
        }
      `)}
    `;
  }};
  ${(props: IStyled) => {
    return css`
      ${props.reply === 'false' && props.isEdit === false ? css`display: none;` : 
      css`
        display: flex;
      `};
      ${props.editMode === false ? css`display: flex;` : css`margin-top: -1rem;`};
    `;
  }}
  flex-flow: row wrap;
  width: 100%;
`;

// const CommentCount = styled.div`
//   ${(props: IStyled) => {
//     return css`
//       ${(props.reply !== 'true' ? css`display: block;` : 'display: none;')};
//       ${(props.editMode && 'display: none;')};
//     `;
//   }};
//   color: ${oc.gray[7]};
//   font-size: 1rem;
//   min-width: 100%;
//   flex: 1;
//   span {
//     margin-left: 0.5rem;
//     letter-spacing: 0px;
//     font-size: 1.2rem;
//   }
// `;

const ReplyIcon = styled(MdSubdirectoryArrowRight)`
  ${(props: IStyled) => {
    return css`
      ${(props.reply === 'true' ? css`display: block;` : 'display: none;')}
    `;
  }};
  margin-right: 0.5rem;
  margin-top: 0.8rem;
  color: ${oc.gray[5]};
`;

const Wrapper = styled.div`
  ${(props: IStyled) => {
    return css`
      ${props.reply === 'true' ? css`
        padding-left: 1rem;
        padding-right: 1rem;
        @media ${media.xxMobile} {
          padding-left: 0.02rem;
          padding-right: 0.5rem;
        }
        `
        :
        css`
        padding-left: 0rem;
        padding-right: 0rem;
        margin-top: 1rem;
        @media ${media.xxMobile} {
          margin-top: 0.5rem;
        }
        `
      }
    `;
  }};
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
`;

const ClickWrapper = styled.div`
  ${(props: IStyled) => {
    return css`
      ${props.visible === true ? css`display: none;` : css`display: block;`};
    `;
  }}
  padding: 1rem;
  cursor: pointer;
  border: 1px solid ${oc.gray[4]};
  color: ${oc.gray[5]};
  font-size: 0.9rem;
  width: 100%;
`;

const CommentWriteWrapper = styled.div`
  ${(props: IStyled) => {
    return css`
      display: none;
      width: 100%;
      ${props.visible && css`display: block;`};
    `;
  }};
`;

const TextWrapper = styled.div`
  margin-top: 0.5rem;
  border: 1px solid ${oc.gray[3]};
  &:focus {
    border-color: red;
  }
`;

const TextAuto = styled(Textarea)`
  display: flex;
  width: 100%;
  font-size: 0.9rem;
  line-height: 1.2rem;
  resize: none;
  outline: none;
  border: none;
  padding: 0.5rem;
  &::placeholder {
    color: ${oc.gray[4]};
    letter-spacing: -1px;
    @media ${media.xxMobile} {
      font-size: 0.7rem;
    }
  }
`;

const CountValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  font-size: 0.875rem;
  color: ${oc.gray[5]};
  padding-right: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: white;
  span {
    font-size: 0.5rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 0.5rem;
`;

const Button = styled.div`
  ${(props: IStyled) => {
    return css`
      padding: 0.5rem 1rem;
      background-color: ${oc.gray[2]};
      color: ${oc.gray[7]};
      font-size: 0.875rem;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 500;
      letter-spacing: 0px;
      & + & {
        margin-left: 0.5rem;
        background-color: rgba(230, 0, 19, 0.949);
        color: white;
      }
      ${props.reply === 'true' ? css`display: none;` : ''};
    `;
  }};
`;

interface IOnWriteComment {
  text: string;
  replyTo?: string; // replyTo Comment uuid;
  postId: string;
  commentId?: string;
  password: string;
  displayname: string;
}

interface IProps {
  logged: boolean;
  postId: string;
  loggedInfo: ILoggedInfo;
  reply: boolean;
  replyTo?: string;
  commentCount?: number;
  editMode: boolean;
  isEdit: boolean;
  defaultValue?: any;
  commentId?: string;
  password?: string;
  displayname?: string;
  editCancel?(): void;
  onWriteComment({ text, replyTo, postId, commentId, password, displayname }: IOnWriteComment): void;
}

interface IState {
  wrapperVisible: boolean;
  visible: boolean;
  value: string;
  focused: boolean;
  displayname: string;
  password: string;
}

class CommentInput extends React.Component<IProps, IState> {
  public state = {
    wrapperVisible: true,
    visible: true,
    value: '',
    focused: false,
    displayname: '',
    password: '',
  };
  public onShowCommentInput = () => {
    this.setState({
      visible: true,
    });
  }
  public onChange = (e: any) => {
    const { focused, visible } = this.state;
    const { value } = e.target;
    if (value.length > 500) return;
    this.setState({
      value,
      focused,
      visible,
    });
  }
  public onWrite = async () => {
    const { value, displayname, password } = this.state;
    const { postId , onWriteComment, replyTo, commentId, editCancel } = this.props;
    if (value.length === 0) {
      alert('댓글을 입력해주세요.');
      return;
    }
    try {
      this.setState({
        value: '',
      });
      await onWriteComment({
        text: value,
        postId,
        replyTo,
        commentId,
        displayname,
        password,
      });
      if (editCancel) {
        editCancel();
      }
    } catch (e) {
      console.log(e);
    }
  }
  public onCancel = () => {
    const { reply, isEdit, editCancel } = this.props; 
    if (!reply && isEdit) {
      if (editCancel) {
        this.setState({
          value: '',
        });
        editCancel();
      }
    }
    this.setState({
      value: '',
    });
    return;
  }
  public onSetEditMode = () => {
    const { editMode } = this.props;
    if (editMode) {
      this.setState({
        visible: true,
      });
    }
  }
  public onNonmemebersInput = (e: any) => {
    const { name, value } = e.target;
    if (name === 'displayname') {
      this.setState({
        displayname: value,
      });
    }
    if (name === 'password') {
      this.setState({
        password: value,
      });
    }
  }
  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.isEdit !== this.props.isEdit) {
      const { defaultValue, isEdit, editMode, displayname, password } = this.props; 
      if (isEdit && editMode) {
        this.setState({
          value: defaultValue,
        });
        if (displayname && password) {
          this.setState({
            displayname,
            password,
          });
        }
      }
    }
  }
  public componentDidMount() {
    this.onSetEditMode();
  }
  public render() {
    const { visible, value, displayname, password } = this.state;
    const { logged, loggedInfo, reply, editMode, isEdit } = this.props;
    return (
      <Positioner className="CommentInput" reply={reply.toString()} editMode={editMode} isEdit={isEdit}>
        {/* <CommentCount reply={reply.toString()} editMode={editMode}>댓글<span>{commentCount && commentCount}</span></CommentCount> */}
        <Wrapper reply={reply.toString()}>
          <ReplyIcon reply={reply.toString()}/>
          <ClickWrapper visible={visible} onClick={this.onShowCommentInput}>
            댓글 입력
          </ClickWrapper>
          <CommentWriteWrapper visible={visible}>
            <Logged 
              logged={logged} 
              loggedInfo={loggedInfo} 
              onChange={this.onNonmemebersInput}
              displayname={displayname}
              password={password}
            />
            <TextWrapper>
              <TextAuto
                id="textAutoArea"
                minRows={1}
                maxRows={20}
                placeholder="댓글 작성 시 상대방에 대한 배려를 담아 주세요."
                onChange={this.onChange}
                value={value}
              />
              <CountValue>{value.length}<span>/</span>500</CountValue>
            </TextWrapper>
            <ButtonWrapper>
              <Button  reply={reply.toString()} onClick={this.onCancel}>취소</Button>
              <Button onClick={this.onWrite}>등록</Button>
            </ButtonWrapper>
          </CommentWriteWrapper>
        </Wrapper>
      </Positioner>
    );
  }
}

export default CommentInput;