// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load textures
const textureLoader = new THREE.TextureLoader();
const grassTexture = textureLoader.load('textures/grass.png');
const dirtTexture = textureLoader.load('textures/dirt.png');
const stoneTexture = textureLoader.load('textures/stone.png');

// Create a basic block geometry for the world
const blockSize = 1;

// Function to create blocks
function createBlock(x, y, z, texture) {
    const geometry = new THREE.BoxGeometry(blockSize, blockSize, blockSize);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const block = new THREE.Mesh(geometry, material);
    block.position.set(x, y, z);
    scene.add(block);
}

// Generate a small 5x5 block grid (like Minecraft terrain)
for (let x = -2; x < 3; x++) {
    for (let z = -2; z < 3; z++) {
        const texture = (x + z) % 2 === 0 ? grassTexture : dirtTexture; // Alternating block types
        createBlock(x, 0, z, texture); // Grass and dirt blocks on the ground
    }
}

// Create stone blocks in the air for demonstration
createBlock(0, 2, 0, stoneTexture); // One stone block

// Set up camera
camera.position.set(0, 5, 10);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// Add a simple directional light to simulate sunlight
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

// Animation loop to render the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
