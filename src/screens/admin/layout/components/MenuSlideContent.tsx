import { useState, MouseEvent } from 'react';

import { CSSTransition } from 'react-transition-group';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

import { closeSider } from '../../../../redux/ui/ui.slice';
import { Menu } from '../../../../utils/menuElement';
import { useAppDispatch } from '../../../../redux/hooks';

export interface SubmenuProps {
    elements: Menu[];
    className?: string;
    root?: boolean;
}

const Submenu = ({ elements, className = '', root = false }: SubmenuProps) => {
  const dispatch = useAppDispatch();
  const [ activeIndex, setActiveIndex ] = useState<number>(0);

  const onMenuItemClick = (
    event: MouseEvent<HTMLAnchorElement>,
    item: Menu,
    index: number,
  ) => {
    if (!item.items) {
      dispatch(closeSider());
    }

    if (index === activeIndex) {
      setActiveIndex(0);
    } else {
      setActiveIndex(index);
    }

    if (item.disabled) {
      event.preventDefault();
    }

    if (item.command) {
      item.command({ originalEvent: event, item });
    }
  };

  const renderLinkContent = (item: Menu) => {
    const submenuIcon = item.items && (
    <i className="pi pi-fw pi-angle-down menuitem-toggle-icon" />
    );

    const badge = item.badge && (
    <span className="menuitem-badge">{item.badge}</span>
    );

    return (
      <>
        <i className={item.icon} />
        <span>{item.label}</span>
        {submenuIcon}
        {badge}
      </>
    );
  };

  const renderLink = (item: Menu, i: number) => {
    const content = renderLinkContent(item);

    if (item.to) {
      return (
        <NavLink
          className={({ isActive }) => (isActive ? 'active-route' : '')}
          onClick={(e) => onMenuItemClick(e, item, i)}
          to={item.to}
          target={item.target}
          end
        >
          {content}
        </NavLink>
      );
    }
    return (
      <a
        href={item.url}
        onClick={(e: MouseEvent<HTMLAnchorElement>) => onMenuItemClick(e, item, i)}
        target={item.target}
      >
        {content}
      </a>
    );
  };

  const items = elements
      && elements.map((item, i) => {
        const active = activeIndex === i;
        const styleClass = classnames({
          'active-menuitem': active && !item.to,
        });

        return (
          <li className={styleClass} key={item.label}>
            {item.items && root === true && <div className="arrow" />}
            {renderLink(item, i)}
            {
                item.items && (
                <CSSTransition
                  classNames="p-toggleable-content"
                  timeout={{ enter: 1000, exit: 450 }}
                  in={active}
                  unmountOnExit
                >
                  <Submenu elements={item.items} />
                </CSSTransition>
                )
            }
          </li>
        );
      });

  return items ? <ul className={className}>{items}</ul> : null;
};

export const MenuSlideContent = ({ model } : { model: Menu[] }) => (
  <div className="layout-menu-container layout-sidebar-dark">
    <Submenu elements={model} className="layout-menu" root />
  </div>
);

export default MenuSlideContent;
