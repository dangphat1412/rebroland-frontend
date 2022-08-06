import React, { useEffect, useState } from "react";
import ReactImageGallery from "react-image-gallery";
import {
  Breadcrumb,
  Dimmer,
  Divider,
  Grid,
  Header,
  Item,
  Loader,
  Modal,
  Statistic,
} from "semantic-ui-react";
import calculatePrice from "../../utils/calculatePrice";
import Map from "../map/map.component";

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
          <Modal.Header>Chi tiết bài đăng</Modal.Header>
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
    <>
      <Header as="h3">{post.title}</Header>
      <Breadcrumb
        icon="right angle"
        sections={[
          {
            key: "province",
            content: `${post.province}`,
            link: true,
          },
          {
            key: "district",
            content: `${post.district}`,
            link: true,
          },
          { key: "ward", content: `${post.ward}`, link: true },
          {
            key: "address",
            content: `${post.address}`,
            active: true,
          },
        ]}
      />
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
      <Header as="h2">Hình ảnh</Header>
      {post.images && (
        <ReactImageGallery
          items={items}
          showIndex={true}
          disableKeyDown={false}
          originalHeight={200}
          thumbnailPosition="left"
        />
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
          {post.numberOfBedroom && (
            <PropertyItem
              iconClass="kikor kiko-bedroom"
              title="Phòng ngủ"
              description={post.numberOfBedroom}
            />
          )}
          {post.numberOfBathroom && (
            <PropertyItem
              iconClass="kikor kiko-bathroom"
              title="Phòng tắm"
              description={post.numberOfBathroom}
            />
          )}
          {post.numberOfFloor && (
            <PropertyItem
              iconClass="kikor kiko-stairs"
              title="Số tầng"
              description={post.numberOfFloor}
            />
          )}
          {post.frontispiece && (
            <PropertyItem
              iconClass="kikor kiko-real-estate-auction"
              title="Mặt tiền"
              description={`${post.frontispiece} m²`}
            />
          )}
        </Grid.Row>
      </Grid>

      <Header as="h2">Xem trên bản đồ</Header>
      {post.coordinates && (
        <Map
          position={post.coordinates.map((coordinate) => {
            return {
              lat: coordinate.latitude,
              lng: coordinate.longitude,
            };
          })}
        />
      )}
    </>
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
