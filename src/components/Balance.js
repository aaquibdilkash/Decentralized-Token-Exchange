import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs, Tab } from "react-bootstrap";
import Spinner from "./Spinner";
import {
  loadBalances,
  depositEther,
  depositToken,
  withdrawEther,
  withdrawToken,
} from "../store/interactions";
import {
  exchangeSelector,
  tokenSelector,
  accountSelector,
  web3Selector,
  etherBalanceSelector,
  tokenBalanceSelector,
  exchangeEtherBalanceSelector,
  exchangeTokenBalanceSelector,
  balancesLoadingSelector,
  etherDepositAmountSelector,
  etherWithdrawAmountSelector,
  tokenDepositAmountSelector,
  tokenWithdrawAmountSelector,
} from "../store/selectors";
import {
  etherDepositAmountChanged,
  etherWithdrawAmountChanged,
  tokenDepositAmountChanged,
  tokenWithdrawAmountChanged,
} from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const renderForm = (
  dispatch,
  exchange,
  web3,
  account,
  etherBalance,
  tokenBalance,
  exchangeEtherBalance,
  exchangeTokenBalance,
  etherDepositAmount,
  token,
  tokenDepositAmount,
  etherWithdrawAmount,
  tokenWithdrawAmount
) => {
  return (
    <Tabs defaultActiveKey="deposit" className="bg-dark text-white">
      <Tab eventKey="deposit" title="Deposit" className="bg-dark">
        <table className="table table-dark table-sm small">
          <thead>
            <tr>
              <th>Token</th>
              <th>Wallet</th>
              <th>Exchange</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ETH</td>
              <td>{etherBalance}</td>
              <td>{exchangeEtherBalance}</td>
            </tr>
          </tbody>
        </table>

        <form
          className="row"
          onSubmit={(event) => {
            event.preventDefault();
            depositEther(dispatch, exchange, web3, etherDepositAmount, account);
          }}
        >
          <div className="col-12 col-sm pr-sm-2">
            <input
              type="text"
              placeholder="ETH Amount"
              onChange={(e) =>
                dispatch(etherDepositAmountChanged(e.target.value))
              }
              className="form-control form-control-sm bg-dark text-white"
              required
            />
          </div>
          <div className="col-12 col-sm-auto pl-sm-0">
            <button type="submit" className="btn btn-primary btn-block btn-sm">
              Deposit
            </button>
          </div>
        </form>

        <table className="table table-dark table-sm small">
          <tbody>
            <tr>
              <td>DZD</td>
              <td>{tokenBalance}</td>
              <td>{exchangeTokenBalance}</td>
            </tr>
          </tbody>
        </table>

        <form
          className="row"
          onSubmit={(event) => {
            event.preventDefault();
            depositToken(
              dispatch,
              exchange,
              web3,
              token,
              tokenDepositAmount,
              account
            );
          }}
        >
          <div className="col-12 col-sm pr-sm-2">
            <input
              type="text"
              placeholder="DAPP Amount"
              onChange={(e) =>
                dispatch(tokenDepositAmountChanged(e.target.value))
              }
              className="form-control form-control-sm bg-dark text-white"
              required
            />
          </div>
          <div className="col-12 col-sm-auto pl-sm-0">
            <button type="submit" className="btn btn-primary btn-block btn-sm">
              Deposit
            </button>
          </div>
        </form>
      </Tab>

      <Tab eventKey="withdraw" title="Withdraw" className="bg-dark">
        <table className="table table-dark table-sm small">
          <thead>
            <tr>
              <th>Token</th>
              <th>Wallet</th>
              <th>Exchange</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ETH</td>
              <td>{etherBalance}</td>
              <td>{exchangeEtherBalance}</td>
            </tr>
          </tbody>
        </table>

        <form
          className="row"
          onSubmit={(event) => {
            event.preventDefault();
            withdrawEther(
              dispatch,
              exchange,
              web3,
              etherWithdrawAmount,
              account
            );
          }}
        >
          <div className="col-12 col-sm pr-sm-2">
            <input
              type="text"
              placeholder="ETH Amount"
              onChange={(e) =>
                dispatch(etherWithdrawAmountChanged(e.target.value))
              }
              className="form-control form-control-sm bg-dark text-white"
              required
            />
          </div>
          <div className="col-12 col-sm-auto pl-sm-0">
            <button type="submit" className="btn btn-primary btn-block btn-sm">
              Withdraw
            </button>
          </div>
        </form>

        <table className="table table-dark table-sm small">
          <tbody>
            <tr>
              <td>DAPP</td>
              <td>{tokenBalance}</td>
              <td>{exchangeTokenBalance}</td>
            </tr>
          </tbody>
        </table>

        <form
          className="row"
          onSubmit={(event) => {
            event.preventDefault();
            withdrawToken(
              dispatch,
              exchange,
              web3,
              token,
              tokenWithdrawAmount,
              account
            );
          }}
        >
          <div className="col-12 col-sm pr-sm-2">
            <input
              type="text"
              placeholder="DAPP Amount"
              onChange={(e) =>
                dispatch(tokenWithdrawAmountChanged(e.target.value))
              }
              className="form-control form-control-sm bg-dark text-white"
              required
            />
          </div>
          <div className="col-12 col-sm-auto pl-sm-0">
            <button type="submit" className="btn btn-primary btn-block btn-sm">
              Withdraw
            </button>
          </div>
        </form>
      </Tab>
    </Tabs>
  );
};

const Balance = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const exchange = exchangeSelector(state);
  const account = accountSelector(state);
  const token = tokenSelector(state);
  const web3 = web3Selector(state);
  const etherBalance = etherBalanceSelector(state);
  const tokenBalance = tokenBalanceSelector(state);
  const exchangeEtherBalance = exchangeEtherBalanceSelector(state);
  const exchangeTokenBalance = exchangeTokenBalanceSelector(state);
  const balancesLoading = balancesLoadingSelector(state);
  const showForm = !balancesLoading;
  const etherDepositAmount = etherDepositAmountSelector(state);
  const etherWithdrawAmount = etherWithdrawAmountSelector(state);
  const tokenDepositAmount = tokenDepositAmountSelector(state);
  const tokenWithdrawAmount = tokenWithdrawAmountSelector(state);

  const loadBlockchainData = async () => {
    await loadBalances(dispatch, web3, exchange, token, account);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);
  return (
    <div className="card bg-dark text-white">
      <div className="card-header">Balance</div>
      <div className="card-body">
        {showForm ? (
          renderForm(
            dispatch,
            exchange,
            web3,
            account,
            etherBalance,
            tokenBalance,
            exchangeEtherBalance,
            exchangeTokenBalance,
            etherDepositAmount,
            token,
            tokenDepositAmount,
            etherWithdrawAmount,
            tokenWithdrawAmount
          )
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Balance;
