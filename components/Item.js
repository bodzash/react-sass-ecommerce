import React from "react"

export default function Item({name, id, image, desc, price, click, state, cart, count, addCount, remove, decCount}) {

    let styles = {
        backgroundImage: `url(${image})`
    }

    let subBtn = {color: count > 1 ?  "black" : "gray"}

    let cartIcon
    if (cart.some(arrayItem => arrayItem.id === id))
    { cartIcon = "done" } else { cartIcon = "add_shopping_cart" }
    
    let cartIconStyle = {
        color: cartIcon === "done" ? "green" : "gray",
        cursor: cartIcon === "done" ? "not-allowed" : "pointer",
    }

    return(
        <div style={styles} className="item-wrapper">
            <div className="top-wrapper"></div>
            <div className="bottom-wrapper">
                <div className="name-price-wrapper">
                    <h4 className="item-name">{name}</h4>
                    <h4 className="item-price">{`$${price}`}</h4>
                </div>
                <p>{desc}</p>
                {state === "main" && <button onClick={click} style={cartIconStyle} className="add-cart material-icons">{cartIcon}</button>}
                {state === "cart" &&
                    <div className="remove-wrapper">
                        <div className="counter-wrapper">
                            <button onClick={decCount} style={subBtn} className="counter-btn">-</button>
                            <div className="counter">{count}</div>
                            <button onClick={addCount} className="counter-btn">+</button>
                        </div>
                        <button onClick={remove} className="remove-item">REMOVE ITEM</button>
                    </div>
    }
            </div>
        </div>
    )
}