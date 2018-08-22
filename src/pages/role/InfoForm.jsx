import React, { PureComponent } from 'react'
import { Form, Input, Select } from 'antd'
import { connect } from 'react-redux'

const { Item, create } = Form
const { Option } = Select

@create()
@connect(
    state => state.role
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
                    formType === 'edit' ? <Item>
                        {getFieldDecorator('ID')(
                            <Input type="hidden" />
                        )}
                    </Item> : null
                }
                <Item
                    {...formItemLayout}
                    label="名称"
                    hasFeedback
                >
                    {getFieldDecorator('Name', {
                        rules: [{
                            required: true, message: '名称不能为空',
                        }],
                    })(
                        <Input />
                    )}
                </Item>
                <Item
                    {...formItemLayout}
                    label="权限"
                    hasFeedback
                >
                    {getFieldDecorator('Rights')(
                        <Select
                            mode="multiple"
                        >
                            {
                                this.props.rightsList.map(v => {
                                    return (
                                        <Option key={v.ID} value={v.ID}>
                                            {v.Name}
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