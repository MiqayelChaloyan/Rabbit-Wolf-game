const FREE_CELL = 0;
const WOLF_CELL = 2;
const HOUSE_CELL = 4;
const RABBIT_CELL = 1;
const FENCE_CELL = 3;
const CARROT_CELL = 5;


const CHARACTER_PARAMS = {
    [RABBIT_CELL]: { name: "rabbit", src: "./images/rabbit.png", count: 1 },
    [WOLF_CELL]: { name: "wolf", src: "./images/gamewolf.png" },
    [FENCE_CELL]: { name: "fence", src: "./images/ban.png" },
    [HOUSE_CELL]: { name: "home", src: "./images/home.png", count: 1 },
    [CARROT_CELL]: { name: "carrot", src: "./images/carrot.png" }
}

const gameSettings = {
    WOLFCOUNT: 3,
    BANCOUNT: 2,
    CARROTCOUNT: 2
}

export {
    CHARACTER_PARAMS,
    FREE_CELL,
    WOLF_CELL,
    HOUSE_CELL,
    RABBIT_CELL,
    FENCE_CELL,
    CARROT_CELL,
    gameSettings
};