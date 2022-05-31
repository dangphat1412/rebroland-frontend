import React from "react";
import {
  ContentContainer,
  IconContainer,
  MilestoneItemContainer,
} from "./milestone-item.styles";

const MilestoneItem = ({ icon, title, description }) => {
  return (
    <MilestoneItemContainer>
      <IconContainer name={icon} size="huge" />
      <ContentContainer>
        <h3>{title}</h3>
        <p>{description}</p>
      </ContentContainer>
    </MilestoneItemContainer>
  );
};

export default MilestoneItem;
