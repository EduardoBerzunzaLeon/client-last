export const semesterOptions = [
  { label: 'Semestre 1', value: '1' },
  { label: 'Semestre 2', value: '2' },
  { label: 'Semestre 3', value: '3' },
  { label: 'Semestre 4', value: '4' },
  { label: 'Semestre 5', value: '5' },
  { label: 'Semestre 6', value: '6' },
  { label: 'Semestre 7', value: '7' },
  { label: 'Semestre 8', value: '8' },
  { label: 'Semestre 9', value: '9' },
];

export const atRiskOptions = [
  { label: 'No', value: 'no' },
  { label: 'Último intento', value: 'ultimo intento' },
  { label: 'Única materia', value: 'unica materia' },
  { label: 'No termina', value: 'no termina' },
];

export const inChanellingOptions = [
  { label: 'No', value: 'no' },
  { label: 'Asesoria', value: 'asesoria' },
  { label: 'Mentoria', value: 'mentoria' },
  { label: 'A. Psícologica Int.', value: 'atencion psicologica interna' },
  { label: 'A. Psícologica Ext.', value: 'atencion psicologica externa' },
  { label: 'Consejeria', value: 'consejeria' },
];

export const statusGroupOptions = [
  {
    label: 'Regular',
    items: [
      { label: 'Regular', value: 'regular' },
      { label: 'Egresado', value: 'egresado' },
    ],
  },
  {
    label: 'Irregular',
    items: [
      { label: 'Baja Definitiva', value: 'baja' },
      { label: 'Baja Temporal', value: 'baja temporal' },
      { label: 'Rezago', value: 'rezago' },
    ],
  },

];

export default {
  atRiskOptions,
  inChanellingOptions,
  semesterOptions,
  statusGroupOptions,
};
