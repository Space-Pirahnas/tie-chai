import React from 'react';
import { connect } from 'react-redux';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

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
        <GridTile
          key={business.id}
          title={business.name}
          subtitle={<span>at <b>{business.display_address[0] + "&nbsp" + business.display_address[1]}</b></span>}
          actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
          titleStyle={styles.titleStyle}
          titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        >
          <img src={business.image_url} width={220} />
        </GridTile>
      ))}
    </GridList>
  </div>)
};

function mapStateToProps(state) {
  return { yelp_businesses: state.yelp.businesses };
}

export default connect(mapStateToProps, null)(BusinessGridList);