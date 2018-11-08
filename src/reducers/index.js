import { combineReducers } from 'redux';

import EventsReducer from './EventsReducer';
import ReportReducer from './ReportReducer';

export default combineReducers({
    EventsReducer,
    ReportReducer
});
