import {Fragment, useEffect, useState} from "react";
import SinglePlan from "./SinglePlan";
import AddExpense from "../budget/AddExpense";


const SinglePlanBox = (props) => {
    const {
        setAddExpenseModal,
        singleData,
        setCurrentDate,
        setCurrentPlace,
        setCurrentPlaceId,
        planDate,
    } = props;

    return (
        <Fragment>
            {singleData &&
                singleData.places.map((data) => (
                    <SinglePlan
                        key={data.placeId}
                        data={data}
                        setAddExpenseModal={setAddExpenseModal}
                        setCurrentDate={setCurrentDate}
                        planDate={planDate}
                        setCurrentPlace={setCurrentPlace}
                        setCurrentPlaceId={setCurrentPlaceId}
                    />
                ))
            }
        </Fragment>
    )
};

export default SinglePlanBox;