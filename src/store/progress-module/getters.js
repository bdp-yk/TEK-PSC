/*
export function someGetter (state) {
}
*/
import _ from "lodash";
import levelData from "../../utils/levels";
export function progressGetter(state) {
  return state.progress;
}
export function successfullSubmissionsGetter(state) {
  return _.sortBy(state.successfullSubmissions, ["addedDate"]).reverse();
}
export function contestSuccessfullSubmissionsGetter(state) {
  return _.sortBy(state.contestSubmissions, ["addedDate"]).reverse();
}
export function levelGetter(state) {
  return levelData.calculateLevel(state.progress.level.totalXP);
}

export function achievementsGetter(state) {
  return state.progress.achievements;
}
