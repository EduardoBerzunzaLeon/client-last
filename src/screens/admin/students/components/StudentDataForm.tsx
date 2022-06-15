import { AutoComplete, AutoCompleteCompleteMethodParams } from 'primereact/autocomplete';
import { useState, useEffect } from 'react';
import { TextImageBody } from '../../../../components/datatable';

import { Professor, StudentResume } from '../../../../interfaces/api';
import { useGetProfessorsByFullNameQuery, useGetProfessorsQuery } from '../../../../redux/professor/professor.api';

interface Props {
    student: StudentResume | undefined;
}

interface ProfessorItem {
  fullname: string,
  value: string,
  avatar: string
}

const prepareData = (data: Professor[]): ProfessorItem[] => data.map((p) => ({
  fullname: p.fullname,
  value: p.id,
  avatar: p.avatar || '',
}));

const itemTemplate = (item: any) => (
  <TextImageBody text={item.fullname} imageURL={item.avatar} />
);

export const StudentDataForm = ({ student }: Props) => {
  console.log({ student });
  const [ selectedItem, setSelectedItem ] = useState<ProfessorItem | null>(null);
  const [ filteredItems, setFilteredItems ] = useState<ProfessorItem[] | []>([]);
  const [ query, setQuery ] = useState<string>('');

  const {
    data,
    isLoading,
  } = useGetProfessorsQuery('professors', { skip: !!query });

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
  ]);

  // TODO: convert this in customhook or a customcomponent
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

  return (
    <div>
      <h5>Virtual Scroll (100000 Items)</h5>
      <div className="field pt-2">
        <AutoComplete
          value={selectedItem}
          suggestions={filteredItems}
          completeMethod={searchItems}
          virtualScrollerOptions={{
            itemSize: 38,
            showLoader: true,
            delay: 250,
          }}
          field="fullname"
          dropdown
          forceSelection
          itemTemplate={itemTemplate}
          onChange={(e) => setSelectedItem(e.value)}
          onHide={onHide}
          className="w-full"
          aria-label="Professors"
          panelClassName="overflow-hidden"
        />
      </div>

    </div>

  );
};

export default StudentDataForm;
