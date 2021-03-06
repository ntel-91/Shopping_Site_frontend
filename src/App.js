import React, { Component } from 'react';
import './App.css';
import ItemContainer from './containers/ItemContainer.js'
import HeaderContainer from './containers/HeaderContainer.js'
import Welcome from './components/Welcome.js'
import CreateAccount from './components/CreateAccount.js'
import LoginForm from './components/LoginForm.js'
import Header from './components/Header.js'
import Cart from './components/Cart.js'
import { Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {
  
  state = {
    categories: [],
    cart: [],
    id: "",
    name: "",
    username: "",
    prevPurchases: [],
    redirect: false
  }

  componentDidMount(){
    fetch('http://localhost:3000/categories')
    .then(res => res.json())
    .then(data => {
      this.setState({
        categories: data
      })
    })
  }

  createAccount = (name, username) => {
    fetch('http://localhost:3000/hamsters', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({
        name: name,
        username: username
      })
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        id: data.id,
        name: data.name,
        username: data.username
      })
    })
  }

  handleLogin = (hamster) => {
    fetch(`http://localhost:3000/hamsters/${hamster.id}`)
    .then(res => res.json())
    .then(data => {
      this.setState({
        id: data.id,
        name: data.name,
        username: data.username,
        prevPurchases: data.items
      })
    })
  }
  
  addToCart = (item) => {
    this.setState({
      cart: [...this.state.cart, item]
    })
  }

  
  submitOrder = () => {
    const prevCart = this.state.cart

    fetch('http://localhost:3000/items', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(
        {
          hamster_id: this.state.id,
          cart: this.state.cart
        }
      )
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        categories: data,
        cart: [],
        prevPurchases: [...this.state.prevPurchases, ...prevCart]
      })
    })
  }

  logout = () => {
    this.setState({
        categories: [],
        name: "",
        username: "",
        cart: [],
        prevPurchases: [],
        redirect: !this.state.redirect
    })
  }

  render(){
    
    return (
      <div className="App">
          <HeaderContainer />
          { this.state.username ? <Header hamster={this.state.name} cart={this.state.cart} logout={this.logout}/> : <Welcome /> }
          { this.state.redirect ? <Redirect to='/'/> : null }


          <Switch>
            <Route path='/login' render={(routerProps) => <LoginForm handleLogin={this.handleLogin}/>}/>
            <Route path='/create' render={(routerProps) => <CreateAccount createAccount={this.createAccount}/>}/>
            {/* <Route path='/welcome' component={Welcome}/> */}
            <Route path='/products' render={(routerProps) => <ItemContainer categories={this.state.categories} cart={this.state.cart} addToCart={this.addToCart}/>}/>
            <Route path='/cart' render={(routerProps) => <Cart remove={this.removeFromCart} cartItems={this.state.cart} prevPurchases={this.state.prevPurchases} submitOrder={this.submitOrder} removeFromCart={this.removeFromCart}/>} />
          </Switch>

      </div>
    );
  }
}

export default App;
