import styles from './index.module.css'

export default function InputLabel({ text = 'Label', id = '' }) {
  return (
    <label className={styles.inputLabel} htmlFor={id}>
      {text}
    </label>
  )
}
