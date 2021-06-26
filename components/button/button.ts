import React from 'react';
import {
  createMuiTheme,
  createStyles,
  withStyles,
  makeStyles,
  Theme,
  ThemeProvider,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, yellow, teal, purple } from '@material-ui/core/colors';


const GreenButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(green[600]),
    backgroundColor: green[600],
    '&:hover': {
      backgroundColor: green[800],
    },
  },
}))(Button);

const YellowButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(yellow[700]),
    backgroundColor: yellow[700],
    '&:hover': {
      backgroundColor: yellow[800],
    },
  },
}))(Button);

const TealButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(teal[400]),
    backgroundColor: teal[400],
    '&:hover': {
      backgroundColor: teal[600],
    },
  },
}))(Button);

const PurpleButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[400]),
    backgroundColor: purple[400],
    '&:hover': {
      backgroundColor: purple[500],
    },
  },
}))(Button);

export {
  GreenButton,
  YellowButton,
  TealButton,
  PurpleButton,
}