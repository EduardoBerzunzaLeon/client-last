import React from 'react';

import { BreadCrumb } from 'primereact/breadcrumb';
import { useNavigate } from 'react-router-dom';

import { convertObjectToArray } from '../../../utils';
import { Generic, MenuItem } from '../../../interfaces';

interface Props {
  position: string,
  title: string,
  hasBreadcumbs: boolean,
}

export const HeaderAdmin = React.memo(({ position, title, hasBreadcumbs }: Props) => {
  const navigate = useNavigate();

  const items: Generic = {
    users: { label: 'Usuarios', command: () => { navigate('/admin/users'); } },
    subjects: { label: 'Materias', command: () => { navigate('/admin/subjects'); } },
    professors: { label: 'Tutores', command: () => { navigate('/admin/professors'); } },
    students: { label: 'Alumnos', command: () => { navigate('/admin/students'); } },
    profile: { label: 'Perfil' },
    professor: { label: 'Maestro' },
    subjectHistory: { label: 'Historial de Materias' },
    home: { label: 'Dashboard' },
  };

  const modelPropierties = position.split('/');
  const models = convertObjectToArray<MenuItem>(modelPropierties, items);

  const home = {
    icon: 'pi pi-home',
    command: () => {
      navigate('/admin');
    },
  };

  return (
    <div className="flex justify-content-between flex-wrap card-container">
      <h2 className="p-card-title font-bold">{title}</h2>
      { hasBreadcumbs && (<BreadCrumb model={models} home={home} />) }
    </div>
  );
});

export default HeaderAdmin;
