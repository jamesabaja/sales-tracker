import React from "react"

/* eslint-disable */

import { getFirebase } from "services/firebase/firebase"

// import { AppProvider } from "./src/context/AppContext"
import "./src/styles/global.scss"

// export const wrapRootElement = ({ element }) => (
//   <AppProvider>
//     <ApolloProvider client={client}>{element}</ApolloProvider>
//   </AppProvider>
// )

export const wrapRootElement = ({ element }) => {
  getFirebase()
  return element
}
