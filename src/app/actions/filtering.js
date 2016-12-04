import { FILTER_VISIBIITY } from './types';

export const filterVisibility = (key) => (dispatch) => {
    // change the chosen visibility in the store
    dispatch({
        type:       FILTER_VISIBIITY,
        payload:    key,
    });
};
