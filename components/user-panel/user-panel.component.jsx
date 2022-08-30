import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  Confirm,
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
  const router = useRouter();
  const mediaRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [imagePreview, setImagePreview] = useState(user.avatar);

  const [pictureError, setPictureError] = useState(false);

  const imageFileExtensions = [
    "image/tif",
    "image/pjp",
    "image/xbm",
    "image/jxl",
    "image/svgz",
    "image/jpg",
    "image/jpeg",
    "image/ico",
    "image/tiff",
    "image/gif",
    "image/svg",
    "image/jfif",
    "image/webp",
    "image/png",
    "image/bmp",
    "image/pjpeg",
    "image/avif",
  ];

  const handleMediaChange = async (e) => {
    const { name, value, files } = e.target;
    let isImage = true;
    if (!imageFileExtensions.includes(files[0].type)) {
      isImage = false;
    }
    if (isImage === false) {
      setPictureError(true);
      return;
    }
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
              src={imagePreview || "/default-avatar.png"}
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
                  <span className="kikor kiko-credit-card"></span> Chuyển tiền
                </List.Header>
              </List.Content>
            </List.Item>
          </Link>

          <Link href="/trang-ca-nhan/rut-tien">
            <List.Item>
              <List.Content>
                <List.Header as="h4">
                  <span className="kikor kiko-credit-card"></span> Rút tiền
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
            <Link href="/trang-ca-nhan/yeu-cau-lien-he-lai">
              <List.Item>
                <List.Content>
                  <List.Header as="h4">
                    <span className="kikor kiko-address-book"></span> Yêu cầu
                    liên hệ lại
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
      <Confirm
        open={pictureError}
        header="Không thể đọc file"
        content="Định dạng ảnh không đúng"
        cancelButton={null}
        confirmButton="Đóng"
        onCancel={() => {
          setPictureError(false);
        }}
        onConfirm={() => {
          setPictureError(false);
        }}
      />
    </UserPanelContainer>
  );
};

export default UserPanel;
