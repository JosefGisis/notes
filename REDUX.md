## Adopting Redux Toolkit and Redux Toolkit Query

### Why Redux?

-   Global state management for pages
-   Avoid drilling params
-   Persistent state
-   Debugging tools
-   Centralized state management for predictability and easier management

### Why not to use Redux?

-   Lack of directionality
-   Verbosity
-   Performance
-   Overhead
-   Complexity
-   Highly monolithic
-   Does not store serializable values

This is a great resource for Redux https://blog.isquaredsoftware.com/2017/05/idiomatic-redux-tao-of-redux-part-1/
https://redux.js.org/
Link for best redux practices
From https://redux.js.org/faq/general

-   You have large amounts of application state that are needed in many places in the app
-   The app state is updated frequently
-   The logic to update that state may be complex
-   The app has a medium or large-sized codebase, and might be worked on by many people
-   You need to see how that state is being updated over time

### Why Redux instead of Context

We could try to do what Redux does via contexts and reducers but...

-   Providers cause all state to be rerendered when a change occurs.
-   Redux on the other hand only uses context to pass along the store instance, but only notify subscribed components.
-   Redux provides tools for tracking state changes.
-   Providers need to be nested and that results in potential dependency issues and parent providers cannot access child providers.
-   Redux creates a state management system separate the rest of the app which allows to to create a monolithic state management system that is easier to understand and debug and is very flexible

### Why Redux Toolkit?

Redux toolkit is the new and recommended way to use Redux. Reduces boilerplace and adds of bunch of nifty stuff such as:

-   createAsyncThunk: we would use RTKQ
-   createEntityAdapter: Very useful for normalizing data or storing normalized data.
-   createSelector: Create a memoized selector function that can avoid
-   createSlice
-   createReducer: automatically create reducer actions and uses immer under the hook
-   RTK Query See next
-   default middleware
-   action creators with immer

### RTK best practices and suggested usage

-   Do not mutate state.
-   Actions should be pure!
-   Single slice a feature: If you can't it may indicate a flaw with the feature
-   Keep redux state thin!
-   Keep data validation and transformation logic in the reducer
-   Do not create clear action for state. Pass along undefined instead. Use reset where we want to set back to initial state.
-   Keep slice state flat, but use nested properties for easier manipulation.
-   Keep action and state names as specific as possible to avoid having to rename them elsewhere.
-   Immer only works within the createReducer function.
-   When dispatching an action that changes a single property in the state, only change other properties if they must necessarily change. If the other properties do not necessarily change, a separate action should be dispatched.
-   Try using addCase to react to dispatches in other slices IF the change is always necessary. If not, it will lead to confusion.
-   Only abstract a dispatch where there is other logic involved and/or the dispatch is used very frequently. Otherwise it just adds obscurity.
-   Do not use a single hook to abstract a slice (unless the slice has very little in it). If hooks are not task specific all components that use it do a lot of extra processing.
-   Keep selectors small and specific to avoid rerenders where components do not need the extra data
-   Boolean values should start with "is" so that are immediately identified
-   actions should be verbs like set, reset, increment, toggle (I find toggle to never really been useful).
-   Do not worry about comparing prev and current values, redux does that under the hood and will not cause any re-renders if they are deeply equal
-   Rely on dev tools. Check the dispatches to see the series of events.
-   middleware https://redux-toolkit.js.org/rtk-query/usage/polling

### Why Redux Toolkit Query?

Redux Toolkit Query is a data fetching and caching tools built on top of createSlice and createAsyncThunk.

-   RTKQ abstracts data fetching
-   RTKQ handles data caching
-   RTKQ built on top of createSlice and createAsyncThunk so we can respond to queries and mutations within a slice and alter fetched data from the queries/mutations
-   Automatically creates loading/fetching states without having to use createAsyncThunk
-   Automatically creates queries and mutations which provide data and fetching states.
-   Provides a great deal of flexibility in how to manage, cache, and request data.
-   Can store normalized data

### RTKQ best practices and suggested usage.

-   Split up the API into multiple files. An api slice per feature is a good way to go about it.
-   Depend of the data provided by queries. Because requests are deduplicated, we can get data by using getQuery everywhere we need it.
-   You oftentimes do not need to use lazy queries. Lazy queries are often used because there is a perception that without the necessary parameters being available just yet we cannot use a query as React expects all hooks to be called unconditionally. However, you can just provide the params at set skip to false if they are not present. Once the param/s arrive the query will update.

```jsx
import { useGetItemsQuery } from './itemsApi';
import { useSelector } from 'redux-toolkit';
import { selectParams } from './itemsSlice';

export default fuction ItemList() {
  const params = useSelector(() => selectParams());
  const items = useGetItemsQuery(params, { skip: !params });

  //... the rest of your logic
}
```

-   Because we rely on the data provided by queries we can use optimistic updates to instantly update the UI
    We do not need to invalidate tags with optimistic updates
-   debouncing with optimistic updates.
-   Where to use lazy queries
-   pagination
-   Setting state as a side effect of queries and mutations
-   Normalized data
-   Optimized invalidator tags
-   Abstracting queries
-   Caching lazy queries and mutations
-   Matchers
-   Extend the query builder to suit custom needs and transform errors.
-   Middleware for API https://redux-toolkit.js.org/rtk-query/usage/error-handling#handling-errors-at-a-macro-level
-   Automated re-fetching https://redux-toolkit.js.org/rtk-query/usage/polling
-   prefetching https://redux-toolkit.js.org/rtk-query/usage/prefetching
