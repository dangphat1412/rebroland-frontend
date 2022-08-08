import { useRouter } from "next/router";
import React from "react";
import {
  Button,
  Grid,
  Header,
  Icon,
  Segment,
  Statistic,
} from "semantic-ui-react";
import { PaymentSuccessfullyPageContainer } from "./page-payment-successfully.styles";

const PaymentSuccessfullyPage = () => {
  const router = useRouter();
  return (
    <PaymentSuccessfullyPageContainer>
      <Grid centered columns={2}>
        <Grid.Column>
          <Segment textAlign="center">
            <Icon name="check circle" color="green" size="huge" />
            <Header as="h1">Giao dịch thành công</Header>
            <div className="money-info">
              <Statistic>
                <Statistic.Label>Số tiền thanh toán</Statistic.Label>
                <Statistic.Value>5,550 VNĐ</Statistic.Value>
              </Statistic>
            </div>
            <Grid textAlign="left">
              <Grid.Column floated="left" width={5}>
                ABCD
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                EFHJ
              </Grid.Column>
            </Grid>
            <Button
              size="big"
              className="btn-return-home"
              onClick={() => {
                router.push("/");
              }}
            >
              Quay trở lại trang chủ
            </Button>
          </Segment>
        </Grid.Column>
      </Grid>
    </PaymentSuccessfullyPageContainer>
  );
};

export default PaymentSuccessfullyPage;
