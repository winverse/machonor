import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { writeActions } from 'store/modules/write';
import { postsActions } from 'store/modules/posts';

import { IModule } from 'store/modules';
import { 
  EditorWrapper,
  EditorBody,
  CompletedButton,
} from 'components/write/Editor';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = StateProps & DispatchProps;

interface IState {
  body: string;
}

class EditorContainer extends React.Component<IProps, IState> {
  public state = {
    body: '',
  };
  public onInputChange = (e: any) => {
    const { WriteActions } = this.props;
    const { name, value } = e.target;
    WriteActions.changeInput({
      form: 'justice',
      name,
      value,
    });
  }
  public onChange = (e: any) => {
    const body: string = e.editor.getData();
    this.setState({
      body,
    });
  }
  public onPostWrite = async () => {
    const { form, PostsActions } = this.props;
    const { body } = this.state;
    const { title, postGoal, writerDisclosure } = form;
    if (title.length <= 0) {
      alert('제목을 입력해주세요');
      return;
    }
    if (postGoal.length <= 0) {
      alert('목적을 입력해주세요');
      return;
    }
    if (body.length < 20) {
      alert('내용은 최소 20자 이상 적어주세요');
      return;
    }
    const parseDisclosure = writerDisclosure === 'open' ? true : false;
    try {
      await PostsActions.postJusticeWrite({
        title,
        body,
        postGoal,
        writerDisclosure: parseDisclosure,
      });
    } catch (e) {
      console.log(e);
    }
  }

  public shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    return this.props.body !== nextProps.body;
  }

  public render() {
    const { width } = this.props;
    return (
      <React.Fragment>
        <EditorWrapper>
          <EditorBody 
            isMobile={width <= 425 ? true : false}
            onChange={this.onChange}
          />
        </EditorWrapper>
        <CompletedButton 
          onClick={this.onPostWrite}
          text="등록하기"
        />
        <div style={{ height: '30px' }}/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ core, write }: IModule) => ({
  width: core.width,
  form: write.justice.form,
  body: write.justice.form.body,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  WriteActions: bindActionCreators(writeActions, dispatch),
  PostsActions: bindActionCreators(postsActions, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(EditorContainer);