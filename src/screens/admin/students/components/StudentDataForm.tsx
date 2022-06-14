import { AutoComplete } from 'primereact/autocomplete';
import { useState, useEffect } from 'react';
import { TextImageBody } from '../../../../components/datatable';

import { StudentResume } from '../../../../interfaces/api';
import { useGetProfessorsByFullNameQuery, useGetProfessorsQuery } from '../../../../redux/professor/professor.api';

interface Props {
    student: StudentResume | undefined;
}

interface ProfessorItem {
  fullname: string,
  value: string,
  avatar: string
}

const prepareData = <T extends ProfessorItem>(data: T[]) => data.map((p) => ({
  fullname: p.fullname,
  value: p.id,
  avatar: p.avatar,
}));

export const StudentDataForm = ({ student }: Props) => {
  console.log(student);
  const [ selectedItem, setSelectedItem ] = useState<any>(null);
  const [ filteredItems, setFilteredItems ] = useState<any>(null);
  const [ query, setQuery ] = useState<string>('');

  const {
    data,
    isLoading,
  } = useGetProfessorsQuery('professors', { skip: !!query });

  const {
    data: professors,
    isLoading: isLoadingSpecific,
  } = useGetProfessorsByFullNameQuery(query, { skip: !query });

  const itemTemplate = (item: any) => (
    <TextImageBody text={item.fullname} imageURL={item.avatar} />
  );

  useEffect(() => {
    let dataPrepare: any[] = [];
    if (query && !isLoadingSpecific) {
      if (professors?.data) {
        dataPrepare = professors.data.map((p) => ({
          fullname: p.fullname,
          value: p.id,
          avatar: p.avatar,
        }));
      }
    } else if (data?.data && !isLoading) {
      dataPrepare = data.data.map((p) => ({
        fullname: p.fullname,
        value: p.id,
        avatar: p.avatar,
      }));
    }
    setFilteredItems(dataPrepare);
  }, [ query, isLoading, isLoadingSpecific, data, professors ]);

  const searchItems = (event: any) => {
    if (query === '' && event.query === '') {
      let dataPrepare: any[] = [];

      if (data) {
        dataPrepare = data?.data.map((p) => ({
          fullname: p.fullname,
          value: p.id,
          avatar: p.avatar,
        }));
      }
      setFilteredItems(dataPrepare);
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
          itemTemplate={itemTemplate}
          onChange={(e) => setSelectedItem(e.value)}
          onHide={onHide}
          className="w-full"
          forceSelection
          panelClassName="overflow-hidden"
        />
      </div>

    </div>

  );
};

export default StudentDataForm;
