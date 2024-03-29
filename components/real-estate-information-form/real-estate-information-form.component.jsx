import React, { useEffect, useState } from "react";
import { Divider, Form, Header, Label, Select, Tab } from "semantic-ui-react";
import {
  getDirections,
  getLongevity,
  getPropertyTypes,
  getUnitPrices,
} from "../../actions/post";
import InputField from "../input-field/input-field.component";
import { RealEstateInfoContainer } from "./real-estate-information.styles";

const RealEstateInformationForm = ({
  register,
  errors,
  watch,
  setValue,
  getValues,
  post,
  clearErrors,
}) => {
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [unitPrices, setUnitPrices] = useState([]);
  const [longevity, setLongevity] = useState([]);
  const [directions, setDirections] = useState([]);

  const handleChange = (e, { name, value }) => {
    if (name === "propertyTypeId") {
      resetCertification();
    }
    setValue(name, value);
    console.log(value);
    console.log(name);
  };

  const handleOnTabChange = (e, { activeIndex }) => {
    setValue("certification", activeIndex === 0 ? true : false);
    resetCertification();
    console.log(getValues("barcode"));
    console.log(getValues("plotNumber"));
    console.log(getValues("buildingName"));
    console.log(getValues("roomNumber"));
    console.log(getValues("owner"));
    console.log(getValues("ownerPhone"));
  };

  const resetCertification = () => {
    setValue("barcode", undefined);
    setValue("plotNumber", undefined);
    setValue("buildingName", undefined);
    setValue("roomNumber", undefined);
    setValue("owner", undefined);
    setValue("ownerPhone", undefined);
    clearErrors([
      "barcode",
      "plotNumber",
      "buildingName",
      "roomNumber",
      "owner",
      "ownerPhone",
    ]);
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
    <RealEstateInfoContainer size="large">
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
          onFocus={(e) => {
            setValue("propertyTypeId", e.target.value);
          }}
          error={errors.propertyTypeId}
          requiredField
        />
      ) : (
        <InputField
          label="Loại bất động sản"
          value={post.propertyType.name}
          onFocus={(e) => {
            setValue("propertyTypeId", getValues("propertyTypeId"));
          }}
          disabled
          requiredField
        />
      )}

      <Form.Group widths={2}>
        <InputField
          {...register("area", {
            required: "Diện tích không được để trống",
            min: {
              value: 1,
              message: "Diện tích tối thiểu 1m²",
            },
            max: {
              value: 10000,
              message: "Diện tích tối đa 10000m²",
            },
            validate: (value) =>
              /^[0-9]*(\.[0-9]{0,2})?$/.test(value) ||
              "Nhập diện tích hợp lệ với tối đa 2 chữ số sau phần thập phân",
          })}
          fluid
          label="Diện tích"
          name="area"
          placeholder="Nhập diện tích"
          maxLength={7}
          onChange={(e, { name, value }) => {
            setValue(name, value.replace(/[^0-9.]/g, ""));
          }}
          onFocus={(e) => {
            setValue("area", e.target.value);
          }}
          value={watch("area")}
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
          {...register("price", {
            required:
              watch("unitPriceId") === 3
                ? false
                : "Mức giá không được để trống",
            min: {
              value: 1000,
              message: "Mức giá tối thiểu 1,000 VNĐ",
            },
            max: {
              value: 100000000000,
              message: "Mức giá tối đa 100 tỷ",
            },
          })}
          label="Mức giá"
          name="price"
          placeholder="Nhập mức giá"
          defaultValue={""}
          onChange={(e, { name, value }) => {
            setValue(name, value.replace(/[^0-9]/g, ""));
          }}
          onFocus={(e) => {
            setValue("price", getValues("price"));
          }}
          value={
            watch("price") && new Intl.NumberFormat().format(watch("price"))
          }
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
              {...register("numberOfBedroom", {
                min: {
                  value: 0,
                  message: "Phòng ngủ tối thiểu 0 phòng",
                },
                max: {
                  value: 100,
                  message: "Phòng ngủ tối đa 100 phòng",
                },
              })}
              label="Số phòng ngủ"
              name="numberOfBedroom"
              placeholder="Nhập số phòng ngủ"
              error={errors.numberOfBedroom}
              onChange={(e, { name, value }) => {
                setValue(name, value.replace(/[^0-9]/g, ""));
              }}
              onBlur={(e) => {
                !e.target.value && setValue(e.target.name, 0);
              }}
              onFocus={(e) => {
                setValue("numberOfBedroom", getValues("numberOfBedroom"));
              }}
              value={watch("numberOfBedroom")}
              defaultValue={getValues("numberOfBedroom") || 0}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <InputField
              {...register("numberOfBathroom", {
                min: {
                  value: 0,
                  message: "Phòng tắm tối thiểu 0 phòng",
                },
                max: {
                  value: 100,
                  message: "Phòng tắm tối đa 100 phòng",
                },
              })}
              label="Số phòng tắm, vệ sinh"
              name="numberOfBathroom"
              placeholder="Nhập số phòng tắm, vệ sinh"
              onChange={(e, { name, value }) => {
                setValue(name, value.replace(/[^0-9]/g, ""));
              }}
              onFocus={(e) => {
                setValue("numberOfBathroom", getValues("numberOfBathroom"));
              }}
              onBlur={(e) => {
                !e.target.value && setValue(e.target.name, 0);
              }}
              value={watch("numberOfBathroom")}
              error={errors.numberOfBathroom}
              defaultValue={getValues("numberOfBathroom") || 0}
            />
            {watch("propertyTypeId") === 1 ? (
              <InputField
                {...register("numberOfFloor", {
                  min: {
                    value: 0,
                    message: "Nhập số tầng hợp lệ",
                  },
                  max: {
                    value: 100,
                    message: "Số tầng tối đa 100 tầng",
                  },
                })}
                label="Số tầng"
                name="numberOfFloor"
                placeholder="Nhập tầng"
                onChange={(e, { name, value }) => {
                  setValue(name, value.replace(/[^0-9]/g, ""));
                }}
                onFocus={(e) => {
                  setValue("numberOfFloor", getValues("numberOfFloor"));
                }}
                onBlur={(e) => {
                  !e.target.value && setValue(e.target.name, 0);
                }}
                value={watch("numberOfFloor")}
                error={errors.numberOfFloor}
                defaultValue={getValues("numberOfFloor") || 0}
              />
            ) : (
              <InputField
                {...register("floorNumber", {
                  min: {
                    value: 0,
                    message: "Nhập tầng số hợp lệ",
                  },
                  max: {
                    value: 100,
                    message: "Số tầng tối đa 100 tầng",
                  },
                })}
                label="Tầng số"
                name="floorNumber"
                placeholder="Nhập tầng"
                onChange={(e, { name, value }) => {
                  setValue(name, value.replace(/[^0-9]/g, ""));
                }}
                onFocus={(e) => {
                  setValue("floorNumber", getValues("floorNumber"));
                }}
                onBlur={(e) => {
                  !e.target.value && setValue(e.target.name, 0);
                }}
                value={watch("floorNumber")}
                error={errors.floorNumber}
                defaultValue={getValues("floorNumber") || 0}
              />
            )}
          </Form.Group>
        </>
      )}
      {watch("propertyTypeId") && (
        <Form.Field>
          <label>Giấy tờ pháp lý</label>
          <Tab
            onTabChange={handleOnTabChange}
            defaultActiveIndex={
              post ? (post.certification === true ? 0 : 1) : 1
            }
            menu={{ secondary: true }}
            panes={[
              {
                menuItem: "Sổ đỏ / Sổ hồng",
                render: () => (
                  <Tab.Pane attached={false} size="large">
                    <label
                      style={{
                        fontWeight: "bold",
                        fontSize: "13px",
                        display: "inline-block",
                        marginBottom: "5px",
                      }}
                    >
                      Yêu cầu điền mã vạch, số thửa
                      {watch("propertyTypeId") === 2 && (
                        <span>, tên toà nhà, tên phòng</span>
                      )}{" "}
                      (Nếu nhập)
                    </label>
                    <Form.Group widths="equal">
                      {(watch("propertyTypeId") === 1 ||
                        watch("propertyTypeId") === 3) && (
                        <>
                          <InputField
                            {...register("barcode", {
                              pattern: {
                                value: /^(^\d{13}$)|(^\d{15}$)$/,
                                message: "Nhập mã vạch hợp lệ",
                              },
                              validate: (value) =>
                                (!value &&
                                  (getValues("plotNumber") ||
                                    getValues("buildingName") ||
                                    getValues("roomNumber")) &&
                                  "Mã vạch không được để trống") ||
                                true,
                            })}
                            label="Mã vạch trên sổ đỏ"
                            name="barcode"
                            placeholder="Nhập mã vạch"
                            error={errors.barcode}
                            onChange={handleChange}
                            onFocus={(e) => {
                              setValue("barcode", getValues("barcode"));
                            }}
                            value={watch("barcode")}
                            defaultValue={getValues("barcode")}
                          />
                          <InputField
                            {...register("plotNumber", {
                              validate: {
                                checkNull: (value) =>
                                  (!value &&
                                    (getValues("barcode") ||
                                      getValues("buildingName") ||
                                      getValues("roomNumber")) &&
                                    "Số thửa không được để trống") ||
                                  true,
                                checkMin: (value) =>
                                  (value &&
                                    value < 1 &&
                                    "Số thửa tối thiểu là 1") ||
                                  true,
                                checkMax: (value) =>
                                  (value &&
                                    value > 99999 &&
                                    "Số thửa tối đa là 99999") ||
                                  true,
                              },
                            })}
                            label="Số thửa"
                            name="plotNumber"
                            error={errors.plotNumber}
                            placeholder="Nhập số thửa"
                            onChange={(e, { name, value }) =>
                              setValue(name, value.replace(/[^0-9]/g, ""))
                            }
                            onFocus={(e) => {
                              setValue("plotNumber", getValues("plotNumber"));
                            }}
                            value={watch("plotNumber")}
                            defaultValue={getValues("plotNumber")}
                          />
                        </>
                      )}
                      {watch("propertyTypeId") === 2 && (
                        <>
                          <InputField
                            label="Mã vạch trên sổ đỏ"
                            name="barcode"
                            {...register("barcode", {
                              pattern: {
                                value: /^(^\d{13}$)|(^\d{15}$)$/,
                                message: "Nhập mã vạch hợp lệ",
                              },
                              validate: (value) =>
                                (!value &&
                                  (getValues("plotNumber") ||
                                    getValues("buildingName") ||
                                    getValues("roomNumber")) &&
                                  "Mã vạch không được để trống") ||
                                true,
                            })}
                            placeholder="Nhập mã vạch"
                            error={errors.barcode}
                            onChange={handleChange}
                            onFocus={(e) => {
                              setValue("barcode", getValues("barcode"));
                            }}
                            value={watch("barcode")}
                            defaultValue={getValues("barcode")}
                          />
                          <InputField
                            {...register("plotNumber", {
                              validate: {
                                checkNull: (value) =>
                                  (!value &&
                                    (getValues("barcode") ||
                                      getValues("buildingName") ||
                                      getValues("roomNumber")) &&
                                    "Số thửa không được để trống") ||
                                  true,
                                checkMin: (value) =>
                                  (value &&
                                    value < 1 &&
                                    "Số thửa tối thiểu là 1") ||
                                  true,
                                checkMax: (value) =>
                                  (value &&
                                    value > 99999 &&
                                    "Số thửa tối đa là 99999") ||
                                  true,
                              },
                            })}
                            label="Số thửa"
                            name="plotNumber"
                            error={errors.plotNumber}
                            placeholder="Nhập số thửa"
                            onChange={(e, { name, value }) =>
                              setValue(name, value.replace(/[^0-9]/g, ""))
                            }
                            onFocus={(e) => {
                              setValue("plotNumber", getValues("plotNumber"));
                            }}
                            value={watch("plotNumber")}
                            defaultValue={getValues("plotNumber")}
                          />
                          <InputField
                            {...register("buildingName", {
                              validate: (value) =>
                                (!value &&
                                  (getValues("barcode") ||
                                    getValues("plotNumber") ||
                                    getValues("roomNumber")) &&
                                  "Tên toà nhà không được để trống") ||
                                true,
                            })}
                            label="Tên toà nhà"
                            name="buildingName"
                            placeholder="Nhập tên toà"
                            onChange={handleChange}
                            value={watch("buildingName")}
                            error={errors.buildingName}
                            onFocus={(e) => {
                              setValue(
                                "buildingName",
                                getValues("buildingName")
                              );
                            }}
                            defaultValue={getValues("buildingName")}
                            maxLength={50}
                          />

                          <InputField
                            {...register("roomNumber", {
                              validate: (value) =>
                                (!value &&
                                  (getValues("barcode") ||
                                    getValues("buildingName") ||
                                    getValues("plotNumber")) &&
                                  "Tên phòng không được để trống") ||
                                true,
                            })}
                            label="Tên phòng"
                            name="roomNumber"
                            placeholder="Nhập tên phòng"
                            onChange={handleChange}
                            onFocus={(e) => {
                              setValue("roomNumber", getValues("roomNumber"));
                            }}
                            value={watch("roomNumber")}
                            error={errors.roomNumber}
                            defaultValue={getValues("roomNumber")}
                            maxLength={10}
                          />
                        </>
                      )}
                    </Form.Group>
                    <Form.Group widths="equal">
                      <InputField
                        label="Tên chủ hộ"
                        name="owner"
                        {...register("owner", {
                          validate: {
                            checkValid: (value) =>
                              !/[$&+,:;=\\\\?@#|/'<>.^*()%!-1234567890]/.test(
                                value
                              ) || "Tên chủ hộ không hợp lệ",
                          },
                        })}
                        placeholder="Nhập tên chủ hộ"
                        onChange={handleChange}
                        onFocus={(e) => {
                          setValue("owner", getValues("owner"));
                        }}
                        value={watch("owner")}
                        error={errors.owner}
                        defaultValue={getValues("owner")}
                      />
                      <InputField
                        {...register("ownerPhone", {
                          pattern: {
                            value: /^(84|0[3|5|7|8|9])+([0-9]{8})$/,
                            message:
                              "Số điện thoại là số Việt Nam và có 10 chữ số",
                          },
                        })}
                        label="Số điện thoại chủ hộ"
                        name="ownerPhone"
                        placeholder="Nhập số điện thoại"
                        error={errors.ownerPhone}
                        onChange={(e, { name, value }) => {
                          setValue(name, value.replace(/[^0-9]/g, ""));
                        }}
                        onFocus={(e) => {
                          setValue("ownerPhone", getValues("ownerPhone"));
                        }}
                        value={watch("ownerPhone")}
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
        {watch("propertyTypeId") !== 2 && (
          <InputField
            {...register("frontispiece", {
              min: {
                value: 0,
                message: "Nhập mặt tiền hợp lệ",
              },
              max: {
                value: 100,
                message: "Mặt tiền tối đa 100m",
              },
            })}
            fluid
            label="Mặt tiền"
            name="frontispiece"
            placeholder="Nhập mặt tiền"
            onChange={(e, { name, value }) => {
              setValue(name, value.replace(/[^0-9.]/g, ""));
            }}
            onFocus={(e) => {
              setValue("frontispiece", getValues("frontispiece"));
            }}
            error={errors.frontispiece}
            value={watch("frontispiece")}
            defaultValue={getValues("frontispiece")}
          >
            <input />
            <Label basic size="big">
              m
            </Label>
          </InputField>
        )}
      </Form.Group>
      <InputField
        {...register("additionalDescription")}
        fluid
        label="Mô tả bổ sung"
        name="additionalDescription"
        placeholder="Nhập mô tả bổ sung"
        onChange={handleChange}
        onFocus={(e) => {
          setValue("additionalDescription", getValues("additionalDescription"));
        }}
        defaultValue={getValues("additionalDescription")}
        maxLength={200}
        sublabel="Tối đa 200 kí tự"
      />
    </RealEstateInfoContainer>
  );
};

export default RealEstateInformationForm;
