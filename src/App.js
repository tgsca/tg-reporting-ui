import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Container from 'react-bootstrap/lib/Container';
import ProtectedRoute from './components/common/protectedRoute';
import NavBar from './components/basic/navBar';
import Dashboard from './components/dashboard';
import Logout from './components/basic/logout';
import RegisterForm from './components/basic/registerForm';
import LoginForm from './components/basic/loginForm';
import NotFound from './components/basic/notFound';
import Profile from './components/basic/profile';
import Admin from './components/basic/admin';
import Projects from './components/projects';
import ProjectForm from './components/projectForm';
import CycleForm from './components/cycleForm';
import auth from './services/basic/authService';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
    state = {};

    componentDidMount() {
        const user = auth.getCurrentUser();
        this.setState({ user });
    }

    render() {
        return (
            <React.Fragment>
                <ToastContainer />
                <NavBar user={this.state.user} />
                <Container>
                    <Switch>
                        <Route path="/logout" component={Logout} />
                        <Route path="/register" component={RegisterForm} />
                        <Route path="/login" component={LoginForm} />
                        <Route path="/dashboard" component={Dashboard} />
                        <ProtectedRoute path="/cycles/:id" component={CycleForm} />
                        <ProtectedRoute path="/cycles/new" component={CycleForm} />
                        <ProtectedRoute path="/projects/:id" component={ProjectForm} />
                        <ProtectedRoute path="/projects/new" component={ProjectForm} />
                        <Route path="/projects" component={Projects} />
                        <ProtectedRoute path="/profile" component={Profile} />
                        <ProtectedRoute path="/admin" component={Admin} />
                        <Route path="/not-found" component={NotFound} />
                        <Redirect from="/" exact to="/dashboard" />
                        <Redirect to="/not-found" />
                    </Switch>
                </Container>
            </React.Fragment>
        );
    }
}

export default App;
