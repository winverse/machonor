import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { writeActions } from 'store/modules/write';
import { postsActions } from 'store/modules/posts';

import { IModule } from 'store/modules';
import { ContentsWrapper } from 'components/common/Contents';
import {
  DescriptionWrapper,
  NameWithInput,
  CheckOption,
  CheckBox,
  Information,
} from 'components/write/Description';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = StateProps & DispatchProps;

interface IState {
  body: string;
}

class Contents extends React.Component<IProps, IState> {
  public onChangeDisclosure = (e: React.MouseEvent) => {
    const { WriteActions } = this.props;
    const value = e.currentTarget.getAttribute('title');
    if (!value) return;
    WriteActions.setWriterDisclosure(value);
  }
  public onInputChange = (e: any) => {
    const { WriteActions } = this.props;
    const { name, value } = e.target;
    WriteActions.changeInput({
      form: 'justice',
      name,
      value,
    });
  }
  public shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    return this.props.form !== nextProps.form;
  }

  public render() {
    const { disclosure } = this.props;
    return (
      <ContentsWrapper>
        <DescriptionWrapper>
          <NameWithInput
            title="프로젝트 제목"
            name="title"
            placeholder="프로젝트 제목을 입력해주세요"
            onChange={this.onInputChange}
          />
          <NameWithInput 
            title="프로젝트 목적"
            name="postGoal"
            placeholder="프로젝트 목적을 입력해주세요"
            onChange={this.onInputChange}
          />
          <CheckOption>
            <CheckBox 
              name="공개"
              onChangeDisclosure={this.onChangeDisclosure}
              active={disclosure === 'open' ? true : false}
            />
            <CheckBox 
              name="비공개"
              onChangeDisclosure={this.onChangeDisclosure}
              active={disclosure === 'unopen' ? true : false}
            />
          </CheckOption>
          <Information />
        </DescriptionWrapper>
      </ContentsWrapper>
    );
  }
}

const mapStateToProps = ({ core, write }: IModule) => ({
  width: core.width,
  form: write.justice.form,
  disclosure: write.justice.form.writerDisclosure,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  WriteActions: bindActionCreators(writeActions, dispatch),
  PostsActions: bindActionCreators(postsActions, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Contents);