import _ from "lodash";

// components
import NavBar from './NavBar';
import CenterPanel from './CenterPanel';
import GridLayout from './CenterPanel/GridLayout';



const Dashboard = () => {

  return (
    <div className="container">
      <NavBar />
      <CenterPanel>

      
      <GridLayout />
      </CenterPanel>
    </div>
  )
};

export default Dashboard;
