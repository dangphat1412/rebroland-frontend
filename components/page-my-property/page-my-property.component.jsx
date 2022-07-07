import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Confirm,
  Grid,
  Icon,
  Item,
  List,
  Popup,
  Table,
} from "semantic-ui-react";
import { getPostsByUser } from "../../actions/post";
import convertToSlug from "../../utils/convertToSlug";
import PaginationItem from "../pagination-item/pagination-item.component";
import UserPanel from "../user-panel/user-panel.component";
import {
  MyPropertiesPageContainer,
  PaginationContainer,
} from "./page-my-property.styles";

const MyPropertyPage = ({ postsData }) => {
  const [data, setData] = useState(postsData || {});
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

  const handlePaginationChange = (e, { activePage }) => fetchAPI(activePage);

  const fetchAPI = async (page) => {
    const postData = await getPostsByUser(page);
    setData(postData);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleConfirm = () => {
    setOpenDeleteConfirm(false);
  };
  const handleCancel = () => {
    setOpenDeleteConfirm(false);
  };
  return (
    <MyPropertiesPageContainer>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <UserPanel />
          </Grid.Column>
          <Grid.Column width={13}>
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
                                (post.images && post.images[0].image) ||
                                "https://thodiahanoi.com/wp-content/uploads/2021/01/ban-nha-tho-cu-nha-mat-dat-ha-noi-52.jpg"
                              }
                            />
                            <Item.Content className="item-content">
                              <Item.Header>{post.title}</Item.Header>
                              <Item.Description>
                                {post.description}
                              </Item.Description>
                              <List horizontal size="large">
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
                              </List>
                              <Item.Description>
                                {post.ward}, {post.district}, {post.province}
                              </Item.Description>
                            </Item.Content>
                          </Item>
                        </Item.Group>
                      </Table.Cell>
                      <Table.Cell singleLine textAlign="center">
                        {post.startDate}
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Link
                          href={`/trang-ca-nhan/bat-dong-san-cua-toi/${convertToSlug(
                            post.title
                          )}-${post.postId}`}
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
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </MyPropertiesPageContainer>
  );
};

export default MyPropertyPage;
