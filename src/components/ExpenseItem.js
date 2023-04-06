import React from "react";
import ExpenseDate from "./ExpenseDate";
import "../style/ExpenseItem.css";

export default function ExpenseItem(props) {
  const [editMode, setEditMode] = React.useState(false);
  
  
  const titleInput = React.useRef()
  const amountInput = React.useRef()
  const title = React.useRef()
  const amount = React.useRef()
  const deleteBtn = React.useRef();

  function deleteItem(e){
    props.sendDeletedItem(props.data);
    setEditMode(false);
  }  


  function handleEdit(){
    let newTitle = titleInput.current.value;
    let newAmount = amountInput.current.value;
    props.itemEdit(newTitle, newAmount, props.data.id);
  }
  
  function containsOnlyNumbers(str) {
    return  /^\d+$/.test(str);
  }

  React.useEffect(() => {
    window.addEventListener("click", function(event){
      if(editMode && event.target !== titleInput.current && event.target !== amountInput.current && event.target !== title.current && event.target !== amount.current  && titleInput.current !== null && amountInput.current !== null && titleInput.current.value.trim().length > 0 && amountInput.current.value.trim().length > 0 && containsOnlyNumbers(amountInput.current.value)) {
        setEditMode(false);
      }
    })
  
    document.addEventListener("keypress", function(event){
      if(event.which === 13 && editMode && titleInput.current !== null && amountInput.current !== null && titleInput.current.value.trim().length > 0 && amountInput.current.value.trim().length > 0 && containsOnlyNumbers(amountInput.current.value)) {
        setEditMode(false);
      }
    })
    if(!editMode) {
      titleInput.current.classList.add("hidden");
      amountInput.current.classList.add("hidden");
      title.current.classList.remove("hidden");
      amount.current.classList.remove("hidden");
    } else if (editMode) {
      titleInput.current.classList.remove("hidden");
      amountInput.current.classList.remove("hidden");
      title.current.classList.add("hidden");
      amount.current.classList.add("hidden");
    }
  },[editMode])





  return (
    <div className="expenseItem p-1 bg-gradient shadow-sm">
      <ExpenseDate date={props.data.date} />
      <div className="expenseItemDescription">
        <div ref={title} className="expenseItemTitle ms-1 p-1 fs-4 text-white" onClick={() => setEditMode(true)}>{props.data.title}</div>
        <input ref={titleInput} type="text" value={props.data.title} className="expenseItemInput" onChange={handleEdit}/>
        <div className="amount-delete-wrapper me-2 fs-5">
          <div ref={amount} className="expenseItemAmount me-1 border border-2 border-light bg-dark bg-gradient shadow text-white" onClick={() => setEditMode(true)}>
          {props.currency}{props.data.amount}
          </div>
          <input ref={amountInput} type="text" value={props.data.amount} className="expenseItemAmountInput fs-6" onChange={handleEdit}/>
          <button ref={deleteBtn} className="delete-item text-white border border-2 border-light shadow bg-gradient" onClick={deleteItem}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" className="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> </svg>
          </button>
        </div>
      </div>
    </div>
  );
}