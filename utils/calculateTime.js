import moment from "moment";
import Moment from "react-moment";

const calculateTime = (createdAt) => {
  const today = moment(Date.now());
  const postDate = moment(new Date(createdAt).getTime());
  const diffInHours = today.diff(postDate, "hours");

  if (diffInHours < 24) {
    return (
      <>
        Hôm nay <Moment format="hh:mm A">{createdAt}</Moment>
      </>
    );
  } else if (diffInHours > 24 && diffInHours < 36) {
    return (
      <>
        Hôm qua <Moment format="hh:mm A">{createdAt}</Moment>
      </>
    );
  } else if (diffInHours > 36) {
    return <Moment format="DD/MM/YYYY hh:mm A">{createdAt}</Moment>;
  }
};

export default calculateTime;
