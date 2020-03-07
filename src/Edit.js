import React, { Component } from 'react'
import { Form, Modal, Button } from 'semantic-ui-react'

class Edit extends Component {
  initialState = {
    form: {
      name: '',
      username: '',
    },
  }

  state = this.initialState

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id) {
      const user = this.props.getUserById(this.props.id)

      this.setState({
        form: {
          name: user.name,
          username: user.username,
        },
      })
    }
  }

  handleChange = event => {
    const { name, value } = event.target

    this.setState({
      form: { ...this.state.form, [name]: value },
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { name, username } = this.state.form
    const { updateRow } = this.props

    const updatedUser = {
      name,
      username,
    }

    updateRow(this.props.id, updatedUser)
    this.props.onClose()
  }

  render() {
    const { name, username } = this.state.form
    const { isOpen, onClose } = this.props

    return (
      
        <Modal.Content>
       <div class="w3-container">
          <Form onSubmit={this.handleSubmit}>
          <h1>EDIT BUS --> click edit</h1>
            <Form.Field>
              <Form.Input label="BUS-FROM" name="name" value={name} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <Form.Input
                label="BUS-TO"
                name="username"
                value={username}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Button type="submit" content="Submit" />
          </Form>
          </div>
        </Modal.Content>
      
    )
  }
}

export default Edit
