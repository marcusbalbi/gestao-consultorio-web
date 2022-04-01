import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const AppBreadScrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const renderLinks = () => {
    const items = location.pathname
      .split("/")
      .slice(1)
      .filter((i) => isNaN(parseInt(i)));

    if (items.length > 0) {
      return items.map((i, pos) => {
        if (pos === items.length - 1) {
          return (
            <Typography key={i} color="text.primary">
              {i}
            </Typography>
          );
        }
        return (
          <Link
            href="#"
            underline="hover"
            color="inherit"
            key={i}
            onClick={() => {
              navigate(`/${i}`);
            }}
          >
            {i}
          </Link>
        );
      });
    }
  };

  return (
    <Breadcrumbs
      sx={{
        ml: (theme) => theme.spacing(2),
        mt: (theme) => theme.spacing(2),
        fontSize: 16,
      }}
      aria-label="breadcrumb"
    >
      <Link
        href="#"
        underline="hover"
        color="inherit"
        onClick={() => {
          navigate(`/`);
        }}
      >
        Home
      </Link>
      {renderLinks()}
    </Breadcrumbs>
  );
};

export { AppBreadScrumb };
