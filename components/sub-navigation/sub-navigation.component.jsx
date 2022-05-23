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
              <a href="tel://+00123456789">
                <Icon name="phone" flipped="horizontally" /> +00 123 456 789
              </a>
              <a href="mailto://demo@example.com">
                <Icon name="mail" /> demo@example.com
              </a>
            </InfoContainer>
          </Grid.Column>
        </Grid>
      </Subnav>
    </SubnavContainer>
  );
};

export default SubNavigation;
