//IMPORT
import * as PIXI from "pixi.js";

//IMAGES
import robotImage from "./images/robot.png";
import forestImage from "./images/forest.jpg";
import playerImage from "./images/player.png";

import { Robot } from "./robot";
import { Player } from "./player";

//GAME CLASS
export class Game {

  //GLOBALS
  public pixi: PIXI.Application;
  public robots: Robot[] = [];
  public loader: PIXI.Loader;
  public player!: Player;

  //CONSTRUCTOR
  constructor() {

    //PIXI CANVAS 
    this.pixi = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      forceCanvas: true
    });
    document.body.appendChild(this.pixi.view);

    //LOADER
    this.loader = new PIXI.Loader();
    this.loader
      .add("robotTexture", robotImage)
      .add("forestTexture", forestImage)
      .add("playerTexture", playerImage)
    this.loader.load(() => this.loadCompleted());

  }

  //LOAD COMPLETED
  loadCompleted() {

    //BACKGROUND
    let background = new PIXI.Sprite(this.loader.resources["forestTexture"].texture!);
    background.scale.set(
      window.innerWidth / background.getBounds().width,
      window.innerHeight / background.getBounds().height
    );
    this.pixi.stage.addChild(background);

    //ENEMIES
    for (let i = 0; i < 3; i++) {
      let robot = new Robot(this.loader.resources["robotTexture"].texture!, this);
      this.robots.push(robot);
      this.pixi.stage.addChild(robot);
    }

    //PLAYER HERO
    this.player = new Player(this.loader.resources["playerTexture"].texture!, this);
    this.pixi.stage.addChild(this.player);

    //ANIMATION 
    this.pixi.ticker.add((delta: number) => this.update(delta));
  }

  //UPDATE DELTA
  update(delta: number) {

    //UPDATE ANIMATIONS
    this.player.update();

    //ENEMY/PLAYER COLLISION DETECTION
    for (const robot of this.robots) {
      robot.update(delta);
      if (this.collision(this.player, robot)) {
        robot.tint = 0x630000;

        setTimeout(function () {
          robot.tint = 0xFFFFFF;
        }, 1000);

      }
    }
  }

  //COLLISION
  collision(sprite1: PIXI.Sprite, sprite2: PIXI.Sprite) {
    const bounds1 = sprite1.getBounds();
    const bounds2 = sprite2.getBounds();

    return (
      bounds1.x < bounds2.x + bounds2.width &&
      bounds1.x + bounds1.width > bounds2.x &&
      bounds1.y < bounds2.y + bounds2.height &&
      bounds1.y + bounds1.height > bounds2.y
    );
  }
}
