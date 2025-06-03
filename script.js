// Theme Switching
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');

// Apply the theme
document.documentElement.setAttribute('data-theme', currentTheme);

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Toggle experience sections
function toggleExperience(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.toggle-icon i');
    
    // Get all timeline bodies and icons
    const allContents = document.querySelectorAll('.timeline-body');
    const allIcons = document.querySelectorAll('.toggle-icon i');
    
    // Close all other items
    allContents.forEach((item, index) => {
        if (item !== content) {
            item.style.maxHeight = null;
            allIcons[index].style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle the clicked content
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        icon.style.transform = 'rotate(0deg)';
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        icon.style.transform = 'rotate(180deg)';
    }
}

// Three.js Wave Animation for Experiences
const canvas = document.getElementById('waveCanvas');
const experiencesSection = document.querySelector('.experiences');

// Set canvas size to match experiences section
function updateCanvasSize() {
    const rect = experiencesSection.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
}
updateCanvasSize();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(canvas.width, canvas.height);

// Create wave geometry
const geometry = new THREE.PlaneGeometry(40, 20, 64, 32);
const material = new THREE.MeshBasicMaterial({
    color: 0x4a90e2,
    wireframe: true,
    transparent: true,
    opacity: 0.12
});
const wave = new THREE.Mesh(geometry, material);
wave.rotation.x = -Math.PI / 2;
scene.add(wave);

camera.position.z = 8;
camera.position.y = 4;
camera.lookAt(0, 0, 0);

// Animation for Experiences
function animate() {
    requestAnimationFrame(animate);

    // Update wave vertices
    const time = Date.now() * 0.0004;
    const positions = geometry.attributes.position.array;
    
    for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        positions[i + 2] = Math.sin(x * 1.2 + time) * 0.3 + Math.sin(y * 1.2 + time) * 0.3;
    }
    
    geometry.attributes.position.needsUpdate = true;
    wave.rotation.z = Math.sin(time * 0.15) * 0.05;

    renderer.render(scene, camera);
}

// Handle window resize for Experiences
window.addEventListener('resize', () => {
    updateCanvasSize();
    camera.aspect = canvas.width / canvas.height;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.width, canvas.height);
});

animate();

// Three.js Wave Animation for Skills
const skillsCanvas = document.createElement('canvas');
skillsCanvas.id = 'skillsWaveCanvas';
document.querySelector('.skills').prepend(skillsCanvas);

const skillsSection = document.querySelector('.skills');

// Set canvas size to match skills section
function updateSkillsCanvasSize() {
    const rect = skillsSection.getBoundingClientRect();
    skillsCanvas.width = rect.width;
    skillsCanvas.height = rect.height;
}
updateSkillsCanvasSize();

const skillsScene = new THREE.Scene();
const skillsCamera = new THREE.PerspectiveCamera(75, skillsCanvas.width / skillsCanvas.height, 0.1, 1000);
const skillsRenderer = new THREE.WebGLRenderer({ canvas: skillsCanvas, alpha: true });
skillsRenderer.setSize(skillsCanvas.width, skillsCanvas.height);

// Create wave geometry for skills
const skillsGeometry = new THREE.PlaneGeometry(40, 20, 64, 32);
const skillsMaterial = new THREE.MeshBasicMaterial({
    color: 0x4a90e2,
    wireframe: true,
    transparent: true,
    opacity: 0.12
});
const skillsWave = new THREE.Mesh(skillsGeometry, skillsMaterial);
skillsWave.rotation.x = -Math.PI / 2;
skillsScene.add(skillsWave);

skillsCamera.position.z = 8;
skillsCamera.position.y = 4;
skillsCamera.lookAt(0, 0, 0);

// Animation for Skills
function animateSkills() {
    requestAnimationFrame(animateSkills);

    // Update wave vertices
    const time = Date.now() * 0.0004;
    const positions = skillsGeometry.attributes.position.array;
    
    for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        // Calculate distance from right middle point
        const dx = x - 20; // Right middle point x-coordinate
        const dy = y - 20;      // Center y-coordinate
        const distance = Math.sqrt(dx * dx + dy * dy) * 2.0;
        
        // Create ripple effect from right middle
        positions[i + 2] = Math.sin(distance * 0.5 - time * 2) * 0.4;
    }
    
    skillsGeometry.attributes.position.needsUpdate = true;
    skillsWave.rotation.z = Math.sin(time * 0.15) * 0.05;

    skillsRenderer.render(skillsScene, skillsCamera);
}

// Handle window resize for Skills
window.addEventListener('resize', () => {
    updateSkillsCanvasSize();
    skillsCamera.aspect = skillsCanvas.width / skillsCanvas.height;
    skillsCamera.updateProjectionMatrix();
    skillsRenderer.setSize(skillsCanvas.width, skillsCanvas.height);
});

animateSkills(); 