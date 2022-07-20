import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Grid,
  Header,
  Label,
  Message,
  Segment,
} from "semantic-ui-react";
import { BrokerRegisterContainer } from "./page-broker-register.styles";
import { useForm } from "react-hook-form";
import { brokerRegister } from "../../actions/auth";

const BrokerRegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // register("option", { required: "Chọn gói đăng ký" });
    register("option");
  }, [register]);

  const onSubmit = async (data) => {
    await brokerRegister(setErrorMessage);
  };

  return (
    <BrokerRegisterContainer>
      <Grid centered columns={3}>
        <Grid.Column>
          <Segment>
            <Header as="h1">Tài khoản nhà môi giới</Header>
            <div>
              Tài khoản Pro là tài khoản cao cấp dành cho nhà môi giới chuyên
              nghiệp, cung cấp tính năng đăng và quản lý tin nâng cao giúp bạn
              tăng hiệu suất và tiết kiệm thời gian đăng tin. Tài khoản Pro cũng
              cung cấp cho bạn các thông tin về thị trường, báo cáo phân tích
              hiệu quả tin đăng.
            </div>
            <br />
            <Form
              onSubmit={handleSubmit(onSubmit)}
              error={errorMessage !== null}
            >
              <Message
                error
                list={errorMessage}
                onDismiss={() => setErrorMessage(null)}
              />
              <Label basic>Thời lượng</Label>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <Segment compact>
                      <Form.Radio name="option" label="1 tháng: 100.000 VNĐ" />
                    </Segment>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Segment compact>
                      <Form.Radio label="3 tháng: 300.000 VNĐ" />
                    </Segment>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column width={8}>
                    <Segment compact>
                      <Form.Radio label="6 tháng: 600.000 VNĐ" />
                    </Segment>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Segment compact>
                      <Form.Radio label="12 tháng: 1.200.000 VNĐ" />
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Label basic>Chi tiết thanh toán</Label>
              <Card fluid>
                <Card.Content>
                  <Card.Header>Bạn trả: 140.000 VNĐ</Card.Header>
                </Card.Content>
                <Card.Content extra>
                  <Card.Description>
                    - Mỗi tháng tương đương 30 ngày.
                  </Card.Description>
                  <Card.Description>
                    - Hệ thống sẽ tính phí ngay tại thời điểm đăng ký.
                  </Card.Description>
                  <Card.Description>
                    - Gói dịch vụ sẽ được tự động gia hạn vào cuối kì. Sau khi
                    đăng ký, bạn có thể tắt chế độ tự động nếu không có nhu cầu.
                  </Card.Description>
                </Card.Content>
              </Card>
              <Grid>
                <Grid.Column textAlign="center">
                  <Button color="red">Thanh toán</Button>
                </Grid.Column>
              </Grid>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </BrokerRegisterContainer>
  );
};

export default BrokerRegisterPage;
