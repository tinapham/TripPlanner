import React from 'react';
import './styles.css';
class Footer extends React.Component {
    render() {
        const { styles } = this.props;
        return (
            <div className="footer-wrapper row" style={styles}>
                <div className="footer-left col-md-5">
                    <h3><span>Da Nang University of Science and Technology</span></h3>
                    <p className="footer-company-name">Copyright 2018 © Quynh Anh Graduation Thesis. All rights reversed</p>
                </div>
                <div className="footer-center col-md-4">
                    <div>
                        <i className="fa fa-map-marker "></i>
                        <p><span>54 Nguyen Luong Bang Str, Lien Chieu Dist</span> Da Nang City, Vietnam</p>
                    </div>
                    <div>
                        <i className="fa fa-phone "></i>
                        <p>01264057372</p>
                    </div>

                </div>
                <div className="footer-right col-md-3">
                    <div className="mail-icon"> 
                        <i className="fa fa-envelope "></i>
                        <p><a href="mailto:support@company.com">tinapham1802@gmail.com</a></p>
                    </div>
                    <div className="footer-icons">
                        <a href="https://www.facebook.com/tinapham1802"><i className="fa fa-facebook"></i></a>
                        <a href="https://twitter.com/TinaPha42582280"><i className="fa fa-twitter"></i></a>
                        <a href="https://www.linkedin.com/in/anh-pham-thi-quynh-930955156/"><i className="fa fa-linkedin"></i></a>
                        <a href="https://github.com/tinapham"><i className="fa fa-github"></i></a>
                    </div>
                </div>
            </div>
        )
    }
}
export default Footer;