import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Chart from "./Chart";
import Orders from "./Orders";
import { Logout } from "@mui/icons-material";
import { Snackbar, Alert, Button } from "@mui/material";
import { useRouter } from "next/router";
import { Home } from "@mui/icons-material";
import { removeCookies } from "cookies-next";
import { useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { LibraryBooks } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import { Person } from "@mui/icons-material";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(false);
  const [logout, setLogout] = React.useState(false);
  const router = useRouter();
  const currentUser = useSelector((state) => state.currentUser.thisUser);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const logoutHandler = () => {
    removeCookies("ut");
    router.push("/");
  };

  return (
    <>
      {currentUser && (
        <ThemeProvider theme={mdTheme}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="absolute" open={open}>
              <Toolbar
                sx={{
                  pr: "24px",
                }}
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{
                    marginRight: "36px",
                    ...(open && { display: "none" }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  {currentUser.username}
                </Typography>
                <IconButton
                  color="inherit"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  <Typography component={"p"} sx={{ pr: 0.5 }}>
                    Home
                  </Typography>
                  <Home />
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={() => {
                    setLogout(true);
                  }}
                >
                  <Typography component={"p"} sx={{ pr: 0.5 }}>
                    Logout
                  </Typography>
                  <Logout />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
              <Toolbar
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  px: [1],
                }}
              >
                <IconButton onClick={toggleDrawer}>
                  <ChevronLeftIcon />
                </IconButton>
              </Toolbar>
              <Divider />
              <List component="nav">
                <ListItemButton onClick={() => router.push("/dashboard")}>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton
                  onClick={() => router.push("/dashboard/myBlogs")}
                >
                  <ListItemIcon>
                    <LibraryBooks />
                  </ListItemIcon>
                  <ListItemText primary="My Blogs" />
                </ListItemButton>
                <ListItemButton
                  onClick={() => router.push("/dashboard/createBlog")}
                >
                  <ListItemIcon>
                    <Edit />
                  </ListItemIcon>
                  <ListItemText primary="Create Blog" />
                </ListItemButton>
                <ListItemButton
                  onClick={() => router.push("/dashboard/editUser")}
                >
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText primary="Update Profile" />
                </ListItemButton>
              </List>
            </Drawer>
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
              }}
            >
              <Toolbar />
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  {/* Chart */}
                  <Grid item xs={12}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 240,
                      }}
                    >
                      <Chart />
                    </Paper>
                  </Grid>
                  {/* Recent Orders */}
                  <Grid item xs={12}>
                    <Paper
                      sx={{ p: 2, display: "flex", flexDirection: "column" }}
                    >
                      <Orders />
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
          {logout && (
            <Snackbar open={logout} onClose={() => setLogout(false)}>
              <Alert
                onClose={() => setLogout(false)}
                severity="info"
                sx={{ width: "100%" }}
              >
                <Typography component={"p"}>
                  Are you sure to logout ?
                </Typography>
                <Button
                  variant="contained"
                  className="text-blue-600 hover:text-white"
                  onClick={logoutHandler}
                >
                  yes
                </Button>
              </Alert>
            </Snackbar>
          )}
        </ThemeProvider>
      )}
    </>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
