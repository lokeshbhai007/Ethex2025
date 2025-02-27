import React, { useState } from "react";
import { ethers } from "ethers";
import "./escrow.css"; // Import the new CSS file

const contractAddress = "0xd39008757AF0FCF6F00baF2BF253453Db31504D4";
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

function Send() {
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
      setMessage("⚠️ Enter receiver address and amount");
      return;
    }
    try {
      const contract = await getContract();
      const tx = await contract.deposit(receiver, {
        value: ethers.parseEther(depositAmount),
      });
      setMessage("⏳ Sending deposit...");
      await tx.wait();
      setMessage("✅ Deposit successful!");
    } catch (err) {
      console.error(err);
      if (err.code === "ACTION_REJECTED" || err.code === 4001) {
        setMessage("❌ Deposit failed: User rejected action");
      } else {
        setMessage("❌ Deposit failed: " + err.message);
      }
    }
  };

  const acknowledgeReceipt = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.acknowledgeReceipt();
      setMessage("⏳ Sending acknowledgment...");
      await tx.wait();
      setMessage("✅ Acknowledgment successful!");
    } catch (err) {
      console.error(err);
      if (err.code === "ACTION_REJECTED" || err.code === 4001) {
        setMessage("❌ Acknowledgment failed: User rejected action");
      } else {
        setMessage("❌ Acknowledgment failed: " + err.message);
      }
    }
  };

  const releaseFund = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.releaseFund();
      setMessage("⏳ Releasing funds...");
      await tx.wait();
      setMessage("✅ Funds released successfully!");
    } catch (err) {
      console.error(err);
      if (err.code === "ACTION_REJECTED" || err.code === 4001) {
        setMessage("❌ Release failed: User rejected action");
      } else {
        setMessage("❌ Release failed: " + err.message);
      }
    }
  };

  return (
    <div className="container-escrow">
      <h1 className="title-escrow">Escrow DApp</h1>
      {account ? (
        <p className="account-escrow"><strong>Connected Account:</strong> {account}</p>
      ) : (
        <button className="button-escrow" onClick={connectWallet}>Connect Wallet</button>
      )}

      <div className="section-escrow">
        <h2 className="subtitle-escrow">Deposit Funds</h2>
        <input className="input-escrow" type="text" value={receiver} onChange={(e) => setReceiver(e.target.value)} placeholder="Receiver address" />
        <input className="input-escrow" type="text" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} placeholder="Amount in ETH" />
        <button className="button-escrow" onClick={depositFunds}>Deposit</button>
      </div>

      <div className="section-escrow">
        <h2 className="subtitle-escrow">Acknowledge Receipt</h2>
        <button className="button-escrow" onClick={acknowledgeReceipt}>Acknowledge</button>
      </div>

      <div className="section-escrow">
        <h2 className="subtitle-escrow">Release Fund</h2>
        <button className="button-escrow" onClick={releaseFund}>Release</button>
      </div>

      {message && <p className="status-escrow"><strong>Status:</strong> {message}</p>}
    </div>
  );
}

export default Send;
