import * as THREE from 'three';
import { VectorsUtils } from '../../utils/vectors';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Marker, MarkersData } from '../../models/Generics';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { NgZone } from '@angular/core';

export class Scene {
  public readonly ngZone: NgZone;
  public readonly renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  public readonly camera = new THREE.PerspectiveCamera();
  public readonly scene = new THREE.Scene();
  private readonly vectorsUtils: VectorsUtils;

  private _characterModel!: GLTF;
  public get characterModel(): GLTF { return this._characterModel; }
  private _characterAnimMixer!: THREE.AnimationMixer;
  public get characterAnimMixer(): THREE.AnimationMixer { return this._characterAnimMixer; }
  private _characterMesh!: THREE.Mesh;
  public get characterMesh(): THREE.Mesh { return this._characterMesh; }

  public markers!: MarkersData;
  private readonly markerTracker: THREE.ArrowHelper = new THREE.ArrowHelper;
  private readonly markerTrackLerp: THREE.Vector3 = new THREE.Vector3;
  public markerTrackLerpFromPos: THREE.Vector3 = new THREE.Vector3;

  public orbitControls: OrbitControls = new OrbitControls(this.camera, this.renderer.domElement);
  public lastOrbitPosition!: THREE.Vector3;

  private readonly targetMarkers: { [key: string]: Marker } = {
    prev: { position: new THREE.Vector3, lookAt: new THREE.Vector3 },
    next: { position: new THREE.Vector3, lookAt: new THREE.Vector3 }
  }

  private loadedSceneCallback = (): void => {};
  private modelSetupProgress = 0;

  public get prevMarker(): Marker { return this.targetMarkers['prev']; }
  public get nextMarker(): Marker { return this.targetMarkers['next']; }
  public prevMarkerIsValid = (axis: 'position' | 'lookAt'): boolean => this.vectorsUtils.isDefault(this.prevMarker[axis]) == false;
  public nextMarkerIsValid = (axis: 'position' | 'lookAt'): boolean => this.vectorsUtils.isDefault(this.nextMarker[axis]) == false;

  public canControl: boolean = false;

  private ready: boolean = false;
  public get isReady() { return this.ready; }

  // Debug members
  private readonly _debugCamPosition: THREE.Mesh = new THREE.Mesh;
  private readonly _debugCamPositionAxes: THREE.AxesHelper = new THREE.AxesHelper(20);
  private readonly _debugCamTargetHelper = new THREE.Mesh;
  _debug: boolean = false;
  // Debug members END

  constructor(ngZone: NgZone) {
    this.vectorsUtils = new VectorsUtils;
    this.ngZone = ngZone;
  }

  render(): void {
    if (!this.renderer) return;
    this.renderer.render(this.scene, this.camera);
  }

  public setup(callback: () => void = () => {}): void {
    this.loadedSceneCallback = callback;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.initCameraSetup();
    this.initModelsSetup();
    this.render();
    // setInterval(() => console.log(this.camera.position.distanceTo(new THREE.Vector3)), 1000);
    // setInterval(() => console.log(this.camera.position.toArray()), 1000);
  }


  public updateViewport(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.updateCameraAspectRatio();
    this.render();
  }


  private initCameraSetup(): void {
    this.camera.position.set(0, 0, 2);
    this.camera.fov = 50;
    this.camera.frustumCulled = false;
    this.updateCameraAspectRatio();
    this.orbitControls.enabled = false;
    // this.orbitControls.enableZoom = false;
    this.orbitControls.enablePan = false;

    this.orbitControls.maxPolarAngle = 1;
    this.orbitControls.minPolarAngle = 1;
    this.orbitControls.minDistance = 70;
    this.orbitControls.maxDistance = 170;
  }


  private updateCameraAspectRatio(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }


  private initModelsSetup(): void {
    /**
     * Personaje con color
     * Volver a colores cálidos anteriores por si acaso (quizá no, me gusta blanco todo)
     * Sombras u oclusión ambiental baked
     */    
    this.ngZone.runOutsideAngular(() => {
      this.setModels();
      this.addLights();
      this.setDebugModelSetup();
    });

    this.ready = true;
  }

  private setModels(): void {
    const loader: GLTFLoader = new GLTFLoader();
    loader.load('assets/models/office.glb', (gltf) => {
      const gradientMap = new THREE.TextureLoader().load('assets/img/3D-shading-color-gradient.png');
      gradientMap.minFilter = THREE.NearestFilter;
      gradientMap.magFilter = THREE.NearestFilter;
      let lookAtMarkers: THREE.Object3D[] = [];
      let positionMarkers: THREE.Object3D[] = [];

      gltf.scene.traverse((child) => {
        if (child.name === 'LookAtMarkers') {
          lookAtMarkers = child.children;
          return;
        }

        if (child.name === 'PositionMarkers') {
          positionMarkers = child.children;
          return;
        }

        if (child.name === 'Floor') {
          const map = new THREE.TextureLoader().load('assets/models/Floor_Tex.png');
          (child as THREE.Mesh).material = new THREE.MeshToonMaterial({
            gradientMap,
            map,
            // color: 0xE1F1FF
          });
          return;
        }

        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.material = new THREE.MeshToonMaterial({ 
            gradientMap,
            map: mesh.material instanceof THREE.MeshStandardMaterial && mesh.material.map ? mesh.material.map : null,
            color: mesh.name == 'Room' ? 0xE7F6FF : 0xD1EFFF
          });
        }
      });
      this.scene.add(gltf.scene);
      this.setMarkers(lookAtMarkers, positionMarkers);
      this.setCharacterModel(this.scene);
      this.checkModelSetupProgress();
    });
  }

  private setCharacterModel(scene: THREE.Scene): void {
    const loader: GLTFLoader = new GLTFLoader();
    loader.load('assets/models/character.glb', (gltf) => {
      gltf.scene.traverse((child) => {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshToonMaterial({
          map: mesh.material instanceof THREE.MeshStandardMaterial && mesh.material.map ? mesh.material.map : null,
          color: 0xFFFFFF,
          opacity: 1,
          transparent: true
        });

        if (child.name === 'David_Model') {
          this._characterMesh = child as THREE.Mesh;
          this._characterMesh.frustumCulled = false;
        }
      });
      this._characterModel = gltf;
      this._characterAnimMixer = new THREE.AnimationMixer(this._characterModel.scene);
      scene.add(gltf.scene);
      this.checkModelSetupProgress();
    });
  }

  private setMarkers(lookAtMarkers: THREE.Object3D[], positionMarkers: THREE.Object3D[]): void {
    this.markers = {}
    const fn = (marker: THREE.Object3D, positionMarker?: THREE.Object3D) => this.markers[`${marker.name.replace(/_/g, '/')}`] = {
      position: (positionMarker?.position ?? new THREE.Vector3).clone(),
      lookAt: marker.position.clone()
    }
    for (let marker of lookAtMarkers) {
      const positionMarker = positionMarkers.find(posMarker => posMarker.name.match(marker.name));
      fn(marker, positionMarker);
    }
  }

  private addLights(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.37);
    this.scene.add(ambientLight);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.37, 200);
    pointLight2.position.set(0, 10, 0);
    this.scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xffffff, 0.37, 140);
    pointLight3.position.set(0.4, 3, 0.4);
    this.scene.add(pointLight3);
  }


  public setCamPosition(position: THREE.Vector3): void {
    this.markerTracker.position.set(position.x, position.y, position.z);
    this.camera.position.set(position.x, position.y, position.z);
    
    if (!this._debug) return;
    this._debugCamPosition.position.set(position.x, position.y, position.z);
    this._debugCamPositionAxes.position.set(position.x, position.y, position.z);
  }

  public trackMarker(name: string): void {
    this.markerTrackLerpFromPos = this.markerTrackLerp.clone();
    this.targetMarkers['prev'] = this.targetMarkers['next'];
    this.targetMarkers['next'] = this.markers[name];
  }

  public getSteppedRotation(factor: number): THREE.Vector3 {
    this.markerTrackLerp.lerpVectors(this.markerTrackLerpFromPos, this.nextMarker.lookAt, factor);
    if (this._debug) this._debugCamTargetHelper.position.set(this.markerTrackLerp.x, this.markerTrackLerp.y, this.markerTrackLerp.z);
    return this.markerTrackLerp;
  }

  private setDebugModelSetup(): void {
    if (!this._debug) return;

    Object.keys(this.markers).forEach(key => {
      const elem = this.markers[key];
      const axesHelper = new THREE.AxesHelper(1);
      axesHelper.position.set(elem.position.x, elem.position.y, elem.position.z);
      (axesHelper.material as THREE.LineBasicMaterial).depthTest = false;
      (axesHelper.material as THREE.LineBasicMaterial).depthWrite = false;
      this.scene.add(axesHelper);

      const sphere = new THREE.SphereGeometry(0.1);
      const mesh = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({color: 0xff0000, depthTest: false, depthWrite: false}));
      mesh.position.set(elem.lookAt.x, elem.lookAt.y, elem.lookAt.z);
      this.scene.add(mesh);
    });

    // this.orbitControls.target = this._debugCamPosition.position;

    this._debugCamPosition.geometry = new THREE.SphereGeometry(0.1);
    this._debugCamPosition.material = new THREE.MeshBasicMaterial({color: 0xffff00, depthTest: false, depthWrite: false});
//    this.scene.add(this._debugCamPosition);
//    this.scene.add(this._debugCamPositionAxes);

    this._debugCamTargetHelper.geometry = new THREE.SphereGeometry(0.1);
    this._debugCamTargetHelper.material = new THREE.MeshBasicMaterial({color: 0x0000ff, depthTest: false, depthWrite: false});
    this.scene.add(this._debugCamTargetHelper);
  }

  checkModelSetupProgress(): void {
    this.modelSetupProgress++;
    if (this.modelSetupProgress < 2) {
      return;
    }
    this.loadedSceneCallback();
}
}