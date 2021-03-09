import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit {
  warrior: Array<any> = [];
  max: number = 0;
  archers: number;
  reitars: number;
  dragons: number;

  constructor(public navCtrl: NavController) {}
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  ras() {
    this.warrior.push(new Reitar("рейтар", 5, 2));
    this.warrior.push(new Archer("лучник", 7, 1, 10));
    this.warrior.push(new Dragon("дракон", 60, 350, 1));
    for (let i = 0; i < this.warrior.length; i++) {
      console.log(this.warrior[i].show());
      if (this.warrior[i] instanceof Dragon) {
        console.log(this.warrior[i].food());
        console.log(this.warrior[i].need());
      } else if (this.warrior[i] instanceof Archer) {
        console.log(this.warrior[i].money());
        console.log(this.warrior[i].need());
      } else if (this.warrior[i] instanceof Reitar) {
        console.log(this.warrior[i].money());
      }
    }
    this.archers = this.getRandomInt(500);
    this.dragons = this.getRandomInt(20);
    this.reitars = this.getRandomInt(400);

    let html =
      "<p> Армія складається з: " +
      String(this.archers) +
      " лучників, " +
      String(this.reitars) +
      " рейтарів, " +
      String(this.dragons) +
      " драконів." +
      "<br>" +
      "Потрібно: " +
      String(
        this.archers * this.warrior[1].Salary +
          this.reitars * this.warrior[0].Salary
      ) +
      " золота, " +
      String(this.dragons * this.warrior[2].Eat) +
      " кг корму та " +
      String(this.dragons * this.warrior[2].Girl) +
      " дівчат на добу. Також потрібно " +
      String(this.archers * this.warrior[1].Arrow) +
      " стріл. " +
      "<br>" +
      "Армія буде рухатись зі швидкістю - " +
      String(this.warrior[0].Speed) +
      " км/год. </p>";
    document.getElementById("rezult").innerHTML = html;
  }

  ngOnInit() {}
}

interface IShow {
  show();
}

interface IGetMoney {
  money();
}

interface IGetFood {
  food();
}

interface INeed {
  need();
}

export abstract class Warrior implements IShow {
  protected name: string;
  protected speed: number;
  constructor(name: string, speed: number) {
    this.name = name;
    this.speed = speed;
  }
  abstract show();
}

export class Reitar extends Warrior implements IGetMoney {
  protected name: string;
  protected speed: number;
  salary: number;

  constructor(name: string, speed: number, salary: number) {
    super(name, speed);
    this.salary = salary;
  }
  get Salary() {
    return this.salary;
  }
  get Speed() {
    return this.speed;
  }
  money() {
    return "Мені платять " + this.salary + " золоті на добу";
  }
  show() {
    return "Я - " + this.name + ", моя швидкість = " + this.speed + "км/год";
  }
}

export class Archer extends Warrior implements IGetMoney, INeed {
  protected name: string;
  protected speed: number;
  private salary: number;
  private arrow: number;

  constructor(name: string, speed: number, salary: number, arrow: number) {
    super(name, speed);
    this.salary = salary;
    this.arrow = arrow;
  }
  get Salary() {
    return this.salary;
  }
  get Arrow() {
    return this.arrow;
  }
  money() {
    return "Мені платять " + this.salary + " золоту на добу";
  }
  need() {
    return "Мені потрібно " + this.arrow + " стріл на добу";
  }
  show() {
    return "Я - " + this.name + ", моя швидкість = " + this.speed + "км/год";
  }
}

export class Dragon extends Warrior implements IGetFood, INeed {
  protected name: string;
  protected speed: number;
  private eat: number;
  private girl: number;

  constructor(name: string, speed: number, eat: number, girl: number) {
    super(name, speed);
    this.eat = eat;
    this.girl = girl;
  }
  get Eat() {
    return this.eat;
  }
  get Girl() {
    return this.girl;
  }
  food() {
    return "Мені дають " + this.eat + " кг корму на добу";
  }
  need() {
    return "Мені потрібна " + this.girl + " дівчина на добу";
  }
  show() {
    return "Я - " + this.name + ", моя швидкість = " + this.speed + "км/год";
  }
}
