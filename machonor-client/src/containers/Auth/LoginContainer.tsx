import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';

import { baseActions } from 'store/modules/base';
import { authActions } from 'store/modules/auth';
import { userActions, ILoggedInfo } from 'store/modules/user';

import { IModule } from 'store/modules';
import { ModalWrapper } from 'components/common/modal';
import { 
  AuthWrapper,
  InputWithLabel,
  AlreadyQuestion,
  ErrorMessage,
  Button,
} from 'components/auth/Common';
import storage from 'lib/storage';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = StateProps & DispatchProps & RouteComponentProps & {
  match: {
    params: {
      urlSlug: string;
    },
  },
};

class Register extends React.Component<IProps> {

  public onExitModal = () => {
    const { BaseActions } = this.props;
    BaseActions.setLoginVisible(false);
  }
  
  public onChange = (e: any) => {
    const { AuthActions } = this.props; 
    const { name, value } = e.target;
    AuthActions.changeInput({
      form: 'login',
      name,
      value,
    });
  }

  public onLocalLogin = async () => {
    const { form, AuthActions, UserActions, BaseActions, match } = this.props;
    const { userid, password } = form;
    if (userid === '' || password === '') {
      AuthActions.setError({
        form: 'login',
        name: 'message',
        message: '로그인 정보를 바르게 입력해주세요',
      });
      return;
    }
    const needComment = match.params.urlSlug;
    try {
      await AuthActions.localLogin({ userid, password });
      const result = this.props.result!;
      const userInfo: ILoggedInfo = {
        displayname: result.displayname,
        thumbnail: result.thumbnail,
        shortBio: result.shortBio,
      };
      storage.set('loggedInfo', userInfo);
      UserActions.setLoggedInfo(userInfo);
      UserActions.setInfo({
        name: 'userId',
        value: result.userId,
      });
      UserActions.setInfo({
        name: 'level',
        value: result.level,
      });
      UserActions.setInfo({
        name: 'amount',
        value: result.amount,
      });
      BaseActions.setLoginVisible(false);
      alert('안녕하세요!');
      if (needComment) {
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
      AuthActions.setError({
        form: 'login',
        name: 'message',
        message: '입력하신 정보와 일치하는 회원이 없습니다',
      });
    }
  }
  public onToRegister = () => {
    const { BaseActions } = this.props;
    BaseActions.setLoginVisible(false);
    BaseActions.setTermVisible(true); 
  }

  public render() {
    const { visible, form, error } = this.props;
    const { userid, password } = form;
    return (
      <ModalWrapper visible={visible}>
        <AuthWrapper onClick={this.onExitModal}>
          <InputWithLabel 
            label="아이디"
            placeholder="아이디를 입력해주세요"
            name="userid"
            type="text"
            value={userid}
            onChange={this.onChange}
          />
          <InputWithLabel 
            label="패스워드"
            placeholder="패스워드를 입력해주세요"
            name="password"
            type="password"
            value={password}
            onChange={this.onChange}
          />
          <ErrorMessage 
            message={error}
          />
          <Button
            text="로그인"
            onClick={this.onLocalLogin}
          />
          <AlreadyQuestion
            text="아직 우.정.산 회원이 아니신가요?"
            to="회원가입"
            onClick={this.onToRegister}
          />
        </AuthWrapper>
      </ModalWrapper>
    );
  }
}

const mapStateToProps = ({ base, auth }: IModule) => ({
  visible: base.login,
  form: auth.login.form,
  error: auth.login.error.message,
  result: auth.reuslt,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  BaseActions: bindActionCreators(baseActions, dispatch),
  AuthActions: bindActionCreators(authActions, dispatch),
  UserActions: bindActionCreators(userActions, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Register));