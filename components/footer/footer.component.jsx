import React from "react";
import { Grid, Segment } from "semantic-ui-react";

const Footer = () => {
  return (
    <>
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
    </>
  );
};

export default Footer;
