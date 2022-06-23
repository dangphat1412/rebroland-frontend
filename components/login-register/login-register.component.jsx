import React from "react";
import { Divider, Grid, Segment } from "semantic-ui-react";
import Login from "../login/login.component";
import Register from "../register/register.component";
import { LoginRegisterContainer } from "./login-register.styles";

const LoginRegister = () => {
  return (
    <LoginRegisterContainer>
      <Segment placeholder>
        <Grid columns={2} stackable textAlign="center">
          <Divider vertical>Or</Divider>

          <Grid.Row>
            <Grid.Column>
              <Login />
            </Grid.Column>

            <Grid.Column>
              <Register />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </LoginRegisterContainer>
  );
};

export default LoginRegister;
