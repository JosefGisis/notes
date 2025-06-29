## Adopting Redux Toolkit and Redux Toolkit Query

### Why Redux?

Redux provides global state management that allows us to avoid prop drilling, maintain persistent state, and create a predictable and controllable state flow.

Redux is not just a large provider: it creates a separate state management system that lives outside your component tree, providing a single source of truth that can be accessed and modified in a controlled manner through actions and reducers. This separation of concerns makes state changes more predictable and easier to debug.

The Redux DevTools enable comprehensive state tracking and time-travel debugging, making it easier to identify and fix state-related issues.

### Why not to use Redux?

-   Lack of directionality

    > In large and complex applications, this actually becomes a benefit as it enforces a predictable data flow.

-   Monolithic architecture

    > This centralization can be advantageous for maintaining consistency across large applications.

-   Verbosity

    > Redux Toolkit significantly reduces this concern.

-   Initial complexity

-   Serializable state limitation
    > This constraint helps maintain predictable state management.

### When to use Redux

Consider Redux when:

-   Your application has substantial state that needs to be accessed throughout the app
-   State persistence across rerenders is important
-   Complex state logic needs to be handled outside the component tree
-   Your codebase is medium to large-sized with multiple developers and features
-   You need powerful debugging tools for state management

### Why Redux instead of Context

While Context and reducers can partially replicate Redux's functionality, Redux offers several key advantages:

-   Performance: Context triggers rerenders for all consuming components on any change, while Redux only updates subscribed components
-   Debugging: Redux DevTools provide superior debugging capabilities
-   Architecture: Redux creates a separate state management system that's more maintainable and flexible
-   Scalability: Redux handles complex state interactions better than nested Context providers
-   Middleware: Redux's middleware system enables powerful features like logging, routing, and async operations

### Why Redux Toolkit?

Redux Toolkit modernizes Redux development by reducing boilerplate and providing essential utilities:

-   createAsyncThunk: Simplifies async operations (though RTK Query is preferred for data fetching)
-   createEntityAdapter: Enables efficient normalized data management
-   createSelector: Provides memoized selector functions for optimal performance
-   createSlice: Simplifies reducer and action creation
-   createReducer: Enables safe state mutations via Immer
-   Built-in middleware configuration
-   RTK Query for data fetching and caching

### RTK best practices and suggested usage

These guidelines focus on Redux Toolkit-specific practices, assuming fundamental Redux principles are already understood.

#### State Management

-   **Keep State Thin**

    -   Store only essential data needed for the application to function
    -   Avoid derived state - compute it where needed
    -   Example: Store filter criteria rather than filtered lists
    -   This approach maintains flexibility and simplifies state management

-   **Flat State Structure**
    -   Use flat state structures with logical grouping
    -   Nested objects should only be used when the data naturally belongs together
    -   Example: `{ userDetails: { name, email }, userPreferences: { theme, language } }`

#### Actions and Reducers

-   **Pure Actions**

    -   Actions should be predictable and dependent only on their payload
    -   Handle conditional logic where the action is dispatched, not in the reducer

-   **One Slice Per Feature**

    -   Each feature should have its own slice
    -   If a slice becomes too large, or it contains unrelated state, it may indicate a flaw in the features design.

-   **Specific Action Names**

    -   Use clear, specific action names: `setUserProfile` instead of `setData`
    -   Verb-based naming: set, update, remove, reset
    -   Boolean states should start with 'is': isLoading, isActive
    -   Example action names:

    ```typescript
    // Good
    setUserProfile
    updateCartItemQuantity
    removeNotification

    // Bad
    setData
    updateState
    changeValue
    ```

#### Data Handling

-   **Validation in Reducers**

    -   Keep data validation and transformation in reducers
    -   Ensures consistent data format throughout the application
    -   Reduces duplicate validation logic in components

-   **State Reset Patterns**
    -   Avoid dedicated "clear" actions
    -   Use undefined/null for clearing specific values
    -   Use reset actions for returning to initial state

#### Cross-Slice Communication

-   **Using addCase Wisely**
    -   Only react to other slices' actions when the relationship is clear and necessary
    -   Document cross-slice dependencies
    -   Consider splitting the feature if there are too many cross-slice dependencies

#### Performance Optimization

-   **Selector Usage**

    -   Keep selectors small and focused
    -   Use createSelector for computed values
    -   Avoid selecting unnecessary data

-   **State Updates**
    -   Redux performs shallow equality checks automatically
    -   No need for manual previous/current value comparisons
    -   Use immer's draft syntax within createReducer

#### Component Integration

-   **Custom Hooks**

    -   Create purpose-specific hooks instead of generic slice hooks
    -   Example: `useUserProfile()` instead of `useUserSlice()`
    -   Keep hooks focused on specific tasks to prevent unnecessary rerenders

-   **Dispatch Abstraction**
    -   Only abstract dispatches when there's additional logic
    -   Keep simple dispatches inline for better code clarity
    -   Use clear naming for dispatch functions: `dispatchUpdateUserProfile`

### Why Redux Toolkit Query?

Redux Toolkit Query is a data fetching and caching tools built on top of createSlice and createAsyncThunk. Some of the benefits of using RTKQ include:

-   RTKQ abstracts data fetching.

-   RTKQ handles data caching.

-   RTKQ built on top of createSlice and createAsyncThunk so we can respond to queries and mutations within a slice and alter fetched data from the queries/mutations.

-   RTKQ Automatically creates loading/fetching states without having to use createAsyncThunk.

-   RTKQ Automatically creates queries and mutations which provide data and fetching states.

-   RTKQ Provides a great deal of flexibility in how to manage, cache, and request data.

### RTKQ best practices and suggested usage

#### API Organization

-   **Feature-Based API Slices**
    -   Split API definitions by feature domain
    -   Keep endpoints grouped by related functionality
    -   Example structure:
        ```typescript
        // userApi.ts - User-related endpoints
        // orderApi.ts - Order management endpoints
        // productApi.ts - Product catalog endpoints
        ```

#### Query Patterns

-   **Standard vs Lazy Queries**

    -   Use standard queries with `skip` option instead of lazy queries when possible:

        ```typescript
        // Preferred approach
        const { data } = useGetItemsQuery(params, { skip: !params.id })

        // Instead of lazy queries
        const [getItems, { data }] = useLazyGetItemsQuery()
        ```

    -   Reserve lazy queries for:
        -   User-triggered actions
        -   Complex query chains
        -   Manual retry scenarios

-   **Optimistic Updates**
    -   Implement optimistic updates to improve perceived performance
    -   Update cache immediately, then revert if mutation fails
    ```typescript
    updatePost: build.mutation({
    	query: ({ id, ...patch }) => ({
    		url: `posts/${id}`,
    		method: 'PATCH',
    		body: patch,
    	}),
    	onQueryStarted: async ({ id, ...patch }, { dispatch, queryFulfilled }) => {
    		const patchResult = dispatch(
    			api.util.updateQueryData('getPost', id, (draft) => {
    				Object.assign(draft, patch)
    			})
    		)
    		try {
    			await queryFulfilled
    		} catch {
    			patchResult.undo()
    		}
    	},
    })
    ```

#### Cache Management

-   **Tag-Based Invalidation**

    -   Design tags around entities and collections
    -   Use specific IDs for precise invalidation

    ```typescript
    {
      tagTypes: ['Post', 'User'],
      endpoints: {
        getPost: build.query({
          providesTags: (result, error, id) => [{ type: 'Post', id }]
        }),
        updatePost: build.mutation({
          invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }]
        })
      }
    }
    ```

-   **Pagination Handling**
    -   Store page parameters in URL or component state
    -   Use cursor-based pagination when possible
    -   Implement infinite scrolling with `merge` concat function
    ```typescript
    getPosts: build.query({
    	query: ({ page, limit }) => `posts?page=${page}&limit=${limit}`,
    	serializeQueryArgs: ({ endpointName }) => endpointName,
    	merge: (currentCache, newItems) => {
    		currentCache.items.push(...newItems.items)
    	},
    	forceRefetch: ({ currentArg, previousArg }) => currentArg?.page !== previousArg?.page,
    })
    ```

#### Performance Optimization

-   **Selective Data Transformation**

    -   Transform API responses close to the source
    -   Use `transformResponse` for consistent data shape

    ```typescript
    getUsers: build.query({
    	query: () => 'users',
    	transformResponse: (response) => ({
    		users: response.data.map(normalizeUser),
    		total: response.meta.total,
    	}),
    })
    ```

-   **Request Debouncing**
    -   Implement debouncing for search queries
    -   Use polling for real-time updates
    ```typescript
    useSearchQuery(searchTerm, {
    	skip: !searchTerm,
    	pollingInterval: shouldPoll ? 3000 : 0,
    	debounce: 500,
    })
    ```

#### Error Handling

-   **Global Error Management**
    -   Set up global error handlers in API configuration
    -   Transform error responses consistently
    ```typescript
    createApi({
    	baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    	baseQueryWithReauth: async (args, api, extraOptions) => {
    		let result = await baseQuery(args, api, extraOptions)
    		if (result.error?.status === 401) {
    			// Handle authentication error
    		}
    		return result
    	},
    })
    ```

#### Advanced Features

-   **Custom Hooks**

    -   Create wrapper hooks for common query patterns
    -   Combine multiple RTKQ hooks when needed

    ```typescript
    export function useUserData(userId) {
    	const { data: user } = useGetUserQuery(userId)
    	const { data: preferences } = useGetUserPreferencesQuery(userId, {
    		skip: !user,
    	})
    	return { user, preferences }
    }
    ```

-   **Prefetching Strategies**

    -   Implement intelligent prefetching
    -   Use hover-based prefetching for UI elements

    ```typescript
    function UserList({ users }) {
    	const dispatch = useDispatch()

    	const prefetchUser = useCallback(
    		(userId) => {
    			dispatch(api.util.prefetch('getUser', userId, { force: false }))
    		},
    		[dispatch]
    	)

    	return users.map((user) => <div onMouseEnter={() => prefetchUser(user.id)}>{user.name}</div>)
    }
    ```

### Further Reading

-   For a good understanding of the principles of Redux https://blog.isquaredsoftware.com/2017/05/idiomatic-redux-tao-of-redux-part-1/

-   Middleware for API https://redux-toolkit.js.org/rtk-query/usage/error-handling#handling-errors-at-a-macro-level
-   Automated re-fetching https://redux-toolkit.js.org/rtk-query/usage/polling
-   prefetching https://redux-toolkit.js.org/rtk-query/usage/prefetching
-   middleware https://redux-toolkit.js.org/rtk-query/usage/polling
