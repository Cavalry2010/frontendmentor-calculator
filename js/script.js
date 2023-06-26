"use strict";

class Calculator {
  body = document.querySelector("body");
  themeSwitch = document.querySelector(".theme-btn");
  calcScreen = document.querySelector(".calc-screen-num");
  btnPad = document.querySelector(".calc-buttons");
  curTheme;
  solved;
  expression;
  ans;

  constructor() {
    this.init();
    // THEME SWITCH
    this.themeSwitch.addEventListener("click", this.switchTheme.bind(this));

    // CALCULATOR
    this.btnPad.addEventListener("click", this.btnInput.bind(this));
  }

  // CALCULATOR

  btnInput(e) {
    const target = e.target;
    if (target.tagName !== "BUTTON") return;
    const value = target.dataset.value;

    this.changeScreenSize(this.expression);

    if (target.classList.contains("num-btn")) {
      if (this.expression.length > 24) return;

      if (this.solved) {
        this.reset();
      }

      if (this.expression === 0) {
        this.expression = value;
      } else {
        this.expression += value;
      }

      this.calcScreen.textContent = this.expression;
    }
    if (target.classList.contains("operator-btn")) {
      if (this.expression.length > 21) return;

      if (this.expression.endsWith(" ")) {
        this.expression = this.expression.slice(0, -3);
      }
      if (this.solved) {
        this.solved = false;
      }
      this.solveExpression();
      this.expression = this.ans;
      this.expression += ` ${value} `;
      this.calcScreen.textContent = this.expression;
      this.changeScreenSize(this.expression);
    }

    if (target.classList.contains("del-btn")) {
      if (this.expression === 0) return;
      if (this.solved) {
        this.reset();
        return;
      }

      if (this.expression.endsWith(" ")) {
        this.expression = this.expression.slice(0, -3);
        this.operator = undefined;
      } else {
        this.expression = this.expression.slice(0, -1);
      }

      if (this.expression === "") {
        this.reset();
      }
      this.calcScreen.textContent = this.expression;
    }

    if (target.classList.contains("result-btn")) {
      this.solveExpression();
      this.solved = true;
    }

    if (target.classList.contains("reset-btn")) {
      this.reset();
    }
  }

  solveExpression() {
    if (Number(this.expression) === 0) return;
    this.expression = this.expression.replace("x", "*");
    this.ans = parseFloat(eval(this.expression).toFixed(7));
    this.calcScreen.textContent = this.ans;
    this.changeScreenSize(this.ans.toString());
  }

  reset() {
    this.ans = 0;
    this.expression = 0;
    this.solved = false;
    this.calcScreen.textContent = this.expression;
    this.changeScreenSize(this.expression);
  }

  changeScreenSize(expression) {
    if (expression.length >= 17) {
      this.calcScreen.classList.add("calc-screen-sml-num");
    } else if (expression.length >= 12) {
      this.calcScreen.classList.remove("calc-screen-sml-num");
      this.calcScreen.classList.add("calc-screen-med-num");
    } else {
      this.calcScreen.classList.remove(
        "calc-screen-med-num",
        "calc-screen-sml-num"
      );
    }
  }

  // THEME SWITCH

  switchTheme() {
    this.body.classList.remove(`theme-${this.curTheme}`);
    if (this.curTheme !== 3) {
      this.curTheme++;
    } else {
      this.curTheme = 1;
    }
    this.body.classList.add(`theme-${this.curTheme}`);
    localStorage.setItem("currTheme", JSON.stringify(this.curTheme));
  }

  readStorage() {
    const userData = JSON.parse(localStorage.getItem("currTheme"));
    if (!userData) {
      this.curTheme = 1;
    } else {
      this.curTheme = userData;
    }
    this.body.classList.add(`theme-${this.curTheme}`);
  }

  init() {
    this.readStorage();
    this.ans = 0;
    this.expression = 0;
    this.calcScreen.textContent = this.expression;
  }
}

const app = new Calculator();
