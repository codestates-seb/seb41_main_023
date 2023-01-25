import dayjs from "dayjs";
import { StyledOptionItem } from "./PlanDropDown";
import "dayjs/locale/ko";

const SingleDate = (props) => {
  const { id, data, setIsShow, setSelected, setSelectedDateId } = props;

  return (
    <StyledOptionItem
      onClick={() => {
        setIsShow(false);
        setSelected(dayjs(data.planDate).format("M.D"));
        setSelectedDateId(id);
      }}
    >
      {dayjs(data.planDate).format("M/D")}
    </StyledOptionItem>
  );
};

export default SingleDate;
