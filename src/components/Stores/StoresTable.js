import React from "react"
import { Link } from "gatsby"

const StoreTable = ({ stores }) => {
  return (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <td>Name</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {stores.map(store => (
          <tr>
            <td>
              {store?.name}
              <p className="help">{store?.category}</p>
            </td>
            <td>
              <div className="buttons is-right">
                <Link
                  className="button is-primary is-outlined"
                  to="/stores/edit"
                  state={{ store }}
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

export default StoreTable
