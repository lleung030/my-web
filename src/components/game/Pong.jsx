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
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

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
