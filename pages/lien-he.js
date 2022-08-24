import React from "react";
import ContactPage from "../components/page-contact/page-contact.component";
import SubHeader from "../components/sub-header/sub-header.component";

const Contact = ({ user }) => {
  return (
    <div>
      <SubHeader
        title="Liên hệ với chúng tôi"
        background={
          user && user.currentRole === 3
            ? "/broker-background.jpg"
            : "/zyro-image.png"
        }
      />
      <ContactPage />
    </div>
  );
};

export default Contact;
