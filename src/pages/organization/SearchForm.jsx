import React, { PureComponent } from 'react'
import { Form, Row, Col, Input, Button, Radio } from 'antd'
import { connect } from 'react-redux'
import { getList } from '../../redux/organization.redux'

const RadioGroup = Radio.Group
const { Item, create } = Form

@create({
    mapPropsToFields(props) {
        if (props.searchForm) {
            let fields = {}
            for (let key in props.searchForm) {
                fields[key] = Form.createFormField({
                    value: props.searchForm[key]
                })
            }
            return fields
        }
    }
})
@connect(
    state => state.organization,
    { getList }
)
class SearchForm extends PureComponent {
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.getList(values)
            }
        })
    }
    handleReset = () => {
        this.props.form.resetFields()
        this.props.getList()
    }
    componentDidMount() {
        //todo:这里可以做一个优化，区分第一次打开和标签切换
        this.props.getList()
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form onSubmit={this.handleSearch}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Item label="名称">
                            {getFieldDecorator('name')(
                                <Input />
                            )}
                        </Item>
                    </Col>
                    <Col span={6}>
                        <Item label="状态">
                            {getFieldDecorator('status')(
                                <RadioGroup>
                                    <Radio value={0}>启用</Radio>
                                    <Radio value={1}>停用</Radio>
                                </RadioGroup>
                            )}
                        </Item>
                    </Col>
                    <Col span={6}>
                        <Item label="管理平台">
                            {getFieldDecorator('ismanagerplatform')(
                                <RadioGroup>
                                    <Radio value={1}>是</Radio>
                                    <Radio value={0}>否</Radio>
                                </RadioGroup>
                            )}
                        </Item>
                    </Col>
                    <Col span={6}>
                        <Button type="primary" htmlType="submit">查询</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>

                    </Col>
                </Row>
            </Form>
        )
    }
}

export default SearchForm