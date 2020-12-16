// components
import NavBar from './NavBar';
import CenterPanel from './CenterPanel';
import GridLayout from './CenterPanel/GridLayout';
import Loading from 'components/Loading';

import Header from 'components/Header';

const Dashboard = () => {
  return (
    <div className="container">
      <Header />
      <NavBar />
      <CenterPanel>
        <GridLayout />
      </CenterPanel>
      <Loading />
    </div>
  )
};

export default Dashboard;
