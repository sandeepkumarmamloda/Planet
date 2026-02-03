# 🌍 Planet Visualization

An interactive 3D solar system visualization built with Three.js, featuring realistic Earth and Sun models with a dynamic starfield background.

## ✨ Features

- **3D Earth Model**: Detailed Earth visualization with realistic textures
- **Sun Model**: Animated 3D sun representation
- **Dynamic Starfield**: Beautiful particle-based star background
- **Interactive Camera**: Mouse-controlled orbital camera for exploration
- **Responsive Design**: Works seamlessly across different screen sizes
- **Smooth Animations**: Real-time rendering with optimized performance

## 🚀 Demo

Open `index.html` in your browser to see the solar system come to life!

## 📁 Project Structure

```
Planet/
├── index.html          # Main HTML file
├── main.js            # Core Three.js scene setup and rendering
├── starfield.js       # Starfield particle system
├── saver.js           # Additional utilities
├── style.css          # Styling
├── earth.glb          # 3D Earth model (option 1)
├── earth-2.glb        # Alternative Earth model (option 2)
├── planet_earth.glb   # Another Earth model variant
├── sun.glb            # 3D Sun model
├── galaxy.jpg         # Galaxy background texture
├── 9078.jpg           # Additional texture/image
└── 9078.eps           # Vector graphic asset
```

## 🛠️ Technologies Used

- **Three.js**: 3D graphics library for WebGL
- **GLTFLoader**: For loading 3D models (.glb format)
- **OrbitControls**: Interactive camera controls
- **JavaScript (ES6+)**: Modern JavaScript features
- **HTML5 & CSS3**: Structure and styling

## 📦 Installation

### Option 1: Direct Use
1. Clone this repository:
   ```bash
   git clone https://github.com/sandeepkumarmamloda/Planet.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Planet
   ```
3. Open `index.html` in your web browser

### Option 2: Using a Local Server (Recommended)
For best results, run with a local server to avoid CORS issues:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using VS Code Live Server extension
# Right-click on index.html and select "Open with Live Server"
```

Then visit `http://localhost:8000` in your browser.

## 💻 Usage

Once the page loads:
- **Rotate View**: Click and drag with your mouse
- **Zoom**: Use mouse wheel or pinch gesture
- **Pan**: Right-click and drag (or two-finger drag on trackpad)

## 🎨 Customization

### Changing Earth Models
The project includes multiple Earth model variants. Edit `main.js` to switch between them:

```javascript
// Change this line to use different Earth models
loader.load('earth.glb', ...);      // Default
loader.load('earth-2.glb', ...);    // Alternative
loader.load('planet_earth.glb', ...); // Variant
```

### Adjusting Starfield
Modify `starfield.js` to customize:
- Star count
- Star colors
- Distribution pattern
- Animation speed

### Background
Replace `galaxy.jpg` with your own space background image.

## 📄 License

This project includes both free and premium license options:
- See `License free.txt` for free usage terms
- See `License premium.txt` for commercial/premium usage

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues

- Large GLB files may take time to load on slower connections
- Performance may vary on older devices
- Some browsers may require HTTPS for certain features

## 📝 Future Enhancements

- [ ] Add more planets (Mars, Jupiter, Saturn, etc.)
- [ ] Implement planet orbits
- [ ] Add planet information panels
- [ ] Mobile touch controls optimization
- [ ] VR support
- [ ] Realistic planet scaling option
- [ ] Day/night cycle for Earth
- [ ] Cloud layer animations

## 🙏 Acknowledgments

- Earth and Sun 3D models: [Source to be credited]
- Galaxy background image by Jake Weirick on Unsplash
- Three.js community for excellent documentation

## 📧 Contact

Sandeep Kumar Mamloda
- GitHub: [@sandeepkumarmamloda](https://github.com/sandeepkumarmamloda)

## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐️!

---

**Built with 💙 using Three.js**
