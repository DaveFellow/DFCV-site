import { AfterViewInit, Component, effect, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { StatesMachine } from '../../FSM/StatesMachine';
import { StatesFactoryService } from '../../FSM/Factory/states-factory.service';
import { State } from '../../FSM/States/State';
import { Scene } from './Scene';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CameraStateService } from '../../services/camera-state.service';
import { ScreenResolutionService } from '../../services/screen-resolution.service';

@Component({
    selector: 'app-bg',
    templateUrl: './bg.component.html',
    styleUrls: ['./bg.component.scss'],
    standalone: false
})
export class BGComponent implements OnInit, AfterViewInit, StatesMachine {
  @ViewChild('container') container!: ElementRef<HTMLCanvasElement>;

  @Input() paused: boolean = false;

  public scene: Scene;
  
  currentState: State | null = null;

  private cameraOrbitSpeed = 0;
  public get panningDirection() {
    return !this.cameraOrbitSpeed ? ''
      : this.cameraOrbitSpeed > 0 ? 'right'
      : 'left'
  }

  constructor(
    private renderer: Renderer2,
    private statesFactory: StatesFactoryService,
    private router: Router,
    private camStateService: CameraStateService,
    private screenResolutionService: ScreenResolutionService
  ) {
    this.scene = new Scene();
    effect(() => {
      this.screenResolutionService.currentResolution();
      this.scene.updateViewport();
    });
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => this.setRouteActions((e as NavigationEnd).url));
  }

  ngAfterViewInit() {
    this.scene.setup(() => {
      this.setup();
      if (!this.paused) this.animate();
    });
  }

  animate(): void {
    if (!this.scene.isReady) return;
    if (!this.paused) requestAnimationFrame(() => this.animate());
    this.currentState?.onAnimation();
    this.scene.render();
    this.camStateService.updateAngle(this.scene.camera.rotation.z);
    this.camStateService.isInHomeState = this.isInHomeState && this.scene.camera.fov <= 25;
  }

  setState(name: string): void {
    if (this.currentState?.name === name) return;

    const state: State | null = this.statesFactory.get(name);
    if (!state) return;

    this.currentState?.onExit();

    this.currentState = state;
    this.currentState.onEnter();
  }

  clearState(): void {
    this.currentState?.onExit();
    this.currentState = null;
  }

  private setup(): void {
    this.statesFactory.setup(this.scene);
    this.renderer.appendChild(this.container.nativeElement, this.scene.renderer.domElement);
    this.setState(this.router.url);
  }

  private setRouteActions(route: string): void {
    this.setState(route);
  }

  private get isInHomeState() {
    return ['/', '/home'].includes(this.currentState?.name || '');
  }
}
