import React from "react"

export default function Processing({subState, formInfo, goBack}) {

    

    return(
        <div className="process-wrapper">
            {!subState ?
            <div className="inner-process-wrapper">
                <h1>Processing</h1>
                <div className="loader"></div>
                <h3>Please wait...</h3>
            </div>
            :
            <div className="inner-process-wrapper">
                <h1>Purchase Done</h1>
                <h3>Thank you for your purchase, {formInfo.firstName +" "+ formInfo.lastName}!</h3>
                <p>Order at: XXXX-XXXX</p>
                <button onClick={goBack}>BACK TO HOME</button>
            </div>
            }
        </div>
    )
}