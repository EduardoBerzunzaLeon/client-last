import { useMemo, useState } from 'react';

import { Button } from 'primereact/button';
// eslint-disable-next-line import/no-unresolved
import { MenuItem } from 'primereact/menuitem';
import { Steps } from 'primereact/steps';

import { Generic } from '../../../interfaces';
import { StepContext } from './stepContext';
import './steps.scss';

type StepItem = MenuItem & Generic;

interface Props {
  initAdvanceValue?: boolean;
  contextValues?: Generic,
  items: StepItem[]
}

export const StepsDemo = ({ contextValues, initAdvanceValue, items }: Props) => {
  const [ canAdvance, setCanAdvance ] = useState(initAdvanceValue ?? true);

  const memorizedValues = useMemo(() => ({
    canAdvance,
    setCanAdvance,
    ...contextValues,
  }), [ contextValues, canAdvance ]);

  const [ activeIndex, setActiveIndex ] = useState(0);

  const increaseBy = (value: number): void => {
    setActiveIndex((prev) => Math.max(Math.min(prev + value, items.length - 1), 0));
  };

  const nextMethod = () => {
    if (typeof items[activeIndex]?.nextButton === 'function') {
      const { nextButton } = items[activeIndex];
      return nextButton!();
    }

    return increaseBy(1);
  };

  return (
    <StepContext.Provider value={memorizedValues}>
      <div className="steps-demo">
        <div className="card">
          <h5>Interactive</h5>
          <Steps
            model={items}
            activeIndex={activeIndex}
            onSelect={(e) => setActiveIndex(e.index)}
            readOnly
          />

          { items[activeIndex].children }

          <div className="flex justify-content-between">
            <Button
              className="p-button-secondary"
              label="Atras"
              icon="pi pi-arrow-left"
              onClick={() => increaseBy(-1)}
            />
            <Button
              label={items[activeIndex].nextButtonLabel ?? 'Siguiente'}
              icon="pi pi-arrow-right"
              iconPos="right"
              onClick={() => nextMethod()}
              disabled={!canAdvance}
            />
          </div>
        </div>
      </div>
    </StepContext.Provider>
  );
};

StepsDemo.defaultProps = {
  contextValues: undefined,
  initAdvanceValue: true,
};

export default StepsDemo;
