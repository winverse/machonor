import * as React from 'react';

import { BasicTemplate } from 'components/template';
import { Navi, ContentsController, Aside } from 'containers/Common';
import { 
  BoardContainer,
  PagenationContainer,
  SearchContainer,
} from 'containers/Free';

const Free: React.SFC = () => (
  <BasicTemplate 
    Navi={<Navi />}
    Contents1={<ContentsController />}
    Contents2={<BoardContainer />}
    Contents3={<PagenationContainer />}
    Contents4={<SearchContainer />}
    Aside={<Aside />}
  />
);

export default Free;