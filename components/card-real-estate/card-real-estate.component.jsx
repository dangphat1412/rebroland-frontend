import Link from "next/link";
import React from "react";
import { Card, Image } from "semantic-ui-react";
import convertToSlug from "../../utils/convertToSlug";
import { RealEstateCardContainer } from "./card-real-estate.styles";

const RealEstateCard = ({ post }) => {
  return (
    <Link href={`/bat-dong-san/${convertToSlug(post.title)}-${post.postId}`}>
      <RealEstateCardContainer fluid>
        <Image
          src={post.images[0].image}
          wrapped
          ui={false}
          alt="real estate"
        />
        <Card.Content>
          <Card.Header>{post.title}</Card.Header>
          <Card.Meta>
            <span className="date">Joined in 2015</span>
          </Card.Meta>
          <Card.Description>{post.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>22 Friends</a>
        </Card.Content>
      </RealEstateCardContainer>
    </Link>
  );
};

export default RealEstateCard;
