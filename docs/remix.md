# Remix

Remix is a powerful framework for building full-stack web applications, leveraging the strengths of React and modern web practices. It provides a seamless integration between the FE and BE, **and IMHO it's much easier to understand than similar frameworks and brings a better developer experience** by capitalizes on common SPA patterns.

## Key Features and Concepts

### Leveraging SPA Conventions and Seamless Routing

A typical SPA often includes views for a "list of items" and a detailed view for a "single item."

Remix recognizes and capitalizes the inherent relationship between the model for the **item**, its **endpoint**, its **view**, and the **URL**.

This alignment simplifies development and enhances the DX by providing a coherent structure. To provide a concrete example: as you will see in this project in the [routes folder](../app/routes) you can find a file called `cards.tsx`, wich will be shown if the user gets to `/cards`, also in the same file you will find a `loader` function (see "loaders" below) that takes care of getting the data from the endpoint.

> **Note:** React Router is developed by the same team as Remix and in future versions the two projects will be merged into one.

### Data Loading with Loaders

`Loaders` in Remix are analogous to `getServerSideProps` in `Next.js`. They are functions that fetch data required for rendering a page, running on the server-side.

This server-side execution reduces the need for client-side data fetching and enhances performance. Loaders are typically used to fetch data that should be available when the page is rendered, such as initial page content or user-specific data.

### Handling User Interactions with Actions

`Actions` in Remix are used to handle user interactions that modify data, such as form submissions (`POST`, `PUT`, `DELETE` requests).

They capture the intent of the user, process the request, and then determine what should happen next, whether it’s a redirect, revalidation of data, or displaying a confirmation message. This centralized handling of actions ensures consistency and makes it easier to manage state and side effects.

> **Note:** Remix did it first, actions are since the v1.0
