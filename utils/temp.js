// register
// const [dataProvinces, setDataProvinces] = useState({
//   provinces: [],
//   districts: [],
//   wards: [],
// });

// const [dob, setDob] = useState(new Date());
// const minDate = new Date(1900, 1, 1);
// const maxDate = new Date();
// maxDate.setFullYear(maxDate.getFullYear() - 18);
// const onDateChange = (date) => {
//   setUser((prev) => ({ ...prev, dob: date }));
//   setDob(date);
// };

// const handleSelectProvince = (e, { value }) => {
//   setUser((prev) => ({
//     ...prev,
//     province: e.target.innerText,
//     district: "",
//     ward: "",
//   }));
//   fetchDistrictsAPI(value);
// };

// const handleSelectDistrict = (e, { value }) => {
//   setUser((prev) => ({ ...prev, district: e.target.innerText, ward: "" }));
//   fetchWardsAPI(value);
// };

// const handleSelectWard = (e) => {
//   setUser((prev) => ({ ...prev, ward: e.target.innerText }));
// };

// useEffect(() => {
//   fetchProvincesAPI();
// }, []);

// const fetchProvincesAPI = async () => {
//   const provincesData = await getProvinces();

//   setDataProvinces((prev) => ({
//     ...prev,
//     provinces: provincesData.map((p) => {
//       return { key: p.code, text: p.name, value: p.code };
//     }),
//   }));
// };

// const fetchDistrictsAPI = async (provinceCode) => {
//   const districtsData = await getDistricts(provinceCode);

//   setDataProvinces((prev) => ({
//     ...prev,
//     districts: districtsData.districts.map((d) => {
//       return { key: d.code, text: d.name, value: d.code };
//     }),
//   }));
// };

// const fetchWardsAPI = async (districtCode) => {
//   const wardsData = await getWards(districtCode);

//   setDataProvinces((prev) => ({
//     ...prev,
//     wards: wardsData.wards.map((w) => {
//       return { key: w.code, text: w.name, value: w.code };
//     }),
//   }));
// };
{
  /* <InputField
          label="Email"
          name="email"
          value={user.email}
          errorMsg="Email không đúng định dạng"
          regex="^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$"
          handleChange={handleChange} /> */
}
{
  /* <DatePickerField
          label="Ngày tháng năm sinh"
          onDateChange={onDateChange}
          name="dob"
          date={user.dob || new Date()}
          minDate={minDate}
          maxDate={maxDate}
          errorMsg="It looks like you've entered the wrong date of birth."
        /> */
}
{
  /* <Form.Select
          fluid
          label="Tỉnh/Thành"
          options={dataProvinces.provinces}
          placeholder="Tỉnh/Thành"
          onChange={handleSelectProvince}
        />
        <Form.Select
          fluid
          label="Quận/Huyện"
          options={dataProvinces.districts}
          placeholder="Quận/Huyện"
          onChange={handleSelectDistrict}
        />
        <Form.Select
          fluid
          label="Phường/Xã"
          options={dataProvinces.wards}
          placeholder="Phường/Xã"
          onChange={handleSelectWard}
        /> */
}

// <Form.Group inline>
// <label>Giới tính</label>
// <Form.Radio
//   label="Nam"
//   name="gender"
//   value={true}
//   checked={user.gender === true}
//   onChange={handleChangeGender}
// />
// <Form.Radio
//   label="Nữ"
//   value={false}
//   name="gender"
//   checked={user.gender === false}
//   onChange={handleChangeGender}
// />
// </Form.Group>
