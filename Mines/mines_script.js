/* Definerer nødvendige elementer */
poengEl = document.getElementById('poengOverskrift')
place = document.getElementById('place')
betInp = document.getElementById('betInp')
bet = document.getElementById('bet')
tilbakeMeld = document.getElementById('tilbakeMeld')
cashInnOgRestart = document.getElementById('cashInnOgRestart')
back = document.getElementById('back')
divForLeaderBoardKnappEl = document.getElementById('divForLeaderboardKnapp')
leaderboardKnappEl = document.getElementById('leaderboardKnapp')
divForBackEl = document.getElementById('divForBack')
divForHolderAvHolderAvTekstEl = document.getElementById('divForHolderAvHolderAvTekst')
divForHolderAvSpillEl = document.getElementById('divForHolderAvSpill')
holderAvSpillEl = document.getElementById('holderAvSpill')
divForHolderAvLeaderboardEl = document.getElementById('divForHolderAvLeaderboard')



back.addEventListener('click', function(){
    window.location.href = "../index.html"
})

/* Poeng */
if(localStorage.poeng){   /* Sjekker om spillet har blitt kjørt på pcen før og henter evt scoren fra localStorage */
    poeng = JSON.parse(localStorage.poeng)
}else{
    poeng = 1000   /* Hvis det er første gang, starter du med 1000 poeng */
}
poengEl.innerHTML += poeng.toFixed(1)   /* Passer på at det står riktig poengsum ved åpning av spillet */


/* Laging av spillbokser */
bokserArr = []
for (let i = 0; i < 25; i++) {
    boks = document.getElementById('holderAvSpill').appendChild(document.createElement('div'))   /* Lager boksene inni diven #holderAvSpill*/
    boks.id = i   /* Gjør at jeg kan identifisere boksene */
    boks.classList.add('spillBokser')
    bokserArr.push(boks)
}


/* Laging av leaderboard: */
leaderboardLiArr = []   /* Array med de 5 fake personene og evt spilleren */
leaderboardPersonerArr = []  /* Arry med de 5 liste elementene som vises på skjermen */
async function leaderboardF(){
    for (let i = 0; i < 5; i++) {
        fetchedUrl = await fetch('https://randomuser.me/api/')   /* Fant på https://apipheny.io/free-api/ */
        data = await fetchedUrl.json()   /* Promice om å gjøre informasjonen til json format */
        randomNavn = data['results'][0]   /* Informasjon om fake enkeltperson */
        randomScore = Math.floor(Math.random() * 8000) + 4000   /* Random score fra 4 til 12000 */
        fakePerson = {navn: randomNavn.login.username, score: randomScore}  //Per endra her
        leaderboardPersonerArr.push(fakePerson)   /* lager objekter av de 5 fake personene */
    }
    /* Sorterer personerArr og gjør at du kommer opp på leaderboarden hvis du har høy nok score */
    /* DE TO UNDER SKAL IVERKSETTES ETTER DEN FØRSTE FOR LØKKA, MEN TRENGER IKKE VÆRE ASYNC, HVORDA GJØR MAN DET */
    leaderboardPersonerArr.sort((a, b) => b.score - a.score) //Her endra Per
    if(poeng > leaderboardPersonerArr[4].score){
        spiller = {navn: 'you', score: poeng}
        leaderboardPersonerArr.push(spiller)
        leaderboardPersonerArr.sort((a, b) => b.score -a.score)
    }
    /* Lager leaderboarden riktig */
    for (let i = 0; i < 5; i++) {   /* ...og legges inn i leaderboarden i nylagde liste-elementer med klassen "leaderboardNavn" */
        leaderboardLiEl = document.getElementById('leaderboardListe').appendChild(document.createElement('li'))
        leaderboardLiEl.innerHTML = leaderboardPersonerArr[i].navn + ': ' + leaderboardPersonerArr[i].score + 'poeng'
        leaderboardLiEl.classList.add('leaderboardLiClass')
        leaderboardLiArr.push(leaderboardLiEl)
        
    }
}
leaderboardF()
console.log(leaderboardLiArr) 

/* Åpning og lukking av leaderboard */
erLeaderboardKnappTrykket = 0   /* Gjør at samme knapp kan benyttes til åpning og lukking av leaderboard */
leaderboardKnappEl.addEventListener('click',function(){
    if(erLeaderboardKnappTrykket === 0){
        divForHolderAvLeaderboardEl.style.display = 'flex'   /* Gjør leaderboarden synlig */
        erLeaderboardKnappTrykket = 1
        if(window.innerWidth > 650){   /* For når leaderboarden skal poppe opp på høyre side a skjerm */
            divForHolderAvSpillEl.style.gridColumn = '5/11'
            holderAvSpillEl.style.margin = '8% auto'
            divForHolderAvHolderAvTekstEl.style.gridColumnEnd = '5'
        }
        else if(window.innerWidth < 500){   /* For når leaderboard skal poppe opp over tekst/knapp-feltet */
            divForHolderAvLeaderboardEl.style.gridColumn = '1/13'
            divForHolderAvLeaderboardEl.style.gridRow = '2/3'
            divForLeaderBoardKnappEl.style.gridRow = '3/4'
            divForBack.style.gridRow = '3/4'
        }
    }
    else{
        /* Elementene puttes på plass der de var førman trykket leaderboardknappen */
        divForHolderAvLeaderboardEl.style.display = 'none'   /* Tar bort leaderboard */
        erLeaderboardKnappTrykket = 0
        if(window.innerWidth > 650){
            divForHolderAvSpillEl.style.gridColumn = '6/13'
            holderAvSpillEl.style.margin = '8%'
            divForHolderAvHolderAvTekstEl.style.gridColumnEnd = '6'
        }
        else if(window.innerWidth < 500){
            divForHolderAvLeaderboardEl.style.gridColumn = '1/13'
            divForHolderAvLeaderboardEl.style.gridRow = '2/3'
            divForLeaderBoardKnappEl.style.gridRow = '2/3'
            divForBack.style.gridRow = '2/3'
        }
    }
})


/* Definerer funksjoner som driver spillet */
function gronnKlikkF(e){   /* Når et element som ikke var det røde bombe-elementet klikkes */
    e.target.style.backgroundColor = 'rgb(43, 200, 130)'
    gevinst += betSum / gronnCounter   /* Gevinst økes med summen man veddet delt på hvor mange ruter det var igjen, så gevinsten du får multipliseres etter hvor mange ruter du trykker */
    for (let i = 0; i < 25; i++) {   /* Gjør at mengde poeng man vil få på å klikke den neste boksen står på de resterende boksene */
        bokserArr[i].innerHTML = (betSum / (gronnCounter-1)).toFixed(2)
    }
    /* if-testen nedenfor gjør at man bare får et desimaltall bak gevinstsummen hvis den er under 10 poeng*/
    if(gevinst>=10)
        tilbakeMeld.innerHTML=`Gevinst: ${Math.floor(gevinst)}`
    else if(gevinst<10){
        tilbakeMeld.innerHTML=`Gevinst: ${gevinst.toFixed(1)}`
    }
    e.target.removeEventListener('click',gronnKlikkF)   /* Gjør at de grønne boksene ikke kan klikkes på flere ganger */
    gronnCounter -= 1   /* Sjekker hvor mange ruter det er igjen */
}

function rodKlikkF(e){   /* Når det røde bombe-elementet klikkes */
    e.target.style.backgroundImage = 'url("rodBombeLogo.png")'
    for (let i = 0; i < 25; i++) {   /* Passer på at poengene på bombene tas bort */
        bokserArr[i].innerHTML = ''
    }
    tilbakeMeld.style.border = '2px dashed'
    tilbakeMeld.innerHTML = 'Game over'
    bet.innerHTML = 'Bet: 0 poeng'   /* Resetter bet elementet */
    place.removeEventListener('click', placeF)   /* Gjør at man ikke kan starte igjen før man trykker retry */
    betSum = 0   
    gevinst = 0
    cashInnOgRestart.innerHTML = 'Restart'
    cashInnOgRestart.addEventListener('click', restartF)   /* Gjør knappen klar til å iverksette restart-funksjonen */
    for (let i = 0; i < bokserArr.length; i++) {
        bokserArr[i].removeEventListener('click', gronnKlikkF)
    }
    randomBoks.removeEventListener('click',rodKlikkF) /* Gjør at den røde bombe-boksene ikke kan klikkes på flere ganger */
}

function restartF(){   /* Når restart trykkes */
    for (let i = 0; i < bokserArr.length; i++) {   /* Resetter farger på bokser */
        bokserArr[i].style.backgroundColor = 'rgb(235, 240, 225)'
    }
    tilbakeMeld.style.border = '2px ridge rgb(139, 184, 151)'   /* Resetter border fra å være dashed */
    tilbakeMeld.innerHTML = 'Gevinst: '
    bet.innerHTML = 'Bet: 0 poeng'
    betSum = 0
    gevinst = 0
    cashInnOgRestart.innerHTML = 'Cash inn'
    cashInnOgRestart.removeEventListener('click',restartF)
    place.addEventListener('click', placeF)
}

function cashInnF(){   /* Når cash inn trykkes */
    poeng += gevinst + betSum   /* Casher inn summen man vedda pluss eventuelle gevinster */
    poengEl.innerHTML = `Poeng: ${poeng.toFixed(1)}`
    place.removeEventListener('click', placeF)   
    gevinst = 0
    betSum = 0
    for (let i = 0; i < bokserArr.length; i++) {
        bokserArr[i].removeEventListener('click',gronnKlikkF)
        bokserArr[i].innerHTML = ''   /* Er med vilje at jeg ikke fjerner grønnfargen før restart */
    }
    randomBoks.removeEventListener('click',rodKlikkF)
    cashInnOgRestart.innerHTML = 'Restart'
    cashInnOgRestart.addEventListener('click', restartF)
    localStorage.poeng = poeng   /* Updater poengsum i local storage */

    /* Updater leaderboarden */
    if(poeng > leaderboardPersonerArr[4].score){
        if(!leaderboardLiArr.includes(leaderboardLiArr.spiller)){   /* TROR IKKKE DETTE FUNKER, FINNES DET EN BEDRE MÅTE Å IDENTIFISERE */
            spiller = {navn: 'you', score: poeng}
            leaderboardPersonerArr.push(spiller)
            console.log(spiller)
        }
        leaderboardPersonerArr.sort((a, b) => b.score - a.score)
        leaderboardArr = []
        for (let i = 0; i < 5; i++) {
            leaderboardLiEl.innerHTML = leaderboardPersonerArr[i].navn + ': ' + leaderboardPersonerArr[i].score + 'poeng'
            leaderboardLiArr.push(leaderboardLiEl)
            
        }console.log(leaderboardPersonerArr)
    }   
}

function placeF(){
    if(betInp.value <= poeng && betInp.value >= 0){   /* Sjekker at man placer en betsum som gir mening */
        for (let i = 0; i < bokserArr.length; i++) {
            bokserArr[i].id = i+1
        }
        gevinst = 0   /* Definerer gevinst */
        betSum = Number(betInp.value)
        poeng -= betSum
        betInp.value = ''
        bet.innerHTML = `Bet: ${betSum} poeng`
        poengEl.innerHTML = `Poeng: ${poeng.toFixed(1)}`   /* Updater poegsummen på skjermen */
        tilbakeMeld.innerHTML = 'Gevinst: '
        gronnCounter = 25
        for (let i = 0; i < bokserArr.length; i++) {   /* Gir boksene muligheten til å bli grønne */
            bokserArr[i].addEventListener('click', gronnKlikkF)
            bokserArr[i].innerHTML = (betSum / gronnCounter).toFixed(2)
        }
        randomId = Math.floor(Math.random()*25+1)   /* Definerer hvilken boks som skal bli den røde bombe-boksen */
        randomBoks = document.getElementById(randomId)
        console.log(randomId)   /* Gjør det lett å teste spillet, kan tas bort for ungåelse av juks */
        randomBoks.addEventListener('click',rodKlikkF)
        cashInnOgRestart.addEventListener('click',cashInnF)
    }
    else if(betInp.value<0){
        tilbakeMeld.innerHTML = 'Bet kan ikke være minus'
    }
    else{
        tilbakeMeld.innerHTML = 'Bet må være mindre eller lik poeng'
    }
    
}
place.addEventListener('click', placeF)   /* Event-listeneren legges på place-knappen ved åpning av spillet */