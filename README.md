There are some point that need to consider, here we have small objective to do so planned accordingly, haven't organise very much. I mentioned comments on code as an feedbacks.

Points I wanna do, but left because of time crunch

Frontend -

1. Setting up Lint, TSlint and prettier.
2. Organise folder structure in more mannerful way
3. Want to maintain Auth global state in context.
4. Setting up http client with caching mechanism (can make use of react-query).
5. Breaking up components to provide separation of concerns
6. can configure any ui library like material, tailwind, bootstrap etc
7. Can implement proper routes, and also auth guard
8. We can either make use of next.js, remix.js or gatsby if we are building website for SEO and other features.

Backend -

1. If application is going on a scale, then probably we can make of nest.js, graphql.
2. Can implement micro-service pattern if we found there is need (if it is making use case - depends on various factors)
3. Route level validation either by many techniques like middleware. tsoa
4. swagger auto-generation mechanism
5. If we are using express straight forward then we can layer flow in routes -> controllers -> services
6. Db Object level caching - (unit of work pattern) by mikro orm or anything.
7. Low level design - thinking of preserving SOLID.
8. Setting up build rules for quality ensurance.
9. DB confing should be in .env

I will be very happy for further discussion in meeting
