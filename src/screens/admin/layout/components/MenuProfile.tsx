import { MouseEvent, useState } from 'react';

import { Button } from 'primereact/button';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

import { NavLink } from 'react-router-dom';
import { closeSider } from '../../../../redux/ui/ui.slice';
import { setDefaultAuthState } from '../../../../redux/auth/auth.slice';
import { useAppDispatch } from '../../../../redux/hooks';
import { Skeleton } from '../../../../components/Skeleton/Skeleton';
import useAuth from '../../../../hooks/useAuth';

export const MenuProfile = () => {
  const dispatch = useAppDispatch();
  const [ expanded, setExpanded ] = useState(false);
  const { user } = useAuth();

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    setExpanded((prevState) => !prevState);
    event.preventDefault();
  };

  const handleLogout = () => {
    dispatch(setDefaultAuthState());
    dispatch(closeSider());
  };

  const handleClickLink = () => {
    dispatch(closeSider());
  };

  return (
    <div className="layout-sidebar-dark">
      <div className="layout-profile">
        <div className="flex justify-content-center">
          <figure>
            <Skeleton classNameSkeleton="border-circle w-6rem h-6rem">
              <img
                src="https://lh3.googleusercontent.com/a-/AOh14GgCTImJUSPX48BAHretaktttHcq-gangEKBbowa=s96-c"
                alt="Profile"
                className="border-circle border-purple-300 border-3 w-6rem h-6rem m-2"
                referrerPolicy="no-referrer"
              />
            </Skeleton>
          </figure>
        </div>
        <Button className="layout-profile-link" onClick={onClick}>
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
              <NavLink
                className={({ isActive }) => classNames('p-link flex align-items-center', { 'active-route': isActive })}
                to={`/admin/users/${user?.id}`}
                onClick={handleClickLink}
              >
                <i className="pi pi-fw pi-user" />
                <span>Account</span>
              </NavLink>

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
