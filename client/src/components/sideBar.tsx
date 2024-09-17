import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Avatar,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SideBar() {
  const [open, setOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  const handleClick = () => {
    setOpen(!open);
  };

  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const handleNavigation = (href: string) => {
    router.push(href);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const drawerContent = (
    <>
      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar sx={{ bgcolor: "grey.500" }}>M</Avatar>
        <Box>
          <Typography variant="subtitle2">Makayla</Typography>
          <Typography variant="caption" color="text.secondary">
            TELKOM INTERNASI...
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            Staff Pengadaan I
          </Typography>
        </Box>
      </Box>
      <List>
        <ListItem onClick={() => handleNavigation("/dashboard")}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem onClick={handleClick}>
          <ListItemIcon>
            <AdminPanelSettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Admin Management" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/dashboard/user")}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="User" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          edge="start"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 1200,
            color: "black",
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
