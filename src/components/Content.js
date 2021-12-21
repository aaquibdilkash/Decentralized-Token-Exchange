import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllOrders, subscribeToEvents } from "../store/interactions";
import { exchangeSelector } from "../store/selectors";
import Balance from "./Balance";
import MyTransactions from "./MyTransactions";
import NewOrder from "./NewOrder";
import OrderBook from "./OrderBook";
import PriceChart from "./PriceChart";
import Trades from "./Trades";

export const Content = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const exchange = exchangeSelector(state);

  const loadBlockchainData = async () => {
    await loadAllOrders(exchange, dispatch);
    await subscribeToEvents(exchange, dispatch)
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);
  return (
    <div className="content">
      <div className="vertical-split">
      <Balance />
        <NewOrder />
      </div>
      <OrderBook />
      <div className="vertical-split">
        <PriceChart />
        <MyTransactions />
      </div>
      <Trades />
    </div>
  );
};

export default Content;
