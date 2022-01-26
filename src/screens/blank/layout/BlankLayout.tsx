import { Outlet } from 'react-router-dom';

import './blankLayout.scss';

const BlankLayout = () => (
  <div className="flex align-items-center justify-content-center d-height-100 image-background">
    <div className="shadow-5 w-11 md:w-6 lg:w-5 border-round-20">
      <Outlet />
    </div>
  </div>
);

export default BlankLayout;
