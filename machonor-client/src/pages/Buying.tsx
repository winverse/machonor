import * as React from 'react';

import { BasicTemplate } from 'components/template';
import { Navi, Aside, ContentsController } from 'containers/Common';
import { 
  Contents,
} from 'containers/Buying';

const Buying: React.SFC = () => { 
  return (
    <BasicTemplate
      Navi={<Navi />}
      Contents1={<ContentsController />}
      Contents2={<Contents />}
      Aside={<Aside />}
    />
  );
};

export default Buying;