import TextArea from '@/components/textArea'
import styles from './register.module.sass'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Input from '@/components/input'
import { ChangeEvent, useState, FormEvent, useEffect } from 'react';
import { DB } from '../../services/firebaseConnection'
import { addDoc, collection, query, orderBy, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import Registro from '@/components/registro'

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
}

export default function Register({ user }: IHomeProps) {

  const [inputToner, setInputToner] = useState("")
  const [inputImpressora, setInputImpressora] = useState("")
  const [inputSerie, setInputSerie] = useState("")
  const [inputSetor, setInputSetor] = useState("")
  const [inputPing, setInputPing] = useState("")
  const [inputDate, setInputDate] = useState("")
  const [inputObs, setInputObs] = useState("")
  const [done, setDone] = useState(false)
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
  }, [user?.email])

  function handleChangeDone(event: ChangeEvent<HTMLInputElement>) {
    setDone(event.target.checked)
  }

  async function handleRegisterTonner(event: FormEvent) {
    event.preventDefault();

    if (inputToner === "") return;

    try {
      await addDoc(collection(DB, "registertonner"), {
        toner: inputToner,
        impressora: inputImpressora,
        serie: inputSerie,
        setor: inputSetor,
        ping: inputPing,
        observacao: inputObs,
        done: done,
        created:inputDate,
        user: user?.email
      });

      setInputToner("")
      setInputImpressora("")
      setInputSerie("")
      setInputSetor("")
      setInputPing("")
      setInputDate("")
      setDone(false)
      setInputObs("")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Registrar</title>
      </Head>


      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.contentForm}>
            <h1 className={styles.title}>Preencha todos os campos</h1>

            <form onSubmit={handleRegisterTonner}>
              <div className={styles.campos}>
                <Input
                  type='text'
                  label='Modelo de Toner'
                  placeholder='Ex: X3301'
                  value={inputToner}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setInputToner(event.target.value)}
                  required
                />
                <Input
                  type='text'
                  label='Modelo da impressora'
                  placeholder='Ex: HP 432'
                  value={inputImpressora}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setInputImpressora(event.target.value)}
                  required
                />
                <Input
                  type='text'
                  label='Nº serie'
                  placeholder='Ex: BRBS000000'
                  value={inputSerie}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setInputSerie(event.target.value)}
                  required
                />
                <Input
                  type='text'
                  label='Setor'
                  placeholder='Ex: Pronto Socorro'
                  value={inputSetor}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setInputSetor(event.target.value)}
                  required
                />
                <Input
                  type='number'
                  label='Ping'
                  placeholder='Ex: 000.000.000.000'
                  autoComplete='on'
                  maxLength={9}
                  value={inputPing}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setInputPing(event.target.value)}
                  required
                />
                <Input
                  type='date'
                  label='Data'
                  value={inputDate}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setInputDate(event.target.value)}
                  required
                />

              </div>
              <TextArea
                placeholder='Observação...'
                value={inputObs}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setInputObs(event.target.value)}
              />

              <div className={styles.checkboxArea}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={done}
                  onChange={handleChangeDone}
                />

                <label>Finalizado</label>

              </div>

              <button className={styles.btn} type="submit">Registrar</button>
            </form>
          </div>
        </section>
        <section className={styles.taskContainer}>
          <h1>Minhas Tarefas</h1>

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
        </section>
      </main>
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