import React from "react"
import Layout from "components/Layout/Layout"
import Container from "components/Layout/Container"
import Stores from "components/Stores"

export default () => (
  <Layout>
    <Container desktop={8} fullhd={6} isCentered>
      <Stores />
    </Container>
  </Layout>
)
