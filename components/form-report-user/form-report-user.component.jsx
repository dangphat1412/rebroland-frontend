import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { reportUser } from "../../actions/report";
import { FormReportContainer } from "./form-report-user.styles";

const ReportUserForm = ({ toast, setReportOpen, userId }) => {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, e) => {
    if (!getValues("content") && !getValues("otherContent")) {
      setError("content", {
        type: "not null",
        message: "Chọn nội dung báo cáo",
      });
    } else {
      const status = await reportUser(data, userId);
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
          {...register("otherContent")}
        ></textarea>

        <label className="error-field">
          {errors.content && errors.content.message}
        </label>

        <br></br>
        <Button fluid color="red">
          Gửi báo cáo
        </Button>
      </Form>
    </FormReportContainer>
  );
};

const reportContent = [
  "Không liên lạc được",
  "Không tuân thủ lịch hẹn",
  "Có thái độ không tốt",
];

export default ReportUserForm;
