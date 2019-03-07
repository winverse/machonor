import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { throttle } from 'lodash';

import { postsActions } from 'store/modules/posts';

import { IModule } from 'store/modules';
import {
  PostAlike,
} from 'components/post/Alike';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = StateProps & DispatchProps;

class AlikeContainer extends React.Component<IProps> {
  public alikeRef: any;
  constructor(props: IProps) {
    super(props);
    this.alikeRef = React.createRef();
  }
  public onScroll = throttle(() => {
    const { PostsActions } = this.props;
    const height = this.alikeRef.current && this.alikeRef.current.offsetTop;
    if (!height) return;
    PostsActions.setScrollHeight({
      name: 'alikeTop',
      height,
    });
  }, 500);
  public componentDidMount() {
    this.onScroll();
    window.addEventListener('scroll', this.onScroll);
  }
  public componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }
  public render() {
    return (
      <PostAlike 
        alikeRef={this.alikeRef}
      />
    );
  }
}

const mapStateToProps = ({ }: IModule) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  PostsActions: bindActionCreators(postsActions, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(AlikeContainer);