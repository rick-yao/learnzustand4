const createStoreImpl = (createState) => {
  // declare state , TODO is this  closure?
  let state;
  const listeners = /* @__PURE__ */ new Set();
  // declare all useful funcs that createState would use : setState, getState , api
  // setState: partial means the part of storeObj , replace is a boolean that determine if you replace the whole store
  const setState = (partial, replace) => {
    // sometimes we pass a mutate func rather than a target obj
    const nextState = typeof partial === "function" ? partial(state) : partial;
    // whether nextState and state is same in memory address , often not same
    // if not same
    if (!Object.is(nextState, state)) {
      const previousState = state;
      // if replace is not provided & nextState is not an obj , then clone state and nextState to a new obj
      // if replace is not provided & nextState is an obj , then return nextState
      // change state to new one
      state = (replace != null ? replace : typeof nextState !== "object")
        ? nextState
        : Object.assign({}, state, nextState);
      // after the operation , exec listeners according to order
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  // just return current state
  const getState = () => state;
  // listeners could be added through subscribe
  // returned func could be used to unsubscribe
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  //clear all listeners
  const destroy = () => {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected.",
      );
    }
    listeners.clear();
  };
  // return api obj
  const api = { setState, getState, subscribe, destroy };
  // initialize state
  state = createState(setState, getState, api);
  return api;
};
// this is the api in index.js , createState is a func that contains set & get
const createStore = (createState) =>
  createState ? createStoreImpl(createState) : createStoreImpl;
var vanilla = (createState) => {
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "[DEPRECATED] Default export is deprecated. Instead use import { createStore } from 'zustand/vanilla'.",
    );
  }
  return createStore(createState);
};

export { createStore, vanilla as default };
