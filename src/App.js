import React, { useState, useEffect, Fragment } from 'react';
import './App.css';
import data from './data';
import moment from 'moment';
import MonthlyDetails from './components/MothlyDetails';
import MonthSpecificDetails from './components/MonthSpecificDetails';
import Layout from './components/Layout';

function App() {
  const [loadedData, setloadedData] = useState({});
  const [userRewards, setCalcRewards] = useState({});
  const [userTransactions, setUserTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [newTransaction, setNewTransaction] = useState({ date: new Date(), amount: 0 });

  useEffect(() => {
    setloadedData({ ...data });
    setUsers(Object.keys(data));
  }, []);

  const recalculateUserData = () => {
    if(!currentUser) return;
    let userData = JSON.parse(JSON.stringify(loadedData[currentUser]));

    let monthViseValues = {};
    userData.forEach(data => {
      let date = moment(data.date);
      if (date.get('year') === moment().get('year')) {
        const monthName = date.format('MMMM');
        const reward = data.reward || calRew(data.amount);
        data.reward = reward;
        if (!monthViseValues[monthName]) {
          monthViseValues[monthName] = {
            amounts: [data.amount],
            rewards: [reward],
            totalAmount: data.amount,
            totalReward: data.reward,
          };
        } else {
          monthViseValues[monthName].amounts.push(data.amount);
          monthViseValues[monthName].rewards.push(reward);
          monthViseValues[monthName].totalAmount += data.amount;
          monthViseValues[monthName].totalReward += reward;
        }
      }
    });
    setCalcRewards({ ...monthViseValues });
    setUserTransactions([...userData]);
  }

  useEffect(recalculateUserData, [currentUser, loadedData])

  const updateInput = (event) => {
    setNewTransaction({
      ...newTransaction,
      [event.target.name]: event.target.value
    });
  }

  const addNewTransaction = () => {
    let data = JSON.parse(JSON.stringify(loadedData));
    let date = moment(newTransaction['date']);
    if (date.get('year') === moment().get('year')) {
      data[currentUser].push(newTransaction);
      setloadedData(data);
    }
    setNewTransaction({ date: new Date(), amount: 0 });
  }

  return (
    <Layout>
      <h2 style={{ textAlign: "center" }}>Rewards Interface</h2>
      <div className="select-style">
        <select onChange={e => setCurrentUser(e.target.value)} value={currentUser} >
          <option value="" disabled>Select User</option>
          {users.map((item, index) => (<option key={index} value={item}> {item.toUpperCase()} </option>))}
        </select>
      </div>

      {
        currentUser && (<Fragment>

          <MonthlyDetails userRewards={userRewards} />

          <MonthSpecificDetails userTransactions={userTransactions} />

          <hr/>

          <h4>Add Transactions</h4>
          <h5>Only Transactions between {moment().startOf('year').format('DD-MMM-YYYY')} and  {moment().endOf('year').format('DD-MMM-YYYY')} will be added</h5>
          <label>Date : </label><input type="date" name="date" value={newTransaction.date} onChange={(e) => updateInput(e)}></input>
          <label>Amount :</label><input type="number" name="amount" value={newTransaction.amount} onChange={(e) => updateInput(e)}></input>
          <button onClick={() => addNewTransaction()}>Add Transaction</button>
        </Fragment>)
      }

    </Layout>
  );
}

export default App;

function calRew(price) {
  const doublePoints = Math.max(0, price - 100);
  const singlePoints = price > 99 ? 50 : Math.max(0, price - 50);

  return doublePoints * 2 + singlePoints;
}
