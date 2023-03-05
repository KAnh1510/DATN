import { createSlice } from "@reduxjs/toolkit";

export const CategorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: {
      allCategories: [],
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getCategoriesStart: (state) => {
      state.categories.isFetching = true;
    },
    getCategoriesSuccess: (state, action) => {
      state.categories.allCategories = action.payload;
    },
    getCategoriesFailed: (state) => {
      state.categories.error = true;
      state.categories.isFetching = false;
    },
  },
});

export const { getCategoriesFailed, getCategoriesStart, getCategoriesSuccess } =
  CategorySlice.actions;
export default CategorySlice.reducer;
