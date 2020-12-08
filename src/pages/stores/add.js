import React from "react"
import Layout from "components/Layout/Layout"
import Container from "components/Layout/Container"
import StoreForm from "components/Stores/StoreForm"

export default () => (
  <Layout>
    <Container desktop={8} fullhd={6} isCentered>
      <StoreForm type="add" nextRoute="/stores" backRoute="/stores" />
    </Container>
  </Layout>
)
