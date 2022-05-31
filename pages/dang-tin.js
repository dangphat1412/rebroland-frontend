import { Container, Form } from "semantic-ui-react";
import FormPostProperty from "../components/form-post-property/form-post-property.component";
import Navigation from "../components/navigation/navigation.component";
import SubHeader from "../components/sub-header/sub-header.component";

export default function AddProperty() {
  return (
    <div>
      <Navigation />
      <SubHeader title="Đăng tin rao bán đất" />
      <FormPostProperty />
    </div>
  );
}
