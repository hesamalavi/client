import streams from '../apis/streams';

// Create 2 action creators, one signIn() and the other signOut(). We will call them once we have successfully logged in or logged out  through gapi library
import GoogleAuth from '../components/GoogleAuth';
import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM,
} from './types';
// receive userId as an argument from onAuthChange in GoogleAuth.js and pass it as an argument below and add it to our payload property. Then we go to our authReducer ...>

// we get userId from if (isSignedIn) in onAuthChange on GoogleAuth.js. We then pass userId to the reducer as payload
export const signIn = userId => {
    return {
        type: SIGN_IN,
        payload: userId,
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT,
    };
};
// THEN WE HOOK IT UP TO OUR GOOGLE AUTH USING REACT-REDUX LIBRARY

// the export will get modified so that we could get a handle on the response that comes backfrom the post request.
// export const createStream = formValues => async dispatch => {
//     streams.post('/streams', formValues);
// };
export const createStream = formValues => async dispatch => {
    const response = await streams.post('/streams', formValues);

    dispatch({ type: CREATE_STREAM, payload: response.data });
};
// use .data above because we get a response back from axios the response object has info, and in our case we only care about the data

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');

    dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = id => async dispatch => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({ type: FETCH_STREAM, payload: response.data });
};

// for editing we meed id and the content (formValues) that needs to be updated

export const editStream = (id, formvalues) => async dispatch => {
    const response = streams.put(`/streams/${id}`, formvalues);

    dispatch({ type: EDIT_STREAM, payload: response.data });
};

export const deleteStream = id => async dispatch => {
    await streams.delete(`/streams/${id}`);

    dispatch({ type: DELETE_STREAM, payload: id });
};
