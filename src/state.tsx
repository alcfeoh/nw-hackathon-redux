import { FormData } from './data';
import { createStore } from 'redux';

export const defaultState: FormData = {
    name: '',
    specialtyId: 0,
    consentGiven: false
};

export const submitFormAction = (payload: FormData) => ({
    type: 'SUBMIT_FORM',
    payload
});

const formReducer = (state = defaultState, action: {type: string, payload: any}) => {
    console.log('REDUCER', state, action);
    switch (action.type) {
        case 'SUBMIT_FORM':
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export const store = createStore(formReducer);
