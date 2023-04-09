import { Roboto } from 'next/font/google'
import Head from 'next/head'
import styles from '../styles/home.module.scss'

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Full.Wallet | Sua carteira completa... </title>
      </Head>
      <main className={`${roboto.variable} font-sans ${styles.container}`}>
        <h1 className={styles.title}>Esse sistema foi feito para voce organizar as suas contas</h1>
        <p>Tenha mais controle de tudo que entra e sai da sua conta, essa ferramenta facilitará a sua vida financeira...</p>
      </main>
    </div>
  )
}
