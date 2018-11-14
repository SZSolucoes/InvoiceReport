const INITIAL_STATE = {
    urlServer: '',
    userLogin: '',
    userPass: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'modify_urlserver_login':
            return {
                ...state,
                urlServer: action.payload
            };
        case 'modify_userlogin_login':
            return {
                ...state,
                userLogin: action.payload
            };
        case 'modify_userpass_login':
            return {
                ...state,
                userPass: action.payload
            };
        case 'modify_clean_report':
            return {
                ...state,
                urlServer: '',
                userLogin: '',
                userPass: ''
            };
        default:
            return state;
    }
};

