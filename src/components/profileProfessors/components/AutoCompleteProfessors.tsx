import { useEffect, useState } from 'react';

import {
  AutoComplete,
  AutoCompleteChangeParams,
  AutoCompleteCompleteMethodParams,
} from 'primereact/autocomplete';
import { Professor } from '../../../interfaces';
import { TextImageBody } from '../../datatable';

import {
  useGetProfessorsByFullNameQuery,
  useGetProfessorsQuery,
} from '../../../redux/professor/professor.api';
import { SkeletonDropdown } from '../../ui';

export interface ProfessorItem {
  fullname: string,
  value: string,
  avatar: string
}

const prepareData = (data: Professor[]): ProfessorItem[] => data.map((p) => ({
  fullname: p.fullname,
  value: p.id,
  avatar: p.avatar || '',
}));

interface Props {
    value: any,
    onChange(e: AutoCompleteChangeParams): void,
    disabled?: boolean,
}

const itemTemplate = (item: any) => (
  <TextImageBody text={item.fullname} imageURL={item.avatar} />
);

export const AutoCompleteProfessors = ({ value, onChange, disabled }: Props) => {
  const [ filteredItems, setFilteredItems ] = useState<ProfessorItem[] | []>([]);
  const [ query, setQuery ] = useState<string>('');
  const [ skip, setSkip ] = useState<boolean>(true);

  const {
    data,
    isLoading,
  } = useGetProfessorsQuery('professors', { skip });

  const {
    data: professors,
    isLoading: isLoadingSpecific,
  } = useGetProfessorsByFullNameQuery(query, { skip: !query });

  useEffect(() => {
    if (query && !isLoadingSpecific) {
      setFilteredItems(prepareData(professors?.data ?? []));
    } else if (!isLoading) {
      setFilteredItems(prepareData(data?.data ?? []));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    query,
    isLoading,
    isLoadingSpecific,
    professors,
    data,
  ]);

  const searchItems = (event: AutoCompleteCompleteMethodParams) => {
    if (event.originalEvent.type === 'click' && query) {
      setFilteredItems([]);
    } else if (!query && !event.query) {
      setFilteredItems(prepareData(data?.data ?? []));
    } else {
      setQuery(event.query.trim());
    }
  };

  const onHide = () => {
    setQuery('');
  };

  const onFocus = () => {
    setSkip(false);
  };

  return (
    <AutoComplete
      name="professor"
      id="professor"
      value={value}
      onChange={onChange}
      suggestions={filteredItems}
      completeMethod={searchItems}
      virtualScrollerOptions={{
        lazy: true,
        itemSize: 38,
        showLoader: true,
        loading: isLoading,
        loadingTemplate: SkeletonDropdown,
      }}
      field="fullname"
      dropdown
      forceSelection
      itemTemplate={itemTemplate}
      onHide={onHide}
      onFocus={onFocus}
      className="w-full"
      aria-label="Professors"
      panelClassName="overflow-hidden"
      disabled={disabled}
      dropdownMode="current"
    />
  );
};

AutoCompleteProfessors.defaultProps = {
  disabled: false,
};

export default AutoCompleteProfessors;
