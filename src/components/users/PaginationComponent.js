import React, { Component } from "react";
import Pagination from "react-js-pagination";
import PropTypes from "prop-types";
import { isEqual } from "lodash";

class PaginationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalRecords: 0,
      activePage: props.activePage,
      limit: props.itemsCountPerPage
    };
  }
  //Handle total records if comes
  componentDidMount = nextProps => {
    this.setState({
      totalRecords: nextProps ? nextProps.totalRecords : this.props.totalRecords
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(!isEqual(prevProps.activePage, this.props.activePage)){
      this.setState({
        activePage: this.props.activePage
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !isEqual(nextProps.activePage, this.props.activePage) 
    || !isEqual(nextState.totalRecords, this.state.totalRecords) 
    || !isEqual(nextState.activePage, this.state.activePage) 
    || !isEqual(nextState.limit, this.state.limit);
  }

  //Handle Page Change
  handlePageChange = page => {
    this.setState({
      activePage: page
    });
    this.props.getAllData(page);
  };

  componentWillReceiveProps = nextProps => {
    this.componentDidMount(nextProps);
  };

  //Return pagination UI
  render() {
    let { activePage, limit, totalRecords } = this.state;
    return (
      <div className="pagination-wrapper" style={{ marginLeft: "30%" }}>
        <Pagination
          aria-label="Page navigation example"
          itemClass="page-item"
          linkClass="page-link"
          prevPageText="Prev"
          nextPageText="Next"
          firstPageText="First"
          lastPageText="Last"
          activePage={activePage}
          itemsCountPerPage={limit}
          totalItemsCount={totalRecords}
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
}

PaginationComponent.propTypes = {
  totalRecords: PropTypes.any,
  limit: PropTypes.any,
  activePage: PropTypes.any,
  getAllData: PropTypes.any
};

export default PaginationComponent;
