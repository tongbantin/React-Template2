//library
import React, { useState,useContext, useEffect } from "react";
import { useForm, FormContext, useFormContext } from "react-hook-form";
import * as yup from "yup";
import { Box, Paper } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Typography from "@material-ui/core/Typography";
import {
  Button,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  InputLabel,
  FormControl,
  Input,
} from "@material-ui/core/";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
//component
import { CustomStepper, HorizontalLinearStepper } from "./../UI/Stepper";
import { DetailBox2 } from "./../UI/DetailBox";
import * as combo  from "./../UI/combobox/Combo";
//store
import { StoreContext } from "../../contexts/context";
import { AccountContext } from "../../contexts/account";
import * as common from "./../CommonFunction/common-function";
import { top100Films } from "./../../store/mockData";
const accountSchema = yup.object().shape({
  cardName: yup.string().required("This field is required."),
});
export function Form() {
  const PaymentForm = useForm({ validationSchema: accountSchema });
  useEffect(() => {
    PaymentForm.register({name:'Year'})
    PaymentForm.register({name:'Movie'})
  })
  return (
    <DetailBox2>
      <FormContext {...PaymentForm}>
        <form onSubmit={PaymentForm.handleSubmit(console.log)} noValidate>
          <PaymentFormDetail />
          <Button type="submit">Save</Button>
        </form>
      </FormContext>
    </DetailBox2>
  );
}
export function PaymentFormDetail() {
  const Account = useContext(AccountContext);
  const { register, errors, setValue } = useFormContext();
  const [dataItems, setdataItems] = useState({Movie:'The Godfather',Year:'1993'})
  useEffect(() => {
    setValue([
      { Movie:'The Godfather', },
      { Year:'1993', },
    ])
  },[])
  useEffect(() => {
    setValue(common.setDataToFormHook(Account.account[0]));
  }, [Account.account[0]]);
  const setValueUncontrol=(name,value)=>{
    console.log(name,value)
    setValue(name, value)
    setdataItems({...dataItems,[name]:value})
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="cardName"
            label="Name on card"
            fullWidth
            inputRef={register}
            error={!!errors.cardName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <combo.Year name='Year' value={dataItems.Year} onChange={setValueUncontrol}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <combo.Movie name='Movie' value={dataItems.Movie} onChange={setValueUncontrol}  />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="cardNumber"
            label="Card number"
            fullWidth
            inputRef={register}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="expDate" label="Expiry date" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
