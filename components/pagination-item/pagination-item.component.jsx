import React from "react";
import { Icon } from "semantic-ui-react";
import { PaginationContainer } from "./pagination-item.styles";

const PaginationItem = ({ ...props }) => {
  return (
    <PaginationContainer
      firstItem={{ content: <Icon name="angle double left" />, icon: true }}
      lastItem={{ content: <Icon name="angle double right" />, icon: true }}
      prevItem={{ content: <Icon name="angle left" />, icon: true }}
      nextItem={{ content: <Icon name="angle right" />, icon: true }}
      {...props}
    />
  );
};

export default PaginationItem;
