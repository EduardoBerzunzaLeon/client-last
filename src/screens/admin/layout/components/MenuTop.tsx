import { useRef } from 'react';

import { InputText } from 'primereact/inputtext';
import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom';

import { openSider } from '../../../../redux/ui/ui.slice';
import { setDefaultAuthState } from '../../../../redux/auth/auth.slice';
import { useAppDispatch } from '../../../../redux/hooks';
import { useAuth } from '../../../../hooks';

export const MenuTop = () => {
  const menu = useRef<any>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  const items = [
    {
      label: 'Perfil',
      icon: 'pi pi-user',
      command: () => {
        navigate(`/admin/users/${user?.id}`);
      },
    },
    {
      separator: true,
    },
    {
      label: 'Cerrar Sesión',
      icon: 'pi pi-fw pi-power-off',
      command: () => {
        dispatch(setDefaultAuthState());
      },
    },
  ];

  const onToggleMenu = () => {
    dispatch(openSider());
  };
  return (
    <div className="layout-topbar clearfix">
      <button
        type="button"
        className="p-link layout-menu-button"
        onClick={onToggleMenu}
      >
        <span className="pi pi-bars" />
      </button>
      <div className="layout-topbar-icons">
        <span className="layout-topbar-search">
          <InputText type="text" placeholder="Search" />
          <span className="layout-topbar-search-icon pi pi-search" />
        </span>
        <button
          type="button"
          className="p-link"
          onClick={(event) => menu.current.toggle(event)}
          aria-controls="popup_menu"
          aria-haspopup
        >
          <span className="layout-topbar-item-text">User</span>
          <span className="layout-topbar-icon pi pi-user" />
        </button>
        <Menu model={items} popup ref={menu} id="popup_menu" />
      </div>
    </div>
  );
};

export default MenuTop;
