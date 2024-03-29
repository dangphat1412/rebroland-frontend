import React, { useRef, useState } from "react";
import { Button, Confirm, Form, Image, Message } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { reportUser } from "../../actions/report";
import {
  FormReportContainer,
  ImageContainer,
  PreviewContainer,
  RemoveIcon,
} from "./form-report-user.styles";
import { uploadMultipleMedia } from "../../utils/uploadToCloudinary";

const ReportUserForm = ({
  toast,
  setReportOpen,
  userId,
  user,
  setLoginOpen,
  setRegisterOpen,
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm();

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

  const mediaRef = useRef(null);

  const [errorMessage, setErrorMessage] = useState({});

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const removeImage = (pictureIndex) => {
    setImagesPreview(
      imagesPreview.filter((image, index) => pictureIndex !== index)
    );
    setImages(images.filter((image, index) => pictureIndex !== index));
  };

  const handleMediaChange = (e) => {
    const { files } = e.target;
    let isImage = true;
    Object.values(files).forEach((file) => {
      if (!imageFileExtensions.includes(file.type)) {
        isImage = false;
      }
    });
    if (isImage === false) {
      setPictureError(true);
      return;
    }
    setImages([...images, ...files]);
    setImagesPreview([
      ...imagesPreview,
      ...Object.values(files).map((f) => URL.createObjectURL(f)),
    ]);
  };

  const onSubmit = async (data, e) => {
    if (!getValues("content") && !getValues("otherContent")) {
      setError("content", {
        type: "not null",
        message: "Chọn nội dung báo cáo",
      });
    } else {
      let mediaUrl;
      if (images.length !== 0) {
        mediaUrl = await uploadMultipleMedia(images);
        if (!mediaUrl) {
          console.log("ERROR UPLOAD");
          return;
        }
      }
      const status = await reportUser(data, mediaUrl, userId, setErrorMessage);
      if (status === 201) {
        setTimeout(() => {
          toast({
            type: "success",
            title: "Báo cáo người dùng",
            description: <p>Báo cáo người dùng thành công</p>,
          });
        }, 100);
        setReportOpen(false);
      } else {
        setTimeout(() => {
          toast({
            type: "error",
            title: "Lỗi",
            description: <p>Có lỗi xảy ra, hãy thử lại sau</p>,
          });
        }, 100);
      }
    }
  };

  return (
    <FormReportContainer>
      <Form size="large" onSubmit={handleSubmit(onSubmit)}>
        {reportContent.map((content, index) => {
          return (
            <div key={index}>
              <input
                type="checkbox"
                id={`content${index}`}
                name="content"
                value={content}
                {...register("content")}
                disabled={user ? false : true}
              />
              <label htmlFor={`content${index}`}>{content}</label>
              <br></br>
            </div>
          );
        })}
        <br></br>
        <label htmlFor="otherContent">Phản hồi khác</label>
        <textarea
          id="otherContent"
          name="otherContent"
          rows="3"
          maxLength={100}
          {...register("otherContent")}
          disabled={user ? false : true}
        ></textarea>
        <label htmlFor="sublabel-otherContent">Không vượt quá 100 ký tự</label>

        <label htmlFor="media">Hình ảnh bằng chứng</label>
        <input
          ref={mediaRef}
          onChange={handleMediaChange}
          name="media"
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          multiple
        />
        <div>
          <Button
            type="button"
            onClick={() => {
              mediaRef.current.click();
            }}
            disabled={user ? false : true}
          >
            Chọn ảnh
          </Button>
          {imagesPreview.length > 0 && (
            <PreviewContainer>
              {imagesPreview.map((image, index) => (
                <ImageContainer key={index}>
                  <Image src={image} alt="image" size="medium" />
                  <RemoveIcon
                    name="times circle"
                    size="large"
                    color="grey"
                    onClick={() => {
                      removeImage(index);
                    }}
                    inverted
                  />
                </ImageContainer>
              ))}
            </PreviewContainer>
          )}
        </div>

        <label className="error-field">
          {errors.content && errors.content.message}
        </label>

        <br></br>
        <Button fluid color="red" disabled={user ? false : true}>
          Gửi báo cáo
        </Button>
      </Form>
      {!user && (
        <div className="alert-login-require">
          <div>Yêu cầu đăng nhập để liên lạc</div>
          <div>
            <span
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => {
                setLoginOpen(true);
              }}
            >
              Đăng nhập
            </span>{" "}
            hoặc{" "}
            <span
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => {
                setRegisterOpen(true);
              }}
            >
              Đăng ký
            </span>
          </div>
        </div>
      )}
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
    </FormReportContainer>
  );
};

const reportContent = [
  "Không liên lạc được",
  "Không tuân thủ lịch hẹn",
  "Có thái độ không tốt",
];

export default ReportUserForm;
