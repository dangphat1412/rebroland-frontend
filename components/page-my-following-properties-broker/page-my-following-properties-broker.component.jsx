import React from "react";
import { Dropdown, Grid, Tab } from "semantic-ui-react";
import UserPanel from "../user-panel/user-panel.component";
import { MyFollowingPropertiesBrokerContainer } from "./page-my-following-properties-broker.styles";

const MyFollowingPropertiesBrokerPage = ({ user }) => {
  return (
    <MyFollowingPropertiesBrokerContainer>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <UserPanel user={user} />
          </Grid.Column>
          <Grid.Column width={13} className="main">
            <Dropdown selection options={options} className="filter-options" />
            <Tab
              menu={{ secondary: true, pointing: true }}
              panes={[
                {
                  menuItem: "Tất cả bất động sản",
                  render: () => <Tab.Pane as="div" attached={false}></Tab.Pane>,
                },
                {
                  menuItem: "Nhà ở",
                  render: () => <Tab.Pane as="div" attached={false}></Tab.Pane>,
                },
                {
                  menuItem: "Chung cư",
                  render: () => <Tab.Pane as="div" attached={false}></Tab.Pane>,
                },
                {
                  menuItem: "Đất nền",
                  render: () => <Tab.Pane as="div" attached={false}></Tab.Pane>,
                },
              ]}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </MyFollowingPropertiesBrokerContainer>
  );
};

const options = [
  {
    key: 1,
    text: "Tin mới nhất",
    value: "Jenny Hess",
  },
  {
    key: 2,
    text: "Giá từ thấp đến cao",
    value: "Elliot Fu",
  },
  {
    key: 3,
    text: "Giá từ cao đến thấp",
    value: "Stevie Feliciano",
  },
  {
    key: 4,
    text: "Diện tích từ bé đến lớn",
    value: "Christian",
  },
  {
    key: 5,
    text: "Diện tích từ lớn đến bé",
    value: "Matt",
  },
];

export default MyFollowingPropertiesBrokerPage;
