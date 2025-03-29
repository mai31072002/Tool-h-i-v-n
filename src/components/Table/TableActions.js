import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import { FormControl, MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { ChevronLeft, ChevronRight } from "@material-ui/icons";

import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/weatherplus-admin/views/extendedTablesStyle.js";
import styles1 from "assets/jss/weatherplus-admin/customSelectStyle.js";

import { numberOfRowsData } from "../../variables/tableHeader";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const useStyles = makeStyles({
  ...styles,
  ...styles1,
  formControlMargins: { margin: "0 !important" },
});

const TableActions = ({ type, data, fetching, action }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handlePrevPageClicked = useCallback(() => {
    const page = data.number - 1;
    if (page >= 0) {
      dispatch(action.setDataSearch({ page }));
      dispatch(action.fetch({ type }));
    }
  }, [action, data.number, dispatch, type]);

  const handleNextPageClicked = useCallback(() => {
    const page = data.number + 1;
    if (page <= data.totalPages) {
      dispatch(action.setDataSearch({ page }));
      dispatch(action.fetch({ type }));
    }
  }, [action, data.number, data.totalPages, dispatch, type]);

  const handleChanged = useCallback(
    (evt) => {
      dispatch(
        action.setDataSearch({
          page: 0,
          [evt.target.name]: evt.target.value,
        })
      );
      dispatch(action.fetch({ type }));
    },
    [action, dispatch, type]
  );

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <GridContainer justifyContent="space-between">
      <GridItem xs={12} md={6} xl={8}>
        <GridContainer>
          <GridItem xs={4} lg={2}>
            <Button
              fullWidth
              color="primary"
              size="sm"
              disabled={fetching}
              onClick={handleClickOpen}
            >
              Thêm mới
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Thêm người dùng</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Họ và tên"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="email"
                  label="Email"
                  type="email"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="phone"
                  label="Số điện thoại"
                  type="number"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Huỷ</Button>
                <Button color="primary" onClick={handleClose}>
                  Tạo
                </Button>
              </DialogActions>
            </Dialog>
          </GridItem>
          {/*<GridItem xs={4} lg={2}>*/}
          {/*  <Button*/}
          {/*    fullWidth*/}
          {/*    color="primary"*/}
          {/*    disabled={fetching}*/}
          {/*    size="sm"*/}
          {/*    onClick={handleRefreshClicked}*/}
          {/*  >*/}
          {/*    <Refresh />*/}
          {/*  </Button>*/}
          {/*</GridItem>*/}
        </GridContainer>
      </GridItem>
      <GridItem xs={12} md={6} xl={4}>
        <GridContainer>
          <GridItem xs={2}>
            <Button
              fullWidth
              size="sm"
              color="primary"
              disabled={fetching || data.number === 0}
              onClick={handlePrevPageClicked}
            >
              <ChevronLeft />
            </Button>
          </GridItem>
          <GridItem xs={4}>
            <FormControl
              fullWidth
              className={`${classes.selectFormControl} ${classes.formControlMargins}`}
            >
              <Select
                MenuProps={{ className: classes.selectMenu }}
                classes={{ select: classes.select }}
                value={data.number || 0}
                inputProps={{ name: "page" }}
                onChange={handleChanged}
              >
                {Array.from(Array(data.totalPages).keys()).map((p) => (
                  <MenuItem
                    key={p}
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected,
                    }}
                    value={p}
                  >
                    Trang {p + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem xs={4}>
            <FormControl
              fullWidth
              className={`${classes.selectFormControl} ${classes.formControlMargins}`}
            >
              <Select
                MenuProps={{ className: classes.selectMenu }}
                classes={{ select: classes.select }}
                value={data.size || 10}
                inputProps={{ name: "size" }}
                onChange={handleChanged}
              >
                {numberOfRowsData.map((prop) => (
                  <MenuItem
                    key={prop}
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected,
                    }}
                    value={prop}
                  >
                    {prop} dòng
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem xs={2}>
            <Button
              fullWidth
              size="sm"
              color="primary"
              disabled={fetching || data.number >= data.totalPages - 1}
              onClick={handleNextPageClicked}
            >
              <ChevronRight />
            </Button>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
};

export default TableActions;
