import Link from "next/link"
import styles from "./header.module.sass"
import { AiOutlineMenu } from 'react-icons/ai'
import { slide as Menu } from 'react-burger-menu'
import { BsPersonWorkspace } from 'react-icons/bs'
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react"

export function Header() {
  const Menus = ["Home", "Dashboard", "Registrar"]
  const [open, setOpen] = useState(false)
  const { data: session, status } = useSession()

  return (
    <header className={styles.header}>
      <section className={styles.content}>
        {
          session?.user && (
            <button className={styles.btn_Registrar}>
              <Link href="/register">
                Registrar
              </Link>
            </button>
          )
        }

        <nav className={styles.nav}>
          <div>
            <Link href="/dashboard">
              <span>R</span>egistrar <span>T</span>oner
            </Link>
            <BsPersonWorkspace />
          </div>
        </nav>

        {
          status === "loading" ? (
            <></>
          ) : session ? (
            <button className={styles.btn_Acessar} onClick={() => signOut()}>Olá {session.user?.name}</button>
          ) : (
            <button className={styles.btn_Acessar} onClick={() => signIn('google')}>Acessar</button>
          )
        }

        <AiOutlineMenu className={styles.menu_mobile} onClick={() => setOpen(!open)} />

        {open && (

          <div className={styles.option_menu}>
            <ul>
              {
                Menus.map((menu) => (
                  <li key={menu} onClick={() => setOpen(false)}>
                    <Link href={`/${menu}`}>
                      {menu}
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>
        )

        }

      </section>
    </header>
  )
}