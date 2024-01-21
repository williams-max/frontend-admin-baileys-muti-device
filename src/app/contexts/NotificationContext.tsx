import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOAD_NOTIFICATIONS': {
      return { ...state, notifications: action.payload };
    }

    case 'UPDATE_NOTIFICATIONS': {
      return { ...state, notifications: action.payload };
    }


    case 'DELETE_NOTIFICATION': {
      return { ...state, notifications: action.payload };
    }

    case 'CLEAR_NOTIFICATIONS': {
      return { ...state, notifications: action.payload };
    }

    default:
      return state;
  }
};

const NotificationContext = createContext({
  notifications: [],
  deleteNotification: () => { },
  clearNotifications: () => { },
  getNotifications: () => { },
  createNotification: () => { }
});

export const NotificationProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, []);

  const deleteNotification = async (notificationID: any) => {
   
  };

  const clearNotifications = async () => {
  };

  const getNotifications = async () => {
  };

  const createNotification = async (notification: any) => {
 
  };

  return (
    <NotificationContext.Provider
      value={{
        getNotifications,
        deleteNotification,
        clearNotifications,
        createNotification,
        notifications: state.notifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
