class Header extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <nav className={`navbar navbar-primary ${this.props.transparent ? "navbar-transparent navbar-color-on-scroll" : ""} navbar-fixed-top`} role="navigation"
                color-on-scroll="100">
                <div className="container">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="/">
                            <img src="assets/img/logo.png" alt="" />
                        </a>
                    </div>
                </div>
            </nav>
        );
    }
}

var root = document.getElementById('header');
ReactDOM.render(
    <Header {...(root.dataset)}/>,
    root
);