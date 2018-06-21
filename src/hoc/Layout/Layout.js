import React from "react";
import Aux from "../../hoc/Aux/Aux";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/ToolBar/ToolBar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends React.Component {

  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false
    })
  }

  sideDrawerOpenHandler = () => {
    this.setState({
      showSideDrawer: true
    })
  }
  render (){
    return (
      <Aux>
        <SideDrawer show={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
        <Toolbar open={this.sideDrawerOpenHandler}/>
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    )
  }

}

export default Layout;
