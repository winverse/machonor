import * as React from 'react';
import { BasicTemplate } from 'components/template';
import { Navi, Aside, ContentsController } from 'containers/Common';
import { Contents, EditorContainer } from 'containers/Write';

const JusticeWrite: React.SFC = () => (
  <BasicTemplate
    Navi={<Navi />}
    Contents1={<ContentsController />}
    Contents2={<Contents />}
    Contents3={<EditorContainer />}
    Aside={<Aside />}
  />
);

export default JusticeWrite;