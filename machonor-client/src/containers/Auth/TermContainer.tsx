import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { baseActions } from 'store/modules/base';
import { authActions } from 'store/modules/auth';

import { IModule } from 'store/modules';
import { ModalWrapper } from 'components/common/modal';
import { personalInfo, utilization } from './term';
import {
  AuthWrapper,
  ErrorMessage,
  Button,
  AlreadyQuestion,
} from 'components/auth/Common';
import {
  CheckBoxWithLabel,
  Line,
  TermContents,
} from 'components/auth/Term';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = StateProps & DispatchProps;

class TermContainer extends React.Component<IProps> {

  public onExitModal = () => {
    const { BaseActions } = this.props;
    BaseActions.setTermVisible(false);
  }

  public onSetError = (message: any) => {
    const { AuthActions } = this.props;
    AuthActions.setTermError(message);
  }

  public onChangeCheckbox = (e: any) => {
    const { AuthActions, checked } = this.props;
    const { all, personalInfo, utilization } = checked; // 현재값, boolaen
    const name = e.currentTarget.getAttribute('title');
    if (name === 'all') {
      AuthActions.changeCheckbox({ 
        name: 'all',
        value: !all,
      });
      AuthActions.changeCheckbox({ 
        name: 'utilization',
        value: !all,
      });
      AuthActions.changeCheckbox({ 
        name: 'personalInfo',
        value: !all,
      });
      return;
    }
    name === 'utilization' ? AuthActions.changeCheckbox({ 
      name: 'utilization',
      value: !utilization,
    }) : AuthActions.changeCheckbox({ 
      name: 'personalInfo',
      value: !personalInfo,
    });

    Object.keys(checked).map((key) => {
      if (checked[key] === true) {
        this.onSetError(''); 
      }
      return;
    });
  }

  public onToRegisterForm = () => {
    const { BaseActions, checked, AuthActions } = this.props;
    const { personalInfo, utilization } = checked;
    if (!personalInfo || !utilization) {
      this.onSetError('우정산 서비스제공을 위해서 반드시 회원님의 동의가 필요합니다.');
      return;
    }
    BaseActions.setTermVisible(false);
    BaseActions.setRegisterVisible(true);
    AuthActions.initialCheck();
  }

  public onToLogin = () => {
    const { BaseActions } = this.props;
    BaseActions.setRegisterVisible(false);
    BaseActions.setLoginVisible(true);
  }

  public componentDidUpdate(prevProps: IProps) {
    const { checked, AuthActions } = this.props;
    const { personalInfo, utilization } = checked;
    if (prevProps.checked !== this.props.checked) {
      if (personalInfo && utilization) {
        AuthActions.changeCheckbox({
          name: 'all',
          value: true,
        });
        return;
      }
      if (!personalInfo || !utilization) {
        AuthActions.changeCheckbox({
          name: 'all',
          value: false,
        });
        return;
      }
    }
  }

  public render() {
    const { visible, error, checked } = this.props;
    return (
      <ModalWrapper visible={visible}>
        <AuthWrapper onClick={this.onExitModal}>
          <CheckBoxWithLabel 
            active={true}
            message="전체동의(선택사항포함)"
            checked={checked.all}
            title="all"
            onClick={this.onChangeCheckbox}
          />
          <Line />
          <CheckBoxWithLabel 
            active={false}
            message="이용약관 동의(필수)"
            checked={checked.utilization}
            title="utilization"
            onClick={this.onChangeCheckbox}
          />
          <TermContents 
            contents={utilization}
          />
          <CheckBoxWithLabel 
            active={false}
            message="개인정보 수집 및 이용동의(필수)"
            checked={checked.personalInfo}
            title="personalInfo"
            onClick={this.onChangeCheckbox}
          />
          <TermContents 
            contents={personalInfo}
          />
          <ErrorMessage 
            message={error}
          />
          <Button 
            text="회원가입"
            onClick={this.onToRegisterForm}
          />
          <AlreadyQuestion
            text="이미 우.정.산 회원이신가요?"
            to="로그인"
            onClick={this.onToLogin}
          />
        </AuthWrapper>
      </ModalWrapper>
    );
  }
}

const mapStateToProps = ({ base, auth }: IModule) => ({
  visible: base.term,
  checked: auth.term.checked,
  error: auth.term.error,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  BaseActions: bindActionCreators(baseActions, dispatch),
  AuthActions: bindActionCreators(authActions, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(TermContainer);