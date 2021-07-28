import {FormData, getSpecialties} from './data';
import {createSlice, PayloadAction, configureStore, createAsyncThunk} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

export const defaultState: FormData = {
    name: '',
    specialtyId: 0,
    consentGiven: false,
    specialties: [],
    loading: false
};

export const fetchSpecialties = createAsyncThunk(
    'getSpecialties',
    async () => getSpecialties()
);

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
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSpecialties.fulfilled, (state, action) => {
            state.specialties = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchSpecialties.pending, (state, action) => {
            state.loading = true;
        })
    }
});

export const { updateFormData } = appointmentFormSlice.actions;
console.log(appointmentFormSlice.actions);
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
