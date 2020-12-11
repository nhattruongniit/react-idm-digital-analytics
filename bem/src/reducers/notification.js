import moment from 'moment';
import notificationRequest from 'services/request';

export const FETCH_NOTIFICATION_SUCCESS = 'NOTIFICATION/FETCH_NOTIFICATION_SUCCESS';
export const ADD_NOTIFICATION = 'NOTIFICATION/ADD_NOTIFICATION';

export const fetchNotificationSuccesss = data => ({
  type: FETCH_NOTIFICATION_SUCCESS,
  payload: { data },
})

export const fetchNotification = () => async dispatch => {
  const res = await notificationRequest('/notifications');
  const data = res.data.data;
  if(data && data.length > 0) {
    data.sort((p1, p2) => {
      const d1 = moment(p1.created_at).toDate();
      const d2 = moment(p2.created_at).toDate();
      return d2 - d1;
    });
  }
  dispatch(fetchNotificationSuccesss(data));
}

export const addNotification = data => async dispatch => {
  dispatch({
    type: ADD_NOTIFICATION,
    payload: { data },
  });
}

export const canAcceptCanDenyNotification = (id, url) => async (dispatch, getState) => {
  const notifies = getState().notification.notifies;
  const newNotifies = notifies.filter(noti => noti.id !== id);
  dispatch(fetchNotificationSuccesss(newNotifies))
  try {
    await notificationRequest(url);
  } catch(e) {
    alert('Notification not found');
  }
}

export const seenNotification = url => async () => {
  await notificationRequest(url);
}

/* reducer */
const initialState = {
  notifies: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifies: action.payload.data
      };
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifies: [...state.notifies, action.payload.data]
      };
    default:
      return state;
  }
}
