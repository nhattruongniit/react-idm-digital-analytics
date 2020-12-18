// components
import Pagination from 'components/Pagination';
import ModeType from './ModeType';
import DashboardLayout from './DashboardLayout';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard_top">
        <div className="dashboard_title">Project</div>
        
        <ModeType />

      </div>
      <div className="dashboard_content">
        <DashboardLayout />
        
        <Pagination totalItems={8} currentPage={1} perPage={10} />
      </div>
    </div>
  )
};

export default Dashboard;
