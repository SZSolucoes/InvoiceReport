import Axios from 'axios';

export const fetchReport = async (dispatch) => {
    const urlService = 'cgi-bin/coletorCentelha.sh/WService=coletorCentelha/app/getInvoiceReport.p';
    const res = await Axios.get(urlService);

    if (res && typeof res === 'object' && res.data && typeof res.data === 'object') {
        dispatch({
            type: 'modify_reportdata_report',
            payload: res.data
        });
    }
};

