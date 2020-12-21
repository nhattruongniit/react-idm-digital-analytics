import React from 'react';
import dayjs from 'dayjs';

// assets
import FolderIcon from 'assets/images/icon-folder.svg';
import PlugIcon from 'assets/images/icon-plug.png';


function GridView({ data, onOpen }) {
  return (
    <div className="dashboardGrid_root">
      {data.map(item => (
        <div key={item.id} className="dashboardGrid_item">
          <div className="dashboardGrid_folder">
            <img src={FolderIcon} alt="Folder" />
            <div className="dashboardGrid_quantity">
              <div className="dashboardGrid_quantity_row">
                <div className="dashboardGrid_quantity_title">IDF Docs</div>
                <div className="dashboardGrid_quantity_number">{item.idf_documents}</div>
              </div>
              <div className="dashboardGrid_quantity_row">
                <div className="dashboardGrid_quantity_title">Simulations</div>
                <div className="dashboardGrid_quantity_number">{item.simulations}</div>
              </div>
              <div className="dashboardGrid_quantity_row">
                <div className="dashboardGrid_quantity_title">Graphs</div>
                <div className="dashboardGrid_quantity_number">{item.charts}</div>
              </div>
            </div>
            <div className="dashboardGrid_blur">
              <button type="button" onClick={onOpen(item.id)}>Open</button>
            </div>
          </div>
          <div className="dashboardGrid_infor">
            <img src={PlugIcon} alt="Plug" />
            <div className="dashboardGrid_description">
              <div className="dashnoardGrid_title">{item.project_name}</div>
              <div className="dashboardGrid_option">
                <div className="dashboardGrid_option_version">v {item.version}</div>
                <div className="dashboardGrid_option_date">
                  {dayjs(item.updated_at).format('MMM DD, YYYY HH:mm')}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default GridView
