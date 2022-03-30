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
import { NavigateOptions, To, useNavigate } from "react-router-dom";
interface Props {
  opened: boolean;
  onClose?: () => void;
}

interface MenuItem {
  key: string,
  route: string,
  icon: JSX.Element,
  text: string,
}

const menuItemsCrud: Array<MenuItem> = [
  {
    key: "paciente",
    route: "/paciente",
    icon: <PersonIcon />,
    text: "Paciente",
  },
  {
    key: "profissional",
    route: "/profissional",
    icon: <HealthAndSafetyIcon />,
    text: "Profissional",
  },
  {
    key: "local_atendimento",
    route: "/local-atendimento",
    icon: <PlaceIcon />,
    text: "Local de Atendimento",
  },
];

const menuItemsOperations: Array<MenuItem> = [
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

  const renderMenuItems = (items: Array<MenuItem>) => {
    return items.map((info) => {
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
    });
  };

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <Typography align="center" variant="h6" mt={2} mb={2}>
        POC TCC PUC Minas
      </Typography>
      <Divider />
      <List>
        {renderMenuItems(menuItemsCrud)}
      </List>
      <Divider />
      <List>
        {renderMenuItems(menuItemsOperations)}
      </List>
    </Box>
  );

  return (
    <Drawer anchor={"left"} open={props.opened} onClose={props.onClose}>
      {list()}
    </Drawer>
  );
}
