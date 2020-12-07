import { createSelector } from 'reselect';

export const addonSelector = createSelector(
  (state) => state.board,
  (board) => board.addon,
);

export const boardDataSelector = createSelector(
  (state) => state.board,
  (board) => board.boardData
)
