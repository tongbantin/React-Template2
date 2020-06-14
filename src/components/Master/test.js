import React, { useState, useContext, useEffect } from "react";
import { Box, Button, TextField } from "@material-ui/core/";
import { useForm, FormContext, useFormContext } from "react-hook-form";
//Component
import CriteriaBox from "./../UI/CriteriaBox";
import {CommonTable} from './../UI/CommonTables'
//Store
import { StoreContext } from "../../contexts/context";

export function Test() {
  const Account = useContext(StoreContext);

  useEffect(() => {}, []);
  return (
    <div>
      <Food></Food>
    </div>
  );
}
const Food = () => {
  const { food } = useContext(StoreContext);
  const Search = (param) => {
    food.SearchFoodList(param);
  };
  return (
    <Box component="span" m={1}>
      Cocktail List
      <CriteriaBox
        hidden={true}
        hiddenClose={true}
        onSearch={Search}
        AutoSearch
      >
        <CriteriaDetail />
      </CriteriaBox>
      <DrinkTable/>
    </Box>
  );
};
const CriteriaDetail = () => {
  const { register,getValues } = useFormContext();
  const { food } = useContext(StoreContext);
  const onChange =()=>{
    food.SearchFoodList(getValues())
  }
  return (
    <>
      <TextField
        id="outlined-basic"
        inputRef={register}
        onChange={onChange}
        name="i"
        label="name"
        variant="outlined"
      />
    </>
  );
};
const DrinkTable = (props) => {
  const {food} = useContext(StoreContext)
  const onClickCol = {
    onClick: async (e, column, columnIndex, row, rowIndex) => {
      alert(row.id);
    },
  };

  const col = [
    {
      dataField: "idDrink",
      text: "id",
      sort: true,
      events: onClickCol,
    },
    {
      dataField: "strDrink",
      text: "Name",
      sort: true,
     
    },
    {
      dataField: "strAlcoholic",
      text: "isAlcoholic",
      sort: true,
      formatter: (cell, row) => {
        return (
          <>
            {row.strAlcoholic==="Alcoholic" ? "Yes" : "No"}
          </>
        );
      },
    },
    {
      dataField: "strDrinkThumb",
      text: "Image",
      sort: true,
      events: onClickCol,
      formatter: (cell, row) => {
        return (
          <>
            <img src={row.strDrinkThumb} height="100"/>
          </>
        );
      },
    },
  ];
  return(
    <>
      <CommonTable keyField = "id" data = {food.FoodList||[]} columns={col} />
    </>
  )
};
export default Test;
