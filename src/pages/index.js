import React from "react"
import Layout from "components/Layout/Layout"
import Container from "components/Layout/Container"
import Dashboard from "components/Dashboard"

export default () => (
  <Layout>
    <Container desktop={8} fullhd={10} isCentered>
      <Dashboard />
    </Container>
  </Layout>
)
