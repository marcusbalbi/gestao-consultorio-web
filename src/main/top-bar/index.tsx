import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MainMenu from "./Menu";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";
import LoadingContext from "../../hooks/loading/LoadingContext";
import { useAuth } from "../../hooks/auth";
import { AppBreadScrumb } from "./AppBreadScrumb";

const TopBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const loading = React.useContext(LoadingContext);
  const { token, signOut } = useAuth();

  const [mainMenuOpened, setMainMenuOpened] = React.useState(false);

  const navigate = useNavigate();

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSignout = () => {
    signOut();
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleSignout}>Sair</MenuItem>
      {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
    </Menu>
  );

  if (!token) {
    return <></>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MainMenu
        opened={mainMenuOpened}
        onClose={() => {
          setMainMenuOpened(false);
        }}
      />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={() => setMainMenuOpened(true)}
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link
            variant="h6"
            // noWrap
            color="inherit"
            underline="none"
            onClick={() => {
              navigate("/");
            }}
            sx={{ cursor: "pointer", display: { sm: "block" } }}
          >
            Gestão Consultório Web
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 1 new notifications"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {loading ? <LinearProgress /> : <></>}
      <AppBreadScrumb />
    </Box>
  );
};

export { TopBar };
