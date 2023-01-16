import Modal from "../user/Modal";

const DeleteExpense = ({
  expenseId,
  handleDeleteExpense,
  setDeleteExpenseModal,
}) => {
  console.log(expenseId);
  return (
    <Modal
      title="지출 내역을 삭제하시겠습니까?"
      content="삭제한 내역은 복구할 수 없습니다."
      buttonName="Delete expense"
      handleClick={() => handleDeleteExpense(expenseId)}
      setModal={setDeleteExpenseModal}
    />
  );
};

export default DeleteExpense;
