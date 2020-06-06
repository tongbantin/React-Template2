import { createMuiTheme } from '@material-ui/core/styles';

//For All Web
export const maintheme = createMuiTheme({
    props: {
      // Name of the component ⚛️
      MuiTextField: {
        // The properties to apply
        variant: 'outlined'
        ,size:'small'
      },
    },
  });