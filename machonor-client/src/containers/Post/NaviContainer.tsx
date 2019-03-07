import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { throttle } from 'lodash'; 

import { baseActions } from 'store/modules/base';
import { postsActions } from 'store/modules/posts';

import { IModule } from 'store/modules';
import {
  PostNavi,
} from 'components/post/Navi';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = StateProps & DispatchProps;

class NaviContainer extends React.Component<IProps> {
  public naviRef: any;
  public once: boolean = true;

  constructor(props: IProps) {
    super(props);
    this.naviRef = React.createRef();
  }

  public onScroll = throttle(() => {
    const { PostsActions } = this.props;
    const height = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    PostsActions.setScrollHeight({
      name: 'scrollTop',
      height,
    });
  }, 500);
  public onSetNaviHeight = () => {
    const { PostsActions } = this.props;
    const height = this.naviRef.current && this.naviRef.current.offsetTop;
    PostsActions.setScrollHeight({
      name: 'navTop',
      height,
    });
  }
  public onScrollMove = (e: React.SyntheticEvent) => {
    const { buyerTop, NGOTop, summaryTop, alikeTop } = this.props.navi;
    const value = e.currentTarget.getAttribute('value');
    value === 'buyer' ? window.scrollTo(0, buyerTop - 80) : null;
    value === 'summary' ? window.scrollTo(0, summaryTop - 80) : null;
    value === 'withOZ' ? window.scrollTo(0, NGOTop - 80) : null;
    value === 'alike' ? window.scrollTo(0, alikeTop - 80) : null;
  }

  public componentDidMount() {
    this.onScroll();
    this.onSetNaviHeight();
    window.addEventListener('scroll', this.onScroll);
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  public render() {
    const { naviRef, onScrollMove } = this;
    const { navTop, scrollTop, buyerTop, summaryTop, NGOTop, alikeTop } = this.props.navi;
    const active = navTop === scrollTop ? true : false;
    const buyerActive = (buyerTop - 100 < scrollTop) && (summaryTop - 100 > scrollTop) ? true : false ;
    const summaryActive = (summaryTop - 100 < scrollTop) && (NGOTop - 100 > scrollTop) ? true : false;
    const withActive = (NGOTop - 100 < scrollTop) && (alikeTop - 100 > scrollTop) ? true : false;
    const alikeActive = (alikeTop - 100 < scrollTop) ? true : false;
    const { navBarVisble } = this.props;
    return (
      <PostNavi
        navRef={naviRef} 
        active={active}
        onScrollMove={onScrollMove}
        buyerActive={buyerActive}
        summaryActive={summaryActive}
        alikeActive={alikeActive}
        withActive={withActive}
        navBarVisble={navBarVisble}
      />
    );
  }
}

const mapStateToProps = ({ post, base }: IModule) => ({
  navi: post.navi,
  navBarVisble: base.navibar,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  BaseActions: bindActionCreators(baseActions, dispatch),
  PostsActions: bindActionCreators(postsActions, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(NaviContainer);