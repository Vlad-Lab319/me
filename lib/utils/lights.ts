import * as THREE from 'three';

const ambientLight = new THREE.AmbientLight(0x404040, 0.3);

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-200, 220, -100);
spotLight.castShadow = true;
spotLight.intensity = 10;
spotLight.angle = 0.1;
spotLight.shadow.mapSize.width = 2048;
spotLight.shadow.mapSize.height = 2048;

const spotLight2 = new THREE.SpotLight(0xffffff);
spotLight2.position.set(-250, 120, -200);
spotLight2.castShadow = true;
spotLight2.intensity = 1;
spotLight2.angle = 0.1;
spotLight2.shadow.mapSize.width = 50;
spotLight2.shadow.mapSize.height = 50;

const spotLight3 = new THREE.SpotLight(0xffffff);
spotLight3.position.set(250, 120, 200);
spotLight3.castShadow = true;
spotLight3.intensity = 1;
spotLight3.angle = 0.1;

spotLight3.shadow.mapSize.width = 50;
spotLight3.shadow.mapSize.height = 50;

export {
  ambientLight, 
  spotLight,
  spotLight2,
  spotLight3,
}
