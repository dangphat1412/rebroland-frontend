import React from "react";
import MilestoneItem from "../milestone-item/milestone-item.component";
import { MilestonesContainer } from "./milestones.styles";

const Milestones = () => {
  return (
    <MilestonesContainer>
      <MilestoneItem
        icon="shield alternate"
        title="tin cậy và an toàn"
        description="Uy tín"
      />
      <MilestoneItem
        icon="stopwatch"
        title="Nhanh và hiệu quả"
        description="Chính xác"
      />
      <MilestoneItem
        icon="thumbs up"
        title="Dễ dàng và trực quan"
        description="Thân thiện"
      />
      <MilestoneItem
        icon="home"
        title="Đa dạng và phong phú"
        description="Hiện đại"
      />
    </MilestonesContainer>
  );
};

export default Milestones;
