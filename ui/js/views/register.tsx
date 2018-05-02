'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import { registerAct } from '../actions/registerActions';

class Register extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { form: { firstName: '', lastName: '', email: '', pwd: '' } }
  }

  handleChange(e: any) {
    e.preventDefault();
    // console.log(e.target.name);

    if (e.target.name === 'regForm') {
      this.props.registerDispatch(this.state.form)
    } else {
      this.setState({
        form: {
          ...this.state.form,
          [e.target.name]: e.target.value
        }
      })
    }
  }

  componentDidMount() {
    document.body.className = '';
  }

  render() {
    return (
      <form name="regForm" className="register-form" onSubmit={e => this.handleChange(e)}>
        <div className="logo"></div>
        <input autoFocus type="text" name="firstName" placeholder="First name" value={this.state.form.firstName}
          onChange={e => this.handleChange(e)} />
        <input type="text" name="lastName" placeholder="Last name" value={this.state.form.lastName}
          onChange={e => this.handleChange(e)} />
        <input type="email" name="email" placeholder="Email" value={this.state.form.email}
          onChange={e => this.handleChange(e)} />
        <input type="password" name="pwd" placeholder="Password" value={this.state.form.pwd}
          onChange={e => this.handleChange(e)} />
        <span className="sign-up">
          <a href="#/" className="sign-up-link">Go to login</a>
        </span>
        <input type="submit" value="Register" />
      </form>
    )
  }
}

// Here store is the masterStore defined in index.tsx
const mapStateToProps = (store: any) => ({
});

const mapDispatchToProps = (dispatch: any) => ({
  registerDispatch: (form: any) => {
    dispatch(registerAct(form))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);