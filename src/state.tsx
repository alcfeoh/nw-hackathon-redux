import {FormData, Specialty} from './data';
import {createSlice, PayloadAction, configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const defaultState: FormData = {
    name: '',
    specialtyId: 0,
    consentGiven: false,
    specialties: []
};

export const specialtiesApi = createApi({
    reducerPath: 'specialtiesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://nw-test-api.herokuapp.com/' }),
    endpoints: (builder) => ({
        getSpecialties: builder.query<Specialty[], void>({
            query: () => `specialties`,
        }),
    }),
});

export const { useGetSpecialtiesQuery } = specialtiesApi;

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
        [specialtiesApi.reducerPath]: specialtiesApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(specialtiesApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
