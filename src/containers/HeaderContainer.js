import React, { Component } from 'react'
import LoginForm from '../components/LoginForm.js'
import Header from '../components/Header.js'
import { Link } from 'react-router-dom'


class HeaderContainer extends React.Component {

    render() {   
        return (
            <div className="header">
                <h2 id="logo" >Shopping Site</h2>
            </div>
        )
    }
}

export default HeaderContainer