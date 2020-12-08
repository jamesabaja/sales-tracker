import React from "react"
import Layout from "components/Layout/Layout"
import Container from "components/Layout/Container"
import SalesForm from "components/Sales/SalesForm"

export default ({ location }) => (
  <Layout>
    <Container desktop={8} fullhd={6} isCentered>
      <SalesForm
        type="edit"
        nextRoute="/sales"
        backRoute="/sales"
        location={location}
      />
    </Container>
  </Layout>
)
