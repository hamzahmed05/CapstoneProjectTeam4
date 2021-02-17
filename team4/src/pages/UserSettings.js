import React, { Component } from "react";
import { Redirect, useParams } from "react-router-dom";
import { getUserById } from "../helpers/auth";
import { auth, firestore } from "../services/firebase";
import { withRouter } from "react-router";

class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "student",
      user: props.location.state,
      text: "",
    };
  }

  onChange = (e) => {
    this.setState({ selected: e.target.value });
  };

  onTextChange = (e) => {
    var element = document.getElementById("universityLabel");
    if (e.target.value != "") {
      element.classList.add("active");
      this.setState({ text: e.target.value });
    } else {
      element.classList.remove("active");
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.state.user.accountType = this.state.selected;
    firestore
      .collection("userInfo")
      .doc(this.state.user.uid)
      .set({
        displayName: this.state.user.displayName,
        email: this.state.user.email,
        photoURL: this.state.user.photoURL,
        accountType: this.state.user.accountType,
        university: this.state.text,
        uid: this.state.user.uid,
      })
      .then((res) => {
        this.props.history.push({
          pathname: "/home",
          state: this.state.user,
        });
        window.location.reload(false);
      });
  };

  render() {
    return (
      <div class="row">
        <form class="col s12" onSubmit={this.handleSubmit}>
          <div class="row">
            <h1> Welcome! </h1>
            <h4> Are you a: </h4>
            <br />
            <br />
          </div>

          <div class="center-align">
            <label>
              <input
                type="radio"
                name="usertype"
                value="student"
                onChange={this.onChange}
                defaultChecked
              />
              <span> Student </span>
            </label>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label>
              <input
                type="radio"
                name="usertype"
                value="professor"
                onChange={this.onChange}
              />
              <span> Professor </span>
            </label>
          </div>

          <div class="input-field col s2 offset-s5">
            <input
              id="university"
              type="text"
              class="validate"
              onChange={this.onTextChange}
              required
            />

            <label for="university" id="universityLabel">
              University
            </label>
          </div>

          <br />
          <br />
          <br />
          <div class="input-field col s2 offset-s5">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default UserSettings;
