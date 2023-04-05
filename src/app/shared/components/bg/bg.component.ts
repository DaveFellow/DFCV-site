import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { StatesMachine } from '../../FSM/StatesMachine';
import { StatesFactoryService } from '../../FSM/Factory/states-factory.service';
import { State } from '../../FSM/States/State';
import { Scene } from './Scene';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-bg',
  templateUrl: './bg.component.html',
  styleUrls: ['./bg.component.scss'],
})
export class BGComponent implements OnInit, OnChanges, AfterViewInit, StatesMachine {
  @ViewChild('container') container!: ElementRef<HTMLCanvasElement>;

  @Input() paused: boolean = false;
  @Input('state') stateName: string = 'home';

  public scene: Scene = new Scene;
  
  currentState: State | null = null;

  constructor(
    private renderer: Renderer2,
    private statesFactory: StatesFactoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => this.setState((e as NavigationEnd).url));
  }

  ngAfterViewInit() {
    this.scene.setup(() => {
      this.setup();
      this.setState(this.stateName);
      if (!this.paused) this.animate();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['state'])
      this.setState(changes['state'].currentValue);
    if (!this.paused)
      this.animate();
  }

  animate(): void {
    if (!this.scene.isReady) return;
    if (!this.paused) requestAnimationFrame(() => this.animate());
    this.currentState?.onAnimation();
  
    if (this.scene.orbitControls.enabled)
      this.scene.orbitControls.update();
  
    this.scene.render();
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
    this.statesFactory.setScene(this.scene);
    this.renderer.appendChild(this.container.nativeElement, this.scene.renderer.domElement);
  }
}
