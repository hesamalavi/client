// initialiser.CAPITALISE SYNTAX TO LET OTHERS KNOW THAT DO NOT TRY TO MODIFY THIS OBJECT
import { SIGN_IN, SIGN_OUT } from '../actions/types';
//(actions, index.js) ...> we need to also update the userId flag aswell
const INTIAL_STATE = {
    isSignedIn: null,
    userId: null,
};
export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, isSignedIn: true, userId: action.payload };
        case SIGN_OUT:
            return { ...state, isSignedIn: false, userId: null };
        default:
            return state;
    }
};
