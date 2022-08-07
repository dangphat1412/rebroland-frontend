import styled from "styled-components";

export const FinancialManagementPageContainer = styled.div`
  .header, .button, .label {
    font-family: "Tahoma", san-serif !important;
  }
  .user-information {
    label {
        display: inline-block;
        width: 140px;
        text-align: left;
        font-weight: bold;
      }​
  }
  .user-avatar-small {
    width: 30px !important;
    height: 30px !important;
    object-fit: cover;
    margin-right: 20px;
  }
  .user-avatar-big {
    width: 150px !important;
    height: 150px !important;
    object-fit: cover;
    margin-right: 20px;
  }
  
`;

export const PaginationContainer = styled.div`
  display: flex !important;
  justify-content: center;
`;
