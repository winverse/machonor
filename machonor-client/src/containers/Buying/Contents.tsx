import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IModule } from 'store/modules';
import { PostList } from 'components/common/Post';
import { Button } from 'components/common/Button';
import {
  ContentsWrapper,
  BannerImage,
} from 'components/common/Contents';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = StateProps & DispatchProps;

class Contents extends React.Component<IProps> {

  public render() {
    const style = {
      height: '50px',
    };
    return (
      <ContentsWrapper>
        <BannerImage />
        <PostList
          title="가장 핫한 구매중인 정의"
          sort={true}
        />
        <Button 
          text="더 보기"
        />
        <PostList
          title="최근 올라온 구매중인 정의"
          sort={false}
        />
        <Button 
          text="더 보기"
        />
        <div style={style} />
      </ContentsWrapper>
    );
  }
}

const mapStateToProps = ({ }: IModule) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Contents);