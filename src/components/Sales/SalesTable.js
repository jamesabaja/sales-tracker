import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import { getStores } from "../Stores/services/stores"

const SalesTable = ({ sales }) => {
  const [stores, setStores] = useState([])

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
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <td>Date</td>
          <td>Store Name</td>
          <td>Amount</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {sales.map(sale => (
          <tr>
            <td>
              {sale?.salesDate?.month} {sale?.salesDate?.date}{" "}
              {sale?.salesDate?.year}
            </td>
            <td>{stores?.find(store => store?.id === sale?.store)?.name}</td>
            <td>{sale?.amount?.toFixed(2)}</td>
            <td>
              <div className="buttons is-right">
                <Link
                  className="button is-primary is-outlined"
                  to="/sales/edit"
                  state={{
                    sale,
                    selectedStore: stores?.find(
                      store => store?.id === sale?.store
                    ),
                  }}
                >
                  Edit
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SalesTable
