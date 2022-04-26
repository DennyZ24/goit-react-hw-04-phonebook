import { nanoid } from 'nanoid'
import s from "components/Phonebook/Phonebook.module.css";
import React, { Component } from 'react'

class Phonebook extends Component {
  state = {
    name: '',
    number: ''
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    this.props.onSubmit(this.state);

    this.reset();
  }

  handleChange = ({currentTarget: {name, value}}) => {
    this.setState({
      [name]: value,
      id: nanoid()
    })
  }

  reset = () => {
    this.setState({
      name: '',
      number: ''
    })
  }
  
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label className={s.label}>
        Name

        <input
          className={s.input}
          type="text"
          name="name"
          value={this.state.name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={this.handleChange}
        />
      </label>
      
      <label>
        Number

        <input
          className={s.input}
          type="tel"
          name="number"
          value={this.state.number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={this.handleChange}
        />
      </label>

      <button type='submit' className={s.button}>
        Add contact
      </button>
    </form>
  )
}
} 

export default Phonebook;