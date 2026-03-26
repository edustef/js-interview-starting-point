# Coffee Shop Finder

Finds the 3 nearest coffee shops to a given position.

## Usage

```
npm start -- <x> <y>
yarn start <x> <y>
```

## What was done

- Input validation with zod
- Env validation on startup
- Sorting done using euclidean distance (I skipped square root because we only need it to compare, we don't need the actual distances)
- Tests for sorting logic, edge cases and error handling

## Commands

```
npm start -- <x> <y>    |    yarn start <x> <y>
npm run dev              |    yarn dev
npm test                 |    yarn test
```
