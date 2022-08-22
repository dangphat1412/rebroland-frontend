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
import convertToListMessages from "../../utils/convertToListMessages";
import convertToCurrency from "../../utils/convertToCurrency";

const BrokerRegisterPage = ({ priceList }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!selectedItem) {
      const msg = convertToListMessages("Chọn một gói thanh toán");
      setErrorMessage(msg);
    } else {
      await brokerRegister(selectedItem.id, setErrorMessage);
    }
  };

  return (
    <BrokerRegisterContainer>
      <Grid centered columns={3}>
        <Grid.Column>
          <Segment>
            <Header as="h1">Tài khoản nhà môi giới</Header>
            <div>
              Tài khoản nhà môi giới là tài khoản dành cho nhà môi giới chuyên
              nghiệp, cung cấp tính năng đăng bài phái sinh và làm giàu thông
              tin như vậy có lượng khách hàng tìm tới nhiều hơn và tăng hiệu
              suất làm việc hơn. Tài khoản nhà môi giới cũng cung cấp cho bạn
              các thông tin về khách hàng, giúp bạn chăm sóc khách hàng của mình
              dễ dàng hơn, trực quan hơn.
            </div>
            <br />
            <Form onSubmit={onSubmit} error={errorMessage !== null}>
              <Label basic>Thời lượng</Label>
              <Card.Group itemsPerRow={2}>
                {priceList.map((data, index) => {
                  return (
                    <Card
                      link
                      color={
                        selectedItem && selectedItem.id === data.id
                          ? "yellow"
                          : null
                      }
                      key={index}
                      onClick={() => {
                        setSelectedItem(data);
                      }}
                    >
                      <Card.Content>
                        <Card.Header>
                          <span>{data.unitDate / 30} tháng</span>
                          {data.discount > 0 && (
                            <Label color="red" horizontal>
                              -{data.discount} %
                            </Label>
                          )}
                        </Card.Header>
                        <Card.Meta></Card.Meta>
                        <Card.Description>
                          {data.discount > 0 && (
                            <del>{convertToCurrency(data.price)} VNĐ</del>
                          )}{" "}
                          <span>
                            {convertToCurrency(
                              (data.price * (100 - data.discount)) / 100
                            )}{" "}
                            VNĐ
                          </span>
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  );
                })}
              </Card.Group>

              <Label basic>Chi tiết thanh toán</Label>
              <Card fluid>
                <Card.Content>
                  {selectedItem ? (
                    <Card.Header>
                      Bạn trả:{" "}
                      {convertToCurrency(
                        (selectedItem.price * (100 - selectedItem.discount)) /
                          100
                      )}{" "}
                      VNĐ
                    </Card.Header>
                  ) : (
                    <Card.Header>Chọn một gói thanh toán</Card.Header>
                  )}
                </Card.Content>
                <Card.Content extra>
                  <Card.Description>
                    - Mỗi tháng tương đương 30 ngày.
                  </Card.Description>
                  <Card.Description>
                    - Hệ thống sẽ tính phí ngay tại thời điểm đăng ký.
                  </Card.Description>
                </Card.Content>
              </Card>
              <Message
                error
                list={errorMessage}
                onDismiss={() => setErrorMessage(null)}
              />
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
