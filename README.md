# Çair Park - 3D Interactive Model

## Computer Graphics Project - South East European University (SEEU)

### Project Information
- **Title:** 3D Interactive Model of the Park Of Cair using Three.js
- **Students:** 
  - Veron Idrizi 130922 (vi30922@seeu.edu.mk)
  - Ubejd Kurtishi 131040 (uk31040@seeu.edu.mk)
- **Mentor:** Prof. Visar Shehu (v.shehu@seeu.edu.mk)

---

## 📖 Description

This project recreates Çair Park (Parku i Çairit) in Skopje as an interactive 3D environment using Three.js. Users can explore the virtual park, interact with various objects, and experience both day and night modes.

## 🎮 Features

- **3D Park Layout** - Realistic representation of the park environment
- **Interactive Objects** - Trees, benches, playground equipment, lamp posts, fountain
- **Hierarchical Models** - Objects with proper parent-child relationships (tree trunk + leaves, playground frames + swings)
- **Multiple Light Sources** - Sunlight, ambient light, and lamp lights
- **Materials & Textures** - Grass, wood, metal, concrete, and water textures
- **Realistic Shadows** - Dynamic shadow casting from all light sources
- **Day/Night Mode** - Toggle between day and night atmospheres
- **Animations** - Flying birds, swaying trees, fountain water
- **User Interactions** - Click on objects to see information popups
- **Mini Map** - Track your position in the park

## 🎯 Controls

| Key/Action | Function |
|------------|----------|
| W/A/S/D | Move around the park |
| Mouse | Look around (orbit) |
| Scroll | Zoom in/out |
| Click | Interact with objects |
| T | Toggle Day/Night mode |
| H | Hide/Show info panel |

## 🛠️ Technical Stack

- **Library:** Three.js (v0.160.0)
- **Languages:** JavaScript (ES6 Modules), HTML5, CSS3
- **Features:** WebGL rendering, Shadow mapping, Raycasting, Particle systems

## 📁 Project Structure

```
ParkuCairitProjektCG/
├── index.html              # Main HTML file
├── css/
│   └── style.css           # Styles for UI elements
├── js/
│   ├── main.js             # Main application entry point
│   ├── components/
│   │   ├── ground.js       # Park ground with grass texture
│   │   ├── trees.js        # Trees (oak and pine varieties)
│   │   ├── benches.js      # Park benches
│   │   ├── lampPosts.js    # Street lamps with lights
│   │   ├── playground.js   # Playground equipment
│   │   ├── fountain.js     # Central fountain with water
│   │   ├── paths.js        # Walking paths
│   │   ├── birds.js        # Animated birds
│   │   ├── skybox.js       # Sky background
│   │   └── lighting.js     # Light sources setup
│   └── utils/
│       ├── interactions.js # User interaction handling
│       └── animations.js   # Animation management
└── README.md               # This file
```

## 🚀 How to Run

### Option 1: Using VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 2: Using Node.js http-server
```bash
# Install http-server globally
npm install -g http-server

# Navigate to project directory
cd ParkuCairitProjektCG

# Start the server
http-server

# Open http://localhost:8080 in your browser
```

### Option 3: Using Python
```bash
# Python 3
python -m http.server 8080

# Open http://localhost:8080 in your browser
```

## 🎨 Scene Elements

### Ground & Environment
- Grass-textured ground plane
- Walking paths with stone texture
- Flower patches
- Park boundary fence

### Vegetation
- Oak trees with trunk and foliage hierarchy
- Pine trees with layered branches
- Animated swaying motion

### Furniture & Structures
- Wooden benches with metal frames
- Street lamp posts with night lights
- Central fountain with water animation
- Playground equipment (swings, slide, seesaw, sandbox)

### Atmosphere
- Dynamic day/night cycle
- Animated birds flying overhead
- Procedural sky gradient
- Fog for depth perception

## 📚 Learning Outcomes

Through this project, we learned:
- Three.js fundamentals and 3D scene management
- Creating and manipulating 3D geometries
- Material systems and texturing
- Lighting and shadow techniques
- Animation loops and timing
- User interaction with raycasting
- Modular code organization
- ES6 modules in browser environment

## 🙏 Acknowledgments

- Three.js documentation and examples
- Prof. Visar Shehu for guidance
- The community of Çair, Skopje for inspiration

---

**© 2026 Veron Idrizi & Ubejd Kurtishi - SEEU Computer Graphics Project**
