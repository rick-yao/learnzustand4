System.register([],function(b){"use strict";return{execute:function(){b("createJSONStorage",E);const j=b("redux",(d,c)=>(a,r,o)=>(o.dispatch=e=>(a(v=>d(v,e),!1,e),e),o.dispatchFromDevtools=!0,{dispatch:(...e)=>o.dispatch(...e),...c})),I=new Map,w=d=>{const c=I.get(d);return c?Object.fromEntries(Object.entries(c.stores).map(([a,r])=>[a,r.getState()])):{}},T=(d,c,a)=>{if(d===void 0)return{type:"untracked",connection:c.connect(a)};const r=I.get(a.name);if(r)return{type:"tracked",store:d,...r};const o={connection:c.connect(a),stores:{}};return I.set(a.name,o),{type:"tracked",store:d,...o}},P=b("devtools",(d,c={})=>(a,r,o)=>{const{enabled:e,anonymousActionType:v,store:u,...h}=c;let m;try{m=(e!=null?e:!1)&&window.__REDUX_DEVTOOLS_EXTENSION__}catch{}if(!m)return d(a,r,o);const{connection:l,...y}=T(u,m,h);let f=!0;o.setState=(n,s,i)=>{const t=a(n,s);if(!f)return t;const p=i===void 0?{type:v||"anonymous"}:typeof i=="string"?{type:i}:i;return u===void 0?(l==null||l.send(p,r()),t):(l==null||l.send({...p,type:`${u}/${p.type}`},{...w(h.name),[u]:o.getState()}),t)};const g=(...n)=>{const s=f;f=!1,a(...n),f=s},S=d(o.setState,r,o);if(y.type==="untracked"?l==null||l.init(S):(y.stores[y.store]=o,l==null||l.init(Object.fromEntries(Object.entries(y.stores).map(([n,s])=>[n,n===y.store?S:s.getState()])))),o.dispatchFromDevtools&&typeof o.dispatch=="function"){const n=o.dispatch;o.dispatch=(...s)=>{n(...s)}}return l.subscribe(n=>{var s;switch(n.type){case"ACTION":if(typeof n.payload!="string"){console.error("[zustand devtools middleware] Unsupported action format");return}return _(n.payload,i=>{if(i.type==="__setState"){if(u===void 0){g(i.state);return}Object.keys(i.state).length!==1&&console.error(`
                    [zustand devtools middleware] Unsupported __setState action format. 
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `);const t=i.state[u];if(t==null)return;JSON.stringify(o.getState())!==JSON.stringify(t)&&g(t);return}o.dispatchFromDevtools&&typeof o.dispatch=="function"&&o.dispatch(i)});case"DISPATCH":switch(n.payload.type){case"RESET":return g(S),u===void 0?l==null?void 0:l.init(o.getState()):l==null?void 0:l.init(w(h.name));case"COMMIT":if(u===void 0){l==null||l.init(o.getState());return}return l==null?void 0:l.init(w(h.name));case"ROLLBACK":return _(n.state,i=>{if(u===void 0){g(i),l==null||l.init(o.getState());return}g(i[u]),l==null||l.init(w(h.name))});case"JUMP_TO_STATE":case"JUMP_TO_ACTION":return _(n.state,i=>{if(u===void 0){g(i);return}JSON.stringify(o.getState())!==JSON.stringify(i[u])&&g(i[u])});case"IMPORT_STATE":{const{nextLiftedState:i}=n.payload,t=(s=i.computedStates.slice(-1)[0])==null?void 0:s.state;if(!t)return;g(u===void 0?t:t[u]),l==null||l.send(null,i);return}case"PAUSE_RECORDING":return f=!f}return}}),S}),_=(d,c)=>{let a;try{a=JSON.parse(d)}catch(r){console.error("[zustand devtools middleware] Could not parse the received json",r)}a!==void 0&&c(a)},k=b("subscribeWithSelector",d=>(c,a,r)=>{const o=r.subscribe;return r.subscribe=(e,v,u)=>{let h=e;if(v){const m=(u==null?void 0:u.equalityFn)||Object.is;let l=e(r.getState());h=y=>{const f=e(y);if(!m(l,f)){const g=l;v(l=f,g)}},u!=null&&u.fireImmediately&&v(l,l)}return o(h)},d(c,a,r)}),H=b("combine",(d,c)=>(...a)=>Object.assign({},d,c(...a)));function E(d){let c;try{c=d()}catch{return}return{getItem:a=>{var r;const o=v=>v===null?null:JSON.parse(v),e=(r=c.getItem(a))!=null?r:null;return e instanceof Promise?e.then(o):o(e)},setItem:(a,r)=>c.setItem(a,JSON.stringify(r)),removeItem:a=>c.removeItem(a)}}const O=d=>c=>{try{const a=d(c);return a instanceof Promise?a:{then(r){return O(r)(a)},catch(r){return this}}}catch(a){return{then(r){return this},catch(r){return O(r)(a)}}}},N=(d,c)=>(a,r,o)=>{let e={getStorage:()=>localStorage,serialize:JSON.stringify,deserialize:JSON.parse,partialize:s=>s,version:0,merge:(s,i)=>({...i,...s}),...c},v=!1;const u=new Set,h=new Set;let m;try{m=e.getStorage()}catch{}if(!m)return d((...s)=>{console.warn(`[zustand persist middleware] Unable to update item '${e.name}', the given storage is currently unavailable.`),a(...s)},r,o);const l=O(e.serialize),y=()=>{const s=e.partialize({...r()});let i;const t=l({state:s,version:e.version}).then(p=>m.setItem(e.name,p)).catch(p=>{i=p});if(i)throw i;return t},f=o.setState;o.setState=(s,i)=>{f(s,i),y()};const g=d((...s)=>{a(...s),y()},r,o);let S;const n=()=>{var s;if(!m)return;v=!1,u.forEach(t=>t(r()));const i=((s=e.onRehydrateStorage)==null?void 0:s.call(e,r()))||void 0;return O(m.getItem.bind(m))(e.name).then(t=>{if(t)return e.deserialize(t)}).then(t=>{if(t)if(typeof t.version=="number"&&t.version!==e.version){if(e.migrate)return e.migrate(t.state,t.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return t.state}).then(t=>{var p;return S=e.merge(t,(p=r())!=null?p:g),a(S,!0),y()}).then(()=>{i==null||i(S,void 0),v=!0,h.forEach(t=>t(S))}).catch(t=>{i==null||i(void 0,t)})};return o.persist={setOptions:s=>{e={...e,...s},s.getStorage&&(m=s.getStorage())},clearStorage:()=>{m==null||m.removeItem(e.name)},getOptions:()=>e,rehydrate:()=>n(),hasHydrated:()=>v,onHydrate:s=>(u.add(s),()=>{u.delete(s)}),onFinishHydration:s=>(h.add(s),()=>{h.delete(s)})},n(),S||g},z=(d,c)=>(a,r,o)=>{let e={storage:E(()=>localStorage),partialize:n=>n,version:0,merge:(n,s)=>({...s,...n}),...c},v=!1;const u=new Set,h=new Set;let m=e.storage;if(!m)return d((...n)=>{console.warn(`[zustand persist middleware] Unable to update item '${e.name}', the given storage is currently unavailable.`),a(...n)},r,o);const l=()=>{const n=e.partialize({...r()});return m.setItem(e.name,{state:n,version:e.version})},y=o.setState;o.setState=(n,s)=>{y(n,s),l()};const f=d((...n)=>{a(...n),l()},r,o);let g;const S=()=>{var n,s;if(!m)return;v=!1,u.forEach(t=>{var p;return t((p=r())!=null?p:f)});const i=((s=e.onRehydrateStorage)==null?void 0:s.call(e,(n=r())!=null?n:f))||void 0;return O(m.getItem.bind(m))(e.name).then(t=>{if(t)if(typeof t.version=="number"&&t.version!==e.version){if(e.migrate)return e.migrate(t.state,t.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return t.state}).then(t=>{var p;return g=e.merge(t,(p=r())!=null?p:f),a(g,!0),l()}).then(()=>{i==null||i(g,void 0),g=r(),v=!0,h.forEach(t=>t(g))}).catch(t=>{i==null||i(void 0,t)})};return o.persist={setOptions:n=>{e={...e,...n},n.storage&&(m=n.storage)},clearStorage:()=>{m==null||m.removeItem(e.name)},getOptions:()=>e,rehydrate:()=>S(),hasHydrated:()=>v,onHydrate:n=>(u.add(n),()=>{u.delete(n)}),onFinishHydration:n=>(h.add(n),()=>{h.delete(n)})},e.skipHydration||S(),g||f},U=b("persist",(d,c)=>"getStorage"in c||"serialize"in c||"deserialize"in c?N(d,c):z(d,c))}}});
