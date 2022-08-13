import React, { useEffect } from "react";
import {
  Card,
  Divider,
  Form,
  Grid,
  Header,
  Image,
  List,
  Segment,
} from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { FormCreateDerivativePostContainer } from "./form-create-derivative-post.styles";
import PostInformationForm from "../post-information-form/post-information-form.component";
import ImageInformationForm from "../image-information-form/image-information-form.component";
import CustomButton from "../custom-button/custom-button.component";

const FormCreateDerivativePost = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      images: [],
    },
  });

  useEffect(() => {
    register("title", { required: "Tiêu đề không được để trống" });
    register("description", { required: "Mô tả không được để trống" });
    register("images");
  }, [register]);

  const onSubmit = (data, e) => {
    alert(JSON.stringify(data));
  };

  const handleChange = (e, { name, value }) => {
    setValue(name, value);
  };

  return (
    <FormCreateDerivativePostContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card fluid href="/thong-tin-chi-tiet" style={{ color: "black" }}>
          <Segment size="large" basic>
            <h1>Bài viết gốc</h1>
            <Grid>
              <Grid.Column width={4}>
                <Image src="https://thodiahanoi.com/wp-content/uploads/2021/01/ban-nha-tho-cu-nha-mat-dat-ha-noi-52.jpg" />
              </Grid.Column>
              <Grid.Column width={12}>
                <Header>
                  Biệt thự đường Ngô Thời Nhiệm Q3, DT: 20x25m, T 1L ST, giá 105
                  tr/th
                </Header>
                <div>Thanh Xuân, Hà Nội</div>
                <List horizontal size="large">
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
                </List>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Aliquid fugiat, quis ad dolores natus veritatis voluptatibus
                  fugit. Expedita incidunt optio modi ipsum eos, tempore dolorum
                  dolores ab doloremque iste laudantium!
                </div>
                <Divider />
                <Card.Content>
                  Được đăng bởi{" "}
                  <span style={{ fontWeight: "bold" }}>Nguyễn Văn A</span>
                </Card.Content>
              </Grid.Column>
            </Grid>
          </Segment>
        </Card>

        <PostInformationForm errors={errors} handleChange={handleChange} />
        <ImageInformationForm
          getValues={getValues}
          setValue={setValue}
          handleChange={handleChange}
        />
        <CustomButton fluid>Tạo bài phái sinh</CustomButton>
      </Form>
    </FormCreateDerivativePostContainer>
  );
};

export default FormCreateDerivativePost;
