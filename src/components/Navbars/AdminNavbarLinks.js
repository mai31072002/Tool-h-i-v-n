import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/weatherplus-admin/components/adminNavbarLinksStyle.js";

import { Person } from "@material-ui/icons/";
import {
  MenuItem,
  MenuList,
  ClickAwayListener,
  Paper,
  Grow,
  Hidden,
  Popper,
  Divider,
} from "@material-ui/core";

import Button from "components/CustomButtons/Button.js";

const useStyles = makeStyles(styles);

const HeaderLinks = ({ rtlActive = false }) => {
  const [openProfile, setOpenProfile] = useState(null);
  const history = useHistory();

  const handleClickProfile = useCallback(
    (event) => {
      if (openProfile && openProfile.contains(event.target)) {
        setOpenProfile(null);
      } else {
        setOpenProfile(event.currentTarget);
      }
    },
    [openProfile]
  );

  const classes = useStyles();

  const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover, {
    [classes.dropdownItemRTL]: rtlActive,
  });
  const wrapper = classNames({ [classes.wrapperRTL]: rtlActive });
  const managerClasses = classNames({ [classes.managerClasses]: true });

  return (
    <div className={wrapper}>
      <div className={managerClasses}>
        <Button
          color="transparent"
          aria-label="Person"
          justIcon
          aria-owns={openProfile ? "profile-menu-list" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
          muiClasses={{ label: "" }}
        >
          <Person className={`${classes.headerLinksSvg} ${classes.links}`} />
          <Hidden mdUp implementation="css">
            <span onClick={handleClickProfile} className={classes.linkText}>
              Profile
            </span>
          </Hidden>
        </Button>
        <Popper
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          placement="bottom"
          className={classNames({
            [classes.popperClose]: !openProfile,
            [classes.popperResponsive]: true,
            [classes.popperNav]: true,
          })}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list"
              style={{ transformOrigin: "0 0 0" }}
            >
              <Paper className={classes.dropdown}>
                <ClickAwayListener onClickAway={() => setOpenProfile(null)}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={() => {
                        history.push("/profile");
                        setOpenProfile(null);
                      }}
                      className={dropdownItem}
                    >
                      Profile
                    </MenuItem>
                    <Divider light />
                    <MenuItem
                      onClick={() => history.replace("/auth/logout")}
                      className={dropdownItem}
                    >
                      Log out
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
};

export default HeaderLinks;
