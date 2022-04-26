import s from 'components/ContactsBook/ContactsBook.module.css'

export default function ContactsBook({ contacts, onDeleteContact }) {
  return (
    <ul className={s.list}>
      {contacts.map(contact => {
        const {name, number, id} = contact;

        return (
          <li key={id} className={s.item}>
            {name}: {number}
            <button
              type='button'
              onClick={() => onDeleteContact(id)}
              className={s.button}
            >
              Delete
            </button>
          </li>
        )
      })}
    </ul>
  )
}