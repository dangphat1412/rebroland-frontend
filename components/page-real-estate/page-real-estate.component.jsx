import React, { useEffect, useState } from "react";
import { Form, Grid, Input, List, Segment } from "semantic-ui-react";
import { getPosts } from "../../actions/post";
import InputField from "../input-field/input-field.component";
import ListRealEstate from "../list-real-estate/list-real-estate.component";
import MultiRangeSlider from "../multi-range-slider/multi-range-slider.component";
import SearchBox from "../search-box/search-box.component";
import {
  FormSearchContainer,
  RealEstatePageContainer,
} from "./page-real-estate.styles";

const RealEstatePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getPosts();
      setPosts(data);
    })();
  }, []);

  return (
    <RealEstatePageContainer>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Segment
              style={{
                backgroundImage: "url('/zyro-image.png')",
                color: "white",
              }}
            >
              {/* http://www.on3-step.com/tf/plesire/img/bg-search-ver.jpg */}
              <SearchBox />
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <ListRealEstate posts={posts} />
          </Grid.Column>
          <Grid.Column width={4}>
            <Segment>
              <h1>Danh mục Bất động sản</h1>
              <List divided verticalAlign="middle" size="large" relaxed>
                <List.Item>
                  <List.Content floated="right">100 bất động sản</List.Content>
                  <List.Content>Nhà ở</List.Content>
                </List.Item>
                <List.Item>
                  <List.Content floated="right">100 bất động sản</List.Content>
                  <List.Content>Nhà chung cư</List.Content>
                </List.Item>
                <List.Item>
                  <List.Content floated="right">100 bất động sản</List.Content>
                  <List.Content>Đất nền</List.Content>
                </List.Item>
              </List>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </RealEstatePageContainer>
  );
};

export default RealEstatePage;
