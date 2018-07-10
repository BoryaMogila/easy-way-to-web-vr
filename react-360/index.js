import React from 'react';
import {
  AppRegistry,
  View,
  Box,
  asset,
  Animated,
} from 'react-360';

import {
    Easing
} from 'react-native'

export default class react_360 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        rotateX: new Animated.Value(0),
        rotateY: new Animated.Value(0),
    }
  }
  componentDidMount() {
      Animated.loop(
          Animated.timing(
              this.state.rotateX,
              {
                  toValue: 360,
                  duration: 3000,
                  easing: Easing.linear
              },
              {
                  iterations: Infinity
              }
          )).start();
      Animated.loop(
          Animated.timing(
              this.state.rotateY,
              {
                  toValue: 360,
                  duration: 3000,
                  easing: Easing.linear
              }
          )
      ).start();
  }
  render() {
    return (
        <View style={{
            width: 1000,
            height: 600,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Animated.View style={{
                transform: [
                    {rotateX: this.state.rotateX},
                    {rotateY: this.state.rotateY}
                ]
            }}
            >
                <Box dimWidth={200} dimHeight={200} dimDepth={200}
                     texture={{
                         ...asset('stone.jpeg'),
                     }}>
                </Box>
            </Animated.View>
        </View>
    );
  }
};

AppRegistry.registerComponent('react_360', () => react_360);
