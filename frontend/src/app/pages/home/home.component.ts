import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselComponent, CarouselSlide } from '../../shared/components/carousel/carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CarouselComponent],
  template: `
    <!-- Hero -->
    <section class="bg-gradient-to-br from-olive to-olive-dark text-white" aria-labelledby="hero-heading">
      <div class="section flex flex-col md:flex-row items-center gap-8 py-16">
        <div class="flex-1 text-center md:text-left">
          <p class="text-terra-light font-medium tracking-wide uppercase text-sm mb-2">
            Paudalho – PE
          </p>
          <h1 id="hero-heading" class="text-4xl md:text-5xl font-bold leading-tight mb-4">
            ILPI Cazuza Pinheiro
          </h1>
          <p class="text-lg text-white/80 mb-8 max-w-lg">
            Um lar de cuidado, respeito e dignidade para os idosos de nossa comunidade.
            Junte-se a nós: doe, seja voluntário e faça parte dessa história.
          </p>
          <div class="flex flex-wrap gap-3 justify-center md:justify-start">
            <a routerLink="/doacoes" class="btn-primary">Quero Doar</a>
            <a routerLink="/voluntariado" class="btn-ghost border-white text-white hover:bg-white hover:text-olive">
              Ser Voluntário
            </a>
          </div>
        </div>

        <!-- Carousel -->
        <div class="flex-1 flex justify-center">
          <app-carousel [slides]="slides" [intervalMs]="4000" />
        </div>
      </div>
    </section>

    <!-- Mission -->
    <section class="section" aria-labelledby="mission-heading">
      <div class="text-center mb-10">
        <h2 id="mission-heading" class="text-3xl font-bold text-olive mb-3">Nossa Missão</h2>
        <p class="text-warm-gray max-w-2xl mx-auto">
          O ILPI Cazuza Pinheiro acolhe idosos em situação de vulnerabilidade social,
          oferecendo moradia, alimentação, cuidados de saúde e, acima de tudo, carinho.
        </p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <article class="card text-center">
          <div class="text-4xl mb-3" aria-hidden="true">💚</div>
          <h3 class="font-semibold text-olive mb-1">Cuidado Integral</h3>
          <p class="text-sm text-warm-gray">Assistência médica, nutricional e psicossocial para cada residente.</p>
        </article>
        <article class="card text-center">
          <div class="text-4xl mb-3" aria-hidden="true">🤝</div>
          <h3 class="font-semibold text-olive mb-1">Comunidade Unida</h3>
          <p class="text-sm text-warm-gray">Voluntários e doadores que transformam vidas com pequenos gestos.</p>
        </article>
        <article class="card text-center">
          <div class="text-4xl mb-3" aria-hidden="true">🌟</div>
          <h3 class="font-semibold text-olive mb-1">Dignidade</h3>
          <p class="text-sm text-warm-gray">Cada idoso merece respeito, atenção e um sorriso todos os dias.</p>
        </article>
      </div>
    </section>

    <!-- Daily life -->
    <section class="bg-sand" aria-labelledby="routine-heading">
      <div class="section">
        <h2 id="routine-heading" class="text-3xl font-bold text-olive mb-4 text-center">A Rotina do Lar</h2>
        <p class="text-warm-gray text-center max-w-2xl mx-auto mb-8">
          Cada dia começa com café da manhã em família, atividades recreativas, acompanhamento
          de saúde e momentos de lazer que preservam a alegria de viver.
        </p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          @for (item of routine; track item.emoji) {
            <div class="card py-6">
              <div class="text-3xl mb-2" aria-hidden="true">{{ item.emoji }}</div>
              <p class="text-sm font-medium text-olive">{{ item.label }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section text-center" aria-labelledby="cta-heading">
      <h2 id="cta-heading" class="text-3xl font-bold text-olive mb-3">Como você pode ajudar?</h2>
      <p class="text-warm-gray mb-8 max-w-xl mx-auto">
        Toda contribuição, grande ou pequena, transforma a realidade de nossos residentes.
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <a routerLink="/doacoes" class="btn-primary text-lg px-8">Ver Necessidades de Doação</a>
        <a routerLink="/voluntariado" class="btn-ghost text-lg px-8">Cadastrar-se como Voluntário</a>
      </div>
    </section>
  `,
})
export class HomeComponent {
  // Add your images to src/assets/carousel/ and update this list.
  readonly slides: CarouselSlide[] = [
    { src: 'assets/carousel/foto-1.png', alt: 'Residentes do ILPI Cazuza Pinheiro' },
    { src: 'assets/carousel/foto-2.png', alt: 'Atividades recreativas no lar' },
  ];

  readonly routine = [
    { emoji: '🌅', label: 'Café da manhã' },
    { emoji: '🎶', label: 'Atividades' },
    { emoji: '🩺', label: 'Saúde' },
    { emoji: '🌙', label: 'Descanso' },
  ];
}
