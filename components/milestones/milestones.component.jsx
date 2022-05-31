import React from "react";
import MilestoneItem from "../milestone-item/milestone-item.component";
import { MilestonesContainer } from "./milestones.styles";

const Milestones = () => {
  return (
    <MilestonesContainer>
      <MilestoneItem
        icon="home"
        title="tin cậy và an toàn"
        description="Accusantium natus"
      />
      <MilestoneItem
        icon="money"
        title="trusted and safe"
        description="Accusantium natus"
      />
      <MilestoneItem
        icon="phone"
        title="trusted and safe"
        description="Accusantium natus"
      />
      <MilestoneItem
        icon="plane"
        title="trusted and safe"
        description="Accusantium natus"
      />
    </MilestonesContainer>
  );
};

export default Milestones;
