import React, { useEffect, useState } from 'react';
import * as common from './../../CommonFunction/common-function'
import Autocomplete from "@material-ui/lab/Autocomplete";
import Typography from "@material-ui/core/Typography";
import { top100Films, user } from "./../../../store/mockData";
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
const onChangeAutoComplete = (name,setvalue,value,field)=>{
    if (common.isFunction(setvalue)){
        if(value&&value[field]){
            setvalue(name,value[field])
        }
    }
    

}
export const Movie = ({onChange,criteria,error,value,...rest})=>{
    const [movielst ,setMovielst] = useState(top100Films);
    useEffect(() => {
        
        if(!common.isEmpty(criteria)){
            console.log(criteria,top100Films.filter(el=>el.year==criteria.year))
            setMovielst(top100Films.filter(el=>el.year===criteria.year))
        }
        else{
            setMovielst(top100Films)
        }
         
    }, [criteria])
    return(
        <>
        {console.log(movielst,movielst.find(option=>option.title=== value))}
        <Autocomplete
            {...rest}
            options={movielst}
            value={movielst.find(option=>option.title=== value)}
            onChange={(e,value)=>onChangeAutoComplete(rest.name,onChange,value,'title')}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField {...params} label="Movie" error={error} fullWidth />
            )}
          />
        </>
    )

}

export const Year = ({onChange,criteria,error,value,...rest})=>{
    const [lst ,setlst] = useState([{title:'1993'},{title:'1994'},{title:'1995'},{title:'1996'},{title:'1997'}]);

    return(
        <>
        <Autocomplete
            {...rest}
            options={lst}
            value={lst.find(option=>option.title=== value)}
            onChange={(e,value)=>onChangeAutoComplete(rest.name,onChange,value,'title')}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField {...params} label="Year" error={error} fullWidth />
            )}
          />
        </>
    )

}