import { MouseEvent } from 'react';

interface Command {
  originalEvent: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
  // eslint-disable-next-line no-use-before-define
  item: Menu;
}

export interface Menu {
  label: string;
  icon: string;
  to?: string;
  badge?: string;
  disabled?: boolean;
  target?: string;
  url?:string;
  expanded?: boolean;
  separator?: boolean;
  className?: string;
  template?: any;
  items?: Menu[];
  command?: (props: Command) => void;
}

export const menu: Menu[] = [
  { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/admin' },
  {
    label: 'Pages',
    icon: 'pi pi-fw pi-clone',
    items: [
      { label: 'Crud', icon: 'pi pi-fw pi-user-edit', to: '/crud' },
      {
        label: 'Calendar',
        icon: 'pi pi-fw pi-calendar-plus',
        to: '/calendar',
      },
      { label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/timeline' },
      { label: 'Empty Page', icon: 'pi pi-fw pi-circle-off', to: '/empty' },
    ],
  },
  {
    label: 'Menu Hierarchy',
    icon: 'pi pi-fw pi-search',
    items: [
      {
        label: 'Submenu 1',
        icon: 'pi pi-fw pi-bookmark',
        items: [
          {
            label: 'Submenu 1.1',
            icon: 'pi pi-fw pi-bookmark',
            items: [
              { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
              { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
              { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
            ],
          },
          {
            label: 'Submenu 1.2',
            icon: 'pi pi-fw pi-bookmark',
            items: [
              { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' },
              { label: 'Submenu 1.2.2', icon: 'pi pi-fw pi-bookmark' },
            ],
          },
        ],
      },
      {
        label: 'Submenu 2',
        icon: 'pi pi-fw pi-bookmark',
        items: [
          {
            label: 'Submenu 2.1',
            icon: 'pi pi-fw pi-bookmark',
            items: [
              { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
              { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
              { label: 'Submenu 2.1.3', icon: 'pi pi-fw pi-bookmark' },
            ],
          },
          {
            label: 'Submenu 2.2',
            icon: 'pi pi-fw pi-bookmark',
            items: [
              { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
              { label: 'Submenu 2.2.2', icon: 'pi pi-fw pi-bookmark' },
            ],
          },
        ],
      },
    ],
  },
];

export default { menu };
