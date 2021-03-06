import { Button } from 'primereact/button';
import classNames from 'classnames';

import { Generic } from '../../../interfaces';
import './slipButton.scss';

interface Props extends Generic{
    color: string,
    icon: string,
    label: string,
}

export const SlipButton = ({
  color, icon, label, ...props
}: Props) => {
  const buttonClass = classNames('button-slip', color, 'p-0', 'mt-1', 'w-full');
  const iconClass = classNames('pi', `pi-${icon}`, 'px-2');
  return (
    <div className="container-slip ">
      <Button className={buttonClass} {...props}>
        <i className={iconClass} />
        <span className="px-3">{label}</span>
      </Button>
    </div>
  );
};

export default SlipButton;
