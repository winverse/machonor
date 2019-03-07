import * as React from 'react';
import { match } from 'react-router-dom';

import { BasicTemplate } from 'components/template';
import { Navi, ContentsController, Aside } from 'containers/Common';
import { 
  PostContainer,
  CommentContainer,
  BoardContainer,
  PagenationContainer,
  SearchContainer,
} from 'containers/Free';

interface IProps {
  match: {
    params: {
      urlSlug: string;
    };
  } & match;
}

const FreePost: React.SFC<IProps> = ({ match }) => {
  const urlSlug = match.params.urlSlug;
  return (
    <BasicTemplate 
      Navi={<Navi />}
      Contents1={<ContentsController />}
      Contents2={<PostContainer urlSlug={decodeURI(urlSlug)}/>}
      Contents3={<CommentContainer />}
      Contents4={<BoardContainer urlSlug={decodeURI(urlSlug)}/>}
      Contents5={<PagenationContainer />}
      Contents6={<SearchContainer urlSlug={decodeURI(urlSlug)}/>}
      Aside={<Aside />}
    />
  );
};

export default FreePost;