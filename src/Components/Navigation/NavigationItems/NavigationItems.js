import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
// import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";

const navigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">App</NavigationItem>
      <NavigationItem link="/game-data">Game Data</NavigationItem>
      <NavigationItem link="/about">About</NavigationItem>
    </ul>
  );
};

export default navigationItems;
