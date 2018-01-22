let localStorageProp = "";

const saveState = state => {
  try {
    return sessionStorage.setItem(localStorageProp, JSON.stringify(state));
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const gatorade = store => next => action => {
  const result = next(action);
  // console.log("saved state", store.getState());
  saveState(store.getState());
  return result;
};

export const hydrateState = prop => {
  localStorageProp = prop || "appseed-store";
  try {
    const serializedState = sessionStorage.getItem(localStorageProp);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
