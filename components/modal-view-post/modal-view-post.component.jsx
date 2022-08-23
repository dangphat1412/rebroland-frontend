import React, { useEffect, useState } from "react";
import ReactImageGallery from "react-image-gallery";
import {
  Breadcrumb,
  Dimmer,
  Divider,
  Grid,
  Header,
  Item,
  Label,
  Loader,
  Modal,
  Statistic,
} from "semantic-ui-react";
import calculatePrice from "../../utils/calculatePrice";
import Map from "../map/map.component";
import { ModalViewPostContainer } from "./modal-view-post.styles";

const ViewPostModal = ({ openViewPost, setOpenViewPost, post, loading }) => {
  return (
    <Modal
      size="large"
      open={openViewPost}
      onClose={() => {
        setOpenViewPost(false);
      }}
    >
      {post ? (
        <>
          <Modal.Header style={{ fontFamily: "Tahoma" }}>
            Chi tiết bài đăng
          </Modal.Header>
          <Modal.Content>
            <DetailPost post={post} />
          </Modal.Content>
        </>
      ) : (
        <Dimmer active={loading} inverted>
          <Loader>Đang tải dữ liệu</Loader>
        </Dimmer>
      )}
    </Modal>
  );
};

const DetailPost = ({ post }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(
      post.images.map((item) => {
        return {
          original: item.image,
          thumbnail: item.image,
        };
      })
    );
  }, [post.images]);

  return (
    <ModalViewPostContainer>
      <Header as="h3">
        {post.title}{" "}
        {post.originalPost && (
          <Label as="a" color="red" tag>
            BÀI PHÁI SINH
          </Label>
        )}
      </Header>
      <Breadcrumb>
        <Breadcrumb.Section content="province">
          {post.province}
        </Breadcrumb.Section>
        <Breadcrumb.Divider icon="right angle" />
        <Breadcrumb.Section content="district">
          {post.district}
        </Breadcrumb.Section>
        <Breadcrumb.Divider icon="right angle" />
        <Breadcrumb.Section content="ward">{post.ward}</Breadcrumb.Section>
        {post.address && (
          <>
            <Breadcrumb.Divider icon="right angle" />
            <Breadcrumb.Section active>{post.address}</Breadcrumb.Section>
          </>
        )}
      </Breadcrumb>
      <Divider />
      <Grid>
        <Grid.Row>
          <Grid.Column verticalAlign="middle">
            <Statistic.Group floated="left">
              <Statistic>
                <Statistic.Label>Loại bất động sản</Statistic.Label>
                <Statistic.Value text>{post.propertyType.name}</Statistic.Value>
              </Statistic>
              <Statistic>
                <Statistic.Label>Mức giá</Statistic.Label>
                <Statistic.Value text>
                  {post.unitPrice.id === 3
                    ? "Thoả thuận"
                    : calculatePrice(post).price}
                </Statistic.Value>
              </Statistic>
              <Statistic>
                <Statistic.Label>Diện tích</Statistic.Label>
                <Statistic.Value text>{post.area} m²</Statistic.Value>
              </Statistic>
            </Statistic.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {post.images && post.images.length > 0 && (
        <>
          <Header as="h2">Hình ảnh</Header>
          <ReactImageGallery
            items={items}
            showIndex={true}
            disableKeyDown={false}
            originalHeight={200}
            originalWidth={200}
          />
        </>
      )}
      <Header as="h2">Thông tin mô tả</Header>
      <div>
        <pre>{post.description}</pre>
      </div>
      <Header as="h2">Đặc điểm bất động sản</Header>
      <Grid columns={3} className="property" divided="vertically">
        <Grid.Row>
          <PropertyItem
            iconClass="kikor kiko-square-footage"
            title="Diện tích"
            description={`${post.area} m²`}
          />
          <Grid.Column>
            <Item>
              <Item.Content verticalAlign="middle" className="property-content">
                <Item.Header className="property-header">
                  <span className="kikor kiko-price-real-estate"></span>
                  Mức giá
                </Item.Header>
                <Item.Description className="property-description">
                  {post.unitPrice.id === 1 &&
                    (post.price >= 1000000000
                      ? post.price / 1000000000 + " tỷ"
                      : post.price / 1000000 + " triệu")}
                  {post.unitPrice.id === 2 &&
                    (post.price * post.area >= 1000000000
                      ? (post.price * post.area) / 1000000000 + " tỷ"
                      : (post.price * post.area) / 1000000 + " triệu")}
                  {post.unitPrice.id === 3 && "Thoả thuận"}
                </Item.Description>
              </Item.Content>
            </Item>
          </Grid.Column>
          {post.direction && (
            <PropertyItem
              iconClass="kikor kiko-resale-property"
              title="Hướng nhà"
              description={post.direction.name}
            />
          )}
          {post.numberOfBedroom > 0 && (
            <PropertyItem
              iconClass="kikor kiko-bedroom"
              title="Phòng ngủ"
              description={post.numberOfBedroom}
            />
          )}
          {post.numberOfBathroom > 0 && (
            <PropertyItem
              iconClass="kikor kiko-bathroom"
              title="Phòng tắm"
              description={post.numberOfBathroom}
            />
          )}
          {post.numberOfFloor > 0 && (
            <PropertyItem
              iconClass="kikor kiko-stairs"
              title="Số tầng"
              description={post.numberOfFloor}
            />
          )}
          {post.frontispiece > 0 && (
            <PropertyItem
              iconClass="kikor kiko-real-estate-auction"
              title="Mặt tiền"
              description={`${post.frontispiece} m²`}
            />
          )}
        </Grid.Row>
      </Grid>
      {post.additionalDescription && (
        <Grid.Row>
          <div style={{ fontSize: "16px" }}>
            <b>Mô tả bổ sung: </b> {post.additionalDescription}
          </div>
        </Grid.Row>
      )}

      <Header as="h2">Xem trên bản đồ</Header>
      {post.coordinates && (
        <Map
          position={post.coordinates
            .sort(function (a, b) {
              return a.id - b.id;
            })
            .map((coordinate) => {
              return {
                lat: coordinate.latitude,
                lng: coordinate.longitude,
              };
            })}
        />
      )}
    </ModalViewPostContainer>
  );
};

const PropertyItem = ({ iconClass, title, description }) => {
  return (
    <Grid.Column>
      <Item>
        <Item.Content verticalAlign="middle" className="property-content">
          <Item.Header className="property-header">
            <span className={iconClass}></span>
            {title}
          </Item.Header>
          <Item.Description className="property-description">
            {description}
          </Item.Description>
        </Item.Content>
      </Item>
    </Grid.Column>
  );
};

export default ViewPostModal;
