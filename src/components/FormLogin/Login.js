import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "./../../resources/css/main.css";
import Axios from "axios";
import $ from "jquery";
import { loginUserRequest } from "../../actions";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  componentDidMount() {
    $(".input100").each(function() {
      $(this).on("blur", function() {
        if (
          $(this)
            .val()
            .trim() !== ""
        ) {
          $(this).addClass("has-val");
        } else {
          $(this).removeClass("has-val");
        }
      });
    });
  }
  onChange = e => {
    var target = e.target;
    var value = target.value;
    var name = target.name;
    this.setState({
      [name]: value
    });
  };
  login = e => {
    const { history } = this.props;
    e.preventDefault();
    var dataUser = {
      Username: this.state.username,
      Password: this.state.password
    };
    this.props.onLoginUser(dataUser);
    history.push("/dashboard");
    // Axios({
    //   method: "post",
    //   url: "http://localhost:56524/Login",
    //   data: {
    //     UserName: this.state.username,
    //     Password: this.state.password
    //   }
    // })
    //   .then(res => {
    //     console.log(res);
    //     localStorage.setItem("username", res.data.Username);
    //     history.push("/dashboard");
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     alert("Wrong password or username");
    //   });
    // history.push("/dashboard");
  };
  render() {
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form className="login100-form validate-form" onSubmit={this.login}>
              <span className="login100-form-title mb-5">
                DNA Testing Process Management
              </span>
              <span className="login100-form-title custom-icon-dna mb-5">
                <i className="fas fa-dna" />
              </span>

              <div
                className="wrap-input100 validate-input"
                data-validate="Valid email is: a@b.c"
              >
                <input
                  className="input100"
                  type="text"
                  name="username"
                  onChange={this.onChange}
                />
                <span className="focus-input100" data-placeholder="Email" />
              </div>

              <div
                className="wrap-input100 validate-input"
                data-validate="Enter password"
              >
                <span className="btn-show-pass">
                  <i className="zmdi zmdi-eye" />
                </span>
                <input
                  className="input100"
                  type="password"
                  name="password"
                  onChange={this.onChange}
                />
                <span className="focus-input100" data-placeholder="Password" />
              </div>

              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn" />
                  <button className="login100-form-btn">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    onLoginUser: dataUser => {
      dispatch(loginUserRequest(dataUser));
    }
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Login);
