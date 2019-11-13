import React, { Component } from 'react'

class Item extends React.Component {
    
    inCart = (item) => {    
        if (this.props.cart.length !== 0) {    
            return this.props.cart.includes(item)
        } {
            return false
        }
    }

    state = {
        disabled: this.inCart(this.props.item)
    }
    

    add = (item) => {
        this.props.addToCart(item)
        this.setState({
            disabled: true
        })
    }

    removed = () => {

    }

    
    render() {

        return (
            <div>
                <h5>{this.props.item.name} <button disabled={this.state.disabled} onClick={() => this.add(this.props.item)}>add to cart</button></h5>
            </div>
        )
    }
}

export default Item