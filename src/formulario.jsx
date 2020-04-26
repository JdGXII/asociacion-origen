class Formulario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            email: '',
            project: '',
            message: '',
            errors: {
                name: false,
                email: false,
                project: false,
                message: false
            },
            submitSuccess: false,
            submitFailure: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getFormErrors = this.getFormErrors;
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        let formErrors = this.getFormErrors()
        this.setState({
            errors: formErrors
        });

        e.preventDefault();

        if (!formErrors.email && !formErrors.name && !formErrors.project && !formErrors.message) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: this.state.nombre,
                    email: this.state.email,
                    project: this.state.project,
                    message: this.state.message
                })
            };
            fetch('/api/index.php', requestOptions)
                .then(response => {
                    response.json().then(result => {
                        if (result.sent) {
                            this.setState({
                                submitSuccess: true,
                                submitFailure: false,
                                nombre: '',
                                email: '',
                                project: '',
                                message: ''
                            });
                            setTimeout(() => this.setState({ submitSuccess: false }), 5000);
                        }
                        else{
                            this.setState({ submitFailure: true })
                        }
                    });
                });
        }
    }

    getFormErrors() {
        let errors = {
            name: false,
            email: false,
            project: false,
            message: false
        }
        let regex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/, 'i')
        if (this.state.nombre === "")
            errors.name = true;
        if (!regex.test(this.state.email))
            errors.email = true;
        if (this.state.project === "")
            errors.project = true;
        if (this.state.message === "")
            errors.message = true;


        return errors;
    }

    render() {
        return (
            <form noValidate role="form" id="contact-form" method="post" onSubmit={this.handleSubmit}>
                <span className={`success-message ${this.state.submitSuccess ? "submit-success" : ""}`}>
                    <div className="alert alert-success">
                        <div className="alert-icon">
                            <i className="material-icons">check</i>
                        </div>
                        <strong>Envió exitoso:</strong> pronto nos pondremos en contacto contigo.
                    </div>
                </span>
                <span className={`failure-message ${this.state.submitFailure ? "submit-failure" : ""}`}>
                    <div className="alert alert-failure">
                        <div className="alert-icon">
                            <i className="material-icons">check</i>
                        </div>
                        <strong>Algo salió mal,</strong> por favor vuelve a intentarlo más tarde.
                    </div>
                </span>
                <div className={`form-group label-floating ${this.state.errors.name ? "has-error" : ""}`}>
                    <label className="control-label" htmlFor="name">Nombre</label>
                    <input required onChange={this.handleInputChange} value={this.state.nombre} type="text" name="nombre" className="form-control" />
                    <span className="input-error [ text-danger ]"><small>Por favor dinos tu nombre</small></span>
                </div>

                <div className={`form-group label-floating ${this.state.errors.email ? "has-error" : ""}`}>
                    <label className="control-label">Correo</label>
                    <input required onChange={this.handleInputChange} value={this.state.email} type="email" name="email" className="form-control" />
                    <span className="email-error input-error [ text-danger ]"><small>Por favor introduce una dirección de correo válida</small></span>
                </div>

                <div className={`form-group label-floating ${this.state.errors.project ? "has-error" : ""}`}>
                    <label className="control-label">Nombre del proyecto</label>
                    <input required onChange={this.handleInputChange} value={this.state.project} type="text" name="project" className="form-control" />
                    <span className="input-error [ text-danger ]"><small>Por favor dale un nombre a tu proyecto o idea, aunque no sea el nombre definitivo</small></span>
                </div>

                <div className={`form-group label-floating ${this.state.errors.message ? "has-error" : ""}`}>
                    <label className="control-label">Descripción</label>
                    <textarea required onChange={this.handleInputChange} value={this.state.message} name="message" className="form-control" id="message" rows="6" ></textarea>
                    <span className="input-error [ text-danger ]"><small>Por favor introduce la descripción de tu idea o proyecto</small></span>
                </div>

                <p className="[ description ][ text-center ]"><small>Al hacer click en "Enviar" acepto la <a href="politica-privacidad">política de privacidad</a> y el envío de información a Protomaquia.</small></p>

                <div className="submit text-center">
                    <input type="submit" className="btn btn-primary btn-raised btn-round btn-block" value="Enviar" />
                </div>
            </form>
        );
    }
}

ReactDOM.render(
    <Formulario />,
    document.getElementById('formulario')
);