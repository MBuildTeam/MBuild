import React, { PureComponent } from 'react'
import { Form, Input, Select, Radio } from 'antd'
import { connect } from 'react-redux'

const { Item, create } = Form

@create({
    mapPropsToFields(props) {
        if (props.formType === 'update') {
            let fields = {}
            for (let key in props.formData) {
                fields[key] = Form.createFormField({
                    value: props.formData[key]
                })
            }
            return fields
        }
    }
})
@connect(
    state => state.usergroup
)
class InfoForm extends PureComponent {
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        }
        const { formType, form } = this.props
        const { getFieldDecorator } = form
        return (
            <Form>
                {
                    formType === 'update' ? <Item>
                        {getFieldDecorator('id')(
                            <Input type='hidden' />
                        )}
                    </Item> : null
                }
                <Item
                    {...formItemLayout}
                    label='名称'
                    hasFeedback
                >
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: '名称不能为空',
                        }],
                    })(
                        <Input />
                    )}
                </Item>
                <Item
                    {...formItemLayout}
                    label='描述'
                    hasFeedback
                >
                    {getFieldDecorator('description', {
                        rules: [{
                            required: true, message: '描述不能为空',
                        }],
                    })(
                        <Input />
                    )}
                </Item>
                <Item
                    {...formItemLayout}
                    label='状态'
                    hasFeedback
                >
                    {getFieldDecorator('status', {
                        rules: [{
                            required: true, message: '状态不能为空',
                        }],
                    })(
                        <Radio.Group>
                            <Radio value={0}>启用</Radio>
                            <Radio value={1}>停用</Radio>
                        </Radio.Group>
                    )}
                </Item>
                <Item
                    {...formItemLayout}
                    label='关联角色'
                    hasFeedback
                >
                    {getFieldDecorator('roleids')(
                        <Select
                            mode='multiple'
                        >
                            {
                                this.props.roleList.map(v => {
                                    return (
                                        <Select.Option key={v.id} value={v.id}>
                                            {v.name}
                                        </Select.Option>
                                    )
                                })
                            }
                        </Select>
                    )}
                </Item>
                <Item
                    {...formItemLayout}
                    label='关联用户'
                    hasFeedback
                >
                    {getFieldDecorator('roleids')(
                        <Select
                            mode='multiple'
                        >
                            {
                                this.props.roleList.map(v => {
                                    return (
                                        <Select.Option key={v.id} value={v.id}>
                                            {v.name}
                                        </Select.Option>
                                    )
                                })
                            }
                        </Select>
                    )}
                </Item>
            </Form>
        )
    }
}
export default InfoForm