import React from "react";
import ExpenseDate from "./ExpenseDate";
import "../style/ExpenseItem.css";

export default function ExpenseItem(props) {
  const [editMode, setEditMode] = React.useState(false);

    
  function deleteItem(e){
    props.sendDeletedItem(props.data);
    setEditMode(false);
  }    
  
  const titleInput = React.useRef()
  const title = React.useRef()
  const deleteBtn = React.useRef();

  function handleTitleClick(event){
    titleInput.current.classList.remove("hidden");
    event.target.classList.add("hidden");
    setEditMode(true);
  }

  function handleTitleChange(event){
   props.titleChanged(event.target.value, props.data.id);
  }
  

  React.useEffect(() => {
    window.addEventListener("click", function(event){
      console.log(event.target)
      if(event.target !== titleInput.current && event.target !== title.current  && editMode  && titleInput.current !== null && titleInput.current.value.trim().length > 0) {
        setEditMode(false);
      }
    })
  
    document.addEventListener("keypress", function(event){
      if(event.which === 13 && editMode && titleInput.current.value.trim().length > 0) {
        setEditMode(false);
      }
    })
    if(!editMode) {
      titleInput.current.classList.add("hidden");
      title.current.classList.remove("hidden");
    } else if (editMode) {
      titleInput.current.classList.remove("hidden");
      title.current.classList.add("hidden");
    }
  },[editMode])





  return (
    <div className="expenseItem p-1 bg-gradient shadow-sm">
      <ExpenseDate date={props.data.date} />
      <div className="expenseItemDescription">
        <div ref={title} className="expenseItemTitle ms-1 p-1 fs-4 text-white" onClick={handleTitleClick}>{props.data.title}</div>
        <input ref={titleInput} type="text" value={props.data.title} className="expenseItemInput" onChange={handleTitleChange}/>
        <div className="amount-delete-wrapper me-2 fs-5">
          <div className="expenseItemAmount me-1 border border-2 border-light bg-dark bg-gradient shadow text-white">
          {props.data.currency}{props.data.amount}
          </div>
          <button ref={deleteBtn} className="delete-item text-white border border-2 border-light shadow bg-gradient" onClick={deleteItem}>DELETE</button>
        </div>
      </div>
    </div>
  );
}