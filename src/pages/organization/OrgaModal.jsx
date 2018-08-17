import React, { PureComponent } from 'react'
import { Modal } from 'antd'
import { connect } from 'react-redux'
import { handleModalForm, addOrga, editOrga } from '../../redux/organization.redux'
import OrgaForm from './OrgaForm'


@connect(
    state => state.organization,
    { handleModalForm, addOrga, editOrga }
)
class OrgaModal extends PureComponent {
    handleSubmit = () => {
        const form = this.refs.orgaForm
        const { formType,addOrga,editOrga } = this.props
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                if (formType === 'add') {
                    addOrga(values)
                } else if (formType === 'edit') {
                    editOrga(values)
                }
            }
        })
    }
    render() {
        const { formType, modalOpen, formData } = this.props
        return (
            <Modal
                title={formType === 'add' ? '新增' : '编辑'}
                visible={modalOpen}
                okText='确认'
                cancelText='取消'
                maskClosable={false}
                onOk={this.handleSubmit}
                onCancel={() => { this.props.handleModalForm(formType, false) }}
            >
                <OrgaForm formType={formType} formData={formData} ref="orgaForm" />
            </Modal>
        )
    }
}
export default OrgaModal