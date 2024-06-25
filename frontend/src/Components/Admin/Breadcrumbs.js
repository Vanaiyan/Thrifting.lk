import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Determine the second link name
  let secondLinkName = '';
  if (pathnames.length > 1) {
    secondLinkName = capitalizeFirstLetter(pathnames[1]);
  }

  return (
    <div>
      {secondLinkName && (
        <Typography variant="h6" gutterBottom>
          {secondLinkName}
        </Typography>
      )}
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Link component={RouterLink} color="inherit" to="/">
          Home
        </Link>
        {pathnames.slice(1).map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 2).join('/')}`;
          const isLast = index === pathnames.length - 2;
          const displayName = capitalizeFirstLetter(name);
          return isLast ? (
            <Typography color="textPrimary" key={routeTo}>
              {displayName}
            </Typography>
          ) : (
            <Link component={RouterLink} color="inherit" to={routeTo} key={routeTo}>
              {displayName}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
