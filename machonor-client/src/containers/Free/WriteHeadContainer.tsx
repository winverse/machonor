import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';

import { writeActions } from 'store/modules/write';
import { postsActions } from 'store/modules/posts';

import { IModule } from 'store/modules';
import { 
  WriteHeadWrapper,
  InputWrapper,
  Input,
  Info,
} from 'components/community/WriteHead';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = StateProps & DispatchProps & RouteComponentProps & IMatch;

interface IMatch {
  match: {
    params: {
      urlSlug: string,
    };
  };
}

class WriteHeadContainer extends React.Component<IProps> {
  public onInputChange = (e: any) => {
    const { WriteActions } = this.props;
    const { name, value } = e.target;
    WriteActions.changeInput({
      form: 'free',
      name,
      value,
    });
  }
  public onEdit = async () => {
    const { match, postData, PostsActions, WriteActions } = this.props;
    const { urlSlug } = match.params;
    const { displayname, anonymous, title, password } = postData;
    if (!urlSlug) return;
    if (postData.id === '') {
      try {
        await PostsActions.readPost({
          category: 'free',
          urlSlug,
        });
      } catch (e) {
        console.log(e);
      }
    }
    if (displayname !== '') {
      if (anonymous === false) {
        const check = displayname === this.props.loggedInfo.displayname;
        if (!check) {
          alert('허용되지 않은 접근입니다.');
          window.location.href = '/main';
          return;
        }
      }
    }
    WriteActions.changeInput({
      form: 'free',
      name: 'title',
      value: title,
    });
    WriteActions.changeInput({
      form: 'free',
      name: 'displayname',
      value: displayname,
    });
    if (!password) return;
    WriteActions.changeInput({
      form: 'free',
      name: 'password',
      value: password,
    });
  }
  public componentDidMount() {
    const { logged, WriteActions } = this.props;
    WriteActions.setAnonymous(!logged);
    this.onEdit();
  }
  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.logged !== this.props.logged) {
      const { WriteActions, logged } = this.props;
      WriteActions.setAnonymous(!logged);
      this.onEdit();
    }
  }
  public render() {
    const { logged, form } = this.props;
    const { title, displayname, password } = form;
    return (
      <WriteHeadWrapper title="자유게시판 - 새 글 작성하기">
        <InputWrapper visible={!logged}>
          <Input 
            placeholder="닉네임"
            type="text"
            name="displayname"
            onChange={this.onInputChange}
            value={displayname}
          />
          <Input 
            placeholder="비밀번호"
            type="password"
            name="password"
            onChange={this.onInputChange}
            value={password}
          />
        </InputWrapper>
        <InputWrapper visible={true}>
          <Input 
            placeholder="제목"
            type="text"
            name="title"
            onChange={this.onInputChange}
            value={title}
          />
        </InputWrapper>
        <Info 
          word="red"
        />
      </WriteHeadWrapper>
    );
  }
}

const mapStateToProps = ({ user, write, post }: IModule) => ({
  logged: user.logged,
  loggedInfo: user.loggedInfo,
  form: write.free.form,
  postData: post.postData,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  WriteActions: bindActionCreators(writeActions, dispatch),
  PostsActions: bindActionCreators(postsActions, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(WriteHeadContainer));