import React, { useState } from "react";
import { ethers } from "ethers";
import ethex from "../../../assets/ethex.png";
import "./send.css";

const contractAddress = "0xffBC3a5cA2876642d9B86c2803aA0BeB30516FCc";
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "acknowledgeReceipt",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_receiver",
        "type": "address"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "releaseFund",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "receiver",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "sender",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "senderAck",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "receiverAck",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

function App() {
  const [account, setAccount] = useState("");
  const [receiver, setReceiver] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [message, setMessage] = useState("");

  
  const connectWallet = async () => {
    if (!window.ethereum) {
      setMessage("Please install MetaMask");
      return;
    }
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      setMessage(`Connected: ${accounts[0]}`);
    } catch (err) {
      console.error(err);
      setMessage("Error connecting wallet");
    }
  };

  
  const getContract = async () => {
    if (!window.ethereum) throw new Error("Please install MetaMask");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  };

  
  const depositFunds = async () => {
    if (!receiver || !depositAmount) {
      setMessage("Enter receiver address and deposit amount");
      return;
    }
    try {
      const contract = await getContract();
      const tx = await contract.deposit(receiver, {
        value: ethers.parseEther(depositAmount),
      });
      setMessage(`Deposit tx sent: ${tx.hash}`);
      await tx.wait();
      setMessage("Deposit successful!");
    } catch (err) {
      console.error(err);
      setMessage("Deposit failed: " + err.message);
    }
  };

  const acknowledgeReceipt = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.acknowledgeReceipt();
      setMessage(`Acknowledgment tx sent: ${tx.hash}`);
      await tx.wait();
      setMessage("Acknowledgment successful!");
    } catch (err) {
      console.error(err);
      setMessage("Acknowledgment failed: " + err.message);
    }
  };

  const releaseFund = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.releaseFund();
      setMessage(`Release tx sent: ${tx.hash}`);
      await tx.wait();
      setMessage("Fund released successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Release failed: " + err.message);
    }
  };

  return (
    <>
      <div className="body-send">
        <div className="container-send">
          <img
            className="h1-send logo-text-h1"
            src={ethex}
            alt="logo"
          />
          {account ? (
            <p>
              <strong>Connected Account:</strong> {account}
            </p>
          ) : (
            <button className="wallet-button-send" onClick={connectWallet}>
              Connect Wallet
            </button>
          )}

          <div className="deopsite-send">
            <h2 className="h2-send">Deposit Funds</h2>
            <label className="label-font">
              Receiver Address:
              <input
                className="input-send"
                type="text"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                placeholder="Receiver address"
              />
            </label>

            <label className="label-font">
              Amount (ETH):
              <input
                className="input-send"
                type="text"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="Amount in ETH"
              />
            </label>

            <button className="button-send" onClick={depositFunds}>
              Deposit
            </button>
          </div>

          <div className="buttom-send">
            <h2 className="h2-send-button">Acknowledge Receipt</h2>
            <button className="ack-btn" onClick={acknowledgeReceipt}>Acknowledge</button>
          </div>

          <div  className="buttom-send">
            <h2 className="h2-send-button">Release Fund</h2>
            <button className="ack-btn" onClick={releaseFund}>Release</button>
          </div>

          {message && (
            <div className="status-send">
              <p className="p-send">
                <strong>Status:</strong> {message}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
