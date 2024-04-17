// https://www.youtube.com/watch?v=5IMXpp3rohQ&t=6001s
let introEl = document.querySelector('#packman-intro')
let difficultyButtonEls = document.querySelectorAll('.difficultyGrade')






for (let i = 0; i<difficultyButtonEls.length;i++){
    difficultyButtonEls[i].addEventListener('click', function(){
        introEl.style.display = 'none'        


        const canvasEl = document.querySelector('canvas')
        //Henter informasjon om canvas elementet
        const c = canvasEl.getContext('2d')
        const scoreEl = document.querySelector('#scoreEl')
        let scoreText = document.querySelector('#score-text')
        let buttonsEls = document.querySelectorAll('.movement')

        scoreText.classList.remove('hidden')
        scoreEl.classList.remove('hidden');
        canvasEl.classList.remove('hidden');


    let playerSpeed 
    let ghostSpeed 
    let totalGhosts
    let timeGhostScared 
    let scoreAmount

    if(difficultyButtonEls[i].innerHTML == 'Lett'){ 
        playerSpeed = 5
        ghostSpeed = 2
        totalGhosts = 2
        timeGhostScared = 5000
        scoreAmount = 5
    }
    else if(difficultyButtonEls[i].innerHTML == 'Medium'){ 
        playerSpeed = 4
        ghostSpeed = 2
        totalGhosts = 4
        timeGhostScared = 4000
        scoreAmount = 10
    }
    else if(difficultyButtonEls[i].innerHTML == 'Vanskelig'){ 
        playerSpeed = 4
        ghostSpeed = 4
        totalGhosts = 5
        timeGhostScared = 3000
        scoreAmount = 20
    }





        class Boundary {
            static width = 40
            static height = 40
            //constructor er et objekt inne i en klasse
            constructor({ position, image }) {
                // 'this' brukes som et nøkkelord inne i en constructor objekt.
                this.position = position
                this.width = Boundary.width
                this.height = Boundary.height
                this.image = image  
            }

            draw(){
                //tegner et kvadrat
                c.drawImage(this.image, this.position.x, this.position.y)
            }
        } 
        class Player {
            constructor({ 
                position, 
                velocity }) {
                this.position = position
                this.velocity = velocity
                this.radius = 15
                this.radians = 0.75
                this.openRate = 0.07
                this.rotation = 0
                this.speed = playerSpeed
            }

            draw() {
                c.save()
                c.translate(this.position.x, this.position.y)
                c.rotate(this.rotation)
                c.translate(-this.position.x, -this.position.y)
                c.beginPath()
                c.arc(this.position.x, this.position.y, this.radius, this.radians, Math.PI * 2 - this.radians)
                c.lineTo(this.position.x, this.position.y)
                c.fillStyle = 'yellow'
                c.fill()
                c.closePath()
                c.restore()
            }

            update(){
                this.draw()
                this.position.x += this.velocity.x
                this.position.y += this.velocity.y

                if (this.radians < 0 || this.radians > .75) {
                    this.openRate = -this.openRate
        }
                    this.radians += this.openRate 
            }
        }


        class Ghost {
            static speed = ghostSpeed
            constructor({ 
                position, 
                velocity, 
                color = 'red' }) {
                this.position = position
                this.velocity = velocity
                this.radius = 15
                this.color = color
                this.prevCollisions = []
                this.speed = Ghost.speed
                this.scared = false
            }

            draw() {
                c.beginPath()
                c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2)
                //ternary operator
                c.fillStyle = this.scared ? 'blue' : this.color
                c.fill()
                c.closePath()
            }

            update(){
                this.draw()
                this.position.x += this.velocity.x
                this.position.y += this.velocity.y
            }
        }


        class Pellet {
            constructor({ 
                position, 
                }) {
                this.position = position
                this.radius = 3
            }

            draw() {
                c.beginPath()
                c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2)
                c.fillStyle = 'white'
                c.fill()
                c.closePath()
            }
        }

        class PowerUp {
            constructor({ 
                position, 
                }) {
                this.position = position
                this.radius = 8
            }

            draw() {
                c.beginPath()
                c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2)
                c.fillStyle = 'white'
                c.fill()
                c.closePath()
            }
        }


        let map = [
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





        let colors =['red', 'pink', 'green', 'orange', 'lightBlue']

        let pellets = []
        let boundaries = []
        let powerUps = []
        let ghosts = []
        let player = new Player ({
            position: {
                x: Boundary.width * 1.5,
                y: Boundary.height * 1.5

            }, 
            velocity: {
                x: 0,
                y: 0
            }
        })

        let keys = {
            w: {
                pressed: false
            },
            a: {
                pressed: false
            },
            s: {
                pressed: false
            },
            d: {
                pressed: false
            }
        }

        let lastKey =''
        let score = 0




        

        function createImage(src){
            let image = new Image()
            image.src = src
            return image
        }

        function createBoundary(source, j, i){
            boundaries.push(  
            new Boundary({
                position: {
                    x: Boundary.width * j,
                    y: Boundary.height * i
                }, 
                image: createImage(source) 
            })
        )
        }

        for (let i = 0; i < map.length; i++ ){
            for (let j = 0; j < map[i].length; j++){
                if(map[i][j] == "-"){
                    createBoundary('./Bilder/pipeHorizontal.png', j, i)            
                }
                else if (map[i][j] == "|"){
                    createBoundary('./Bilder/pipeVertical.png', j, i)            
                }
                else if (map[i][j] == "O"){
                    createBoundary('./Bilder/block.png', j, i)            
                }
                else if (map[i][j] == "U"){
                    createBoundary('./Bilder/capBottom.png', j, i)            
                }
                else if (map[i][j] == "["){
                    createBoundary('./Bilder/capLeft.png', j, i)            
                }
                else if (map[i][j] == "]"){  
                    createBoundary('./Bilder/capRight.png', j, i)            

                }
                else if (map[i][j] == "="){
                    createBoundary('./Bilder/capTop.png', j, i)            
                }
                else if (map[i][j] == "T"){
                    createBoundary('./Bilder/pipeConnectorBottom.png', j, i)            
                }
                else if (map[i][j] == ">"){
                    createBoundary('./Bilder/pipeConnectorLeft.png', j, i)            
                }
                else if (map[i][j] == "<"){
                    createBoundary('./Bilder/pipeConnectorRight.png', j, i)            
                }
                else if (map[i][j] == "Y"){
                    createBoundary('./Bilder/pipeConnectorTop.png', j, i)            
                }
                else if (map[i][j] == "F"){
                    createBoundary('./Bilder/pipeCorner1.png', j, i)            
                }
                else if (map[i][j] == "7"){
                    createBoundary('./Bilder/pipeCorner2.png', j, i)            
                }
                else if (map[i][j] == "Z"){
                    createBoundary('./Bilder/pipeCorner3.png', j, i)            
                }
                else if (map[i][j] == "L"){
                    createBoundary('./Bilder/pipeCorner4.png', j, i)            
                }
                else if (map[i][j] == "+"){
                    createBoundary('./Bilder/pipeCross.png', j, i)            
                }
                else if (map[i][j] == "."){
                    pellets.push(
                        new Pellet({
                            position: {
                                x: Boundary.width * j + Boundary.width/2,
                                y: Boundary.height * i + Boundary.height/2
                            }
                        })
                    )
                }
                else if (map[i][j] == "p"){
                    powerUps.push(
                        new PowerUp({
                            position: {
                                x: Boundary.width * j + Boundary.width/2,
                                y: Boundary.height * i + Boundary.height/2
                            }
                        })
                    )
                }
                
            }
        } 



        
        for (let i = 0; i<totalGhosts;i++){
            ghosts.push(new Ghost({
                position: {
                    x: Boundary.width * 1.5 * 8,
                    y: Boundary.height * 1.5 * 9
                },
                velocity: {
                    x: Ghost.speed,
                    y: 0
                },
                color: colors[i]
            }))
        }



        function circleCollidesWithRectangle({circle, rectangle
        }){
            let padding = Boundary.width/2 - circle.radius - 1
            return (
                circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height + padding && 
                circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x - padding && 
                circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y - padding && 
                circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width + padding
                )
        } 

        let animationId

        function animate() {
            animationId = requestAnimationFrame(animate)
            c.clearRect(0,0, canvasEl.width, canvasEl.height)

            
            if (keys.w.pressed && lastKey === 'w') {
                for (let i = 0 ; i < boundaries.length; i++){
                    let boundary = boundaries[i] 
                    if(
                        circleCollidesWithRectangle({
                            circle: {...player, velocity: {
                                x: 0,
                                y: -player.speed
                            }},
                            rectangle: boundary
                        })
                    ){
                        player.velocity.y = 0
                        break
                    }
                    else {
                        player.velocity.y = -player.speed
                    }
                }
            }
            else if (keys.a.pressed && lastKey === 'a') {
                for (let i = 0 ; i < boundaries.length; i++){
                    let boundary = boundaries[i] 
                    if(
                        circleCollidesWithRectangle({
                            circle: {...player, velocity: {
                                x: -player.speed,
                                y: 0
                            }},
                            rectangle: boundary
                        })
                    ){
                        player.velocity.x = 0
                        break
                    }
                    else {
                        player.velocity.x = -player.speed
                    }
                }
            }
            else if (keys.s.pressed && lastKey === 's') {
                for (let i = 0 ; i < boundaries.length; i++){
                    let boundary = boundaries[i] 
                    if(
                        circleCollidesWithRectangle({
                            circle: {...player, velocity: {
                                x: 0,
                                y: player.speed
                            }},
                            rectangle: boundary
                        })
                    ){
                        player.velocity.y = 0
                        break
                    }
                    else {
                        player.velocity.y = player.speed
                    }
                }
            }
            else if (keys.d.pressed && lastKey === 'd') {
                for (let i = 0 ; i < boundaries.length; i++){
                    let boundary = boundaries[i] 
                    if(
                        circleCollidesWithRectangle({
                            circle: {...player, velocity: {
                                x: player.speed,
                                y: 0
                            }},
                            rectangle: boundary
                        })
                    ){
                        player.velocity.x = 0
                        break
                    }
                    else {
                        player.velocity.x = player.speed
                    }
                }
            }

            // detect collision between ghosts and player
            for (let i = ghosts.length -1; 0 <= i; i--){
                let ghost = ghosts[i]
                    //Ghost touches player
                    if (Math.hypot(
                        ghost.position.x - player.position.x,
                        ghost.position.y - player.position.y
                        ) <
                        ghost.radius + player.radius 
                        ) {

                            if (ghost.scared){
                                ghosts.splice(i, 1)
                            }
                            else { 
                            cancelAnimationFrame(animationId)
                            console.log("you lose")}
                        }
            }

            // Win condition goes here
            if (pellets.length === 0){
                console.log("You win")
                cancelAnimationFrame(animationId)      
            }

                        
            // power ups go
            for (let i = powerUps.length -1; 0 <= i; i--){
                let powerUp = powerUps[i]
                powerUp.draw()

                //Player collides with power ups
                if (Math.hypot(
                    powerUp.position.x - player.position.x,
                    powerUp.position.y - player.position.y
                    ) <
                    powerUp.radius + player.radius
                    ){
                        powerUps.splice(i, 1)

                        //Ghost scared
                        ghosts.forEach(ghost => {
                            ghost.scared = true


                            setTimeout(() => {
                                ghost.scared = false
                            }, timeGhostScared)
                        })
                    }
            }

            //Touch pellets here
            for (let i = pellets.length -1; 0 <= i; i--){
                let pellet = pellets[i]
                pellet.draw()

                if (Math.hypot(
                    pellet.position.x - player.position.x,
                    pellet.position.y - player.position.y
                    ) <
                    pellet.radius + player.radius
                    ) {
                    pellets.splice(i, 1)
                    score += scoreAmount
                    scoreEl.innerHTML = score
                }
            }

            boundaries.forEach((boundary) => {
                boundary.draw()

                if(
                    circleCollidesWithRectangle({
                        circle: player,
                        rectangle: boundary
                    })
                ) {
                    
                    player.velocity.y = 0
                    player.velocity.x = 0
                }
            })
            player.update()

            ghosts.forEach(ghost => {
                ghost.update()


                let collisions = []
                boundaries.forEach(boundary => {            
                    if(
                        !collisions.includes('up') &&
                        circleCollidesWithRectangle({
                            circle: {...ghost, velocity: {
                                x: 0,
                                y: -ghost.speed
                            }},
                            rectangle: boundary
                        })
                    ){
                        collisions.push('up')
                    }
                    if(
                        !collisions.includes('right') &&
                        circleCollidesWithRectangle({
                            circle: {...ghost, velocity: {
                                x: ghost.speed,
                                y: 0
                            }},
                            rectangle: boundary
                        })
                    ){
                        collisions.push('right')
                    }
                    if(
                        !collisions.includes('left') &&
                        circleCollidesWithRectangle({
                            circle: {...ghost, velocity: {
                                x: -ghost.speed,
                                y: 0
                            }},
                            rectangle: boundary
                        })
                    ){
                        collisions.push('left')
                    }
                    if(
                        !collisions.includes('down') &&
                        circleCollidesWithRectangle({
                            circle: {...ghost, velocity: {
                                x: 0,
                                y: ghost.speed
                            }},
                            rectangle: boundary
                        })
                    ){
                        collisions.push('down')
                    }
                })


                if(collisions.length > ghost.prevCollisions.length){ 
                ghost.prevCollisions = collisions }
                
                if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {


                    if (ghost.velocity.x > 0) ghost.prevCollisions.push('right')
                    else if (ghost.velocity.x < 0) ghost.prevCollisions.push('left')
                    else if (ghost.velocity.y < 0) ghost.prevCollisions.push('up')
                    else if (ghost.velocity.y > 0) ghost.prevCollisions.push('down')

                    
                    
                    const pathways = ghost.prevCollisions.filter((collision) => {
                        return !collisions.includes(collision)
                    })

                    

                    let direction = pathways[Math.floor(Math.random() * pathways.length)]



                    if (direction == 'down'){
                        ghost.velocity.y = ghost.speed
                        ghost.velocity.x = 0
                    }
                    else if (direction == 'up'){
                        ghost.velocity.y = -ghost.speed
                        ghost.velocity.x = 0
                    }
                    else if (direction  == 'right'){
                        ghost.velocity.y = 0
                        ghost.velocity.x = ghost.speed
                    }

                    else if (direction == 'left'){
                        ghost.velocity.y = 0
                        ghost.velocity.x = -ghost.speed
                    }

                    ghost.prevCollisions = [] 
                }
            })




            if (player.velocity.x > 0) {
                player.rotation = 0
            }
            else if (player.velocity.x < 0){
                player.rotation = Math.PI
            }
            else if (player.velocity.y > 0){
                player.rotation = Math.PI/2
            }
            else if (player.velocity.y < 0){
                player.rotation = Math.PI * 1.5
            }
        } //end of animate

        animate()

            


        addEventListener('keydown', function({key}){
            if(key == 'w'){
                keys.w.pressed = true
                lastKey = 'w'
            }
            else if (key == 'a'){
                keys.a.pressed = true
                lastKey = 'a'
            }
            else if (key == 's'){
                keys.s.pressed = true
                lastKey = 's'
            }
            else if (key == 'd'){
                keys.d.pressed = true
                lastKey = 'd'
            }
        })

        addEventListener('keyup', function({key}){
            if(key == 'w'){
                keys.w.pressed = false
            }
            else if (key == 'a'){
                keys.a.pressed = false
            }
            else if (key == 's'){
                keys.s.pressed = false
            }
            else if (key == 'd'){
                keys.d.pressed = false
            }
        })


        buttonsEls[0].addEventListener('click', function(){
            keys.w.pressed = true
            lastKey = 'w'
        })
        buttonsEls[1].addEventListener('click', function(){
            keys.a.pressed = true
            lastKey = 'a'
        })
        buttonsEls[2].addEventListener('click', function(){
            keys.s.pressed = true
            lastKey = 's'
        })
        buttonsEls[3].addEventListener('click', function(){
            keys.d.pressed = true
            lastKey = 'd'
        })

        }) 
}


