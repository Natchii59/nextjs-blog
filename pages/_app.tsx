import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='container'>
      <Head>
        <title>Nextjs Blog</title>
      </Head>

      <nav>
        <Link href='/'>
          <a>Home</a>
        </Link>
      </nav>

      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
