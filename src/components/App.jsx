import React, { Component } from 'react'
import Section from 'components/Section/Section'
import Phonebook from "components/Phonebook/Phonebook";
import ContactsBook from 'components/ContactsBook/ContactsBook';
import Filter from "components/Filter/Filter";

class App extends Component {
  state = {
    contacts: [],
    filter: ''
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({contacts: parsedContacts})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevContacts = prevState.contacts;
    const nextContacts = this.state.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts))
    }
  }

  addContacts = (contact) => {
    this.state.contacts.find(stateContact => stateContact.name.includes(contact.name)) ?
      window.alert(`${contact.name} уже есть в списке контактов`)
      :
      this.setState(({ contacts }) => (
      {
      contacts: [contact, ...contacts],
    }
    ))
  }

  deleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact=>contact.id !== contactId)
    }))
  }

  handleFilter = (e) => {
    this.setState({
      filter: e.currentTarget.value
    })
  }

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    
    return contacts.filter(contact=>contact.name.toLowerCase().includes(normalizedFilter))
  }

  render() {
    const {  filter } = this.state;
    const visibleContact = this.getVisibleContacts();

    return (
      <>
        <Section title='Phonebook'>
          <Phonebook onSubmit ={this.addContacts}  />
        </Section>
          
        <Section title='Contacts'>
          <ContactsBook contacts={visibleContact} onDeleteContact={this.deleteContact} presenceОfontact={this.presenceОfontact}/>
        </Section>

        <Section>
          <Filter value={filter} onChange={this.handleFilter} />
        </Section>
      </>
    )
  }
}

export default App;