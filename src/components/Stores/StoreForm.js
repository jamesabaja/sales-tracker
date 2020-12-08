import { Form, Formik } from "formik"
import React, { Fragment, useState } from "react"
import { Link, navigate } from "gatsby"
import classNames from "classnames"

import FormInput from "components/Elements/Form/FormInput"
import FormSelect from "components/Elements/Form/FormSelect"

import {
  initialValues,
  storeCategoryOptions,
  validationSchema,
} from "./utils/storeFormSchema"
import { addStore, editStore } from "./services/stores"

const ADD_STORE = "add"
const EDIT_STORE = "edit"

const StoreForm = ({ type, nextRoute, backRoute, location }) => {
  const [loading, setLoading] = useState(false)

  const initialFormValues =
    type === ADD_STORE
      ? initialValues
      : {
          ...location?.state?.store,
          category: {
            value: location?.state?.store?.category,
            label: location?.state?.store?.category,
          },
        }

  const handleSubmit = values => {
    setLoading(true)
    if (type === ADD_STORE)
      addStore({
        values,
        callback: () => {
          setLoading(false)
          navigate(nextRoute)
        },
      })
    else if (type === EDIT_STORE)
      editStore({
        values,
        callback: () => {
          setLoading(false)
          navigate(nextRoute)
        },
      })
  }

  return (
    <Fragment>
      <h1 className="mb-3">{type} Store</h1>
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <FormInput name="name" label="Name" placeholder="Juana Store" />
            <FormSelect
              name="category"
              label="Category"
              options={storeCategoryOptions}
              value={values?.category}
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

export default StoreForm
