import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  Header,
  Icon,
  Image,
  List,
  Segment,
} from "semantic-ui-react";
import Link from "next/link";
import { UserPanelContainer } from "./user-panel.styles";
import { logoutUser, updateUser } from "../../actions/auth";
import { uploadMedia } from "../../utils/uploadToCloudinary";
import { useRouter } from "next/router";
import convertToCurrency from "../../utils/convertToCurrency";

const UserPanel = ({ user }) => {
  console.log("USER: ", user);
  const router = useRouter();
  const mediaRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [imagePreview, setImagePreview] = useState(user.avatar);

  const handleMediaChange = async (e) => {
    const { name, value, files } = e.target;
    const mediaUrl = await uploadMedia(files[0]);
    if (!mediaUrl) {
      console.log("ERROR UPLOAD");
      return;
    }
    setImagePreview(mediaUrl);
    await updateUser({ ...user, avatar: mediaUrl }, setErrorMessage);
  };

  return (
    <UserPanelContainer>
      <Card fluid>
        <Card.Content textAlign="center" className="title-content">
          <Card.Header className="custom-header">Thông tin cá nhân</Card.Header>
        </Card.Content>
        <Card.Content textAlign="center">
          <div
            className="profilepic"
            onClick={() => {
              mediaRef.current.click();
            }}
          >
            <Image
              src={
                imagePreview ||
                "https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
              }
              circular
              alt="avatar"
              verticalAlign="middle"
              className="profilepic__image"
            />
            <div className="profilepic__content">
              <div className="profilepic__icon">
                <Icon name="camera" size="large" />
              </div>
              <b className="profilepic__text">Thay đổi ảnh đại diện</b>
            </div>
          </div>
          <Card.Header>{user.fullName}</Card.Header>
          <Card.Description textAlign="left">
            <Icon name="mobile alternate" />
            {user.phone}
          </Card.Description>
          <Card.Description textAlign="left">
            <Icon name="mail outline" />
            {user.email ? user.email : "Đang cập nhật"}
          </Card.Description>
          <Card.Description textAlign="left">
            <Icon name="map marker alternate" />
            {user.province && user.district && user.ward
              ? user.ward + ", " + user.district + ", " + user.province
              : "Đang cập nhật"}
          </Card.Description>
        </Card.Content>
      </Card>

      <input
        ref={mediaRef}
        onChange={handleMediaChange}
        name="media"
        style={{ display: "none" }}
        type="file"
        accept="image/*"
      />

      <Segment>
        <Header as="h3">Số dư tài khoản</Header>
        <Header as="h1">{convertToCurrency(user.accountBalance)} VNĐ</Header>
        <Button
          fluid
          onClick={() => {
            router.push("/trang-ca-nhan/nap-tien");
          }}
        >
          <Icon name="credit card outline" />
          Nạp tiền vào ví
        </Button>
      </Segment>

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
          {user.currentRole === 2 && (
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
          )}
          {user.currentRole === 3 && (
            <Link href="/trang-ca-nhan/bat-dong-san-phai-sinh-cua-toi">
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

          <Link href="/trang-ca-nhan/chuyen-khoan">
            <List.Item>
              <List.Content>
                <List.Header as="h4">
                  <span className="kikor kiko-credit-card"></span> Chuyển khoản
                </List.Header>
              </List.Content>
            </List.Item>
          </Link>

          <Link href="/trang-ca-nhan/thay-doi-so-dien-thoai">
            <List.Item>
              <List.Content>
                <List.Header as="h4">
                  <span className="kikor kiko-phone"></span> Đổi số điện thoại
                </List.Header>
              </List.Content>
            </List.Item>
          </Link>

          <Link href="/trang-ca-nhan/thay-doi-mat-khau">
            <List.Item>
              <List.Content>
                <List.Header as="h4">
                  <span className="kikor kiko-fingerprint"></span> Đổi mật khẩu
                </List.Header>
              </List.Content>
            </List.Item>
          </Link>

          {user && user.currentRole === 2 && (
            <Link href="/dang-tin">
              <List.Item>
                <List.Content>
                  <List.Header as="h4">
                    <span className="kikor kiko-pencil-write"></span> Đăng tin
                  </List.Header>
                </List.Content>
              </List.Item>
            </Link>
          )}

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
