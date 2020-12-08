import React, { Fragment } from "react"

import Navbar from "./Navbar"
// import Footer from "./Footer"
import SEO from "./SEO"

import "../../styles/global.scss"

const Layout = ({ children, seoTitle }) => {
  return (
    <Fragment>
      <SEO title={seoTitle} />
      <Navbar />
      {children}
      {/* <Footer /> */}
    </Fragment>
  )
}

export default Layout
