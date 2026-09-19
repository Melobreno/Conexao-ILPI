import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DonationNeedService } from '../../core/services/donation-need.service';
import { DonationNeed, DonationStatus } from '../../core/models/donation-need.model';

@Component({
  selector: 'app-donations',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Page header -->
    <section class="bg-gradient-to-br from-terra to-terra-dark text-white py-12 px-4">
      <div class="max-w-5xl mx-auto text-center">
        <h1 class="text-4xl font-bold mb-3">Como Ajudar</h1>
        <p class="text-white/80 text-lg max-w-xl mx-auto">
          Confira o que mais precisamos agora e doe de forma simples.
          Cada item faz diferença na rotina dos nossos residentes.
        </p>
      </div>
    </section>

    <div class="section">

      <!-- PIX + Bank transfer -->
      <section aria-labelledby="pix-heading" class="mb-12">
        <h2 id="pix-heading" class="text-2xl font-bold text-olive mb-6 text-center">
          Doação em Dinheiro
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

          <!-- PIX card -->
          <div class="card border-2 border-terra/30">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-3xl" aria-hidden="true">📱</span>
              <div>
                <h3 class="font-semibold text-olive">PIX</h3>
                <p class="text-xs text-warm-gray">Transferência instantânea</p>
              </div>
            </div>
            <p class="text-sm text-warm-gray mb-1">Chave PIX (CNPJ):</p>
            <p class="font-mono font-semibold text-gray-800 text-sm bg-sand rounded-lg px-3 py-2 mb-4 break-all"
               aria-label="Chave PIX">
              00.000.000/0001-00
            </p>
            <button (click)="copyPix()"
                    class="btn-primary w-full"
                    [class.bg-olive]="pixCopied()"
                    [class.bg-terra]="!pixCopied()">
              {{ pixCopied() ? '✅ Chave copiada!' : '📋 Copiar chave PIX' }}
            </button>
          </div>

          <!-- Bank transfer card -->
          <div class="card">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-3xl" aria-hidden="true">🏦</span>
              <div>
                <h3 class="font-semibold text-olive">Transferência Bancária</h3>
                <p class="text-xs text-warm-gray">TED / DOC</p>
              </div>
            </div>
            <dl class="text-sm space-y-2">
              <div class="flex justify-between">
                <dt class="text-warm-gray">Banco</dt>
                <dd class="font-medium">Bradesco — 237</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-warm-gray">Agência</dt>
                <dd class="font-medium">0000-0</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-warm-gray">Conta Corrente</dt>
                <dd class="font-medium">00000-0</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-warm-gray">Favorecido</dt>
                <dd class="font-medium">ILPI Cazuza Pinheiro</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-warm-gray">CNPJ</dt>
                <dd class="font-medium">00.000.000/0001-00</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <!-- Needs board -->
      <section aria-labelledby="needs-heading">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 id="needs-heading" class="text-2xl font-bold text-olive">
            Quadro de Necessidades
          </h2>

          <!-- Filter tabs -->
          <div class="flex gap-2 flex-wrap" role="group" aria-label="Filtrar por status">
            @for (f of filters; track f.value) {
              <button (click)="activeFilter.set(f.value)"
                      class="min-h-[40px] px-4 rounded-full text-sm font-medium transition-colors"
                      [class]="activeFilter() === f.value
                        ? 'bg-olive text-white'
                        : 'bg-sand text-warm-gray hover:bg-olive/10'">
                {{ f.label }}
              </button>
            }
          </div>
        </div>

        <!-- Loading -->
        @if (loading()) {
          <div class="flex justify-center py-16" aria-live="polite" aria-label="Carregando necessidades">
            <div class="w-10 h-10 border-4 border-olive border-t-transparent rounded-full animate-spin"></div>
          </div>
        }

        <!-- Error -->
        @if (error()) {
          <div class="card text-center py-10" role="alert">
            <p class="text-2xl mb-2" aria-hidden="true">😕</p>
            <p class="text-warm-gray mb-4">Não foi possível carregar as necessidades.</p>
            <button (click)="load()" class="btn-secondary">Tentar novamente</button>
          </div>
        }

        <!-- Grid -->
        @if (!loading() && !error()) {
          @if (filtered().length === 0) {
            <p class="text-center text-warm-gray py-12">Nenhuma necessidade encontrada.</p>
          } @else {
            <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" role="list">
              @for (need of filtered(); track need.id) {
                <li class="card flex flex-col gap-3">

                  <!-- Category badge + status -->
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-medium bg-sand text-warm-gray rounded-full px-3 py-1">
                      {{ need.category }}
                    </span>
                    <span class="text-xs font-semibold rounded-full px-3 py-1"
                          [class]="statusClass(need.status)">
                      {{ statusLabel(need.status) }}
                    </span>
                  </div>

                  <!-- Title + description -->
                  <div>
                    <h3 class="font-semibold text-gray-800">{{ need.title }}</h3>
                    @if (need.description) {
                      <p class="text-sm text-warm-gray mt-1 line-clamp-2">{{ need.description }}</p>
                    }
                  </div>

                  <!-- Progress -->
                  <div>
                    <div class="flex justify-between text-xs text-warm-gray mb-1">
                      <span>Progresso</span>
                      <span>{{ need.currentQuantity }} / {{ need.targetQuantity }}</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2" role="progressbar"
                         [attr.aria-valuenow]="need.currentQuantity"
                         [attr.aria-valuemin]="0"
                         [attr.aria-valuemax]="need.targetQuantity"
                         [attr.aria-label]="need.title + ' progresso'">
                      <div class="h-2 rounded-full transition-all duration-500"
                           [class]="progressBarClass(need.status)"
                           [style.width.%]="progressPct(need)">
                      </div>
                    </div>
                  </div>

                  <!-- CTA -->
                  <a routerLink="/doacoes"
                     fragment="como-entregar"
                     class="btn-primary text-sm mt-auto text-center"
                     [class.opacity-50]="need.status === 'MET'"
                     [attr.aria-disabled]="need.status === 'MET'">
                    {{ need.status === 'MET' ? 'Necessidade Atendida ✅' : 'Quero Ajudar' }}
                  </a>
                </li>
              }
            </ul>
          }
        }
      </section>

      <!-- How to deliver -->
      <section id="como-entregar" class="mt-16" aria-labelledby="deliver-heading">
        <h2 id="deliver-heading" class="text-2xl font-bold text-olive mb-6 text-center">
          Como Entregar sua Doação
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="card text-center">
            <div class="text-3xl mb-2" aria-hidden="true">📦</div>
            <h3 class="font-semibold mb-1">Entrega Presencial</h3>
            <p class="text-sm text-warm-gray">
              Traga os itens diretamente ao ILPI em Paudalho – PE, de segunda a sexta, das 8h às 17h.
            </p>
          </div>
          <div class="card text-center">
            <div class="text-3xl mb-2" aria-hidden="true">🚚</div>
            <h3 class="font-semibold mb-1">Envio pelos Correios</h3>
            <p class="text-sm text-warm-gray">
              Envie para o endereço da instituição. Entre em contato para confirmar o endereço completo.
            </p>
          </div>
          <div class="card text-center">
            <div class="text-3xl mb-2" aria-hidden="true">📞</div>
            <h3 class="font-semibold mb-1">Combinar Coleta</h3>
            <p class="text-sm text-warm-gray">
              Em alguns casos podemos organizar a coleta. Ligue ou mande mensagem para combinar.
            </p>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class DonationsComponent implements OnInit {
  private readonly service = inject(DonationNeedService);

  needs   = signal<DonationNeed[]>([]);
  loading = signal(true);
  error   = signal(false);
  activeFilter = signal<DonationStatus | 'ALL'>('ALL');
  pixCopied    = signal(false);

  readonly filters: { label: string; value: DonationStatus | 'ALL' }[] = [
    { label: 'Todos',          value: 'ALL' },
    { label: 'Necessário',     value: 'NEEDED' },
    { label: 'Parcialmente',   value: 'PARTIALLY_MET' },
    { label: 'Atendidos',      value: 'MET' },
  ];

  filtered = computed(() => {
    const f = this.activeFilter();
    return f === 'ALL' ? this.needs() : this.needs().filter((n) => n.status === f);
  });

  ngOnInit() { this.load(); }

  load() {
    this.loading.set(true);
    this.error.set(false);
    this.service.getAll().subscribe({
      next:  (data) => { this.needs.set(data); this.loading.set(false); },
      error: ()     => { this.error.set(true); this.loading.set(false); },
    });
  }

  copyPix() {
    navigator.clipboard.writeText('00.000.000/0001-00').then(() => {
      this.pixCopied.set(true);
      setTimeout(() => this.pixCopied.set(false), 3000);
    });
  }

  progressPct(need: DonationNeed): number {
    if (need.targetQuantity === 0) return 0;
    return Math.min(100, Math.round((need.currentQuantity / need.targetQuantity) * 100));
  }

  statusLabel(status: DonationStatus): string {
    const map: Record<DonationStatus, string> = {
      NEEDED:        'Urgente',
      PARTIALLY_MET: 'Parcial',
      MET:           'Atendido',
    };
    return map[status];
  }

  statusClass(status: DonationStatus): string {
    const map: Record<DonationStatus, string> = {
      NEEDED:        'bg-red-100 text-red-700',
      PARTIALLY_MET: 'bg-yellow-100 text-yellow-700',
      MET:           'bg-green-100 text-green-700',
    };
    return map[status];
  }

  progressBarClass(status: DonationStatus): string {
    const map: Record<DonationStatus, string> = {
      NEEDED:        'bg-terra',
      PARTIALLY_MET: 'bg-yellow-400',
      MET:           'bg-olive',
    };
    return map[status];
  }
}
