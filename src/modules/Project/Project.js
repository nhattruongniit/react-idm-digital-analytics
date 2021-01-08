import { useState } from 'react';

// carbon core
import { Button } from 'carbon-components-react';

// carbon icon
import FolderAddIcon from '@carbon/icons-react/es/folder--add/16';

// hooks
import usePagination from 'hooks/usePagination';

// components
import Pagination from 'components/Pagination';
import ModeType from './ModeType';
import ProjectLayout from './ProjectLayout';
import ModalCreateProject from './ModalCreateProject';

const Project = () => {
  const [openCreateProject, setOpenCreateProject] = useState(false);
  const { page, perPage, onChangePage } = usePagination();

  function onCloseModalCreateProject() {
    setOpenCreateProject(false)
  }
  
  return (
    <div className="dashboard">
       <div className="dashboard_top">
          <div className="dashboard_toolbar">
            <div className="dashboard_title">Project</div>
            <ModeType />
          </div>
          <div className="dashboard_createNew">
            <Button kind="primary" size="small" onClick={() => setOpenCreateProject(true)}>
              Create new &nbsp; 
              <FolderAddIcon fill="white" />
            </Button> 
          </div>
        </div>
      <div className="dashboard_content">
        <ProjectLayout />
        
        <Pagination totalItems={8} currentPage={page} perPage={perPage} onChangePagination={onChangePage} />
        <ModalCreateProject openCreateProject={openCreateProject} onCloseModalCreateProject={onCloseModalCreateProject} />
      </div>
    </div>
  )
};

export default Project;
