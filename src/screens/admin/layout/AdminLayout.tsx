import { Outlet } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';

import '../../../layout/flags/flags.css';
import '../../../layout/layout.scss';
import './adminLayout.scss';

import { useSelector } from 'react-redux';
import MenuTop from '../../../components/menuTop/MenuTop';

import { selectSiderStatus } from '../../../redux/ui/ui.selectors';
import { useAppDispatch } from '../../../redux/hooks';
import { closeSider } from '../../../redux/ui/ui.slice';
import { MenuProfile } from '../../../components/menuProfile/MenuProfile';
import { MenuSlideContent } from '../../../components/menuSlideContent/MenuSlideContent';
import { menu } from '../../../utils/menuElement';

const AdminLayout = () => {
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
