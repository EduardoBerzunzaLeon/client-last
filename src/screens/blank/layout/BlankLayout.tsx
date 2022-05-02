import { Outlet } from 'react-router-dom';

import './blankLayout.scss';

export const BlankLayout = () => (
  <div className="flex align-items-center justify-content-center h-screen image-background">
    <div className="shadow-5 w-11 border-round-20 m-width-32rem">
      <Outlet />
    </div>
  </div>
);

export default BlankLayout;
