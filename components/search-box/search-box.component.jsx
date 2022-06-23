import React, { useEffect } from "react";
import {
  Button,
  Dropdown,
  Form,
  Grid,
  Icon,
  Input,
  Popup,
  Select,
  Tab,
} from "semantic-ui-react";
import CustomButton from "../custom-button/custom-button.component";
import { SearchContainer } from "./search-box.styles";
import { useForm } from "react-hook-form";
import InputField from "../input-field/input-field.component";

const options = [
  { key: "all", text: "Loại bất động sản", value: "all" },
  { key: "articles", text: "Articles", value: "articles" },
  { key: "products", text: "Products", value: "products" },
];

const SearchBox = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    register("search");
    register("propertyType");
    register("province");
  }, []);

  const onSubmit = (data, e) => {
    console.log("DATA: ", data);
    alert(JSON.stringify(data));
  };

  const handleChange = (e, { name, value }) => {
    setValue(name, value);
  };

  return (
    <>
      <SearchContainer>
        <Form size="large" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="options">
            <InputField
              width={4}
              fieldType="select"
              name="propertType"
              placeholder="Loại bất động sản"
              options={options}
              onChange={handleChange}
            />
            <InputField
              width={4}
              fieldType="select"
              name="propertType"
              placeholder="Loại bất động sản"
              options={options}
              onChange={handleChange}
            />
            <InputField
              width={8}
              name="search"
              placeholder="Tìm kiếm"
              onChange={handleChange}
            >
              <input />
              <CustomButton>Tìm kiếm</CustomButton>
            </InputField>
          </Form.Group>
          <Form.Group widths="equal" className="options">
            <InputField
              fieldType="select"
              name="province"
              placeholder="Chọn Tỉnh/Thành phố"
              options={options}
              onChange={handleChange}
            />
            <InputField
              fieldType="select"
              name="district"
              placeholder="Chọn Quận/Huyện"
              options={options}
              onChange={handleChange}
            />
            <InputField
              fieldType="select"
              name="ward"
              placeholder="Chọn Phường/Xã"
              options={options}
              onChange={handleChange}
            />
            <InputField
              fieldType="select"
              name="ward"
              placeholder="Mức giá"
              options={options}
              onChange={handleChange}
            />
            <InputField
              fieldType="select"
              name="ward"
              placeholder="Mức giá"
              options={options}
              onChange={handleChange}
            />
            <Form.Field>
              {/* <Popup
                wide="very"
                flowing
                position="bottom right"
                content={
                  <div style={{ width: "1622px" }}>
                    <Grid>
                      <Grid.Row columns="equal">
                        <Grid.Column>
                          <InputField
                            fluid
                            fieldType="select"
                            name="ward"
                            placeholder="Mức giá"
                            options={options}
                            onChange={handleChange}
                          />
                        </Grid.Column>
                        <Grid.Column>
                          <InputField
                            fluid
                            fieldType="select"
                            name="ward"
                            placeholder="Mức giá"
                            options={options}
                            onChange={handleChange}
                          />
                        </Grid.Column>
                        <Grid.Column>
                          <InputField
                            fluid
                            fieldType="select"
                            name="ward"
                            placeholder="Mức giá"
                            options={options}
                            onChange={handleChange}
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row columns="equal">
                        <Grid.Column>
                          <InputField
                            fluid
                            fieldType="select"
                            name="ward"
                            placeholder="Mức giá"
                            options={options}
                            onChange={handleChange}
                          />
                        </Grid.Column>
                        <Grid.Column>
                          <InputField
                            fluid
                            fieldType="select"
                            name="ward"
                            placeholder="Mức giá"
                            options={options}
                            onChange={handleChange}
                          />
                        </Grid.Column>
                        <Grid.Column>
                          <InputField
                            fluid
                            fieldType="select"
                            name="ward"
                            placeholder="Mức giá"
                            options={options}
                            onChange={handleChange}
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </div>
                }
                on="click"
                popper={{ style: { zIndex: 1 } }}
                trigger={<Select placeholder="Xem thêm" />}
              /> */}
            </Form.Field>
          </Form.Group>
        </Form>
      </SearchContainer>
    </>
  );
};

export default SearchBox;
