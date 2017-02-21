// From https://threejs.org/docs/index.html#Manual/Getting_Started/Creating_a_scene
var scene;
var camera
var renderer;
var cube;

var init = () => {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.shadowMap.enabled = true;

  document.body.appendChild(renderer.domElement);

  // Make a cube
  var geometry = new THREE.BoxGeometry(1,1,1);
  var material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    shading: THREE.FlatShading,
    overdraw: 0.5,
  });

  cube = new THREE.Mesh(geometry, material);

  scene.add(cube);

  // Ambient Light
  var ambient = new THREE.AmbientLight( 0x101010 );
  scene.add( ambient );

  // Directional Light
  var directionalLight = new THREE.DirectionalLight( 0xffffff );
  directionalLight.position.set( 0, -70, 100 ).normalize();
  scene.add( directionalLight );

  camera.position.z = 3;
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

init();

animate();
