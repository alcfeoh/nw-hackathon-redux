import React, {useState, useEffect, ChangeEvent, FormEventHandler, FormEvent} from 'react';
import {getSpecialties, Specialty, submitForm} from './data';
import { connect } from 'react-redux';
import { store } from './state';

export function Form() {
    let [formData, setFormData] = useState(store.getState());
    let [specialties, setSpecialties] = useState<Specialty[]>([]);

    useEffect(() => {
        getSpecialties().then(data => setSpecialties(data));
    }, []);

    const handleChange = (event: any) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.checked || event.target.value
        });
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        store.dispatch({ type: 'SUBMIT_FORM', payload: formData });
        console.log('New state: ', store.getState());
        submitForm(formData).then(() => alert('Form submitted'));
    };

    return (
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
                    {specialties &&
                    specialties.map(specialty => (
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
    );
}
