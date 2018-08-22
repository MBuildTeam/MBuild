/**
 * Created by 30113 on 2018/6/6.
 */
import React from "react";
import { Icon, Input, Button, Checkbox } from "antd";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login, changeInput } from "../../redux/auth.redux";
import ".Login.scss";

@connect(
  state => state.auth,
  { login, changeInput }
)
class Login extends React.Component {
  handleLogin = () => {
    const { user, pwd } = this.props;
    this.props.login({ user, pwd });
  }
  render() {
    return (
      <div className="login-bg">
        {this.props.redirectTo && this.props.redirectTo !== "/login" ? (
          <Redirect to={this.props.redirectTo} />
        ) : null}
        <div className="login-form">
          <div className="item">
            <Input
              type="text"
              size="large"
              onChange={v => this.props.changeInput("user", v.target.value)}
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="用户名"
            />
          </div>
          <div className="item">
            <Input
              type="password"
              size="large"
              onChange={v => this.props.changeInput("pwd", v.target.value)}
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="密码"
            />
          </div>
          <Button
            size="large"
            className="login-button"
            type="primary"
            onClick={this.handleLogin}
          >
            login
          </Button>
        </div>
      </div>
    );
  }
}

export default Login;
