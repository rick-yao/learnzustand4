import { createStore } from "zustand/vanilla";
export * from "zustand/vanilla";
import { useDebugValue } from "react";
import useSyncExternalStoreExports from "use-sync-external-store/shim/with-selector.js";

const { useSyncExternalStoreWithSelector } = useSyncExternalStoreExports;
function useStore(api, selector = api.getState, equalityFn) {
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getState,
    selector,
    equalityFn,
  );
  useDebugValue(slice);
  return slice;
}

// this is what create(createState) returned
const createImpl = (createState) => {
  // some warning , pass
  if (
    process.env.NODE_ENV !== "production" &&
    typeof createState !== "function"
  ) {
    console.warn(
      "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.",
    );
  }
  // if you pass a func , then pass the func to createStore, otherwise return createState
  // consider func is passed , because we always want to use set & get func in store func
  const api =
    typeof createState === "function" ? createStore(createState) : createState;
  const useBoundStore = (selector, equalityFn) =>
    // key to not use provider , this takes advantages of useSyncExternalStore of react
    // check out for more
    // https://react.dev/reference/react/useSyncExternalStore
    useStore(api, selector, equalityFn);
  // use assign the api method to useBoundStore
  Object.assign(useBoundStore, api);
  return useBoundStore;
};

// start here , consider createState is passed to the func , another situation is for ts
const create = (createState) =>
  createState ? createImpl(createState) : createImpl;
var react = (createState) => {
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "[DEPRECATED] Default export is deprecated. Instead use `import { create } from 'zustand'`.",
    );
  }
  return create(createState);
};

export { create, react as default, useStore };
