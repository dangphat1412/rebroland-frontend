import React, { useEffect, useState } from "react";
import {
  Grid,
  Icon,
  Image,
  Item,
  List,
  Pagination,
  Segment,
  Table,
} from "semantic-ui-react";
import Link from "next/link";
import { getPostsByUser } from "../../actions/post";
import { UserPanelContainer } from "./user-panel.styles";

const UserPanel = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await getPostsByUser();
      console.log(data);
      setPosts(data);
    })();
  }, []);
  return (
    <UserPanelContainer>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Segment textAlign="center">
              <Image
                src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
                size="small"
                circular
                alt="avatar"
                verticalAlign="middle"
              />
              <br />
              <h3>Nguyễn Đăng Phát</h3>
              <h3>Số điện thoại liên hệ: 0869009629</h3>
            </Segment>
            <Segment>
              <List divided relaxed selection size="big">
                <Link href="/trang-ca-nhan/thong-tin-ca-nhan">
                  <List.Item>
                    <List.Icon name="user outline" />
                    <List.Content>
                      <List.Header>Thông tin cá nhân</List.Header>
                    </List.Content>
                  </List.Item>
                </Link>
                <Link href="/trang-ca-nhan/bat-dong-san-cua-toi">
                  <List.Item>
                    <List.Icon name="file outline" />
                    <List.Content>
                      <List.Header>Bất động sản của tôi</List.Header>
                    </List.Content>
                  </List.Item>
                </Link>
                <List.Item>
                  <List.Icon name="heart outline" />
                  <List.Content>
                    <List.Header>Bất động sản đã thích</List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="edit outline" />
                  <List.Content>
                    <List.Header>Đăng tin</List.Header>
                  </List.Content>
                </List.Item>
              </List>
            </Segment>
          </Grid.Column>
          <Grid.Column width={12}>
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
                <Table.Row>
                  <ItemTable />
                </Table.Row>
                <Table.Row>
                  <ItemTable />
                </Table.Row>
                <Table.Row>
                  <ItemTable />
                </Table.Row>
                <Table.Row>
                  <ItemTable />
                </Table.Row>
                <Table.Row>
                  <ItemTable />
                </Table.Row>
              </Table.Body>
            </Table>
            <Pagination
              defaultActivePage={5}
              ellipsisItem={{
                content: <Icon name="ellipsis horizontal" />,
                icon: true,
              }}
              firstItem={{
                content: <Icon name="angle double left" />,
                icon: true,
              }}
              lastItem={{
                content: <Icon name="angle double right" />,
                icon: true,
              }}
              prevItem={{ content: <Icon name="angle left" />, icon: true }}
              nextItem={{ content: <Icon name="angle right" />, icon: true }}
              totalPages={10}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </UserPanelContainer>
  );
};

const ItemTable = () => {
  return (
    <>
      <Table.Cell width={11}>
        <Item.Group>
          <Item style={{ padding: "0px !important" }}>
            <Item.Image
              size="medium"
              src="https://thodiahanoi.com/wp-content/uploads/2021/01/ban-nha-tho-cu-nha-mat-dat-ha-noi-52.jpg"
            />
            <Item.Content className="item-content">
              <Item.Header>
                Biệt thự đường Ngô Thời Nhiệm Q3, DT: 20x25m, T 1L ST, giá
                105tr/th
              </Item.Header>
              <Item.Description>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Aliquid fugiat, quis ad dolores natus veritatis voluptatibus
                  fugit. Expedita
                </div>
                <List horizontal size="large" style={{ marginTop: "0px" }}>
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
        <Icon circular inverted color="teal" name="eye" />
        <Icon circular inverted color="green" name="edit outline" />
        <Icon circular inverted color="red" name="trash alternate" />
      </Table.Cell>
    </>
  );
};

export default UserPanel;
