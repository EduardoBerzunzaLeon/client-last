import React from 'react';
import ReactDOM from 'react-dom';

import { Toast } from 'primereact/toast';

export const PortalToast = React.forwardRef((
  props,
  ref: React.LegacyRef<Toast> | undefined,
) => (
  ReactDOM.createPortal(<Toast {...props} ref={ref} />, document.body)
));

export default PortalToast;
