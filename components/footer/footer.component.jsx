import React from "react";
import { Grid, Segment } from "semantic-ui-react";
import { FooterContainer } from "./footer.styles";

const Footer = () => {
  return (
    <FooterContainer>
      <Grid columns="equal" divided inverted padded>
        <Grid.Row color="black" textAlign="center">
          <Grid.Column>
            <Segment color="black" inverted>
              footer 1
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment color="black" inverted>
              footer 2
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment color="black" inverted>
              footer 3
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </FooterContainer>
  );
};

export default Footer;
