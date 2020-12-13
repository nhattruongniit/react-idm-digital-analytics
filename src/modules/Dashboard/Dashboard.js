// components
import NavBar from './NavBar';
import CenterPanel from './CenterPanel';
import GridLayout from './CenterPanel/GridLayout';
import Loading from 'components/Loading';

const Dashboard = () => {
  return (
    <div className="container">
      <NavBar />
      <CenterPanel>
        <GridLayout />
      </CenterPanel>
      <Loading />
    </div>
  )
};

export default Dashboard;
