import React, { PureComponent } from 'react'
import { Modal } from 'antd'
import { connect } from 'react-redux'
import { handleModalForm } from '../../redux/organization.redux'
import OrgaForm from './OrgaForm'


@connect(
    state => state.organization,
    { handleModalForm }
)
class OrgaModal extends PureComponent {
    handleSubmit = () => {
        let form=this.refs.orgaForm
        form.validateFields((err, values) => {
          if(!err){
            console.log(values)
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
                <OrgaForm formType={formType} formData={formData} ref="orgaForm"/>
            </Modal>
        )
    }
}
export default OrgaModal