
import React from 'react';
import { YellowBox, NetInfo, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Axios from 'axios';

import reducers from './reducers';
import Routes from './Routes';
import { fetchReport } from './utils/AxiosUtils';
import { dispatchStorageKey } from './utils/storage';
import { colorAppPrimary } from './utils/constants';

export const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

class App extends React.Component {
    constructor(props) {
        super(props);

        Axios.defaults.timeout = 80000; // Timeout default para o Axios
        Axios.defaults.baseURL = 'http://192.168.0.148:1234/';

        fetchReport(store.dispatch);

        this.onNetInfoChanged = this.onNetInfoChanged.bind(this);

        YellowBox.ignoreWarnings([
            'Warning: isMounted(...) is deprecated', 
            'Module RCTImageLoader',
            'Setting a timer',
            'Deprecation warning: value provided is not in a recognized',
            'Require cycle:'
        ]);

        NetInfo.addEventListener(
            'connectionChange',
            this.onNetInfoChanged
        );
    }

    componentDidMount() {
        StatusBar.setBackgroundColor(colorAppPrimary, true);
        // Alimenta o redux com as keys do storage
        dispatchStorageKey('urlServer', store.dispatch, 'modify_urlserver_login');
        dispatchStorageKey('userLogin', store.dispatch, 'modify_userlogin_login');
        dispatchStorageKey('userPass', store.dispatch, 'modify_userpass_login');
    }

    onNetInfoChanged(conInfo) {
        if (conInfo.type === 'none' || 
            conInfo.type === 'unknown' || 
            conInfo.type === 'wifi' || 
            conInfo.type === 'cellular' || 
            conInfo.effectiveType === 'unknown') {
                store.dispatch({
                    type: 'modify_coninfo_events',
                    payload: conInfo
                });
            }
    }

    render() {
        return (
            <Provider store={store}>
                <Routes />
            </Provider>
        );
    }
}

export default App;

