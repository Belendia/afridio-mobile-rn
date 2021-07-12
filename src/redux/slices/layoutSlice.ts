import { createSlice } from "@reduxjs/toolkit";

type LayoutReducerType = {
  tabBarHeight: number;
};

const initialState: LayoutReducerType = {
  tabBarHeight: 79,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setTabBarHeight: (state, action) => ({
      ...state,
      tabBarHeight: action.payload,
    }),
  },
});

export const { setTabBarHeight } = layoutSlice.actions;

export default layoutSlice.reducer;
