import React, { Component } from 'react'
import { Form, Modal, Button } from 'semantic-ui-react'

class Add extends Component {
  initialState = {
    form: {
      name: '',
      username: ''
    },
  }

  state = this.initialState

  handleChange = event => {
    const { name, value } = event.target

    this.setState({
      form: { ...this.state.form, [name]: value },
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { name, username } = this.state.form
    const { addRow } = this.props

    const newUser = {
      name,
      username,
    }

    addRow(newUser)
    this.setState(this.initialState)
  }

  render() {
    const { name, username } = this.state.form

    return (
      
        <Modal.Content>
           <h1>ADD-BUS-DATA</h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <Form.Input
                label="BusFrom"
                name="name"
                value={name}
                onChange={this.handleChange}
                autoFocus={true}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                label="BusTo"
                name="username"
                value={username}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Button type="submit" content="Submit" disabled={!name || !username} />
          </Form>
          
        </Modal.Content>
      
    )
  }
}

export default Add
