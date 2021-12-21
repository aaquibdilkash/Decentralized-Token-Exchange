import React, { Component } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'
import Spinner from './Spinner'
import {
  myFilledOrdersLoadedSelector,
  myFilledOrdersSelector,
  myOpenOrdersLoadedSelector,
  myOpenOrdersSelector,
  exchangeSelector,
  accountSelector,
  orderCancellingSelector
} from '../store/selectors'
import { cancelOrder } from '../store/interactions'


const renderMyFilledOrders = (myFilledOrders) => {
    return(
      <tbody>
        { myFilledOrders.map((order) => {
          return (
            <tr key={order.id}>
              <td className="text-muted">{order.formattedTimestamp}</td>
              <td className={`text-${order.orderTypeClass}`}>{order.orderSign}{order.tokenAmount}</td>
              <td className={`text-${order.orderTypeClass}`}>{order.tokenPrice}</td>
            </tr>
          )
        }) }
      </tbody>
    )
  }
  
  const renderMyOpenOrders = (myOpenOrders, dispatch, exchange, account) => {
    return(
      <tbody>
        { myOpenOrders.map((order) => {
          return (
            <tr key={order.id}>
              <td className={`text-${order.orderTypeClass}`}>{order.tokenAmount}</td>
              <td className={`text-${order.orderTypeClass}`}>{order.tokenPrice}</td>
              <td
              className="text-muted cancel-order"
              onClick={(e) => {
                cancelOrder(dispatch, exchange, order, account)
              }}
            >X</td>
            </tr>
          )
        }) }
      </tbody>
    )
  }

const MyTransactions = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const myFilledOrders = myFilledOrdersSelector(state)
    const showMyFilledOrders = myFilledOrdersLoadedSelector(state)
    const myOpenOrders = myOpenOrdersSelector(state)
    const orderCancelling = orderCancellingSelector(state)
    const myOpenOrdersLoaded = myOpenOrdersLoadedSelector(state)
    const showMyOpenOrders = myOpenOrdersLoaded && !orderCancelling
    const exchange = exchangeSelector(state)
    const account = accountSelector(state)
    return (
        <div className="card bg-dark text-white">
          <div className="card-header">
            My Transactions
          </div>
          <div className="card-body">
            <Tabs defaultActiveKey="trades" className="bg-dark text-white">
              <Tab eventKey="trades" title="Trades" className="bg-dark">
                <table className="table table-dark table-sm small">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>DAPP</th>
                      <th>DAPP/ETH</th>
                    </tr>
                  </thead>
                  { showMyFilledOrders ? renderMyFilledOrders(myFilledOrders) : <Spinner type="table" />}
                </table>
              </Tab>
              <Tab eventKey="orders" title="Orders">
                <table className="table table-dark table-sm small">
                  <thead>
                    <tr>
                      <th>Amount</th>
                      <th>DAPP/ETH</th>
                      <th>Cancel</th>
                    </tr>
                  </thead>
                  { showMyOpenOrders ? renderMyOpenOrders(myOpenOrders, dispatch, exchange, account) : <Spinner type="table" />}
                </table>
              </Tab>
            </Tabs>
          </div>
        </div>
      )
}

export default MyTransactions
