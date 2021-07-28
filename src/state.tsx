import { FormData } from './data';
import {createSlice, PayloadAction, configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

export const defaultState = {
    name: '',
    specialtyId: 0,
    consentGiven: false
};

export const appointmentFormSlice = createSlice({
    name: 'appointmentForm',
    initialState: defaultState,
    reducers: {
        updateFormData: (
            state: FormData,
            action: PayloadAction<FormData>
        ) => {
            state.name = action.payload.name || state.name;
            state.specialtyId = action.payload.specialtyId || state.specialtyId;
            state.consentGiven = action.payload.consentGiven || state.consentGiven;
        }
    }
});

export const { updateFormData } = appointmentFormSlice.actions;
export default appointmentFormSlice.reducer;

export const store = configureStore({
    reducer: {
        appointmentForm: appointmentFormSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
