// Theme Switching
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Set initial theme to dark if no theme is saved
if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'dark');
}

// Get the current theme
const currentTheme = localStorage.getItem('theme');

// Apply the theme
document.documentElement.setAttribute('data-theme', currentTheme);

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Update theme
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

// Three.js Cubes Animation for Skills
const skillsCanvas = document.createElement('canvas');
skillsCanvas.id = 'skillsCanvas';
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

// Add lights to the scene
const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Soft white light
skillsScene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xe3e3e3, 1); // Blue-tinted light
directionalLight.position.set(10, 10, 10);
skillsScene.add(directionalLight);

const pointLight = new THREE.PointLight(0xe0e0e0, 1, 100);
pointLight.position.set(-10, -10, -10);
skillsScene.add(pointLight);

// Create cubes
const cubes = [];
const numCubes = 20;
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshPhongMaterial({
    color: 0x4a90e2,
    transparent: true,
    opacity: 1.0,
    shininess: 10,
    specular: 0x4a90e2
});

for (let i = 0; i < numCubes; i++) {
    const size = Math.random() * 2 + 0.5;
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    
    // Random position
    cube.position.x = (Math.random() - 0.5) * 50;
    cube.position.y = (Math.random() - 0.5) * 30 + 15;
    cube.position.z = (Math.random() - 0.5) * 50;
    
    // Random rotation
    cube.rotation.x = Math.random() * Math.PI;
    cube.rotation.y = Math.random() * Math.PI;
    
    // Random scale
    cube.scale.set(size, size, size);
    
    // Store speed and direction
    cube.userData = {
        speed: Math.random() * 0.03 + 0.02,
        direction: new THREE.Vector3(
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02
        ),
        rotationSpeed: new THREE.Vector3(
            Math.random() * 0.02,
            Math.random() * 0.02,
            Math.random() * 0.02
        )
    };
    
    cubes.push(cube);
    skillsScene.add(cube);
}

skillsCamera.position.z = 25;
skillsCamera.position.y = 10;
skillsCamera.lookAt(0, 0, 0);

// Animation for Skills
function animateSkills() {
    requestAnimationFrame(animateSkills);

    // Update light positions
    const time = Date.now() * 0.001;
    directionalLight.position.x = Math.sin(time) * 15;
    directionalLight.position.y = Math.cos(time) * 15;
    pointLight.position.x = Math.cos(time * 0.5) * 15;
    pointLight.position.z = Math.sin(time * 0.5) * 15;

    // Camera rotation
    const radius = 35;
    const cameraSpeed = 0.1;
    const cameraTime = time * cameraSpeed;
    
    // Orbit camera around the scene
    skillsCamera.position.x = Math.sin(cameraTime) * radius;
    skillsCamera.position.z = Math.cos(cameraTime) * radius;
    skillsCamera.position.y = 15 + Math.sin(cameraTime * 0.5) * 5; // Slight vertical movement
    
    // Make camera look at the center
    skillsCamera.lookAt(0, 0, 0);

    // Update cube positions and rotations
    cubes.forEach(cube => {
        // Move cube
        cube.position.add(cube.userData.direction);
        
        // Rotate cube
        cube.rotation.x += cube.userData.rotationSpeed.x;
        cube.rotation.y += cube.userData.rotationSpeed.y;
        cube.rotation.z += cube.userData.rotationSpeed.z;
        
        // Bounce off boundaries
        if (Math.abs(cube.position.x) > 15) {
            cube.userData.direction.x *= -1;
        }
        if (Math.abs(cube.position.y) > 10) {
            cube.userData.direction.y *= -1;
        }
        if (Math.abs(cube.position.z) > 10) {
            cube.userData.direction.z *= -1;
        }
    });

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

// Scroll Animation for Skills
const skillItems = document.querySelectorAll('.skill-item');

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            // Unobserve after animation is triggered
            skillsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2, // Trigger when 20% of the item is visible
    rootMargin: '0px 0px -50px 0px' // Start animation slightly before the item comes into view
});

// Observe each skill item
skillItems.forEach(item => {
    skillsObserver.observe(item);
});

// Scroll Animation for All Sections
const animatedElements = [
    // Section titles
    ...document.querySelectorAll('.section-title'),
    
    // Summary section
    ...document.querySelectorAll('.summary-content h2'),
    ...document.querySelectorAll('.summary-content p'),
    document.querySelector('.profile-photo'),
    
    // Experiences section
    ...document.querySelectorAll('.timeline-item'),
    ...document.querySelectorAll('.timeline-content'),
    ...document.querySelectorAll('.timeline-dot'),
    
    // Education section
    document.querySelector('.education-card'),
    ...document.querySelectorAll('.course-tags span'),
    
    // Skills section
    document.querySelector('.tech'),
    document.querySelector('.coding'),
    
    // Contact section
    document.querySelector('.contact-container'),
    ...document.querySelectorAll('.contact-item')
];

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            // Unobserve after animation is triggered
            sectionObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all animated elements
animatedElements.forEach(element => {
    if (element) { // Check if element exists
        sectionObserver.observe(element);
    }
}); 

// Animated subtitle logic
document.addEventListener("DOMContentLoaded", function() {
    const titles = document.querySelectorAll('.animated-title .title-line');
    let current = 0;

    // Hide all except the first
    titles.forEach((el, idx) => {
        el.style.opacity = idx === 0 ? '1' : '0';
        el.style.transition = 'opacity 0.7s';
        el.style.position = 'absolute';
        el.style.left = 0;
        el.style.right = 0;
    });
    document.querySelector('.animated-title').style.position = 'relative';
    document.querySelector('.animated-title').style.height = titles[0].offsetHeight + 'px';

    setInterval(() => {
        titles[current].style.opacity = '0';
        current = (current + 1) % titles.length;
        titles[current].style.opacity = '1';
    }, 2000);
}); 