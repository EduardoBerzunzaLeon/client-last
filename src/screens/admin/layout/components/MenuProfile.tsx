import { MouseEvent, useState } from 'react';

import { Button } from 'primereact/button';
import { CSSTransition } from 'react-transition-group';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { closeSider } from '../../../../redux/ui/ui.slice';
import { setDefaultAuthState } from '../../../../redux/auth/auth.slice';
import { useAppDispatch } from '../../../../redux/hooks';
import { useAuth } from '../../../../hooks';
import { Skeleton } from '../../../../components/ui';
import { setDefaultSchoolYearState } from '../../../../redux/schoolYear/schoolYear.slice';

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
    dispatch(setDefaultSchoolYearState());
    dispatch(closeSider());
  };

  const handleClickLink = () => {
    dispatch(closeSider());
  };

  return (
    <div className="layout-sidebar-dark">
      <div className="layout-profile">
        <div className="flex justify-content-center">
          <Skeleton
            className="border-circle w-6rem h-6rem"
          >
            <Skeleton.Image
              src={user?.avatar}
              imgError="/assets/images/profile.png"
              alt="Profile"
              className="border-circle border-purple-300 border-3 w-6rem h-6rem m-2"
              referrerPolicy="no-referrer"
            />
          </Skeleton>

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
                <span>Mi Perfil</span>
              </NavLink>

            </li>
            <li>
              <button onClick={handleLogout} type="button" className="p-link">
                <i className="pi pi-fw pi-power-off" />
                <span>Cerrar Sesión</span>
              </button>
            </li>
          </ul>
        </CSSTransition>
      </div>
    </div>
  );
};

export default MenuProfile;
