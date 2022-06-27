import { Outlet } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { useSelector } from 'react-redux';

import { closeSider } from '../../../redux/ui/ui.slice';
import { menu } from '../../../utils';
import { MenuProfile } from './components/MenuProfile';
import { MenuSlideContent } from './components/MenuSlideContent';
import { MenuTop } from './components/MenuTop';
import { selectSiderStatus } from '../../../redux/ui/ui.selectors';
import { useAppDispatch } from '../../../redux/hooks';

import '../../../layout/flags/flags.css';
import '../../../layout/layout.scss';
import './adminLayout.scss';

export const AdminLayout = () => {
  const dispatch = useAppDispatch();
  const visible = useSelector(selectSiderStatus);

  return (
    <div className="layout-wrapper layout-overlay">
      <MenuTop />
      <Sidebar
        visible={visible}
        onHide={() => dispatch(closeSider())}
        showCloseIcon={false}
      >
        <MenuProfile />
        <MenuSlideContent model={menu} />
      </Sidebar>
      <div className="layout-main">
        <div className="grid">
          <div className="col-12">
            <div className="card p-gray">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
