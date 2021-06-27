import { createContext, useContext, useReducer } from 'react';
import { SET_EDITING_STATUS, editingReducer } from 'context/reducers';

const StoreContext = createContext(null);

const StoreProvider = (props) => {
    const [storeState, storeDispatch] = useReducer(
        editingReducer,
        useContext(StoreContext)
    );

    const updateStoreEditingStatus = (editingInfo) => {
        setTimeout(() => {
            storeDispatch({
                type: SET_EDITING_STATUS,
                editingInfo: editingInfo,
            });
        }, 1);
        return;
    };

    return (
        <StoreContext.Provider
            value={{
                updateStoreEditingStatus,
                store: storeState,
            }}
        >
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;
export { StoreContext };
