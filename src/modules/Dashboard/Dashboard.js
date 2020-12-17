
// carbon icons
import GridIcon from '@carbon/icons-react/es/grid/20';
import ListIcon from '@carbon/icons-react/es/list/20';

// components
import GridView from 'components/GridView';

const Dashboard = () => {
  return (
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
      <div className="dashboard_content">
        <GridView />
      </div>
    </div>
  )
};

export default Dashboard;
