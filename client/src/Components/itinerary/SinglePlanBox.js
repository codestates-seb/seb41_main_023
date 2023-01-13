import styled from "styled-components";
import {Fragment, useState} from "react";
import PlaceInfoSection from "./PlaceInfoSection";

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
    const {planDateId, planDate, searchData, setSearchData, setAddExpenseModal} = props;

    const handleDeletePlan = (targetId) => {
        alert('정말 삭제하시겠습니까?');
        const newDataList = searchData.filter((data) => data.id !== targetId);
        setSearchData(newDataList);
    }


    return (
        <Fragment>
            <SectionHeader>
                <p>{planDate}</p>
            </SectionHeader>
            {searchData !== null ? (
                searchData.map((data) => (
                    <PlaceInfoSection
                        key={data.id}
                        searchData={data}
                        setAddExpenseModal={setAddExpenseModal}
                        handleDeletePlan={handleDeletePlan}
                    />
                    )
                )) : null}
        </Fragment>
    )
};

export default SinglePlanBox;