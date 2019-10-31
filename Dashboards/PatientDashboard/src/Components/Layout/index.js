import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
  AppBar, Toolbar, IconButton, Typography, Hidden,
  Drawer, CssBaseline, MenuList, MenuItem
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Menu } from '@material-ui/icons'
import { compose } from 'recompose'
import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 240
const drawerHeigth = 400

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 100,
    padding: '0 30px',
  },
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',

    
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    // [theme.breakpoints.up('md')]: {
    //   position: 'relative',
    // },
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
})

class Layout extends Component {
  state = {
    mobileOpen: false
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  render() {
    const { classes, location: { pathname }, children, writers } = this.props
    const { mobileOpen } = this.state
    const drawer = (
      <div>
        <Hidden smDown>
          <div className={classes.toolbar} />
        </Hidden>
        <MenuList>
          <MenuItem component={Link} to="/" selected={'/' === pathname}>
            View Doctor Consulted
          </MenuItem>
          <MenuItem component={Link} to="/orders" selected={'/' === pathname}>
            View Diagnosis
          </MenuItem>
          <MenuItem component={Link} to="/writers" selected={'/writers' === pathname}>
            View Prescription 
          </MenuItem>
        </MenuList>
      </div>
    )

    return <Fragment>
      <CssBaseline/>

      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Patient Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}

          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    </Fragment>
  }
}

export default compose(
  withRouter,
  withStyles(styles)
)(Layout)
