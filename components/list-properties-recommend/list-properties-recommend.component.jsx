import React from "react";
import Link from "next/link";
import { Grid } from "semantic-ui-react";
import PropertyRecommendItem from "../property-recommend-item/property-recommend-item.component";
import { ListPropertiesRecommendContainer } from "./list-properties-recommend.styles";

const ListPropertiesRecommend = () => {
  return (
    <ListPropertiesRecommendContainer>
      <h1>Bất động sản dành cho bạn</h1>
      <span className="divider-left"></span>
      <Grid>
        <Grid.Row columns={5}>
          <Grid.Column>
            <PropertyRecommendItem />
          </Grid.Column>
          <Grid.Column>
            <PropertyRecommendItem />
          </Grid.Column>
          <Grid.Column>
            <PropertyRecommendItem />
          </Grid.Column>
          <Grid.Column>
            <PropertyRecommendItem />
          </Grid.Column>
          <Grid.Column>
            <PropertyRecommendItem />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </ListPropertiesRecommendContainer>
  );
};

export default ListPropertiesRecommend;
