import { Form, Formik } from "formik"
import React, { Fragment, useEffect, useState } from "react"
import { Link, navigate } from "gatsby"
import classNames from "classnames"

import FormInput from "components/Elements/Form/FormInput"
import FormDate from "components/Elements/Form/FormDate"
import FormSelect from "components/Elements/Form/FormSelect"

import { validationSchema } from "./utils/salesFormSchema"
import { getStores } from "../Stores/services/stores"
import { addSales, editSales, getInitialFormValues } from "./services/sales"

const ADD_SALES = "add"
const EDIT_SALES = "edit"

const SalesForm = ({ type, nextRoute, backRoute, location }) => {
  const [loading, setLoading] = useState(false)
  const [stores, setStores] = useState([])
  const selectedStore = location?.state?.selectedStore
  const initialFormValues = getInitialFormValues({
    type,
    selectedStore,
    sale: location?.state?.sale,
  })

  const handleSubmit = values => {
    setLoading(true)
    if (type === ADD_SALES)
      addSales({
        values,
        callback: () => {
          setLoading(false)
          navigate(nextRoute)
        },
      })
    else if (type === EDIT_SALES)
      editSales({
        values,
        callback: () => {
          setLoading(false)
          navigate(nextRoute)
        },
      })
  }

  const fetchStores = async () => {
    let tempStores = await getStores()
    tempStores = tempStores?.map(tempStore => ({
      ...tempStore,
      label: tempStore?.name,
      value: tempStore?.name,
    }))
    setStores(tempStores)
  }

  useEffect(() => {
    fetchStores()
  }, [])

  return (
    <Fragment>
      <h1 className="mb-3">{type} Sales</h1>
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <FormSelect
              name="store"
              options={stores}
              label="Store Name"
              value={values?.store}
            />
            <FormInput
              name="amount"
              label="Amount"
              placeholder="1234.00"
              type="number"
            />
            <FormDate
              values={values?.salesDate}
              name="salesDate"
              hideOptional
              label="Sales Date"
            />
            <div className="buttons mt-3 is-right">
              <Link
                className="button is-medium has-text-weight-bold has-text-lato"
                to={backRoute}
              >
                Back
              </Link>

              <button
                type="submit"
                className={classNames(
                  "button is-primary is-medium has-text-weight-bold has-text-lato",
                  {
                    "is-loading": loading,
                  }
                )}
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Fragment>
  )
}

export default SalesForm
