import React from "react"
import classNames from "classnames"
import { Field, ErrorMessage, useField } from "formik"

/**
 ** Input field with label and error message.
 ** Supported parameters:
 **
 ** fieldProps: {
 **               'name': String,
 **               'placeholder': String,
 **               'label': String,
 **               'type': String,
 **               'onChange': Function,
 **               ...props compatible in Field Component of Formik
 **             }
 **/
const FormInput = fieldProps => {
  //* Function that prevents alpha and symbols
  //* if the fieldProps.type is number.
  //* This also prevents the user to input characters more than
  //* fieldProps.max (if defined).
  const handleOnKeyPress = event => {
    const isTypeNumber = fieldProps.type === "number"

    if (isTypeNumber) {
      if (
        (isNaN(event.key) && event.key !== ".") ||
        (fieldProps.maxLength &&
          event.target.value.toString().length >= fieldProps.maxLength)
      )
        event.preventDefault()
    }
    if (fieldProps.onKeyPress) fieldProps.onKeyPress(event)
  }

  // We're accessing the useField props below so we can validate forms inline, on touch
  // Source: https://jaredpalmer.com/formik/docs/api/useField#usefieldname-string-fieldattributes-fieldinputprops-fieldmetaprops-fieldhelperprops
  const [, meta] = useField(fieldProps.name)
  return (
    <div className="field mb-1">
      <label
        className={classNames("label", {
          "has-text-weight-normal": !fieldProps.isRequired,
        })}
      >
        {fieldProps.label}
        {!!fieldProps.isRequired && (
          <span className="has-text-danger">&nbsp;*</span>
        )}
        {!!fieldProps.helper && (
          <span className="help has-text-weight-normal">
            {fieldProps.helper}
          </span>
        )}
      </label>
      <div
        className={classNames("control", {
          "is-loading": fieldProps.isLoading,
          "has-icons-left": fieldProps.icons?.left,
          "has-icons-right": fieldProps.icons?.right,
        })}
      >
        {fieldProps.icons?.left}
        <Field
          {...fieldProps}
          className={classNames(
            "input has-text-ubuntu",
            {
              "is-success":
                meta.touched && !meta.error && fieldProps.isRequired,
            },
            {
              "is-danger": meta.touched && meta.error,
            },
            fieldProps.className
          )}
          onKeyPress={handleOnKeyPress}
        />
        {fieldProps.icons?.right}
      </div>
      <p className="help is-danger">
        <ErrorMessage name={fieldProps.name} />
      </p>
    </div>
  )
}

export default React.memo(FormInput)
