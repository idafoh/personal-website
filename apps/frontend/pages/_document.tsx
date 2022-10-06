import { createGetInitialProps } from '@mantine/next'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

const getInitialProps = createGetInitialProps()

export default class _Document extends Document {
  static getInitialProps = getInitialProps

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />

          <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`} />
        </body>
      </Html>
    )
  }
}
