import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  // const style = {
  //   color: "red",
  //   fontSize: 32,
  //   textTransform: "uppercase",
  // };

  return (
    <header className="header">
      <h1>Fast React Pizze</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;
  // const pizzas = [];
  const numPizzas = pizzas.length;

 return (
   <main className="menu">
     <h2>Our menu</h2>

     {numPizzas > 0 ? (
       <ul className="pizzas">
         {pizzaData.map((pizza) => (
           <Pizza pizzaObj={pizza} key={pizza.name} />
         ))}
       </ul>
     ) : <p>We're still working on our menu</p>}


     {/*      <Pizza
       name="Pizza Sinaci"
       ingredients="Tomato, mozarella, spinach, and ricotta cheese"
       photoName='pizzas/spinaci.jpg'
       price={10}
     />
     <Pizza
       name="Pizza Funghi"
       ingredients="Tomato, mushrooms"
       photoName='pizzas/funghi.jpg'
       price={12}
     /> */}
   </main>
 );
}

function Pizza({pizzaObj}) {
  console.log(pizzaObj)

  // if(pizzaObj.soldOut) return

  return (
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? 'Sould Out!' : pizzaObj.price}</span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours()
  const openHour = 10 
  const closeHour = 23
  const isOpen = hour >= openHour && hour <= closeHour
  console.log(isOpen)

  // if(hour >= openHour && hour <= closeHour) alert ("We're open") 
  // else alert("Sorry we're closed")

  return (
    <footer className="footer">
      {isOpen ? (
        <Order close={closeHour} open={openHour} />
      ) : <p>We're happy to welcome you between {openHour}:00 and {closeHour}:00</p>}
    </footer>
  );

  // return React.createElement('footer', null, "We're open")
}

function Order({ close, open }) {
  return <div className='order'>
          <p>We open! From {open}:00 till {close}:00</p>
          <button className='btn'>order</button>
        </div>
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
