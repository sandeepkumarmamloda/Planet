// // === GSAP timeline ======
// let tl = gsap.timeline({ paused: true });
// // ===============three.js==============================
// import * as THREE from "three";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
// import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
// import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
// import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
// // import getStarfield from "./starfield.js";
// // === Scene ===
// let scene = new THREE.Scene();

// const can=document.querySelector("canvas");

// // === Camera ===
// let camera = new THREE.PerspectiveCamera(45, can.clientWidth / can.clientHeight, 0.8, 100000);
// camera.position.set(0, 0, 20);
// scene.add(camera);

// // === Lights ===
// let ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
// scene.add(ambientLight);

// let pointLight = new THREE.PointLight(0xffffff, 50, 80);
// pointLight.position.set(0, 0, -60);
// scene.add(pointLight);

// // === Renderer ===
// let renderer = new THREE.WebGLRenderer({
//     canvas: can,
//     antialias: true,
// });
// renderer.setSize(window.innerWidth, window.innerHeight,false);
// renderer.shadowMap.enabled = true;
// renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.toneMappingExposure = 0.8;

// // === Bloom Composer ===
// const renderScene = new RenderPass(scene, camera);
// const bloomPass = new UnrealBloomPass(
//     new THREE.Vector2(window.innerWidth, window.innerHeight),
//     1.5, // strength
//     0.4, // radius
//     0.1  // threshold
// );
// const composer = new EffectComposer(renderer);
// composer.addPass(renderScene);
// composer.addPass(bloomPass);

// // === Clock ===
// let clock = new THREE.Clock();

// // === Loaders ===
// // const dracoLoader = new DRACOLoader();
// // dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
// let loader = new GLTFLoader();
// // loader.setDRACOLoader(dracoLoader);
// let texture = new THREE.TextureLoader();

// // === Galaxy Background ===galaxy.jpg
// texture.load("https://files.catbox.moe/3pjms6.jpg",
//     function (loadedTexture) {
//         const geometry = new THREE.SphereGeometry(10000, 64, 64);
//         const material = new THREE.MeshBasicMaterial({
//             map: loadedTexture,
//             side: THREE.BackSide
//         });
//         const backgroundSphere = new THREE.Mesh(geometry, material);
//         scene.add(backgroundSphere);
//     },
//     undefined,
//     function (error) {
//         console.log("Texture load error:", error);
//     }
// );

// // === Earth ===
// let earthAnimation = null;
// let earth = null;
// loader.load("earth.glb", function (module) {
//     earth = module.scene;
//     earth.scale.set(0.3, 0.3, 0.3);
//     // earth.position.set(3.5,1.7,0);
//     scene.add(earth);
//     earthAnimation = new THREE.AnimationMixer(earth);
//     module.animations.forEach((clip) => {
//         let actions=earthAnimation.clipAction(clip);
//         actions.setEffectiveTimeScale(0.1);
//         actions.play();
//     });
// }, 
// function (xhr) {
//     let percent = (xhr.loaded / xhr.total) * 100;
//     showLoadingProgress(percent);
//   }
//   , function (error) {
//     console.error("Earth Load Error:", error);
// });
// let lastProgress = 0;

// function showLoadingProgress(percent) {
//   percent = Math.min(percent, 100);
//   if (percent - lastProgress >= 1 || percent === 100) { 
//     console.log(`Loading: ${percent.toFixed(2)}%`);
//     lastProgress = percent;
//   }
// }


// // === Sun ===
// let sunAnimation = null;
// loader.load("sun.glb", function (module) {
//     const sun = module.scene;
//     sun.position.set(0, 0, -4000);
//     sun.scale.set(40, 40, 40);
//     scene.add(sun);

//     // Emissive material to trigger bloom
//     sun.traverse((child) => {
//         if (child.isMesh) {
//             child.material.emissive = new THREE.Color(0xffff00);
//             child.material.emissiveIntensity = 20;
//             child.material.needsUpdate = true;
//         }
//     });

//     // Optional: glow sprite (optional visual boost)
//     texture.load("lensflare.png", function (flareTexture) {
//         const spriteMaterial = new THREE.SpriteMaterial({
//             map: flareTexture,
//             color: 0xffffaa,
//             transparent: true,
//             opacity: 1,
//             depthWrite: false
//         });
//         const sprite = new THREE.Sprite(spriteMaterial);
//         sprite.scale.set(8, 8, 1);
//         sprite.position.copy(sun.position);
//         scene.add(sprite);
//     });

//     // Animate sun if applicable
//     sunAnimation = new THREE.AnimationMixer(sun);
//     module.animations.forEach((clip) => {
//         sunAnimation.clipAction(clip).play();
//     });

// }, undefined, function (error) {
//     console.error("Sun Load Error:", error);
// });

// // === Camera Wheel Control ===
// let radius = 40;
// let angle = 0;
// let targetRadius = radius;
// let targetAngle = angle;

// window.addEventListener("wheel", function (event) {
//     let delta = event.deltaY;

//     if (targetRadius == 5) {

//     } else {
//         // Inside zoom range — prevent page scroll
//         event.preventDefault();
        
//         // Update zoom target
//         targetRadius -= delta * 0.02;
//         targetAngle -= delta * 0.002;
//         targetRadius = Math.max(5, Math.min(200, targetRadius));
//     }
// }, { passive: false });

// // === Mobile Touch Scroll Support ===
// let lastTouchY = null;

// window.addEventListener("touchstart", (event) => {
//     if (event.touches.length === 1) {
//         lastTouchY = event.touches[0].clientY;
//     }
// }, { passive: true });

// window.addEventListener("touchmove", (event) => {
//     if (event.touches.length === 1 && lastTouchY !== null) {
//         let currentY = event.touches[0].clientY;
//         let deltaY = currentY - lastTouchY;

//         // Simulate wheel scroll (invert direction for natural feel)
//         targetRadius += deltaY * 0.05;
//         targetAngle += deltaY * 0.002;

//         // Clamp the radius like in wheel event
//         targetRadius = Math.max(5, Math.min(200, targetRadius));

//         lastTouchY = currentY;
//     }
// }, { passive: true });

// window.addEventListener("touchend", () => {
//     lastTouchY = null;
// });
// // audio-started
// const audioListener=new THREE.AudioListener();
// camera.add(audioListener);

// const audioObject=new THREE.Audio(audioListener);
// scene.add(audioObject);

// const audioLoader=new THREE.AudioLoader();


// let lastRadius = radius;

// function animate() {
//     requestAnimationFrame(animate);
//     const delta = clock.getDelta();

//     // Smooth interpolation toward target
//     radius += (targetRadius - radius) * 0.008;
//     angle += (targetAngle - angle) * 0.008;

//     // Update camera position
//     camera.position.x = Math.sin(angle) * radius;
//     camera.position.z = Math.cos(angle) * radius;

//     if (earth) camera.lookAt(earth.position);

//     // Update animations
//     if (earthAnimation) earthAnimation.update(delta);
//     if (sunAnimation) sunAnimation.update(delta);

//     let normalizedZoom = (40 - radius) / (40 - 5);
//     normalizedZoom = Math.max(0, Math.min(1, normalizedZoom));

//     if (typeof tl !== "undefined" && tl) {
//         tl.progress(normalizedZoom);
//     }

//     composer.render();
// }
// animate();
// window.addEventListener('resize', () => {
//   camera.aspect=can.clientWidth/can.clientHeight;
//   camera.updateProjectionMatrix();
// });

// // =====gsap-started======
// let items = document.querySelectorAll(".items");

// items.forEach((singleItem, idx) => {
//   if (idx === items.length - 1) {
//     tl.to(singleItem, {
//       opacity: 0,
//       zIndex: 1,
//       duration: 0,
//       delay: 0,
//     });
//   } else {
//     tl.to(singleItem, {
//       opacity: 1,
//       zIndex: 1,
//       duration: 1,
//     });
//     tl.to(singleItem, {
//       opacity: 0,
//       zIndex: 0,
//       duration: 1,
//     });
//   }
// });
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

let tl = gsap.timeline({ paused: true ,yoyo:true ,repeat:-1 });

// === Scene ===
let scene = new THREE.Scene();
const can = document.querySelector("canvas");

// === Camera ===
let camera = new THREE.PerspectiveCamera(45, can.clientWidth / can.clientHeight, 0.8, 500);
camera.position.set(0, 0, 20);
scene.add(camera);

// === Lights ===
let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// === Renderer ===
let renderer = new THREE.WebGLRenderer({ canvas: can, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight, false);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.4;
renderer.outputColorSpace = THREE.SRGBColorSpace;

// === Bloom Composer ===
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.9,    // strength
    0.7,    // radius
    0.2     // threshold
);
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

// === Milky Way Skybox ===
const skyTexture = new THREE.TextureLoader().load('https://www.eso.org/public/archives/images/large/eso0932a.jpg');
const skyGeometry = new THREE.SphereGeometry(8000, 60, 40);
skyGeometry.scale(-1, 1, 1);
const skyMaterial = new THREE.MeshBasicMaterial({
    map: skyTexture,
    depthWrite: false,
    side: THREE.BackSide
});
const skySphere = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(skySphere);

let mouseX = 0, mouseY = 0;
window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.0005; // Sensitivity control
    mouseY = (e.clientY - window.innerHeight / 2) * 0.0005;
});
// === Star Field (ALL STARS NOW WITHIN 500 RANGE!) ===
let starSystem, brightStarSystem;
function addStars() {
    // Better star sprite texture (soft glow wala, bloom ke liye perfect)
    const starTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp2.png');

    const starMaterial = new THREE.ShaderMaterial({
        uniforms: {
            pointTexture: { value: starTexture },
            time: { value: 0 },
            scale: { value: 1.0 } // Bloom ke saath scale adjust karne ke liye
        },
        vertexShader: `
            attribute float size;
            attribute float aRandom;
            attribute vec3 customColor;
            
            varying vec3 vColor;
            varying float vOpacity;
            
            uniform float time;
            
            void main() {
                vColor = customColor;
                
                // Realistic twinkle: slower aur natural
                float freq = 0.8 + aRandom * 1.2;
                float phase = aRandom * 6.28;
                float twinkle = sin(time * freq + phase) * 0.3 + 0.7;
                twinkle = twinkle * twinkle; // Squared for sharper peaks
                
                vOpacity = twinkle;
                
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = size * twinkle * (300.0 / -mvPosition.z); // Distance-based size + twinkle
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            uniform sampler2D pointTexture;
            varying vec3 vColor;
            varying float vOpacity;
            
            void main() {
                vec4 texColor = texture2D(pointTexture, gl_PointCoord);
                gl_FragColor = vec4(vColor * texColor.rgb, texColor.a * vOpacity);
                gl_FragColor = gl_FragColor * vec4(1.0, 1.0, 1.0, 1.0); // Additive feel
            }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexColors: true
    });

    const starCount = 4000; // Zyada stars = denser realistic sky
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    const randoms = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        
        // Spherical distribution (100-500 range jaise pehle)
        const radius = 100 + Math.random() * 400;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i3]     = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);

        // Realistic star colors (blue-white to yellow-white)
        const temperature = Math.random();
        let r, g, b;
        if (temperature > 0.7) {       // Hot blue-white stars
            r = 0.8 + Math.random() * 0.2;
            g = 0.9 + Math.random() * 0.1;
            b = 1.0 + Math.random() * 0.2;
        } else if (temperature < 0.3) { // Cooler yellow-white
            r = 1.0 + Math.random() * 0.1;
            g = 0.95 + Math.random() * 0.05;
            b = 0.8;
        } else {                       // Standard white
            r = g = b = 1.0;
        }

        colors[i3]     = r;
        colors[i3 + 1] = g;
        colors[i3 + 2] = b;

        // Size variation (bigger = brighter)
        sizes[i] = 3 + Math.random() * 12;

        randoms[i] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3)); // renamed from 'color'
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

    starSystem = new THREE.Points(geometry, starMaterial);
    scene.add(starSystem);
}
addStars();

// === Nebula Clouds (Also fixed to 500 range!) ===
let nebulaSystem;
function addNebula() {
    const count = 3000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        // ⭐ FIXED: Nebula bhi 500 range mein hi!
        const radius = 150 + Math.random() * 350;  // 150-500 range (tight around center)
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i3]     = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.5;
        positions[i3 + 2] = radius * Math.cos(phi);
        colors[i3]     = 0.3 + Math.random() * 0.5;
        colors[i3 + 1] = 0.1 + Math.random() * 0.3;
        colors[i3 + 2] = 0.6 + Math.random() * 0.4;
        sizes[i] = 60 + Math.random() * 100;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const nebulaTexture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/cloud.png');
    const nebulaMaterial = new THREE.PointsMaterial({
        map: nebulaTexture,
        size: 100,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    nebulaSystem = new THREE.Points(geometry, nebulaMaterial);
    scene.add(nebulaSystem);
}
addNebula();

// === Models ===
let loader = new GLTFLoader();
let clock = new THREE.Clock();
let earth = null;
let earthAnimation = null;
loader.load("https://cdn.shopify.com/3d/models/771d8e46a46954f4/earth-2.glb", function (module) {
    earth = module.scene;
    scene.add(earth);
    earthAnimation = new THREE.AnimationMixer(earth);
    module.animations.forEach((clip) => earthAnimation.clipAction(clip).play());
});

let sunAnimation = null;
loader.load("https://cdn.shopify.com/3d/models/99b7e8e634b4e542/the_sun.glb", function (module) {
    const sun = module.scene;
    sun.position.set(-44, -34, -500);
    sun.scale.set(45, 45, 45);
    scene.add(sun);
    sun.traverse((child) => {
        if (child.isMesh) {
            child.material.emissive = new THREE.Color(0xffaa00);
            child.material.emissiveIntensity = 100;
        }
    });
    sunAnimation = new THREE.AnimationMixer(sun);
    module.animations.forEach((clip) => sunAnimation.clipAction(clip).play());
});

// === Camera Controls ===
let radius = 40;
let angle = 0;
let targetRadius = radius;
let targetAngle = angle;
let isCanvasCentered = false;

const centerObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            isCanvasCentered = entry.isIntersecting;
        });
    },
    { root: null, rootMargin: "0% 0% -100% 0%", threshold: 0 }
);
centerObserver.observe(can);

window.addEventListener("wheel", (event) => {
    if (!isCanvasCentered) return;
    handleScroll(event.deltaY);
}, { passive: true });

function handleScroll(deltaY) {
    targetRadius -= deltaY * 0.02;
    targetAngle  -= deltaY * 0.002;
    targetRadius = Math.max(5, Math.min(50, targetRadius)); // target को clamp
}

let touchStartY = 0;
let isTouching = false;

can.addEventListener("touchstart", (e) => {
    if (!isCanvasCentered) return;
    touchStartY = e.touches[0].clientY;
    isTouching = true;
}, { passive: true });

can.addEventListener("touchmove", (e) => {
    if (!isTouching || !isCanvasCentered) return;
    const currentY = e.touches[0].clientY;
    const deltaY = touchStartY - currentY;
    touchStartY = currentY;
    handleScroll(deltaY);
}, { passive: true });

can.addEventListener("touchend", () => {
    isTouching = false;
});

// === GSAP Timeline (Scrub Animation) ===
let items = document.querySelectorAll(".items");

items.forEach((singleItem, idx) => {
  // Agar last item hai toh use timeline ke end mein handle karein
  if (idx === items.length - 1) {
    tl.set(singleItem, {
      opacity: 0,
      zIndex: 1,
    });
  } else {
    // 1. Pehle item ko visible karein
    tl.to(singleItem, {
      opacity: 1,
      zIndex: 1,       // Thoda high z-index taaki ye sabke upar dikhe
      duration: 1,
      ease: "power2.inOut"
    })
    // 2. Phir ussi item ko hide karein (Next item ke aane se pehle)
    .to(singleItem, {
      opacity: 0,
      zIndex: 0,
      duration: 1,
      ease: "power2.inOut"
    }, "-=0.5"); // Smooth overlap for better flow
  }
});

// === Animate Loop ===
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();

    // Smooth camera movement
    radius += (targetRadius - radius) * 0.08;
    angle += (targetAngle - angle) * 0.05;

    // <<< महत्वपूर्ण: actual radius को भी clamp करो >>>
    radius = Math.max(5, Math.min(200, radius));

    camera.position.x = Math.sin(angle) * radius;
    camera.position.z = Math.cos(angle) * radius;
    if (earth) camera.lookAt(earth.position);

    if (starSystem) {
        starSystem.rotation.y += 0.0003;  // Slightly faster rotation since closer
        starSystem.material.uniforms.time.value = elapsed;
    }
    if (brightStarSystem) {
        brightStarSystem.rotation.y += 0.0003;
        brightStarSystem.material.uniforms.time.value = elapsed;
    }
    if (nebulaSystem) {
        nebulaSystem.rotation.y += 0.0001;  // Slower nebula rotation
        nebulaSystem.rotation.x += 0.00005;
    }

    if (earthAnimation) earthAnimation.update(delta);
    if (sunAnimation) sunAnimation.update(delta);
    if (starSystem) {
        // Subtle Parallax: Stars mouse ki direction mein halka move karenge
        starSystem.rotation.y += 0.0002; // Auto rotation
        starSystem.position.x += (mouseX - starSystem.position.x) * 0.05;
        starSystem.position.y += (-mouseY - starSystem.position.y) * 0.05;
        
        starSystem.material.uniforms.time.value = elapsed;
    }
    // GSAP Scrub Animation
    let normalizedZoom = (40 - radius) / 35;
    normalizedZoom = Math.max(0, Math.min(1, normalizedZoom));

    gsap.to(tl, {
        progress: normalizedZoom,
        duration: 0.8,
        ease: "power2.out"
    });

    composer.render();
}
animate();

// === Resize ===
window.addEventListener('resize', () => {
    camera.aspect = can.clientWidth / can.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.setPixelRatio(window.devicePixelRatio);
    composer.setSize(window.innerWidth, window.innerHeight);
});