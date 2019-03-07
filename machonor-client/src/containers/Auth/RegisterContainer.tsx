import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { Dispatch, bindActionCreators } from 'redux';
import { isEmail, isLength } from 'validator';
import { throttle } from 'lodash';

import { baseActions } from 'store/modules/base';
import { authActions } from 'store/modules/auth';
import { userActions, ILoggedInfo } from 'store/modules/user';

import { IModule } from 'store/modules';
import { ModalWrapper } from 'components/common/modal';
import { 
  AuthWrapper,
  AlreadyQuestion,
  ErrorMessage,
  InputWithLabel,
  Button,
} from 'components/auth/Common';
import storage from 'lib/storage';
import { banded } from 'lib/common';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = StateProps & DispatchProps & RouteComponentProps;

interface IErrorInfo {
  name: string;
  message: string;
}

class Register extends React.Component<IProps> {
  public validate = {
    userid: (value: string) => {
      const { onSetError } = this;
      const pattern = /^[a-zA-Z0-9]{3,10}$/;
      if (value.length < 1) {
        onSetError({
          name: 'userid',
          message: '아이디를 입력해주세요',
        });
      } else if (!pattern.test(value)) {
        onSetError({
          name: 'userid',
          message: '아이디는 3글자 이상, 10글자 이하, 영문/숫자가 허용됩니다.',
        });
      } else {
        onSetError({
          name: 'userid',
          message: '',
        });
      }
      return true;
    },
    displayname: (value: string) => {
      const { onSetError } = this;
      const pattern = /^[a-zA-Z0-9가-힣-_]{2,10}$/;
      const search: any = banded.map((word) => {
        return value.search(word);
      });
      if (search.indexOf(0) > -1) {
        onSetError({
          name: 'displayname',
          message: '닉네임에 금지어가 포함되어 있습니다',
        });
      } else if (value.length < 1) {
        onSetError({
          name: 'displayname',
          message: '닉네임을 입력해주세요',
        });
      } else if (!pattern.test(value)) {
        onSetError({
          name: 'displayname',
          message: '닉네임은 2~10자의 한글/영문/숫자 - _ 가 허용됩니다.',
        });
      } else {
        onSetError({
          name: 'displayname',
          message: '',
        });
      }
      return true;
    },
    email: (value: string) => {
      const { onSetError } = this;
      if (value.length < 1) {
        onSetError({
          name: 'email',
          message: '이메일을 입력해주세요.',
        });
      } else if (!isEmail(value)) {
        onSetError({
          name: 'email',
          message: '이메일 형식이 아닙니다.',
        });
      } else {
        onSetError({
          name: 'email',
          message: '',
        });
      }
      return true;
    },
    password: (value: string) => {
      const { onSetError } = this;
      if (!isLength(value, { min: 6 })) {
        onSetError({
          name: 'password',
          message: '비밀번호를 6자 이상 입력해주세요',
        });
      } else {
        onSetError({
          name: 'password',
          message: '',
        });
      }
      return true;
    },
    passwordConfirm: (value: string) => {
      const { onSetError } = this;
      if (value.length < 1) {
        onSetError({
          name: 'passwordConfirm',
          message: '비밀번호 재확인을 입력해주세요',
        });
      } else if (this.props.form.password !== value) {
        onSetError({
          name: 'passwordConfirm',
          message: '비밀번호가 일치하지 않습니다.',
        });
      } else {
        onSetError({
          name: 'passwordConfirm',
          message: '',
        });
      }
      return true;
    },
  };

  public onExitModal = () => {
    const { BaseActions } = this.props;
    BaseActions.setRegisterVisible(false);
  }

  public onChange = (e: any) => {
    const { AuthActions } = this.props;
    const { name, value } = e.target;
    AuthActions.changeInput({
      form: 'register',
      name,
      value,
    });
    const validation = this.validate[name](value);
    if (name.indexOf('password') > -1 || !validation) return;
    const check = (name === 'userid' ? this.onCheckUserid : 
    (name === 'displayname' ? this.onCheckDisplayname : this.onCheckEmailExists));
    check(value);
  }

  public onCheckEmailExists = throttle(async(email) => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.checkEmailExists(email);
      if (this.props.exists.email) {
        this.onSetError({
          name: 'email',
          message: '이미 존재하는 이메일입니다.',
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, 300);

  public onCheckDisplayname = throttle(async(displayname) => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.checkDisplaynameExists(displayname);
      if (this.props.exists.displayname) {
        this.onSetError({
          name: 'displayname',
          message: '이미 존재하는 닉네임입니다.',
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, 300);

  public onCheckUserid = throttle(async(userid) => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.checkUseridExists(userid);
      if (this.props.exists.userid) {
        this.onSetError({
          name: 'userid',
          message: '이미 존재하는 아이디입니다.',
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, 300);
  
  public onSetError = ({ name, message }: IErrorInfo) => {
    const { AuthActions } = this.props;
    AuthActions.setError({
      form: 'register',
      name, 
      message,
    });
  }

  public onRegisterLocal = async() => {
    const { validate } = this;
    const { form, error, AuthActions, UserActions, BaseActions } = this.props;
    const { userid, password, passwordConfirm, displayname, email } = form;
    Object.keys(error).map((key) => {
      if (error[key] !== '') {
        return;
      }
    });
    if (!validate['email'](email) ||
        !validate['displayname'](displayname) ||
        !validate['password'](password) ||
        !validate['passwordConfirm'](passwordConfirm) ||
        !validate['userid'](userid)) {
      return;
    }
    try {
      await AuthActions.localRegister({
        userid,
        password,
        displayname,
        email,
      });
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
      UserActions.setValidated(true);
      BaseActions.setRegisterVisible(false);
    } catch (e) {
      if (e.response.status === 409) {
        const { key } = e.response.data;
        const message = (key === 'email' ? '이미 존재하는 이메일입니다.' :
        (key === 'displayname' ? '이미 존재하는 닉네임입니다' : '이미 존재하는 아이디입니다.'));
        this.onSetError({
          name: key,
          message,
        });
      } else {
        this.onSetError({
          name: 'email',
          message: '알 수 없는 에러가 발생했습니다.',
        });
      }
    }
    window.location.reload(); // read Comment 따로 하기
  }

  public onToLogin = () => {
    const { BaseActions } = this.props;
    BaseActions.setRegisterVisible(false);
    BaseActions.setLoginVisible(true);
  }

  public render() {
    const { visible, form, error } = this.props;
    return (
      <ModalWrapper visible={visible}>
        <AuthWrapper onClick={this.onExitModal}>
          <InputWithLabel
            label="아이디"
            placeholder="아이디를 입력해주세요"
            type="text"
            name="userid"
            value={form.userid}
            onChange={this.onChange}
          />
          <ErrorMessage 
            message={error.userid}
          />
          <InputWithLabel
            label="비밀번호"
            placeholder="6자 이상"
            type="password"
            name="password"
            value={form.password}
            onChange={this.onChange}
          />
          <ErrorMessage 
            message={error.password}
          />
          <InputWithLabel
            label="비밀번호 재확인"
            placeholder="6자 이상 다시한번더"
            type="password"
            value={form.passwordConfirm}
            name="passwordConfirm"
            onChange={this.onChange}
          />
          <ErrorMessage 
            message={error.passwordConfirm}
          />
          <InputWithLabel
            label="닉네임"
            placeholder="닉네임을 입력해주세요"
            type="text"
            name="displayname"
            value={form.displayname}
            onChange={this.onChange}
          />
          <ErrorMessage 
            message={error.displayname}
          />
          <InputWithLabel
            label="이메일"
            placeholder="이메일을 입력해주세요"
            type="email"
            name="email"
            value={form.email}
            onChange={this.onChange}
          />
          <ErrorMessage 
            message={error.email}
          />
          <Button 
            text="시작하기"
            onClick={this.onRegisterLocal}
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
  visible: base.register,
  form: auth.register.form,
  exists: auth.register.exists,
  error: auth.register.error,
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