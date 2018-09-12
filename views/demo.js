/* global THREE, svgRenderer */

var camera, scene, renderer;
var geometry, material, mesh, meshes;

const canvasContainer = document.getElementById('canvas-container');


var mouse = {
  x: undefined,
  y: undefined
};

init();
animate();

window.addEventListener('mousemove', function(e) {
  mouse.x = e.screenX / window.WIDTH;
  mouse.y = e.screenY / window.HEIGHT;
});

window.addEventListener('resize', init);

function init() {

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    // camera.position.z = 1000;
    camera.position.z = 100;

    scene = new THREE.Scene();
    meshes = Array(20).map( (e, i) => {
      geometry = new THREE.BoxGeometry(200 + 2*i, 200 + 2*i, 200 + 2*i);
      material = new THREE.MeshBasicMaterial({
          color: 0xfff000,
          wireframe: true
      });
  
      mesh = new THREE.Mesh(geometry, material);
      // add new mesh to scene
      scene.add(mesh);
      return mesh;
    });

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    var button = document.getElementById("convert");
    button.addEventListener('click', svgSnapshot, false);
  
    if (canvasContainer.children.length !== 0) {
      removeChildrenFromNode(canvasContainer);
    } 
    canvasContainer.appendChild(renderer.domElement);

}

function animate() {
    // let count = 0;
    requestAnimationFrame(animate);
    // mesh.material.color = 0xfff000 + count;

    meshes[0].rotation.x += 0.05;
    meshes[0].rotation.y += 0.05;
    // camera.position.z -= 1;

    renderer.render(scene, camera);
    // count = ++count % 16;
}

function removeChildrenFromNode(node) {
	var fc = node.firstChild;

	while( fc ) {
		node.removeChild( fc );
		fc = node.firstChild;
	}
}

function svgSnapshot() {
	var svgContainer = document.getElementById("svg");
	removeChildrenFromNode(svgContainer);
	svgRenderer = new THREE.SVGRenderer();
	svgRenderer.setClearColor( 0xffffff );
	svgRenderer.setSize(800,800);
	svgRenderer.setQuality( 'high' );
	svgContainer.appendChild( svgRenderer.domElement );
	svgRenderer.render( scene, camera );
	svgRenderer.domElement.removeAttribute("width");
	svgRenderer.domElement.removeAttribute("height");

  var url = "data:image/svg+xml;utf8," + encodeURIComponent(document.getElementById('svg').innerHTML);
  var link = document.getElementById("downloadFile");
  link.download = "threejs-example.svg";
  link.href = url;
  link.click();
}