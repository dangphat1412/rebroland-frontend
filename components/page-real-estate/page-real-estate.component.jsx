import React from "react";
import { Form, Grid, List, Segment } from "semantic-ui-react";
import CustomButton from "../custom-button/custom-button.component";
import ListRealEstate from "../list-real-estate/list-real-estate.component";
import { RealEstatePageContainer } from "./page-real-estate.styles";

const RealEstatePage = () => {
  return (
    <RealEstatePageContainer>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Segment>
              <Form>
                <h1>Tìm kiếm</h1>
                <Form.Input />
                <Form.Input />
                <Form.Select />
                <Form.Select />
                <Form.Select />
                <Form.Input />
                <Form.Input />
                <Form.Input />
                <Form.Button fluid>TÌM KIẾM</Form.Button>
              </Form>
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <ListRealEstate />
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
