import { createSelector } from 'reselect';

const selectDirectry = state => state.directory;

export const selectDirectorySections = createSelector(
  [selectDirectry],
  directory => directory.sections
);