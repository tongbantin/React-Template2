//library
import React ,{useContext}from 'react';
import {useForm,FormContext,useFormContext} from "react-hook-form";
import {Box,Paper} from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import {Button,Grid,TextField,Checkbox,FormControlLabel,InputLabel,FormControl,Input} from '@material-ui/core/';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
//component
import {CustomStepper,HorizontalLinearStepper} from './../UI/Stepper'
import {DetailBox2} from './../UI/DetailBox'
//store
import { StoreContext } from '../../contexts/context';
import { AccountContext } from '../../contexts/account';

//Exam Form Step
export  function MyStep (){
  const AddressForm = useForm();
  const PaymentForm = useForm();
  //หัวข้อForm ตรงกับForm ที่มี
  const steps =  ['Select campaign settings', 'Create an ad group', 'Create an ad'];

  //Form ที่ต้องใช้
const getStepContent=(step)=> {
  switch (step) {
    case 0:
      return <AddressFormDetail formProps={AddressForm}/>;
    case 1:
      return <PaymentFormDetail formProps={PaymentForm}/>;
    case 2:
      return <Typography variant="h1" component="h2">
      Finish
    </Typography>;
    default:
      return 'Unknown step';
  }
}

const onSubmit = data => {
  alert('A')
  console.log(data);
}
const onNext=(step)=> {
  switch (step) {
    case 0:
      return AddressForm.handleSubmit(console.log);
      break
    case 1:
      return PaymentForm.handleSubmit(console.log);
      break
    default:
      return 'Unknown step';
  }
}
  
  return(
    <DetailBox2>
  <HorizontalLinearStepper steps={steps} getStepContent={getStepContent} onSubmit={onNext}  >

  </HorizontalLinearStepper>
  </DetailBox2>)
}


//Form ล้วนมีแต่field รับ formProps เพื่อ bind ref
export  function AddressFormDetail( {formProps: { register, errors }}) {
    return (
      <React.Fragment>
          <Grid container spacing={1}>

          <Grid xs={12}  item> 
        <Typography variant="h6" gutterBottom>
          Shipping address
          
        </Typography>
        </Grid>
        <Grid xs={12} sm={5} item>
            <TextField required id="firstName" name="firstName" label="First name" fullWidth autoComplete="fname" inputRef={register}/>
        </Grid>
        <Grid xs={12} sm={5} item>
        <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              inputRef={register}
              fullWidth
              autoComplete="lname"
            />
        </Grid>
        <Grid xs={12} sm={6} item>
        <TextField
              required
              id="address1"
              variant="outlined"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="billing address-line1"
            />
            </Grid>
            <Grid xs={12} sm={6} item>
            <TextField
            variant="outlined"
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="billing address-line2"
            />
            </Grid>
            <Grid xs={12} item>
            <TextField
                variant="outlined"
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="billing address-level2"
            />
            </Grid>
            <Grid xs={12} item>
            <TextField id="state" variant="outlined" name="state" label="State/Province/Region" fullWidth />
            </Grid>
            <Grid xs={12} item>
            <TextField
              required
              variant="outlined"
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="billing postal-code"
            />
            </Grid>
            <Grid xs={12} item>
            <TextField
             variant="outlined"
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="billing country"
            />
            </Grid>
            
           
            
            
           
            <Grid xs={12} item>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
              label="Use this address for payment details"
            />
            </Grid>
            </Grid>
      </React.Fragment>
    );
  }
export  function PaymentFormDetail({formProps: { register, errors }}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required id="cardName" label="Name on card" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="cardNumber" label="Card number" fullWidth />
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
