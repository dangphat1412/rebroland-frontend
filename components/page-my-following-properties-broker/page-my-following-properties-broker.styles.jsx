import styled from "styled-components";

export const MyFollowingPropertiesBrokerContainer = styled.div`
  margin-top: 20px;
  margin-right: 95px;
  margin-left: 95px;

  .item {
    font-family: "Tahoma", san-serif !important;
  }

  .header,
  .description {
    font-family: "Tahoma", sans-serif !important;
    display: -webkit-box !important;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .header {
    -webkit-line-clamp: 2;
    margin-top: 1px !important;
  }
  .description {
    -webkit-line-clamp: 3;
  }

  .main {
    position: relative;
    & .filter-options {
      position: absolute;
      right: 13px;
    }
  }
`;
