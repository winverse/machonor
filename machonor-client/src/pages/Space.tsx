import * as React from 'react';

import { BasicTemplate } from 'components/template';
import {
  Navi,
} from 'containers/Common';

const Space: React.SFC = () => (
  <BasicTemplate
    Navi={<Navi />}
    Contents1="Spavce"
  />
);

export default Space;