import { createSelector } from 'reselect';

export const addonSelector = createSelector(
  (state) => state.board,
  (board) => board.addon,
);
