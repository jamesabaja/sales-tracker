import React from "react"
import classNames from "classnames"

const Container = ({
  children,
  mobile,
  tablet,
  desktop,
  isCentered,
  customClassName,
}) => {
  return (
    <div
      className={classNames("columns mx-1-mobile", {
        "is-centered": isCentered,
      })}
    >
      <div
        className={`column is-${mobile || 12}-mobile is-${tablet ||
          10}-tablet is-${desktop || 8}-desktop ${customClassName || ""}`}
      >
        {children}
      </div>
    </div>
  )
}

export default Container
