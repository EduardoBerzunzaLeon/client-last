import reducer, { openSider, closeSider } from '../../../redux/ui/ui.slice';

describe('Auth slice', () => {
  test('should return the initial state in false', () => {
    expect(reducer(undefined, { type: 'noExistAction' })).toEqual({
      siderOpen: false,
    });
  });

  test('should set siderOpen', () => {
    expect(reducer({ siderOpen: false }, openSider())).toEqual({
      siderOpen: true,
    });

    expect(reducer({ siderOpen: true }, closeSider())).toEqual({
      siderOpen: false,
    });
  });
});
