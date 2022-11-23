import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { LibraryBooks } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import { Person } from "@mui/icons-material";
import { useRouter } from "next/router";

function ResponsiveAppBar({ title }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const router = useRouter();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {title}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                onClick={() => {
                  setAnchorElNav(null);
                  router.push("/dashboard/myBlogs");
                }}
              >
                <Typography textAlign="center">My Blogs</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setAnchorElNav(null);
                  router.push("/dashboard/createBlog");
                }}
              >
                <Typography textAlign="center">Create Blog</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setAnchorElNav(null);
                  router.push("/dashboard/updateProfile");
                }}
              >
                <Typography textAlign="center">Update Profile</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                setAnchorElNav(null);
                router.push("/dashboard/myBlogs");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              My Blogs
            </Button>
            <Button
              onClick={() => {
                setAnchorElNav(null);
                router.push("/dashboard/createBlog");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Create Blog
            </Button>
            <Button
              onClick={() => {
                setAnchorElNav(null);
                router.push("/dashboard/updateProfile");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Update Profile
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0, ml: -4 }}>
            <ListItemButton onClick={() => router.push("/dashboard")}>
              <DashboardIcon sx={{ mr: 1 }} />
            </ListItemButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
