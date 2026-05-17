import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client/react'
import { apolloClient } from '../src/app/apolloClient'

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
