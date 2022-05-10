export const SubjectDataForm = ({ subjectId }: {subjectId?: string}) => {
  console.log(subjectId);

  return (
    <h1>Holi</h1>
  );
};

SubjectDataForm.defaultProps = {
  subjectId: '',
};

export default SubjectDataForm;
