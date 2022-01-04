import React, {useContext, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import signContext from "../stores/sign-context";
import {
  alpha, AppBar, Box, Button, InputBase, Toolbar, styled, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography,
  Divider
} from "@mui/material";
import {Search as SearchIcon} from "@mui/icons-material";
import logo from "../assets/logo.png";

function Header() {
  const history = useHistory();
  const signCtx = useContext(signContext);

  const [anchorMenu, setAnchorMenu] = useState(null);
  const [search, setSearch] = useState("");

  const handleOpenMenu = (e) => setAnchorMenu(e.currentTarget);
  const handleCloseMenu = () => setAnchorMenu(null);

  const toPersonal = () => {
    history.push("/personal");
    handleCloseMenu();
  }

  const signOut = () => {
    localStorage.clear();
    window.location.reload();
  }

  const onSearch = (e) => {
    e.preventDefault();
    history.push(`/search/${search}`);
  }

  return (
    <AppBar position="sticky" color="success" sx={styles.header}>
      <Toolbar>
        <Box sx={styles.boxLeft}>
          <Link to="/">
            <img src={logo} alt="logo"/>
          </Link>

          <form onSubmit={onSearch}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon/>
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search..." inputProps={{"aria-label": "search"}}
                               onChange={(e) => setSearch(e.currentTarget.value)}/>
            </Search>
          </form>
        </Box>

        {!localStorage.getItem("token") ? (
          <Box sx={styles.boxRight}>
            <Button variant="contained" color="warning" sx={styles.button} onClick={signCtx.onSignIn}>
              sign in
            </Button>

            <Button variant="contained" color="warning" sx={styles.button} onClick={signCtx.onSignUp}>
              sign up
            </Button>
          </Box>
        ) : (
          <Box sx={styles.boxRight}>
            <Tooltip title="Open options">
              <IconButton onClick={handleOpenMenu}>
                <Avatar>
                  {localStorage.getItem("username")[0]}
                </Avatar>
              </IconButton>
            </Tooltip>

            <Menu open={!!anchorMenu} onClose={handleCloseMenu} anchorEl={anchorMenu}>
              <MenuItem onClick={toPersonal}>
                <Typography textAlign="center">
                  Personal page
                </Typography>
              </MenuItem>

              <Divider light/>

              <MenuItem onClick={signOut}>
                <Typography textAlign="center" color="red">
                  Sign out
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;

const styles = {
  header: {
  },
  boxLeft: {
    flexGrow: 1,
    display: "flex"
  },
  boxRight: {
    flexGrow: 0,
    display: "flex"
  },
  button: {
    mx: 1,
    my: 2,
    color: "white",
    display: "block"
  }
}

const Search = styled("div")(({theme}) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto"
  }
}));

const SearchIconWrapper = styled("div")(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch"
      }
    }
  }
}));
