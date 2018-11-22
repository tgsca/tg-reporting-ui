import React from 'react';
import Form from '../common/form';
import auth from '../../services/basic/authService';

class Profile extends Form {
    state = {
        data: {
            name: '',
            email: ''
        },
        errors: []
    };

    componentDidMount() {
        const user = auth.getCurrentUser();
        this.setState({ data: { name: user.name, email: user.email } });
    }

    render() {
        return (
            <div className="card border-light mb-12">
                <div className="card-header">Profile</div>
                <div className="card-body">
                    <div className="card-text">
                        <form onSubmit={null}>
                            {this.renderInput('name', 'Name')}
                            {this.renderInput('email', 'E-Mail')}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
