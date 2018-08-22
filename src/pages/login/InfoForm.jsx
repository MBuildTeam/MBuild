import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox ,message} from 'antd';
import { connect } from 'react-redux'
import { login,clearMsg } from '../../redux/auth.redux'

const { create, Item } = Form;

@create()
@connect(
    state => state.auth,
    { login,clearMsg }
)
class InfoForm extends Component {
    componentDidUpdate(){
        if(this.props.msg){
            message.error(this.props.msg)
            this.props.clearMsg()
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values)
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Item>
                    {getFieldDecorator('loginname', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                    )}
                </Item>
                <Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                </Item>
                <Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox style={{ float: 'right' }}>记住我</Checkbox>
                    )}
                </Item>
                <Button size="large" type="primary" htmlType="submit" className="login-form-button">
                    登录
                </Button>
            </Form>
        );
    }
}


export default InfoForm