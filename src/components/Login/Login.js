import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Alert, Label, Input,Card, Button, CardTitle, CardText, } from 'reactstrap';
import {Grid,CssBaseline,makeStyles,Paper} from '@material-ui/core'
import {Avatar,Typography,TextField,FormControlLabel,Checkbox,Box,Link} from '@material-ui/core'
import {FormControl,FormLabel,RadioGroup,Radio} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import '../../assets/css/Login.css';
import { IoMdPerson, IoMdKey } from "react-icons/io";
import Logo from "./../../assets/Logo.png";
import {teal} from '@material-ui/core/colors/'

import { useSelector, useDispatch } from 'react-redux'
import Axios from 'axios'
import * as common from '../CommonFunction/common-function'
import { API_AUTHEN } from '../../store/constants';
const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor:teal[300]
    },
    root: {
        backgroundColor: teal[500]
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      
    },
    form2:{
        backgroundColor:teal[400]
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          TongCS
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
const FormLogin = ()=>{
    const classes = useStyles();
    return(
    <>
     <form>      
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" row>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
            </FormControl>
            <TextField
              variant="outlined"
              margin="normal"
              
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              href="/home"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >Sign In</Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >Register</Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
            </form>
    </>
)}
function Login() {
    const classes = useStyles();
    const [dataItem, setDataItem] = useState({ Username: "default", Password: "" })
    const [isShowIncorrect, setIsShowIncorrect] = useState(false)
    const redirectPage = () => {
        const link = `${window.location.href}dashboard`
        //alert(link)
        window.location.replace(link)
    }
    const IncorrectPass = (flag) => {
        setIsShowIncorrect(flag)
    }
    const login = () => {
        IncorrectPass(false)
        Axios.post(API_AUTHEN, {
            UserId: dataItem.Username,
            Password: dataItem.Password,
            Aud: common.GetAud()
        })
            .then((response) => {
                if (!response) {
                    IncorrectPass(true)
                } else if (response.data) {
                    common.SetUserData(response.data);
                    redirectPage()
                }
            }).catch((error) => {
                common.InformationOKDialog('Login Fail')
            });




    }
    const handleFocus = (event) => event.target.select();
    const handleInputChange = event => {
        const { name, value } = event.target
        setDataItem({ ...dataItem, [name]: value })
        if (event.key === 'Enter') {
            login();
        }

    }
    useEffect(() => {
        setDataItem({ ...dataItem, Username: common.GetUserId() })
    }, [])

    return (
        <>
        <Box display='flex' flexDirection='column' alignItems="center" height={1}  className={classes.background}  >
            <Box  width={1/2} m="auto" className={classes.root}>  
                <Grid container width='50%'>
                    <Grid item xs={false} sm={4} md={7} className={classes.image} />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.form2}>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                TongCS
                            </Typography>
                            <FormLogin/>
                        </div>
                    </Grid>
                </Grid>
                <Box >  
                    Footer
                </Box>
            </Box>
            
        </Box>
        </>
    );
}

export default Login;