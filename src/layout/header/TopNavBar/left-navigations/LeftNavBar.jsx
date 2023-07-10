import React from "react";
import Box from "@mui/material/Box";
import Logo from "../Logo/Logo";
import LogoIcon from "../Logo/LogoIcon";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ROUTES from "../../../../routes/routesModel";
import NavItem from "../../../../routes/NavItem";
import { useUser } from "../../../../users/providers/UserProvider";

const LeftNavBar = () => {

  const { user } = useUser();

  return (
    <Box>
      <LogoIcon />
      <Logo />

      <Box sx={{ display: { xs: "none", md: "inline-flex" } }}>
        <NavItem to={ROUTES.ABOUT} label="about" />

        {user?.isBusiness && (
          <>
            <NavItem to={ROUTES.MY_CARDS} label="My Cards" />
            <NavItem to={ROUTES.FAV_CARDS} label="Fav Cards" />
          </>
        )}

        {user?.isAdmin && <NavItem to={ROUTES.SANDBOX} label="Sandbox" />}
      </Box>
    </Box>
  );
};

export default LeftNavBar;
