import React from 'react';
import EventForm from './eventForm.jsx';
import { GOOGLE_API } from '../../config.js'
import loadjs from 'loadjs';

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statePlace: ''
    }

    this.handleEventSubmit = this.handleEventSubmit.bind(this);
    this.handleChangeAction = this.handleChangeAction.bind(this);
    this.geolocate = this.geolocate.bind(this);
    
  }

  componentDidMount() {
    const url = "https://maps.googleapis.com/maps/api/js?key=" + GOOGLE_API + "&libraries=places";
    loadjs(url, {
      success: () => {
        const input = document.getElementById('google_auto')
        const searchBox = new window.google.maps.places.SearchBox(input);
        searchBox.addListener('places_changed', () => {
          const place = searchBox.getPlaces();
          this.setState({statePlace : place})
        });
      },
      error: (error) => {
        console.log("Fail to load google autocomplete api url");
      }
    })

  }

  handleChangeAction(values) {
    console.log("handleChangeAction Works ,", values);
    console.log('get the value when change location ', document.getElementById('google_auto').value);
  }

  handleEventSubmit(value) {
    console.log("handleEventSubmit values ", value);
  }

  geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log("Getting geolocation geolocation = ", geolocation);
      })
    }
  }

  render() {
    return (
      <div style={{ "marginTop": "10%" }}>
        <h1>CreateEvent List From CreateEvent.jsx</h1>
        <EventForm onSubmit={this.handleEventSubmit}
          eventChange={this.handleChangeAction}
          geoLocation={this.geolocate} />
      </div>
    );
  }
};


export default CreateEvent;