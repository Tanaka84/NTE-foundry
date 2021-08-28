export function fillBag(){
    let user = game.user
    ChatMessage.create({content: `${user.name} is adding tokens to the bag`})
    let d = new Dialog({
        title: "Add tokens to bag",
        content: "<h3>Choose which type of token you wish to add</h3><br><label for='white_tokens' style='padding-left:5%;'>&#9711;: </label><input type='number' id='white_tokens' placeholder='0' style = 'width:15%;'><br><br><label for='black_tokens' style='padding-left:5%;'>&#x2B24;: </label><input type='number' id='black_tokens' placeholder='0'  style = 'width:15%;'><br><br>",
        buttons: {
            confirm: {
            icon: '<i class="fas fa-check"></i>',
            label: "Confirm",
            callback: () => { 
            const white_tokens = parseInt(document.getElementById('white_tokens').value)
            const black_tokens = parseInt(document.getElementById('black_tokens').value)
            let baggie = []
            if(white_tokens>0){
                addTokens(white_tokens,'white')
                for (let i=0; i<white_tokens; i++){
                    baggie.push("&#9711;")
                }
            }
            if(black_tokens>0){
                addTokens(black_tokens,'black')
                for (let i=0; i<black_tokens; i++){
                    baggie.push("&#x2B24;")
                }
            }
            console.log(baggie)
            if(baggie.length>0){
            ChatMessage.create({content: `${user.name} added ${baggie.join(" ")} to the bag`})
            } else {ChatMessage.create({content: `${user.name} didn't add any token to the bag`})}

            }
        },
            cancel: {
            icon: '<i class="fas fa-times"></i>',
            label: "Cancel",
            callback: () =>{ChatMessage.create({content: `${user.name} didn't add any token to the bag`})}
            }
        }})
    
    d.render(true)
};



export function addRandom(){
    let user = game.user
    ChatMessage.create({content: `${user.name} is adding tokens to the bag`})
    let d = new Dialog({
        title: "Add random tokens to bag",
        content: "<h3>How many tokens are you adding?</h3><br><label for='tokens'><b>Tokens</b>: </label><input type='number' id='tokens' placeholder='0' style = 'width: 10%'><br><br>",  
        buttons: {
            confirm: {
            icon: '<i class="fas fa-check"></i>',
            label: "Confirm",
            callback: () => { 
            const tokens = parseInt(document.getElementById('tokens').value)
            var white_tokens = 0;
            var black_tokens = 0;
            for(let i = 0; i<tokens; i++ ){
                let random_number = Math.random()
                if(random_number < 0.5){
                    white_tokens += 1
                } else (black_tokens += 1)
            }
            if(white_tokens>0){
                addTokens(white_tokens,'white')
            }
            if(black_tokens>0){
                addTokens(black_tokens,'black')
            }

            if(tokens>0){
            ChatMessage.create({content: `${user.name} added ${tokens} tokens to the bag`})
            } else {ChatMessage.create({content: `${user.name} didn't add any token to the bag`})}

            }
        },
            cancel: {
            icon: '<i class="fas fa-times"></i>',
            label: "Cancel",
            callback: () =>{ChatMessage.create({content: `${user.name} didn't add any token to the bag`})}
            }
        }})
    
    d.render(true)
}


export  function addBlind(){
    let d = new Dialog({
        title: "Add a blind token",
        content: "Choose which type of token you wish to add",
        buttons: {
            white: {
            icon: '<i class="fas fa-circle-notch"></i>',
            label: "White Token",
            callback: () => {
            let user = game.user
            addTokens(1, 'white')
            ChatMessage.create({content: `${user.name} added a secret token to the bag`})}
            },
            black: {
            icon: '<i class="fas fa-circle"></i>',
            label: "Black Token",
            callback: () => {
            let user = game.user    
            addTokens(1, 'black')
            ChatMessage.create({content: `${user.name} added a secret token to the bag`})}
            },
            cancel: {
                icon: '<i class="fas fa-times"></i>',
                label: "Cancel",

                },
            }, });
           d.render(true);}
        



export async function emptyBag(){
    let user = game.user
    let journal = game.journal.getName('_bag_')
    await journal.setFlag("nte", 'white', 0)
    await journal.setFlag("nte", 'black', 0)
    ChatMessage.create({content: `${user.name} emptied the bag`})}


export function checkBag(){
    let user = game.user
    let bag = [];
    let white_tokens = game.journal.getName('_bag_').getFlag('nte', 'white');
    let black_tokens = game.journal.getName('_bag_').getFlag('nte', 'black');
    for (let i = 0; i < white_tokens; i++) { 
        bag.push('&#9711;')
    }
    for (let i = 0; i < black_tokens; i++) { 
        bag.push('&#x2B24;')
    } ChatMessage.create({content: `${user.name} is checking the bag`})
    if(bag.length > 0){
    ChatMessage.create({whisper:[game.user.id],  content: `The bag constains ${bag.join(" ")}`})}
    else {ChatMessage.create({whisper:[ game.user.id],  content: `The bag is empty`})} 
}



export  function drawToken(){
    let d = new Dialog({
        title: "Draw Tokens",
        content: "<br><label for='tokens'><b>How many tokens are you drawing?</b> </label><input type='number' id='tokens' placeholder='0' style='width: 10%;'><br><br><label for='checkbox'><b>Is this a blind draw?: </b> </label><input type='checkbox' id='checkbox'><br><br>",
        buttons: {
            Draw: {
            icon: '<i class="fas fa-hand-paper"></i>',
            label: "Draw Tokens",
            callback: () => {
                let draw = parseInt(document.getElementById('tokens').value)
                let blind = document.getElementById('checkbox').checked
                let user = game.user
                let result = []
                let blackresults = 0
                let whiteresults = 0
                let bag = [];
                let white_tokens = game.journal.getName('_bag_').getFlag('nte', 'white');
                let black_tokens = game.journal.getName('_bag_').getFlag('nte', 'black');
                for (let i = 0; i < white_tokens; i++) { 
                    bag.push('&#9711;')
                }
                for (let i = 0; i < black_tokens; i++) { 
                    bag.push('&#x2B24;')
                }   
            
                if (bag.length > 0){
                    if (draw > bag.length){
                        draw = bag.length
                    }
                    for(let i = 0; i <draw ;i++){
                        let random = Math.floor(Math.random() * bag.length)
                        result.push(bag[random])
                        if(bag[random] === '&#9711;'){
                            whiteresults += 1
                        } else { blackresults += 1 }
                    }
                    setTokensFlagForUser(white_tokens-whiteresults, 'white')
                    setTokensFlagForUser(black_tokens-blackresults, 'black')
                    if(!blind){
                    ChatMessage.create({content: `${user.name} grabbed ${result.join(" ")}`})
                    }
                    else{
                        ChatMessage.create({content: `${user.name} grabbed ${draw} secret tokens`})
                        ChatMessage.create({whisper:[game.user.id], content: `You grabbed ${result.join(" ")}`})
                    }
                }
            
                else if (bag.length < 1){
                    ChatMessage.create({content: `${user.name} tried to draw from the bag, but it's empty`})
                }
            }
            },
        }
    })
    d.render(true);
}
    

function addTokens(number, color){
    let token_set = getJournalTokens(color)
    token_set += number
    setTokensFlagForUser(token_set, color)
    }
    

function getJournalTokens(color){
    let tokens = game.journal.getName("_bag_").getFlag('nte', color)
    if (!tokens) {
        tokens = 0
    }
    return tokens
}

function setTokensFlagForUser(tokens, color){
    let bag = game.journal.getName("_bag_")
     bag.setFlag("nte", color, tokens)}


