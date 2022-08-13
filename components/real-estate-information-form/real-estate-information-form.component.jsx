import React, { useEffect, useState } from "react";
import {
  Divider,
  Form,
  Header,
  Label,
  Segment,
  Select,
  Tab,
} from "semantic-ui-react";
import {
  getDirections,
  getLongevity,
  getPropertyTypes,
  getUnitPrices,
} from "../../actions/post";
import InputField from "../input-field/input-field.component";

const RealEstateInformationForm = ({
  register,
  errors,
  watch,
  setValue,
  getValues,
  post,
  editedPost,
}) => {
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [unitPrices, setUnitPrices] = useState([]);
  const [longevity, setLongevity] = useState([]);
  const [directions, setDirections] = useState([]);

  const handleChange = (e, { name, value }) => {
    setValue(name, value);
  };

  useEffect(() => {
    (async () => {
      const data = await getPropertyTypes();
      setPropertyTypes(
        data.map((d, index) => {
          return { key: index, value: d.id, text: d.name };
        })
      );
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await getLongevity();
      setLongevity(
        data.map((d, index) => {
          return { key: index, value: d.id, text: d.name };
        })
      );
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await getUnitPrices();
      setUnitPrices(
        data.map((d, index) => {
          return { key: index, value: d.id, text: d.name };
        })
      );
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await getDirections();
      setDirections(
        data.map((d, index) => {
          return { key: index, value: d.id, text: d.name };
        })
      );
    })();
  }, []);
  return (
    <Segment size="large">
      <Header as="h1">Thông tin bất động sản</Header>
      {!post ? (
        <InputField
          {...register("propertyTypeId", {
            required: "Loại bất động sản không được để trống",
          })}
          fieldType="select"
          label="Loại bất động sản"
          name="propertyTypeId"
          placeholder="Chọn loại bất động sản"
          options={propertyTypes}
          onChange={handleChange}
          error={errors.propertyTypeId}
          requiredField
        />
      ) : (
        <InputField
          label="Loại bất động sản"
          value={post.propertyType.name}
          requiredField
        />
      )}

      <Form.Group widths={2}>
        <InputField
          {...register("area", { required: "Diện tích không được để trống" })}
          fluid
          label="Diện tích"
          name="area"
          placeholder="Nhập diện tích"
          onChange={handleChange}
          defaultValue={getValues("area")}
          error={errors.area}
          requiredField
        >
          <input />
          <Label basic size="big">
            m²
          </Label>
        </InputField>

        <InputField
          {...register("price", { required: "Mức giá không được để trống" })}
          label="Mức giá"
          name="price"
          placeholder="Nhập mức giá"
          defaultValue={getValues("price")}
          onChange={handleChange}
          error={errors.price}
          requiredField
        >
          <input disabled={watch("unitPriceId") !== 3 ? false : true} />
          <Select
            {...register("unitPriceId", { required: true })}
            name="unitPriceId"
            onChange={handleChange}
            options={unitPrices}
            defaultValue={getValues("unitPriceId")}
          />
        </InputField>
      </Form.Group>
      {(watch("propertyTypeId") === 1 || watch("propertyTypeId") === 2) && (
        <>
          <Form.Group widths="equal">
            <InputField
              {...register("longevityId")}
              fieldType="select"
              label="Tuổi nhà"
              name="longevityId"
              placeholder="Chọn tuổi nhà"
              options={longevity}
              onChange={handleChange}
              defaultValue={getValues("longevityId")}
            />
            <InputField
              {...register("numberOfBedroom")}
              type="number"
              label="Số phòng ngủ"
              name="numberOfBedroom"
              placeholder="Nhập số phòng ngủ"
              onChange={handleChange}
              defaultValue={getValues("numberOfBedroom")}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <InputField
              {...register("numberOfBathroom")}
              type="number"
              label="Số phòng tắm, vệ sinh"
              name="numberOfBathroom"
              placeholder="Nhập số phòng tắm, vệ sinh"
              onChange={handleChange}
              defaultValue={getValues("numberOfBathroom")}
            />
            {watch("propertyTypeId") === 1 ? (
              <InputField
                {...register("numberOfFloor")}
                type="number"
                label="Số tầng"
                name="numberOfFloor"
                placeholder="Nhập tầng"
                onChange={handleChange}
                defaultValue={getValues("numberOfFloor")}
              />
            ) : (
              <InputField
                {...register("floorNumber")}
                type="number"
                label="Tầng số"
                name="floorNumber"
                placeholder="Nhập tầng"
                onChange={handleChange}
                defaultValue={getValues("floorNumber")}
              />
            )}
          </Form.Group>
        </>
      )}
      {watch("propertyTypeId") && (
        <Form.Field>
          <label>Giấy tờ pháp lý</label>
          <Tab
            defaultActiveIndex={
              post ? (post.certification === true ? 0 : 1) : 1
            }
            menu={{ secondary: true }}
            panes={[
              {
                menuItem: "Sổ đỏ / Sổ hồng",
                render: () => (
                  <Tab.Pane attached={false} size="large">
                    <Form.Group widths="equal">
                      <InputField
                        {...register("barcode")}
                        label="Mã vạch trên sổ đỏ"
                        name="barcode"
                        placeholder="Nhập mã vạch"
                        onChange={handleChange}
                        defaultValue={getValues("barcode")}
                      />
                      {watch("propertyTypeId") !== 2 ? (
                        <InputField
                          {...register("plotNumber")}
                          label="Số thửa"
                          name="plotNumber"
                          placeholder="Nhập số thửa"
                          onChange={handleChange}
                          defaultValue={getValues("plotNumber")}
                        />
                      ) : (
                        <>
                          <InputField
                            {...register("buildingName")}
                            label="Toà nhà"
                            name="buildingName"
                            placeholder="Nhập tên toà"
                            onChange={handleChange}
                            defaultValue={getValues("buildingName")}
                          />
                          <InputField
                            {...register("floorNumber")}
                            label="Tầng số"
                            name="floorNumber"
                            placeholder="Nhập tầng"
                            onChange={handleChange}
                            defaultValue={getValues("floorNumber")}
                          />
                          <InputField
                            {...register("numberRoom")}
                            label="Phòng số"
                            name="numberRoom"
                            placeholder="Nhập phòng"
                            onChange={handleChange}
                            defaultValue={getValues("numberRoom")}
                          />
                        </>
                      )}
                    </Form.Group>
                    <Form.Group widths="equal">
                      <InputField
                        {...register("owner")}
                        label="Tên chủ hộ"
                        name="owner"
                        placeholder="Nhập tên chủ hộ"
                        onChange={handleChange}
                        defaultValue={getValues("owner")}
                      />
                      <InputField
                        {...register("ownerPhone")}
                        label="Số điện thoại chủ hộ"
                        name="ownerPhone"
                        placeholder="Nhập số điện thoại"
                        onChange={handleChange}
                        defaultValue={getValues("ownerPhone")}
                      />
                    </Form.Group>
                  </Tab.Pane>
                ),
              },
              {
                menuItem: "Đang chờ sổ",
                render: () => <></>,
              },
            ]}
            onTabChange={(e, { activeIndex }) => {
              setValue("certification", activeIndex === 0 ? true : false);
            }}
          />
        </Form.Field>
      )}
      <Divider horizontal>Mô tả bổ sung</Divider>

      <Form.Group widths={2}>
        <InputField
          {...register("directionId")}
          fieldType="select"
          label="Hướng nhà"
          name="directionId"
          placeholder="Chọn hướng nhà"
          options={directions}
          onChange={handleChange}
          defaultValue={getValues("directionId")}
        />
        <InputField
          {...register("frontispiece")}
          fluid
          label="Mặt tiền"
          name="frontispiece"
          placeholder="Nhập mặt tiền"
          onChange={handleChange}
          defaultValue={getValues("frontispiece")}
        >
          <input />
          <Label basic size="big">
            m
          </Label>
        </InputField>
      </Form.Group>
      <InputField
        {...register("additionalDescription")}
        fluid
        label="Mô tả bổ sung"
        name="additionalDescription"
        placeholder="Nhập mô tả bổ sung"
        onChange={handleChange}
        defaultValue={getValues("additionalDescription")}
      />
    </Segment>
  );
};

export default RealEstateInformationForm;
