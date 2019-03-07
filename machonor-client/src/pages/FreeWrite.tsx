import * as React from 'react';

import { BasicTemplate } from 'components/template';
import { Navi, ContentsController, Aside } from 'containers/Common';
import { 
  WriteHeadContainer,
  WriteEditorContainer,
} from 'containers/Free';

const FreeWrite: React.SFC = () => {
  return (
    <BasicTemplate 
      Navi={<Navi />}
      Contents1={<ContentsController />}
      Contents2={<WriteHeadContainer />}
      Contents3={<WriteEditorContainer />}
      Aside={<Aside />}
    />
  );
};

export default FreeWrite;