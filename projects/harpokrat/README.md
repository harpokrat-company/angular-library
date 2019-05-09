# Harpokrat

This Angular Project is the library used to consume Harpokrat API within an Angular Project

## Building

Running `ng build` will build the project in the `dist/` directory, it will be built as a ready to use npm package that can then be imported into other projects

## Using the library

In order to use the library inside your project you will need to import `HarpokratModule`, use `HarpokratModule.forRoot()` inside your root module.

Example: 
```typescript
HarpokratModule.forRoot(
    'https://api.harpokrat.com', // API URL
    {
        loginRoutePath: '/login' // Angular Router login page url
    }
)
```