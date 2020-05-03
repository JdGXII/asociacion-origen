'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Formulario = function (_React$Component) {
    _inherits(Formulario, _React$Component);

    function Formulario(props) {
        _classCallCheck(this, Formulario);

        var _this = _possibleConstructorReturn(this, (Formulario.__proto__ || Object.getPrototypeOf(Formulario)).call(this, props));

        _this.state = {
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

        _this.handleInputChange = _this.handleInputChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.getFormErrors = _this.getFormErrors;
        return _this;
    }

    _createClass(Formulario, [{
        key: 'handleInputChange',
        value: function handleInputChange(event) {
            var target = event.target;
            var value = target.value;
            var name = target.name;

            this.setState(_defineProperty({}, name, value));
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            var _this2 = this;

            var formErrors = this.getFormErrors();
            this.setState({
                errors: formErrors
            });

            e.preventDefault();

            if (!formErrors.email && !formErrors.name && !formErrors.project && !formErrors.message) {
                var requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nombre: this.state.nombre,
                        email: this.state.email,
                        project: this.state.project,
                        message: this.state.message
                    })
                };
                fetch('/api/index.php', requestOptions).then(function (response) {
                    response.json().then(function (result) {
                        if (result.sent) {
                            _this2.setState({
                                submitSuccess: true,
                                submitFailure: false,
                                nombre: '',
                                email: '',
                                project: '',
                                message: ''
                            });
                            setTimeout(function () {
                                return _this2.setState({ submitSuccess: false });
                            }, 5000);
                        } else {
                            _this2.setState({ submitFailure: true });
                        }
                    });
                });
            }
        }
    }, {
        key: 'getFormErrors',
        value: function getFormErrors() {
            var errors = {
                name: false,
                email: false,
                project: false,
                message: false
            };
            var regex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/, 'i');
            if (this.state.nombre === "") errors.name = true;
            if (!regex.test(this.state.email)) errors.email = true;
            if (this.state.project === "") errors.project = true;
            if (this.state.message === "") errors.message = true;

            return errors;
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'form',
                { noValidate: true, role: 'form', id: 'contact-form', method: 'post', onSubmit: this.handleSubmit },
                React.createElement(
                    'span',
                    { className: 'success-message ' + (this.state.submitSuccess ? "submit-success" : "") },
                    React.createElement(
                        'div',
                        { className: 'alert alert-success' },
                        React.createElement(
                            'div',
                            { className: 'alert-icon' },
                            React.createElement(
                                'i',
                                { className: 'material-icons' },
                                'check'
                            )
                        ),
                        React.createElement(
                            'strong',
                            null,
                            'Envi\xF3 exitoso:'
                        ),
                        ' pronto nos pondremos en contacto contigo.'
                    )
                ),
                React.createElement(
                    'span',
                    { className: 'failure-message ' + (this.state.submitFailure ? "submit-failure" : "") },
                    React.createElement(
                        'div',
                        { className: 'alert alert-failure' },
                        React.createElement(
                            'div',
                            { className: 'alert-icon' },
                            React.createElement(
                                'i',
                                { className: 'material-icons' },
                                'check'
                            )
                        ),
                        React.createElement(
                            'strong',
                            null,
                            'Algo sali\xF3 mal,'
                        ),
                        ' por favor vuelve a intentarlo m\xE1s tarde.'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'form-group label-floating ' + (this.state.errors.name ? "has-error" : "") },
                    React.createElement(
                        'label',
                        { className: 'control-label', htmlFor: 'name' },
                        'Nombre'
                    ),
                    React.createElement('input', { required: true, onChange: this.handleInputChange, value: this.state.nombre, type: 'text', name: 'nombre', className: 'form-control' }),
                    React.createElement(
                        'span',
                        { className: 'input-error [ text-danger ]' },
                        React.createElement(
                            'small',
                            null,
                            'Por favor dinos tu nombre'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'form-group label-floating ' + (this.state.errors.email ? "has-error" : "") },
                    React.createElement(
                        'label',
                        { className: 'control-label' },
                        'Correo'
                    ),
                    React.createElement('input', { required: true, onChange: this.handleInputChange, value: this.state.email, type: 'email', name: 'email', className: 'form-control' }),
                    React.createElement(
                        'span',
                        { className: 'email-error input-error [ text-danger ]' },
                        React.createElement(
                            'small',
                            null,
                            'Por favor introduce una direcci\xF3n de correo v\xE1lida'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'form-group label-floating ' + (this.state.errors.project ? "has-error" : "") },
                    React.createElement(
                        'label',
                        { className: 'control-label' },
                        'Ciudad'
                    ),
                    React.createElement('input', { required: true, onChange: this.handleInputChange, value: this.state.project, type: 'text', name: 'project', className: 'form-control' }),
                    React.createElement(
                        'span',
                        { className: 'input-error [ text-danger ]' },
                        React.createElement(
                            'small',
                            null,
                            'Por favor ingresa tu ciudad'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'form-group label-floating ' + (this.state.errors.message ? "has-error" : "") },
                    React.createElement(
                        'label',
                        { className: 'control-label' },
                        'Déjanos tu mensaje'
                    ),
                    React.createElement('textarea', { required: true, onChange: this.handleInputChange, value: this.state.message, name: 'message', className: 'form-control', id: 'message', rows: '6' }),
                    React.createElement(
                        'span',
                        { className: 'input-error [ text-danger ]' },
                        React.createElement(
                            'small',
                            null,
                            'Por favor introduce tu mensaje'
                        )
                    )
                ),
                React.createElement(
                    'p',
                    { className: '[ description ][ text-center ]' },
                    React.createElement(
                        'small',
                        null,
                        'Al hacer click en "Enviar" acepto la ',
                        React.createElement(
                            'a',
                            { href: 'politica-privacidad.pdf' },
                            'pol\xEDtica de privacidad'
                        ),
                        ' y el env\xEDo de informaci\xF3n a ORIGEN.'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'submit text-center' },
                    React.createElement('input', { type: 'submit', className: 'btn btn-primary btn-raised btn-round btn-block', value: 'Enviar' })
                )
            );
        }
    }]);

    return Formulario;
}(React.Component);

ReactDOM.render(React.createElement(Formulario, null), document.getElementById('formulario'));