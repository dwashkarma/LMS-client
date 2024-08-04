"use client";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "../images/Dlogo.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";

const options = [
  "None",
  "Atria",
  "Callisto",
  "Dione",
  "Ganymede",
  "Hangouts Call",
  "Luna",
  "Oberon",
  "Phobos",
  "Pyxis",
  "Sedna",
  "Titania",
  "Triton",
  "Umbriel",
];

const ITEM_HEIGHT = 48;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "55ch",
    },
  },
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "flex",
  },
}));
{
  /*for the signout  */
}
interface NavBarProps {
  session: any;
  signOut: () => void;
}
const Navbar: React.FC<NavBarProps> = ({ signOut, session }) => {
  const [image, setImage] = useState<string>("");
  useEffect(() => {
    setImage(session?.user?.image);
  }, [session]);
  {
    /*Ending  logic of signout  */
  }

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuClick = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleMenuButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className="flex justify-around items-center p-4  text-slate-600">
        <MenuButton color="inherit" aria-label="menu" onClick={handleMenuClick}>
          <MenuIcon />
        </MenuButton>
        <div className="flex gap-10 items-center">
          <div className="flex items-center gap-4">
            <Image
              className="rounded-full"
              src={image}
              alt="ProfileImage"
              height={80}
              width={40}
            />
            <h2>{session?.user?.email}</h2>
          </div>
          <div>
            <Button
              aria-label="categories"
              id="categories-button"
              aria-controls={menuOpen ? "categories-menu" : undefined}
              aria-expanded={menuOpen ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleMenuButtonClick}
              color="inherit"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              Categories
            </Button>
            <Menu
              id="categories-menu"
              MenuListProps={{
                "aria-labelledby": "categories-button",
              }}
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
            >
              {options.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === "Pyxis"}
                  onClick={handleMenuClose}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
        <div className="flex items-center">
          <TextField
            type="text"
            name="search"
            label="search"
            placeholder="Search"
          />
        </div>
        <div>
          <button
            className="bg-green-700 text-white p-2 hover:bg-green-800 rounded-md hover:shadow-lg"
            onClick={signOut}
          >
            Sign Out
          </button>
        </div>
      </div>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleDrawerClose}
          onKeyDown={handleDrawerClose}
        >
          {/* code for the responsive or repsonsive for the small sizes*/}
          <List>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "block", sm: "block" },
                width: 100, // Adjust width as needed
                height: "auto", // Maintain aspect ratio
              }}
            >
              <Image
                className="rounded-full"
                src={image}
                alt="ProfileImage"
                height={80}
                width={40}
              />
              <h2>{session?.user?.email}</h2>
            </Box>
            <ListItem button onClick={signOut}>
              <ListItemText primary="Sign Out" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText
                primary="Categories"
                onClick={handleMenuButtonClick}
              />
            </ListItem>
            <ListItem>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default Navbar;
