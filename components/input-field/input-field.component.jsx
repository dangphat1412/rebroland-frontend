import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import { ErrorMessage, FormContainer } from './input-field.styles';

const InputField = ({ handleChange, name, value, errorMsg, regex, ...props }) => {
    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState(errorMsg);

    const handleError = () => {
        setError(value.length === 0 || (regex && !new RegExp(regex).test(value)) ? true : false)
    };

    return (
        <FormContainer>
            {error === true ? (
                <ErrorMessage basic color="red" pointing="left">
                    {errorMessage}
                </ErrorMessage>
            ) : null}
            <Form.Input
                error={error}
                fluid
                name={name}
                value={value}
                {...props}
                onChange={handleChange}
                onBlur={handleError}
                onFocus={() => setError(false)}
            />
        </FormContainer>
    )
}

export default InputField