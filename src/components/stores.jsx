import React, { Component } from "react";
import Pagination from "./common/pagination";
import Table from "./common/table";
import { getStores } from "../services/storeService";
import { paginate } from "../utils/paginate";

class Stores extends Component {
  state = {
    stores: [],
    currentPage: 1,
    pageSize: 5
  };
  columns = ["Id", "Name", "Total Customers"];
  async componentDidMount() {
    const { data } = await getStores();
    const stores = data.data;
    this.setState({ stores });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    console.log(this.state);
    const { pageSize, currentPage, stores: allStores } = this.state;

    const stores = paginate(allStores, currentPage, pageSize);

    return { totalCount: allStores.length, data: stores };
  };
  render() {
    console.log(`[render:stores]: ${this.state}`);
    const { currentPage, pageSize } = this.state;

    //const { user } = this.props;

    const { totalCount, data: stores } = this.getPagedData();
    return (
      <div className="row">
        <div className="col">
          <Table rows={stores} columns={this.columns} />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Stores;
