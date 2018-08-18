import React, { PureComponent } from 'react'
import { Input, Select, Button } from 'antd'
import { connect } from 'react-redux'
import { addRole, changeAddForm } from '../../redux/role.redux'

const Option = Select.Option

@connect(
    state => state.role,
    { addRole, changeAddForm }
)
class AddForm extends PureComponent {
    handleChange(key, value) {
        this.props.changeAddForm(key, value)
    }
    render() {
        const { roleName, rights } = this.props.addForm
        return (
            <div className="flex-form">
                <div className="field required width-3">
                    <div className="label">角色名</div>
                    <Input
                        className={roleName.error?'input input-error':'input'}
                        value={roleName.value}
                        onChange={e => this.handleChange('roleName', e.target.value)} />
                    <div className="error">{roleName.error}</div>
                </div>
                <div className="field width-5">
                    <div className="label">权限</div>
                    <Select className="input" mode="tags" style={{ width: '100%' }}>
                        <Option key={1}>1</Option>
                    </Select>
                </div>
                <div className="field width-2">
                    <Button
                        className="btn"
                        type="primary"
                    >新增</Button>
                    <Button
                        className="btn"
                        type="default"
                    >重置</Button>
                </div>
            </div>
        )
    }
}
export default AddForm