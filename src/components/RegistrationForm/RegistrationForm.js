import React, { Component } from 'react';
import { Input, Required, Label } from '../Form/Form';
import AuthApiService from '../../services/auth-api-service';
import Button from '../Button/Button';
import './RegistrationForm.css';

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  state = { error: null }
  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { name, username, password } = ev.target
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then(user => {
        name.value = ''
        username.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state
    return (
      <fieldset>
        <form
          className='RegisterForm'
          onSubmit={this.handleSubmit}
        >
          <div role='alert'>
            {error && <p className='form-error'>{error}</p>}
          </div>
          <div>
            <Label htmlFor='registration-name-input' className='register-label'>
              Full name<Required />
            </Label>
            <Input
              className='register-input'
              ref={this.firstInput}
              id='registration-name-input'
              name='name'
              required
            />
          </div>
          <div>
            <Label htmlFor='registration-username-input' className='register-label'>
              Username<Required />
            </Label>
            <Input
              className='register-input'
              id='registration-username-input'
              name='username'
              required
            />
          </div>
          <div>
            <Label htmlFor='registration-password-input' className='register-label'>
              Password<Required />
            </Label>
            <Input
              className='register-input'
              id='registration-password-input'
              name='password'
              type='password'
              required
            />
          </div>
          <footer>
            <Button type='submit' className='button'>
              Sign up
            </Button>
          </footer>
        </form>
      </fieldset>
    )
  }
}

export default RegistrationForm;