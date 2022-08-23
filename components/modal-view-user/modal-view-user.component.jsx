import React from "react";
import { Dimmer, Grid, Image, Loader, Segment } from "semantic-ui-react";

const ViewUserModal = ({ loading, user }) => {
  console.log(user);
  return (
    <div>
      <Segment>
        <Dimmer active={loading} inverted>
          <Loader>Đang tải dữ liệu</Loader>
        </Dimmer>
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <Image
                src={user.avatar || "/edfault-avatar.png"}
                size="medium"
                circular
                className="user-avatar-big"
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <div className="user-information">
                <label>Họ và tên:</label>
                <span>{user.fullName}</span>
              </div>
              <div className="user-information">
                <label>Số điện thoại:</label>
                <span>{user.phone}</span>
              </div>
              <div className="user-information">
                <label>Email:</label>
                <span>{user.email ? user.email : "Đang cập nhật"}</span>
              </div>
              <div className="user-information">
                <label>Giới tính:</label>
                <span>{user.gender ? "Nam" : "Nữ"}</span>
              </div>
              <div className="user-information">
                <label>Ngày sinh:</label>
                <span>{user.dob ? user.dob : "Đang cập nhật"}</span>
              </div>
            </Grid.Column>
            <Grid.Column width={5}>
              <div className="user-information">
                <label>Tỉnh/Thành phố:</label>
                <span>{user.province ? user.province : "Đang cập nhật"}</span>
              </div>
              <div className="user-information">
                <label>Quận/Huyện:</label>
                <span>{user.district ? user.district : "Đang cập nhật"}</span>
              </div>
              <div className="user-information">
                <label>Thị/Xã:</label>
                <span>{user.ward ? user.ward : "Đang cập nhật"}</span>
              </div>
              <div className="user-information">
                <label>Địa chỉ:</label>
                <span>{user.address ? user.address : "Đang cập nhật"}</span>
              </div>
              <div className="user-information">
                <label>Facebook:</label>
                <span>
                  {user.facebookLink ? user.facebookLink : "Đang cập nhật"}
                </span>
              </div>
              <div className="user-information">
                <label>Zalo:</label>
                <span>{user.zaloLink ? user.zaloLink : "Đang cập nhật"}</span>
              </div>
            </Grid.Column>
            <Grid.Column width={4}>
              <div className="user-information">
                <label>Mô tả:</label>
                <span>
                  {user.description ? user.description : "Đang cập nhật"}
                </span>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};

export default ViewUserModal;
