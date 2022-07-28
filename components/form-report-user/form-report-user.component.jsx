import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { reportUser } from "../../actions/report";

const ReportUserForm = ({ toast, setReportOpen, userId }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, e) => {
    const status = await reportUser(data, userId);
    if (status === 201) {
      setTimeout(() => {
        toast({
          type: "success",
          title: "Báo cáo người dùng",
          description: <p>Báo cáo người dùng thành công</p>,
        });
      }, 100);
    } else {
      setTimeout(() => {
        toast({
          type: "error",
          title: "Báo cáo người dùng",
          description: <p>Báo cáo người dùng thất bại</p>,
        });
      }, 100);
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
  "Không liên lạc được",
  "Không tuân thủ lịch hẹn",
  "Có thái độ không tốt",
];

export default ReportUserForm;
