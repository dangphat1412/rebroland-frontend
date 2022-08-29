import React from "react";
import { Grid, Icon } from "semantic-ui-react";
import {
  InfoContainer,
  SloganContainer,
  Subnav,
  SubnavContainer,
} from "./sub-navigation.styles";

const SubNavigation = () => {
  return (
    <SubnavContainer fluid>
      <Subnav>
        <Grid>
          <Grid.Column width={8} textAlign="left">
            <SloganContainer>
              Xây những giá trị, dựng những ước mơ
            </SloganContainer>
          </Grid.Column>
          <Grid.Column width={8} textAlign="right">
            <InfoContainer>
              <a href="tel://+84869009629">
                <Icon name="phone" flipped="horizontally" /> +84 869009629
              </a>
              <a href="mailto://rebroland@gmail.com">
                <Icon name="mail" /> rebroland@gmail.com
              </a>
            </InfoContainer>
          </Grid.Column>
        </Grid>
      </Subnav>
    </SubnavContainer>
  );
};

export default SubNavigation;
