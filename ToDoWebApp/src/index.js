import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import AppContainer from "app/AppContainer";

import "./index.css";

const target = document.querySelector("#root");

render(<AppContainer />, target);
