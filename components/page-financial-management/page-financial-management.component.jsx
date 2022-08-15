import React, { useEffect, useState } from "react";
import {
  Button,
  Dimmer,
  Divider,
  Dropdown,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  Label,
  Loader,
  Segment,
  Statistic,
  Tab,
  Table,
} from "semantic-ui-react";
import InputField from "../input-field/input-field.component";
import {
  FinancialManagementPageContainer,
  PaginationContainer,
} from "./page-financial-management.styles";
import { useForm } from "react-hook-form";
import Pagination from "../pagination/pagination.component";
import {
  getPricePerDayData,
  getTotalAmount,
  searchPayments,
  updatePricePerDay,
} from "../../actions/admin";
import convertToCurrency from "../../utils/convertToCurrency";

const FinancialManagementPage = ({ paymentData, setTotalResult }) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      key: undefined,
    },
  });

  const [data, setData] = useState(paymentData);
  const [totalAmount, setTotalAmount] = useState([]);

  const [pricePerDayData, setPricePerDayData] = useState(null);
  const [pricePerDay, setPricePerDay] = useState(null);
  const [discountPricePerDay, setDiscountPricePerDay] = useState(null);
  const [pricePerDayOptions, setPricePerDayOptions] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const total = await getTotalAmount();
      setTotalAmount(total);
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await getPricePerDayData();
      setPricePerDayData(data.currentPrice);
      setPricePerDay(data.currentPrice.price);
      setDiscountPricePerDay(data.currentPrice.discount);
      setPricePerDayOptions(
        data.listPrice.map((price) => {
          return { key: price, text: price, value: price };
        })
      );
    };
    fetchAPI();
  }, []);

  const handleAddition = (e, { value }) => {
    setPricePerDayOptions([{ text: value, value }, ...pricePerDayOptions]);
  };

  const handleChange = (e, { name, value }) => {
    setPricePerDay(value);
  };

  const [loading, setLoading] = useState(false);

  const [sortValue, setSortValue] = useState(0);
  const [params, setParams] = useState({});

  const onSubmit = async (data, e) => {
    setSortValue(0);
    setParams(data);
    fetchAPI(data, 0, 0);
  };

  const handlePaginationChange = (e, { activePage }) =>
    fetchAPI(params, sortValue, activePage - 1);

  const handleFilterOption = (e, { value }) => {
    setSortValue(value);
    fetchAPI(params, value, 0);
  };

  const fetchAPI = async (params, sortValue, pageNo) => {
    setLoading(true);
    const payments = await searchPayments(params, sortValue, pageNo);
    setData(payments);
    setTotalResult(payments.totalResult);
    setLoading(false);
  };

  const handleSubmitPricePerDay = async (e) => {
    e.preventDefault();
    const data = await updatePricePerDay({
      typeId: 1,
      price: pricePerDay,
      discount: discountPricePerDay,
    });
    if (data) {
      setPricePerDayData(data);
    }
  };

  return (
    <FinancialManagementPageContainer>
      <Grid>
        <Grid.Row>
          <Grid.Column width={6}>
            <Segment>
              <Grid columns="equal">
                <Grid.Row>
                  <Grid.Column>
                    <Segment textAlign="center">
                      <Statistic size="small">
                        <Statistic.Label>Tổng doanh thu</Statistic.Label>
                        <Statistic.Value>
                          {convertToCurrency(totalAmount.totalAmount)} VNĐ
                        </Statistic.Value>
                      </Statistic>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Segment textAlign="center">
                      <Statistic size="tiny">
                        <Statistic.Label>Từ các bài đăng</Statistic.Label>
                        <Statistic.Value>
                          {convertToCurrency(totalAmount.totalPostAmount)} VNĐ
                        </Statistic.Value>
                      </Statistic>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment textAlign="center">
                      <Statistic size="tiny">
                        <Statistic.Label>
                          Đăng ký thành nhà môi giới
                        </Statistic.Label>
                        <Statistic.Value>
                          {convertToCurrency(totalAmount.totalBrokerAmount)} VNĐ
                        </Statistic.Value>
                      </Statistic>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
          <Grid.Column width={10}>
            <Segment>
              <Grid columns={2} relaxed="very" stackable>
                <Grid.Column>
                  <Header as="h3" style={{ marginBottom: "5px" }}>
                    Cập nhật đơn giá bài đăng
                  </Header>
                  <Form onSubmit={handleSubmitPricePerDay}>
                    <b>
                      Đơn giá hiện tại:{" "}
                      {pricePerDayData && (
                        <>
                          {convertToCurrency(pricePerDayData.price)} VNĐ
                          <Label
                            color="red"
                            horizontal
                            style={{ marginLeft: "5px" }}
                          >
                            -{pricePerDayData.discount}%
                          </Label>
                        </>
                      )}
                    </b>
                    <br />
                    <InputField
                      fieldType="dropdown"
                      label="Cập nhật mức giá bài đăng (VNĐ)"
                      name="pricePerDay"
                      placeholder="Chọn mức giá bài đăng"
                      options={pricePerDayOptions}
                      search
                      selection
                      fluid
                      allowAdditions
                      additionLabel="Thêm mức giá: "
                      value={pricePerDay}
                      onAddItem={handleAddition}
                      onChange={handleChange}
                    />
                    <InputField
                      type="number"
                      label="Giảm giá (%)"
                      name="discountPricePerDay"
                      placeholder="Nhập tên liên hệ"
                      value={discountPricePerDay}
                      onInput={(e) => {
                        setDiscountPricePerDay(
                          e.target.value > 0
                            ? e.target.value <= 100
                              ? e.target.value
                              : 100
                            : 0
                        );
                      }}
                    />
                    <Button content="Cập nhật" primary />
                  </Form>
                </Grid.Column>

                <Grid.Column>
                  <Header as="h3">Cập nhật đơn giá đăng ký nhà môi giới</Header>
                </Grid.Column>
              </Grid>
              <Divider vertical>Và</Divider>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                name="key"
                placeholder="Tìm kiếm người dùng"
                onChange={(e, { name, value }) => {
                  setValue(name, value);
                }}
                action="Tìm kiếm"
              />
            </Form>
          </Grid.Column>
          <Grid.Column width={12} textAlign="right">
            <Dropdown
              selection
              options={[
                {
                  key: 0,
                  text: "Tất cả",
                  value: 0,
                },
                {
                  key: 1,
                  text: "Đăng bài",
                  value: 1,
                },
                {
                  key: 2,
                  text: "Đăng ký trở thành nhà môi giới",
                  value: 2,
                },
              ]}
              className="filter"
              value={sortValue}
              onChange={handleFilterOption}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Table selectable color="yellow">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell singleLine textAlign="center">
                  Mã người dùng
                </Table.HeaderCell>
                <Table.HeaderCell singleLine textAlign="center">
                  Tài khoản
                </Table.HeaderCell>
                <Table.HeaderCell singleLine textAlign="center">
                  Họ và tên
                </Table.HeaderCell>
                <Table.HeaderCell singleLine textAlign="center">
                  Ngày giao dịch
                </Table.HeaderCell>
                <Table.HeaderCell singleLine textAlign="center">
                  Mục thanh toán
                </Table.HeaderCell>
                <Table.HeaderCell singleLine textAlign="center">
                  Nội dung thanh toán
                </Table.HeaderCell>
                <Table.HeaderCell singleLine textAlign="center">
                  Số tiền
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data &&
                data.payments.length > 0 &&
                data.payments.map((payment, index) => {
                  return (
                    <Table.Row key={index}>
                      <Table.Cell singleLine textAlign="center">
                        {payment.user.id}
                      </Table.Cell>
                      <Table.Cell singleLine textAlign="center">
                        <Header as="h4" image>
                          <Image
                            src={
                              payment.user.avatar ||
                              "https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
                            }
                            avatar
                            className="user-avatar-small"
                          />
                          <Header.Content>{payment.user.phone}</Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell singleLine textAlign="center">
                        {payment.user.fullName}
                      </Table.Cell>
                      <Table.Cell singleLine textAlign="center">
                        {payment.date}
                      </Table.Cell>
                      <Table.Cell singleLine textAlign="center">
                        {payment.typeId === 1 && "Thanh toán bài đăng"}
                        {payment.typeId === 2 &&
                          "Đăng ký trở thành nhà môi giới"}
                      </Table.Cell>
                      <Table.Cell singleLine textAlign="center">
                        {payment.description}
                      </Table.Cell>
                      <Table.Cell singleLine textAlign="center">
                        {convertToCurrency(payment.amount)} VNĐ
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>
          <PaginationContainer>
            <Pagination
              activePage={data.pageNo}
              boundaryRange={1}
              siblingRange={1}
              ellipsisItem={{
                content: <Icon name="ellipsis horizontal" />,
                icon: true,
              }}
              totalPages={data.totalPages}
              onPageChange={handlePaginationChange}
            />
          </PaginationContainer>
          <Dimmer active={loading} inverted>
            <Loader>Đang tải dữ liệu</Loader>
          </Dimmer>
        </Grid.Row>
      </Grid>
    </FinancialManagementPageContainer>
  );
};

export default FinancialManagementPage;
