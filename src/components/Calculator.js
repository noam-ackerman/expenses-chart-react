import React from "react";
import "../style/Calculator.css";


export default function Calculator(props) {
    let calculatorModal = React.useRef();
    let calculatorOverLay = React.useRef();
    const [calculation, setCalculation] = React.useState({array:[], error:false});
    const [accumulativeCalc, setaccumulativeCalc] = React.useState(".")

    function handleOverlayClick(event){
       if(event.target !== calculatorModal.current) {
            props.toggleCalculator(props.calculatorMode);
        }
    }

    function handleAddValue(newValue){
      setCalculation({array:[...calculation.array , newValue], error:false});
    }
    function clearAll(){
        setCalculation({array:[],error:false});
    }
    function clearLast(){
        let array = [...calculation.array]
        array.pop();
        setCalculation({array:[...array],error:false});
    }

    function Calculate(){
        let results;
        let validCode = true;
        try {
           // eslint-disable-next-line
           results = Function("return " + accumulativeCalc)()      
          } catch (e) {
            if (e instanceof SyntaxError) {
                validCode = false;
                setCalculation({array:[],error:true});
            }
          } finally {
            if(validCode){
               setCalculation({array:[results],error:false});
            }
          }
    }

    React.useEffect(() => {
        setaccumulativeCalc(calculation.array.length === 0 && !calculation.error ? "." : calculation.error ? "ERROR! bad calc" : calculation.array.join(''));
    },[calculation])


    return <>
        <div  ref={calculatorOverLay} className="calculatorOverlay" onClick={handleOverlayClick}></div>
        <div ref={calculatorModal} className="calculator-modal  bg-gradient shadow-sm p-4">
            <div className="calculator-screen shadow-sm"><span>{accumulativeCalc}</span></div>
            <div className="calculator-buttons">
             <div className="button shadow-sm orange" onClick={clearAll}>AC</div>
             <div className="button shadow-sm orange" onClick={() => handleAddValue("(")}>(</div>
             <div className="button shadow-sm orange" onClick={() => handleAddValue(")")}>)</div>
             <div className="button shadow-sm orange" onClick={() => handleAddValue("/")}>÷</div>
             <div className="button shadow-sm" onClick={() => handleAddValue("1")}>1</div>
             <div className="button shadow-sm" onClick={() => handleAddValue("2")}>2</div>
             <div className="button shadow-sm" onClick={() => handleAddValue("3")}>3</div>
             <div className="button shadow-sm orange" onClick={() =>handleAddValue("*")}>×</div>
             <div className="button shadow-sm" onClick={() => handleAddValue("4")}>4</div>
             <div className="button shadow-sm" onClick={() => handleAddValue("5")}>5</div>
             <div className="button shadow-sm"onClick={() => handleAddValue("6")}>6</div>
             <div className="button shadow-sm orange" onClick={() => handleAddValue("-")}>−</div>
             <div className="button shadow-sm" onClick={() => handleAddValue("7")}>7</div>
             <div className="button shadow-sm" onClick={() => handleAddValue("8")}>8</div>
             <div className="button shadow-sm" onClick={() => handleAddValue("9")}>9</div>
             <div className="button shadow-sm orange" onClick={() => handleAddValue("+")}>+</div>
             <div className="button shadow-sm" onClick={() => handleAddValue(".")}>.</div>
             <div className="button shadow-sm" onClick={() => handleAddValue("0")}>0</div>
             <div className="button shadow-sm" onClick={clearLast}>CE</div>
             <div className="button shadow-sm orange" onClick={Calculate}>=</div>
           </div>
        </div>
    </>
}