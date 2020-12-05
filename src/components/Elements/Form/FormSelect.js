import React from "react"
import classNames from "classnames"
import { Field, ErrorMessage } from "formik"
import Select from "react-select"
import CreatableSelect from "react-select/creatable"

/**
 ** Select field with label and error message.
 ** Supported parameters:
 **
 ** fieldProps: {
 **               'name': String,
 **               'placeholder': String,
 **               'label': String,
 **               'option': Object [],
 **               'onChange': Function,
 **               'value': Object {},
 **             }
 **
 ** Note: You need a list of objects as options with label and value element.
 **/

const customStyles = theme => ({
  ...theme,
  boxShadow: "inset 0 0.0625em 0.125em rgba(0, 0, 0, 0.05)",
  colors: {
    ...theme.colors,
    primary: "#6ea9a9",
    primary25: "#cfe1e1",
    primary50: "#9ec5c5",
  },
})

const FormSelect = props => {
  //* destructure props
  const { name, label, onChange, isRequired, isCreatable } = props

  //* Function to set the value of the react-select in
  //* formik values.
  //*
  //* Note: Curried Function.
  //*       Need to call handleChange(form) to return (selectedValue) => { ... }
  const handleChange = form => selectedValue => {
    form.setFieldValue(name, selectedValue)
    if (onChange) onChange(selectedValue, form.setFieldValue)
  }

  const SelectComponent = ({ form }) => (
    <Select
      {...props}
      className="is-size-6"
      onChange={handleChange(form)}
      theme={customStyles}
    />
  )

  const CreatableSelectComponent = ({ form }) => (
    <CreatableSelect
      {...props}
      className="is-size-6"
      theme={customStyles}
      onChange={handleChange(form)}
    />
  )

  return (
    <div className="field">
      <label
        className={classNames("label", {
          "has-text-weight-normal": !isRequired,
        })}
      >
        {label}
        {!!isRequired && <span className="has-text-danger">&nbsp;*</span>}
        {!!props.helper && (
          <span
            className={classNames(
              "help has-text-weight-normal",
              props.helperClassName
            )}
          >
            {props.helper}
          </span>
        )}
      </label>
      <Field>
        {({ form }) =>
          isCreatable ? (
            <CreatableSelectComponent form={form} />
          ) : (
            <SelectComponent form={form} />
          )
        }
      </Field>
      <p className="help is-danger">
        <ErrorMessage name={name} />
      </p>
    </div>
  )
}

export default FormSelect
