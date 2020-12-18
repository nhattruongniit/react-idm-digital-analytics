import { createSelector } from 'reselect';

export const isExpandDrawerSelector = createSelector(
  (state) => state.app,
  (app) => app.isExpandDrawer,
);

export const isLoadingSelector = createSelector(
  (state) => state.app,
  (app) => app.isLoading,
);

export const layoutTypeSelector = createSelector(
  (state) => state.app,
  (app) => app.layoutType,
);
