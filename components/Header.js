import React from "react"

export default function Header(props) {

    return(
        <header>
            <div className="left-wrapper">
                <div className="logo" onClick={props.goHome}>E-Commerce</div>
                {props.state === "main" &&
                    <div className="input-wrapper">
                        <i className="material-icons">search</i>
                        <input
                            onChange={props.handler}
                            type="text"
                            name="search"
                            id="searchbar"
                            value={props.inputState}
                        />
                    </div>
                }
            </div>
            <button className="cart-btn" onClick={props.goCart}>
                <i className="material-icons">shopping_cart</i>
                {props.amount > 0 && <div className="amount-counter">{props.amount}</div>}
            </button>
        </header>
    )
}