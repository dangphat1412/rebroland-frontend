import React from "react";
import { Button, Divider, Grid, Segment } from "semantic-ui-react";

const PaymentInformationForm = () => {
  return (
    <Segment size="large">
      <Segment>
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column>Đơn giá</Grid.Column>
            <Grid.Column textAlign="right">50.000 VNĐ</Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>VAT (10%)</Grid.Column>
            <Grid.Column textAlign="right">5.000 VNĐ</Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>Bạn trả</Grid.Column>
            <Grid.Column textAlign="right">55.000 VNĐ</Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Button type="submit" color="red" fluid size="large">
        Xử lý thanh toán
      </Button>
    </Segment>
  );
};

export default PaymentInformationForm;
