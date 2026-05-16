// #axios syntax

const axios = require("axios")

async function main(){
    const response = await axios.get("https://sum-server.100xdevs.com/todos")
    const json = await response.json();
    console.log(json.todos.lenght);
}

main();

//This is just a syntax. it won't work when we run this specific code.

//POST
//change request methodsend bodysend headers



// heve to correct this one 