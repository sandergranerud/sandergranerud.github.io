        const mainEl = document.querySelector("main")

        let radLength
        

        if(localStorage.vanskelighetsgrad === "lett"){
            radLength = 3  
            if(!localStorage.nonogramStreakLett){
                nonogramStreak = 0
                nonogramHighscore = 0
            }else{
                nonogramStreak = localStorage.nonogramStreakLett
                nonogramHighscore = localStorage.nonogramHighscoreLett
            }
        }else if(localStorage.vanskelighetsgrad === "medium"){
            radLength = 5
            if(!localStorage.nonogramStreakMedium){
                nonogramStreak = 0
                nonogramHighscore = 0
            }else{
                nonogramStreak = localStorage.nonogramStreakMedium
                nonogramHighscore = localStorage.nonogramHighscoreMedium
            }

            
        }else if(localStorage.vanskelighetsgrad === "vanskelig"){
            radLength = 10
            if(!localStorage.nonogramStreakVanskelig){
                nonogramStreak = 0
                nonogramHighscore = 0
            }else{
                nonogramStreak = localStorage.nonogramStreakVanskelig
                nonogramHighscore = localStorage.nonogramHighscoreVanskelig
            }
        }

        const headerEl = document.querySelector("header")
        

        const boksContainerEl = document.getElementById("main")

        //Setter riktig informasjon inn i streak og highscore boks

        const streakEl = document.getElementById("streak-box")
        const highscoreEl = document.getElementById("highscore-box")

        if(!nonogramStreak){
            nonogramStreak = 0
            nonogramHighscore = 0
        }
        streakEl.innerHTML = `<p>Streak: ${nonogramStreak}</p>`
        highscoreEl.innerHTML = `<p>Highscore: ${nonogramHighscore}</p>`

        // Lager den horisontale og vertikale boksen som inneholder mindre bokser med tall
    
        const containerHorisontalEl = document.getElementById("grid-container-horisontal")
        const containerVertikalEl = document.getElementById("grid-container-vertikal")


        let tallContainerVertikals = []
        let tallContainerHorisontals = []

        let antallDiv = ""

        for (i = 0; i< radLength; i++){
            let tallVertikal = document.createElement("div")
            tallVertikal.setAttribute("class", "tall-vertikal")
            
            tallContainerVertikals.push(tallVertikal)
            containerVertikalEl.appendChild(tallVertikal)


            let tallHorisontal = document.createElement("div")
            tallHorisontal.setAttribute("class", "tall-horisontal")
            
            tallContainerHorisontals.push(tallHorisontal)
            containerHorisontalEl.appendChild(tallHorisontal)


            antallDiv += " 1fr"      
        }

        containerHorisontalEl.style.gridTemplateColumns = antallDiv
        containerVertikalEl.style.gridTemplateRows = antallDiv

        console.log(containerVertikalEl.offsetWidth + "px predde og høyde til firkant opp til høyre, fra bredden til kolonnen til venstre")
        let heightGridContainerHorisontal = (`${containerVertikalEl.offsetWidth}px`)
        containerHorisontalEl.style.height = heightGridContainerHorisontal

        //

        let boksEls = []

        let liv = 3

        for (i = 0; i < radLength; i++){
            
            let radEl = document.createElement("div")
            radEl.setAttribute("class", "grid")

            radEl.style.gridTemplateColumns = antallDiv

            let verdier = []
            
            for (j = 0; j < radLength; j++){
                let boksEl = document.createElement("div")

                boksEl.classList.add("boks", `kolonne${j}`,  `rad${i}`)
    
                boksEl.setAttribute("id", `rad${i+1}kolonne${j+1}`)       
                boksEl.setAttribute("value", "tom")

                let verdi  = Math.floor(Math.random()*2)
                verdier.push(verdi)
                
                if (verdi === 0){
                    boksEl.setAttribute("name", "feil")

                }else{
                    boksEl.setAttribute("name", "riktig")
                }

                radEl.appendChild(boksEl)
                boksEls.push(boksEl)
            }
             
            
            boksContainerEl.appendChild(radEl)

  
        }

            //Lager array av radene og gjenoppretter array med 0-er og 1-ere som bestemmer riktig og feil
            //Deretter gjennomgår algoritme for å sjekke hvor mange 1-ere som kommer på rad


            for (i = 0; radLength>i; i++){
                let horisontalEls = document.getElementsByClassName(`rad${i}`)
                
                let verdierHorisontal = []
                for(j = 0; j<horisontalEls.length; j++){

                    let horisontalElName = horisontalEls[j].getAttribute("name")

                    if(horisontalElName === "riktig"){
                        verdierHorisontal.push(1)
                    }
                    else{
                        verdierHorisontal.push(0)
                    }
                }

                let tallHorisontals = [];

                // Loop through the array to count consecutive occurrences of 1's
                for (let j = 0; j < verdierHorisontal.length; j++) {
                    if (verdierHorisontal[j] === 1) {
                        let teller = 1;

                        // Inner loop to count consecutive 1's
                        for (let k = j + 1; k < verdierHorisontal.length; k++) {
                            if (verdierHorisontal[k] === 1) {
                                teller++;
                            } else {
                                break; // Break the inner loop when the consecutive sequence ends
                            }
                        } 

                        tallHorisontals.push(teller); // Add the count to the result array
                        j += teller - 1; // Move the outer loop index to skip the counted sequence
                    }
                }

                if (tallHorisontals.length === 0){
                    tallContainerVertikals[i].innerHTML = "<p> 0 </p>"
                }
                else{
                    for (j = 0; j < tallHorisontals.length; j++){
                    let tallHorisontal = document.createElement("p")
                    tallHorisontal.innerHTML  = tallHorisontals[j]

                    tallContainerVertikals[i].appendChild(tallHorisontal)

                }

                }


                //Lager array av kolonnene og gjenoppretter array med 0-er og 1-ere som bestemmer riktig og feil
                //Deretter gjennomgår algoritme for å sjekke hvor mange 1-ere som kommer på rad

                let vertikalEls = document.getElementsByClassName(`kolonne${i}`)
                
                let verdierVertikal = []
                for(j = 0; j<vertikalEls.length; j++){


                    let vertikalElName = vertikalEls[j].getAttribute("name")


                    if(vertikalElName === "riktig"){
                        verdierVertikal.push(1)
                    }
                    else{
                        verdierVertikal.push(0)
                    }
                }

                let tallVertikals = [];

                // Loop through the array to count consecutive occurrences of 1's
                for (let j = 0; j < verdierVertikal.length; j++) {
                    if (verdierVertikal[j] === 1) {
                        let teller = 1;

                        // Inner loop to count consecutive 1's
                        for (let k = j + 1; k < verdierVertikal.length; k++) {
                            if (verdierVertikal[k] === 1) {
                                teller++;
                            } else {
                                break; // Break the inner loop when the consecutive sequence ends
                            }
                        } 

                        tallVertikals.push(teller); // Add the count to the result array
                        j += teller - 1; // Move the outer loop index to skip the counted sequence
                    }
                }

                if(tallVertikals.length === 0){
                    
                    tallContainerHorisontals[i].innerHTML = "<p> 0 </p>"

                }
                else{
                    for (j = 0; j < tallVertikals.length; j++){
                        let tallVertikal = document.createElement("p")
                        tallVertikal.innerHTML  = tallVertikals[j]

                        tallContainerHorisontals[i].appendChild(tallVertikal)
                    }
                }


                //


            }

            //Funksjon som setter streak og highscore avhengig av vanskelighetsgraf

            

            //Sjekker om markering er på

            const inputEl = document.querySelector("input")

            let aktiv = 1

            inputEl.addEventListener("change", function(){
            aktiv += 1
            console.log(aktiv)
            })

            //Setter streak og highscore avhengig av valgt vanskelighetsgrad

            function setteStreakogHs(){
                if(localStorage.vanskelighetsgrad === "lett"){
                    localStorage.nonogramStreakLett = nonogramStreak
                    localStorage.nonogramHighscoreLett = nonogramHighscore
                }else if(localStorage.vanskelighetsgrad === "medium"){
                    localStorage.nonogramStreakMedium = nonogramStreak
                    localStorage.nonogramHighscoreMedium = nonogramHighscore
                }else if(localStorage.vanskelighetsgrad === "vanskelig"){
                    localStorage.nonogramStreakVanskelig = nonogramStreak
                    localStorage.nonogramHighscoreVanskelig = nonogramHighscore
                }
            }

            function mistetLiv(){

                liv-=1

                document.body.style.transition = "background-color 1s ease"
                setTimeout(function(){document.body.style.backgroundColor = "red"}, 10)
                setTimeout(function(){document.body.style.backgroundColor = "#242222"}, 200)

            }



            //Funksjon som finner boksen som ble trykket på og farger den og sjekker om den var riktig eller feil
            
        function riktigEllerGalt(e, aktivBoksEl){

            let aktivBoksName = aktivBoksEl.getAttribute("name")
            console.log(aktivBoksName)

            let aktivBoksValue = aktivBoksEl.getAttribute("value")
            console.log(aktivBoksValue)


            let aktivBoksCtrl = e.ctrlKey
            console.log("ctrl er " + aktivBoksCtrl)
            
            if (aktivBoksCtrl === false){
                if(aktiv % 2 == 0){
                    aktivBoksCtrl = true
                }
            }


            if (aktivBoksValue === "tom"){
                if(aktivBoksCtrl ===  false){
                    if(aktivBoksName === "riktig"){
                        console.log("trykket riktig")
                        aktivBoksEl.style.backgroundColor = "#000000"
                        aktivBoksEl.setAttribute("value", "full")
                    }
                    else if(aktivBoksName === "feil"){
                        console.log("trykket feil")
                        aktivBoksEl.style.backgroundColor = "#f27f77"
                        aktivBoksEl.setAttribute("value", "full")
                        
                        mistetLiv()
                        }

                }
                else{
                    if(aktivBoksName === "riktig"){
                    console.log("trykket riktig men var feil")
                    aktivBoksEl.style.backgroundColor = "#451313"
                    aktivBoksEl.setAttribute("value", "full")

                    mistetLiv()


                }
                else if(aktivBoksName === "feil"){
                    console.log("trykket feil men var riktig å trykke feil")
                    aktivBoksEl.style.backgroundColor = "lightgrey"
                    aktivBoksEl.setAttribute("value", "full")    
                }
                }
                

            }

            aktivBoksEl.style.cursor = "default"
            console.log(`Du har ${liv} liv`)

            }

            // Funksjon som gjør hjertene gjennomsiktige avhengig av hvor mange liv spilleren har

            const heartEls = document.querySelectorAll(".fa-heart")
            function hearts(){
            
                if (liv === 2){
                    heartEls[0].style.opacity = 0.2
                }
                else if (liv === 1){
                    heartEls[1].style.opacity = 0.2
                }
                if (liv === 0){
                    heartEls[2].style.opacity = 0.2

                    if(nonogramStreak>nonogramHighscore){
                        nonogramHighscore = nonogramStreak   
                    }

                    

                    setTimeout(function() {
                        mainEl.innerHTML = `<h1>Du er tom for liv</h1>

                        <i class="fa-solid fa-heart-crack"></i>

                        <h2>Din streak ble: ${nonogramStreak} </h2> 
                        <h2>Prøv på nytt! </h2>

                        <div id = "knapp-boks">

                        <button id = "til-forsiden-button"> Til Forsiden </button>
                        <button id = "ny-runde-button"> Ny Runde </button>
                        </id>    
                        `

                        nonogramStreak = 0

                        

                        mainEl.style.flexDirection = "column"

                        const tilForsidenButton = document.getElementById("til-forsiden-button")

                        tilForsidenButton.addEventListener("click", function(){
                            window.location.href = "../index.html"

                        })

                        const nyRundeButton = document.getElementById("ny-runde-button")

                        setteStreakogHs()

                        nyRundeButton.addEventListener("click", function(){
                            location.reload()
                        })
                    }
                    , 700)

                    


                }
                
            }

            // Funksjon som sjekker alle boksene i en klasse og sjekker om alle de riktige boksene er sjekket av

            function fullClass(aktivBoksEl){
                let aktivBoksClasses = aktivBoksEl.getAttribute("class")
                console.log(aktivBoksClasses)
                let classArray = aktivBoksClasses.split(" ")
                console.log(classArray)

                

                for(i = 1; i < classArray.length; i++){
                    const classEls = document.getElementsByClassName(classArray[i])

                    let full = false

                    for(j = 0; j< classEls.length; j++){
                        let boksEl = classEls[j]
                        let boksName = boksEl.getAttribute("name")
                        let boksValue = boksEl.getAttribute("value")

                        if (boksName === "riktig" && boksValue === "tom") {
                            // If any "riktig" element has a value of "tom"
                            full = false; // Set full to false
                            break; // Exit the loop since condition is met
                        } else {
                            full = true; // Set full to true if no "riktig" element has a value of "tom"
                        }
    

                    }

                    if ( full === true){
                        console.log(classArray[i] + "er fullt")
                        for(j = 0; j < classEls.length; j++){
                            let boksEl = classEls[j]
                            let boksName = boksEl.getAttribute("name")
                            let boksValue = boksEl.getAttribute("value")

                            if(boksName === "feil" && boksValue === "tom"){
                                boksEl.style.backgroundColor = "lightgrey"
                                boksEl.setAttribute("value", "full")
                            }    
                        }
                    }else{
                        console.log(classArray[i] + "er ikke fullt")
                    }   
                }
            }

            function ferdig(){

                let ferdig = true

                for(i = 0; i < boksEls.length; i++){
                    let boksEl = boksEls[i]
                    let boksValue = boksEl.getAttribute("value")
                    if (boksValue === "tom"){
                        ferdig = false
                        break

                    }
                }
                if (ferdig === true){
                    console.log("Du har vunnet")

                    nonogramStreak = Number(nonogramStreak) + 1

                    if(nonogramStreak>nonogramHighscore){
                        nonogramHighscore = nonogramStreak
                    }

                    document.body.style.transition = "background-color 1s ease"
                    setTimeout(function(){document.body.style.backgroundColor = "green"}, 10)
                    setTimeout(function(){document.body.style.backgroundColor = "#242222"}, 400)

                    if(localStorage.vanskelighetsgrad === "lett"){
                        localStorage.poeng = Number(localStorage.poeng) + 300
                    }else if(localStorage.vanskelighetsgrad === "medium"){
                        localStorage.poeng = Number(localStorage.poeng) + 700
                    }else if(localStorage.vanskelighetsgrad === "vanskelig"){
                        localStorage.poeng = Number(localStorage.poeng) + 2000
                    }
                        

                    setTimeout(function() {
                        mainEl.innerHTML = `<h1>Du klarte det!</h1>
                        <i class="fa-solid fa-trophy"></i>
                        <h2>Din streak er nå: ${nonogramStreak}</h2>
                        <h2>Poeng: ${Math.floor(localStorage.poeng)}</h2>

                        <button>Ny runde </button>`

                        mainEl.style.flexDirection = "column"

                        const nyRundeButton = document.querySelector("button")

                        setteStreakogHs()

                        nyRundeButton.addEventListener("click", function(){
                            location.reload()
                        })
                    }
                    , 700)
                                     
                    
                }
            }

            function pressBox(e){
                console.log(e)
            
                let aktivBoksID = e.target.id
                console.log(aktivBoksID)

                let aktivBoksEl = document.getElementById(aktivBoksID)
                console.log(aktivBoksEl)

                riktigEllerGalt(e, aktivBoksEl)
                hearts(e)
                fullClass(aktivBoksEl)
                ferdig()

  

            }


            for(i = 0; i < boksEls.length; i++){
                boksEls[i].addEventListener("mousedown", pressBox)

            }
