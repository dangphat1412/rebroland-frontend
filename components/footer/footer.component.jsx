import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  Grid,
  Header,
  Icon,
  Image,
  Item,
  List,
  Segment,
} from "semantic-ui-react";
import { FooterContainer } from "./footer.styles";

const Footer = ({ user }) => {
  console.log(user);
  const router = useRouter();
  return (
    <FooterContainer>
      <Grid columns="equal" divided inverted padded>
        <Grid.Row color="black" style={{ paddingLeft: "95px" }}>
          <Grid.Column>
            <Segment color="black" inverted>
              <Link href="/" passHref>
                <a>
                  <Image src="/logo-slogan.png" alt="ReBroLand" size="medium" />
                </a>
              </Link>
              <Header as="h3">
                <span>REBROLAND</span> - lựa chọn chung cho mái ấm gia đình
              </Header>
              <PropertyItem
                iconClass="kikor kiko-marker-map"
                title="Đại học FPT, Km29 Đại lộ Thăng Long, Thạch Thất, Hà Nội"
              />
              <PropertyItem
                iconClass="kikor kiko-email"
                title="rebroland@gmail.com"
              />
              <PropertyItem iconClass="kikor kiko-phone" title="0869009629" />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment color="black" inverted>
              <Header as="h2">Truy cập nhanh</Header>
              <span className="divider-left"></span>
              <List animated verticalAlign="middle">
                <List.Item>
                  <List.Content>
                    <Header
                      as="h4"
                      style={{ color: "#fff", cursor: "pointer" }}
                      onClick={() => {
                        router.push(
                          user && user.currentRole === 3
                            ? "/nha-moi-gioi/bat-dong-san"
                            : "/bat-dong-san"
                        );
                      }}
                    >
                      Bất động sản
                    </Header>
                  </List.Content>
                </List.Item>
                {(!user || (user && user.currentRole === 2)) && (
                  <List.Item>
                    <List.Content>
                      <Header
                        as="h4"
                        style={{ color: "#fff", cursor: "pointer" }}
                        onClick={() => {
                          router.push("/danh-sach-nha-moi-gioi");
                        }}
                      >
                        Nhà môi giới
                      </Header>
                    </List.Content>
                  </List.Item>
                )}
                {user && user.currentRole === 3 && (
                  <List.Item>
                    <List.Content>
                      <Header
                        as="h4"
                        style={{ color: "#fff", cursor: "pointer" }}
                        onClick={() => {
                          router.push(
                            "/nha-moi-gioi/xu-ly-yeu-cau-lien-he-lai"
                          );
                        }}
                      >
                        Yêu cầu liên hệ lại
                      </Header>
                    </List.Content>
                  </List.Item>
                )}
                {user && user.currentRole === 3 && (
                  <List.Item>
                    <List.Content>
                      <Header
                        as="h4"
                        style={{ color: "#fff", cursor: "pointer" }}
                        onClick={() => {
                          router.push("/nha-moi-gioi/cham-soc-khach-hang");
                        }}
                      >
                        Chăm sóc khách hàng
                      </Header>
                    </List.Content>
                  </List.Item>
                )}
                <List.Item>
                  <List.Content>
                    <Header
                      as="h4"
                      style={{ color: "#fff", cursor: "pointer" }}
                      onClick={() => {
                        router.push("/lien-he");
                      }}
                    >
                      Liên hệ
                    </Header>
                  </List.Content>
                </List.Item>
              </List>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment color="black" inverted>
              <Header as="h2">Liên lạc với RebroLand</Header>
              <span className="divider-left"></span>

              <a
                href="https://www.facebook.com/ngdangphat"
                target="_blank"
                rel="noreferrer"
              >
                <Icon
                  circular
                  inverted
                  color="blue"
                  name="facebook f"
                  size="large"
                />
              </a>
              <a href="mailto://rebroland@gmail.com">
                <Icon circular inverted color="red" name="mail" size="large" />
              </a>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </FooterContainer>
  );
};

const PropertyItem = ({ iconClass, title }) => {
  return (
    <Grid.Column>
      <Item>
        <Item.Content verticalAlign="middle" className="property-content">
          <Item.Header className="property-header">
            <span className={iconClass}></span>
            {title}
          </Item.Header>
        </Item.Content>
      </Item>
    </Grid.Column>
  );
};

export default Footer;
