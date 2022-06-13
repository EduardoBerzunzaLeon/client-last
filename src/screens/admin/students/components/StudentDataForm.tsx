import { AutoComplete } from 'primereact/autocomplete';
import { useState } from 'react';
import { TextImageBody } from '../../../../components/datatable';

import { StudentResume } from '../../../../interfaces/api';
import { useGetProfessorsQuery } from '../../../../redux/professor/professor.api';

interface Props {
    student: StudentResume | undefined;
}
// const items = Array.from({ length: 100000 }).map((_, i) => ({ label: `Item #${i}`, value: i }));

export const StudentDataForm = ({ student }: Props) => {
  console.log(student);
  const [ selectedItem, setSelectedItem ] = useState<any>(null);
  const [ filteredItems, setFilteredItems ] = useState<any>(null);
  //   const [ query, setQuery ] = useState<string>('');

  const {
    data,
  } = useGetProfessorsQuery('professors');

  //   const {
  //     data: professors,
  //   } = useGetProfessorsByFullNameQuery(query, { skip: !!query });

  console.log({ filteredItems });
  //   useEffect(() => {
  //     setFilteredItems(professors?.data);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [ professors ]);

  const itemTemplate = (item: any) => {
    console.log({ item });
    return (
      <TextImageBody text={item.fullname} imageURL={item.avatar} />
    );
  };

  const searchItems = (event: any) => {
    //   setQuery(event.query);

    console.log(event);
    let dataPrepare: any[] = [];
    if (data?.data) {
      dataPrepare = data.data.map((professor) => ({
        fullname: professor.fullname,
        value: professor.id,
        avatar: professor.avatar,
      }));
    }
    setFilteredItems(dataPrepare);
  };

  return (
    <div>
      <h5>Virtual Scroll (100000 Items)</h5>
      <AutoComplete
        value={selectedItem}
        suggestions={filteredItems}
        completeMethod={searchItems}
        virtualScrollerOptions={{ itemSize: 38 }}
        field="fullname"
        dropdown
        itemTemplate={itemTemplate}
        onChange={(e) => setSelectedItem(e.value)}
      />
    </div>
  );
};

export default StudentDataForm;
