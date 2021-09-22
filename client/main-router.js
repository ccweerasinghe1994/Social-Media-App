import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./home-page.component";

const MainRouter = () => {
  return (
    <Switch>
      <Route path={"/"} exact component={HomePage} />
    </Switch>
  );
};

export default MainRouter;
