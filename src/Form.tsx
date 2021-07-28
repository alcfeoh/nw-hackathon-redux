import React, {useState, useEffect, FormEventHandler, FormEvent} from 'react';
import {getSpecialties, Specialty} from './data';
import {updateFormData, useAppDispatch, useAppSelector} from './state';


export function Form() {
    const state = useAppSelector(state => state.appointmentForm);
    let [formData, setFormData] = useState(state);
    const dispatch = useAppDispatch();
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
        dispatch(updateFormData(formData));
        //submitForm(formData).then(() => alert('Form submitted'));
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




