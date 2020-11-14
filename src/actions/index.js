// Create 2 action creatore, one signIn() and the other signOut(). We will call them once we have successfully loged in or logged out  through gapi library
import { SIGN_IN, SIGN_OUT } from './types';
// receive userId as an argument from onAuthChange in GoogleAuth.js and pass it as an argument below and add it to our payload property. Then we go to our authReducer ...>
export const signIn = (userId) => {
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
