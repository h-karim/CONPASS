import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { hook } from 'cavy';
import styles from './styles';

class SwitchCampuses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
      },
    };
  }

  /** Set the current map region to loyola campus. */
  setLoyola() {
    this.setState({
      region: {
        latitude: 45.458025,
        longitude: -73.640192,
      }
    }, () => { this.props.updateRegion(this.state.region); });
  }

  /** Set the current map region to SGW campus. */
  setSGW() {
    this.setState({
      region: {
        latitude: 45.495598,
        longitude: -73.577850,
      }
    }, () => { this.props.updateRegion(this.state.region); });
  }

  render() {
    if (this.props.visiblityState) {
      return (
        <View
          ref={this.props.generateTestHook('SwitchCampuses')}
          style={styles.container}
        >
          <View style={styles.btn}>
            <Button
              ref={this.props.generateTestHook('SwitchCampuses.SetLoyolaButton')}
              title="Loyola"
              onPress={() => { this.setLoyola(); }}
            />
          </View>

          <View style={styles.btn}>
            <Button
              ref={this.props.generateTestHook('SwitchCampuses.SetSGWButton')}
              title="SGW"
              onPress={() => { this.setSGW(); }}
            />
          </View>
        </View>
      );
    }
    return null;
  }
}

export default hook(SwitchCampuses);
