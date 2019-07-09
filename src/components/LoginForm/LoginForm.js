import React, { Component } from 'react';
import { Input, Label } from '../Form/Form';
import AuthApiService from '../../services/auth-api-service';
import UserContext from '../../contexts/UserContext';
import Button from '../Button/Button';
import './LoginForm.css';

class LoginForm extends Component {
  render() {
    return (
      <fieldset>
        <form
          className='LoginForm'
          onSubmit={this.handleSubmit}
        >
          <div>
            <Label htmlFor='login-username-input' className='form-label'>
              Username
            </Label>
            <Input
              className='form-input'
              ref={this.firstInput}
              id='login-username-input'
              name='username'
              required
            />
          </div>
          <div>
            <Label htmlFor='login-password-input' className='form-label'>
              Password
            </Label>
            <Input
              className='form-input'
              id='login-password-input'
              name='password'
              type='password'
              required
            />
          </div>
          <Button type='submit' className='button'>
            Login
          </Button>
        </form>
      </fieldset>
    )
  }
}
export default LoginForm