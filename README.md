# Wallet 

 This is a sharp and clean af looking wallet generator for solana and ethereum. It is built using Next.js,Shadcn,headlessui,Tailwind and TypeScript, providing a seamless user experience with dark mode support and local storage capabilities.

## Features

- **Wallet Generation**: Easily generate wallets for Solana and Ethereum blockchains.
- **Mnemonic Phrase**: Generate and store mnemonic phrases securely in local storage.
- **Dark Mode**: Toggle between light and dark themes based on user preference or system settings.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Local Storage**: Persistently store wallet data on the user's device.

## Technologies Used

- **Next.js**: A React framework for building fast and user-friendly web applications.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Headless UI**: Unstyled, fully accessible UI components for React.
- **Lucide Icons**: A collection of simple and beautiful SVG icons.
- **React Hot Toast**: A library for creating customizable toast notifications.

## Installation

To get started with the Wallet Generator App, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/wallet-generator-app.git
   cd wallet-generator-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

4. **Open the App**:
   Open your browser and navigate to `http://localhost:3000` to view the app.

## File Structure

- **app/page.tsx**: The main entry point for the application, rendering the home page with links to Solana and Ethereum wallet generators.
- **app/ui/WalletCard.tsx**: A component for displaying wallet details, including public and private keys.
- **app/ethereum/page.tsx**: The Ethereum wallet generation page, handling mnemonic generation and wallet creation.
- **app/solana/page.tsx**: The Solana wallet generation page, similar to the Ethereum page but for Solana wallets.
- **app/scripts/GenerateSolWallet.tsx**: Logic for generating Solana wallets using mnemonic phrases.
- **app/scripts/GenerateEthWallet.tsx**: Logic for generating Ethereum wallets using mnemonic phrases.
- **app/scripts/DarkModeSelector.tsx**: A component for selecting and applying the theme (light, dark, or system).
- **app/providers/ThemeProvider.tsx**: Provides theme context to the application.
- **app/layout.tsx**: Defines the global layout and includes the theme provider.
- **app/scripts/HandleCopy.tsx**: Utility function for copying text to the clipboard with toast notifications.
- **app/scripts/AnimatedText.tsx**: Displays animated text on the home page.

## Usage

1. **Generate a Wallet**:
   - Navigate to either the Solana or Ethereum page.
   - Click the "Generate Seed Phrase" button to create a new mnemonic.
   - Use the "Generate Wallet" button to create a new wallet.

2. **Copy Wallet Details**:
   - Click the "Copy" button next to the public or private key to copy it to the clipboard.

3. **Toggle Dark Mode**:
   - Use the theme selector in the top-right corner to switch between light, dark, and system themes.

## SEO Optimization

This Wallet Generator App is optimized for search engines with the following strategies:

- **Descriptive Titles and Metadata**: Each page includes descriptive titles and metadata to improve search visibility.
- **Responsive Design**: Ensures a seamless experience across all devices, which is favored by search engines.
- **Fast Loading Times**: Built with Next.js for optimized performance and fast loading times.
- **Accessible Components**: Uses Headless UI for accessible components, improving usability and search rankings.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. Ensure that your code adheres to the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For questions or feedback, please contact [patraabhinav12@gmail.com](mailto:patraabhinav12@gmail.com).

---

Thank you for using the Wallet Generator App! We hope it meets your cryptocurrency wallet generation needs.