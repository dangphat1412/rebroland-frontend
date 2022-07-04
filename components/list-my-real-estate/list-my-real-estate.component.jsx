import Link from "next/link";
import React, { useState } from "react";
import { Confirm, Icon, Item, List, Popup, Table } from "semantic-ui-react";
import { getPostsByUser } from "../../actions/post";
import PaginationItem from "../pagination-item/pagination-item.component";
import { PaginationContainer } from "./list-my-real-estate.styles";

const ListMyRealEstate = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(data.pageNo);

  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

  const handlePaginationChange = (e, { activePage }) =>
    setCurrentPage(activePage);

  const handleConfirm = () => {
    setOpenDeleteConfirm(false);
  };
  const handleCancel = () => {
    setOpenDeleteConfirm(false);
  };

  console.log("data: ", data);

  return (
    <>
      <Table padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine textAlign="center">
              Bài đăng
            </Table.HeaderCell>
            <Table.HeaderCell singleLine textAlign="center">
              Ngày đăng
            </Table.HeaderCell>
            <Table.HeaderCell singleLine textAlign="center">
              Hành động
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.posts &&
            data.posts.map((post, index) => (
              <Table.Row key={index}>
                <Table.Cell width={11}>
                  <Item.Group>
                    <Item>
                      <Item.Image
                        size="medium"
                        src={
                          (post.images && post.images[0]) ||
                          "https://thodiahanoi.com/wp-content/uploads/2021/01/ban-nha-tho-cu-nha-mat-dat-ha-noi-52.jpg"
                        }
                      />
                      <Item.Content className="item-content">
                        <Item.Header>{post.title}</Item.Header>
                        <Item.Description>
                          {post.description}
                          <List
                            horizontal
                            size="large"
                            style={{ marginTop: "0px" }}
                          >
                            <List.Item>
                              <List.Content>
                                <List.Header>11 tỷ</List.Header>
                              </List.Content>
                            </List.Item>
                            <List.Item>
                              <List.Content>
                                <List.Header>260 triệu/m²</List.Header>
                              </List.Content>
                            </List.Item>
                            <List.Item>
                              <List.Content>
                                <List.Header>70m²</List.Header>
                              </List.Content>
                            </List.Item>
                            <List.Item>
                              <List.Content>Thanh Xuân, Hà Nội</List.Content>
                            </List.Item>
                          </List>
                        </Item.Description>
                        <Item.Extra>
                          <span>3 ngày trước</span>
                        </Item.Extra>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Table.Cell>
                <Table.Cell singleLine textAlign="center">
                  Ngày 31 tháng 12 năm 2021
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <Link
                    href={`/trang-ca-nhan/bat-dong-san-cua-toi/${post.postId}`}
                  >
                    <Icon
                      circular
                      inverted
                      color="teal"
                      name="eye"
                      style={{ cursor: "pointer" }}
                    />
                  </Link>

                  <Link href="/">
                    <Popup
                      content="Chỉnh sửa bài viết"
                      trigger={
                        <Icon
                          circular
                          inverted
                          color="green"
                          name="edit outline"
                          style={{ cursor: "pointer" }}
                        />
                      }
                    />
                  </Link>
                  <Link href="/">
                    <Popup
                      content="Xoá bài viết"
                      trigger={
                        <Icon
                          style={{ cursor: "pointer" }}
                          circular
                          inverted
                          color="red"
                          name="trash alternate"
                          onClick={() => {
                            setOpenDeleteConfirm(true);
                          }}
                        />
                      }
                    />
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
        <Confirm
          open={openDeleteConfirm}
          content="Xác nhận xoá bài viết"
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      </Table>

      <PaginationContainer>
        <PaginationItem
          defaultActivePage={currentPage}
          ellipsisItem={{
            content: <Icon name="ellipsis horizontal" />,
            icon: true,
          }}
          totalPages={data.totalPages}
          onPageChange={handlePaginationChange}
        />
      </PaginationContainer>
    </>
  );
};

export default ListMyRealEstate;
