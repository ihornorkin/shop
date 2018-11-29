import {
    FETCH_PHONES_START,
    FETCH_PHONES_SUCCESS,
    FETCH_PHONES_ERROR,
    LOAD_MORE_PHONES_START,
    LOAD_MORE_PHONES_SUCCESS,
    LOAD_MORE_PHONES_ERROR,
    FETCH_PHONE_BY_ID_START,
    FETCH_PHONE_BY_ID_SUCCESS,
    FETCH_PHONE_BY_ID_ERROR
} from '../actionTypes';
import {
    fetchPhones as fetchPhonesApi,
    loadMorePhones as loadMorePhonesApi,
    fetchPhoneByIdApi
} from '../api/index';
import { getRenderedPhonesLength } from '../selectors/selectors';

export const fetchPhones = () => async dispatch => {
    dispatch({ type: FETCH_PHONES_START })

    try {
        const phones = await fetchPhonesApi()
        dispatch({
            type: FETCH_PHONES_SUCCESS,
            payload: phones
        })
    } catch (err) {
        dispatch({
            type: FETCH_PHONES_ERROR,
            payload: err,
            error: true
        })
    }
}

export const loadMorePhones = () => async (dispatch, getState) => {
    const offset = getRenderedPhonesLength(getState());
    dispatch({ type: LOAD_MORE_PHONES_START })

    try {
        const phones = await loadMorePhonesApi({ offset })
        dispatch({
            type: LOAD_MORE_PHONES_SUCCESS,
            payload: phones
        })
    } catch (err) {
        dispatch({
            type: LOAD_MORE_PHONES_ERROR,
            payload: err,
            error: true
        })
    }
}

export const fetchPhoneById = id => async dispatch => {
    dispatch({type: FETCH_PHONE_BY_ID_START})

    try {
        const phone = await fetchPhoneByIdApi(id)
        dispatch({
            type: FETCH_PHONE_BY_ID_SUCCESS,
            payload: phone
        })
    } catch (err) {
        dispatch({
            type: FETCH_PHONE_BY_ID_ERROR,
            payload: err,
            error: true
        })
    }
}