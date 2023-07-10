import React from "react";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import ROUTES from "../../../../routes/routesModel";
import NavBarLink from "../../../../routes/NavBarLink";

const LogoIcon = () => {
  return (
    <NavBarLink
      to={ROUTES.CARDS}
      sx={{ color: "#fff", textDecorationLine: "none" }}
    >

      <IconButton
        sx={{ display: { xs: "inline-flex", md: "none" } }}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu">
        <Avatar alt="Business card icon" src="/assets/images/business-card.png" />
      </IconButton>
    </NavBarLink>
  );
};

export default LogoIcon;
