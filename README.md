# Personal Portfolio Website

A modern, responsive personal portfolio website built with HTML, CSS, and JavaScript, featuring interactive animations and a dynamic theme system.

## Features

- 🌓 Light/Dark Theme Toggle
- 🌊 Interactive Wave Animations using Three.js
- 📱 Fully Responsive Design
- 🎨 Modern and Clean UI
- ⚡ Smooth Animations and Transitions
- 📊 Dynamic Skills Visualization
- 📝 Interactive Experience Timeline
- 🎓 Education Showcase
- 📬 Contact Information Section

## Technologies Used

- HTML5
- CSS3 (with CSS Variables for theming)
- JavaScript (ES6+)
- Three.js for 3D animations
- Font Awesome for icons

## Project Structure

```
├── index.html          # Main HTML file
├── style.css          # Styles and theme variables
├── script.js          # JavaScript functionality
├── profile.png        # Profile picture
└── avatar.png         # Contact avatar
```

## Theme System

The website implements a dynamic theme system with:

- Light and Dark mode support
- System preference detection
- Theme persistence using localStorage
- Smooth transitions between themes
- Customizable color variables

## Animations

- Interactive wave animation in the experiences section
- Ripple effect in the skills section
- Smooth hover effects on cards and buttons
- Animated title transitions
- Progress bar animations

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-website.git
```

2. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server

# Using Node.js
npx serve
```

## Customization

### Theme Colors
Edit the CSS variables in `style.css` to customize the theme colors:

```css
:root {
    --bg-primary: #ffffff;
    --bg-secondary: #f5f5f5;
    --text-primary: #333333;
    --accent-color: #4a90e2;
    /* ... other variables ... */
}
```

### Content
Update the content in `index.html` to personalize:
- Header information
- About section
- Work experience
- Education
- Skills
- Contact information

### Animations
Modify animation parameters in `script.js`:
- Wave animation speed and size
- Ripple effect properties
- Transition timings

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Three.js for 3D animations
- Font Awesome for icons
- Unsplash for background images