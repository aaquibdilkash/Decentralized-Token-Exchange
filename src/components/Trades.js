import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { filledOrdersLoadedSelector, filledOrdersSelector } from '../store/selectors'
import Spinner from './Spinner'


const showFilledOrders = (filledOrders) => {
    return(
      <tbody>
        { filledOrders.map((order) => {
          return(
            <tr className={`order-${order.id}`} key={order.id}>
              <td className="text-muted">{order.formattedTimestamp}</td>
              <td>{order.tokenAmount}</td>
              <td className={`text-${order.tokenPriceClass}`}>{order.tokenPrice}</td>
            </tr>
          )
        }) }
      </tbody>
    )
  }

const Trades = () => {
    const state = useSelector(state => state)
    const filledOrdersLoaded = filledOrdersLoadedSelector(state)
    const filledOrders = filledOrdersSelector(state)
    return (
        <div className="vertical">
          <div className="card bg-dark text-white">
            <div className="card-header">
              Trades
            </div>
            <div className="card-body">
              <table className="table table-dark table-sm small">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>DZD</th>
                    <th>DZD/ETH</th>
                  </tr>
                </thead>
                { filledOrdersLoaded ? showFilledOrders(filledOrders) : <Spinner type="table" />}
              </table>
            </div>
          </div>
        </div>
      )
}

export default Trades
