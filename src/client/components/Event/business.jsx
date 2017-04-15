import React from 'react';
import { connect } from 'react-redux';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import * as actions from '../../actions/yelp.jsx';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

const BusinessGridList = (props) => {
  if (props.yelp_businesses.length === 0) {
    return (<div>No relative business exist at the location.</div>)
  }

  return (<div style={styles.root}>
    <GridList style={styles.gridList} cols={2.2} padding={10}>
      {props.yelp_businesses.map((business) => (
        <GridTile className="YelpGridTile"
          key={business.id}
          title={business.name}
          subtitle={displayAddress(business.location.display_address)}
          titleStyle={styles.titleStyle}
          titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          onClick={()=>{window.open(business.url); props.selectedBusiness(business)}}
        >
          <img src={business.image_url} width={220} />
        </GridTile>
      ))}
    </GridList>
  </div>)
};

const displayAddress = (addressArray) => {
  if (addressArray.length === 3) {
    return (
      <span><b>{addressArray[0]}</b>
        <br />{addressArray[1]}
        <br />{addressArray[2]}</span>
    );
  }
  return (<span><b>{addressArray[0]}</b>
    <br />{addressArray[1]}</span>);
}

function mapStateToProps(state) {
  return { yelp_businesses: state.yelp.businesses };
}

export default connect(mapStateToProps, actions)(BusinessGridList);