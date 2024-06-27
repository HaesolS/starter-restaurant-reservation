import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api.js";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm.js";

function NewReservation() {
    const history = useHistory();
    const [reservationError, setReservationError] = useState(null);
    const initialReservationState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0
    }
    const [reservation, setReservation] = useState({ ...initialReservationState });
    const changeHandler = ({ target }) => {
            setReservation({ ...reservation, [target.name]: target.value });
        }
    const submitHandler = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        try {
            await createReservation(reservation, abortController.signal);
            history.push(`/dashboard?date=${reservation.reservation_date}`);
        } catch (error) {
            setReservationError([error]);
        }
        return () => abortController.abort();
    };

    return (
        <main>
            <h1>New Reservation</h1>
            <div>
                <ErrorAlert error={reservationError} />
                <ReservationForm
                    reservation={reservation}
                    changeHandler={changeHandler}
                    submitHandler={submitHandler}
                />
            </div>
        </main>
    )
}

export default NewReservation;