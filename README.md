# NoteMaking - Secure Note Taking Web App

A React-based authenticated note-taking application that allows users to create, manage and securely store their private notes using Firebase.
Live Now:https://notemaking-xxbk.onrender.com/
## Features

- 🔐 Google Authentication
- 📝 Create, View, Edit and Delete Notes
- 📌 Pin/Unpin Important Notes 
- 📱 Responsive Design
- 📄 Pagination Support
- 🎨 Modern UI with Animations
- 🔒 Private Notes per User

## Tech Stack

- **Frontend:** React, TailwindCSS
- **Backend:** Firebase (Firestore)
- **Authentication:** Firebase Auth
- **Animation:** Motion
- **Build Tool:** Vite
- **Routing:** React Router
- **Icons:** Remixicon

## Project Structure

```
NoteMaking/
├── src/
│   ├── components/
│   │   ├── LandingPage.jsx
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   └── View.jsx
│   ├── hooks/
│   │   └── Firebase.config.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
└── README.md
```

## Setup & Installation

1. Clone the repository:
```sh
git clone https://github.com/sourabh789-oss/NoteMaking.git
```

2. Install dependencies:
```sh
cd NoteMaking
npm install
```

3. Create a `.env` file in the root directory and add your Firebase configuration:
```
VITE_FIREBASE_API=your_api_key
```

4. Start the development server:
```sh
npm run dev
```

## Features in Detail

### Authentication
- Google Sign-in integration
- Protected routes for authenticated users
- Automatic session management

### Note Management
- Create notes with title and content
- View notes in a responsive grid
- Edit existing notes
- Delete notes with confirmation
- Pin/Unpin important notes
- Notes are sorted by pinned status and creation time

### UI/UX
- Loading animations
- Smooth transitions
- Responsive design for mobile devices
- Pagination for better performance
- Modern glassmorphism design

## Development

- Run development server: `npm run dev`
- Build for production: `npm run build`
- Lint code: `npm run lint`
- Preview production build: `npm run preview`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
