import _ from "lodash";

const userSortCompareFactory = sortKey => (a, b) => {
	const aKey = _.get(a, sortKey);
	const bKey = _.get(b, sortKey);
	if (aKey < bKey) {
		return -1;
	}
	if (aKey > bKey) {
		return 1;
	}

	// names must be equal
	return 0;
};

export const userSorter = (users, sortKey) => {
	if (users && sortKey) {
		const sorter = userSortCompareFactory(sortKey);
		return users.concat().sort(sorter);
	}
	return users;
};
