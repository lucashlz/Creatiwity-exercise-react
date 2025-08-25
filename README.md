# The Creatiwity Book - React Exercise

A React application that allows users to create and navigate through a dynamic book with text and image pages.

## 🚀 Features

- **Dynamic Pages**: Create pages with text content or image URLs
- **Navigation**: Browse through pages with Previous/Next buttons
- **Page Editing**: Edit existing pages with a simple modal interface
- **Data Persistence**: All pages are saved to localStorage
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Character Limits**: Text pages limited to 1000 characters with live counter

## 🛠️ Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **CSS** with modern features (flexbox, grid, custom properties)
- **ESLint** for code quality

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎯 Usage

1. **Navigate**: Use Previous/Next buttons to browse pages
2. **Add Pages**: Click the floating + button to add new pages
3. **Edit Pages**: Click the "✏️ Edit" button on any page to modify it
4. **Reset**: Click "Reset" to restore the welcome page

## 🏆 Key Features

- **Custom Hook**: `useLocalStorage` for automatic data persistence
- **TypeScript**: Full type safety with interfaces and generics
- **Responsive**: Mobile-first design with breakpoints at 640px and 1024px
- **Accessibility**: Proper ARIA labels and semantic HTML
- **Modern CSS**: CSS variables, flexbox layouts, and smooth transitions
