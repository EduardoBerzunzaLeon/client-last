import React from 'react';
import { Button } from 'primereact/button';
import classNames from 'classnames';

import './slipButton.scss';

interface Props {
    color: string,
    icon: string,
    label: string,
    [x: string]: any
}

export const SlipButton = ({
  color, icon, label, ...props
}: Props) => {
  const buttonClass = classNames('button-slip', color, 'p-0', 'mt-1');
  const iconClass = classNames('pi', `pi-${icon}`, 'px-2');
  console.log('slip');
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
