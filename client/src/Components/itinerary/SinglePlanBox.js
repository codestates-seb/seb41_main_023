import styled from "styled-components";
import {Fragment, useState} from "react";
import PlaceInfoSection from "./PlaceInfoSection";
import moment from "moment";

const SectionHeader = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: -48px;
  padding-left: 48px;
  position: relative;
  align-items: center;
  display: flex;
  width: 100%;
`;

const SinglePlanBox = (props) => {
    const {planDateId, planDate, planData, setPlanData, setAddExpenseModal, singleData, setMainData, searchData} = props;

    const handleDeletePlan = (targetId) => {
        alert('정말 삭제하시겠습니까?');
        const newDataList = planData.filter((data) => data.planDateId !== targetId);
        setPlanData(newDataList);
    }
    console.log("singleData", singleData)


    return (
        <Fragment>
            <SectionHeader>
                <p>{planDate}</p>
            </SectionHeader>
                    <PlaceInfoSection
                        singleData={singleData}
                        setAddExpenseModal={setAddExpenseModal}
                        handleDeletePlan={handleDeletePlan}
                    />

                {/*)) : null}*/}
        </Fragment>
    )
};

export default SinglePlanBox;