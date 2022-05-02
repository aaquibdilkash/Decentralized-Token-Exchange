import React, { useEffect } from 'react';
import './App.css';
import Web3 from 'web3'
import Token from '../abis/Token.json'
import {
  loadWeb3,
  loadAccount,
  loadToken,
  loadExchange
} from '../store/interactions'
import { useDispatch, useSelector } from 'react-redux';
import { contractsLoadedSelector } from '../store/selectors';
import Navbar from './Navbar';
import Content from './Content';

const App = () => {
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const contractsLoaded = contractsLoadedSelector(state)

  useEffect(() => {
    loadBlockchainData(dispatch)
  }, [])

  const loadBlockchainData = async (dispatch) => {
    const web3 = await loadWeb3(dispatch)
    const networkId = await web3.eth.net.getId()
    const accounts = await loadAccount(web3, dispatch)
    const token = await loadToken(web3, networkId, dispatch)
    if(!token) {
      window.alert('Token smart contract not detected on the current network. Please select Ropsten test network from Metamask extension.')
      return
    }
    const exchange = await loadExchange(web3, networkId, dispatch)
    if(!exchange) {
      window.alert('Exchange smart contract not detected on the current network. Please select Ropsten test network from Metamask entension.')
      return
    }
  }

    return (
      <div>
        <Navbar />
        {
          contractsLoaded ? <Content /> : <div className='content' ></div>
        }
      </div>
    );
  }

export default App;
