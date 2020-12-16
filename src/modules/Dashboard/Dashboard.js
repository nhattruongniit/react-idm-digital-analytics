
// carbon icons
import GridIcon from '@carbon/icons-react/es/grid/20';
import ListIcon from '@carbon/icons-react/es/list/20';

const Dashboard = () => {
  return (
    <div className="container">
      <div className="dashboard">
        <div className="dashboard_top">
          <div className="dashboard_title">Project</div>
          <div className="dashboard_mode">
            <span>
              <GridIcon />
            </span>
            <span>
              <ListIcon /> 
            </span>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Dashboard;
