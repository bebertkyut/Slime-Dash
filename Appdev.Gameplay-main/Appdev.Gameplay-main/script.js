let move_speed = 3, grativy = 0.5;
let bird = document.querySelector('.slime');
let img = document.getElementById('Slimey');
let sound_point = new Audio('sounds effect/point.mp3');
let sound_die = new Audio('sounds effect/die.mp3');

// getting bird element properties
let bird_props = bird.getBoundingClientRect();

// This method returns DOMReact -> top, right, bottom, left, x, y, width and height
let background = document.querySelector('.background').getBoundingClientRect();

let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

let credit_val = document.querySelector('.credit_val');
let credit_title = document.querySelector('.credit_title')

let game_state = 'Start';
img.style.display = 'none';
message.classList.add('messageStyle');

document.addEventListener('keydown', (e) => {
    
    if(e.key == 'Enter' && game_state != 'Play'){
        document.querySelectorAll('.pipe_sprite').forEach((e) => {
            e.remove();
        });
        document.querySelectorAll('.credit_points').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        bird.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score : ';
        credit_title.innerHTML = 'Credits : ';
        score_val.innerHTML = '0';
        credit_val.innerHTML = '0';
        message.classList.remove('messageStyle');
        play();
    }
});

function play(){
    function move(){
        if(game_state != 'Play') return;

        let pipe_sprite = document.querySelectorAll('.pipe_sprite');
        let credit_points = document.querySelector('.credit_points');

        pipe_sprite.forEach((element) => {
            let pipe_sprite_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();

            if(pipe_sprite_props.right <= 0){
                element.remove();
            }else{
                if(bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width && bird_props.left + bird_props.width > pipe_sprite_props.left && bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height && bird_props.top + bird_props.height > pipe_sprite_props.top){
                    game_state = 'End';
                    message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Press Enter To Restart';
                    message.classList.add('messageStyle');
                    img.style.display = 'none';
                    sound_die.play();
                    return;
                }else{
                    if(pipe_sprite_props.right < bird_props.left && pipe_sprite_props.right + move_speed >= bird_props.left && element.increase_score == '1'){
                        score_val.innerHTML =+ score_val.innerHTML + 1;
                        credit_val.innerHTML =+ credit_val.innerHTML + 5;
                        sound_point.play();
                    }
                    element.style.left = pipe_sprite_props.left - move_speed + 'px';
                }
            }
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let bird_dy = 0;
    function apply_gravity(){
        if(game_state != 'Play') return;
        bird_dy = bird_dy + grativy;
        document.addEventListener('keydown', (e) => {
            if(e.key == 'SpaceBar' || e.key == ' '){
                img.src = 'images/Slime-1.png';
                bird_dy = -7.6;
            }
        });

        document.addEventListener('keyup', (e) => {
            if(e.key == 'SpaceBar' || e.key == ' '){
                img.src = 'images/Slime.png';
            }
        });

        if(bird_props.top <= 0 || bird_props.bottom >= background.bottom){
            game_state = 'End';
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }
        bird.style.top = bird_props.top + bird_dy + 'px';
        bird_props = bird.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let pipe_seperation = 0;

    let pipe_gap = 40;

    function create_pipe(){
        if(game_state != 'Play') return;

        if(pipe_seperation > 115){
            pipe_seperation = 10;

            let pipe_posi = Math.floor(Math.random() * 43) + 8;
            let pipe_sprite_inv = document.createElement('div');
            pipe_sprite_inv.className = 'pipe_sprite';
            //top obstacles
            // pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
            pipe_sprite_inv.style.left = '100vw';

            document.body.appendChild(pipe_sprite_inv);
            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
            pipe_sprite.style.left = '100vw';
            pipe_sprite.increase_score = '1';

            document.body.appendChild(pipe_sprite);
        }
        pipe_seperation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);

    // let coin_seperation = 0;

    // let coin_gap = 40;

    // function create_coin(){
    //     if(game_state != 'Play') return;

    //     if(coin_seperation > 115){
    //         coin_seperation = 0;

    //         let coin_posi = Math.floor(Math.random() * 43) + 8;
    //         let coin_sprite_inv = document.createElement('div');
    //         coin_sprite_inv.className = 'credit_points';
    //         coin_sprite_inv.style.top = coin_posi - 70 + 'vh';
    //         coin_sprite_inv.style.left = '100vw';

    //         document.body.appendChild(coin_sprite_inv);
    //         let credit_points = document.createElement('div');
    //         credit_points.className = 'credit_points';
    //         credit_points.style.top = coin_posi + coin_gap + 'vh';
    //         credit_points.style.left = '100vw';
    //         credit_points.increase_score = '1';

    //         document.body.appendChild(credit_points);
    //     }
    //     coin_seperation++;
    //     requestAnimationFrame(create_coin);
    // }
    // requestAnimationFrame(create_coin);

    /*class coins{
        constructor(){
            this.frameX = 0;
            this.frameY = 0;
            this.fps = 20;
            this.frameInterval = 1000/this.fps;
            this.frameTimer = 0;
        }
        update(deltaTime){
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.frameTimer > this.frameInterval){
                this.frameTimer = 0;
                if(this.frameX < this.maxFrame) this.frameX++;
                else this.frameX = 0;  
            }else{
                this.frameTimer += deltaTime;
            }
        }
        draw(context){
            context.drawImage(this.image, this.frameX * this.width, 0, this.x, this.y, this.width, this.height);
            
        }
    }
      class credits extends coins{
         constructor(game){
            super();
            this.game = game;
            this.width = 60;
            this.height = 44;
            this.x = 200;
            this.y = 200;
            this.speedX = 2;
            this.maxFrame = 5;
            this.image = document.getElementById('coins');
        }
        update(deltaTime){
            super.update(deltaTime);
        }
    }*/
}


