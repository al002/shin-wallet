# Shin Wallet

Shin Wallet is a secure, non-custodial mobile cryptocurrency wallet built with React Native and Expo. It provides a user-friendly interface for managing digital assets, with a focus on security and ease of use.

## ✨ Key Features

*   **Secure Wallet Creation**: Generate a new wallet using a 12-word mnemonic seed phrase.
*   **Biometric Authentication**: Secure your wallet with Face ID or Touch ID for quick and safe access.
*   **Asset Management**: View your wallet balance and transaction history.
*   **Cross-Platform**: Runs on iOS, Android, and Web from a single codebase.
*   **Modern UI**: Built with the Tamagui component library for a consistent and performant user experience.

## 🛠️ Tech Stack

*   **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
*   **UI Toolkit**: [Tamagui](https://tamagui.dev/)
*   **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/)
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
*   **Ethereum Interaction**: [viem](https://viem.sh/)
*   **Secure Storage**: [Expo Secure Store](https://docs.expo.dev/versions/latest/sdk/secure-store/) & [React Native Keychain](https://github.com/oblador/react-native-keychain)
*   **Internationalization**: [i18next](https://www.i18next.com/)

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

*   [Node.js](https://nodejs.org/en) (LTS version recommended)
*   [Bun](https://bun.sh/) (for dependency management)
*   [Expo Go](https://expo.dev/go) app on your iOS or Android device, or an emulator/simulator.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/al002/shin-wallet.git
    cd shin-wallet
    ```

2.  **Install dependencies:**
    This project uses `bun` for package management.
    ```bash
    bun install
    ```

3.  **Start the development server:**
    ```bash
    bun expo start
    ```
    This will start the Expo development server. You can then scan the QR code with the Expo Go app on your phone or run it in a simulator.

4.  **Windows Firewall**
    ```powershell
    New-NetFirewallRule -DisplayName "Expo Metro (8081)" -Direction Inbound -Protocol TCP -LocalPort 8081 -Action Allow
    ```

## 📂 Project Structure

Here is a brief overview of the key directories in this project:

```
.
├── app/                # All screens and routes, managed by Expo Router.
│   ├── (onboarding)/   # Onboarding and wallet setup flow.
│   └── (tabs)/         # Main app screens after login.
├── assets/             # Static assets like images and fonts.
├── components/         # Reusable UI components (e.g., Button, Input).
├── constants/          # Shared constants like theme colors and keys.
├── contexts/           # React contexts for sharing state.
├── locales/            # Internationalization (i18n) files.
├── store/              # Global state management with Zustand.
└── utils/              # Utility functions and helpers.
```

## 🤝 Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

