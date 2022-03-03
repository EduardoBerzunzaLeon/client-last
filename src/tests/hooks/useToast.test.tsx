// import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { mount } from 'enzyme';
import { Toast } from 'primereact/toast';
import useToast from '../../hooks/useToast';

describe('useToast', () => {
  test('should return user null by toast default', () => {
    const { result } = renderHook(
      () => useToast(),
    );

    const wrapper = mount(<Toast ref={result.current.toast} />);

    act(() => {
      result.current.showInfo({ summary: 'msg', detail: 'msg' });
    });

    console.log(wrapper.html());
    const div = wrapper.find('div').at(1).props();
    // const message = wrapper.find('.p-toast-summary');

    console.log(div);
    // expect(wrapper.html()).tocon(1);
  });

  //   test('should return user logged', async () => {

  //     const { result, waitForNextUpdate } = renderHook(
  //       () => useAuth(),
  //       { wrapper },
  //     );

  //     await waitForNextUpdate();
  //     const { user } = result.current;

//   });
});
