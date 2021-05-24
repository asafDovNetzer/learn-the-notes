import React, { Component } from "react";
import classes from "./About.module.css";

class About extends Component {
  render() {
    return (
      <div className={classes.About}>
        <p
          style={{
            height: `40px`,
            fontSize: `200%`,
            color: `green`,
            fontWeight: `600`,
            paddingRight: `200px`,
          }}
        >
          Learn the Notes
        </p>
        <p style={{ paddingLeft: `80px` }}>
          is a <strong> memory card game </strong> designed to improve the
          user's sheet music
          <strong> reading speed</strong>.
        </p>
        <p style={{ paddingRight: `80px` }}>
          It <strong>studies</strong> the user's knowledge and improves the
          playing expirience over time.
        </p>
        <p style={{ paddingLeft: `80px` }}>
          Learn the Notes is <strong>completely free</strong> !
        </p>
        <p style={{ paddingRight: `80px` }}>
          <strong>Login</strong> or <strong>Sign up</strong> for the ULTIMATE
          expirience
        </p>
        <p style={{ fontSize: `100%`, fontWeight: `600` }}>
          This is a beta version, feel free to sent comments to
          learn.the.notes.app@gmail.com
        </p>
      </div>
    );
  }
}

export default About;
