import React, { useEffect, useState } from "react";
import { Button, Card, Form, Grid, Message } from "semantic-ui-react";
import UserPanel from "../user-panel/user-panel.component";
import { PaymentContainer, PaymentPageContainer } from "./page-payment.styes";
import { useForm } from "react-hook-form";
import InputField from "../input-field/input-field.component";
import { payment } from "../../actions/payment";
import { useRouter } from "next/router";
import convertToCurrency from "../../utils/convertToCurrency";

const PaymentPage = ({ user }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    register("amount", {
      required: "Nhập số tiền bạn muốn nạp",
      min: {
        value: 10000,
        message: "Số tiền giao dịch tối thiểu 10.000VNĐ",
      },
      max: {
        value: 50000000,
        message: "Số tiền giao dịch tối thiểu 50.000.000VNĐ",
      },
      valueAsNumber: true,
    });
  }, [register]);

  const onSubmit = async (data, e) => {
    const dataPayment = await payment(data);
    if (dataPayment.message === "success") {
      router.push(dataPayment.data);
    } else {
    }
  };

  return (
    <PaymentPageContainer>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <UserPanel user={user} />
          </Grid.Column>
          <Grid.Column width={13}>
            <PaymentContainer fluid>
              <Card.Content>
                <Card.Header textAlign="center">
                  Nạp tiền vào tài khoản
                </Card.Header>
              </Card.Content>
              <Card.Content>
                <Grid centered>
                  <Grid.Row>
                    <Grid.Column width={6} centered>
                      <Form
                        onSubmit={handleSubmit(onSubmit)}
                        error={errorMessage !== null}
                      >
                        <Message
                          error
                          list={errorMessage}
                          hidden={errorMessage === null}
                          onDismiss={() => setErrorMessage(null)}
                        />
                        <InputField
                          // type="number"
                          label="Số tiền muốn nạp"
                          placeholder="Nạp tối thiểu 10.000VNĐ. Hạn mức 50.000.000VNĐ"
                          name="amount"
                          onChange={async (e, { name, value }) => {
                            setValue(name, value);
                          }}
                          error={errors.amount}
                          requiredField
                        />
                        <Grid>
                          <Grid.Column textAlign="center">
                            <Button type="submit">Tiếp tục</Button>
                          </Grid.Column>
                        </Grid>
                      </Form>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card.Content>
            </PaymentContainer>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </PaymentPageContainer>
  );
};

export default PaymentPage;
