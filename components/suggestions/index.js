import React, { Component } from 'react';
import { View, Text, Image, Dimensions, FlatList } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import styles from './styles';

class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh:true,
      content: [{ name: 'talal', image: require('./timeHortons.jpg') }]
    };
  }

  // componentDidMount() {
  //   console.log( "I am here1");
  //   this.setState({
  //     content: this.props.placesToGo,
  //     refresh:!this.state.refresh
  //   });
  //   console.log("I am here2 "+this.state.content);

  // }

  componentWillReceiveProps(nextProps) {
  // You don't have to do this check first, but it can help prevent an unneeded render
    this.setState({
      refresh:!this.state.refresh
    });


  }


    _renderItem = ({ item }) => {
      return (
        <View style={styles.slide}>
          <Image style={styles.image} source={item.image} />
          <View style={styles.information}>
            <Text style={styles.name}>{ item.name }</Text>
          </View>
        </View>
      );
    }


    render() {
      const { content } = typeof this.props.placesToGo === 'undefined' ? this.state.content : this.props.placesToGo;
      console.log("i am here"+content);
      return (
        <View style={styles.container}>
          <Text>Hall Building</Text>
          <Text>Open</Text>
          <Text>Tunnel Accessibility</Text>
          {/* <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.state.content}
            containerCustomStyle={styles.carousel}
            renderItem={this._renderItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={300}
            loop={true}
            autoplay={true}
            autoplayDelay={0}
            enableMomentum={true}
            lockScrollWhileSnapping={false}
            autoplayInterval={
                this.handleTimeReturn()
            } 
          /> */}

          <FlatList
            horizontal
            data={content}
            extraData={!this.state.refresh}
            renderItem={this._renderItem}
          />
        </View>

      );
    }
}
export default Suggestions;
