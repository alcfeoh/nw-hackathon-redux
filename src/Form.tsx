import React, {useState, FormEventHandler, FormEvent} from 'react';
import {updateFormData, useAppDispatch, useAppSelector, useGetSpecialtiesQuery} from './state';
import {Specialty} from './data';

export function Form() {
    const state = useAppSelector(state => state.appointmentForm);
    const { data, isLoading } = useGetSpecialtiesQuery();
    let [formData, setFormData] = useState(state);
    const dispatch = useAppDispatch();

    const handleChange = (event: any) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.checked || event.target.value
        });
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(updateFormData(formData));
        //submitForm(formData).then(() => alert('Form submitted'));
    };

    return (
        <>
        {isLoading ?
                <h1>Loading...</h1>
                :
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Specialty:
                <select
                    name="specialtyId"
                    value={formData.specialtyId}
                    onChange={handleChange}
                >
                    {data &&
                    data.map( (specialty: Specialty) => (
                        <option key={specialty.id} value={specialty.id}>
                            {specialty.text}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            {formData.specialtyId == 8 && (
                <>
                    <label>
                        <input
                            type="checkbox"
                            name="consentGiven"
                            checked={formData.consentGiven}
                            onChange={handleChange}
                        />
                        I agree to share this information with my psychiatrist
                    </label>
                    <br />
                </>
            )}
            <input type="submit" value="Submit" />
        </form>
        }
        </>
    );
}




