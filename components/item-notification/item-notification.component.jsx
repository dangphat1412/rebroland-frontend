import { useRouter } from "next/router";
import React from "react";
import { Item, Label } from "semantic-ui-react";
import { switchRole } from "../../actions/auth";
import { readNotifications } from "../../actions/notifications";
import { NotificationItemContainer } from "./item-notification.styles";

const NotificationItem = ({
  user,
  notification,
  notifications,
  setNotifications,
  setOpenNotification,
  setLoading,
}) => {
  const router = useRouter();
  return (
    <NotificationItemContainer
      onClick={async () => {
        const data = await readNotifications(notification.id);
        if (data) {
          console.log("NOTIFICATION: ", data);
          console.log(notifications);
          const list = notifications;
          const index = list.findIndex((n) => n.id === notification.id);
          list[index].unRead = false;
          setNotifications(list);
          setOpenNotification && setOpenNotification(false);
          if (data.type === "ContactBroker") {
            if (user.currentRole === 2) {
              await switchRole(setLoading);
            }
            router.push("/nha-moi-gioi/xu-ly-yeu-cau-lien-he-lai");
          }
          if (data.type === "ContactCustomer") {
            if (user.currentRole === 3) {
              await switchRole(setLoading);
            }
            router.push("/trang-ca-nhan/yeu-cau-lien-he-lai");
          }
          if (data.type === "OpenOriginalPostStatus") {
            if (user.currentRole === 3) {
              await switchRole(setLoading);
            }
            router.push(`/trang-ca-nhan/bat-dong-san-cua-toi/${data.postId}`);
          }
          if (data.type === "DropOriginalPostStatus") {
            if (user.currentRole === 3) {
              await switchRole(setLoading);
            }
            router.push(`/trang-ca-nhan/bat-dong-san-cua-toi/${data.postId}`);
          }
          if (data.type === "OpenDerivativePostStatus") {
            if (user.currentRole === 2) {
              await switchRole(setLoading);
            }
            router.push(
              `/trang-ca-nhan/bat-dong-san-phai-sinh-cua-toi/${data.postId}`
            );
          }
          if (data.type === "DropDerivativePostStatus") {
            if (user.currentRole === 2) {
              await switchRole(setLoading);
            }
            router.push(
              `/trang-ca-nhan/bat-dong-san-phai-sinh-cua-toi/${data.postId}`
            );
          }
          if (data.type === "Refund") {
            if (user.currentRole === 3) {
              await switchRole(setLoading);
            }
            router.push(`/trang-ca-nhan/bat-dong-san-cua-toi/${data.postId}`);
          }
          if (
            data.type === "ReceiveMoney" ||
            data.type === "SendMoney" ||
            data.type === "Payment" ||
            data.type === "Withdraw"
          ) {
            router.push(`/trang-ca-nhan/thong-tin-ca-nhan`);
          }
          if (data.type === "FinishTakeCare") {
            if (user.currentRole === 3) {
              await switchRole(setLoading);
            }
            router.push(
              {
                pathname: `/danh-sach-nha-moi-gioi/${data.sender}`,
                query: { allowRate: data.unread },
              },
              `/danh-sach-nha-moi-gioi/${data.sender}`
            );
          }
          if (data.type === "FinishTransaction") {
            // if (user.currentRole === 2) {
            //   await switchRole(setLoading);
            // }
            // router.push(
            //   {
            //     pathname: `/chi-tiet-nguoi-dung/${data.sender}`,
            //     query: { allowRate: data.unread },
            //   },
            //   `/chi-tiet-nguoi-dung/${data.sender}`
            // );
          }
        }
      }}
    >
      {notification.type === "Contact" && (
        <Item.Image src="/phone-call-icon.png" size="tiny" />
      )}
      {notification.type === "DropOriginalPostStatus" && (
        <Item.Image src="/report-post-status.png" size="tiny" />
      )}
      {notification.type === "OpenOriginalPostStatus" && (
        <Item.Image src="/open-post-status.png" size="tiny" />
      )}
      {notification.type === "OpenDerivativePostStatus" && (
        <Item.Image src="/open-post-status.png" size="tiny" />
      )}
      {notification.type === "DropDerivativePostStatus" && (
        <Item.Image src="/report-post-status.png" size="tiny" />
      )}
      {(notification.type === "ReceiveMoney" ||
        notification.type === "SendMoney" ||
        notification.type === "Payment" ||
        notification.type === "Withdraw" ||
        notification.type === "Refund") && (
        <Item.Image src="/money-icon.jpg" size="tiny" />
      )}
      {(notification.type === "FinishTakeCare" ||
        notification.type === "FinishTransaction") && (
        <Item.Image src="/finish-transaction.png" size="tiny" />
      )}

      <Item.Content>
        {notification.type === "Contact" && (
          <>
            <Item.Description>
              Số điện thoại <b>{notification.phone}</b> muốn liên lạc với bạn
            </Item.Description>
            <Item.Description>
              <b>Nội dung: </b>
              {notification.content}
            </Item.Description>
          </>
        )}
        {notification.type === "DropOriginalPostStatus" && (
          <>
            <Item.Description>
              <b>Ẩn bài viết</b>
            </Item.Description>
            <Item.Description>
              <b>Nội dung: </b> <span>{notification.content}</span>
            </Item.Description>
          </>
        )}
        {notification.type === "OpenOriginalPostStatus" && (
          <>
            <Item.Description>
              <b>Hiển thị bài viết</b>
            </Item.Description>
            <Item.Description>
              <b>Nội dung: </b> <span>{notification.content}</span>
            </Item.Description>
          </>
        )}
        {notification.type === "OpenDerivativePostStatus" && (
          <>
            <Item.Description>
              <b>Hiển thị bài phái sinh</b>
            </Item.Description>
            <Item.Description>
              <b>Nội dung: </b> <span>{notification.content}</span>
            </Item.Description>
          </>
        )}
        {notification.type === "DropDerivativePostStatus" && (
          <>
            <Item.Description>
              <b>Ẩn bài phái sinh</b>
            </Item.Description>
            <Item.Description>
              <b>Nội dung: </b> <span>{notification.content}</span>
            </Item.Description>
          </>
        )}
        {notification.type === "ReceiveMoney" && (
          <>
            <Item.Description>
              <b>Nhận tiền</b>
            </Item.Description>
            <Item.Description>
              <b>Nội dung: </b> <span>{notification.content}</span>
            </Item.Description>
          </>
        )}
        {notification.type === "SendMoney" && (
          <>
            <Item.Description>
              <b>Chuyển tiền</b>
            </Item.Description>
            <Item.Description>
              <b>Nội dung: </b> <span>{notification.content}</span>
            </Item.Description>
          </>
        )}
        {notification.type === "Payment" && (
          <>
            <Item.Description>
              <b>Nạp tiền vào ví</b>
            </Item.Description>
            <Item.Description>
              <b>Nội dung: </b> <span>{notification.content}</span>
            </Item.Description>
          </>
        )}
        {notification.type === "Withdraw" && (
          <>
            <Item.Description>
              <b>Rút tiền</b>
            </Item.Description>
            <Item.Description>
              <b>Nội dung: </b> <span>{notification.content}</span>
            </Item.Description>
          </>
        )}
        {notification.type === "Refund" && (
          <>
            <Item.Description>
              <b>Hoàn tiền xác nhận Bất động sản đã bán</b>
            </Item.Description>
            <Item.Description>
              <b>Nội dung: </b> <span>{notification.content}</span>
            </Item.Description>
          </>
        )}
        {notification.type === "FinishTakeCare" && (
          <>
            <Item.Description>
              <b>Hoàn thành quá trình chăm sóc</b>
            </Item.Description>
            <Item.Description>
              <b>Nội dung: </b> <span>{notification.content}</span>
            </Item.Description>
          </>
        )}
        {notification.type === "FinishTransaction" && (
          <>
            <Item.Description>
              <b>Kết thúc giao dịch</b>
            </Item.Description>
            <Item.Description>
              <b>Nội dung: </b> <span>{notification.content}</span>
            </Item.Description>
          </>
        )}
        <Item.Extra>{notification.date} </Item.Extra>
      </Item.Content>
      {notification.unRead === true && (
        <Item.Content style={{ position: "relative" }}>
          <Label
            style={{ position: "absolute", right: "0px" }}
            circular
            color="blue"
            empty
          />
        </Item.Content>
      )}
    </NotificationItemContainer>
  );
};

export default NotificationItem;
