import React, { useRef } from "react";
import { useExpensesContext } from "../context/expensesContext";
import "../style/EditItemModal.css";

export default function EditItemModal(props) {
  const expense = props.data;
  const { editExpense } = useExpensesContext();
  let date, month, year;
  date = ("0" + new Date(expense.date).getDate()).slice(-2);
  month = ("0" + (new Date(expense.date).getMonth() + 1)).slice(-2);
  year = new Date(expense.date).getFullYear();

  const editModal = useRef();
  const inputTitle = useRef();
  const inputAmount = useRef();
  const inputDate = useRef();

  React.useLayoutEffect(() => {
    inputTitle.current.value = expense.title;
    inputAmount.current.value = expense.amount;
    inputDate.current.value = `${year}-${month}-${date}`;
  }, [expense.title, expense.amount, year, month, date]);

  function handleOverlayClick(event) {
    if (event.target !== editModal) {
      props.toggleEditItem();
    }
  }

  function cancelEdit() {
    props.toggleEditItem();
  }

  function handleSubmit(e) {
    e.preventDefault();
    const fixedExpenseData = {
      title: inputTitle.current.value,
      amount: inputAmount.current.value,
      date: new Date(inputDate.current.value),
    };
    editExpense(fixedExpenseData, expense.id);
    props.toggleEditItem();
  }

  return (
    <>
      <div className="overlay-editItem" onClick={handleOverlayClick}></div>
      <div ref={editModal} className="editItemModal bg-gradient shadow-sm">
        <form className="edit-item-form" onSubmit={handleSubmit}>
          <div className="editExpenseInput">
            <label className="text-white">Title</label>
            <input type="text" ref={inputTitle} required />
          </div>
          <div className="editExpenseInput">
            <label className="text-white">Amount</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              ref={inputAmount}
              required
            />
          </div>
          <div className="editExpenseInput">
            <label className="text-white">Date</label>
            <input type="date" min="2022-01-01" ref={inputDate} required />
          </div>
          <div className="editItem-actions">
            <button
              type="button"
              className="cancelBtn py-2 px-3 bg-dark bg-gradient text-white shadow"
              onClick={cancelEdit}
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="saveBtn  py-2 px-3 bg-dark bg-gradient text-white shadow"
            >
              SAVE
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
