import { Outlet } from 'react-router-dom';

import '../../../layout/flags/flags.css';
import '../../../layout/layout.scss';
import './adminLayout.scss';

const AdminLayout = () => (
  <div className="layout-wrapper layout-overlay">
    {/* <MenuTop /> */}
    <div className="layout-main">
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <Outlet />
          </div>
        </div>
      </div>
    </div>

  </div>
);

export default AdminLayout;
