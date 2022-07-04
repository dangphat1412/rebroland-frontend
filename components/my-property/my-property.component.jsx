import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import { getPostsByUser } from "../../actions/post";
import ListMyRealEstate from "../list-my-real-estate/list-my-real-estate.component";
import UserPanel from "../user-panel/user-panel.component";
import { MyPropertylContainer } from "./my-property.styles";

const MyProperty = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    (async () => {
      const postData = await getPostsByUser();
      setData(postData);
    })();
  }, []);

  return (
    <MyPropertylContainer>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <UserPanel />
          </Grid.Column>
          <Grid.Column width={12}>
            <ListMyRealEstate data={data} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </MyPropertylContainer>
  );
};

export default MyProperty;
