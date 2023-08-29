import * as IPFS from 'ipfs-core';
import Web3 from 'web3';

import models from './models.json' assert { type: "json"};
import marketArtifact from "../truffle/build/contracts/Marketplace.json" assert { type: 'json'};
import accessCTLArtifact from "../truffle/build/contracts/AccessManagement.json" assert { type: 'json'};
import propertyArtifact from "../truffle/build/contracts/Property.json" assert { type: 'json'};

async function main() {

    const RPC_URL =   'http://127.0.0.1:8545'   // 'http://10.4.130.35:8545' 
    const PRIVATE_KEY = 'c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3'
    
    //const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

    const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL, { timeout: 5 * 60 * 1000 }), null, {
        transactionConfirmationBlocks: 1,
      })
    const account = web3.eth.accounts.privateKeyToAccount('0x' + PRIVATE_KEY);
    web3.eth.accounts.wallet.add('0x' + PRIVATE_KEY);
    web3.eth.defaultAccount = account.address;
    const networkID = await web3.eth.net.getId();
    const newMember = web3.eth.accounts.privateKeyToAccount('0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3')
    web3.eth.accounts.wallet.add('0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3')
    const memberAddress = newMember.address ;
    console.log(memberAddress);

    let accessAddress = accessCTLArtifact.networks[networkID].address;
    var accessCTL = new web3.eth.Contract(accessCTLArtifact.abi, accessAddress);
    console.log(accessAddress);
    let propertyAddress = propertyArtifact.networks[networkID].address;
    var property = new web3.eth.Contract(propertyArtifact.abi, propertyAddress);
    console.log(propertyAddress);
 
    const node = await IPFS.create();
    const version = await node.version();

    console.log("Version:", version.version);


     await  accessCTL.methods.addMember(web3.eth.defaultAccount).send({ from: web3.eth.defaultAccount, gas: 3000000, gasPrice: 0 }) 
     let cid = "azer";
     let cidFile = "kjhjghfgdfsd";
     await property.methods.addModel(cid, cidFile, 50000, web3.eth.defaultAccount ).send({ from: web3.eth.defaultAccount, gas: 3000000, gasPrice: 0 })
       

   /*models.forEach(async (model, idx) => {
        //remove price before sendinng to ipfs
        let price = model.price
        delete model.price

        let fileAdded = await node.add({
            path: "model" + idx,
            content: JSON.stringify(model),
        });

        console.log("Added file to IPFS:", fileAdded.path, fileAdded.cid, price);

        let cid = fileAdded.cid.toString()
        await property.methods.addModel(cid, cidFile, web3.eth.defaultAccount, Web3.utils.toWei(price.toString())).send({ from: web3.eth.defaultAccount, gas: 3000000, gasPrice: 0 })
        console.log("Added block", idx, "to blockchain:", cid);

    }) ;*/

    process.exit()

}

main();