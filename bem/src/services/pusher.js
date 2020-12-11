import Pusher from 'usonia-pusher-client';
import { toast } from 'react-toastify';
import request from './request';
import { addProjectItems, updateProjectItem, hideCircleTile } from '../modules/Projects/reducers/projects';
import { addDocumentItem, hideCircleTileDocument } from '../modules/Projects/reducers/documents';
import { addViewItems, hideCircleTileView } from '../modules/Views/reducers/views';
import { hideCircleTileChart } from '../modules/Charts/reducers/charts';
import { setContext } from "../reducers/contexts";
import { addSimulatorItems, resetCircleTileSimulator } from '../modules/Simulators/reducers/simulators';
import { addNotification } from '../reducers/notification';

let pusher;
let channelName;

export async function initPusher(dispatch) {

  try {
    const res = await request('/pusher');

    const { APP_UID } = res.data.data;

    const pusher_options = {
      server: process.env.REACT_APP_PUSHER_API,
      app_key: process.env.REACT_APP_PUSHER_KEY
    };
    
    setContext(dispatch)("idf-pusher", pusher_options);

    pusher = new Pusher(pusher_options);
    channelName = APP_UID;
    pusher.subscribe([channelName]);

    /** start project */
    pusher.on('create-project', data => {
      const project = data.data;
      dispatch(addProjectItems([project]));
    });

    pusher.on('update-project', data => {
      const {id, ...updateData} = data.data;
      dispatch(updateProjectItem(id, updateData));
    });

    pusher.on('delete-project', data => {
      const { id } = data.data;
      dispatch(hideCircleTile(id));
    })
    /** end project */

    /** start idf document */
    pusher.on('create-idf-document', data => {
      const document = data.data;
      dispatch(addDocumentItem(document));
    });

    pusher.on('delete-idf-document', data => {
      const { id } = data.data;
      dispatch(hideCircleTileDocument(id));
    })
    /** end idf document */

    /** start views */
    pusher.on('create-view', data => {
      const view = data.data;
      dispatch(addViewItems([view]));
    });
    pusher.on('delete-view', data => {
      const { id } = data.data;
      dispatch(hideCircleTileView(id));
    });
    /** end views */

    /** start chart */

    pusher.on('create-chart', data => {
      const view = data.data;
      console.log('=========create chart pusher', view)
      // dispatch(addViewItems([view]));
    });

    pusher.on('delete-chart', data => {
      const { id } = data.data;
      dispatch(hideCircleTileChart(id));
    });
    /** end chart */

    /** start simlation */
    pusher.on('create-simulation', data => {
      const simulatorItems = data.data;
      dispatch(addSimulatorItems([simulatorItems]))
      dispatch(resetCircleTileSimulator(simulatorItems.id));
    });
    pusher.on('delete-simulation', data => {
      const { id } = data.data;
      console.log('=========delete simulation', id)
      // dispatch(hideCircleTileChart(id));
    });

    /** end simulation */

    /* start notification */
    pusher.on('create-notification', data => {
      const notification = data.data;
      dispatch(addNotification(notification));
    });
    /* end notification */

    pusher.on('create-logs', data => {
      const {
        data: { message, type }
      } = data;
      const getToastType = {
        notice: 'success',
        error: 'error',
        success: 'success'
      };
      toast(message, {
        type: getToastType[type],
        autoClose: 6000
      });
    });

  } catch (e) {
    console.log('Pusher error', e);
    toast('Unable to subscribe to pusher', {
      type: 'error',
      autoClose: 6000
    });
  }
}

export function subscribeToDocumentChannel(documentId) {
  if (pusher && channelName) {
    const newChannelName = `${documentId}@${channelName}`;
    console.log('Subscribe to ' + newChannelName);
    pusher.subscribe([channelName, newChannelName]);
  }
}
