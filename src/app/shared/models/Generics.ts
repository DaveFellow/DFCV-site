export interface Marker {
    position: THREE.Vector3;
    lookAt: THREE.Vector3;
}

export interface MarkersData {
    [key: string]: Marker;
}