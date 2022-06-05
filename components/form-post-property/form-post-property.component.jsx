import React, { useState, useEffect } from "react";
import {
  Button,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Label,
  Segment,
} from "semantic-ui-react";
import {
  getDistrictById,
  getProvincesById,
  getWards,
} from "../../actions/vietnam-provinces";
import { FormPostPropertyContainer } from "./form-post-property.styles";
import Map from "../map/map.component";

const HANOI_PROVINCE_ID = 1;
const THACHTHAT_DISTRICT_ID = 276;

const FormPostProperty = () => {
  const [postProperty, setPostProperty] = useState({
    title: undefined,
    description: undefined,
    propertyType: undefined,
    area: undefined,
    price: undefined,
    unitPrice: 1,
    frontispiece: undefined,
    direction: undefined,
    certification: undefined,
    province: undefined,
    district: undefined,
    ward: undefined,
    address: undefined,
    longitude: undefined,
    latitude: undefined,
    images: undefined,
    contactName: undefined,
    contactPhone: undefined,
    contactAddress: undefined,
    contactEmail: undefined,
  });

  const [dataProvinces, setDataProvinces] = useState({
    provinces: [],
    districts: [],
    wards: [],
  });

  const GOOGLE_MAP_API_KEY = "AIzaSyCMSkwBazeXabBmE9f6-foYr6JTDbIxO0U";

  useEffect(() => {
    fetchProvinceAPI();
  }, []);

  useEffect(() => {
    fetchDistrictAPI();
  }, []);

  useEffect(() => {
    fetchWardsAPI();
  }, []);

  const fetchProvinceAPI = async () => {
    const provincesData = await getProvincesById(HANOI_PROVINCE_ID);
    setPostProperty((prev) => ({ ...prev, province: provincesData.name }));
    setDataProvinces((prev) => ({
      ...prev,
      provinces: [{ name: provincesData.name, value: provincesData.code }],
    }));
  };

  const fetchDistrictAPI = async () => {
    const districtsData = await getDistrictById(THACHTHAT_DISTRICT_ID);
    setPostProperty((prev) => ({ ...prev, district: districtsData.name }));
    setDataProvinces((prev) => ({
      ...prev,
      districts: [{ name: districtsData.name, value: districtsData.code }],
    }));
  };

  const fetchWardsAPI = async () => {
    const wardsData = await getWards(THACHTHAT_DISTRICT_ID);
    setDataProvinces((prev) => ({
      ...prev,
      wards: wardsData.wards.map((w) => {
        return { name: w.name, value: w.code };
      }),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostProperty((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    console.log(postProperty);
  });

  return (
    <div>
      <FormPostPropertyContainer>
        <Form size="large">
          <Grid columns="equal" padded>
            <Grid.Row>
              <Grid.Column width={10}>
                <Segment size="large">
                  <h1>Thông tin bài đăng</h1>
                  <Form.Input
                    fluid
                    name="title"
                    value={postProperty.title}
                    label="Tiêu đề"
                    placeholder="Tiêu đề bài đăng"
                    onChange={handleChange}
                  />
                  <Form.TextArea
                    fluid
                    name="description"
                    value={postProperty.description}
                    label="Mô tả"
                    placeholder="Nhập mô tả chung về bất động sản của bạn"
                    onChange={handleChange}
                  />
                </Segment>
                <Segment>
                  <h1>Thông tin bất động sản</h1>
                  <Form.Field>
                    <label>Loại bất động sản</label>
                    <select name="propertyType" onChange={handleChange}>
                      <option disabled selected>
                        Chọn loại bất động sản
                      </option>
                      <option value="1">Bán nhà</option>
                      <option value="2">Bán căn hộ chung cư</option>
                      <option value="3">Bán đất nền</option>
                    </select>
                  </Form.Field>
                  <Form.Group widths={3}>
                    <Form.Input
                      fluid
                      label="Diện tích"
                      placeholder="Nhập diện tích"
                      name="area"
                      value={postProperty.area}
                      onChange={handleChange}
                    />
                    <Form.Input
                      fluid
                      label="Mức giá"
                      placeholder="Nhập mức giá"
                      name="price"
                      value={postProperty.price}
                      onChange={handleChange}
                    />
                    <Form.Field>
                      <label>Đơn vị</label>
                      <select name="unitPrice" onChange={handleChange}>
                        <option value="1">VNĐ</option>
                        <option value="2">VNĐ/m²</option>
                        <option value="3">Thoả thuận</option>
                      </select>
                    </Form.Field>
                  </Form.Group>
                  <Divider horizontal>Mô tả bổ sung</Divider>
                  <Form.Group widths={2}>
                    <Form.Field>
                      <label>Hướng nhà</label>
                      <select
                        name="direction"
                        onChange={handleChange}
                        value={postProperty.direction}
                      >
                        <option selected disabled>
                          Chọn hướng
                        </option>
                        <option value="1">Đông</option>
                        <option value="2">Tây</option>
                        <option value="3">Nam</option>
                        <option value="4">Bắc</option>
                        <option value="5">Đông Bắc</option>
                        <option value="6">Tây Bắc</option>
                        <option value="7">Tây Nam</option>
                        <option value="8">Đông Nam</option>
                      </select>
                    </Form.Field>
                    <Form.Input
                      fluid
                      label="Mặt tiền"
                      placeholder="Nhập số"
                      name="frontispiece"
                      value={postProperty.frontispiece}
                      onChange={handleChange}
                    >
                      <input />
                      <Label basic size="large">
                        m
                      </Label>
                    </Form.Input>
                  </Form.Group>
                </Segment>
                <Segment>
                  <h1>Thông tin địa lý</h1>
                  <Form.Group widths={2}>
                    <Form.Field>
                      <label>Tỉnh/Thành phố</label>
                      <select name="province" onChange={handleChange}>
                        <option disabled>Chọn Tỉnh/Thành phố</option>
                        {dataProvinces.provinces.map((p) => (
                          <option key={p.value} value={p.value}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </Form.Field>
                    <Form.Field>
                      <label>Quận/Huyện</label>
                      <select name="district" onChange={handleChange}>
                        <option disabled>Chọn Quận/Huyện</option>
                        {dataProvinces.districts.map((d) => (
                          <option key={d.value} value={d.value}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </Form.Field>
                  </Form.Group>
                  <Form.Group widths={2}>
                    <Form.Field>
                      <label>Phường/Xã</label>
                      <select
                        name="ward"
                        value={postProperty.ward}
                        onChange={handleChange}
                      >
                        <option disabled selected>
                          Chọn Phường/Xã
                        </option>
                        {dataProvinces.wards.map((w) => (
                          <option key={w.value} value={w.name}>
                            {w.name}
                          </option>
                        ))}
                      </select>
                    </Form.Field>
                    <Form.Input
                      fluid
                      label="Địa chỉ"
                      placeholder="Nhập địa chỉ"
                      name="address"
                      value={postProperty.address}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  {/* missing loading */}
                  {/* <Form.Field control={<></>} label="Vị trí trên bản đồ" /> */}
                  <Map />
                  <Form.Group widths={3}>
                    <Form.Input
                      fluid
                      placeholder="Nhập kinh độ"
                      name="longitude"
                      value={postProperty.longitude}
                      onChange={handleChange}
                    />
                    <Form.Input
                      fluid
                      placeholder="Nhập vĩ độ"
                      name="latitude"
                      value={postProperty.latitude}
                      onChange={handleChange}
                    />
                    <Form.Button>Kiểm tra trên bản đồ</Form.Button>
                  </Form.Group>
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
                  <Form.Group widths={2}>
                    <Form.Input
                      fluid
                      label="Tên liên hệ"
                      name="contactName"
                      placeholder="Nhập tên"
                      value={postProperty.contactName}
                      onChange={handleChange}
                    />
                    <Form.Input
                      fluid
                      label="Số điện thoại"
                      name="contactPhone"
                      placeholder="Nhập số điện thoại"
                      value={postProperty.contactPhone}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group widths={2}>
                    <Form.Input
                      fluid
                      label="Địa chỉ"
                      name="contactAddress"
                      placeholder="Nhập địa chỉ"
                      value={postProperty.contactAddress}
                      onChange={handleChange}
                    />
                    <Form.Input
                      fluid
                      label="Email"
                      name="contactEmail"
                      placeholder="Nhập email"
                      value={postProperty.contactEmail}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Segment>
              </Grid.Column>
              <Grid.Column width={6}>
                <Segment>
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
                  <Button color="red" fluid size="large">
                    Xử lý thanh toán
                  </Button>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </FormPostPropertyContainer>
    </div>
  );
};

export default FormPostProperty;
