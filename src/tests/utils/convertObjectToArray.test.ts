import { Generic } from '../../interfaces/generic';
import { convertObjectToArray } from '../../utils/convertObjectToArray';

describe('Convert Object To Array', () => {
  test('should convert correctly the object to arrray', () => {
    const items: Generic = {
      users: { label: 'Users', extraElement: false },
      teachers: { label: 'Teachers' },
      profile: { label: 'Profile' },
    };

    const newArray = convertObjectToArray('users/profile/noexist', items);
    expect(newArray).toEqual([{ label: 'Users', extraElement: false }, { label: 'Profile' }]);
  });
});
