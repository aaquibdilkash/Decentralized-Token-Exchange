import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { accountSelector, exchangeSelector, orderBookLoadedSelector, orderBookSelector, orderFillingSelector } from "../store/selectors";
import Spinner from "./Spinner";
import { fillOrder } from '../store/interactions'


const renderOrder = (order, dispatch, exchange, account) => {
  return(
    <OverlayTrigger
      key={order.id}
      placement='auto'
      overlay={
        <Tooltip id={order.id}>
          {`Click here to ${order.orderFillAction}`}
        </Tooltip>
      }
    >
      <tr
        key={order.id}
        className="order-book-order"
        onClick={(e) => {
          fillOrder(dispatch, exchange, order, account)
        }}
      >
        <td>{order.tokenAmount}</td>
        <td className={`text-${order.orderTypeClass}`}>{order.tokenPrice}</td>
        <td>{order.etherAmount}</td>
      </tr>
    </OverlayTrigger>
  )
};

const renderOrderBook = (orderBook, dispatch, exchange, account) => {
  return (
    <tbody>
      {orderBook.sellOrders.map((order) => renderOrder(order, dispatch, exchange, account))}
      <tr>
        <th>DZD</th>
        <th>DZD/ETH</th>
        <th>ETH</th>
      </tr>
      {orderBook.buyOrders.map((order) => renderOrder(order, dispatch, exchange, account))}
    </tbody>
  );
};

const OrderBook = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const orderBook = orderBookSelector(state);
  const orderBookLoaded = orderBookLoadedSelector(state)
  const orderFilling = orderFillingSelector(state)
  const showOrderBook = orderBookLoaded && !orderFilling
  const exchange = exchangeSelector(state);
  const account = accountSelector(state);
  return (
    <div className="vertical">
      <div className="card bg-dark text-white">
        <div className="card-header">Order Book</div>
        <div className="card-body order-book">
          <table className="table table-dark table-sm small">
            {showOrderBook ? (
              renderOrderBook(orderBook, dispatch, exchange, account)
            ) : (
              <Spinner type="table" />
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
