import { HTMLProps } from 'react'
import styles from './textArea.module.sass'

export default function TextArea({ ...rest }: HTMLProps<HTMLTextAreaElement>) {
  return (
    <textarea className={styles.textarea}{...rest}>

    </textarea>
  )
}