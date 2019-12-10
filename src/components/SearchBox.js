import React from "react";
import { connect } from "react-redux";
import { getCustomers } from "../services/api";
import { getTokenFromUrl, getTokenFromStorage } from "../services/token";
import { setCustomers } from "../store/actions";

class SearchBox extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    }
    this.timer = null;
    this.onTyping = this.onTyping.bind(this);
  }

  async onTyping (e) {
    const searchText = e.target.value;
    console.log("typing: ", searchText);
    this.setState({ searchText });

    clearInterval(this.timer);
    this.timer = setTimeout(async function () {
      const token = getTokenFromUrl() || getTokenFromStorage();
      const customers = await getCustomers(this.props.apiBaseUrl, token, searchText);
      console.log('[customers] api response: ', customers);
      this.props.setCustomers(customers);
    }.bind(this), 200);
  }

  render () {
    return (
      <div className="searchBox">
        <input className="searchBox__input" value={this.state.searchText} onChange={this.onTyping}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  apiBaseUrl: state.apiBaseUrl,
  accessToken: state.accessToken,
});

const mapDispatchToProps = dispatch => ({
  setCustomers: value => dispatch(setCustomers(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
