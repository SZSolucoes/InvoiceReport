const INITIAL_STATE = {
    conInfo: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'modify_coninfo_events':
            return {
                ...state,
                conInfo: { ...action.payload } 
            };
        default:
            return state;
    }
};