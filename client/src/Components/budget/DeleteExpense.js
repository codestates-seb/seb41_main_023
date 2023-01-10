import axios from "axios";
import styled from "styled-components";

import Modal from "../user/Modal";

const DeleteExpense = ({ handleDeleteExpense, setDeleteExpenseModal }) => {
  return (
    <Modal
      title="지출 내역을 삭제하시겠습니까?"
      content="삭제한 내역은 복구할 수 없습니다."
      buttonName="Delete expense"
      handleClick={handleDeleteExpense}
      setModal={setDeleteExpenseModal}
    />
  );
};

export default DeleteExpense;
