import {
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';
import { Skeleton } from '../../../components/ui';

describe('<Skeleton />', () => {
  test('should render a skeleton', async () => {
    const classSkeleton = 'border-circle w-8rem h-8rem';
    const { container, getByRole } = render(
      <Skeleton>
        <Skeleton.Image
          src="/noexists.png"
          alt="Profile"
          className={classSkeleton}
          referrerPolicy="no-referrer"
        />
      </Skeleton>,
    );

    const skeleton = container.querySelectorAll('.border-circle');
    const img = container.querySelector('img');
    const image = getByRole('img', { hidden: true });

    expect(skeleton.length).toBe(1);
    expect(img?.src).toBe('http://localhost/noexists.png');
    expect(img).toHaveStyle('display: none');

    fireEvent.load(image);

    expect(img).not.toHaveStyle('display: none');

    fireEvent.error(image);

    await waitFor(() => {
      expect(container.querySelector('img')?.src).toBe('http://localhost/assets/images/profile.png');
    });
  });
});
