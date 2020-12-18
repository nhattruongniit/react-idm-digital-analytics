import React from 'react';

// assets
import FolderIcon from 'assets/images/icon-folder.svg';
import PlugIcon from 'assets/images/icon-plug.png';

const dataList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

function GridView() {
  return (
    <div className="dashboardGrid_list">
      {dataList.map(data => (
        <div key={data} className="dashboardGrid_item">
          <div className="dashboardGrid_folder">
            <img src={FolderIcon} alt="Folder" />
            <div className="dashboardGrid_quantity">
              <div className="dashboardGrid_quantity_row">
                <div className="dashboardGrid_quantity_title">IDF Docs</div>
                <div className="dashboardGrid_quantity_number">1</div>
              </div>
              <div className="dashboardGrid_quantity_row">
                <div className="dashboardGrid_quantity_title">Simulations</div>
                <div className="dashboardGrid_quantity_number">10</div>
              </div>
              <div className="dashboardGrid_quantity_row">
                <div className="dashboardGrid_quantity_title">Graphs</div>
                <div className="dashboardGrid_quantity_number">2</div>
              </div>
            </div>
            <div className="dashboardGrid_blur">
              <button type="button">Open</button>
            </div>
          </div>
          <div className="dashboardGrid_infor">
            <img src={PlugIcon} alt="Plug" />
            <div className="dashboardGrid_description">
              <div className="dashnoardGrid_title">tony-project</div>
              <div className="dashboardGrid_option">
                <div className="dashboardGrid_option_version">v 8.4</div>
                <div className="dashboardGrid_option_date">DEC 16, 2020 00:29</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default GridView
