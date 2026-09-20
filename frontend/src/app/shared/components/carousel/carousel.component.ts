import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgClass } from '@angular/common';

export interface CarouselSlide {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-lg select-none"
         (mouseenter)="pause()"
         (mouseleave)="resume()">

      <!-- Slides -->
      @for (slide of slides; track slide.src; let i = $index) {
        <div class="absolute inset-0 transition-opacity duration-700"
             [ngClass]="i === active() ? 'opacity-100' : 'opacity-0'">
          <img [src]="slide.src"
               [alt]="slide.alt"
               class="w-full h-full object-cover"
               loading="lazy" />
        </div>
      }

      <!-- Prev -->
      <button type="button"
              (click)="prev()"
              class="absolute left-2 top-1/2 -translate-y-1/2
                     w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white
                     flex items-center justify-center transition-colors
                     focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Foto anterior">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      <!-- Next -->
      <button type="button"
              (click)="next()"
              class="absolute right-2 top-1/2 -translate-y-1/2
                     w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white
                     flex items-center justify-center transition-colors
                     focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Próxima foto">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      <!-- Dots -->
      <div class="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        @for (slide of slides; track slide.src; let i = $index) {
          <span (click)="goTo(i)"
                (keydown.enter)="goTo(i)"
                (keydown.space)="goTo(i)"
                tabindex="0"
                [attr.aria-label]="'Foto ' + (i + 1)"
                class="w-2 h-2 rounded-full cursor-pointer transition-all duration-300
                       focus:outline-none focus:ring-2 focus:ring-white"
                [ngClass]="i === active() ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'">
          </span>
        }
      </div>
    </div>
  `,
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() slides: CarouselSlide[] = [];
  @Input() intervalMs = 4000;

  active = signal(0);
  private timer: ReturnType<typeof setInterval> | null = null;

  ngOnInit()    { this.start(); }
  ngOnDestroy() { this.clear(); }

  next()        { this.active.update(i => (i + 1) % this.slides.length); }
  prev()        { this.active.update(i => (i - 1 + this.slides.length) % this.slides.length); }
  goTo(i: number) { this.active.set(i); }

  pause()  { this.clear(); }
  resume() { this.start(); }

  private start() {
    this.clear();
    this.timer = setInterval(() => this.next(), this.intervalMs);
  }

  private clear() {
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
  }
}
