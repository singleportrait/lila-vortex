// From https://threejs.org/docs/index.html#Manual/Getting_Started/Creating_a_scene
var scene;
var camera
var renderer;
var cube;

var init = () => {
  // Scene, camera, renderer
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 3;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  // Fog
  scene.fog = new THREE.FogExp2(0x999999, 0.002);
  renderer.setClearColor(scene.fog.color);

  document.body.appendChild(renderer.domElement);

  // Control the camera
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.minDistance = 1.5;
  controls.maxDistance = 500;
  //controls.maxPolarAngle = Math.PI/ 1.5;

  // Try texture, it doesn't work right out of the box
  var texture = new THREE.TextureLoader();
  texture.crossOrigin = '';
  texture.load('images/speckle.png');

  // Use an image instead
  var image = THREE.ImageUtils.loadTexture('images/speckle.png');

  // Make a cube
  var geometry = new THREE.BoxBufferGeometry(10, 10, 10);
  var material = new THREE.MeshPhongMaterial({
    //map: texture,
    map: image,
    //color: 0x00ff00,
    color: 0x99a7ee,
    specular: 0x666666, // shininess from #fff (shiniest) to #000 (matte)
    shading: THREE.FlatShading,
    overdraw: 0.5,
  });

  var redMaterial = new THREE.MeshPhongMaterial({ color: 0xff00ff, shading: THREE.FlatShading, side: THREE.DoubleSide });
  object = new THREE.Mesh(new THREE.RingGeometry(10, 50, 20, 5, 0, Math.PI * 2), redMaterial);
  scene.add(object);

  object = new THREE.Mesh( new THREE.TorusGeometry(25, 8, 360, 720), material);
  object.position.set(-20, 0, 40);
  scene.add(object);

  //cube = new THREE.Mesh(geometry, material);
  //scene.add(cube);

  // Add a bunch of cubes instead
  for (var i = 0; i < 500; i ++) {
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 500;
    mesh.position.y = (Math.random() - 0.5) * 500;
    mesh.position.z = (Math.random() - 0.5) * 500;
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;
    scene.add(mesh);
  }

  // Rotation uses radians
  // cube.rotation.x = Math.PI / 4; // 90deg
  // cube.rotation.y = Math.PI / 2; // 90deg

  // Ambient Light
  var ambient = new THREE.AmbientLight(0xcccccc);
  scene.add(ambient);

  // 2 Directional Lights
  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1, 1, 1);
  scene.add(light);
  light = new THREE.DirectionalLight(0x002288);
  light.position.set(-1, -1, -1);
  scene.add(light);

  // Axis display
  scene.add(new THREE.AxisHelper(20));

  window.addEventListener('resize', onWindowResize, false);
};

// Render the scene
var render = function() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

// Animate the scene, from here: https://threejs.org/examples/#webgl_geometry_cube
var animate = () => {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.005;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

// Resize canvas on browser resize
var onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

init();

render();
//animate();
