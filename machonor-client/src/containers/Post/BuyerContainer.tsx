import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { throttle } from 'lodash';

import { postsActions } from 'store/modules/posts';

import { IModule } from 'store/modules';
import {
  PostBuyer,
} from 'components/post/Buyer';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = StateProps & DispatchProps;

class BuyerContainer extends React.Component<IProps> {
  public buyerRef: any;
  constructor(props: IProps) {
    super(props);
    this.buyerRef = React.createRef();
  }
  public onShowComment = (postId: any) => {
    const { PostsActions } = this.props;
    PostsActions.toggleComment(postId);
  }
  public onScroll = throttle(() => {
    const { PostsActions } = this.props;
    const height = this.buyerRef.current && this.buyerRef.current.offsetTop;
    if (!height) return;
    PostsActions.setScrollHeight({
      name: 'buyerTop',
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
      <PostBuyer
        buyerRef={this.buyerRef}
        onShowComment={this.onShowComment}
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
)(BuyerContainer);