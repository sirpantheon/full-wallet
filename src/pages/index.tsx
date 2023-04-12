import { Roboto } from 'next/font/google'
import Head from 'next/head'
import styles from '../styles/home.module.scss'
import { BsWallet2 } from 'react-icons/bs';

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
        <section className={styles.info}>
          <BsWallet2 className={styles.imagem} />
          <p className={styles.title}>
            Esse sistema foi feito para voce organizar as suas contas
            Tenha mais controle de tudo que entra e sai da sua conta, essa ferramenta facilitará a sua vida financeira...
          </p>
          <div className={styles.infoContent}>
            <span>+12 Registros</span>
            <span>+90 Comentarios</span>
          </div>
        </section>
      </main>
    </div>
  )
}
