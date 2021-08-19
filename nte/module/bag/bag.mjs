export async function addWhite(type = "&#9711;"){
    let user = game.user
    let token_set = getJournalTokens('white')
    token_set += 1 
    setTokensFlagForUser(token_set, 'white')
    ChatMessage.create({content: `${user.name} added ${type} to the bag`})}


export async function addBlack(type = "&#x2B24;"){
    let user = game.user
    let token_set = getJournalTokens('black')
    token_set += 1 
    setTokensFlagForUser(token_set, 'black')
    ChatMessage.create({content: `${user.name} added ${type} to the bag`})}


export async function addRandom(){
    let chance = Math.random();
    if (chance < 0.5){
        addBlack("a random token")     
    } else addWhite("a random token")};

export async function addBlind(){
    let d = new Dialog({
        title: "Add a blind token",
        content: "Choose which type of token you wish to add",
        buttons: {
            white: {
            icon: '<i class="fas fa-check"></i>',
            label: "White Token",
            callback: () => addWhite("a secret token")
            },
            black: {
            icon: '<i class="fas fa-times"></i>',
            label: "Black Token",
            callback: () => addBlack("a secret token")
            }
            }, });
           d.render(true);}
        



export function emptyBag(){
    let user = game.user
    let journal = game.journal.getName('_bag_')
    journal.setFlag("nte", 'white', null)
    journal.setFlag("nte", 'black', null)
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



export function drawToken(blind = false){
    let user = game.user
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
        let random = Math.floor(Math.random() * bag.length)
        let result = bag[random] 
        if (result === '&#9711;'){
            setTokensFlagForUser(white_tokens-1, 'white')
            if(!blind){
                ChatMessage.create({content: `${user.name} grabbed ${result}`})
            }
            else {
                ChatMessage.create({content: `${user.name} grabbed a secret token`})
                ChatMessage.create({whisper:[game.user.id], content: `You grabbed grabbed ${result}`})
            }
        } 
        if (result === '&#x2B24;'){ setTokensFlagForUser(black_tokens-1, 'black')
            if(!blind){
                ChatMessage.create({content: `${user.name} grabbed ${result}`}) 
            } else {
                ChatMessage.create({content: `${user.name} grabbed a secret token`})
                ChatMessage.create({whisper:[game.user.id], content: `You grabbed grabbed ${result}`})
            }
        }}

    if (bag.length < 1){
        ChatMessage.create({content: `${user.name} tried to draw from the bag, but it's empty`})
    }
}



function getJournalTokens(color){
    let tokens = game.journal.getName("_bag_").getFlag('nte', color)
    if (!tokens) {
        tokens = 0
    }
    return tokens
}

async function setTokensFlagForUser(tokens, color){
    let bag = game.journal.getName("_bag_")
    await bag.setFlag("nte", color, null)
    await bag.setFlag("nte", color, tokens)}