import * as THREE from 'three';

export class VectorsUtils {
  copyPosition(position: THREE.Vector3): THREE.Vector3 {
    return new THREE.Vector3(position.x, position.y, position.z);
  }

  isDefault(vector: THREE.Vector3): boolean {
    return vector.x === 0 && vector.y === 0 && vector.z === 0;
  }
}