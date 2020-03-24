import React, { Component } from 'react';
import { View } from 'react-native';
import MapView, {
  Marker, Polyline, PROVIDER_GOOGLE
} from 'react-native-maps';
import buildings from '../../assets/polygons/polygons';
import CustomPolygon from './customPolygon';
import styles from './styles';

let region = '';

export default class TheMap extends Component {
  /**
   * Represents a map.
   * @constructor
   */
  constructor(props) {
    super(props);
    this.mapRef = null;
    this.focusOnBuilding = this.focusOnBuilding.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.state = {
      coordinate: {
        latitude: 45.492409,
        longitude: -73.582153,
      },
      nearbyMarkers: []
    };
    this.selectPoi = this.selectPoi.bind(this);
  }

  /**
   * Sets the mapRef when the component is mounted
   */
  componentDidMount() {
    this.setState({ mapRef: this.mapRef },
      () => { this.fitScreenToPath(this.props.updatedCoordinates); });
  }

  /**
   *
   * @param {*} prevProps - props from previous state
   * Updates view when change detected in props
   */
  componentDidUpdate(prevProps) {
    const coordinates = this.props.updatedCoordinates;
    if (prevProps.updatedCoordinates !== coordinates) {
      this.fitScreenToPath(coordinates);
    }
  }

  /**
   *
   * @param {*} newRegion - region to update to on map
   * Update region on map
   */
  onRegionChange(newRegion) {
    region = newRegion;
  }

  /**
   *
   * @param {*} building - building to be focused on map
   * focuses on building on map when user taps it's coordinates on the map
   */
  focusOnBuilding(building) {
    const { coordinates } = building.polygon;

    this.state.mapRef.fitToCoordinates(coordinates, {
      edgePadding: {
        top: 10, right: 20, bottom: 10, left: 20
      }
    });

    // they do not provide a callback when the fitToCoordinates is complete.
    // Setting at timer for the animation to finish
    setTimeout(() => {
      const getRegion = region;
      this.props.interiorModeOn(building, getRegion);
    }, 500);
  }

  /**
   *
   * @param {*} coordinates - coords of where to focus
   * When user requests outdoor directions, this function will focus on the polyline path
   */
  fitScreenToPath(coordinates) {
    this.state.mapRef.fitToCoordinates(coordinates, {
      edgePadding: {
        top: 180, right: 20, bottom: 10, left: 20
      }
    });
  }

  /** Send the selected point of interest to the parent component */
  async selectPoi(poi) {
    const id = poi.nativeEvent.placeId;
    const key = 'AIzaSyCqNODizSqMIWbKbO8Iq3VWdBcK846n_3w';
    const geoUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${key}&placeid=${id}`;
    if (id) {
      try {
        const georesult = await fetch(geoUrl);
        const gjson = await georesult.json();
        const address = gjson.result.formatted_address;
        const { name } = gjson.result;
        const locations = gjson.result.geometry.location;
        this.props.getDestinationIfSet(`${name}, ${address}`);
        this.props.updateRegionCloser({
          latitude: locations ? locations.lat : 45.492409,
          longitude: locations ? locations.lng : -73.582153,
        });
      } catch (err) {
        console.error(err);
      }
    }
  }

  // do not put conponents that dont belong to react-native-maps API inside the MapView
  render() {
    const buildingFocus = buildings.map((building) => {
      return (
        <CustomPolygon
          key={building.buildingName + building.address}
          building={building}
          focusOnBuilding={this.focusOnBuilding}
          fillColor="rgba(255,135,135,0.5)"
        />
      );
    });

    const currRef = (ref) => { this.mapRef = ref; };

    return (
      <View style={styles.container}>
        <MapView
          ref={currRef}
          provider={PROVIDER_GOOGLE}
          key="map"
          region={this.props.updatedRegion}
          onRegionChange={this.onRegionChange}
          style={styles.mapStyle}
          onPoiClick={this.selectPoi}
        >
          <Polyline
            coordinates={this.props.updatedCoordinates ? this.props.updatedCoordinates : []}
            strokeWidth={4}
            strokeColor="black"
          />
          {buildingFocus}
          {
            // Add different colored marker at location if nothing is nearby
            this.props.nearbyMarkers.length > 0
              ? this.props.nearbyMarkers.map((marker) => {
                return (
                  <Marker
                    key={marker.id}
                    coordinate={marker.coordinates}
                    title={marker.title}
                    description={marker.description}
                  />
                );
              }) : (
                <Marker
                  pinColor="#84ECED"
                  coordinate={{
                    latitude: this.props.updatedRegion.latitude,
                    longitude: this.props.updatedRegion.longitude
                  }}
                  title=""
                  description=""
                />
              )
          }

        </MapView>
      </View>
    );
  }
}
