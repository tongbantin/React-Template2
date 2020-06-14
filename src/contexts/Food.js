import React, { useState } from "react";
import axios from "axios";

import * as common from "./../components/CommonFunction/common-function";
export const useFoodContext = () => {
  const [FoodList, setFoodList] = useState([]);

  const FoodStore = {
    //State
    FoodList: FoodList,
    //Function
    SearchFoodList: async (param) => {
      let newparam = {
        
      };
      console.log(param);
      let { result } = await common.to(
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${param.i}`)
      );
      if (result && result.data) {
        setFoodList(result.data.drinks);
      } 
    },
  };
  return FoodStore;
};
