import { HTMLProps } from 'react'
import styles from './input.module.sass'

export default function Input({label, ...rest }: HTMLProps<HTMLInputElement>) {
  return (
    <section className={styles.campo}>
      <label>{label}</label>
      <input className={styles.input}{...rest}>

      </input>
    </section>
  )
}