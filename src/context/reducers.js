export const SET_EDITING_STATUS = 'SET_EDITING_STATUS';

const updateEditingStatus = (editingInfo, storeState) => {
    const updatedStore = { ...storeState };
    return updatedStore;
};

export const editingReducer = (state, action) => {
    switch (action.type) {
        case SET_EDITING_STATUS:
            return updateEditingStatus(action.editingInfo, state);
        default:
            return state;
    }
};
