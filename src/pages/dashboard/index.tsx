import { GetServerSideProps } from 'next'
import styles from './dashboard.module.sass'
import Head from 'next/head'
import { getSession } from 'next-auth/react'


export default function Dashboard() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Meu Painel</title>
      </Head>


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
    props: {}
  }
}