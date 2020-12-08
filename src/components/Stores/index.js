import React, { Fragment, useEffect, useState } from "react"
import { Link } from "gatsby"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import StoreTable from "./StoresTable"

import { getStores } from "./services/stores"

const Stores = () => {
  const [stores, setStores] = useState([])

  const fetchStores = async () => {
    const tempStores = await getStores()

    setStores(tempStores)
  }

  useEffect(() => {
    fetchStores()
  }, [])

  return (
    <Fragment>
      <h1>Stores</h1>
      <div className="buttons is-right">
        <Link className="button is-primary" to="/stores/add">
          <FontAwesomeIcon icon={faPlus} className="mr-1" /> Add Store
        </Link>
      </div>
      <StoreTable stores={stores} />
    </Fragment>
  )
}

export default Stores
