import React from "react";
import web3 from "./web3";
import lottery from "./lottery";

class App extends React.Component {
  state = {
    manager: "2",
    players: [],
    balance:'',
    value: '',
    message: '...',
    lastWinner : ''
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await lottery.methods.getPool().call();
    this.setState({manager,players,balance});
  }
  
  onSubmit = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    this.setState({message:'Waiting on transaction success...'})

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value,'ether')
    });

    this.setState({message:'You have been entered!'})

  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({message: 'Waiting on transction success...'});

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({message: 'A winner has been picked!'});

  };


  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
          <p>
            This contract is managed by {this.state.manager} There are currently {this.state.players.length} pepole entered,
            competing to win {web3.utils.fromWei(this.state.balance,'ether')} ether!
          </p>

          <hr />
          
          <from onSubmit ={this.onSubmit}>
            <h4>Want to try your luck?</h4>
            <div>
                <label>Amount of ether to enter</label>
                <input 
                  value={this.state.value}
                  onChange={event => this.setState({value: event.target.value})}
                />
            </div>
            <button onClick={this.onSubmit}>Enter</button>
          </from>
          <hr />

          <h4>Ready to pick a winner?</h4>
          <button onClick={this.onClick}>Pick a winner</button>

          <hr />
          <h1>{this.state.message}</h1>
      </div>
    );
  }
}
export default App;
