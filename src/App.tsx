import React, { Component } from "react";
import { Button, Header, Input, Form } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

const defaultAmount = 3;
const signs = ["X", "O", "_"];

interface Iprops {}

interface Istate {
  boared: number[][];
  turn: number;
  win: string;
  err: string;
  areasToWin: number;
  tempAreas: string;
  mode: boolean;
  first: boolean;
}

class App extends Component<Iprops, Istate> {
  constructor(props: Readonly<Iprops>) {
    super(props);
    this.state = {
      boared: this.createBoared(defaultAmount),
      turn: 0,
      win: "",
      err: "",
      areasToWin: defaultAmount,
      tempAreas: "",
      mode: true,
      first: true,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    const amount = Math.floor(window.innerWidth / 120);
    if (this.state.areasToWin > amount) {
      this.setState({
        areasToWin: amount >= defaultAmount ? amount : defaultAmount,
      });
      this.setState({ tempAreas: "" });
      this.initGame(amount >= defaultAmount ? amount : defaultAmount);
    }
  }

  private initGame(newAmount?: number) {
    this.setState({
      turn: 0,
      win: "",
      err: "",
      first: !this.state.first,
    });
    if (this.state.mode) {
      if (this.state.first) {
        this.botTurn(true);
        console.log(this.state.turn);
      } else {
        this.setState({
          boared: this.createBoared(
            newAmount ? newAmount : this.state.areasToWin
          ),
        });
      }
    } else {
      this.setState({
        boared: this.createBoared(
          newAmount ? newAmount : this.state.areasToWin
        ),
      });
    }
  }

  private botTurn(turn?: boolean) {
    const myTurn = turn ? 1 : this.state.turn + 1;
    this.setState({ turn: myTurn + 1 });
    const temp = turn
      ? this.createBoared(this.state.areasToWin)
      : this.state.boared;
    let p = [0, 0];
    temp.forEach((line, y) => {
      line.forEach((space, x) => {
        if (signs[space] === signs[signs.length - 1]) {
          p = [y, x];
        }
      });
    });
    temp[p[0]][p[1]] = myTurn % 2;
    if (!turn) {
      this.checkWin(myTurn % 2);
    } else {
      this.setState({ boared: temp });
    }
  }

  private createBoared(amount: number) {
    // Init the boared of the game
    const temp = [];
    for (let i = 0; i < amount; i++) {
      const otherTemp = [];
      for (let i = 0; i < amount; i++) {
        otherTemp.push(2);
      }
      temp.push(otherTemp);
    }
    return temp;
  }

  private checkWin(who: number) {
    // Check if someone won the game
    let counter = 0;
    let counter2 = 0;
    for (let i = 0; i < this.state.areasToWin; i++) {
      counter = 0;
      counter2 = 0;
      for (let j = 0; j < this.state.areasToWin; j++) {
        if (this.state.boared[i][j] === who) {
          counter += 1;
        }
        if (this.state.boared[j][i] === who) {
          counter2 += 1;
        }
      }
      if (
        counter === this.state.areasToWin ||
        counter2 === this.state.areasToWin
      ) {
        this.setState({ win: signs[who] });
        return true;
      }
      counter = 0;
      counter2 = 0;
      for (let i = 0; i < this.state.areasToWin; i++) {
        if (this.state.boared[i][i] === who) {
          counter += 1;
        }
        if (this.state.boared[i][this.state.areasToWin - 1 - i] === who) {
          counter2 += 1;
        }
      }

      if (
        counter === this.state.areasToWin ||
        counter2 === this.state.areasToWin
      ) {
        this.setState({ win: signs[who] });
        return true;
      }
    }

    if (this.state.turn === this.state.areasToWin * this.state.areasToWin - 1) {
      this.setState({ win: "No one" });
    }

    return false;
  }

  private renderBoared() {
    return this.state.boared.map((places, y) => {
      return (
        <div>
          {places.map((place, x) => {
            return (
              <Button
                color="teal"
                size="massive"
                className="place"
                onClick={() => {
                  if (!this.state.win) {
                    // Copy the boared and save the changes if they are allowed
                    const temp = { ...this.state.boared };
                    if (signs[temp[y][x]] === signs[signs.length - 1]) {
                      temp[y][x] = this.state.turn % 2;
                      const win = this.checkWin(this.state.turn % 2);
                      this.setState({ err: "" });
                      if (!win && this.state.mode) {
                        this.botTurn();
                      } else {
                        this.setState({ turn: this.state.turn + 1 });
                      }
                    } else {
                      this.setState({
                        err: "You can choose only places that were not chosen",
                      });
                    }
                  }
                }}
              >
                {signs[place]}
              </Button>
            );
          })}
        </div>
      );
    });
  }

  render() {
    return (
      <div className="my-tic-tac-toe">
        <Header className="my-header" size="huge">
          Tic Tac Toe
        </Header>
        {this.renderBoared()}
        <Form
          onSubmit={() => {
            // Change the boared to the size that was chosen
            if (
              Number(this.state.tempAreas) <
                Math.floor(window.innerWidth / 120) + 1 &&
              Number(this.state.tempAreas) > 2
            ) {
              this.setState({ areasToWin: Number(this.state.tempAreas) });
              this.setState({ tempAreas: "" });
              this.initGame(Number(this.state.tempAreas));
            } else {
              if (Math.floor(window.innerWidth / 120) > 3) {
                this.setState({
                  err:
                    "You can only choose between 3 to " +
                    Math.floor(window.innerWidth / 120),
                });
              } else {
                this.setState({
                  err: "In your phone the max size is 3",
                });
              }
            }
          }}
        >
          <Form.Field className="my-field">
            <Button color="twitter" type="submit">
              Apply Changes
            </Button>
            <Input
              className="my-input"
              value={this.state.tempAreas}
              placeholder="Num of areas..."
              onChange={(e) => {
                // Make sure you can only get numbers
                const temp = e.target.value[e.target.value.length - 1];
                if ((temp >= "0" && temp <= "9") || temp === undefined)
                  this.setState({ tempAreas: e.target.value });
              }}
            />
          </Form.Field>
        </Form>
        <Button
          className="place"
          size="large"
          color="red"
          onClick={() => {
            this.setState({ mode: !this.state.mode });
            this.initGame();
          }}
        >
          {this.state.mode ? "Play vs friend" : "Play vs computer"}
        </Button>
        {this.state.win && (
          <Header size="large">{this.state.win + " won the game"}</Header>
        )}
        {this.state.err && <Header size="large">{this.state.err}</Header>}
        {this.state.win && (
          <Button
            size="large"
            color="red"
            onClick={() => {
              // Start the game again
              this.initGame();
            }}
          >
            Start again
          </Button>
        )}
      </div>
    );
  }
}

export default App;
