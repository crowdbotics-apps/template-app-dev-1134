import React, { Component } from "react";
// import Drawer from "react-native-drawer";
import {Drawer} from "native-base";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SideBar from "./components/driver/sideBar";
import { closeDrawer } from "./actions/drawer";

class NavigationDrawer extends Component {
  static propTypes = {
    drawerState: PropTypes.string,
    closeDrawer: PropTypes.func
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.drawerState === "opened") {
      this._drawer._root.open();
    } else if (nextProps.drawerState === "closed") {
      this._drawer._root.close();
    }
  }

  openDrawer() {
    if (this.props.drawerState === "closed") {
      this._drawer._root.open();
    }
  }
  closeDrawer() {
    if (this.props.drawerState === "opened") {
      this.props.closeDrawer();
    }
  }

  render() {
    return (
      <Drawer
        ref={ref => {
          this._drawer= ref;
        }}
        type="overlay"
        content={<SideBar />}
        tapToClose
        acceptPan={false}
        onClose={() => this.closeDrawer()}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan
      >
        {this.props.children}
      </Drawer>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer())
  };
}
const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState
});

export default connect(
  mapStateToProps,
  bindAction
)(NavigationDrawer);
