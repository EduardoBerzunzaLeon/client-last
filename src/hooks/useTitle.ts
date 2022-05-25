import { useEffect, useState } from 'react';

interface Props {
    createTitle: string,
    updateTitle: string,
    displayModal: boolean,
    hasEntitySelected: boolean
}

export const useTitle = ({
  createTitle,
  updateTitle,
  displayModal,
  hasEntitySelected,
}: Props) => {
  const [ title, setTitle ] = useState<string>('');

  useEffect(() => {
    (displayModal && !hasEntitySelected)
        && setTitle(createTitle);

    (displayModal && hasEntitySelected)
        && setTitle(updateTitle);
  }, [ displayModal, hasEntitySelected, createTitle, updateTitle ]);

  return { title };
};

export default useTitle;
