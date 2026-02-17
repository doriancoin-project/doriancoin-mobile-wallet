# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nexus Wallet is a React Native mobile Litecoin wallet (iOS & Android) with Lightning Network support via LND, Flexa checkout, MoonPay buy/sell, and Tor integration. Built with React Native 0.79, React 19, TypeScript 5.8, Redux Toolkit, and React Navigation 7.

## Common Commands

```bash
yarn start              # Start Metro bundler
yarn ios                # Build and run on iOS
yarn android            # Build and run on Android
yarn lint               # Run ESLint
yarn lint --fix         # Auto-fix lint issues
yarn test               # Run all Jest tests
yarn test -- --testPathPattern=path/to/file  # Run a single test file
yarn test -- --testNamePattern="test name"   # Run tests matching a name
yarn reset              # Nuke node_modules, gradle cache, .cxx, and reinstall
yarn pods               # Install iOS CocoaPods (with New Architecture enabled)
yarn fetch:ios          # Download iOS LND framework
yarn fetch:android      # Download Android LND framework
```

## Architecture

### State Management
- **Redux Toolkit** slices in `src/reducers/` with `redux-persist` backed by MMKV storage
- Async logic uses manual thunks typed as `AppThunk` (defined in `src/reducers/types.ts`)
- Typed hooks in `src/store/hooks.ts`: `useAppDispatch()` and `useAppSelector`
- Store configured in `src/store/index.ts` with `RootState` and `AppDispatch` types exported

### Navigation
- React Navigation 7 with stack navigators
- Root flow: `Loading → AuthStack | Onboarding | NewWalletStack`
- `NewWalletStack` is the main app stack containing `Main`, `SettingsStack`, `AlertsStack`, and transaction/buy/sell screens
- Type-safe navigation params in `src/navigation/types.ts`
- `NavigationService.ts` provides programmatic navigation via ref

### Responsive Design
- `ScreenSizeContext` provides device dimensions — consumed via `useContext(ScreenSizeContext)`
- Components destructure as `const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = useContext(ScreenSizeContext)`
- All sizing uses percentage-based multipliers (e.g., `SCREEN_WIDTH * 0.9`)
- Styles generated via `getStyles(screenWidth, screenHeight)` functions returning `StyleSheet.create()`

### Blockchain Integration
- LND (Lightning Network Daemon) via `react-native-turbo-lndltc` in Neutrino light client mode
- LND data directory: `DocumentDirectoryPath/lndltc/`
- HD wallet derivation using `bitcoinjs-lib`, `bip32`, `bip39`, `ecpair`
- Tor networking via `react-native-nitro-tor`

### Internationalization
- i18next with 15 languages in `src/assets/locales/` (de, en, es, fa, fr, hi, id, it, lt, pl, ru, sq, ta, tl, zh)
- Use `useTranslation('domainName')` hook or `<TranslateText>` component for user-facing text

## Code Conventions

### Component Pattern
```typescript
interface Props {
  // Props interface always named "Props"
}
const ComponentName: React.FC<Props> = props => { ... };
export default ComponentName;
```

### Naming
- Components: PascalCase files (`BlueButton.tsx`)
- Utilities: camelCase files (`config.ts`)
- Assets: kebab-case (`back-arrow.png`)
- Event handlers: `handle*` or `on*` prefix

### Formatting (Prettier)
- Single quotes, trailing commas, no bracket spacing, arrow parens avoided, brackets on same line

### Commits
- Conventional Commits enforced via commitlint: `feat:`, `fix:`, `docs:`, `perf:`, `build:`

### Testing
- Jest with `react-native` preset; tests live in `src/**/__tests__/` or as `*.test.{ts,tsx}` files
- Extensive native module mocks in `jest.setup.js` — check there when adding new native dependencies
- Run specific tests: `yarn test -- --testPathPattern=estimateFee`
