/* Demo for FinTech@SG Course 
Retrieving JSON data from Server in a Tabular form
Author: Prof Bhojan Anand */
import React from 'react';
import logo from './logo.svg';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  callAPIServer() {
    // when component mounted, start a GET request
    // to specified URL
    fetch("http://localhost:8000/users/all")
      // when we get a response map the body to json
      .then(response => response.json())
      // and update the state data to said json
      .then(data => this.setState({ data }));

    fetch("http://localhost:8000/accounts/all")
      // when we get a response map the body to json
      .then(response => response.json())
      // and update the state data to said json
      .then(data => this.setState({ data }));

    fetch("http://localhost:8000/Transactions/all")
      // when we get a response map the body to json
      .then(response => response.json())
      // and update the state data to said json
      .then(data => this.setState({ data }));
  }


  componentDidMount() {   // react lifecycle method componentDidMount() 
    //will execute the callAPIserver() method after the component mounts.
    this.callAPIServer();
    //console.log(this.serverResObjArr);

  }
  /* Replace the table with paragraph below if you need paragraph
    <p className="App-intro">{JSON.stringify(this.state.data)}</p>
  */

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to My App</h1>
        </header>
        <h2> Customers Information </h2>
        <table className="myTable">
          <thead>
            <tr>
              <th>ID</th>
              <th> Name </th>
              <th> IC Number  </th>
              <th> EMAIL   </th>
              <th> Mobile  </th>
              <th> Password</th>
            </tr>
          </thead>
          <tbody>
            {(this.state.data).map((item) => {
              return (
                <tr key={item.id}>
                  <td> {item.id} </td>
                  <td> {item.name} </td>
                  <td> {item.ic_number} </td>
                  <td> {item.email}  </td>
                  <td> {item.mobile} </td>
                  <td> {item.password} </td>
                </tr>
              )
            }
            )}
          </tbody>
        </table>


        <p></p>
        <h2> Accounts Information </h2>
        <p></p>
        <table className="myTable">
          <thead>
            <tr>
              <th>Account ID</th>
              <th> Account Type </th>
              <th> Balance  </th>
              <th> Max limit   </th>
              <th> User ID  </th>
              <th> Date Create</th>
            </tr>
          </thead>

          <tbody>
            {(this.state.data).map((item) => {
              return (
                <tr key={item.user_id}>
                  <td> {item.accoun_id} </td>
                  <td> {item.account_type} </td>
                  <td> {item.balance} </td>
                  <td> {item.max_limit}  </td>
                  <td> {item.user_id} </td>
                  <td> {item.date_create} </td>
                </tr>
              )
            }
            )}
          </tbody>
        </table>

        <p></p>
        <h2> Transactions Information </h2>
        <p></p>
        <table className="myTable">
          <thead>
            <tr>
              <th> Transaction ID</th>
              <th> Account ID </th>
              <th> Account Number </th>
              <th> Transaction type </th>
              <th> Amount  </th>
              <th> Date </th>
            </tr>
          </thead>

          <tbody>
            {(this.state.data).map((item) => {
              return (
                <tr key={item.account_id}>
                  <td> {item.transaction_id} </td>
                  <td> {item.account_id} </td>
                  <td> {item.account_number} </td>
                  <td> {item.transaction_type}  </td>
                  <td> {item.amount} </td>
                  <td> {item.date} </td>
                </tr>
              )
            }
            )}
          </tbody>
        </table>




      </div>);
  }
}

export default App;
