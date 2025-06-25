## Adopting Redux Toolkit and Redux Toolkit Query

### Why Redux?

Redux provides global state management that allows us to avoid drilling params, persist state, and create a predictable and controllable state flow.

Redux is not just a large provider: it creates a separate state management system that lives outside your component tree, providing a single source of truth that can be accessed and modified in a controlled manner through actions and reducers.

The Redux debugger also allows us to easily track state changes for quick debugging.

### Why not to use Redux?

-   Lack of directionality:

    > This is arguably the benefit with large and complex applications.

-   Monolithic:

    > As above, this can be a benefit.

-   Verbosity:

    > This is not so much the case anymore with RTK.

-   Complexity

-   Does not store serializable values

### When to use Redux

-   You have large amounts of application state that are needed throughout the app.

-   The app state needs to be preserved across rerenders.

-   State logic is complex and should be handled outside of the component tree.

-   The app has a medium or large-sized codebase is worked on by many people and/or contains many features.

-   The state is complex enough such that the Redux devtools will help debug the app.

### Why Redux instead of Context

While we could attempt to replicate Redux's functionality using contexts and reducers, there are several reasons to choose Redux. Context providers trigger rerenders for all components when state changes occur, whereas Redux only notifies subscribed components while only using context to pass the store instance.

Additionally, the nested nature of context providers can lead to dependency issues, with parent providers unable to access child providers' state.

Perhaps most importantly, Redux establishes a separate, monolithic state management system outside the application's component tree. This separation creates a more maintainable and flexible architecture that's easier to debug and understand, especially in larger applications.

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

### Performance Optimization in Redux Toolkit

-   **Memoize Selectors**: Use `createSelector` to avoid unnecessary recalculations and improve performance.
-   **Avoid Large State Trees**: Keep state flat and avoid deeply nested structures to simplify updates and reduce re-renders.
-   **Batch Actions**: Dispatch multiple actions together using libraries like `redux-batched-actions` to minimize state updates.
-   **Use Middleware Wisely**: Avoid adding unnecessary middleware that could slow down your application.
-   **Lazy Loading Slices**: Dynamically load slices only when needed to reduce initial load time.

### Advanced RTK Query Usage

-   **Custom Transform Responses**: Use the `transformResponse` option in queries to preprocess API responses before storing them.
-   **Polling**: Implement polling for real-time updates using RTK Query's built-in polling mechanism.
-   **Prefetching**: Use `prefetch` to load data in advance for smoother user experiences.
-   **Error Handling**: Extend the query builder to handle errors globally and provide custom error messages.
-   **Optimistic Updates**: Implement optimistic updates for faster UI feedback, ensuring the user sees changes immediately.
-   **Tag Management**: Optimize invalidation tags to minimize unnecessary re-fetching of data.
-   **Caching Strategies**: Customize caching behavior to suit your application's needs, such as setting cache lifetimes.

This is a great resource for Redux https://blog.isquaredsoftware.com/2017/05/idiomatic-redux-tao-of-redux-part-1/
https://redux.js.org/
Link for best redux practices
From https://redux.js.org/faq/general
