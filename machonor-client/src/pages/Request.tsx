import * as React from 'react';

import { BasicTemplate } from 'components/template';
import {
  Navi,
} from 'containers/Common';

const Request: React.SFC = () => (
  <BasicTemplate
    Navi={<Navi />}
    Contents1="Request"
  />
);

export default Request;