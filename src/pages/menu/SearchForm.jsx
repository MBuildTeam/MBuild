import React, { PureComponent } from 'react'
import { Form, Row, Col, Input, Button, Radio } from 'antd'

const RadioGroup = Radio.Group
const { Item, create } = Form

@create()
class SearchForm extends PureComponent {
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        });
    }
    handleReset = () => {
        console.log(this.props.form)
        this.props.form.resetFields();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className="search-form" onSubmit={this.handleSearch}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Item label="菜单名">
                            {getFieldDecorator('Name')(
                                <Input />
                            )}
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item label="URL">
                            {getFieldDecorator('Url')(
                                <Input />
                            )}
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item label="状态">
                            {getFieldDecorator('Status')(
                                <RadioGroup>
                                    <Radio value="1">启用</Radio>
                                    <Radio value="2">不启用</Radio>
                                </RadioGroup>
                            )}
                        </Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">查询</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default SearchForm