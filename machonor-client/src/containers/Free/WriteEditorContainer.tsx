import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { writeActions } from 'store/modules/write';
import { postsActions } from 'store/modules/posts';

import { IModule } from 'store/modules';
import {
  EditorWrapper,
  EditorBody,
  CompletedButton,
} from 'components/write/Editor';
import { banded } from 'lib/common';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = StateProps & DispatchProps & RouteComponentProps & IMatch;

interface IMatch {
  match: {
    params: {
      urlSlug: string;
    };
  };
}

interface IState {
  body: string;
}

class WriteEditorContainer extends React.Component<IProps, IState> {
  public state = {
    body: '',
  };
  public onChange = (e: any) => {
    const body: string = e.editor.getData();
    this.setState({
      body,
    });
  }
  public onEdit = () => {
    const { postData } = this.props;
    this.setState({
      body: postData.body,
    });
  }
  public onWrite = async (e: any) => {
    const { anonymous, form, PostsActions, history } = this.props;
    const { displayname, password, title, body } = form; 
    if (anonymous) {
      const search: any[] = banded.map((word) => {
        return displayname.search(word);
      });
      if (displayname === '') {
        alert('닉네임을 입력해주세요');
        return;
      }
      if (search.indexOf(0) > -1) {
        alert('닉네임에 금지어가 포함되어 있습니다');
        return;
      }
      if (displayname.length > 10 || displayname.length < 2) {
        alert('닉네임은 2~10자로 정해주세요');
        return;
      }
      if (password === '') {
        alert('패스워드를 입력해주세요');
        return;
      }
      if (password.length > 30) {
        alert('패스워드는 30자를 넘을 수 없습니다');
        return;
      }
    }
    if (title === '') {
      alert('제목을 입력해주세요');
      return;
    }
    if (title.length > 100) {
      alert('제목은 100자를 넘을 수 없습니다');
      return;
    }
    if (body.length > 1) {
      alert('내용을 입력해주세요');
      return;
    }
    try {
      const { match } = this.props;
      await PostsActions.postFreeWrite({
        postId: match.params.urlSlug ? this.props.postData.id : null,
        displayname: this.props.form.displayname !== '' ? displayname : '',
        password: this.props.form.password !== '' ? password : '',
        body: this.state.body,
        title,
        anonymous,
      });
      if (this.props.postData) {
        const { urlSlug } = this.props.postData as any;
        history.push(`/community/free/${urlSlug}`);
      }
    } catch (e) {
      console.log(e);
    }
  }
  public componentDidMount() {
    const { match } = this.props;
    const { urlSlug } = match.params;
    if (urlSlug !== '' || urlSlug) {
      this.onEdit();
    }
  }
  public componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (prevProps.postData !== this.props.postData) {
      this.onEdit();
    }
  }
  public componentWillUnmount() {
    const { WriteActions } = this.props;
    WriteActions.initialState();
  }
  public render() {
    const { postData: { body } } = this.props;
    const { match } = this.props;
    const { urlSlug } = match.params;
    return (
      <EditorWrapper>
        <EditorBody 
          defaultValue={body}
          isMobile={false}
          onChange={this.onChange}
          urlSlug={urlSlug}
        />
        <CompletedButton
          onClick={this.onWrite}
          text="글쓰기"
        />
      </EditorWrapper>
    );
  }
}

const mapStateToProps = ({ write, post }: IModule) => ({
  anonymous: write.free.anonymous,
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
)(withRouter(WriteEditorContainer));