import React from "react";
import { useForm } from "react-hook-form";
import { Button, Form } from "semantic-ui-react";
import { reportPost } from "../../actions/report";

const FormReport = ({ toast, setReportOpen, postId }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, e) => {
    const status = await reportPost(data, postId);
    if (status === 201) {
      setTimeout(() => {
        toast({
          type: "success",
          title: "Báo cáo bài viết",
          description: <p>Báo cáo bài viết thành công</p>,
        });
      }, 1000);
    } else {
      setTimeout(() => {
        toast({
          type: "error",
          title: "Lỗi",
          description: <p>Có lỗi xảy ra, hãy thử lại sau</p>,
        });
      }, 1000);
    }
    setReportOpen(false);
  };

  return (
    <div>
      <Form size="large" onSubmit={handleSubmit(onSubmit)}>
        {reportContent.map((content, index) => {
          return (
            <div key={index}>
              <input
                type="checkbox"
                id={`content${index}`}
                name="content"
                value={content}
                {...register("content", {
                  required: {
                    value: true,
                    message: "content is required",
                  },
                })}
              />
              <label htmlFor={`content${index}`}>{content}</label>
              <br></br>
            </div>
          );
        })}
        <label htmlFor="otherContent">Phản hồi khác</label>
        <textarea
          id="otherContent"
          name="otherContent"
          rows="3"
          {...register("otherContent", {
            required: {
              value: true,
              message: "other-content is required",
            },
          })}
        ></textarea>

        <br></br>
        <Button fluid color="red">
          Gửi báo cáo
        </Button>
      </Form>
    </div>
  );
};

const reportContent = [
  "Địa chỉ của bất động sản",
  "Các thông tin về: giá, diện tích, mô tả ....",
  "Ảnh",
  "Trùng với tin rao khác",
  "Không liên lạc được",
  "Tin không có thật",
  "Vị trí bản đồ không chính xác",
  "Bất động sản đã bán",
];

export default FormReport;
