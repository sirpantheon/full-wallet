import Link from "next/link"
import styles from "./header.module.sass"
import { AiOutlineMenu } from 'react-icons/ai'
import { RiFilePaper2Line } from 'react-icons/ri'
import { BsPersonWorkspace } from 'react-icons/bs'

export function Header() {
  return (
    <header className={styles.header}>
      <section className={styles.content}>
      <button className={styles.btn_Registrar}>Registrar</button>

        <nav className={styles.nav}>
          <div>
            <Link href="/dashboard">
              <span>R</span>egistrar <span>T</span>oner
            </Link>
            <BsPersonWorkspace />
          </div>
        </nav>

        <button className={styles.btn_Acessar}>Acessar</button>

        <AiOutlineMenu className={styles.menu_mobile}/>
      </section>
    </header>
  )
}