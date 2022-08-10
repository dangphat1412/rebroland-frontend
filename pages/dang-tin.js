import FormPostProperty from "../components/form-post-property/form-post-property.component";
import SubHeader from "../components/sub-header/sub-header.component";
import API_URL from "../utils/apiUrl";
import { parseCookies } from "nookies";
import axios from "axios";

export default function AddProperty({ user, priceData }) {
  return (
    <div>
      <SubHeader title="Đăng tin rao bán đất" background="/zyro-image.png" />
      <FormPostProperty user={user} priceData={priceData} />
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const { token } = parseCookies(context);

    const res = await axios.get(`${API_URL}/api/posts/price-per-day`, {
      headers: { Authorization: token },
    });

    return { props: { priceData: res.data } };
  } catch (error) {
    // return { props: { posts: [1, 2, 3] } };
  }
}
