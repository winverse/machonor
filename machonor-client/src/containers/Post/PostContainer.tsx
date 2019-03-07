import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IModule } from 'store/modules';
import {
  PostWrapper,
  PostButton,
  PostDetail,
  PostImage,
  PostInfoWrapper,
  PostState,
} from 'components/post/Main';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = StateProps & DispatchProps;

class PostContainer extends React.Component<IProps> {

  public render() {
    return (
      <PostWrapper>
        <PostImage />
        <PostInfoWrapper >
          <PostState/>
          <PostDetail />
          <PostButton />
        </PostInfoWrapper>
      </PostWrapper>
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
)(PostContainer);