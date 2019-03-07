import * as React from 'react';
import { BasicTemplate } from 'components/template';
import { Navi, Aside, ContentsController } from 'containers/Common';
import { match } from 'react-router-dom';
import { 
  PostContainer,
  NaviContainer,
  BuyerContainer,
  SummaryContainer,
  WithNGOContainer,
  AlikeContainer,
} from 'containers/Post';

interface IProps {
  match: match;
}

const Post: React.SFC<IProps> = ({ match }) => {
  // const { urlSlug } = match.params;
  return (
    <BasicTemplate 
      Navi={<Navi />}
      Contents1={<ContentsController />}
      Contents2={<PostContainer />}
      Contents3={<NaviContainer />}
      Contents4={<BuyerContainer />}
      Contents5={<SummaryContainer />}
      Contents6={<WithNGOContainer />}
      Contents7={<AlikeContainer />}
      Aside={<Aside />}
    />
  );
};

export default Post;