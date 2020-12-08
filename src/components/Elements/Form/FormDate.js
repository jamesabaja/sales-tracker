import React, { Fragment, useEffect, useState } from "react"
import classNames from "classnames"

import FormInput from "./FormInput.js"
import FormSelect from "./FormSelect.js"

import calendar from "../utils/calendar.json"

/**
 ** Two select fields (MM, DD) and text field (YYYY) with label and error message.
 ** Supported parameters:
 **
 ** fieldProps: {
 **               'name': "birth",
 **               'label': "Birth",
 **               'isRequired': true,
 **               'onChange': Function,
 **               ...props compatible in Field Component of Formik
 **             }
 **/
const FormDate = fieldProps => {
  const { month, date } = fieldProps.values

  let months = []
  const [dates, setDates] = useState(0)

  useEffect(() => {
    calendar.map(month => {
      return months.push({
        value: month.abbreviation,
        label: month.abbreviation,
      })
    })
  })

  const findDates = monthInput => {
    const selectedMonth = calendar.find(
      month => month.abbreviation === monthInput
    )
    const dateValues = Array.apply(null, {
      length: selectedMonth.days,
    }).map(Number.call, Number => ({ value: Number + 1, label: Number + 1 }))

    return dateValues
  }

  useEffect(() => {
    if (month) {
      const dateValues = findDates(month.value)
      setDates(dateValues)
    }
  }, [month])

  const handleChange = (values, setFieldValue) => {
    if (!!values.value) {
      const selectedMonth = calendar.find(
        month => month.abbreviation === values.value
      )
      const dateValues = Array.apply(null, {
        length: selectedMonth.days,
      }).map(Number.call, Number => ({
        value: Number + 1,
        label: Number + 1,
      }))
      setFieldValue(`${fieldProps.name}.date`, { value: "" })
      setDates(dateValues)
    }
  }

  return (
    <Fragment>
      <div className="columns is-mobile p-0 m-0 mt-1">
        <div className="column p-0 m-0">
          <label
            className={classNames("label has-text-weight-normal", {
              "mb-0": !!fieldProps.helper,
            })}
          >
            {fieldProps.label}
            {!fieldProps.isRequired && !fieldProps.hideOptional && (
              <span className="has-text-grey is-italic"> (Optional)</span>
            )}
          </label>
          {!!fieldProps.helper && (
            <span className="help">{fieldProps.helper}</span>
          )}
        </div>
      </div>

      <div className="columns is-mobile">
        <div className="column pb-0">
          <FormSelect
            name={`${fieldProps.name}.month`}
            placeholder="MMM"
            options={months}
            onChange={handleChange}
            value={month}
            isRequired={fieldProps.isRequired}
            hideOptional
          />
        </div>
        <div className="column pb-0">
          <FormSelect
            name={`${fieldProps.name}.date`}
            placeholder="DD"
            options={dates}
            isDisabled={!!!fieldProps.values.month.value}
            value={date}
            isRequired={fieldProps.isRequired}
            hideOptional
          />
        </div>
        <div className="column pb-0">
          <FormInput
            name={`${fieldProps.name}.year`}
            pattern="[1-2]{1}[0-9]{3}"
            placeholder="YYYY"
            maxLength={4}
            onChange={fieldProps.onChange}
            type="number"
            isRequired={fieldProps.isRequired}
            hideOptional
          />
        </div>
      </div>
    </Fragment>
  )
}

export default FormDate
