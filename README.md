# iGTD Client Portal

A modern, responsive landing page and registration system for an iGaming brand protection application.

## Features

- **Modern UI Design**: Clean, professional interface with Tailwind CSS
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Components**: 
  - Header with navigation and authentication buttons
  - Hero section with compelling call-to-action
  - Registration modal with form validation
- **Form Validation**: Real-time validation for all registration fields
- **Accessibility**: Proper ARIA labels and keyboard navigation support

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **clsx & tailwind-merge** for conditional styling

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd iGTD_Client_Portal
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Navigation header with logo and auth buttons
│   ├── Hero.tsx            # Main hero section with CTA
│   └── RegistrationModal.tsx # Registration form modal
├── lib/
│   └── utils.ts            # Utility functions
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
└── index.css              # Global styles and Tailwind imports
```

## Components

### Header
- Logo with shield icon
- Navigation links (Features, Pricing, About)
- Login and Sign Up buttons

### Hero
- Main title: "Protect Your iGaming Brand – Detect & Remove Phishing Domains"
- Subheading with free scan offer
- Large "Start Free Scan" CTA button
- Feature highlights grid

### RegistrationModal
- Email, password, and confirm password fields
- Role selection dropdown (Operator, Affiliate, Supplier)
- Terms of service checkbox
- Form validation with error messages
- Password visibility toggles

## Styling

The project uses Tailwind CSS with a custom color palette:
- Primary colors: Blue shades for brand identity
- Secondary colors: Gray shades for text and backgrounds
- Custom component classes for buttons, inputs, and modals

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is proprietary software for iGTD brand protection services. 