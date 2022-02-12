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
interface Props {
  opened: boolean;
  onClose?: () => void;
}

export default function Menu(props: Props) {
  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <Typography align="center" variant="h5" mt={2} mb={2}>
        LOGO AQUI
      </Typography>
      <Divider />
      <List>
        <ListItem button key={"cadastrar_paciente"}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Paciente" />
        </ListItem>
        <ListItem button key={"cadastrar_atendente"}>
          <ListItemIcon>
            <ComputerIcon />
          </ListItemIcon>
          <ListItemText primary="Atendente" />
        </ListItem>
        <ListItem button key={"cadastrar_medico"}>
          <ListItemIcon>
            <HealthAndSafetyIcon />
          </ListItemIcon>
          <ListItemText primary="Medico" />
        </ListItem>
        <ListItem button key={"local_atendimento"}>
          <ListItemIcon>
            <PlaceIcon />
          </ListItemIcon>
          <ListItemText primary="Local de Atendimento" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key={"agenda"}>
          <ListItemIcon>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary="Agenda" />
        </ListItem>
        <ListItem button key={"config"}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Configurações" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Drawer anchor={"left"} open={props.opened} onClose={props.onClose}>
      {list()}
    </Drawer>
  );
}
