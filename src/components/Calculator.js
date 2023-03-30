import React from "react";
import "../style/Calculator.css";

export default function Calculator(props) {
    let calculatorModal = React.useRef();
    let calculatorOverLay = React.useRef();
    
    React.useEffect(() => {
        calculatorOverLay.current.addEventListener("click", function(event){
            if(event.target !== calculatorModal.current) {
              props.toggleCalculator(props.calculatorMode);
            }
        })
    }, [props])
 

    return <div  ref={calculatorOverLay} class="calculatorOverlay">
        <div ref={calculatorModal} class="calculator-modal bg-gradient shadow-sm"></div>
    </div>
}