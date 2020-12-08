import React from "react"
import Layout from "components/Layout/Layout"
import Container from "components/Layout/Container"
import Sales from "components/Sales"

export default () => (
  <Layout>
    <Container desktop={8} fullhd={6} isCentered>
      <Sales />
    </Container>
  </Layout>
)
