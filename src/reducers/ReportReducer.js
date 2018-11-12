const INITIAL_STATE = {
    reportData: {},
    reportSelected: 'regiao',
    reportFilterStr: '',
    reportFilterLoading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'modify_reportdata_report':
            return {
                ...state,
                reportData: { ...action.payload }
            };
        case 'modify_reportselected_report':
            return {
                ...state,
                reportSelected: action.payload
            };
        case 'modify_reportfilterstr_report':
            return {
                ...state,
                reportFilterStr: action.payload
            };
        case 'modify_reportfilterloading_report':
            return {
                ...state,
                reportFilterLoading: action.payload
            };
        case 'modify_clean_report':
            return {
                ...state,
                reportData: {},
                reportSelected: 'regiao',
                reportFilterStr: '',
                reportFilterLoading: false
            };
        default:
            return state;
    }
};

