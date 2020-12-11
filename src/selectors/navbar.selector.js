import { createSelector } from 'reselect';

export const treeProjectSelector = createSelector(
  (state) => state.navbar,
  (navbar) => navbar.treeProject
)
