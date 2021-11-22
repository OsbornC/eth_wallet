import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Route, withRouter } from "react-router-dom";

// https://reacttraining.com/react-router/web/example/custom-link
function NavLink({
  label,
  icon: Icon = null,
  children,
  to,
  activeOnlyWhenExact,
  history,
  handleClick,
}) {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => (
        <ListItem
          onClick={() => {
            history.push(to);
            handleClick && handleClick();
          }}
          button
          selected={Boolean(match)}
        >
          <ListItemIcon>{Icon && <Icon  style={{fill:'white'}} />}</ListItemIcon>
          <ListItemText >{children}</ListItemText>
          
        </ListItem>
      )}
    />
  );
}

export default withRouter(NavLink);
