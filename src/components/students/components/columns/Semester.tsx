import { createSelectFilter } from '../../../datatable';
import { semesterOptions } from '../../assets';

export const SemesterFilter = createSelectFilter({ options: semesterOptions, placeholder: 'Elige el semestre' });

export default SemesterFilter;
