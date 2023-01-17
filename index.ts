import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
const state: Player[] = []

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    const json = JSON.parse(data.toString()) as Player
    console.log('received: %s', json);
    const doesItExist = state.find(a => a.ethAddress == json.ethAddress)
    console.log(doesItExist);
    
    if(doesItExist) doesItExist.position = json.position
    else state.push(json)
    wss.clients.forEach((client)=>{
        client.send(JSON.stringify(state))
    })
  });

  ws.send('something');
});

interface Player {
    status:"seeker" | "hider",
    position: [number,number,number],
    ethAddress: string
}