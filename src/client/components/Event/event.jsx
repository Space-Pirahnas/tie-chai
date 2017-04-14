import React from 'react';
import { connect } from 'react-redux';
import EventForm from './eventForm.jsx';
import YelpSearchForm from './yelpSearchForm.jsx';
import BusinessGridList from './business.jsx';
import { GOOGLE_API } from '../../config.js'
import loadjs from 'loadjs';
import * as actions from '../../actions/yelp.jsx'


class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statePlace: '',
      business: ''
    }
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
    this.handleChangeAction = this.handleChangeAction.bind(this);
    this.handleYelpClick = this.handleYelpClick.bind(this);
  }

  componentDidMount() {
    const url = "https://maps.googleapis.com/maps/api/js?key=" + GOOGLE_API + "&libraries=places";
    loadjs(url, {
      success: () => {
        const input = document.getElementById('google_auto')
        const searchBox = new window.google.maps.places.SearchBox(input);
        searchBox.addListener('places_changed', () => {
          const place = searchBox.getPlaces();
          this.setState({
            statePlace: place[0].formatted_address
          })
        });

      },
      error: (error) => {
        console.log("Fail to load google autocomplete api url");
      }
    })
  }


  handleChangeAction(value) {
    console.log("In the handleChangeAction detect the value change ", value);
    this.setState({ business: value })
  }

  handleEventSubmit(value) {
    console.log("handleEventSubmit values ", value);
    console.log("Date to meet", value.when.toString());
    console.log("Time to meet", JSON.stringify(value.at));
  }

  handleYelpClick(value) {
    console.log("click the yelp button, get business name", value);
    this.props.getYelpBusiness(value.keywordYelp, value.locationYelp)
  }


  handleEventSubmit(value) {
    console.log("handleEventSubmit values ", value);
  }

  render() {
    return (
      <div style={{ "marginTop": "10%" }}>
        <h1>Host An Event</h1>
        <YelpSearchForm onSubmit={this.handleYelpClick}/>
        {this.props.yelp_businesses ? <BusinessGridList /> : null}
        <hr />
        <EventForm onSubmit={this.handleEventSubmit}
          eventChange={this.handleChangeAction}
          yelp={this.handleYelpClick} />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return { yelp_businesses: state.yelp.businesses };
}


export default connect(mapStateToProps, actions)(CreateEvent);