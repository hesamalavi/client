import _ from 'lodash';
import {
    FETCH_STREAM,
    FETCH_STREAMS,
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM,
} from '../actions/types';

// for DELETE_STREAM case we only type action.payload (noaction.payload.id) because the action creator payload is the id itself. omit is not going to change the original state object, instead it creates a new object with all the properties from state without whatever we passed as action.payload

// {... state} creates a new object

//  Mapkeys (from lodash) is a function that's going to take an array and then return an object. The keys of this new object are going to be taken from each individual record inside of the array. So we can call mapkeys, we can pass in the list of streams that we got from the API, and as the second argument we'll put in a string of ID. The string of ID right there tells lodash that for every one of these objects inside the original array use a key taken from the id property of each one.

// "..."_.mapKeys => take whatever big object comes from mapkeys, take all the key value pairs out of it and add it into new big overall object

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAMS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_STREAM:
            return _.omit(state, action.payload);
        default:
            return state;
    }
};
