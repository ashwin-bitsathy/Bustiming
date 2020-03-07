import React, { Component } from 'react';
import axios from 'axios';
import { Alert } from 'reactstrap';
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        id:"",
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: ""
      },
      formErrors: {
        id:null,
        name: null,
        email: null,
        mobile: null,
        password: null,
        confirmPassword: null
      }
    };
  }

  validateNumber = evt => {
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === "paste") {
      key = theEvent.clipboardData.getData("text/plain");
    } else {
      // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  };

  handleChange = e => {
    const { name, value, checked } = e.target;
    const { form, formErrors } = this.state;
    let formObj = {};
    if (name === "language") {
      if (checked) {
        // push selected value in list
        formObj = { ...form };
        formObj[name].push(value);
      } else {
        // remove unchecked value from the list
        formObj = {
          ...form,
          [name]: form[name].filter(x => x !== value)
        };
      }
    } else {
      // handle change event except language field
      formObj = {
        ...form,
        [name]: value
      };
    }
    this.setState({ form: formObj }, () => {
      if (!Object.keys(formErrors).includes(name)) return;
      let formErrorsObj = {};
      if (name === "password" || name === "confirmPassword") {
        let refValue = this.state.form[
          name === "password" ? "confirmPassword" : "password"
        ];
        const errorMsg = this.validateField(name, value, refValue);
        formErrorsObj = { ...formErrors, [name]: errorMsg };
        if (!errorMsg && refValue) {
          formErrorsObj.confirmPassword = null;
          formErrorsObj.password = null;
        }
      } else {
        const errorMsg = this.validateField(
          name,
          name === "language" ? this.state.form["language"] : value
        );
        formErrorsObj = { ...formErrors, [name]: errorMsg };
      }
      this.setState({ formErrors: formErrorsObj });
    });
  }

  validateField = (name, value, refValue) => {
    let errorMsg = null;
    switch (name) {
      case "name":
        if (!value) errorMsg = "Please enter Name.";
        break;
      case "email":
        if (!value) errorMsg = "Please enter Email.";
        else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value))
          errorMsg = "Please enter valid Email.";
        break;
      case "mobile":
        if (!value) errorMsg = "Please enter Mobile.";
        break;
      case "password":
        // refValue is the value of Confirm Password field
        if (!value) errorMsg = "Please enter Password.";
        else if (refValue && value !== refValue)
          errorMsg = "Password and Confirm Password does not match.";
        break;
      case "confirmPassword":
        // refValue is the value of Password field
        if (!value) errorMsg = "Please enter Confirm Password.";
        else if (refValue && value !== refValue)
          errorMsg = "Password and Confirm Password does not match.";
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
      if (x === "password" || x === "confirmPassword") {
        refValue = form[x === "password" ? "confirmPassword" : "password"];
      }
      const msg = validateFunc(x, form[x], refValue);
      if (msg) errorObj[x] = msg;
    });
    return errorObj;
  };

  handleSubmit = () => {
    const { form, formErrors } = this.state;
    const errorObj = this.validateForm(form, formErrors, this.validateField);
    if (Object.keys(errorObj).length !== 0) {
      this.setState({ formErrors: { ...formErrors, ...errorObj } });
      return false;
    }
    //console.log('Data: ', form);
    axios.get('http://localhost:5000/form?name_like='+ this.state.form.name  ).then(resp => {

                console.log(this.state.form.name);
                console.log(resp.data);
                if(resp.data.length===0)
                {
                  axios.post("http://localhost:5000/form",form);
                    
                
                }
                
                
            }).catch(error => {

                console.log(error);
            });
    
  };

  render() {
    const { form, formErrors } = this.state;
    return (

      <div className="signup-box">
      <p>
      Note:signup page doesnot allows duplicate users

      </p>
        <p className="title">Sign up</p>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>
                Name:<span className="asterisk">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                name="name"
                value={form.name}
                onChange={this.handleChange}
                onBlur={this.handleChange}
              ></input>
              {formErrors.name && <span className="err">{formErrors.name}</span>}
            </div>
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
              <label>
                Confirm Password:<span className="asterisk">*</span>
              </label>
              <input
                className="form-control"
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              {formErrors.confirmPassword && <span className="err">{formErrors.confirmPassword}</span>}
            </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>
                Mobile:<span className="asterisk">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                name="mobile"
                value={form.mobile}
                onChange={this.handleChange}
                onBlur={this.handleChange}
                onKeyPress={this.validateNumber}
              />
              {formErrors.mobile && <span className="err">{formErrors.mobile}</span>}
            </div>
            
          </div>
        </div>

        <div className="form-group">
          <input
            type="button"
            className="btn btn-primary"
            value="Submit"
            onClick={this.handleSubmit}
          />
        </div>
      </div>
      </div>
    );
  }
}

export default Signup;