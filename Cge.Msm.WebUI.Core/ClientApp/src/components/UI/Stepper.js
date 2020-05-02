

import React from 'react';
import {Box,Paper} from '@material-ui/core';
import {Stepper,Step,StepLabel} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {Button,Grid,TextField,Checkbox,FormControlLabel,InputLabel,FormControl,Input} from '@material-ui/core/';
//
import * as common from './../CommonFunction/common-function' 
export function HorizontalLinearStepper({steps,getStepContent,onSubmit,...rest}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
 
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };
  
  const handleReset = () => {
    setActiveStep(0);
  };
  const Submit = (e) => {
      e.preventDefault()
    if(activeStep== steps.length - 1 )
        setActiveStep(0)
    else
        handleNext()
        
        onSubmit(activeStep)
  };
  
  return (
    <div >


          <Stepper activeStep={activeStep}>
          {steps&&steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = <Typography variant="caption">Optional</Typography>;
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Box m={1} p={2} spacing={1}>
      <div>
          <form onSubmit={Submit} noValidate>
        <div >{common.isFunction(getStepContent)&& getStepContent(activeStep)}</div>
            <div >
                <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}

                    variant="outlined"
                >
                    Back
                </Button>
                <Button disabled  = {!steps}variant="contained" color="primary" type="submit">
                    {steps && activeStep === steps.length - 1 ? 'Start Over' : 'Next'}
                </Button>
            </div>
        </form>
    </div>
    </Box>

    
</div>
  );
}