
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated
} from 'react-native';

var {height, width } = Dimensions.get('window')

import Map from 'react-native-maps'
class Distance extends Component {

  constructor(props){
    super(props)
    this.state = {
      points:[]
    }
  }

  _handleDrag = (cord) =>{
      this.setState({
        points:[...this.state.points,cord]
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Map
           style={{flex:1,height:height,width:width}}
           ref = { (MapRef)=> {if( MapRef !=null ) { MapRef.fitToElements(true) }} }
           loadingEnabled = {true}
           onRegionChangeComplete = {(movedTo) => { this.newRegion = movedTo }}
           onPanDrag =  {(e) => {this._handleDrag(e.nativeEvent.coordinate)}}
           animateToRegion = {this._animateToRegion}
           scrollEnabled = {false}
           onPress = {(e)=>{(
              this.props.drawMode &&
               ( PL || PG || FL || CR || DM ))
             ? this._handleNewPoint(e.nativeEvent.coordinate)
             : null
           }}>
          <Map.Polyline
                 coordinates={this.state.points}
                 strokeColor="#00C5F0"
                 strokeWidth={5}/>

          </Map>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'green',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = Distance
