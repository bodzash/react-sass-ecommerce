import React from "react"

import Header from "./Header"
import Item from "./Item"
import Checkout from "./Checkout"
import Processing from "./Processing"

import "../styles/style.css"

export default function App() {

  //main cart checkout
  const [state, setState] = React.useState("main")
  const [subState, setSubState] = React.useState(false)
  const [inputState, setInputState] = React.useState("")
  const [products, setProducts] = React.useState([])
  const [displayProds, setDisplayProds] = React.useState([])
  const [itemInCart, setItemInCart] = React.useState([])
  const [cartTotal, setCartTotal] = React.useState(0)

  const [showError, setShowError] = React.useState(false)

  const [formInput, setFormInput] = React.useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    city: "",
    zip: ""
  })

  const [cardInput, setCardInput] = React.useState({
    cardNumber: "",
    cardMonth: "",
    cardYear: "",
    cardCVC: "",
    cardZIP: ""
  })

  //Credit Card input state setter
  function handleCardChange(e) {
    let {name, value} = e.target
    setCardInput(old=> {return {...old, [name]: value }})
  }

  //Form input state setter
  function handleFormChange(e) {
    const {name, value} = e.target
    setFormInput(old=> {return {...old, [name]: value }})
  }

  React.useEffect(()=> {
    setShowError(false)
  },[state, subState])

  //Make sure that every field is not empty
  function confirmForm() {
    let arr = Object.values(formInput)
    if (arr.every(item=> item !== "" )) {
      setSubState(true)
    } else { setShowError(true) }
  }

  //Make sure that every card field is not empty
  function confirmCardForm() {
    let arr = Object.values(cardInput)
    if (arr.every(item=> item !== "" )) {
      setState("processing")
      setSubState(false)
    } else { setShowError(true) }
  }

  //Input state setter (searchbar)
  function handleChange(event) {
    setInputState(event.target.value)
  }

  //MOCK LOADING TIME (mock for: serverside auth)
  React.useEffect(()=>{
    if (state === "processing" && !subState) {
      setTimeout(()=> {
        setSubState(true)
        setItemInCart([])
      }, 3000)
    }
  }, [state])

  //Get products, put it in state
  React.useEffect(()=> {
    fetch('https://fakestoreapi.com/products')
            .then(res=> res.json())
            .then(data=> setProducts(data))
  }, [])

  //Add to cart
  function addToCart(item) {
    if (itemInCart.some(arrayItem => arrayItem.id === item.id) === false )
    {setItemInCart(old=> {return [...old, {id: item.id, qty: 1 } ]})}
  }

  //Parse on searchbar (makes search work)
  React.useEffect(()=> {
    let arrayActual = []

    if (inputState === "") {
      arrayActual = products
    } else {
      products.forEach(item=> {
        item.title.toUpperCase().includes(inputState.toUpperCase()) && arrayActual.push(item)
      })
    }

    setDisplayProds(arrayActual)
  }, [inputState, products])

  //On each cart change update total $ cost
  React.useEffect(()=> {
    let cost = 0
    itemInCart.forEach(item=> {
      cost += products[item.id-1].price * item.qty
    })
    setCartTotal(cost.toFixed(2))
  }, [itemInCart])

  //Item render
  function renderProducts() {
    return displayProds.map(item=> {
      return (
        <Item
          key={item.id}
          id={item.id}
          name={item.title}
          image={item.image}
          desc={item.description}
          price={item.price}
          state={state}
          cart={itemInCart}
          click={()=>{addToCart(item)}}
        />
      )
    })
  }

    //Card Item render
    function renderCartProducts() {
      return itemInCart.map((item, index)=> {
        return (
          <Item
            key={products[item.id-1].id}
            id={products[item.id-1].id}
            name={products[item.id-1].title}
            image={products[item.id-1].image}
            desc={products[item.id-1].description}
            price={(products[item.id-1].price * itemInCart[index].qty).toFixed(2)}
            cart={itemInCart}
            state={state}

            count={itemInCart[index].qty}
            remove={()=>setItemInCart(prev=> {
              let arr = [...prev]
              arr.splice(index, 1)
              return arr
            })}
            addCount={()=> setItemInCart(prev=> {
              let arr = [...prev]
              arr[index] = {...arr[index], qty: arr[index].qty + 1} //avoid mutation
              return arr
            })}
            
            decCount={()=> setItemInCart(prev=> {
              let arr = [...prev]
              if(arr[index].qty > 1) {arr[index] = {...arr[index], qty: arr[index].qty - 1}}
              return arr
            })}
          />
        )
      })
    }

  return(
    <div className="container">
      <Header 
        amount={itemInCart.length}
        handler={handleChange}
        inputState={inputState}
        state={state}
        goHome={()=>{setState("main"); setSubState(false)}}
        goCart={()=>{setState("cart"); setSubState(false)}}
      />
      {state === "main" && <div className="grid-wrapper">{renderProducts()}</div>}
      
      {state === "cart" && 
      <div className="grid-wrapper">
        {itemInCart.length === 0 && <h1>You have no items in the cart</h1>}
        {renderCartProducts()}
      </div>}

      {(state === "cart" && itemInCart.length > 0 ) &&
        <div className="buy-out-wrapper">
          <h2>Total amount: ${cartTotal}</h2>
          <div className="btn-wrapper">
            <button onClick={()=> {setItemInCart([])}}>EMPTY CART</button>
            <button onClick={()=> {setState("checkout")}}>CHECK OUT</button>
          </div>
        </div>}

      {state === "checkout" &&
      <Checkout
        state={()=> setState("cart")}
        change={handleFormChange}
        form={formInput}
        cardInput={cardInput}
        cardChange={handleCardChange}
        sub={()=> setSubState(true)}
        formConfirm={confirmForm}
        payConfirm={confirmCardForm}
        isSub={subState}
        summPrice={cartTotal}
        back={()=> setSubState(false)}
        cart={itemInCart}
        products={products}

        error={showError}
      />}

      {state === "processing" &&
        <Processing
          subState={subState}
          formInfo={formInput}
          goBack={()=> {setState("main"); setSubState(false)}}
        />
      }
    </div>
  )
}