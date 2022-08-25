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
  getBrokerPrice,
  getDiscountEndTransaction,
  getPricePerDayData,
  getTotalAmount,
  searchPayments,
  updatePriceBroker,
  updatePricePerDay,
  updateRefund,
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

  const [refundData, setRefundData] = useState(null);
  const [refundWithInfo, setRefundWithInfo] = useState(null);
  const [refundWithoutInfo, setRefundWithoutInfo] = useState(null);
  const [refundWithoutInfoOptions, setRefundWithoutInfoOptions] =
    useState(null);
  const [refundWithInfoOptions, setRefundWithInfoOptions] = useState(null);

  const [brokerPriceData, setBrokerPriceData] = useState(null);
  const [brokerPriceOptions, setBrokerPriceOptions] = useState(null);
  const [brokerPrice, setBrokerPrice] = useState(null);
  const [oneMonthDiscount, setOneMonthDiscount] = useState(null);
  const [threeMonthsDiscount, setThreeMonthsDiscount] = useState(null);
  const [sixMonthsDiscount, setSixMonthsDiscount] = useState(null);
  const [twelveMonthsDiscount, setTwelveMonthsDiscount] = useState(null);

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

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await getDiscountEndTransaction();
      setRefundData(data);
      setRefundWithInfo(data.currentRefundWithInfo.percent);
      setRefundWithoutInfo(data.currentRefundWithoutInfo.percent);
      setRefundWithInfoOptions(
        data.listRefundWithInfo.map((price) => {
          return { key: price, text: price, value: price };
        })
      );
      setRefundWithoutInfoOptions(
        data.listRefundWithoutInfo.map((price) => {
          return { key: price, text: price, value: price };
        })
      );
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await getBrokerPrice();
      setBrokerPriceData(data);
      setBrokerPriceOptions(
        data.list.map((price) => {
          return { key: price, text: price, value: price };
        })
      );
      setBrokerPrice(data.currentPrice[0].price);
      setOneMonthDiscount(data.currentPrice[0].discount);
      setThreeMonthsDiscount(data.currentPrice[1].discount);
      setSixMonthsDiscount(data.currentPrice[2].discount);
      setTwelveMonthsDiscount(data.currentPrice[3].discount);
    };
    fetchAPI();
  }, []);

  const handleAddition = (e, { name, value }) => {
    if (name === "pricePerDay") {
      setPricePerDayOptions([{ text: value, value }, ...pricePerDayOptions]);
    }
    if (name === "refundWithoutInfo") {
      setRefundWithoutInfoOptions([
        { text: value, value },
        ...refundWithoutInfoOptions,
      ]);
    }
    if (name === "refundWithInfo") {
      setRefundWithInfoOptions([
        { text: value, value },
        ...refundWithInfoOptions,
      ]);
    }
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

  const [pricePerDayLoading, setPricePerDayLoading] = useState(false);

  const handleSubmitPricePerDay = async (e) => {
    e.preventDefault();
    setPricePerDayLoading(true);
    const data = await updatePricePerDay({
      typeId: 1,
      price: pricePerDay,
      discount: discountPricePerDay,
    });
    setPricePerDayLoading(false);
    if (data) {
      setPricePerDayData(data);
    }
  };

  const [refundLoading, setRefundLoading] = useState(false);

  const handleSubmitRefund = async (e) => {
    e.preventDefault();
    setRefundLoading(true);
    const data = await updateRefund({
      refundWithInfo: refundWithInfo,
      refundWithoutInfo: refundWithoutInfo,
    });
    setRefundLoading(false);
    if (data) {
      setRefundData(data);
    }
  };

  const [priceBrokerLoading, setPriceBrokerLoading] = useState(false);

  const handleBrokerPriceSubmit = async (e) => {
    e.preventDefault();
    setPriceBrokerLoading(true);
    const data = await updatePriceBroker({
      brokerPrice,
      oneMonthDiscount,
      threeMonthsDiscount,
      sixMonthsDiscount,
      twelveMonthsDiscount,
    });
    setPriceBrokerLoading(false);
    if (data) {
      setBrokerPriceData(data);
    }
  };

  return (
    <FinancialManagementPageContainer>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <Grid columns="equal">
                <Grid.Row>
                  <Grid.Column>
                    <Segment textAlign="center">
                      <Statistic size="small">
                        <Statistic.Label>Tổng doanh thu</Statistic.Label>
                        <Statistic.Value style={{ fontFamily: "Tahoma" }}>
                          {convertToCurrency(totalAmount.totalAmount)} VNĐ
                        </Statistic.Value>
                      </Statistic>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment textAlign="center">
                      <Statistic size="small">
                        <Statistic.Label>
                          Tổng tiền nạp vào hệ thống
                        </Statistic.Label>
                        <Statistic.Value style={{ fontFamily: "Tahoma" }}>
                          {convertToCurrency(totalAmount.totalDepositMoney)} VNĐ
                        </Statistic.Value>
                      </Statistic>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment textAlign="center">
                      <Statistic size="small">
                        <Statistic.Label>Từ các bài đăng</Statistic.Label>
                        <Statistic.Value style={{ fontFamily: "Tahoma" }}>
                          {convertToCurrency(totalAmount.totalPostAmount)} VNĐ
                        </Statistic.Value>
                      </Statistic>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment textAlign="center">
                      <Statistic size="small">
                        <Statistic.Label>
                          Đăng ký thành nhà môi giới
                        </Statistic.Label>
                        <Statistic.Value style={{ fontFamily: "Tahoma" }}>
                          {convertToCurrency(totalAmount.totalBrokerAmount)} VNĐ
                        </Statistic.Value>
                      </Statistic>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <Grid columns={3}>
                <Grid.Column>
                  <Segment>
                    <Header as="h3">Cập nhật đơn giá bài đăng</Header>
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
                        onChange={(e, { name, value }) => setPricePerDay(value)}
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
                      <Button
                        content="Cập nhật"
                        primary
                        loading={pricePerDayLoading}
                        disabled={pricePerDayLoading}
                      />
                    </Form>
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment>
                    <Grid.Column>
                      <Header as="h3">
                        Cập nhật đơn giá đăng ký nhà môi giới
                      </Header>
                      <Form onSubmit={handleBrokerPriceSubmit}>
                        <b>
                          Giá 1 tháng:{" "}
                          {brokerPriceData && brokerPriceData.currentPrice && (
                            <>
                              {convertToCurrency(
                                brokerPriceData.currentPrice[0].price
                              )}{" "}
                              VNĐ
                            </>
                          )}
                        </b>
                        &nbsp;&nbsp;&nbsp;
                        <b>
                          {brokerPriceData && brokerPriceData.currentPrice[0] && (
                            <>
                              <Label
                                color="red"
                                horizontal
                                style={{ marginLeft: "5px" }}
                              >
                                -{brokerPriceData.currentPrice[0].discount}%
                              </Label>
                            </>
                          )}
                        </b>
                        &nbsp;&nbsp;
                        <b>
                          {brokerPriceData && brokerPriceData.currentPrice[1] && (
                            <>
                              <Label
                                color="red"
                                horizontal
                                style={{ marginLeft: "5px" }}
                              >
                                -{brokerPriceData.currentPrice[1].discount}%
                              </Label>
                            </>
                          )}
                        </b>
                        &nbsp;&nbsp;
                        <b>
                          {brokerPriceData && brokerPriceData.currentPrice[2] && (
                            <>
                              <Label
                                color="red"
                                horizontal
                                style={{ marginLeft: "5px" }}
                              >
                                -{brokerPriceData.currentPrice[2].discount}%
                              </Label>
                            </>
                          )}
                        </b>
                        &nbsp;&nbsp;
                        <b>
                          {brokerPriceData && brokerPriceData.currentPrice[3] && (
                            <>
                              <Label
                                color="red"
                                horizontal
                                style={{ marginLeft: "5px" }}
                              >
                                -{brokerPriceData.currentPrice[3].discount}%
                              </Label>
                            </>
                          )}
                        </b>
                        <br />
                        <InputField
                          fieldType="dropdown"
                          label="Cập nhật mức giá 1 tháng (VNĐ)"
                          name="brokerPrice"
                          placeholder="Chọn mức giá bài đăng"
                          options={brokerPriceOptions}
                          search
                          selection
                          fluid
                          allowAdditions
                          additionLabel="Thêm mức giá: "
                          value={brokerPrice}
                          onAddItem={handleAddition}
                          onChange={(e, { name, value }) =>
                            setBrokerPrice(value)
                          }
                        />
                        <Form.Group widths={4}>
                          <InputField
                            type="number"
                            label="1 tháng (%)"
                            name="oneMonthDiscount"
                            value={oneMonthDiscount}
                            onInput={(e) => {
                              setOneMonthDiscount(
                                e.target.value > 0
                                  ? e.target.value <= 100
                                    ? e.target.value
                                    : 100
                                  : 0
                              );
                            }}
                          />
                          <InputField
                            type="number"
                            label="3 tháng (%)"
                            name="threeMonthsDiscount"
                            value={threeMonthsDiscount}
                            onInput={(e) => {
                              setThreeMonthsDiscount(
                                e.target.value > 0
                                  ? e.target.value <= 100
                                    ? e.target.value
                                    : 100
                                  : 0
                              );
                            }}
                          />
                          <InputField
                            type="number"
                            label="6 tháng (%)"
                            name="oneMonthDiscount"
                            value={sixMonthsDiscount}
                            onInput={(e) => {
                              setSixMonthsDiscount(
                                e.target.value > 0
                                  ? e.target.value <= 100
                                    ? e.target.value
                                    : 100
                                  : 0
                              );
                            }}
                          />
                          <InputField
                            type="number"
                            label="12 tháng (%)"
                            name="oneMonthDiscount"
                            value={twelveMonthsDiscount}
                            onInput={(e) => {
                              setTwelveMonthsDiscount(
                                e.target.value > 0
                                  ? e.target.value <= 100
                                    ? e.target.value
                                    : 100
                                  : 0
                              );
                            }}
                          />
                        </Form.Group>
                        <Button
                          content="Cập nhật"
                          primary
                          loading={priceBrokerLoading}
                          disabled={priceBrokerLoading}
                        />
                      </Form>
                    </Grid.Column>
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment>
                    <Grid.Column>
                      <Header as="h3">
                        Cập nhật giá hoàn tiền khi kết thúc giao dịch
                      </Header>
                      <Form onSubmit={handleSubmitRefund}>
                        <b>
                          Giảm giá:{" "}
                          {refundData && (
                            <>
                              <Label
                                color="red"
                                horizontal
                                style={{ marginLeft: "5px" }}
                              >
                                -{refundData.currentRefundWithoutInfo.percent}%
                              </Label>
                            </>
                          )}
                        </b>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <b>
                          Cung cấp thông tin bất động sản:{" "}
                          {refundData && (
                            <>
                              <Label
                                color="red"
                                horizontal
                                style={{ marginLeft: "5px" }}
                              >
                                -{refundData.currentRefundWithInfo.percent}%
                              </Label>
                            </>
                          )}
                        </b>
                        <br />
                        <InputField
                          fieldType="dropdown"
                          label="Cập nhật mức hoàn tiền (%)"
                          name="refundWithoutInfo"
                          placeholder="Chọn mức giá bài đăng"
                          options={refundWithoutInfoOptions}
                          search
                          selection
                          fluid
                          allowAdditions
                          additionLabel="Thêm mức giá: "
                          value={refundWithoutInfo}
                          onAddItem={handleAddition}
                          onChange={(e, { name, value }) =>
                            setRefundWithoutInfo(value)
                          }
                        />
                        <InputField
                          fieldType="dropdown"
                          label="Cập nhật mức hoàn tiền khi cung cấp thông tin bất động sản(%)"
                          name="refundWithInfo"
                          placeholder="Chọn mức giá bài đăng"
                          options={refundWithInfoOptions}
                          search
                          selection
                          fluid
                          allowAdditions
                          additionLabel="Thêm mức giá: "
                          value={refundWithInfo}
                          onAddItem={handleAddition}
                          onChange={(e, { name, value }) =>
                            setRefundWithInfo(value)
                          }
                        />
                        <Button
                          content="Cập nhật"
                          primary
                          loading={refundLoading}
                          disabled={refundLoading}
                        />
                      </Form>
                    </Grid.Column>
                  </Segment>
                </Grid.Column>
              </Grid>
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
                  text: "Thanh toán bài đăng",
                  value: 1,
                },
                {
                  key: 2,
                  text: "Đăng ký trở thành nhà môi giới",
                  value: 2,
                },
                {
                  key: 3,
                  text: "Nạp tiền vào ví",
                  value: 3,
                },
                {
                  key: 6,
                  text: "Rút tiền",
                  value: 6,
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
                        {payment.startDate}
                      </Table.Cell>
                      <Table.Cell singleLine textAlign="center">
                        {payment.typeId === 1 && "Thanh toán bài đăng"}
                        {payment.typeId === 2 &&
                          "Đăng ký trở thành nhà môi giới"}
                        {payment.typeId === 3 && "Nạp tiền vào ví"}
                        {payment.typeId === 6 && "Rút tiền"}
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
