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
    
    return <div  ref={calculatorOverLay} class="calculatorOverlay" onClick={handleOverlayClick}>
        <div ref={calculatorModal} class="calculator-modal bg-gradient shadow-sm"></div>
    </div>
}