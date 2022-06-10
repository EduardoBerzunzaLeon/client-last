import { createSelectFilter } from '../../../../../components/datatable';
import { semesterOptions } from '../../assets/options';

export const SemesterFilter = createSelectFilter({ options: semesterOptions, placeholder: 'Elige el semestre' });

export default SemesterFilter;
