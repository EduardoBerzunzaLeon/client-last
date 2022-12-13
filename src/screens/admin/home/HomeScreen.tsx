import { HeaderAdmin } from '../../../components/ui';
import { AtRiskStudents, InChanellingStudents } from '../../../components/dashboard';

export const HomeScreen = () => (
  <>
    <HeaderAdmin position="home" title="Dashboard" hasBreadcumbs />
    <div className="grid">
      <div className="col-12 lg:col-6">
        <AtRiskStudents />
      </div>
      <div className="col-12 lg:col-6">
        <InChanellingStudents />
      </div>
    </div>
  </>
);

export default HomeScreen;
