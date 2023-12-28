import { Html, Head, Main, NextScript } from 'next/document'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Document() {

  return (

    <Html lang="es">
      <Head />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" />
      <body className={`transition-all duration-[400ms] m-0 p-0 `} >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
