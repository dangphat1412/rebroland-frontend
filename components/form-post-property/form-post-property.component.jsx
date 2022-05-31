import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import React from "react";
import {
  Button,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react";
import { FormPostPropertyContainer } from "./form-post-property.styles";

const options = [
  { key: "m", text: "Bán căn hộ chung cư", value: "male" },
  { key: "f", text: "Bán nhà riêng", value: "female" },
  { key: "o", text: "Bán đất", value: "other" },
];

const FormPostProperty = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCMSkwBazeXabBmE9f6-foYr6JTDbIxO0U",
  });

  return (
    <div>
      <FormPostPropertyContainer>
        <Grid columns="equal" padded>
          <Grid.Row>
            <Grid.Column width={10}>
              <Segment>
                <h1>Thông tin bài đăng</h1>
                <Form size="large">
                  <Form.Input
                    fluid
                    label="Tiêu đề"
                    placeholder="Tiêu đề bài đăng"
                  />
                  <Form.TextArea
                    label="Mô tả"
                    placeholder="Nhập mô tả chung về bất động sản của bạn"
                  />
                </Form>
              </Segment>
              <Segment>
                <h1>Thông tin bất động sản</h1>
                <Form size="large">
                  <Form.Select
                    label="Loại bất động sản"
                    options={options}
                    placeholder="Chọn loại bất động sản"
                  />
                  <Form.Group widths={2}>
                    <Form.Input
                      fluid
                      label="Diện tích"
                      placeholder="Nhập diện tích"
                    />
                    <Form.Input
                      fluid
                      label="Mức giá"
                      placeholder="Nhập mức giá"
                    />
                  </Form.Group>
                </Form>
              </Segment>
              <Segment>
                <h1>Thông tin địa lý</h1>
                <Form size="large">
                  <Form.Input
                    fluid
                    label="Địa chỉ"
                    placeholder="Nhập địa chỉ"
                  />
                  <Form.Group widths={2}>
                    <Form.Select
                      label="Tỉnh/Thành phố"
                      // options={options}
                      placeholder="Chọn Tỉnh/Thành phố"
                    />
                    <Form.Select
                      label="Quận/Huyện"
                      // options={options}
                      placeholder="Chọn Quận/Huyện"
                    />
                  </Form.Group>
                  <Form.Group widths={2}>
                    <Form.Select
                      label="Phường/Xã"
                      // options={options}
                      placeholder="Chọn Phường/Xã"
                    />
                    <Form.Select
                      label="Đường/Phố"
                      // options={options}
                      placeholder="Chọn Đường/Phố"
                    />
                  </Form.Group>
                  {/* missing loading */}
                  {isLoaded && (
                    <Form.Field control={Map} label="Vị trí trên bản đồ" />
                  )}
                </Form>
              </Segment>
              <Segment>
                <h1>Hình ảnh và Video</h1>
                <Segment placeholder>
                  <Header icon>
                    <Icon name="upload" />
                    Không có Ảnh hay Video được chọn
                  </Header>
                  <Button primary>Chọn Ảnh hoặc Video</Button>
                </Segment>
              </Segment>
              <Segment>
                <h1>Thông tin liên hệ</h1>
                <Form size="large">
                  <Form.Group widths={2}>
                    <Form.Input
                      fluid
                      label="Tên liên hệ"
                      placeholder="Nhập tên"
                    />
                    <Form.Input
                      fluid
                      label="Số điện thoại"
                      placeholder="Nhập số điện thoại"
                    />
                  </Form.Group>
                  <Form.Group widths={2}>
                    <Form.Input
                      fluid
                      label="Địa chỉ"
                      placeholder="Nhập địa chỉ"
                    />
                    <Form.Input fluid label="Email" placeholder="Nhập email" />
                  </Form.Group>
                </Form>
              </Segment>
            </Grid.Column>
            <Grid.Column width={6}>
              <Segment>
                <Form size="large">
                  <Form.Group widths={2}>
                    <Form.Input
                      fluid
                      label="Số ngày đăng"
                      placeholder="Nhập ngày đăng"
                    />
                    <Form.Input type="date" fluid label="Ngày bắt đầu" />
                  </Form.Group>
                  <Segment>
                    <Grid columns="equal">
                      <Grid.Row>
                        <Grid.Column>Đơn giá / Ngày</Grid.Column>
                        <Grid.Column textAlign="right">2000 VNĐ</Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>Số ngày đăng tin</Grid.Column>
                        <Grid.Column textAlign="right">10 ngày</Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>VAT (10%)</Grid.Column>
                        <Grid.Column textAlign="right">200 VNĐ</Grid.Column>
                      </Grid.Row>
                      <Divider />
                      <Grid.Row>
                        <Grid.Column>Bạn trả</Grid.Column>
                        <Grid.Column textAlign="right">20000 VNĐ</Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Segment>
                  <Button color="red" fluid size="large">Xử lý thanh toán</Button>
                </Form>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </FormPostPropertyContainer>
    </div>
  );
};

const Map = () => {
  return (
    <GoogleMap
      zoom={10}
      center={{ lat: 44, lng: -80 }}
      mapContainerStyle={{ width: "100%", height: "400px" }}
    ></GoogleMap>
  );
};

export default FormPostProperty;
