const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
 
const { abi, evm } = require('../compile');
 
let accounts;
let lottery;
 
beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  lottery = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object
    })
    .send({ from: accounts[0], gas: '1000000' });
});
 
describe('Lottery', () => {
  it('deploys a contract', () => {
    assert.ok(lottery.options.address);
    console.log('address is',lottery.options.address);
    // web3.eth.getAccounts(console.log);
  });

  it('check money',async () => {
    const money = await web3.eth.getBalance(accounts[0]);
    console.log('accounts[0] is',money);
  });

  it('who is manager',async () => {
    const manager = await lottery.methods.manager().call();
    console.log('manager address is ',manager);
  });


  // it('enter money', async () => {
  //   await lottery.methods.enter().send({
  //       from: accounts[0], 
  //       value: web3.utils.toWei('0.02','ether')
  //   });

    // await lottery.methods.enter().send({
    //     from: accounts[1], 
    //     value: web3.utils.toWei('0.03','ether')
    // });

  //   await lottery.methods.enter().send({
  //       from: accounts[2], 
  //       value: web3.utils.toWei('0.04','ether')
  //   });

    // const players = await lottery.methods.getPlayers().call({
    //     from: accounts[0]
    // });
    // assert.equal(accounts[0],players[0]);
    // assert.equal(accounts[1],players[1]);
    // assert.equal(accounts[2],players[2]);
    // assert.equal(3,players.length);
  // });

  // it('use tryCatch', async () => { 
  //   try{
  //       await lottery.methods.enter().send({
  //           from: accounts[2], 
  //           value: 100
  //       });
  //   }catch(err){
  //       assert(err);
  //   }
  // });


  // it('only manager can call pickWinner', async () => { 
  //   try{
  //       await lottery.methods.pickWinner().send({
  //           from: accounts[0], 
  //       });
  //   }catch(err){
  //       console.log('error user');
  //   }
  // });

  // it('send money to the winner and resets the players array', async () =>{
  //   await lottery.methods.enter().send({
  //     from: accounts[0],
  //     value: web3.utils.toWei('2','ether')
  //   })

  //   const initialBalance = await web3.eth.getBalance(accounts[0]);
  //   await lottery.methods.pickWinner().send({
  //     from: accounts[0]
  //   });

  //   const finalBalance = await web3.eth.getBalance(accounts[0]);
  //   console.log(finalBalance - initialBalance);
  // });


//   it('bonus pool', async () => {
//     const pool = await lottery.methods.getPool().call({
//         from: accounts[0]
//     })
//     console.log('total bonus pool',pool);
//   });

//   it('pick Winner', async () => {
//     await lottery.methods.setMessage('bye').send({ from: accounts[0] });
//     const message = await lottery.methods.message().call();
//     assert.equal(message, 'bye');
//   });
});