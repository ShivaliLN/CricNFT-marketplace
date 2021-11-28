import { Moralis } from 'moralis';
const serverUrl = "https://d4fpdskt1gdn.usemoralis.com:2053/server";
const appId = "6ofKR8HYDuvsK4oOvy52xA0OFJTWNv0zFzgBj5Si";
Moralis.start({ serverUrl, appId });

//const CONTRACT_ADDRESS = "INSERT_CONTRACT_ADDRESS";
/*
function processAddToken(data) {
  data.forEach((row) => {
    addRowToTable("top_winners", [row.objectId, row._id]);
  });
}

function processBiggestLosers(data) {
  data.forEach((row) => {
    addRowToTable("top_losers", [row.objectId, row.totalLost]);
  });
}
function processBiggestBets(data) {
  data.forEach((row) => {
    addRowToTable("biggest_bets", [row.user, row.bet, row.win ? "Win" : "Loss"]);
  });
}
*/
async function updateStats() {
  let promises = [
    Moralis.Cloud.run("addToken", {}),
  ];
  let results = await Promise.all(promises);
  //console.log(results[0][0].attributes.teamAddress)
  //console.log(results[0][0].attributes.seasonId)
  console.log(results[0][0].attributes.address)
  return results[0][0].attributes.address
  //console.log(results[0][0].attributes.seasonId)
  //console.log(results[0].length)
  //for(let i=0;i<results[0].length;i++){
  //  results.forEach((row) => {
  //      row.forEach((row2) => {
  //          console.log(row2.id);
  //        });
  //      });
  //}
 // results.forEach((row) => {
  //  console.log(row.teamAddress);
  //});
  //processAddToken(results[0]);
  //processBiggestLosers(results[1]);
  //processBiggestBets(results[2]);
}

/*
function addRowToTable(tableId, data) {
  let tableRow = document.createElement("tr");
  data.forEach((element) => {
    let newRow = document.createElement("td");    
    newRow.innerHTML = element;
    tableRow.appendChild(newRow);
  });
  document.getElementById(tableId).appendChild(tableRow);
}
*/
updateStats();