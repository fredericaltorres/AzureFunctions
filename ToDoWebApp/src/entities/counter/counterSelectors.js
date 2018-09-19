import { localizer } from "@emoney/redux-utils";
import { prefixPath } from "./counterConstants";

export const selectCountLocal = localState => localState.count;
export const selectIsIncrementingLocal = localState => localState.isIncrementing;
export const selectIsDecrementingLocal = localState => localState.isDecrementing;

export const selectCount = localizer(selectCountLocal, prefixPath);
export const selectIsIncrementing = localizer(selectIsIncrementingLocal, prefixPath);
export const selectIsDecrementing = localizer(selectIsDecrementingLocal, prefixPath);

