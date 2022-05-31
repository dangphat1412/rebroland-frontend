import React, { useState, useEffect, useRef } from 'react'
import { Form } from 'semantic-ui-react';
import { DatePicker, ErrorMessage, FormContainer } from './date-picker-field.styles'

const DatePickerField = ({ date, errorMsg, onDateChange, maxDate, minDate, ...props }) => {
    const [error, setError] = useState(null);
    const isMounted = useRef(false);

    const handleError = (date) => {
        setError(!date || date > maxDate || date < minDate ? true : false)
    };

    useEffect(() => {
        if (isMounted.current) {
            handleError(date);
        } else {
            isMounted.current = true;
        }
    }, [date]);

    return (
        <FormContainer>
            {error === true ? (
                <ErrorMessage basic color="red" pointing="left">
                    {errorMsg}
                </ErrorMessage>
            ) : null}
            <Form.Field
                control={DatePicker}
                error={error}
                value={date}
                onDateChange={onDateChange}
                {...props}
            />
        </FormContainer>
    )
}

export default DatePickerField