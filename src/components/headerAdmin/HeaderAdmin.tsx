import React from 'react';

import { BreadCrumb } from 'primereact/breadcrumb';
import { useNavigate } from 'react-router-dom';

import { convertArrayToObject } from '../../utils/convertArrayToObject';
import { Generic } from '../../interfaces/generic';
import { MenuItem } from '../../interfaces/ui/primereact/menuItemInterface';

interface Props {
  position: string,
  title: string
}

export const HeaderAdmin = React.memo(({ position, title }: Props) => {
  const navigate = useNavigate();

  const items: Generic = {
    users: { label: 'Usuarios', command: () => { navigate('/admin/users'); } },
    profile: { label: 'Perfil' },
  };

  const models = convertArrayToObject<MenuItem>(position, items);

  const home = {
    icon: 'pi pi-home',
    command: () => {
      navigate('/admin');
    },
  };

  return (
    <div className="flex justify-content-between flex-wrap card-container">
      <h2 className="p-card-title font-bold">{title}</h2>
      <BreadCrumb model={models} home={home} />
    </div>
  );
});

export default HeaderAdmin;
