class Footer extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <div className="container">
                    <a className="footer-brand [ col-xs-4 col-sm-2 col-md-2 ]" href="/">
                        <img className="[ img-responsive ]" src="assets/img/logo.png" alt="" />
                    </a>

                    <ul className="social-buttons pull-right">
                        <li>
                            <a href="https://www.facebook.com/Protomaquia" target="_blank" className="btn btn-just-icon btn-simple">
                                <i className="fa fa-facebook-square"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/protomaquia" target="_blank"
                                className="btn btn-just-icon btn-simple">
                                <i className="fa fa-instagram"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="copyright pull-center">
                    Copyright © {new Date().getFullYear()} Protomaquia
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Footer />,
    document.getElementById('footer')
);