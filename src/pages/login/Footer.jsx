import React from 'react'

class Footer extends React.Component {
    render() {
        return (
            <div id="login-foot">
                ©{new Date().getFullYear()}&nbsp;
                京ICP证030173号&nbsp;
                <i class="c-icon-icrlogo"></i>&nbsp;
                <a id="jgwab" target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11000002000001">
                    京公网安备11000002000001号</a>&nbsp;
                <i class="c-icon-jgwablogo"></i>
            </div>
        )
    }
}

export default Footer