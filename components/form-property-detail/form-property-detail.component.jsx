import React from "react";
import {
  Button,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Rating,
  Segment,
} from "semantic-ui-react";
import { FormPropertyDetailContainer } from "./form-property-detail.styles";

const FormPropertyDetail = () => {
  return (
    <FormPropertyDetailContainer>
      <Form size="large">
        <Grid columns="equal" padded>
          <Grid.Row>
            <Grid.Column width={12}>
              <Segment>
                <h1>
                  Thuê nguyên căn hẻm 10 Trần Hữu Trang, Phú Nhuận (4x24m) có
                  hẻm hậu. Giá 18 triệu TL
                </h1>
                <p>
                  10, Đường Trần Hữu Trang, Phường 11, Phú Nhuận, Hồ Chí Minh
                </p>
                <Divider />
                <List horizontal relaxed size="big">
                  <List.Item>
                    <List.Content>
                      Loại bất động sản
                      <List.Header>Bán nhà</List.Header>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      Mức giá
                      <List.Header>48 m²</List.Header>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      Diện tích
                      <List.Header>5.5 tỷ</List.Header>
                    </List.Content>
                  </List.Item>
                </List>
                <Divider />

                <h3>Thông tin mô tả</h3>
                <p>
                  Quỹ hàng Vinhomes Hưng Yên đợt 1 giá cực tốt liên hệ em Hoa
                  0986784*** để được tư vấn và lựa chọn những căn đẹp nhất với
                  giá tốt nhất thị trường. Vinhomes Hưng Yên - The Empire
                  Vinhomes Ocean Park 2 nơi khởi nguồn cuộc sống thịnh vượng. *
                  Sản phẩm đa dạng phù hợp với mọi nhu cầu khách hàng. - Liền
                  kề, Shophouse: 48m2 - 64m2 - 70m2 - 80m2 - 90m2 - 100m2 -
                  112.5m2 - 120m2 - 157.5m2. - Song lập: 127.5m2 - 136m2 - 140m2
                  - 150m2 - 162m2 - 170m2 - 180m2. - Đơn lập: 217m2 - 141m2 -
                  230m2 - 470m2. * Chính sách hỗ trợ. + Hỗ trợ vay 70%, có thể
                  lên đến 80%. + Hỗ trợ lãi suất 0% đến 12 tháng.
                </p>
                <h3>Đặc điểm bất động sản</h3>
                <p>Đặc điểm bds</p>
                <h3>Hình ảnh</h3>
                <h3>Xem trên bản đồ</h3>
              </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment textAlign="center">
                <Image
                  src="https://media.travelmag.vn/files/content/2021/04/30/173292019_315063713309362_6329146106221360649_n-00272556.jpg"
                  size="tiny"
                  circular
                  alt="avatar"
                  verticalAlign="middle"
                />
                <br />
                <br />
                <div>Được đăng bởi</div>
                <h4>Sơn Tùng M-TP</h4>
              </Segment>
              <Segment textAlign="center">
                <>Thông tin liên hệ</>
                <h3>Nguyễn Đăng Phát</h3>
                <div>
                  {" "}
                  <Icon name="map marker alternate" />
                  Ngọc Nội - Trạm Lộ - Thuận Thành - Bắc Ninh
                </div>
                <Button fluid color="blue" size="large" inverted>
                  <Icon name="phone" />
                  <span>0917768923</span>
                </Button>
                <Button fluid color="green" size="large" inverted>
                  <Icon name="mail" />
                  <span>phatnguyen1412@gmail.com</span>
                </Button>
              </Segment>
              <Segment textAlign="left">
                <h3>Người môi giới đang theo dõi</h3>
                <List relaxed>
                  <List.Item>
                    <List.Content floated="right">
                      <Button primary>Xem bài phái sinh</Button>
                    </List.Content>
                    <Image
                      avatar
                      src="https://react.semantic-ui.com/images/avatar/small/rachel.png"
                      alt="avatar"
                    />
                    <List.Content>
                      <List.Header as="a">Nguyễn Văn A</List.Header>
                      <List.Description>
                        <Rating
                          icon="star"
                          defaultRating={4}
                          maxRating={5}
                          disabled
                        />
                      </List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content floated="right">
                      <Button primary>Xem bài phái sinh</Button>
                    </List.Content>
                    <Image
                      avatar
                      src="https://react.semantic-ui.com/images/avatar/small/rachel.png"
                      alt="avatar"
                    />
                    <List.Content>
                      <List.Header as="a">Nguyễn Văn A</List.Header>
                      <List.Description>
                        <Rating
                          icon="star"
                          defaultRating={5}
                          maxRating={5}
                          disabled
                        />
                      </List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content floated="right">
                      <Button primary>Xem bài phái sinh</Button>
                    </List.Content>
                    <Image
                      avatar
                      src="https://react.semantic-ui.com/images/avatar/small/rachel.png"
                      alt="avatar"
                    />
                    <List.Content>
                      <List.Header as="a">Nguyễn Văn A</List.Header>
                      <List.Description>
                        <Rating
                          icon="star"
                          defaultRating={3}
                          maxRating={5}
                          disabled
                        />
                      </List.Description>
                    </List.Content>
                  </List.Item>
                </List>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </FormPropertyDetailContainer>
  );
};

export default FormPropertyDetail;
