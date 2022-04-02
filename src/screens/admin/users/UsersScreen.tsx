import { HeaderAdmin } from '../../../components/headerAdmin/HeaderAdmin';
import { useGetUsersQuery } from '../../../redux/user/user.api';
import { User } from '../../../interfaces/api';

import { withSpinnerRTK } from '../../../components/withSpinnerRTK/withSpinnerRTK';

const HeaderTest = ({ data }: {data: User[]}) => {
  console.log(data);
  return (<HeaderAdmin position="users" title="Usuarios" />);
};

const UsersScreen = () => {
  const Component = withSpinnerRTK(HeaderTest, useGetUsersQuery);

  return <Component />;
};

export default UsersScreen;
