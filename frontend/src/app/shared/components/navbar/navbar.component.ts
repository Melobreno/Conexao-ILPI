import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <nav class="max-w-5xl mx-auto px-4 md:px-8 flex items-center justify-between h-16"
           aria-label="Navegação principal">

        <!-- Logo -->
        <a routerLink="/" class="flex items-center gap-2 shrink-0" aria-label="Página inicial">
          <span class="text-2xl">🌿</span>
          <span class="font-semibold text-olive text-lg leading-tight">
            Conexão<br class="hidden sm:block">
            <span class="text-terra">ILPI</span>
          </span>
        </a>

        <!-- Desktop nav links -->
        <ul class="hidden md:flex items-center gap-1" role="list">
          <li>
            <a routerLink="/" routerLinkActive="text-olive font-semibold"
               [routerLinkActiveOptions]="{ exact: true }"
               class="min-h-[48px] px-4 flex items-center text-gray-600 hover:text-olive rounded-lg hover:bg-sand transition-colors">
              Início
            </a>
          </li>
          <li>
            <a routerLink="/doacoes" routerLinkActive="text-olive font-semibold"
               class="min-h-[48px] px-4 flex items-center text-gray-600 hover:text-olive rounded-lg hover:bg-sand transition-colors">
              Doações
            </a>
          </li>
          <li>
            <a routerLink="/voluntariado" routerLinkActive="text-olive font-semibold"
               class="min-h-[48px] px-4 flex items-center text-gray-600 hover:text-olive rounded-lg hover:bg-sand transition-colors">
              Voluntariado
            </a>
          </li>
          <li>
            <a routerLink="/voluntariado" [queryParams]="{ tipo: 'apoio' }"
               class="btn-primary text-sm ml-2">
              Pedir Apoio
            </a>
          </li>
        </ul>

        <!-- Mobile hamburger -->
        <button (click)="toggleMenu()"
                class="md:hidden min-h-[48px] min-w-[48px] flex items-center justify-center rounded-xl hover:bg-sand transition-colors"
                [attr.aria-expanded]="menuOpen()"
                aria-controls="mobile-menu"
                aria-label="Abrir menu">
          <svg class="w-6 h-6 text-olive" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            @if (menuOpen()) {
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"/>
            } @else {
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"/>
            }
          </svg>
        </button>
      </nav>

      <!-- Mobile menu -->
      @if (menuOpen()) {
        <div id="mobile-menu" class="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          <ul class="flex flex-col gap-1 pt-2" role="list">
            <li>
              <a routerLink="/" (click)="closeMenu()"
                 class="min-h-[48px] px-4 flex items-center text-gray-700 hover:text-olive rounded-lg hover:bg-sand">
                Início
              </a>
            </li>
            <li>
              <a routerLink="/doacoes" (click)="closeMenu()"
                 class="min-h-[48px] px-4 flex items-center text-gray-700 hover:text-olive rounded-lg hover:bg-sand">
                Doações
              </a>
            </li>
            <li>
              <a routerLink="/voluntariado" (click)="closeMenu()"
                 class="min-h-[48px] px-4 flex items-center text-gray-700 hover:text-olive rounded-lg hover:bg-sand">
                Voluntariado
              </a>
            </li>
            <li class="mt-2">
              <a routerLink="/voluntariado" [queryParams]="{ tipo: 'apoio' }" (click)="closeMenu()"
                 class="btn-primary w-full text-center">
                Pedir Apoio
              </a>
            </li>
          </ul>
        </div>
      }
    </header>
  `,
})
export class NavbarComponent {
  menuOpen = signal(false);
  toggleMenu() { this.menuOpen.update((v) => !v); }
  closeMenu()  { this.menuOpen.set(false); }
}
