import { Roboto } from 'next/font/google'
import Head from 'next/head'
import styles from '../styles/home.module.scss'
import { BsWallet2 } from 'react-icons/bs';
import { GetStaticProps } from 'next';
import { addDoc, collection, query, orderBy, where, onSnapshot, doc, deleteDoc, getDocs } from 'firebase/firestore'
import { DB } from '@/services/firebaseConnection';
import { useEffect, useState } from 'react';


const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

interface IHomeProps {
  id: string
  created: string
  impressora: string
  observacao?: string
  ping: string
  done: boolean
  serie: string
  setor: string
  toner: string
  user: string
}

export default function Home({ toner }: IHomeProps) {

  const [w1330x, SetW1330x] = useState(0)
  const [registros, setRegistros] = useState<IHomeProps[]>([])

  const QuantTonner = collection(DB, "toners")
  const toners = query(QuantTonner, where("toner", "==", "w1330x"));

  console.log(QuantTonner)

  useEffect(() => {
    async function loadRegister() {
      const registerRef = collection(DB, "w1330x")
      const q = query(
        registerRef,
        orderBy("created", "desc"),
        where("toner", "==", toner)
      )
      onSnapshot(q, (snapshot) => {
        let lista = [] as IHomeProps[]

        console.log(toner)
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            created: doc.data().created,
            impressora: doc.data().impressora,
            observacao: doc.data().observacao,
            ping: doc.data().ping,
            done: doc.data().done,
            serie: doc.data().serie,
            setor: doc.data().setor,
            toner: doc.data().toner,
            user: doc.data().user,
          })

        })
        setRegistros(lista)

      })

    }
    loadRegister()
  }, [toner])

  

  return (
    <div className={styles.container}>
      <Head>
        <title>Full.Wallet | Sua carteira completa... </title>
      </Head>
      <main className={`${roboto.variable} font-sans ${styles.container}`}>
        <section className={styles.info}>
          <BsWallet2 className={styles.imagem} />
          <p className={styles.title}>
            Esse sistema foi feito para voce organizar e ter controle de quantos insumos voce usar ao longo do més... registre tudo.
          </p>
          <div className={styles.infoContent}>
            <span>{} Registros</span>
            <span>{} w1330x</span>
          </div>
        </section>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const RegisterTonner = collection(DB, "registertonner")
  const Toners = collection(DB, "toners")

  const RegisterSnapshot = await getDocs(RegisterTonner)
  const TonersSnapshot = await getDocs(Toners)

  
  return {
    props: {
      registertonner: RegisterSnapshot.size || 0,
      Toners: TonersSnapshot.size || 0,
    },
    revalidate: 60,
  }
}
