const INITIAL_STATE = {
    conInfo: {},
    isSideMenuOpen: false,
    sideMenuSelected: 'regiao',
    dxSideMenuPos: 0,
    showSearchBarMain: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'modify_coninfo_events':
            return {
                ...state,
                conInfo: { ...action.payload } 
            };
        case 'modify_issidemenuopen_events':
            return {
                ...state,
                isSideMenuOpen: action.payload 
            };
        case 'modify_sidemenuselected_events':
            return {
                ...state,
                sideMenuSelected: action.payload 
            };
        case 'modify_dxsidemenupos_events':
            return {
                ...state,
                dxSideMenuPos: action.payload 
            };
        case 'modify_showsearchbarmain_events':
            return {
                ...state,
                showSearchBarMain: action.payload 
            };
        case 'modify_clean_events':
            return {
                ...state,
                conInfo: {},
                isSideMenuOpen: false,
                sideMenuSelected: 'regiao',
                dxSideMenuPos: 0,
                showSearchBarMain: false
            };
        default:
            return state;
    }
};

