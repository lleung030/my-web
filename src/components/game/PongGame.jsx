import React, { Component } from "react";

class PongGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paddle1Y: 50,
      paddle2Y: 50,
      ballX: 200,
      ballY: 100,
      ballSpeedX: 5, // Adjust the ball speed as needed
      ballSpeedY: 5, // Adjust the ball speed as needed
      score1: 0,
      score2: 0,
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.moveBall = this.moveBall.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
    this.ballInterval = setInterval(this.moveBall, 30); // Adjust the interval as needed
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
    clearInterval(this.ballInterval);
  }

  handleKeyDown(event) {
    const { paddle1Y, paddle2Y, score1, score2 } = this.state;
    const paddleSpeed = 10;
    const boardHeight = 200; // Adjust the board height as needed
    const paddleHeight = 80;

    if (event.key === "ArrowUp") {
      this.setState({
        paddle2Y: Math.max(0, paddle2Y - paddleSpeed),
      });
    } else if (event.key === "ArrowDown") {
      this.setState({
        paddle2Y: Math.min(boardHeight - paddleHeight, paddle2Y + paddleSpeed),
      });
    } else if (event.key === "w") {
      this.setState({
        paddle1Y: Math.max(0, paddle1Y - paddleSpeed),
      });
    } else if (event.key === "s") {
      this.setState({
        paddle1Y: Math.min(boardHeight - paddleHeight, paddle1Y + paddleSpeed),
      });
    } else if (event.key === "r") {
      // Reset ball position only when the "r" is pressed
      this.setState({ ballX: 200, ballY: 100, score1: 0, score2: 0 });
    } else if (event.key === " ") {
      // Check if the loser pressed spacebar before resetting the ball
      if (
        (score1 > score2 && event.key === " ") ||
        (score2 > score1 && event.key === " ")
      ) {
        this.resetBall();
      }
    }
  }

  moveBall() {
    const { ballX, ballY, ballSpeedX, ballSpeedY, paddle1Y, paddle2Y } =
      this.state;
    const boardWidth = 400; // Adjust the board width as needed
    const boardHeight = 200; // Adjust the board height as needed
    const ballSize = 10; // Adjust the ball size as needed
    const paddleWidth = 10;
    const paddleHeight = 80;

    let newBallX = ballX + ballSpeedX;
    let newBallY = ballY + ballSpeedY;

    // Check for collisions with paddles
    if (
      (newBallX <= 20 + paddleWidth &&
        newBallY + ballSize >= paddle1Y &&
        newBallY <= paddle1Y + paddleHeight) ||
      (newBallX + ballSize >= boardWidth - 30 - paddleWidth &&
        newBallY + ballSize >= paddle2Y &&
        newBallY <= paddle2Y + paddleHeight)
    ) {
      // Ball collided with paddle, reverse the X direction
      this.setState({ ballSpeedX: -ballSpeedX });
    }

    // Check for collisions with top and bottom walls
    if (newBallY <= 0 || newBallY + ballSize >= boardHeight) {
      // Ball collided with top or bottom wall, reverse the Y direction
      this.setState({ ballSpeedY: -ballSpeedY });
    }

    // Check if the ball passed the paddles and award points
    if (newBallX < 0) {
      // Player 2 (right paddle) scores a point
      this.setState((prevState) => ({ score2: prevState.score2 + 1 }));
      this.resetBall();
    } else if (newBallX + ballSize > boardWidth) {
      // Player 1 (left paddle) scores a point
      this.setState((prevState) => ({ score1: prevState.score1 + 1 }));
      this.resetBall();
    } else {
      // Update ball position
      this.setState({ ballX: newBallX, ballY: newBallY });
    }
  }

  resetBall() {
    const { score1, score2 } = this.state;
    const servingPlayer = score1 > score2 ? 1 : 2;
    this.setState({
      ballX: 200,
      ballY: 100,
      paddle1Y: 50,
      paddle2Y: 50,
      ballSpeedX:
        servingPlayer === 1
          ? Math.abs(this.state.ballSpeedX)
          : -Math.abs(this.state.ballSpeedX),
    });
  }

  render() {
    const { paddle1Y, paddle2Y, ballX, ballY, score1, score2 } = this.state;
    const paddleWidth = 10;
    const paddleHeight = 80;
    const ballSize = 10;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Set the height to the full viewport height
        }}
      >
        <div
          style={{
            position: "relative",
            width: "400px",
            height: "200px",
            border: "1px solid #000",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "10px",
              top: `${paddle1Y}px`,
              width: `${paddleWidth}px`,
              height: `${paddleHeight}px`,
              background: "#000",
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "10px",
              top: `${paddle2Y}px`,
              width: `${paddleWidth}px`,
              height: `${paddleHeight}px`,
              background: "#000",
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: `${ballX - ballSize / 2}px`,
              top: `${ballY}px`,
              // width: `${ballSize}px`,
              // height: `${ballSize}px`,
              background: "orange",
              // borderRadius: "50%",
              fontFamily: "monospace",
              fontSize: `${ballSize}px`,
              zIndex: 2,
            }}
          >
            | o__o |
          </div>
        </div>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p>Player 1 Score: {score1}</p>
          <p>Player 2 Score: {score2}</p>
          <p>"Hit (R)estart to game!!"</p>
        </div>
      </div>
    );
  }
}

export default PongGame;
