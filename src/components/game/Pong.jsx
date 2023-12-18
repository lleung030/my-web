import React, { Component } from 'react';

class Pong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: { x: 0, y: 0 },
      direction: { x: 1, y: 1 },
      ballSize: 50, // Added ball size for better boundary calculations
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.updateBallPosition();
    }, 16); // Adjusted interval for smoother animation (60 frames per second)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  updateBallPosition = () => {
    const { position, direction, ballSize } = this.state;
    const { x, y } = position;

    // Set the speed of the ball (you can adjust this value)
    const speed = 5;

    // Calculate the new position based on the current direction and speed
    const newPosition = {
      x: x + direction.x * speed,
      y: y + direction.y * speed,
    };

    // Check if the ball hits the window boundaries
    if (newPosition.x >= window.innerWidth - ballSize || newPosition.x <= 0) {
      // Reverse the direction in the x-axis
      this.setState({
        direction: { x: -direction.x, y: direction.y },
      });
    }

    if (newPosition.y >= window.innerHeight - ballSize || newPosition.y <= 0) {
      // Reverse the direction in the y-axis
      this.setState({
        direction: { x: direction.x, y: -direction.y },
      });
    }

    // Update the ball position
    this.setState({
      position: newPosition,
    });
  };

  render() {
    const { x, y } = this.state.position;

    const ballStyle = {
      position: 'absolute',
      top: `${y}px`,
      left: `${x}px`,
      width: '50px', // Adjust the width
      height: '50px', // Adjust the height
      backgroundColor: 'yellow', // You can add other styles as needed
      borderRadius: '50%', // This makes the div a circle
    };

    return (
      <pre style={ballStyle}>
        |o_o |
      </pre>
    );
  }
}

export default Pong;
