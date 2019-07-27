import React, { Component } from 'react';
import LoginForm from "./../../components/FormLogin/Login"
class Login extends Component {
    render() {
        return (
            <LoginForm history={this.props.history}/>
        );
    }
}

export default Login;