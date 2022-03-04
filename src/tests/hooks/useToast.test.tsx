// import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import { mount } from 'enzyme';
import { Toast } from 'primereact/toast';
import useToast from '../../hooks/useToast';

describe('useToast', () => {
  test('should render the message in toast', () => {
    const { result } = renderHook(
      () => useToast(),
    );

    const wrapper = mount(<Toast ref={result.current.toast} />);
    expect(wrapper.html()).toEqual(expect.not.stringContaining('success message'));

    act(() => {
      result.current.showInfo({ summary: 'Info', detail: 'success message' });
    });

    expect(wrapper.html()).toEqual(expect.stringContaining('success message'));
    expect(wrapper.html()).toEqual(expect.stringContaining('Info'));
  });
});
