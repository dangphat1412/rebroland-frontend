import React, { useState } from "react";
import {
  Button,
  Divider,
  Grid,
  Label,
  Message,
  Segment,
} from "semantic-ui-react";
import convertToCurrency from "../../utils/convertToCurrency";
import options from "../../utils/postedDayOptions";
import InputField from "../input-field/input-field.component";

const PaymentInformationForm = ({
  user,
  priceData,
  setValue,
  getValues,
  errorMessage,
  setErrorMessage,
}) => {
  const [endDate, setEndDate] = useState(
    new Date().setDate(new Date().getDate() + getValues("numberOfPostedDay"))
  );
  const handleChange = (e, { name, value }) => {
    setValue(name, value);
    if (name === "numberOfPostedDay") {
      const currentDate = new Date();
      const date = currentDate.setDate(
        currentDate.getDate() + getValues("numberOfPostedDay")
      );
      setEndDate(date);
    }
  };

  return (
    <Segment size="large">
      <Segment>
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column width={8}>
              <InputField
                fieldType="select"
                label="Số ngày đăng"
                name="numberOfPostedDay"
                placeholder="Chọn số ngày đăng"
                options={options}
                defaultValue={getValues("numberOfPostedDay")}
                onChange={handleChange}
                requiredField
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <InputField
                type="date"
                min={new Date(endDate).toISOString().slice(0, 10)}
                max={new Date(endDate).toISOString().slice(0, 10)}
                value={new Date(endDate).toISOString().slice(0, 10)}
                fluid
                label="Ngày hết hạn"
                name="endDate"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <b>Đơn giá / ngày</b>
            </Grid.Column>
            <Grid.Column textAlign="right">
              {priceData.discount > 0 ? (
                <>
                  <del>{convertToCurrency(priceData.price)} VNĐ</del>
                  &nbsp;
                  <span>
                    {convertToCurrency(
                      (priceData.price * (100 - priceData.discount)) / 100
                    )}{" "}
                    VNĐ
                  </span>
                  &nbsp;
                  <Label color="red" horizontal>
                    -{priceData.discount} %
                  </Label>
                </>
              ) : (
                <>{convertToCurrency(priceData.price)} VNĐ</>
              )}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <b>Số ngày đăng tin</b>
            </Grid.Column>
            <Grid.Column textAlign="right">
              {getValues("numberOfPostedDay")} ngày
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <b>Bạn trả</b>
            </Grid.Column>
            <Grid.Column textAlign="right">
              {convertToCurrency(
                (priceData.price *
                  getValues("numberOfPostedDay") *
                  (100 - priceData.discount)) /
                  100
              )}{" "}
              VNĐ
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment>
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column>
              <b>Tổng số tiền trong ví</b>
            </Grid.Column>
            <Grid.Column textAlign="right">
              {convertToCurrency(user.accountBalance)} VNĐ
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Message
        error
        list={errorMessage}
        onDismiss={() => setErrorMessage(null)}
      />
      <Button
        type="submit"
        color="red"
        fluid
        size="large"
        disabled={
          user.accountBalance < priceData.price * getValues("numberOfPostedDay")
        }
      >
        Xử lý thanh toán
      </Button>
    </Segment>
  );
};

export default PaymentInformationForm;
