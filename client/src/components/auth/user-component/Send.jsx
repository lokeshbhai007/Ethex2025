import React, { useState } from "react";
import { ethers } from "ethers";
import "./escrow.css";

const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
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
    "inputs": [{ "internalType": "address", "name": "_receiver", "type": "address" }],
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
    "name": "getReceiver",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  }
];

function Send() {
  const [account, setAccount] = useState("");
  const [receiver, setReceiver] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
      setMessage(`✅ Connected: ${accounts[0]}`);
    } catch (err) {
      setMessage("Error connecting wallet");
      console.error(err);
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
      setMessage("Enter Receiver Address and Amount");
      return;
    }
    setLoading(true);
    try {
      const contract = await getContract();
      const tx = await contract.deposit(receiver, {
        value: ethers.parseEther(depositAmount),
      });
      setMessage("Sending deposit...");
      await tx.wait();
      setMessage("Deposit Successful!");
    } catch (err) {
      console.error(err);
      setMessage("Deposit failed: " + err.message);
    }
    setLoading(false);
  };

  const acknowledgeReceipt = async () => {
    if (!account) {
      setMessage("Please Connect MetaMask Wallet");
      return;
    }
    try {
      const contract = await getContract();
      const receiverAddress = await contract.getReceiver();

      console.log("Receiver Address:", receiverAddress);
      if (account.toLowerCase() !== receiverAddress.toString().toLowerCase()) {
        setMessage("Only Receiver Can Acknowledge!");
        return;
      }

      const tx = await contract.acknowledgeReceipt();
      setMessage("Sending acknowledgment...");
      await tx.wait();
      setMessage("Acknowledgment Successful!");
    } catch (err) {
      console.error(err);
      setMessage("Acknowledgment Failed: " + err.message);
    }
  };

  const releaseFund = async () => {
    setLoading(true);
    try {
      const contract = await getContract();
      const tx = await contract.releaseFund();
      setMessage("Releasing funds...");
      await tx.wait();
      setMessage("Funds Released Successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Release Failed: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="container-escrow">
      <h1>EtheX</h1>
      {account ? (
        <p><strong>Connected:</strong> {account}</p>
      ) : (
        <button onClick={connectWallet} disabled={loading}>
          Connect Wallet
        </button>
      )}

      <div className="section-escrow">
        <h2>Deposit Funds</h2>
        <input
          type="text"
          placeholder="Receiver Address"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount in ETH"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />
        <button onClick={depositFunds} disabled={loading}>
          Deposit
        </button>
      </div>

      <div className="section-escrow">
        <h2>Acknowledge Receipt</h2>
        <button onClick={acknowledgeReceipt} disabled={loading}>
          Acknowledge
        </button>
      </div>

      <div className="section-escrow">
        <h2>Release Funds</h2>
        <button onClick={releaseFund} disabled={loading}>
          Release
        </button>
      </div>

      {message && <p className="status-escrow">{message}</p>}
    </div>
  );
}

export default Send;
