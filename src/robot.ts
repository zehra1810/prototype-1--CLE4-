//IMPORT PIXI and Game
import * as PIXI from "pixi.js";
import { Game } from "./game";

//GAME CLASS ENEMY 
export class Robot extends PIXI.Sprite {
  private game: Game;
  private speed: number;
  private hitbox: PIXI.Rectangle

  //CONSTRUCTOR
  constructor(texture: PIXI.Texture, game: Game) {
    super(texture);
    this.game = game;
    this.pivot.set(0.5)

    this.speed = 2;
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;

    this.anchor.set(0.5);
    this.scale.set(0.23, 0.23);

    this.hitbox = new PIXI.Rectangle(0, 0, 60, 55)

  }

  //ANIMATION
  public update(delta: number) {
    this.y += this.speed * delta
    this.x += Math.cos(this.x * 0.03) * 1.1;

    //Random spawn if appearing on screen again
    if (this.y < -20) {
      this.y = -20;
      this.x = Math.random() * window.innerWidth;
    }

    this.keepInScreen();
  }

  //BOUNDS
  getBounds(): PIXI.Rectangle {
    return new PIXI.Rectangle(this.x + this.hitbox.x, this.y + this.hitbox.y, this.hitbox.width, this.hitbox.height)
  }

  //KEEP IN SCREEN
  private keepInScreen() {
    if (this.getBounds().top > this.game.pixi.screen.bottom) {
      this.y = -this.getBounds().height;
    }
  }
}