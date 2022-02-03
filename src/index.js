import "./styles/general.css";
import "./styles/sidebar.css";
import "./styles/main.css";
import * as Todomanager from "./scripts/manage-todos";
import * as Dommanager from "./scripts/dom-add-todo";

Todomanager.start();
Dommanager.start();