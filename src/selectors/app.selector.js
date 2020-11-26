import { createSelector } from 'reselect';

export const isExpandDrawerSelector = createSelector(
  (state) => state.app,
  (app) => app.isExpandDrawer,
);
