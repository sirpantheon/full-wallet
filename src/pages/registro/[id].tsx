import Head from "next/head";
import styles from "./styles.module.sass"
import { GetServerSideProps } from "next";
import { DB } from "@/services/firebaseConnection";
import { doc, collection, query, where, getDoc } from "firebase/firestore"
import { FormatDate } from "@/utils/utils";

interface IDetailRegistro {
  item: {
    impressora: string
    setor: string
    observacao: string
    serie: string
    created: string
    done: boolean
    toner: string
    ping: number
    id: string
  }
}


export default function PageDetailRegistro({ item }: IDetailRegistro) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Detalhes do Registro</title>
      </Head>

      <main className={styles.main}>
        <h1>Registro</h1>
        <article className={styles.content}>
          <button>
            <label>Impressora</label>
            <p>{item.impressora}</p>
          </button>

          <button>
            <label>Toner</label>
            <p>{item.toner}</p>
          </button>

          <button>
            <label>Nº Serie</label>
            <p>{item.serie}</p>
          </button>

          <button>
            <label>Setor</label>
            <p>{item.setor}</p>
          </button>

          <button>
            <label>Ping</label>
            <p>{item.ping}</p>
          </button>

          <button>
            <label>Data</label>
            <p>{FormatDate(item.created)}</p>
          </button>

          <button>
            <label>Observação</label>
            <p>{item.observacao}</p>
          </button>

          <button>
            <label>Realizado</label>
            <p>{item.done}</p>
          </button>

        </article>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const id = params?.id as string
  const docRef = doc(DB, "registertonner", id)
  const snapshot = await getDoc(docRef)

  if (snapshot.data() === undefined) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }



  const registro = {
    impressora: snapshot.data()?.impressora,
    setor: snapshot.data()?.setor,
    observacao: snapshot.data()?.observacao,
    serie: snapshot.data()?.serie,
    created: snapshot.data()?.created,
    done: snapshot.data()?.done,
    toner: snapshot.data()?.toner,
    ping: snapshot.data()?.ping
  }
  console.log(registro)
  return {
    props: {
      item: registro
    }
  }
}
