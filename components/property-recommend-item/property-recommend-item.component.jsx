import Link from "next/link";
import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";

const PropertyRecommendItem = () => {
  return (
    <>
      <Link href="/thong-tin-chi-tiet">
        <Card>
          <Image
            src="https://media.travelmag.vn/files/content/2021/04/30/173292019_315063713309362_6329146106221360649_n-00272556.jpg"
            wrapped
            ui={false}
            alt="card"
          />
          <Card.Content>
            <Card.Header>Matthew</Card.Header>
            <Card.Meta>
              <span className="date">Joined in 2015</span>
            </Card.Meta>
            <Card.Description>
              Matthew is a musician living in Nashville.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              22 Friends
            </a>
          </Card.Content>
        </Card>
      </Link>
    </>
  );
};

export default PropertyRecommendItem;
