import { MouseEvent, useState } from 'react';

import classNames from 'classnames';

import { CSSTransition } from 'react-transition-group';

import { Button } from 'primereact/button';
import useAuth from '../../hooks/useAuth';
import { useAppDispatch } from '../../redux/hooks';
import { closeSider } from '../../redux/ui/ui.slice';
import { setDefaultAuthState } from '../../redux/auth/auth.slice';

export const MenuProfile = () => {
  const dispatch = useAppDispatch();
  const [ expanded, setExpanded ] = useState(false);
  const { user } = useAuth();

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    setExpanded((prevState) => !prevState);
    event.preventDefault();
  };

  const handleLogout = () => {
    dispatch(closeSider());
    dispatch(setDefaultAuthState());
  };

  return (
    <div className="layout-sidebar-dark">
      <div className="layout-profile">
        <div>
          <img
            src={`assets/layout/images/${user?.avatar || 'profile.png'}`}
            alt="Profile"
          />
        </div>
        <Button className="p-link layout-profile-link" onClick={onClick}>
          <span className="username">{user?.name?.first}</span>
          <i className="pi pi-fw pi-cog" />
        </Button>
        <CSSTransition
          classNames="p-toggleable-content"
          timeout={{ enter: 1000, exit: 450 }}
          in={expanded}
          unmountOnExit
        >
          <ul className={classNames({ 'layout-profile-expanded': expanded })}>
            <li>
              <button type="button" className="p-link">
                <i className="pi pi-fw pi-user" />
                <span>Account</span>
              </button>
            </li>
            <li>
              <button type="button" className="p-link">
                <i className="pi pi-fw pi-inbox" />
                <span>Notifications</span>
                <span className="menuitem-badge">2</span>
              </button>
            </li>
            <li>
              <button onClick={handleLogout} type="button" className="p-link">
                <i className="pi pi-fw pi-power-off" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </CSSTransition>
      </div>
    </div>
  );
};

export default MenuProfile;
