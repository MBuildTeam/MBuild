import React, { PureComponent } from 'react'
import { Form, Row, Col, Input, Button, Radio } from 'antd'

const RadioGroup = Radio.Group

@Form.create()
class SearchForm extends PureComponent {
    handleReset = () => {
        console.log(this.props.form)
        this.props.form.resetFields();
      }
    render() {
        return (
            <Form className="search-form">
                <Row gutter={16}>
                    <Col span={8} className="field">
                        <div className="label">名称</div>
                        <Input className="input"/>
                    </Col>
                    <Col span={8} className="field">
                        <div className="label">url</div>
                        <Input  className="input"/>
                    </Col>
                    <Col span={8} className="field">
                        <div className="label">状态</div>
                        <RadioGroup className="input">
                            <Radio value="" checked>全部</Radio>
                            <Radio value="1">启用</Radio>
                            <Radio value="2">不启用</Radio>
                        </RadioGroup>
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