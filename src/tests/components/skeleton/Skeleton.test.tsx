import {
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';

import { Skeleton } from '../../../components/Skeleton/Skeleton';

describe('<Skeleton />', () => {
  test('should render a skeleton', async () => {
    const classSkeleton = 'border-circle w-8rem h-8rem';
    const imageError = '/assets/images/profile.png';
    const { container, getByRole } = render(
      <Skeleton classNameSkeleton={classSkeleton} imgError={imageError}>
        <img
          src="/noexists.png"
          alt="Profile"
          className="border-circle border-purple-700 border-3 w-8rem h-8rem"
          referrerPolicy="no-referrer"
        />
      </Skeleton>,
    );

    const skeleton = container.querySelectorAll('.border-circle');
    const img = container.querySelector('img');
    const image = getByRole('img', { hidden: true });

    expect(skeleton.length).toBe(2);
    expect(img?.src).toBe('http://localhost/noexists.png');
    expect(img).toHaveStyle('display: none');

    fireEvent.load(image);

    expect(img).not.toHaveStyle('display: none');

    fireEvent.error(image);

    await waitFor(() => {
      expect(container.querySelector('img')?.src).toBe(`http://localhost${imageError}`);
    });
  });
});
