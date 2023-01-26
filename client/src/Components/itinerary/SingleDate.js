import { StyledOptionItem } from './PlanDropDown';

import { formatMonthAndDay } from '../../Util/dayUtil';

const SingleDate = props => {
  const { id, data, setIsShow, setSelected, setSelectedDateId } = props;

  return (
    <StyledOptionItem
      onClick={() => {
        setIsShow(false);
        setSelected(formatMonthAndDay(data.planDate));
        setSelectedDateId(id);
      }}
    >
      {formatMonthAndDay(data.planDate)}
    </StyledOptionItem>
  );
};

export default SingleDate;
