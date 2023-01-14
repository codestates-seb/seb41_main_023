import moment from "moment/moment";
import {StyledOptionItem} from "./PlanDropDown";

const SingleDate = (props) => {

    const {id, data, setIsShow, setSelected, setSelectedDateId} = props;

    return (
        <StyledOptionItem
            onClick={() => {
                setIsShow(false);
                setSelected(moment(data.planDate).format('M월 D일'));
                setSelectedDateId(id);
            }}
        >
            {moment(data.planDate).format('M월 D일')}
        </StyledOptionItem>
    )
};

export default SingleDate;