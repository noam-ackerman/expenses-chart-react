import React from "react";
import ExpenseDate from "./ExpenseDate";
import EditItemModal from "./EditItemModal";
import "../style/ExpenseItem.css";

export default function ExpenseItem(props) {
  const [editMode, setEditMode] = React.useState(false);

  const title = React.useRef()
  const amount = React.useRef()
  const deleteBtn = React.useRef();
  const editBtn = React.useRef();

  function deleteItem(e){
    props.sendDeletedItem(props.data);
  }  

  function toggleEditItem(e){
    setEditMode(!editMode)
  }


  React.useEffect(() => {
    editMode ? document.querySelector("body").classList.add("modal-open") : document.querySelector("body").classList.remove("modal-open")
  }, [editMode])




  return (
    <div className="expenseItem p-2 bg-gradient shadow-sm">
      <ExpenseDate date={props.data.date} />
      <div className="expenseItemDescription p-2">
        <div ref={title} className="expenseItemTitle ms-1 p-1 fs-4 text-white" onClick={() => setEditMode(true)}>{props.data.title}</div>
        <div className="amount-delete-wrapper fs-5">
          <div ref={amount} className="expenseItemAmount me-1 border border-2 border-light bg-dark bg-gradient shadow text-white" onClick={() => setEditMode(true)}>
          {props.currency}{props.data.amount}
          </div>
          <button ref={editBtn} className="edit-item text-white border border-2 border-light shadow bg-gradient" onClick={toggleEditItem}>
            <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" viewBox="0 0 60 60">
              <g id="Layer_1-2" data-name="Layer 1">
                <g>
                  <path className="cls-1" d="M0,64V0H64V64H0Zm20.64-21.27c.34,.49,.69,.98,1.03,1.48,4.35-1.79,9.47-2.67,12.9-5.55,7.14-5.98,13.37-13.03,20.01-19.6,3.14-3.11,3.62-6.24,.4-9.57-3.26-3.38-6.23-3.41-9.9,.17-5.85,5.71-11.34,11.81-17.44,17.24-4.96,4.41-5.81,10.09-7,15.83Zm4.33-28.46c.03-.48,.05-.97,.08-1.45-.34-.28-.68-.78-1.03-.79-3.17-.11-6.34-.21-9.51-.15-5.46,.1-7.52,2.14-7.55,7.62-.07,9.84-.06,19.68,0,29.51,.03,5.9,2.16,7.93,8.29,7.96,9.85,.05,19.7-.01,29.55,.03,3.57,.02,7.62,.34,8.99-3.7,1.59-4.72,.93-9.69-.61-14.48-1.08,3.22-1.23,6.43-1.04,9.62,.25,4.3-1.63,6.05-5.89,6.01-10.35-.11-20.7-.1-31.06,0-3.93,.04-5.91-1.46-5.88-5.56,.08-9.67,.07-19.34,0-29.01-.03-4.06,1.9-5.75,5.84-5.63,3.27,.1,6.54,.02,9.8,.02Z"/>
                  <path d="M20.64,42.73c1.19-5.74,2.04-11.42,7-15.83,6.1-5.43,11.6-11.52,17.44-17.24,3.67-3.59,6.64-3.55,9.9-.17,3.21,3.33,2.74,6.46-.4,9.57-6.64,6.57-12.87,13.63-20.01,19.6-3.44,2.88-8.55,3.76-12.9,5.55-.34-.49-.69-.98-1.03-1.48ZM45.55,14.36c-6.2,6.09-12.17,11.96-18.28,17.97,1.41,1.54,3.06,3.34,4.22,4.6,6.35-6.29,12.3-12.18,18.02-17.85-1.28-1.53-2.86-3.41-3.96-4.72Zm8.37,3.09c-.26-2.4,.12-4.6-.77-5.98-1.61-2.47-3.95-2.5-6.61,.58,2.03,1.48,3.98,2.91,7.38,5.39Z"/>
                  <path d="M24.97,14.27c-3.27,0-6.54,.08-9.8-.02-3.95-.12-5.88,1.57-5.84,5.63,.07,9.67,.08,19.34,0,29.01-.03,4.1,1.95,5.6,5.88,5.56,10.35-.1,20.7-.11,31.06,0,4.26,.05,6.14-1.71,5.89-6.01-.19-3.19-.04-6.4,1.04-9.62,1.54,4.79,2.2,9.76,.61,14.48-1.36,4.04-5.42,3.72-8.99,3.7-9.85-.04-19.7,.02-29.55-.03-6.13-.03-8.26-2.06-8.29-7.96-.06-9.84-.06-19.68,0-29.51,.04-5.48,2.1-7.52,7.55-7.62,3.17-.06,6.34,.05,9.51,.15,.35,.01,.68,.52,1.03,.79-.03,.48-.05,.97-.08,1.45Z"/>
                  <path className="cls-1" d="M45.55,14.36c1.1,1.31,2.68,3.19,3.96,4.72-5.72,5.66-11.66,11.55-18.02,17.85-1.16-1.26-2.81-3.06-4.22-4.6,6.11-6,12.08-11.88,18.28-17.97Z"/>
                  <path className="cls-1" d="M53.92,17.45c-3.4-2.49-5.35-3.91-7.38-5.39,2.66-3.09,5-3.05,6.61-.58,.9,1.38,.52,3.58,.77,5.98Z"/>
                </g>
              </g>
            </svg>
          </button>
          <button ref={deleteBtn} className="delete-item text-white border border-2 border-light shadow bg-gradient" onClick={deleteItem}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" className="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> </svg>
          </button>
        </div>
      </div>
      {editMode && <EditItemModal data={props.data} itemEdit={props.itemEdit} toggleEditItem={toggleEditItem}/>}
    </div>
  );
}