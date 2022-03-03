import React from "react"

export default function Checkout({state, error, isSub, form, change, cardChange, cardInput, payConfirm, summPrice, back, cart, products, formConfirm}) {

    const obj = {...form}

    function CartMinimal({name, qty, price}) {
        return (
            <div className="mini-item-wrapper">
                <div className="mini-item-name-qty">
                    <p className="mini-item-name">{name}</p>
                    <p className="mini-item-qty">Quantity: {qty}</p>
                </div>
                <p className="mini-item-price">${price}</p>
            </div>
        )
    }

    //Only numbers can be inputed, call it on onKeyPress
    function validateNumbers(event) {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    }

    //Renders a list of the cart items in a mini version
    function renderCartMinimal() {
        let arr = [...cart];
        let arrToRender = arr.map(item=> {
            return <CartMinimal key={item.id} name={products[item.id-1].title} qty={item.qty} price={(products[item.id-1].price * item.qty).toFixed(2)} />
        })
        return arrToRender
    }

    return(
        <div className="check-wrapper">
            {!isSub && <div className="check-inner-wrapper">
                <h1>Checkout</h1>
                <h2>Shipping Address</h2>
                <form className="input-grid-wrapper">
                    <input onChange={change} id="first-name" type="text" name="firstName" placeholder="First name*" value={obj.firstName} required />
                    <input onChange={change} id="last-name" type="text" name="lastName" placeholder="Last name*" value={obj.lastName} required />
                    <input onChange={change} id="address" type="text" name="address" placeholder="Address*" value={obj.address} required />
                    <input onChange={change} id="email" type="text" name="email" placeholder="E-mail*" value={obj.email} required />
                    <input onChange={change} id="city" type="text" name="city" placeholder="City*" value={obj.city} required />
                    <input onChange={change} id="zip" type="text" name="zip" placeholder="ZIP / Postal code*" value={obj.zip} required />
                </form>
                {error && <h4 className="show-error">Please fill out every required field</h4>}
                <div className="bottom-btn-wrapper">
                    <button className="back-to-cart" onClick={state}>BACK TO CART</button>
                    <button className="confirm" onClick={formConfirm}>NEXT</button>
                </div>
            </div>}

            {isSub && <div className="check-inner-wrapper">
                <h1>Checkout</h1>
                <h2>Order summary</h2>

                <div className="summ-wrapper">
                    {renderCartMinimal()}
                    <div className="summ-wrapper-total">
                        <h4>Total</h4>
                        <strong>${summPrice}</strong>
                    </div>
                </div>

                <div className="payment-method-wrapper">
                    <h3>Payment Method</h3>
                    <div className="bottom-input-wrapper">
                        <div className="icon-card-number-wrapper">
                            <span className="material-icons">credit_card</span>
                            <input onChange={cardChange} type="text" name="cardNumber" id="card-number" placeholder="Card number" maxLength="16" onKeyPress={validateNumbers} value={cardInput.cardNumber} />
                        </div>

                        <div className="card-info-wrapper">
                            <input onChange={cardChange} id="card-month" type="text" name="cardMonth" placeholder="MM" maxLength="2" onKeyPress={validateNumbers} value={cardInput.cardMonth} />
                            <span>/</span>
                            <input onChange={cardChange} id="card-year" type="text" name="cardYear" placeholder="YY" maxLength="2" onKeyPress={validateNumbers} value={cardInput.cardYear} />
                            <input onChange={cardChange} id="card-cvc" type="text" name="cardCVC" placeholder="CVC" maxLength="3" onKeyPress={validateNumbers} value={cardInput.cardCVC} />
                            <input onChange={cardChange} id="card-zip" type="text" name="cardZIP" placeholder="ZIP" maxLength="5" onKeyPress={validateNumbers} value={cardInput.cardZIP} />
                        </div>
                    </div>
                </div>
                {error && <h4 className="show-error">Please fill out every required field</h4>}
                <div className="bottom-btn-wrapper">
                    <button className="back-to-form" onClick={back}>BACK</button>
                    <button className="confirm-pay" onClick={payConfirm}>PAY ${summPrice}</button>
                </div>
            </div>}
        </div>
    )
}