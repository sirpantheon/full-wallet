import { GetServerSideProps } from 'next'
import styles from './dashboard.module.sass'
import Head from 'next/head'
import { getSession } from 'next-auth/react'
import { useState, useEffect } from 'react';
import { DB } from '../../services/firebaseConnection'
import { collection, query, orderBy, where, onSnapshot } from 'firebase/firestore'
import Registro from '@/components/registro'
import { ResponsiveContainer, LineChart, Line, XAxis, CartesianGrid, Tooltip } from "recharts"

interface IHomeProps {
  user: {
    email: string
  }
}

interface IRegistros {
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
  contador?: number
}

interface IHistoryBox {
  data: {
    month: string
    amountOutput: number
    amountEntry: number
  }[],
  lineColorEntry: string
  lineColorOutput: string
}

export default function Register({ user }: IHomeProps) {

  const [registros, setRegistros] = useState<IRegistros[]>([])

  useEffect(() => {
    async function loadRegister() {
      const registerRef = collection(DB, "registertonner")
      const q = query(
        registerRef,
        orderBy("created", "desc"),
        where("user", "==", user?.email)
      )
      onSnapshot(q, (snapshot) => {
        let lista = [] as IRegistros[]

        snapshot.forEach((doc) => {
          if (doc.data().toner === "w1330x") {
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
          }

        })
        console.log(lista.length)
        setRegistros(lista)
      })

    }
    loadRegister()
  }, [user?.email])

  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard</title>
      </Head>
      <h1>Dashboard</h1>

      <h2>Historico</h2>
      {/* <ResponsiveContainer>
        <LineChart data={[]}>
          <CartesianGrid strokeDasharray="3 3" stroke="#cecece" />
          <XAxis datakey="month" stroke="#cecece" />
          <Tooltip />
          <Line type="monotone" datakey="amountOutput" name="quantidade" stroke="#0f0" strokeWidth={5} dot={{ r: 5 }} activeDot={{ r: 8 }} />
          <Line type="monotone" datakey="amountEntry" name="estoque" stroke="#f00" strokeWidth={5} dot={{ r: 5 }} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer> */}

      <h2>Filtros</h2>

      {registros.map((item) => (
        <Registro
          key={item.id}
          id={item.id}
          created={item.created}
          done={item.done}
          impressora={item.impressora}
          observacao={item.observacao}
          ping={item.ping}
          serie={item.serie}
          setor={item.setor}
          toner={item.toner}
          user={item.user}
        />

      ))}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

  const session = await getSession({ req })

  if (!session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: {
      user: {
        email: session?.user?.email
      }
    }
  }
}