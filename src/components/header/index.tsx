import Link from "next/link";
import styles from "./header.module.sass"
import { HiCurrencyDollar } from 'react-icons/hi'

export function Header() {
  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <div className={styles.Menu}>
          <select>
            <option value="fruit">Fruit</option>
            <option value="vegetable">Vegetable</option>
            <option value="meat">Meat</option>
          </select>
        </div>
        <nav className={styles.nav}>
          <div>
            <Link href="/dashboard">
              <span>F</span>ull <span>W</span>allet
            </Link>
            <HiCurrencyDollar />
          </div>
        </nav>

        <button className={styles.button}>Acessar</button>
      </section>
    </header>
  )
}