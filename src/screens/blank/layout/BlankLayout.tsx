import { Outlet } from 'react-router-dom';

import './blankLayout.scss';

const BlankLayout = () => (
  <div>
    <div className="flex flex-wrap align-items-center justify-content-center d-height-100 image-background">
      <Outlet />
    </div>
  </div>
);

export default BlankLayout;
