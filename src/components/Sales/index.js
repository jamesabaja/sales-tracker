import React, { Fragment, useEffect, useState } from "react"
import { Link } from "gatsby"
import { Form, Formik } from "formik"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import SalesTable from "./SalesTable"
import FormSelect from "../Elements/Form/FormSelect"

import { getSales } from "./services/sales"
import { getStores } from "../Stores/services/stores"

const Sales = () => {
  const [sales, setSales] = useState([])
  const [stores, setStores] = useState([])
  const [filteredSales, setFilteredSales] = useState([])
  const [selectedStore, setSelectedStore] = useState({})

  const fetchSales = async () => {
    let tempSales = await getSales()
    let tempStores = await getStores()
    tempStores = tempStores?.map(tempStore => ({
      ...tempStore,
      label: tempStore?.name,
      value: tempStore?.name,
    }))
    tempSales = tempSales.sort((a, b) => {
      let firstDate = new Date(
        `${a?.salesDate?.month} ${a?.salesDate?.date} ${a?.salesDate?.year}`
      )
      let secondDate = new Date(
        `${b?.salesDate?.month} ${b?.salesDate?.date} ${b?.salesDate?.year}`
      )
      return firstDate - secondDate
    })
    console.log(tempSales)
    setSales(tempSales)
    setFilteredSales(tempSales)
    setStores([{ value: "", label: "All Stores" }, ...tempStores])
  }

  const filterStores = value => {
    const storeId = value?.id
    if (storeId) {
      let tempFilteredSales = sales.filter(sale => sale?.store === storeId)
      setFilteredSales(tempFilteredSales)
    } else {
      setFilteredSales(sales)
    }
    setSelectedStore(value)
  }

  useEffect(() => {
    fetchSales()
  }, [])

  return (
    <Fragment>
      <h1>Sales</h1>
      <div className="buttons is-right">
        <Link
          className="button is-primary"
          to="/sales/add"
          state={{ selectedStore }}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-1" /> Add Sales
        </Link>
      </div>
      <Formik initialValues={{ store: { value: "", label: "All Stores" } }}>
        {({ values }) => (
          <Form className="mt-2 mb-3">
            <FormSelect
              label="Filter by store"
              options={stores}
              name="store"
              value={values?.store}
              onChange={filterStores}
            />
          </Form>
        )}
      </Formik>
      <SalesTable sales={filteredSales} />
    </Fragment>
  )
}

export default Sales
