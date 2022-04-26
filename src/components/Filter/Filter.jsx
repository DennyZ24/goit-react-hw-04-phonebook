import s from "components/Filter/Filter.module.css";

export default function Filter({ value, onChange }) {
  return (
    <label>
      Search contact

      <input className={s.input} type='text' name='filer' value={value} onChange={onChange}/>
    </label>
  )
}