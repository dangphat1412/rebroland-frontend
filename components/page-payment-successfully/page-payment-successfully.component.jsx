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
import convertToCurrency from "../../utils/convertToCurrency";
import { PaymentSuccessfullyPageContainer } from "./page-payment-successfully.styles";

const PaymentSuccessfullyPage = () => {
  const router = useRouter();
  const {
    amount,
    transactionNo,
    cardType,
    bankCode,
    payDate,
    orderInfo,
    phone,
    content,
  } = router.query;
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
                <Statistic.Value>
                  {convertToCurrency(amount)} VNĐ
                </Statistic.Value>
              </Statistic>
            </div>
            <Grid textAlign="left" style={{ marginTop: "10px" }}>
              {transactionNo && (
                <Grid.Row>
                  <Grid.Column floated="left" width={5}>
                    <Header as="h3">Mã giao dịch:</Header>
                  </Grid.Column>
                  <Grid.Column floated="right" width={5}>
                    {transactionNo}
                  </Grid.Column>
                </Grid.Row>
              )}
              {cardType && (
                <Grid.Row>
                  <Grid.Column floated="left" width={5}>
                    <Header as="h3">Loại thẻ:</Header>
                  </Grid.Column>
                  <Grid.Column floated="right" width={5}>
                    {cardType}
                  </Grid.Column>
                </Grid.Row>
              )}
              {bankCode && (
                <Grid.Row>
                  <Grid.Column floated="left" width={5}>
                    <Header as="h3">Tên ngân hàng:</Header>
                  </Grid.Column>
                  <Grid.Column floated="right" width={5}>
                    {bankCode}
                  </Grid.Column>
                </Grid.Row>
              )}
              {orderInfo && (
                <Grid.Row>
                  <Grid.Column floated="left" width={5}>
                    <Header as="h3">Nội dung thanh toán:</Header>
                  </Grid.Column>
                  <Grid.Column floated="right" width={5}>
                    {orderInfo}
                  </Grid.Column>
                </Grid.Row>
              )}
              {phone && (
                <Grid.Row>
                  <Grid.Column floated="left" width={5}>
                    <Header as="h3">Số điện thoại hưởng thụ:</Header>
                  </Grid.Column>
                  <Grid.Column floated="right" width={5}>
                    {phone}
                  </Grid.Column>
                </Grid.Row>
              )}
              {content && (
                <Grid.Row>
                  <Grid.Column floated="left" width={5}>
                    <Header as="h3">Nội dung chuyển khoản:</Header>
                  </Grid.Column>
                  <Grid.Column floated="right" width={5}>
                    {content}
                  </Grid.Column>
                </Grid.Row>
              )}
              {payDate && (
                <Grid.Row>
                  <Grid.Column floated="left" width={5}>
                    <Header as="h3">Ngày thanh toán:</Header>
                  </Grid.Column>
                  <Grid.Column floated="right" width={5}>
                    {payDate}
                  </Grid.Column>
                </Grid.Row>
              )}
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
