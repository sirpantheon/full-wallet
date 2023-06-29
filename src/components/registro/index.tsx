import { BsFillTrashFill } from 'react-icons/bs'
import styles from './registro.module.sass'
import { IoMdDoneAll } from 'react-icons/io'
import { FormatDate } from '@/utils/utils'
import Link from 'next/link'
import { DB } from '../../services/firebaseConnection'
import { doc, deleteDoc } from 'firebase/firestore'


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

export default function Registro(item: IRegistros) {

  async function doneHandle(id: string){
    await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/registro/${id}`)
  }

  async function handleDeleteRegister(id: string) {
    const docRef = doc(DB, "registertonner", id)
    await deleteDoc(docRef)
  }

  return (
    <article className={styles.task} key={item.id}>

      <div className={styles.tagContainer}>
        {!item.done ?
          <Link href={`/registro/${item.id}`}>
            <button className={styles.doneButton} onClick={()=> doneHandle(item.id)}>
              <label className={styles.tag}>Incompleto</label>
              <IoMdDoneAll
                size={22}
                color='#ea3140'
              />
            </button>
          </Link>
          : <Link href={`/registro/${item.id}`}>
            <button className={styles.doneButton}>
              <label className={styles.tag}>Realizado</label>
              <IoMdDoneAll
                size={22}
                color='#3183ff'
              />
            </button>
          </Link>
        }
        <div className={styles.taskConteudo}>
          <div>
            <span>Impressora:{item.impressora}</span>
            <span>Toner:{item.toner}</span>
            <span>Ping:{item.ping}</span>
            <span>Setor:{item.setor}</span>
          </div>
          <strong className={styles.Data}>{`${FormatDate((item.created))}`}</strong>
        </div>
      </div>

      <button className={styles.trashButton} onClick={()=> handleDeleteRegister(item.id)}>
        <BsFillTrashFill
          size={22}
          color='#ea3140'
        />
      </button>

    </article>
  )
}

