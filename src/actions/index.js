// Create 2 action creators, one signIn() and the other signOut(). We will call them once we have successfully logged in or logged out  through gapi library
import GoogleAuth from '../components/GoogleAuth';
import { SIGN_IN, SIGN_OUT } from './types';
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
