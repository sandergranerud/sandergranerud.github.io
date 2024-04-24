// https://www.youtube.com/watch?v=5IMXpp3rohQ&t=6001s
let introEl = document.querySelector('#kjappMann-intro')
let vanskelighetsgradKnapperEls = document.querySelectorAll('.difficultyGrade')





for (let i = 0; i<vanskelighetsgradKnapperEls.length;i++){
    vanskelighetsgradKnapperEls[i].addEventListener('click', function(){
        introEl.style.display = 'none'        

        let mainEl = document.querySelector('main')
        const canvasEl = document.querySelector('canvas')
        //Henter informasjon om canvas elementet
        const c = canvasEl.getContext('2d')
        const poengEl = document.querySelector('#poengEl')
        let poengTekstEl = document.querySelector('#score-text')
        let knapperEls = document.querySelectorAll('.movement')

        poengTekstEl.classList.remove('hidden');
        poengEl.classList.remove('hidden');
        canvasEl.classList.remove('hidden');
        for (let i = 0; i<knapperEls.length; i++){
            knapperEls[i].classList.remove('hidden');    
        }
        


    console.log(localStorage.poeng)

    let spillerFart 
    let spoekelseFart 
    let antallSpoekelser
    let tidSpoekelseRedd 
    let poengMengde

    if(vanskelighetsgradKnapperEls[i].innerHTML == 'Lett'){ 
        spillerFart = 4
        spoekelseFart = 2
        antallSpoekelser = 2
        tidSpoekelseRedd = 5000
        poengMengde = 5
    }
    else if(vanskelighetsgradKnapperEls[i].innerHTML == 'Medium'){ 
        spillerFart = 4
        spoekelseFart = 2
        antallSpoekelser = 4
        tidSpoekelseRedd = 4000
        poengMengde = 10
    }
    else if(vanskelighetsgradKnapperEls[i].innerHTML == 'Vanskelig'){ 
        spillerFart = 4
        spoekelseFart = 4
        antallSpoekelser = 5
        tidSpoekelseRedd = 4000
        poengMengde = 20
    }





        class Grense {
            static bredde = 40
            static hoyde = 40
            //constructor er et objekt inne i en klasse
            constructor({ posisjon, bilde }) {
                // 'this' brukes som et nøkkelord inne i en constructor objekt.
                this.posisjon = posisjon
                this.bredde = Grense.bredde
                this.hoyde = Grense.hoyde
                this.bilde = bilde  
            }

            draw(){
                //tegner et kvadrat
                c.drawImage(this.bilde, this.posisjon.x, this.posisjon.y)
            }
        } 

        class Spiller {
            constructor({ 
                posisjon, 
                hastighet }) {
                this.posisjon = posisjon
                this.hastighet = hastighet
                this.radius = 15
                this.radianer = 0.75
                this.aapneRate = 0.07
                this.rotasjon = 0
                this.fart = spillerFart
            }

            draw() {
                c.save() //saves the entire state of the canvas by pushing the current state onto a stack. hentet fra https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save 
                c.translate(this.posisjon.x, this.posisjon.y)
                c.rotate(this.rotasjon)
                c.translate(-this.posisjon.x, -this.posisjon.y)
                c.beginPath()
                c.arc(this.posisjon.x, this.posisjon.y, this.radius, this.radianer, Math.PI * 2 - this.radianer)
                c.lineTo(this.posisjon.x, this.posisjon.y)
                c.fillStyle = 'yellow'
                c.fill()
                c.closePath()
                c.restore()
            }

            update(){
                this.draw()
                this.posisjon.x += this.hastighet.x
                this.posisjon.y += this.hastighet.y

                if (this.radianer < 0 || this.radianer > .75) {
                    this.aapneRate = -this.aapneRate
        }
                    this.radianer += this.aapneRate 
            }
        }


        class Spoekelse {
            static fart = spoekelseFart
            constructor({ 
                posisjon, 
                hastighet, 
                farge}) {
                this.posisjon = posisjon
                this.hastighet = hastighet
                this.radius = 15
                this.farge = farge
                this.tidligereKollisjoner = []
                this.fart = Spoekelse.fart
                this.redd = false
            }

            draw() {
                c.beginPath()
                c.arc(this.posisjon.x, this.posisjon.y, this.radius, 0, Math.PI*2)
                //ternary operator, kan brukes i stedenfor if test, hvis this.redd er sant vil fargen bli blå, men hvis det er galt vil Spoekelse bli vanlig farge igjen
                c.fillStyle = this.redd ? 'blue' : this.farge
                c.fill()
                c.closePath()
            }

            update(){
                this.draw()
                this.posisjon.x += this.hastighet.x
                this.posisjon.y += this.hastighet.y
            }
        }


        class Kule {
            constructor({ 
                posisjon, 
                }) {
                this.posisjon = posisjon
                this.radius = 3
            }

            draw() {
                c.beginPath()
                c.arc(this.posisjon.x, this.posisjon.y, this.radius, 0, Math.PI*2)
                c.fillStyle = 'white'
                c.fill()
                c.closePath()
            }
        }

        class PowerUp {
            constructor({ 
                posisjon, 
                }) {
                this.posisjon = posisjon
                this.radius = 8
            }

            draw() {
                c.beginPath()
                c.arc(this.posisjon.x, this.posisjon.y, this.radius, 0, Math.PI*2)
                c.fillStyle = 'white'
                c.fill()
                c.closePath()
            }
        }


        let kart = [
            ['F','-','-','-','-','-','-','-','-','T','-','-','-','-','7'],
            ['|',' ','.','.','.','.','.','.','.','|','.','.','.','p','|'],
            ['|','.','[',']','.','[','-',']','.','U','.','[',']','.','|'],
            ['|','.','.','.','.','.','.','.','.','.','.','.','.','.','|'],
            ['|','.','[',']','.','[',']','.','=','.','O','.','O','.','|'],
            ['|','.','.','.','.','.','.','.','|','.','.','.','.','.','|'],
            ['<','-','-',']','.','[',']','.','|','.','[','-',']','.','|'],
            ['|','p','.','.','.','.','.','.','|','.','.','.','.','.','|'],
            ['|','.','F',']','.','[','7','.','U','.','[','-',']','.','|'],
            ['|','.','U','.','.','.','U','.','.','.','.','.','.','.','|'],
            ['|','.','.','.','O','.','.','.','=','.','=','.','=','.','|'],
            ['|','.','=','.','.','.','=','.','|','.','|','.','|','.','|'],
            ['|','.','L','-',']','.','U','.','U','.','U','.','U','.','|'],
            ['|','.','.','.','.','.','.','.','.','.','.','.','.','.','|'],
            ['L','-','-','-','-','-','-','-','-','-','-','-','-','-','Z']
        ]





        let farger =['red', 'pink', 'green', 'orange', 'lightBlue']

        let kulerArr = []
        let grenserArr = []
        let powerUpsArr = []
        let spoekelserArr = []
        let spiller = new Spiller ({
            posisjon: {
                x: Grense.bredde * 1.5,
                y: Grense.hoyde * 1.5

            }, 
            hastighet: {
                x: 0,
                y: 0
            }
        })

        let taster = {
            w: {
                presset: false
            },
            a: {
                presset: false
            },
            s: {
                presset: false
            },
            d: {
                presset: false
            }
        }

        let sisteTast =''
        let score = 0




        

        function lagBilde(src){
            let bilde = new Image()
            bilde.src = src
            return bilde
        }

        function lagGrense(source, j, i){
            grenserArr.push(  
            new Grense({
                posisjon: {
                    x: Grense.bredde * j,
                    y: Grense.hoyde * i
                }, 
                bilde: lagBilde(source) 
            })
        )
        }

        for (let i = 0; i < kart.length; i++ ){
            for (let j = 0; j < kart[i].length; j++){
                if(kart[i][j] == "-"){
                    lagGrense('./Bilder/pipeHorizontal.png', j, i)            
                }
                else if (kart[i][j] == "|"){
                    lagGrense('./Bilder/pipeVertical.png', j, i)            
                }
                else if (kart[i][j] == "O"){
                    lagGrense('./Bilder/block.png', j, i)            
                }
                else if (kart[i][j] == "U"){
                    lagGrense('./Bilder/capBottom.png', j, i)            
                }
                else if (kart[i][j] == "["){
                    lagGrense('./Bilder/capLeft.png', j, i)            
                }
                else if (kart[i][j] == "]"){  
                    lagGrense('./Bilder/capRight.png', j, i)            

                }
                else if (kart[i][j] == "="){
                    lagGrense('./Bilder/capTop.png', j, i)            
                }
                else if (kart[i][j] == "T"){
                    lagGrense('./Bilder/pipeConnectorBottom.png', j, i)            
                }
                else if (kart[i][j] == ">"){
                    lagGrense('./Bilder/pipeConnectorLeft.png', j, i)            
                }
                else if (kart[i][j] == "<"){
                    lagGrense('./Bilder/pipeConnectorRight.png', j, i)            
                }
                else if (kart[i][j] == "Y"){
                    lagGrense('./Bilder/pipeConnectorTop.png', j, i)            
                }
                else if (kart[i][j] == "F"){
                    lagGrense('./Bilder/pipeCorner1.png', j, i)            
                }
                else if (kart[i][j] == "7"){
                    lagGrense('./Bilder/pipeCorner2.png', j, i)            
                }
                else if (kart[i][j] == "Z"){
                    lagGrense('./Bilder/pipeCorner3.png', j, i)            
                }
                else if (kart[i][j] == "L"){
                    lagGrense('./Bilder/pipeCorner4.png', j, i)            
                }
                else if (kart[i][j] == "+"){
                    lagGrense('./Bilder/pipeCross.png', j, i)            
                }
                else if (kart[i][j] == "."){
                    kulerArr.push(
                        new Kule({
                            posisjon: {
                                x: Grense.bredde * j + Grense.bredde/2,
                                y: Grense.hoyde * i + Grense.hoyde/2
                            }
                        })
                    )
                }
                else if (kart[i][j] == "p"){
                    powerUpsArr.push(
                        new PowerUp({
                            posisjon: {
                                x: Grense.bredde * j + Grense.bredde/2,
                                y: Grense.hoyde * i + Grense.hoyde/2
                            }
                        })
                    )
                }
                
            }
        } 



        
        for (let i = 0; i<antallSpoekelser;i++){
            spoekelserArr.push(new Spoekelse({
                posisjon: {
                    x: Grense.bredde * 1.5 * 8,
                    y: Grense.hoyde * 1.5 * 9
                },
                hastighet: {
                    x: Spoekelse.fart,
                    y: 0
                },
                farge: farger[i]
            }))
        }



        function sirkelKollidereMedRektangel({sirkel, rektangel
        }){
            let padding = Grense.bredde/2 - sirkel.radius - 1
            return (
                sirkel.posisjon.y - sirkel.radius + sirkel.hastighet.y <= rektangel.posisjon.y + rektangel.hoyde + padding && 
                sirkel.posisjon.x + sirkel.radius + sirkel.hastighet.x >= rektangel.posisjon.x - padding && 
                sirkel.posisjon.y + sirkel.radius + sirkel.hastighet.y >= rektangel.posisjon.y - padding && 
                sirkel.posisjon.x - sirkel.radius + sirkel.hastighet.x <= rektangel.posisjon.x + rektangel.bredde + padding
                )
        } 

        let animasjonsId

        function animere() {
            //Spør nettleser om å kjøre så mange frames som mulig
            animasjonsId = requestAnimationFrame(animere)
            c.clearRect(0,0, canvasEl.width, canvasEl.height)

            
            if (taster.w.presset && sisteTast === 'w') {
                for (let i = 0 ; i < grenserArr.length; i++){
                    let grense = grenserArr[i] 
                    if(
                        sirkelKollidereMedRektangel({
                            sirkel: {...spiller, hastighet: {
                                x: 0,
                                y: -spiller.fart
                            }},
                            rektangel: grense
                        })
                    ){
                        spiller.hastighet.y = 0
                        break
                    }
                    else {
                        spiller.hastighet.y = -spiller.fart
                    }
                }
            }
            else if (taster.a.presset && sisteTast === 'a') {
                for (let i = 0 ; i < grenserArr.length; i++){
                    let grense = grenserArr[i] 
                    if(
                        sirkelKollidereMedRektangel({
                            sirkel: {...spiller, hastighet: {
                                x: -spiller.fart,
                                y: 0
                            }},
                            rektangel: grense
                        })
                    ){
                        spiller.hastighet.x = 0
                        break
                    }
                    else {
                        spiller.hastighet.x = -spiller.fart
                    }
                }
            }
            else if (taster.s.presset && sisteTast === 's') {
                for (let i = 0 ; i < grenserArr.length; i++){
                    let grense = grenserArr[i] 
                    if(
                        sirkelKollidereMedRektangel({
                            sirkel: {...spiller, hastighet: {
                                x: 0,
                                y: spiller.fart
                            }},
                            rektangel: grense
                        })
                    ){
                        spiller.hastighet.y = 0
                        break
                    }
                    else {
                        spiller.hastighet.y = spiller.fart
                    }
                }
            }
            else if (taster.d.presset && sisteTast === 'd') {
                for (let i = 0 ; i < grenserArr.length; i++){
                    let grense = grenserArr[i] 
                    if(
                        sirkelKollidereMedRektangel({
                            sirkel: {...spiller, hastighet: {
                                x: spiller.fart,
                                y: 0
                            }},
                            rektangel: grense
                        })
                    ){
                        spiller.hastighet.x = 0
                        break
                    }
                    else {
                        spiller.hastighet.x = spiller.fart
                    }
                }
            }

            // detect collision between spoekelser and spiller
            for (let i = spoekelserArr.length -1; 0 <= i; i--){
                let spoekelse = spoekelserArr[i]
                    //spoekelse touches spiller
                    if (Math.hypot(
                        spoekelse.posisjon.x - spiller.posisjon.x,
                        spoekelse.posisjon.y - spiller.posisjon.y
                        ) <
                        spoekelse.radius + spiller.radius 
                        ) {

                            if (spoekelse.redd){
                                spoekelserArr.splice(i, 1)
                            }
                            else { 
                            cancelAnimationFrame(animasjonsId)


                            document.body.style.transition = "background-color 1s ease"
                            setTimeout(function(){document.body.style.backgroundColor = "red"}, 10)
                            setTimeout(function(){document.body.style.backgroundColor = "#242222"}, 400)


                            setTimeout(function() {
                                mainEl.innerHTML = `<h1>Du tapte dessverre</h1>
        
                                <i class="fa-solid fa-heart-crack"></i>
        
                                <h2>Din score ble: ${score} </h2> 
                                <h2>Prøv på nytt! </h2>
        
                                <div id = "knapp-boks">
        
                                <button id = "til-forsiden-button"> Til Forsiden </button>
                                <button id = "ny-runde-button"> Ny Runde </button>
                                </id>    
                                `
        
                                mainEl.style.justifyContent = "space-evenly"
                                mainEl.style.height = "89vh"

        
                                if (!localStorage.poeng){
                                    localStorage.poeng = 1
                                }
                                else{
                                    localStorage.poeng = Number(localStorage.poeng) + score
                                }
                                console.log(localStorage.poeng)

                                const tilForsidenButton = document.getElementById("til-forsiden-button")
        
                                tilForsidenButton.addEventListener("click", function(){
                                    window.location.href = "../index.html"
        
                                })
        
                                const nyRundeButton = document.getElementById("ny-runde-button")
        
                                nyRundeButton.addEventListener("click", function(){
                                    location.reload()
                                })
                            }
                            , 700)
                        }
                        }
            }


            // Win condition goes here
            if (kulerArr.length === 0){
                cancelAnimationFrame(animasjonsId)

                document.body.style.transition = "background-color 1s ease"
                setTimeout(function(){document.body.style.backgroundColor = "green"}, 10)
                setTimeout(function(){document.body.style.backgroundColor = "#242222"}, 400)

                setTimeout(function() {
                    mainEl.innerHTML = `<h1>Du klarte det!</h1>
                    <i class="fa-solid fa-trophy"></i>
                    <h2>Din score ble: ${score}</h2>

                    <div id = "knapp-boks">
        
                    <button id = "til-forsiden-button"> Til Forsiden </button>
                    <button id = "ny-runde-button"> Ny Runde </button>
                    </id>
                    `

                    mainEl.style.justifyContent = "space-evenly"
                    mainEl.style.height = "89vh"

                    if (!localStorage.poeng){
                        localStorage.poeng = 1
                    }
                    else{
                        localStorage.poeng = Number(localStorage.poeng) + score
                    }
                    console.log(localStorage.poeng)

                    const tilForsidenButton = document.getElementById("til-forsiden-button")
        
                    tilForsidenButton.addEventListener("click", function(){
                        window.location.href = "../index.html"

                    })

                    const nyRundeButton = document.getElementById("ny-runde-button")

                    nyRundeButton.addEventListener("click", function(){
                        location.reload()
                    })
                }
                , 700)
                      
            }

                        
            // power ups go
            for (let i = powerUpsArr.length -1; 0 <= i; i--){
                let powerUp = powerUpsArr[i]
                powerUp.draw()

                //spiller collides with power ups
                if (Math.hypot(
                    powerUp.posisjon.x - spiller.posisjon.x,
                    powerUp.posisjon.y - spiller.posisjon.y
                    ) <
                    powerUp.radius + spiller.radius
                    ){
                        powerUpsArr.splice(i, 1)

                        //spoekelse redd
                        spoekelserArr.forEach(spoekelse => {
                            spoekelse.redd = true


                            setTimeout(() => {
                                spoekelse.redd = false
                            }, tidSpoekelseRedd)
                        })
                    }
            }

            //Touch kulerArr here
            for (let i = kulerArr.length -1; 0 <= i; i--){
                let kule = kulerArr[i]
                kule.draw()

                if (Math.hypot(
                    kule.posisjon.x - spiller.posisjon.x,
                    kule.posisjon.y - spiller.posisjon.y
                    ) <
                    kule.radius + spiller.radius
                    ) {
                    kulerArr.splice(i, 1)
                    score += poengMengde
                    poengEl.innerHTML = score
                }
            }

            grenserArr.forEach((grense) => {
                grense.draw()

                if(
                    sirkelKollidereMedRektangel({
                        sirkel: spiller,
                        rektangel: grense
                    })
                ) {
                    
                    spiller.hastighet.y = 0
                    spiller.hastighet.x = 0
                }
            })
            spiller.update()

            spoekelserArr.forEach(spoekelse => {
                spoekelse.update()


                let kollisjonerArr = []
                grenserArr.forEach(grense => {            
                    if(
                        !kollisjonerArr.includes('up') &&
                        sirkelKollidereMedRektangel({
                            sirkel: {...spoekelse, hastighet: {
                                x: 0,
                                y: -spoekelse.fart
                            }},
                            rektangel: grense
                        })
                    ){
                        kollisjonerArr.push('up')
                    }
                    if(
                        !kollisjonerArr.includes('right') &&
                        sirkelKollidereMedRektangel({
                            sirkel: {...spoekelse, hastighet: {
                                x: spoekelse.fart,
                                y: 0
                            }},
                            rektangel: grense
                        })
                    ){
                        kollisjonerArr.push('right')
                    }
                    if(
                        !kollisjonerArr.includes('left') &&
                        sirkelKollidereMedRektangel({
                            sirkel: {...spoekelse, hastighet: {
                                x: -spoekelse.fart,
                                y: 0
                            }},
                            rektangel: grense
                        })
                    ){
                        kollisjonerArr.push('left')
                    }
                    if(
                        !kollisjonerArr.includes('down') &&
                        sirkelKollidereMedRektangel({
                            sirkel: {...spoekelse, hastighet: {
                                x: 0,
                                y: spoekelse.fart
                            }},
                            rektangel: grense
                        })
                    ){
                        kollisjonerArr.push('down')
                    }
                })


                if(kollisjonerArr.length > spoekelse.tidligereKollisjoner.length){ 
                spoekelse.tidligereKollisjoner = kollisjonerArr }
                
                if (JSON.stringify(kollisjonerArr) !== JSON.stringify(spoekelse.tidligereKollisjoner)) {


                    if (spoekelse.hastighet.x > 0) spoekelse.tidligereKollisjoner.push('right')
                    else if (spoekelse.hastighet.x < 0) spoekelse.tidligereKollisjoner.push('left')
                    else if (spoekelse.hastighet.y < 0) spoekelse.tidligereKollisjoner.push('up')
                    else if (spoekelse.hastighet.y > 0) spoekelse.tidligereKollisjoner.push('down')

                    
                    
                    const stier = spoekelse.tidligereKollisjoner.filter((kollisjon) => {
                        return !kollisjonerArr.includes(kollisjon)
                    })

                    

                    let retning = stier[Math.floor(Math.random() * stier.length)]



                    if (retning == 'down'){
                        spoekelse.hastighet.y = spoekelse.fart
                        spoekelse.hastighet.x = 0
                    }
                    else if (retning == 'up'){
                        spoekelse.hastighet.y = -spoekelse.fart
                        spoekelse.hastighet.x = 0
                    }
                    else if (retning  == 'right'){
                        spoekelse.hastighet.y = 0
                        spoekelse.hastighet.x = spoekelse.fart
                    }

                    else if (retning == 'left'){
                        spoekelse.hastighet.y = 0
                        spoekelse.hastighet.x = -spoekelse.fart
                    }

                    spoekelse.tidligereKollisjoner = [] 
                }
            })




            if (spiller.hastighet.x > 0) {
                spiller.rotasjon = 0
            }
            else if (spiller.hastighet.x < 0){
                spiller.rotasjon = Math.PI
            }
            else if (spiller.hastighet.y > 0){
                spiller.rotasjon = Math.PI/2
            }
            else if (spiller.hastighet.y < 0){
                spiller.rotasjon = Math.PI * 1.5
            }
        } //end of animere

        animere()

            


        addEventListener('keydown', function({key}){
            if(key == 'w' || key == "W"){
                taster.w.presset = true
                sisteTast = 'w'
            }
            else if (key == 'a' || key == "A"){
                taster.a.presset = true
                sisteTast = 'a'
            }
            else if (key == 's' || key == "S"){
                taster.s.presset = true
                sisteTast = 's'
            }
            else if (key == 'd' || key == "D"){
                taster.d.presset = true
                sisteTast = 'd'
            }
        })

/*         addEventListener('keyup', function({key}){
            if(key == 'w' || key == "W"){
                taster.w.presset = false
            }
            else if (key == 'a' || key == "A"){
                taster.a.presset = false
            }
            else if (key == 's' || key == "S"){
                taster.s.presset = false
            }
            else if (key == 'd' || key == "D"){
                taster.d.presset = false
            }
        }) */


        knapperEls[0].addEventListener('click', function(){
            taster.w.presset = true
            sisteTast = 'w'
        })
        knapperEls[1].addEventListener('click', function(){
            taster.a.presset = true
            sisteTast = 'a'
        })
        knapperEls[2].addEventListener('click', function(){
            taster.s.presset = true
            sisteTast = 's'
        })
        knapperEls[3].addEventListener('click', function(){
            taster.d.presset = true
            sisteTast = 'd'
        })

        }) 
}


