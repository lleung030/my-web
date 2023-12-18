import React, { Component } from 'react';

class Pong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: { x: 0, y: 0 },
      direction: { x: 1, y: 1 },
      ballSize: 50,
      paddleSize: 100, // Adjust paddle size
      paddles: [
        { x: 0, y: 0 }, // Left paddle initial position
        { x: window.innerWidth - 10, y: 0 }, // Right paddle initial position
      ],
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.updateBallPosition();
    }, 16);
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
      
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }
  handleKeyDown = (event) => {
    const { paddles, paddleSize } = this.state;
    const speed = 5;

    // Move the left paddle down (key: s)
    if (event.key === 's') {
      this.setState((prevState) => {
        const newY = Math.min(
          window.innerHeight - paddleSize,
          prevState.paddles[0].y + speed
        );
        return {
          paddles: [{ x: 0, y: newY }, paddles[1]],
        };
      });
    }

    // Move the left paddle up (key: w)
    if (event.key === 'w') {
      this.setState((prevState) => {
        const newY = Math.max(0, prevState.paddles[0].y - speed);
        return {
          paddles: [{ x: 0, y: newY }, paddles[1]],
        };
      });
    }

      // Move the right paddle down (key: ArrowDown)
    if (event.key === 'ArrowDown') {
      this.setState((prevState) => {
        const newY = Math.min(
          window.innerHeight - paddleSize,
          prevState.paddles[1].y + speed
        );
        return {
          paddles: [paddles[0], { x: window.innerWidth - 10, y: newY }],
        };
      });
    }

    // Move the right paddle up (key: ArrowUp)
    if (event.key === 'ArrowUp') {
      this.setState((prevState) => {
        const newY = Math.max(0, prevState.paddles[1].y - speed);
        return {
          paddles: [paddles[0], { x: window.innerWidth - 10, y: newY }],
        };
      });
    }
  };

  updateBallPosition = () => {
    const { position, direction, ballSize, paddles } = this.state;
    const { x, y } = position;

    const speed = 5;

    const newPosition = {
      x: x + direction.x * speed,
      y: y + direction.y * speed,
    };

    // Check if the ball hits the window boundaries
    if (newPosition.x >= window.innerWidth - ballSize || newPosition.x <= 0) {
      this.setState({
        direction: { x: -direction.x, y: direction.y },
      });
    }

    if (newPosition.y >= window.innerHeight - ballSize || newPosition.y <= 0) {
      this.setState({
        direction: { x: direction.x, y: -direction.y },
      });
    }

    // Update the ball position
    this.setState({
      position: newPosition,
    });

    // Check if the ball hits the paddles
    paddles.forEach((paddle) => {
      if (
        newPosition.x >= paddle.x &&
        newPosition.x <= paddle.x + 10 &&
        newPosition.y >= paddle.y &&
        newPosition.y <= paddle.y + this.state.paddleSize
      ) {
        this.setState({
          direction: { x: -direction.x, y: direction.y },
        });
      }
    });
  };

  render() {
    const { x, y } = this.state.position;
    const { paddles, paddleSize } = this.state;

    const ballStyle = {
      position: 'absolute',
      top: `${y}px`,
      left: `${x}px`,
      width: '50px',
      height: '50px',
      backgroundColor: 'yellow',
      borderRadius: '50%',
    };

    return (
      <div>
        <pre style={ballStyle}>|o_o |</pre>
        {paddles.map((paddle, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: `${paddle.y}px`,
              left: `${paddle.x}px`,
              width: '10px',
              height: `${paddleSize}px`,
              backgroundColor: 'blue',
            }}
          />
        ))}
      </div>
    );
  }
}

export default Pong;
