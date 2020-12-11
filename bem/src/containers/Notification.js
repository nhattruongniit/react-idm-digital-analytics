import { connect } from 'react-redux';
import Notification from '../components/Notification';

import { canAcceptCanDenyNotification, seenNotification, fetchNotificationSuccesss } from '../reducers/notification';

const mapStateToProps = state => {
  // const dummyData = [
  //   {
  //     "id": 1,
  //     "email": "email@example.com",
  //     "first_name": "Tony",
  //     "last_name":  "Nguyen",
  //     "avatar_url": "http://example.com/pic.jpg",
  //     "created_at": "2020-08-10 14:48:25",
  //     // String - define how to group notifications in stack
  //     "group":   "Billing", // | "Collaboration" | "Simulation", 
  //     "type":    "warning", // "info" | "warning" | "alert" | "success",
  //     "title":   "Up to 100 characters text",
  //     "message": `Up to 300 characters text message. 
  //       Up to 300 characters text message. 
  //       Up to 300 characters text message. 
  //       Up to 300 characters text message`,
  //     "seen": 0, //   0 | 1,
  //     "user_data": {
  //       "avatar_url": '',
  //       "name": 'tony',
  //       "email": 'tony.nguyen@usonialabs.com'
  //     },
  //     "user_options": {
  //         // Number of options and keys will vary
  //         // So, loop trough them
  //         // Can be null, if no actions are available for this notification
  //       "Accept": "https://some-api/long_key/accept",
  //       "Reject": "https://some-api/long_key/reject"
  //     },
  //     "action_response": null, //"Up to 50 characters string" | null
  //   },
  //   {
  //     "id": 2,
  //     "email": "email@example.com",
  //     "first_name": "Tony",
  //     "last_name":  "Nguyen",
  //     "avatar_url": "http://example.com/pic.jpg",
  //     "created_at": "2020-08-10 14:48:25",
  //     // String - define how to group notifications in stack
  //     "group":   "Billing", // | "Collaboration" | "Simulation", 
  //     "type":    "warning", // "info" | "warning" | "alert" | "success",
  //     "title":   "Up to 100 characters text",
  //     "message": `Up to 300 characters text message. 
  //       Up to 300 characters text message. 
  //       Up to 300 characters text message. 
  //       Up to 300 characters text message`,
  //     "seen": 0, //   0 | 1,
  //     "user_data": {
  //       "avatar_url": '',
  //       "name": 'tony',
  //       "email": 'tony.nguyen@usonialabs.com'
  //     },
  //     "user_options": {
  //         // Number of options and keys will vary
  //         // So, loop trough them
  //         // Can be null, if no actions are available for this notification
  //       "Accept": "https://some-api/long_key/accept",
  //       "Reject": "https://some-api/long_key/reject"
  //     },
  //     "action_response": null, //"Up to 50 characters string" | null
  //   },
  //   {
  //     "id": 3,
  //     "email": "email@example.com",
  //     "first_name": "Tony",
  //     "last_name":  "Nguyen",
  //     "avatar_url": "http://example.com/pic.jpg",
  //     "created_at": "2020-08-10 14:48:25",
  //     // String - define how to group notifications in stack
  //     "group":   "Billing", // | "Collaboration" | "Simulation", 
  //     "type":    "warning", // "info" | "warning" | "alert" | "success",
  //     "title":   "Up to 100 characters text",
  //     "message": `Up to 300 characters text message. 
  //       Up to 300 characters text message. 
  //       Up to 300 characters text message. 
  //       Up to 300 characters text message`,
  //     "seen": 0, //   0 | 1,
  //     "user_data": {
  //       "avatar_url": '',
  //       "name": 'tony',
  //       "email": 'tony.nguyen@usonialabs.com'
  //     },
  //     "user_options": {
  //         // Number of options and keys will vary
  //         // So, loop trough them
  //         // Can be null, if no actions are available for this notification
  //       "Accept": "https://some-api/long_key/accept",
  //       "Reject": "https://some-api/long_key/reject"
  //     },
  //     "action_response": null, //"Up to 50 characters string" | null
  //   },
  // ];
  // const data = {};
  // for (let item of dummyData) {
  //   if(!data[item.group]) {
  //     data[item.group] = []
  //   }
  //   data[item.group].push(item)
  // }
  const notifies = state.notification.notifies;

  return {
    notifies
  }
}

const mapDispatchToProps = {
  canAcceptCanDenyNotification,
  seenNotification,
  fetchNotificationSuccesss
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
