import moment from 'moment/moment';
import { StyledOptionItem } from './PlanDropDown';
import 'moment/locale/ko';

const SingleDate = (props) => {
  const { id, data, setIsShow, setSelected, setSelectedDateId } = props;

  return (
    <StyledOptionItem
      onClick={() => {
        setIsShow(false);
        setSelected(moment(data.planDate).format('M.D'));
        setSelectedDateId(id);
      }}
    >
      {moment(data.planDate).format('M/D')}
    </StyledOptionItem>
  );
};

export default SingleDate;
