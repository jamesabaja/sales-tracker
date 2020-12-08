import React from "react"
import Layout from "components/Layout/Layout"
import Container from "components/Layout/Container"
import StoreForm from "components/Stores/StoreForm"

export default ({ location }) => (
  <Layout>
    <Container desktop={8} fullhd={6} isCentered>
      <StoreForm
        type="edit"
        nextRoute="/stores"
        backRoute="/stores"
        location={location}
      />
    </Container>
  </Layout>
)
