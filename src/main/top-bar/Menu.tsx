import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import PlaceIcon from "@mui/icons-material/Place";
import SettingsIcon from "@mui/icons-material/Settings";
import ComputerIcon from "@mui/icons-material/Computer";
import { NavigateOptions, To, useNavigate } from "react-router-dom";
interface Props {
  opened: boolean;
  onClose?: () => void;
}

const menuItemsCrud = [
  {
    key: "paciente",
    route: "/paciente",
    icon: <PersonIcon />,
    text: "Paciente",
  },
  {
    key: "atendente",
    route: "/atendente",
    icon: <ComputerIcon />,
    text: "Atendente",
  },
  {
    key: "medico",
    route: "/medico",
    icon: <HealthAndSafetyIcon />,
    text: "Médico",
  },
  {
    key: "local_atendimento",
    route: "/local-atendimento",
    icon: <PlaceIcon />,
    text: "Local de Atendimento",
  },
];

const menuItemsOperations = [
  {
    key: "agenda",
    route: "/agenda",
    icon: <CalendarTodayIcon />,
    text: "Agenda",
  },
  {
    key: "config",
    route: "/config",
    icon: <SettingsIcon />,
    text: "Configurações",
  },
];

export default function Menu(props: Props) {
  const navigate = useNavigate();

  const menuNavigate = (to: To, options?: NavigateOptions | undefined) => {
    navigate(to, options);
    props.onClose && props.onClose();
  };

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <Typography align="center" variant="h5" mt={2} mb={2}>
        LOGO AQUI
      </Typography>
      <Divider />
      <List>
        {menuItemsCrud.map((info) => {
          return (
            <ListItem
              button
              key={info.key}
              onClick={() => menuNavigate(info.route)}
            >
              <ListItemIcon>{info.icon}</ListItemIcon>
              <ListItemText primary={info.text} />
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List>
        {menuItemsOperations.map((info) => {
          return (
            <ListItem
              button
              key={info.key}
              onClick={() => menuNavigate(info.route)}
            >
              <ListItemIcon>{info.icon}</ListItemIcon>
              <ListItemText primary={info.text} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Drawer anchor={"left"} open={props.opened} onClose={props.onClose}>
      {list()}
    </Drawer>
  );
}
