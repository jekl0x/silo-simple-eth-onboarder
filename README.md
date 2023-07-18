# DAO stake eth for loot simple onboarder

This is a very simple onboarder app to manage distribution of a social/governance token through staking of a chains native token.

It uses a onboarding Shaman to streamline the process of staking into a shared treasury in return for DAO tokens.

Shamans are made to interface with the Moloch DAO framework and in this case issues Loot tokens.

## Development

### 1. Project Setup

#### NPX/degit

```bash
npx degit HausDAO/dao-app-starter-vite my-daohaus-app

cd my-daohaus-app

git init

yarn
```

#### SSH

```bash
git clone git@github.com:HausDAO/moloch-v3-vite-starter.git

git remote remove origin

cd dh-moloch-v3-vite-starter

yarn
```

#### HTTPS

```bash
git clone https://github.com/HausDAO/dh-v3-vite-starter.git

git remote remove origin

cd dh-moloch-v3-vite-starter

yarn
```

### 2. `.env` Setup

```bash
cp .env.sample .env
```

```yaml
VITE_RIVET_KEY
```


### 3. Target DAO Set-up

[Summon](https://summon.daohaus.club) a DAO

#### Edit `src/targetDao.ts`

Add your DAO's data to the property and values of the object

### 4. Run the Development Server

```bash
yarn dev
```

## Reference

### `main.tsx`

- Sets up the `react-query` provider `@daohaus/moloch-v3-hooks` will use
- Sets up `DHConnectProvider` - that handles the Wallet Connect functionality
- Sets up `HausThemeProvider` - that provides the styling theme to the app
- Adds the router to the app

### `HomeContainer.tsx`

- Parent component wrapping all routes/pages
- Sets up `DHLayout` which adds the connect button and navigation to the app
  - You can update the navigation in `navLinks`
- Sets up `TXBuilder` which enables easy transaction creation


### Adding UI Components

- [Storybook](https://storybook.js.org/)

### Methods for Accessing `daoid` and `daochain`

These values are used in most hooks and components and you have some options:

Get them from `targetDao.ts`

```tsx
const daoChain = TARGETS.CHAIN_ID;
const daoId = TARGETS.DAO_ADDRESS;
```

## Resources

- [DAO Toolbox](https://toolbox.daohaus.fun/) docs
- HausDAO monorepo [libs](https://github.com/HausDAO/monorepo/tree/develop/libs)
- monorepo admin/admin-new
