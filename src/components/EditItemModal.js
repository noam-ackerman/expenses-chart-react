import React, { useState, useRef } from "react"
import "../style/EditItemModal.css";

export default function EditItemModal(props) {
  const [typedTitle, setTitle] = useState(props.data.title);
  const [typedAmount, setAmount] = useState(props.data.amount);
  let date, month, year;
    date = ("0" + (new Date(props.data.date).getDate())).slice(-2)
    month = ("0" + (new Date(props.data.date).getMonth() + 1)).slice(-2)
    year = new Date(props.data.date).getFullYear();
  const [typedDate, setDate] = useState(`${year}-${month}-${date}`);
  const [valid, setValid] = useState(false);

  const editModal = useRef();

  function handleOverlayClick(event){
    if(event.target !== editModal) {
        props.toggleEditItem();
     }
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleAmountChange(e) {
    setAmount(e.target.value);
  }

  function handleDateChange(e) {
    setDate(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const fixedExpenseData = {
      title: typedTitle,
      amount: typedAmount,
      date: new Date(typedDate),
    };
    props.itemEdit(fixedExpenseData, props.data.id);
    props.toggleEditItem();
  }

  function cancelEdit(){
    props.toggleEditItem();
  }
  
  React.useEffect(() => {
    if(!valid && typedTitle !== "" && typedAmount !== "" && typedDate !== "") {
      setValid(true);
    } else if (valid && (typedTitle === "" || typedAmount === "" || typedDate === "")) {
        setValid(false);
    }
  }, [valid, typedTitle, typedAmount, typedDate])

    return <>
     <div className="overlay-editItem" onClick={handleOverlayClick}></div>
     <div ref={editModal} className="editItemModal bg-gradient shadow-sm">
        <form className="edit-item-form" onSubmit={handleSubmit}>
        <div className="editExpenseInput">
          <label className="text-white">Title</label>
          <input type="text" value={typedTitle} onChange={handleTitleChange} onKeyDown={(e) =>  e.which === 13 ? e.preventDefault() : null}/>
        </div>
        <div className="editExpenseInput">
          <label className="text-white">Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            onChange={handleAmountChange}
            value={typedAmount}
            onKeyDown={(e) =>  e.which === 13 ? e.preventDefault() : null}
          />
        </div>
        <div className="editExpenseInput">
          <label className="text-white">Date</label>
          <input
            type="date"
            min="2022-01-01"
            onChange={handleDateChange}
            value={typedDate}
            onKeyDown={(e) =>  e.which === 13 ? e.preventDefault() : null}
          />
        </div>
        <div className="editItem-actions">
            <button className="cancelBtn py-2 px-3 bg-dark bg-gradient text-white shadow" onClick={cancelEdit}>CANCEL</button>
            <button 
              type="submit" 
              disabled = {!valid}
              className={`saveBtn  py-2 px-3 bg-dark bg-gradient text-white shadow  ${!valid ? "disabled" : ""}`}>
                SAVE
            </button>
        </div>
        </form>
     </div>
    </>
}