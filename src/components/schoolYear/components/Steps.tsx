import {
  useEffect, useMemo, useRef, useState,
} from 'react';

import { Button } from 'primereact/button';
// eslint-disable-next-line import/no-unresolved
import { MenuItem } from 'primereact/menuitem';
import { Steps } from 'primereact/steps';

import { StepContext } from './stepContext';
import './steps.scss';
import { numberUtils } from '../../../utils';

interface Props<T, I> {
  activeStep?: number,
  contextValues?: T,
  initAdvanceValue?: boolean,
  items: I[],
  onChange?: (increaseBy: number) => any
}

export const StepsDemo = <T extends {}, I extends MenuItem>({
  contextValues,
  initAdvanceValue = true,
  activeStep = 0,
  items,
  onChange,
}: Props<T, I>) => {
  const [ canAdvance, setCanAdvance ] = useState(initAdvanceValue);
  const [ activeIndex, setActiveIndex ] = useState(activeStep);
  const isControlled = useRef(Boolean(onChange));

  const memorizedValues = useMemo(() => ({
    canAdvance,
    setCanAdvance,
    ...contextValues,
  }), [ contextValues, canAdvance ]);

  const memorizedActiveItem = useMemo(() => items[activeIndex], [ activeIndex, items ]);

  useEffect(() => setActiveIndex(activeStep), [ activeStep ]);

  const increaseBy = (value: number) => {
    if (isControlled.current) {
      onChange!(value);
      return;
    }

    const maxValue = items.length - 1;
    setActiveIndex((prev) => numberUtils.increaseBy({ value: prev + value, maxValue }));
  };

  const nextMethod = () => {
    if (memorizedActiveItem?.nextButton?.handler) {
      const { nextButton } = memorizedActiveItem;
      return nextButton.handler();
    }

    return increaseBy(1);
  };

  return (
    <StepContext.Provider value={memorizedValues}>
      <div className="steps-custom">
        <Steps
          model={items}
          activeIndex={activeIndex}
          onSelect={(e) => setActiveIndex(e.index)}
          readOnly
        />

        { memorizedActiveItem.children }

        <div className="flex justify-content-between mt-3">
          <Button
            className="p-button-secondary"
            label="Atras"
            icon="pi pi-arrow-left"
            onClick={() => increaseBy(-1)}
          />
          <Button
            label={memorizedActiveItem?.nextButton?.label ?? 'Siguiente'}
            icon="pi pi-arrow-right"
            iconPos="right"
            onClick={() => nextMethod()}
            disabled={!canAdvance}
            loading={memorizedActiveItem?.nextButton?.isLoading ?? false}
          />
        </div>
      </div>
    </StepContext.Provider>
  );
};

StepsDemo.defaultProps = {
  activeStep: 0,
  contextValues: undefined,
  initAdvanceValue: true,
  onChange: undefined,
};

export default StepsDemo;
