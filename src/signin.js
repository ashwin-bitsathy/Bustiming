import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        
        email: "",
        
        password: ""
        
      },
      formErrors: {
        
        email: null,
       
        password: null
        
      }
    };
  }



  handleChange = e => {
    const { name, value, checked } = e.target;
    const { form, formErrors } = this.state;
    let formObj = {};
    //console.log(name);
    
      // handle change event except language field
      formObj = {
        ...form,
        [name]: value
      };
    
    this.setState({ form: formObj }, () => {
      if (!Object.keys(formErrors).includes(name)) return;
     
  });
 }

  validateField = (name, value) => {
    let errorMsg = null;
    //console.log(value)
    switch (name) {
      
      case "email":
        if (!value) errorMsg = "Please enter Email.";
        else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value))
          errorMsg = "Please enter valid Email.";
        break;
      
      case "password":
        // refValue is the value of Confirm Password field
        if (!value) errorMsg = "Please enter Password.";
        break;
      
      default:
        break;
    }
    return errorMsg;
  };

  
validateForm = (form, formErrors, validateFunc) => {
    const errorObj = {};
    Object.keys(formErrors).map(x => {
      let refValue = null;
      
      const msg = validateFunc(x, form[x]);
      if (msg) errorObj[x] = msg;
    });
    return errorObj;
  };

  toSigupPage =()=>{
    console.log("toSigupPage");
    console.log(this.props);
    this.props.history.push('/signup');
  }
  handleSubmit = () => {
    const { form, formErrors } = this.state;
    const errorObj = this.validateForm(form, formErrors, this.validateField);
    if (Object.keys(errorObj).length !== 0) {
      this.setState({ formErrors: { ...formErrors, ...errorObj } });
      return false;
    }
    //console.log('Data: ', form);
    axios.get('http://localhost:5000/form?email_like='+ this.state.form.email  ).then(resp => {

                console.log(this.state.form.email);

    if(resp.data !== null )
    {

resp.data.map(item =>{

	if(item.email === this.state.form.email && item.password === this.state.form.password)
	{
		this.props.history.push('/bus');
	}
})
    }
                /*if(resp.data.length===0)
                {
                  axios.post("http://localhost:5000/form",form)
                    
                }
                else
                {

                }*/
            }).catch(error => {

                console.log(error);
            });
    
  };

  render() {
    const { form, formErrors } = this.state;
    return (
    	<div>
      <h1>Signin-page</h1>
      <div className="form-group">
              <label>
                Email:<span className="asterisk">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                name="email"
                value={form.email}
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              {formErrors.email && <span className="err">{formErrors.email}</span>}
            </div>
        <div className="form-group">
              <label>
                Password:<span className="asterisk">*</span>
              </label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={form.password}
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              {formErrors.password && <span className="err">{formErrors.password}</span>}
            </div>
            <div className="form-group">
          <input
            type="button"
            className="btn btn-primary"
            value="Signin"
            onClick={this.handleSubmit}
          />
           &nbsp; &nbsp;
          <input
            type="button"
            className="btn btn-primary"
            value="Sigup"
            onClick={this.toSigupPage}
          />
        </div>
          </div>
    );
  }
}

export default withRouter(Signin);