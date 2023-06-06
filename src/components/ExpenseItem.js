import React from "react";
import ReactDOM from "react-dom";
import ExpenseDate from "./ExpenseDate";
import EditItemModal from "./EditItemModal";
import { EditLogo, DeleteLogo } from "../Logos";
import "../style/ExpenseItem.css";

export default function ExpenseItem(props) {
  const [editMode, setEditMode] = React.useState(false);

  const title = React.useRef();
  const amount = React.useRef();
  const deleteBtn = React.useRef();
  const editBtn = React.useRef();

  function deleteItem(e) {
    props.sendDeletedItem(props.data);
  }

  function toggleEditItem(e) {
    setEditMode(!editMode);
  }

  React.useEffect(() => {
    editMode
      ? document.querySelector("body").classList.add("modal-open")
      : document.querySelector("body").classList.remove("modal-open");
  }, [editMode]);

  return (
    <div className="expenseItem p-2 bg-gradient shadow-sm">
      <ExpenseDate date={props.data.date} />
      <div className="expenseItemDescription p-2">
        <div ref={title} className="expenseItemTitle ms-1 p-1 fs-4 text-white">
          {props.data.title}
        </div>
        <div className="amount-delete-wrapper fs-5">
          <div
            ref={amount}
            className="expenseItemAmount border border-2 border-light bg-dark bg-gradient shadow text-white"
          >
            {props.currency}
            {props.data.amount}
          </div>
          <button
            ref={editBtn}
            className="edit-item text-white border border-2 border-light shadow bg-gradient"
            onClick={toggleEditItem}
          >
            <EditLogo />
          </button>
          <button
            ref={deleteBtn}
            className="delete-item text-white border border-2 border-light shadow bg-gradient"
            onClick={deleteItem}
          >
            <DeleteLogo />
          </button>
        </div>
      </div>
      {editMode &&
        ReactDOM.createPortal(
          <EditItemModal
            data={props.data}
            itemEdit={props.itemEdit}
            toggleEditItem={toggleEditItem}
          />,
          document.getElementById("modal-root")
        )}
    </div>
  );
}
