import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { Sky } from 'three/examples/jsm/Addons.js'

/**
 * Base
 */
// Debug
const gui = new GUI()
gui.hide();

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader();


// Floor textures
const floorAlphaTexture = textureLoader.load("./floor/alpha.webp");
const floorColorTexture = textureLoader.load("./floor/ribbed_corduroy_1k/ribbed_corduroy_diff_1k.webp");
const floorARMTexture = textureLoader.load("./floor/ribbed_corduroy_1k/ribbed_corduroy_arm_1k.webp");
const floorNormalTexture = textureLoader.load("./floor/ribbed_corduroy_1k/ribbed_corduroy_nor_gl_1k.webp");
const floorDisplacementTexture = textureLoader.load("./floor/ribbed_corduroy_1k/ribbed_corduroy_disp_1k.webp");

const floorTilingX = 4;
const floorTilingY = 6;

floorColorTexture.repeat.set(floorTilingX, floorTilingY);
floorARMTexture.repeat.set(floorTilingX, floorTilingY);
floorNormalTexture.repeat.set(floorTilingX, floorTilingY);
floorDisplacementTexture.repeat.set(floorTilingX, floorTilingY);

floorColorTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorDisplacementTexture.wrapS = THREE.RepeatWrapping;

floorColorTexture.wrapT = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;

floorColorTexture.colorSpace = THREE.SRGBColorSpace;


// Wall Textures
const wallColorTexture = textureLoader.load("./walls/fabric_pattern_05_1k/fabric_pattern_05_col_03_1k.webp");
const wallARMTexture = textureLoader.load("./walls/fabric_pattern_05_1k/fabric_pattern_05_arm_1k.webp");
const wallNormalTexture = textureLoader.load("./walls/fabric_pattern_05_1k/fabric_pattern_05_nor_gl_1k.webp");

const wallTiling = {
    x: 3,
    y: 2,
};

gui.add(wallTiling, "x").min(-1).max(10).step(1).name("Wall Tiling X")
    .onChange(() => {
        wallColorTexture.repeat.x = wallTiling.x;
        wallARMTexture.repeat.x = wallTiling.x;
        wallNormalTexture.repeat.x = wallTiling.x;

    });
gui.add(wallTiling, "y").min(-1).max(10).step(1).name("Wall Tiling Y")
    .onChange(() => {
        wallColorTexture.repeat.y = wallTiling.y;
        wallARMTexture.repeat.y = wallTiling.y;
        wallNormalTexture.repeat.y = wallTiling.y;

    });

wallColorTexture.repeat.set(wallTiling.x, wallTiling.y);
wallARMTexture.repeat.set(wallTiling.x, wallTiling.y);
wallNormalTexture.repeat.set(wallTiling.x, wallTiling.y);

wallColorTexture.wrapS = THREE.RepeatWrapping;
wallARMTexture.wrapS = THREE.RepeatWrapping;
wallNormalTexture.wrapS = THREE.RepeatWrapping;

wallColorTexture.wrapT = THREE.RepeatWrapping;
wallARMTexture.wrapT = THREE.RepeatWrapping;
wallNormalTexture.wrapT = THREE.RepeatWrapping;

wallColorTexture.colorSpace = THREE.SRGBColorSpace;


// Roof Texture
// const roofColorTexture = textureLoader.load("./roof/hessian_230_1k/hessian_230_diff_1k.jpg");
// const roofARMTexture = textureLoader.load("./roof/hessian_230_1k/hessian_230_arm_1k.jpg");
// const roofNormalTexture = textureLoader.load("./roof/hessian_230_1k/hessian_230_nor_gl_1k.jpg");
// // const roofDisplacementTexture = textureLoader.load("./roof/roof_slates_03_1k/roof_slates_03_disp_1k.jpg");

const roofColorTexture = textureLoader.load("./grave/fabric_pattern_07_1k/fabric_pattern_07_col_1_1k.webp");
const roofARMTexture = textureLoader.load("./grave/fabric_pattern_07_1k/fabric_pattern_07_arm_1k.webp");
const roofNormalTexture = textureLoader.load("./grave/fabric_pattern_07_1k/fabric_pattern_07_nor_gl_1k.webp");
// const roofDisplacementTexture = textureLoader.load("./roof/roof_slates_03_1k/roof_slates_03_disp_1k.jpg");

const roofTiling = {
    x: 4,
};

gui.add(roofTiling, "x").min(0).max(5).step(0.25).name("Roof Tiling X")
    .onChange(() => {
        roofColorTexture.repeat.x = roofTiling.x;
        roofARMTexture.repeat.x = roofTiling.x;
        roofNormalTexture.repeat.x = roofTiling.x;
        // roofDisplacementTexture.repeat.x = roofTiling.x;
    });

roofColorTexture.repeat.set(roofTiling.x, 1);
roofARMTexture.repeat.set(roofTiling.x, 1);
roofNormalTexture.repeat.set(roofTiling.x, 1);
// roofDisplacementTexture.repeat.set(roofTiling.x, 1);

roofColorTexture.wrapS = THREE.RepeatWrapping;
roofARMTexture.wrapS = THREE.RepeatWrapping;
roofNormalTexture.wrapS = THREE.RepeatWrapping;
// roofDisplacementTexture.wrapS = THREE.RepeatWrapping;

roofColorTexture.colorSpace = THREE.SRGBColorSpace;


// Bush Textures
const bushColorTexture = textureLoader.load("./bush/hessian_230_1k/hessian_230_diff_1k.webp");
const bushARMTexture = textureLoader.load("./bush/hessian_230_1k/hessian_230_arm_1k.webp");
const bushNormalTexture = textureLoader.load("./bush/hessian_230_1k/hessian_230_nor_gl_1k.webp");

bushColorTexture.colorSpace = THREE.SRGBColorSpace;

const bushTiling = {
    x: 1,
    y: 1
};

bushColorTexture.repeat.set(bushTiling.x, bushTiling.y);
bushARMTexture.repeat.set(bushTiling.x, bushTiling.y);
bushNormalTexture.repeat.set(bushTiling.x, bushTiling.y);

bushColorTexture.wrapS = THREE.RepeatWrapping;
bushARMTexture.wrapS = THREE.RepeatWrapping;
bushNormalTexture.wrapS = THREE.RepeatWrapping;

bushColorTexture.wrapT = THREE.RepeatWrapping;
bushARMTexture.wrapT = THREE.RepeatWrapping;
bushNormalTexture.wrapT = THREE.RepeatWrapping;


// Grave Textures
const graveColorTexture = textureLoader.load("./grave/fabric_pattern_07_1k/fabric_pattern_07_col_1_1k.webp");
const graveARMTexture = textureLoader.load("./grave/fabric_pattern_07_1k/fabric_pattern_07_arm_1k.webp");
const graveNormalTexture = textureLoader.load("./grave/fabric_pattern_07_1k/fabric_pattern_07_nor_gl_1k.webp");

graveColorTexture.colorSpace = THREE.SRGBColorSpace;

const graveTiling = {
    x: 0.25,
    y: 0.5,
};

gui.add(graveTiling, "x").min(0).max(4).step(0.5).name("Grave Tiling X")
    .onChange(() =>{
        graveColorTexture.repeat.x = graveTiling.x;
        graveARMTexture.repeat.x = graveTiling.x;
        graveNormalTexture.repeat.x = graveTiling.x;
    });
gui.add(graveTiling, "y").min(0).max(4).step(0.5).name("Grave Tiling Y")
    .onChange(() =>{
        graveColorTexture.repeat.y = graveTiling.y;
        graveARMTexture.repeat.y = graveTiling.y;
        graveNormalTexture.repeat.y = graveTiling.y;
    });


graveColorTexture.repeat.set(graveTiling.x, graveTiling.y);
graveARMTexture.repeat.set(graveTiling.x, graveTiling.y);
graveNormalTexture.repeat.set(graveTiling.x, graveTiling.y);

graveColorTexture.wrapS = THREE.RepeatWrapping;
graveARMTexture.wrapS = THREE.RepeatWrapping;
graveNormalTexture.wrapS = THREE.RepeatWrapping;

graveColorTexture.wrapT = THREE.RepeatWrapping;
graveARMTexture.wrapT = THREE.RepeatWrapping;
graveNormalTexture.wrapT = THREE.RepeatWrapping;


// Door Texture
const doorColorTexture = textureLoader.load("./door/Fabric_Embroidery_001/Fabric_Embroidery_001_basecolor.webp");
const doorARMTexture = textureLoader.load("./door/Fabric_Embroidery_001/Fabric_Embroidery_001_ambientOcclusion.webp");
const doorNormalTexture = textureLoader.load("./door/Fabric_Embroidery_001/Fabric_Embroidery_001_normal.webp");
const doorAlphaTexture = textureLoader.load("./door/premade/alpha.jpg");
// const doorDispTexture = textureLoader.load("./door/Fabric_Embroidery_001/Fabric_Embroidery_001_height.png");

doorColorTexture.colorSpace = THREE.SRGBColorSpace;

const doorTiling = {
    x: 1,
    y: 1,
};

gui.add(doorTiling, "x").min(0).max(4).step(0.5).name("Door Tiling X")
    .onChange(() =>{
        doorColorTexture.repeat.x = doorTiling.x;
        doorARMTexture.repeat.x = doorTiling.x;
        doorNormalTexture.repeat.x = doorTiling.x;door
        // doorDispTexture.repeat.x = doorTiling.x;door
    });
gui.add(doorTiling, "y").min(0).max(4).step(0.5).name("Door Tiling Y")
    .onChange(() =>{
        doorColorTexture.repeat.y = doorTiling.y;
        doorARMTexture.repeat.y = doorTiling.y;
        doorNormalTexture.repeat.y = doorTiling.y;
        // doorDispTexture.repeat.y = doorTiling.y;
    });


doorColorTexture.repeat.set(doorTiling.x, doorTiling.y);
doorARMTexture.repeat.set(doorTiling.x, doorTiling.y);
doorNormalTexture.repeat.set(doorTiling.x, doorTiling.y);
// doorDispTexture.repeat.set(doorTiling.x, doorTiling.y);

doorColorTexture.wrapS = THREE.RepeatWrapping;
doorARMTexture.wrapS = THREE.RepeatWrapping;
doorNormalTexture.wrapS = THREE.RepeatWrapping;
// doorDispTexture.wrapS = THREE.RepeatWrapping;

doorColorTexture.wrapT = THREE.RepeatWrapping;
doorARMTexture.wrapT = THREE.RepeatWrapping;
doorNormalTexture.wrapT = THREE.RepeatWrapping;
// doorDispTexture.wrapT = THREE.RepeatWrapping;

/**
 * House
 */

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100, 100),
    new THREE.MeshStandardMaterial({
        transparent: true,
        alphaMap: floorAlphaTexture,
        map: floorColorTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.03,
        displacementBias: 0.008,
        // color: "#dcffcf",
    })
);
floor.rotation.x = - Math.PI * 0.5;
scene.add(floor);


// House container
const house = new THREE.Group();
scene.add(house);


// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4, 20, 20, 20),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture, 
        aoMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        metalnessMap: wallARMTexture,
        normalMap: wallNormalTexture,

    })
);
walls.position.y = walls.geometry.parameters.height * 0.5;
house.add(walls);


// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1.5, 4),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        aoMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        normalMap: roofNormalTexture,
        // displacementMap: roofDisplacementTexture,
        displacementScale: 0,
        displacementBias: 0,
    })
);
roof.position.y = walls.geometry.parameters.height + roof.geometry.parameters.height * 0.5 + 0.001;
roof.rotation.y = Math.PI * 0.25;
house.add(roof);


// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorARMTexture,
        roughnessMap: doorARMTexture,
        metalnessMap: doorARMTexture,
        normalMap: doorNormalTexture,
    })
);
door.position.y = 1;
door.position.z = (walls.geometry.parameters.depth * 0.5) + 0.01;
house.add(door);


// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
    map: bushColorTexture,
    aoMap: bushARMTexture,
    roughnessMap: bushARMTexture,
    metalnessMap: bushARMTexture,
    normalMap: bushNormalTexture,
});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.setScalar(0.5);
bush1.position.set(0.8, 0.2, 2.2);
bush1.rotation.x = -0.75;

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.setScalar(0.25);
bush2.position.set(1.4, 0.1, 2.1);
bush2.rotation.x = -1;

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.setScalar(0.4);
bush3.position.set(-0.8, 0.1, 2.2);
bush3.rotation.x = -1.5;

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.setScalar(0.15);
bush4.position.set(-1, 0.05, 2.6);
bush4.rotation.x = -0.75;


house.add(bush1, bush2, bush3, bush4);


// Graves
// 1. Create a 2D shape (the cross-section)
const graveShape = new THREE.Shape();
graveShape.moveTo(-0.3, -0.4);  // Start bottom-left
graveShape.lineTo(0.3, -0.4);   // Bottom-right
graveShape.lineTo(0.3, 0.4);    // Top-right
graveShape.lineTo(-0.3, 0.4);   // Top-left
graveShape.lineTo(-0.3, -0.4);  // Close the shape

// 2. Define extrusion settings
const extrudeSettings = {
    depth: 0.1,           // How far to extrude (the "thickness")
    bevelEnabled: true   // No beveled edges
};

// 3. Create the geometry
const graveGeometry = new THREE.ExtrudeGeometry(graveShape, extrudeSettings);

const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture,
    normalMap: graveNormalTexture,
});

const graveGroup = new THREE.Group();
scene.add(graveGroup);

for(let i = 0; i < 30; i++)
{
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 4;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    const graveMesh = new THREE.Mesh(graveGeometry, graveMaterial);
    graveMesh.position.x = x;
    graveMesh.position.y = Math.random() * 0.4;
    graveMesh.position.z = z;
    graveMesh.rotation.x = (Math.random() - 0.5) * 0.4;
    graveMesh.rotation.y = (Math.random() - 0.5) * 0.4;
    graveMesh.rotation.z = (Math.random() - 0.5) * 0.4;


    graveGroup.add(graveMesh);
}


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#fef5dc', 0.80)

gui.add(ambientLight, "intensity").min(0).max(10).step(0.01).name("Ambient Light Intensity");

const ambientLightParameters = {
    ambientColor: "#fef5dc"
};

gui.addColor(ambientLightParameters, "ambientColor")
    .name("Ambient Light Color")
    .onChange((value) =>{
        ambientLight.color.set(value)
    });

scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#fff8d8', 1);
directionalLight.position.set(2, 4, -2)
// scene.add(directionalLight)

// Point Light Door
const pointLight = new THREE.PointLight("#fea120", 1.76);
const pointLightHelper = new THREE.PointLightHelper(pointLight);
const pointLightParameters = {
    pointColor: "#fdd091"
};

pointLight.position.set(0, door.geometry.parameters.height + 0.1, walls.geometry.parameters.depth * 0.6);

gui.add(pointLight, "intensity").min(0).max(10).step(0.01).name("Point Light Intensity");

gui.addColor(pointLightParameters, "pointColor")
    .name("Point Light Color")
    .onChange((value) => {
        pointLight.color.set(value)
    });


house.add(pointLight);


/**
 * Ghosts (Moving Lights)
 */
const ghost1 = new THREE.PointLight("#ffd08f", 10, 0, 1);
const ghost1Helper = new THREE.PointLightHelper(ghost1);






scene.add(ghost1);



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Shadows
 */
// Renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

// Cast and Receive Shadows
directionalLight.castShadow = true;
ghost1.castShadow = true;

walls.castShadow = true;
walls.receiveShadow = true;

bush1.receiveShadow = true;

roof.castShadow = true;

floor.receiveShadow = true;

for(const graveMesh of graveGroup.children)
{
    graveMesh.castShadow = true;
    graveMesh.receiveShadow = true;
}

// Mapping
directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.mapSize.far = 10;


/**
 * Sky
 */
const sky = new Sky();
sky.scale.setScalar(100);
scene.add(sky);

sky.material.uniforms["turbidity"].value = 15;        // More haze/atmosphere
sky.material.uniforms["rayleigh"].value = 2;          // Less intense blue
sky.material.uniforms["mieCoefficient"].value = 0.005; // Subtle haze
sky.material.uniforms["mieDirectionalG"].value = 0.8; // Less directional
sky.material.uniforms["sunPosition"].value.set(0.5, 0.4, -100); // Lower sun angle


/**
 * Fog
 */
scene.fog = new THREE.FogExp2("#dbb1ab", 0.05);



/**
 * Animate
 */
const timer = new Timer()

const originalSunPosition = new THREE.Vector3(0.5, 0.4, 100);

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Update controls
    controls.update()

    //Update Ghosts
    const GhostAngle = elapsedTime * -0.25;
    ghost1.position.x = Math.sin(GhostAngle) * 8;
    ghost1.position.y = Math.abs(Math.sin(GhostAngle) * 1) + 1;
    ghost1.position.z = Math.cos(GhostAngle) * 8;

    //Rotate Sky
    sky.rotation.y = elapsedTime * -0.25;
    const rotatedSun = originalSunPosition.clone();
    rotatedSun.applyAxisAngle(new THREE.Vector3(0, 1, 0), sky.rotation.y);
    sky.material.uniforms["sunPosition"].value.copy(rotatedSun);
    


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()