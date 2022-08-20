import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Confirm,
  Dimmer,
  Dropdown,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  Loader,
  Tab,
  Table,
} from "semantic-ui-react";
import {
  acceptedWithdraw,
  deniedWithdraw,
  getDirectWithdraw,
  getTransferWithdraw,
} from "../../actions/admin";
import convertToCurrency from "../../utils/convertToCurrency";
import InputField from "../input-field/input-field.component";
import Pagination from "../pagination/pagination.component";
import {
  CashoutManagementPageContainer,
  PaginationContainer,
} from "./page-cashout-management.styles";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import ModalItem from "../modal-item/modal-item.component";

const CashoutManagementPage = ({ withdrawData }) => {
  const [directWithdraw, setDirectWithdraw] = useState(withdrawData.direct);
  const [transferWithdraw, setTransferWithdraw] = useState(
    withdrawData.transfer
  );

  const handleOnTabChange = (e, { activeIndex }) => {
    if (activeIndex === 0) fetchDirectWithdrawAPI();
    if (activeIndex === 1) fetchBankWithdrawAPI();
  };

  const fetchDirectWithdrawAPI = async () => {
    const data = await getDirectWithdraw();
    setDirectWithdraw(data);
    console.log(data);
  };

  const fetchBankWithdrawAPI = async () => {
    const data = await getTransferWithdraw();
    setTransferWithdraw(data);
    console.log(data);
  };

  return (
    <CashoutManagementPageContainer>
      <SemanticToastContainer position="bottom-right" maxToasts={3} />
      <Tab
        onTabChange={handleOnTabChange}
        menu={{ secondary: true, pointing: true }}
        panes={[
          {
            menuItem: "Rút tiền trực tiếp",
            render: () => (
              <Tab.Pane attached={false} as="div">
                <DirectWithdrawal
                  directWithdraw={directWithdraw}
                  toast={toast}
                />
              </Tab.Pane>
            ),
          },
          {
            menuItem: "Chuyển tiền qua tài khoản ngân hàng",
            render: () => (
              <Tab.Pane attached={false} as="div">
                <BankTransfer
                  transferWithdraw={transferWithdraw}
                  toast={toast}
                />
              </Tab.Pane>
            ),
          },
        ]}
      />
    </CashoutManagementPageContainer>
  );
};

const DirectWithdrawal = ({ directWithdraw, toast }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({});

  const [directWithdrawData, setDirectWithdrawData] = useState(
    directWithdraw || {}
  );
  const [data, setData] = useState(directWithdraw.lists || []);

  const [sortValue, setSortValue] = useState(0);
  const [keyword, setKeyword] = useState(null);
  const [detail, setDetail] = useState(null);
  const [openAccepted, setOpenAccepted] = useState(false);
  const [openDenied, setOpenDenied] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleAccepted = async () => {
    const status = await acceptedWithdraw(detail.id);
    if (status === 200) {
      const list = [...data];
      const index = list.findIndex((direct) => direct.id === detail.id);
      list[index].status = 2;
      setData(list);
      setTimeout(() => {
        toast({
          type: "success",
          title: "Chấp nhận thanh toán",
          description: <p>Chấp nhận thanh toán thành công</p>,
        });
      }, 100);
      setOpenAccepted(false);
    }
  };

  const onSubmit = async (data, e) => {
    setSortValue(0);
    setKeyword(data.key);
    fetchAPI(data.key, 0, 0);
  };

  const handlePaginationChange = (e, { activePage }) =>
    fetchAPI(keyword, sortValue, activePage - 1);

  const handleFilterOption = (e, { value }) => {
    setSortValue(value);
    fetchAPI(keyword, value, 0);
  };

  const fetchAPI = async (keyword, sortValue, pageNo) => {
    setLoading(true);
    const data = await getDirectWithdraw(keyword, sortValue, pageNo);
    console.log(data);
    setDirectWithdrawData(data);
    setData(data.lists);
    // setTotalResult(posts.totalResult);
    setLoading(false);
  };

  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                name="key"
                placeholder="Tìm kiếm"
                onChange={async (e, { name, value }) => {
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
                  text: "Đang xử lý",
                  value: 1,
                },
                {
                  key: 2,
                  text: "Đã xử lý",
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
          <Grid.Column>
            {directWithdraw && data && data.length > 0 ? (
              <Table selectable size="large">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell singleLine textAlign="center">
                      ID
                    </Table.HeaderCell>
                    <Table.HeaderCell singleLine textAlign="center">
                      Tài khoản
                    </Table.HeaderCell>
                    <Table.HeaderCell singleLine textAlign="center">
                      Họ và tên
                    </Table.HeaderCell>
                    <Table.HeaderCell singleLine textAlign="center">
                      Số tiền
                    </Table.HeaderCell>
                    <Table.HeaderCell singleLine textAlign="center">
                      Nội dung
                    </Table.HeaderCell>
                    <Table.HeaderCell singleLine textAlign="center">
                      Ngày yêu cầu
                    </Table.HeaderCell>
                    <Table.HeaderCell singleLine textAlign="center">
                      Trạng thái
                    </Table.HeaderCell>
                    <Table.HeaderCell singleLine textAlign="center">
                      Hành động
                    </Table.HeaderCell>
                    <Table.HeaderCell singleLine textAlign="center">
                      Ghi chú
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {directWithdraw &&
                    data.map((direct, index) => {
                      return (
                        <Table.Row key={index}>
                          <Table.Cell singleLine textAlign="center">
                            {direct.user.id}
                          </Table.Cell>
                          <Table.Cell singleLine textAlign="center">
                            <Header as="h4" image>
                              <Image
                                src={
                                  direct.user.avatar ||
                                  "https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
                                }
                                avatar
                                className="user-avatar-small"
                              />
                              <Header.Content>
                                {direct.user.phone}
                              </Header.Content>
                            </Header>
                          </Table.Cell>
                          <Table.Cell singleLine textAlign="center">
                            {direct.user.fullName}
                          </Table.Cell>
                          <Table.Cell singleLine textAlign="center">
                            {convertToCurrency(direct.money)} VNĐ
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {direct.content}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {direct.startDate}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {direct.status === 1 ? (
                              <Label circular color="red">
                                CHƯA XỬ LÝ
                              </Label>
                            ) : (
                              <Label circular color="green">
                                ĐÃ XỬ LÝ
                              </Label>
                            )}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {direct.status === 1 ? (
                              <div className="ui two buttons">
                                <Button
                                  basic
                                  color="green"
                                  onClick={() => {
                                    setDetail(direct);
                                    setOpenAccepted(true);
                                  }}
                                >
                                  Chấp nhận
                                </Button>
                                <Button
                                  basic
                                  color="red"
                                  onClick={() => {
                                    setDetail(direct);
                                    setOpenDenied(true);
                                  }}
                                >
                                  Huỷ bỏ
                                </Button>
                              </div>
                            ) : direct.status === 2 ? (
                              <Label circular color="green">
                                ĐÃ XỬ LÝ
                              </Label>
                            ) : (
                              <Label circular color="red">
                                HUỶ BỎ
                              </Label>
                            )}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {direct.comment}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                </Table.Body>
                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan="9">
                      <Pagination
                        activePage={directWithdrawData.pageNo}
                        boundaryRange={1}
                        siblingRange={1}
                        ellipsisItem={{
                          content: <Icon name="ellipsis horizontal" />,
                          icon: true,
                        }}
                        totalPages={directWithdrawData.totalPages}
                        onPageChange={handlePaginationChange}
                      />
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            ) : (
              <>
                <Header as="h4">Không có yêu cầu nào</Header>
              </>
            )}
            <Dimmer active={loading} inverted>
              <Loader>Đang tải dữ liệu</Loader>
            </Dimmer>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Confirm
        open={openAccepted}
        onCancel={() => {
          setOpenAccepted(false);
        }}
        onConfirm={() => {
          handleAccepted();
        }}
      />
      <ModalItem
        header="Xác nhận huỷ bỏ thanh toán"
        onOpen={openDenied}
        onClose={() => {
          setOpenDenied(false);
        }}
      >
        <DeniedForm
          toast={toast}
          setOpenDenied={setOpenDenied}
          detail={detail}
          data={data}
          setData={setData}
        />
      </ModalItem>
    </>
  );
};

const DeniedForm = ({ toast, setOpenDenied, detail, data, setData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({});

  const onSubmit = async (commentData, e) => {
    const status = await deniedWithdraw(detail.id, commentData);
    if (status === 200) {
      const list = [...data];
      const index = list.findIndex((direct) => direct.id === detail.id);
      list[index].status = 3;
      list[index].comment = commentData.content;
      setData(list);
      setTimeout(() => {
        toast({
          type: "success",
          title: "Huỷ bỏ thanh toán",
          description: <p>Huỷ bỏ thanh toán thành công</p>,
        });
      }, 100);
      setOpenDenied(false);
    }
  };

  const handleChange = (e, { name, value }) => {
    setValue(name, value);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          {...register("content", {
            required: "Nhập lý do",
          })}
          fieldType="textarea"
          rows={5}
          label="Lý do"
          name="content"
          placeholder="Nhập lý do huỷ bỏ thanh toán"
          onChange={handleChange}
          error={errors.content}
          requiredField
        />
        <Grid>
          <Grid.Row>
            <Grid.Column textAlign="right">
              <Button
                type="button"
                onClick={() => {
                  setOpenDenied(false);
                }}
              >
                Huỷ bỏ
              </Button>
              <Button type="submit">Xác nhận</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </>
  );
};

const BankTransfer = ({ transferWithdraw, toast }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({});

  const [transferWithdrawData, setTransferWithdrawData] = useState(
    transferWithdraw || {}
  );
  const [data, setData] = useState(
    (transferWithdraw && transferWithdraw.lists) || []
  );

  const [sortValue, setSortValue] = useState(0);
  const [keyword, setKeyword] = useState(null);
  const [detail, setDetail] = useState(null);
  const [openAccepted, setOpenAccepted] = useState(false);
  const [openDenied, setOpenDenied] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleAccepted = async () => {
    const status = await acceptedWithdraw(detail.id);
    if (status === 200) {
      const list = [...data];
      const index = list.findIndex((direct) => direct.id === detail.id);
      list[index].status = 2;
      setData(list);
      setTimeout(() => {
        toast({
          type: "success",
          title: "Chấp nhận thanh toán",
          description: <p>Chấp nhận thanh toán thành công</p>,
        });
      }, 100);
      setOpenAccepted(false);
    }
  };

  const onSubmit = async (data, e) => {
    setSortValue(0);
    setKeyword(data.key);
    fetchAPI(data.key, 0, 0);
  };

  const handlePaginationChange = (e, { activePage }) =>
    fetchAPI(keyword, sortValue, activePage - 1);

  const handleFilterOption = (e, { value }) => {
    setSortValue(value);
    fetchAPI(keyword, value, 0);
  };

  const fetchAPI = async (keyword, sortValue, pageNo) => {
    setLoading(true);
    const data = await getTransferWithdraw(keyword, sortValue, pageNo);
    console.log(data);
    setTransferWithdrawData(data);
    setData(data.lists);
    // setTotalResult(posts.totalResult);
    setLoading(false);
  };

  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                name="key"
                placeholder="Tìm kiếm"
                onChange={async (e, { name, value }) => {
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
                  text: "Đang xử lý",
                  value: 1,
                },
                {
                  key: 2,
                  text: "Đã xử lý",
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
          <Grid.Column>
            {transferWithdraw && data && data.length > 0 ? (
              <Table selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell singleLine textAlign="center">
                      ID
                    </Table.HeaderCell>
                    <Table.HeaderCell singleLine textAlign="center">
                      Tài khoản
                    </Table.HeaderCell>
                    <Table.HeaderCell singleLine textAlign="center">
                      Họ và tên
                    </Table.HeaderCell>
                    <Table.HeaderCell singleLine textAlign="center">
                      Tên ngân hàng
                    </Table.HeaderCell>
                    <Table.HeaderCell singleLine textAlign="center">
                      Số tài khoản
                    </Table.HeaderCell>
                    <Table.HeaderCell singleLine textAlign="center">
                      Tên tài khoản
                    </Table.HeaderCell>
                    <Table.HeaderCell singleLine textAlign="center">
                      Số tiền
                    </Table.HeaderCell>
                    <Table.HeaderCell singleLine textAlign="center">
                      Nội dung
                    </Table.HeaderCell>
                    <Table.HeaderCell singleLine textAlign="center">
                      Ngày yêu cầu
                    </Table.HeaderCell>
                    <Table.HeaderCell singleLine textAlign="center">
                      Trạng thái
                    </Table.HeaderCell>
                    <Table.HeaderCell singleLine textAlign="center">
                      Hành động
                    </Table.HeaderCell>
                    <Table.HeaderCell singleLine textAlign="center">
                      Ghi chú
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {transferWithdraw &&
                    data.map((transfer, index) => {
                      return (
                        <Table.Row key={index}>
                          <Table.Cell singleLine textAlign="center">
                            {transfer.user.id}
                          </Table.Cell>
                          <Table.Cell singleLine textAlign="center">
                            <Header as="h4" image>
                              <Image
                                src={
                                  transfer.user.avatar ||
                                  "https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
                                }
                                avatar
                                className="user-avatar-small"
                              />
                              <Header.Content>
                                {transfer.user.phone}
                              </Header.Content>
                            </Header>
                          </Table.Cell>
                          <Table.Cell singleLine textAlign="center">
                            {transfer.user.fullName}
                          </Table.Cell>
                          <Table.Cell singleLine textAlign="center">
                            {transfer.bankName}
                          </Table.Cell>
                          <Table.Cell singleLine textAlign="center">
                            {transfer.accountNumber}
                          </Table.Cell>
                          <Table.Cell singleLine textAlign="center">
                            {transfer.accountName}
                          </Table.Cell>
                          <Table.Cell singleLine textAlign="center">
                            {convertToCurrency(transfer.money)} VNĐ
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {transfer.content}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {transfer.startDate}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {transfer.status === 1 ? (
                              <Label circular color="red">
                                CHƯA XỬ LÝ
                              </Label>
                            ) : (
                              <Label circular color="green">
                                ĐÃ XỬ LÝ
                              </Label>
                            )}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {transfer.status === 1 ? (
                              <div className="ui two buttons">
                                <Button
                                  basic
                                  color="green"
                                  onClick={() => {
                                    setDetail(transfer);
                                    setOpenAccepted(true);
                                  }}
                                >
                                  Chấp nhận
                                </Button>
                                <Button
                                  basic
                                  color="red"
                                  onClick={() => {
                                    setDetail(transfer);
                                    setOpenDenied(true);
                                  }}
                                >
                                  Huỷ bỏ
                                </Button>
                              </div>
                            ) : transfer.status === 2 ? (
                              <Label circular color="green">
                                ĐÃ XỬ LÝ
                              </Label>
                            ) : (
                              <Label circular color="red">
                                HUỶ BỎ
                              </Label>
                            )}
                          </Table.Cell>
                          <Table.Cell singleLine textAlign="center">
                            {transfer.comment}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                </Table.Body>
                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan="12">
                      <Pagination
                        activePage={transferWithdrawData.pageNo}
                        boundaryRange={1}
                        siblingRange={1}
                        ellipsisItem={{
                          content: <Icon name="ellipsis horizontal" />,
                          icon: true,
                        }}
                        totalPages={transferWithdrawData.totalPages}
                        onPageChange={handlePaginationChange}
                      />
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            ) : (
              <Header as="h4">Không có yêu cầu nào</Header>
            )}
            <Dimmer active={loading} inverted>
              <Loader>Đang tải dữ liệu</Loader>
            </Dimmer>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Confirm
        open={openAccepted}
        onCancel={() => {
          setOpenAccepted(false);
        }}
        onConfirm={() => {
          handleAccepted();
        }}
      />
      <ModalItem
        header="Xác nhận huỷ bỏ thanh toán"
        onOpen={openDenied}
        onClose={() => {
          setOpenDenied(false);
        }}
      >
        <DeniedForm
          toast={toast}
          setOpenDenied={setOpenDenied}
          detail={detail}
          data={data}
          setData={setData}
        />
      </ModalItem>
    </>
  );
};

export default CashoutManagementPage;
