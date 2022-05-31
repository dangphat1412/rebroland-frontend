import { Label } from "semantic-ui-react";
import styled from "styled-components";

export const FormContainer = styled.div`
    position: relative;
    margin-bottom: 10px;
`

export const ErrorMessage = styled(Label)`
    position: absolute !important;
    left: 340px;
    top: 28px;
    width: fit-content;
    z-index: 1;
`;