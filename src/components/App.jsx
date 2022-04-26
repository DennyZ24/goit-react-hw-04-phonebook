import {useState, useEffect} from 'react'
import Section from 'components/Section/Section'
import Phonebook from "components/Phonebook/Phonebook";
import ContactsBook from 'components/ContactsBook/ContactsBook';
import Filter from "components/Filter/Filter";

const getLocalStorageContacts = () => { 
   
  const parsedContacts = JSON.parse(window.localStorage.getItem('contacts'));

  if (parsedContacts) {
   return parsedContacts
  } else {return []}
};

const App = () => {
  const [contacts, setContacts] = useState(()=>getLocalStorageContacts());
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  },[contacts])

  const addContacts = (contact) => {
    contacts.find(stateContact => stateContact.name.includes(contact.name)) ?
      window.alert(`${contact.name} уже есть в списке контактов`)
      :
      setContacts(state => {
        return [...contacts, contact]
      })
  };

  const deleteContact = (contactId) => {
    setContacts((oldContacts) => {
      return oldContacts.filter(contact => contact.id !== contactId)
    });
  };

  const getVisibleContacts = () => { 
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  };

  const handleFilter = (e) => { 
    setFilter(e.currentTarget.value)
  };

  return (
    <>
      <Section title='Phonebook'>
        <Phonebook onSubmit ={addContacts}  />
      </Section>
        
      {contacts.length > 0 && <Section title='Contacts'>
        <ContactsBook contacts={getVisibleContacts()} onDeleteContact={deleteContact} />
      </Section>}

      <Section>
        <Filter value={filter} onChange={handleFilter} />
      </Section>
    </>
  )
}

export default App;