import React, { PureComponent } from 'react'
import { Form, Input, Select } from 'antd'
import { connect } from 'react-redux'

const { Item, create } = Form
const { Option } = Select

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
                            <Input type="hidden" />
                        )}
                    </Item> : null
                }
                <Item
                    {...formItemLayout}
                    label="名称"
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
                    label="描述"
                    hasFeedback
                >
                    {getFieldDecorator('Description', {
                        rules: [{
                            required: true, message: '描述不能为空',
                        }],
                    })(
                        <Input />
                    )}
                </Item>
               <Item
                    {...formItemLayout}
                    label="关联角色"
                    hasFeedback
                >
                    {getFieldDecorator('Roles')(
                        <Select
                            mode="multiple"
                        >
                            {
                                this.props.roleList.map(v => {
                                    return (
                                        <Option key={v.id} value={v.id}>
                                            {v.name}
                                        </Option>
                                    )
                                })
                            }
                        </Select>
                    )}
                </Item>
                <Item
                    {...formItemLayout}
                    label="关联用户"
                    hasFeedback
                >
                    {getFieldDecorator('Users')(
                        <Select
                            mode="multiple"
                        >
                            {
                                this.props.userList.map(v => {
                                    return (
                                        <Option key={v.id} value={v.id}>
                                            {v.name}
                                        </Option>
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