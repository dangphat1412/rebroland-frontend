import React from "react";
import {
  Card,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Segment,
} from "semantic-ui-react";
import Link from "next/link";
import { UserPanelContainer } from "./user-panel.styles";
import { logoutUser } from "../../actions/auth";

const UserPanel = ({ user }) => {
  return (
    <UserPanelContainer>
      <Card fluid>
        <Card.Content textAlign="center" className="title-content">
          <Card.Header className="custom-header">Thông tin cá nhân</Card.Header>
        </Card.Content>
        <Card.Content textAlign="center">
          <Image
            src={
              user.avatar ||
              "https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
            }
            circular
            alt="avatar"
            verticalAlign="middle"
          />
          <Card.Header>{user.fullName}</Card.Header>
          <Card.Description textAlign="left">
            <Icon name="mobile alternate" />
            {user.phone}
          </Card.Description>
          <Card.Description textAlign="left">
            <Icon name="mail outline" />
            {user.email}
          </Card.Description>
          <Card.Description textAlign="left">
            <Icon name="map marker alternate" />
            Ngọc Nội, Trạm Lộ, Thuận Thành, Bắc Ninh
          </Card.Description>
        </Card.Content>
      </Card>

      <Segment>
        <List divided relaxed selection animated size="big">
          <Link href="/trang-ca-nhan/thong-tin-ca-nhan">
            <List.Item>
              <List.Content>
                <List.Header as="h4">
                  <span className="kikor kiko-user"></span> Thông tin cá nhân
                </List.Header>
              </List.Content>
            </List.Item>
          </Link>
          {user.currentRole === 2 ? (
            <Link href="/trang-ca-nhan/bat-dong-san-cua-toi">
              <List.Item>
                <List.Content>
                  <List.Header as="h4">
                    <span className="kikor kiko-home"></span> Bất động sản của
                    tôi
                  </List.Header>
                </List.Content>
              </List.Item>
            </Link>
          ) : (
            <Link href="/nha-moi-gioi/bat-dong-san-phai-sinh-cua-toi">
              <List.Item>
                <List.Content>
                  <List.Header as="h4">
                    <span className="kikor kiko-home"></span> Bất động sản phái
                    sinh của tôi
                  </List.Header>
                </List.Content>
              </List.Item>
            </Link>
          )}

          <Link href="/trang-ca-nhan/danh-sach-tin-da-luu">
            <List.Item>
              <List.Content>
                <List.Header as="h4">
                  <span className="kikor kiko-heart-symbol"></span> Bất động sản
                  đã lưu
                </List.Header>
              </List.Content>
            </List.Item>
          </Link>

          {/* {user.currentRole === 2 ? (
            <Link href="/trang-ca-nhan/danh-sach-tin-da-luu">
              <List.Item>
                <List.Content>
                  <List.Header as="h4">
                    <span class="kikor kiko-heart-symbol"></span> Bất động sản
                    đã lưu
                  </List.Header>
                </List.Content>
              </List.Item>
            </Link>
          ) : (
            <Link href="/nha-moi-gioi/danh-sach-bat-dong-san-da-luu">
              <List.Item>
                <List.Content>
                  <List.Header as="h4">
                    <span class="kikor kiko-heart-symbol"></span> Bất động sản
                    phái sinh đã lưu
                  </List.Header>
                </List.Content>
              </List.Item>
            </Link>
          )} */}

          {user.currentRole === 3 && (
            <Link href="/nha-moi-gioi/xu-ly-yeu-cau-lien-he-lai">
              <List.Item>
                <List.Content>
                  <List.Header as="h4">
                    <span className="kikor kiko-address-book"></span> Xử lý yêu
                    cầu liên hệ lại
                  </List.Header>
                </List.Content>
              </List.Item>
            </Link>
          )}

          {user.currentRole === 3 && (
            <Link href="/nha-moi-gioi/cham-soc-khach-hang">
              <List.Item>
                <List.Content>
                  <List.Header as="h4">
                    <span className="kikor kiko-handed"></span> Chăm sóc khách
                    hàng
                  </List.Header>
                </List.Content>
              </List.Item>
            </Link>
          )}

          <Link href="/trang-ca-nhan/thay-doi-mat-khau">
            <List.Item>
              <List.Content>
                <List.Header as="h4">
                  <span className="kikor kiko-fingerprint"></span> Đổi mật khẩu
                </List.Header>
              </List.Content>
            </List.Item>
          </Link>

          <List.Item>
            <List.Content>
              <List.Header as="h4">
                <span className="kikor kiko-pencil-write"></span> Đăng tin
              </List.Header>
            </List.Content>
          </List.Item>
          <List.Item onClick={logoutUser}>
            <List.Content>
              <List.Header as="h4">
                <span className="kikor kiko-arrow-right-circle"></span> Đăng
                xuất
              </List.Header>
            </List.Content>
          </List.Item>
        </List>
      </Segment>
    </UserPanelContainer>
  );
};

export default UserPanel;
