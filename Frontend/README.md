# Behalf Healthcare Platform

A comprehensive healthcare platform designed for families with elderly parents living independently. Behalf provides professional home visits, hospital checkups, and 24/7 monitoring to give families peace of mind.

## 🌟 Features

- **Multiple User Portals**: Son/Family, Parent, Doctor, and Caretaker interfaces
- **Flexible Care Plans**: Basic (₹25,000), Premium (₹35,000), and Platinum (₹70,000) monthly plans
- **Home Visits**: Regular professional healthcare visits at home
- **Hospital Partnerships**: Access to quality hospitals and priority appointments
- **QR Medical Records**: Instant access to complete medical history through QR codes
- **24/7 Emergency Support**: Round-the-clock assistance and monitoring
- **Real-time Updates**: Family notifications and health reports

## 🚀 Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using the TypeScript template.

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/behalf-healthcare.git
cd behalf-healthcare
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components (shadcn/ui)
│   ├── figma/              # Figma-specific components
│   ├── AuthContext.tsx     # Authentication context
│   ├── LandingPage.tsx     # Main landing page
│   ├── SonApp.tsx          # Family member dashboard
│   ├── ParentApp.tsx       # Patient dashboard
│   ├── DoctorApp.tsx       # Healthcare provider dashboard
│   ├── CaretakerApp.tsx    # Caretaker dashboard
│   └── ...                 # Other components
├── styles/
│   └── globals.css         # Global styles and Tailwind config
├── App.tsx                 # Main app component
├── index.tsx               # Entry point
└── ...
```

## 🔧 Available Scripts

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## 🎨 Design System

This project uses:
- **Tailwind CSS v4** for styling
- **shadcn/ui** components for consistent UI
- **Lucide React** for icons
- **Motion** for animations
- **Inter font** for typography

## 👥 User Types & Authentication

### Family Member (Son)
- Choose care plans for parents
- Monitor parent health status
- Receive regular updates and reports
- Manage appointments and schedules

### Patient (Parent)
- View personal health dashboard
- Check medication schedules
- Access appointment information
- Use QR codes for medical records

### Healthcare Provider (Doctor)
- Access patient records via QR scanning
- Conduct consultations and home visits
- Manage treatment plans and prescriptions
- Certificate verification required

### Caretaker
- Schedule and conduct home visits
- Report patient status to families
- Coordinate with healthcare providers
- Track care activities

## 🔐 Demo Credentials

For testing purposes, use:
- **Email**: demo@behalf.com
- **Password**: demo123

## 🏥 Care Plans

### Basic Plan - ₹25,000/month
- NIC certified hospital checkup
- Hospital visit every 4 months
- Monthly home visit
- Basic health monitoring

### Premium Plan - ₹35,000/month ⭐ Most Popular
- Best hospitals access
- Hospital visit every 3 months
- Monthly home visit
- Advanced health monitoring
- 24/7 emergency support

### Platinum Plan - ₹70,000/month
- Top-tier hospitals (Apollo, etc.)
- Monthly hospital visit
- Weekly home visits
- Personal care coordinator
- Comprehensive health programs

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: Motion (formerly Framer Motion)
- **Forms**: React Hook Form
- **UI Components**: shadcn/ui
- **Build Tool**: Create React App

## 📱 Features in Detail

### QR Code System
- Generate unique QR codes for each patient
- Instant access to medical records during emergencies
- Secure data encoding for privacy protection

### Authentication System
- Role-based access control
- Secure user registration and login
- Doctor verification process with certificate upload

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Progressive Web App (PWA) ready

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Email**: contact@behalf.healthcare
- **Phone**: +91 98765 43210
- **Website**: [https://behalf.healthcare](https://behalf.healthcare)

## 🙏 Acknowledgments

- [Create React App](https://create-react-app.dev/) for the project foundation
- [shadcn/ui](https://ui.shadcn.com/) for the component library
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons
- [Unsplash](https://unsplash.com/) for healthcare imagery

---

**Made with ❤️ for families taking care of elderly parents worldwide.**