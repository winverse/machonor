import * as React from 'react';

import { BasicTemplate } from 'components/template';
import {
  Navi,
} from 'containers/Common';

const Explanation: React.SFC = () => (
  <BasicTemplate
    Navi={<Navi />}
    Contents1="Explan"
  />
);

export default Explanation;