import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="bg-olive text-white mt-16" role="contentinfo">
      <div class="max-w-5xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        <!-- About -->
        <div>
          <p class="font-semibold text-lg mb-2">🌿 ILPI Cazuza Pinheiro</p>
          <p class="text-olive-light text-sm leading-relaxed">
            Cuidando com amor e dignidade desde o início. Localizado em Paudalho – PE.
          </p>
        </div>

        <!-- Quick links -->
        <nav aria-label="Links rápidos">
          <p class="font-semibold mb-2">Links rápidos</p>
          <ul class="flex flex-col gap-1 text-sm text-olive-light" role="list">
            <li><a routerLink="/" class="hover:text-white transition-colors">Início</a></li>
            <li><a routerLink="/doacoes" class="hover:text-white transition-colors">Doações</a></li>
            <li><a routerLink="/voluntariado" class="hover:text-white transition-colors">Voluntariado</a></li>
            <li><a routerLink="/voluntariado" [queryParams]="{ tipo: 'apoio' }" class="hover:text-white transition-colors">Solicitar Apoio</a></li>
          </ul>
        </nav>

        <!-- Contact -->
        <div>
          <p class="font-semibold mb-2">Contato</p>
          <address class="not-italic text-sm text-olive-light space-y-1">
            <p>📍 Paudalho, PE – Brasil</p>
            <p>📞 (81) 00000-0000</p>
            <p>📧 contato&#64;conexaoilpi.com.br</p>
          </address>
        </div>
      </div>

      <div class="border-t border-olive-dark text-center text-xs text-olive-light py-4 px-4">
        © {{ year }} ILPI Cazuza Pinheiro. Desenvolvido com ❤️ para a comunidade de Paudalho.
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}
