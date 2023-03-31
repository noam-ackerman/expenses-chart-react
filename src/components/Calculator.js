import React from "react";
import "../style/Calculator.css";

export default function Calculator(props) {
    let calculatorModal = React.useRef();
    let calculatorOverLay = React.useRef();

    function handleOverlayClick(event){
       if(event.target !== calculatorModal.current) {
            props.toggleCalculator(props.calculatorMode);
        }
    }

    return <>
        <div  ref={calculatorOverLay} className="calculatorOverlay" onClick={handleOverlayClick}></div>
        <div ref={calculatorModal} className="calculator-modal  bg-gradient shadow-sm p-4">
            <div className="calculator-screen shadow-sm"></div>
            <div className="calculator-buttons">
             <div className="clear shadow-sm orange">AC</div>
             <div className="previousClear shadow-sm orange">CE</div>
             <div className="precent shadow-sm orange">%</div>
             <div className="division shadow-sm orange">÷</div>
             <div className="1 shadow-sm" >1</div>
             <div className="2 shadow-sm">2</div>
             <div className="3 shadow-sm">3</div>
             <div className="Multiplication shadow-sm orange">×</div>
             <div className="4 shadow-sm">4</div>
             <div className="5 shadow-sm">5</div>
             <div className="6 shadow-sm">6</div>
             <div className="Subtraction shadow-sm orange">−</div>
             <div className="7 shadow-sm">7</div>
             <div className="8 shadow-sm">8</div>
             <div className="9 shadow-sm">9</div>
             <div className="addition shadow-sm orange">+</div>
             <div className="decimal shadow-sm">.</div>
             <div className="0 shadow-sm">0</div>
             <div className="negative shadow-sm">-</div>
             <div className="calculate shadow-sm orange">=</div>
           </div>
        </div>
    </>
}