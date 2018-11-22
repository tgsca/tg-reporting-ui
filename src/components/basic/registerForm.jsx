import React from 'react';
import Joi from 'joi-browser';
import { Redirect } from 'react-router-dom';
import Form from '../common/form';
import { register } from '../../services/basic/userService';
import auth from '../../services/basic/authService';

class RegisterForm extends Form {
    state = {
        data: {
            email: '',
            password: '',
            name: ''
        },
        errors: {}
    };

    schema = {
        email: Joi.string()
            .email()
            .required()
            .label('E-Mail'),
        password: Joi.string()
            .min(5)
            .required()
            .label('Password'),
        name: Joi.string().label('Name')
    };

    doSubmit = async () => {
        try {
            const { headers } = await register(this.state.data);
            auth.loginWithJwt(headers['x-auth-token']);
            window.location = '/';
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.email = ex.response.data;
                this.setState({ errors });
            }
        }
    };

    render() {
        if (auth.getCurrentUser()) return <Redirect to="/" />;

        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('email', 'E-Mail')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderInput('name', 'Name')}
                    {this.renderButton('Register')}
                </form>
            </div>
        );
    }
}

export default RegisterForm;
