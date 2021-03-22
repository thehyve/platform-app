import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withStyles } from '@material-ui/core/styles';
import { faStar } from '@fortawesome/free-regular-svg-icons';

import Link from './Link';
import EmailLink from './EmailLink';

const styles = theme => ({
  footer: {
    backgroundColor: theme.palette.footer,
    color: '#fff',
    margin: 0,
    width: '100%',
    padding: 24,
  },
});

const linkStyles = () => ({
  iconClass: {
    marginRight: '10px',
  },
  linkContainer: {
    marginBottom: '8px',
  },
});

let FooterLink = ({ label, url, classes, icon }) => (
  <Grid item xs={12} className={classes.linkContainer}>
    <Typography color="inherit">
      {url.startsWith('mailto') ? (
        <EmailLink href={url} label={label} icon={icon} />
      ) : (
        <Link external footer to={url}>
          {icon && (
            <FontAwesomeIcon className={classes.iconClass} icon={icon} />
          )}
          {label}
        </Link>
      )}
    </Typography>
  </Grid>
);

FooterLink = withStyles(linkStyles)(FooterLink);

const FooterSectionHeading = ({ children }) => (
  <Grid item xs={12}>
    <Typography variant="h6" color="inherit">
      {children}
    </Typography>
  </Grid>
);

const socialLinkStyle = () => ({
  iconsContainer: {
    maxWidth: '235px',
  },
  socialIcon: {
    fontSize: '30px',
    color: 'white',
  },
});

let FooterSocial = ({ social, classes }) => (
  <Fragment>
    <FooterSectionHeading>Follow us</FooterSectionHeading>
    <Grid className={classes.iconsContainer} container justify="space-between">
      {social.map(({ iconClasses, url }, i) => (
        <Grid item key={i}>
          <Link external footer to={url}>
            <FontAwesomeIcon
              className={iconClasses + ' ' + classes.socialIcon}
              icon={faStar}
            />
          </Link>
        </Grid>
      ))}
    </Grid>
  </Fragment>
);

FooterSocial = withStyles(socialLinkStyle)(FooterSocial);

const FooterSection = ({ heading, links, social }) => (
  <Grid
    item
    xs={12}
    sm={6}
    md={3}
    container
    direction="column"
    justify="space-between"
  >
    <Grid item>
      <FooterSectionHeading>{heading}</FooterSectionHeading>
      {links.map((link, i) => (
        <FooterLink
          key={i}
          label={link.label}
          url={link.url}
          icon={link.icon}
        />
      ))}
    </Grid>

    {social ? (
      <Grid item>
        <FooterSocial social={social} />
      </Grid>
    ) : null}
  </Grid>
);

const Footer = ({ classes, externalLinks }) => (
  <Grid className={classes.footer} container justify="center" spacing={3}>
    <Grid item container xs={12} md={10} spacing={2}>
      <FooterSection heading="About" links={externalLinks.about} />
      <FooterSection
        heading="Help"
        links={externalLinks.help}
        social={externalLinks.social}
      />
      <FooterSection heading="Partners" links={externalLinks.partners} />
      <FooterSection heading="Open Targets" links={externalLinks.network} />
    </Grid>
  </Grid>
);

export default withStyles(styles)(Footer);
