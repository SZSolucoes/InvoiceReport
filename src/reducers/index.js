import { combineReducers } from 'redux';

import EventsReducer from './EventsReducer';
import LoginReducer from './LoginReducer';
import ReportReducer from './ReportReducer';

export default combineReducers({
    EventsReducer,
    LoginReducer,
    ReportReducer
});
