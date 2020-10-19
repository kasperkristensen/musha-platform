import React, { Component } from "react";
import { getUserInfo } from "../spotify/api_calls";
import NavBar from "./NavBar";

class NavContainer extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    try {
      const { user } = await getUserInfo();
      this.setState({
        user,
      });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const { user } = this.state;
    let display_name;
    let avatar_url;
    if (!user) {
      display_name = "";
      avatar_url = "";
    } else {
      display_name = user.display_name;
      if (user.images.length > 0) {
        avatar_url = user.images[0].url;
      }
    }
    return <NavBar {...{ display_name: display_name, avatar: avatar_url }} />;
  }
}

export default NavContainer;
