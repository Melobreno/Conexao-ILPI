import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { VolunteerContactService } from '../../core/services/volunteer-contact.service';
import { RequestType } from '../../core/models/volunteer-contact.model';

type FormState = 'idle' | 'loading' | 'success' | 'error';

@Component({
  selector: 'app-volunteer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <!-- Header -->
    <section class="bg-gradient-to-br from-olive to-olive-dark text-white py-12 px-4">
      <div class="max-w-5xl mx-auto text-center">
        <h1 class="text-4xl font-bold mb-3">
          {{ activeTab() === 'VOLUNTEER' ? 'Seja Voluntário' : 'Solicitar Apoio' }}
        </h1>
        <p class="text-white/80 text-lg max-w-xl mx-auto">
          {{ activeTab() === 'VOLUNTEER'
            ? 'Seu tempo e talento podem transformar a vida de um idoso. Cadastre-se e nos conte como quer ajudar.'
            : 'Tem dúvidas sobre internação ou precisa de apoio? Preencha o formulário e entraremos em contato.' }}
        </p>
      </div>
    </section>

    <div class="section max-w-2xl">

      <!-- Tab switcher -->
      <div class="flex rounded-xl overflow-hidden border border-gray-200 mb-8" role="tablist">
        <button (click)="setTab('VOLUNTEER')"
                role="tab"
                [attr.aria-selected]="activeTab() === 'VOLUNTEER'"
                class="flex-1 min-h-[48px] font-semibold text-sm transition-colors"
                [class]="activeTab() === 'VOLUNTEER'
                  ? 'bg-olive text-white'
                  : 'bg-white text-warm-gray hover:bg-sand'">
          🤝 Quero Ser Voluntário
        </button>
        <button (click)="setTab('SUPPORT_REQUEST')"
                role="tab"
                [attr.aria-selected]="activeTab() === 'SUPPORT_REQUEST'"
                class="flex-1 min-h-[48px] font-semibold text-sm transition-colors"
                [class]="activeTab() === 'SUPPORT_REQUEST'
                  ? 'bg-terra text-white'
                  : 'bg-white text-warm-gray hover:bg-sand'">
          💬 Solicitar Apoio
        </button>
      </div>

      <!-- Success message -->
      @if (formState() === 'success') {
        <div class="card text-center py-12" role="alert" aria-live="polite">
          <div class="text-5xl mb-4" aria-hidden="true">🎉</div>
          <h2 class="text-2xl font-bold text-olive mb-2">Recebemos sua mensagem!</h2>
          <p class="text-warm-gray mb-6">
            {{ activeTab() === 'VOLUNTEER'
              ? 'Obrigado pelo seu interesse em ser voluntário. Em breve entraremos em contato.'
              : 'Seu pedido foi registrado. Nossa equipe retornará em breve.' }}
          </p>
          <button (click)="reset()" class="btn-primary">Enviar outra mensagem</button>
        </div>
      }

      <!-- Form -->
      @if (formState() !== 'success') {
        <form [formGroup]="form"
              (ngSubmit)="submit()"
              class="card space-y-5"
              novalidate
              [attr.aria-label]="activeTab() === 'VOLUNTEER' ? 'Formulário de voluntariado' : 'Formulário de solicitação de apoio'">

          <!-- Name -->
          <div>
            <label for="name" class="form-label">
              Nome completo <span class="text-red-500" aria-hidden="true">*</span>
            </label>
            <input id="name" type="text" formControlName="name"
                   class="form-input"
                   placeholder="Seu nome completo"
                   autocomplete="name"
                   [attr.aria-invalid]="isInvalid('name')">
            @if (isInvalid('name')) {
              <p class="form-error" role="alert">Nome é obrigatório.</p>
            }
          </div>

          <!-- Phone -->
          <div>
            <label for="phone" class="form-label">
              Telefone / WhatsApp <span class="text-red-500" aria-hidden="true">*</span>
            </label>
            <input id="phone" type="tel" formControlName="phone"
                   class="form-input"
                   placeholder="(81) 99999-9999"
                   autocomplete="tel"
                   [attr.aria-invalid]="isInvalid('phone')">
            @if (isInvalid('phone')) {
              <p class="form-error" role="alert">Informe um telefone válido.</p>
            }
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="form-label">E-mail</label>
            <input id="email" type="email" formControlName="email"
                   class="form-input"
                   placeholder="seu@email.com (opcional)"
                   autocomplete="email"
                   [attr.aria-invalid]="isInvalid('email')">
            @if (isInvalid('email')) {
              <p class="form-error" role="alert">Informe um e-mail válido.</p>
            }
          </div>

          <!-- Interest area (VOLUNTEER only) -->
          @if (activeTab() === 'VOLUNTEER') {
            <div>
              <label for="interestArea" class="form-label">Área de interesse</label>
              <select id="interestArea" formControlName="interestArea" class="form-input">
                <option value="">Selecione uma área…</option>
                @for (area of interestAreas; track area) {
                  <option [value]="area">{{ area }}</option>
                }
              </select>
            </div>
          }

          <!-- Message -->
          <div>
            <label for="message" class="form-label">
              {{ activeTab() === 'VOLUNTEER' ? 'Disponibilidade e observações' : 'Descreva sua solicitação' }}
            </label>
            <textarea id="message" formControlName="message"
                      class="form-input min-h-[120px] resize-y"
                      [placeholder]="activeTab() === 'VOLUNTEER'
                        ? 'Ex.: disponível aos fins de semana para ajudar com atividades recreativas…'
                        : 'Descreva sua dúvida, situação ou necessidade…'">
            </textarea>
          </div>

          <!-- Error alert -->
          @if (formState() === 'error') {
            <div class="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm" role="alert">
              Ocorreu um erro ao enviar. Por favor, tente novamente.
            </div>
          }

          <!-- Submit -->
          <button type="submit"
                  [disabled]="formState() === 'loading'"
                  class="btn-primary w-full text-base"
                  [class.bg-olive]="activeTab() === 'VOLUNTEER'"
                  [class.bg-terra]="activeTab() === 'SUPPORT_REQUEST'">
            @if (formState() === 'loading') {
              <span class="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"
                    aria-hidden="true"></span>
              Enviando…
            } @else {
              {{ activeTab() === 'VOLUNTEER' ? 'Enviar Cadastro' : 'Enviar Solicitação' }}
            }
          </button>
        </form>
      }
    </div>
  `,
})
export class VolunteerFormComponent implements OnInit {
  private readonly fb      = inject(FormBuilder);
  private readonly service = inject(VolunteerContactService);
  private readonly route   = inject(ActivatedRoute);

  activeTab  = signal<RequestType>('VOLUNTEER');
  formState  = signal<FormState>('idle');

  readonly interestAreas = [
    'Saúde / Enfermagem',
    'Fisioterapia',
    'Nutrição',
    'Atividades Recreativas',
    'Suporte Administrativo',
    'Serviço Social',
    'Música / Artes',
    'Outro',
  ];

  form!: FormGroup;

  ngOnInit() {
    this.buildForm();
    // Support ?tipo=apoio query param from nav
    this.route.queryParams.subscribe((params) => {
      if (params['tipo'] === 'apoio') {
        this.setTab('SUPPORT_REQUEST');
      }
    });
  }

  buildForm() {
    this.form = this.fb.group({
      name:         ['', [Validators.required, Validators.maxLength(150)]],
      phone:        ['', [Validators.required, Validators.pattern(/^\(?\d{2}\)?[\s-]?9?\d{4}-?\d{4}$/)]],
      email:        ['', [Validators.email, Validators.maxLength(150)]],
      interestArea: [''],
      message:      [''],
    });
  }

  setTab(tab: RequestType) {
    this.activeTab.set(tab);
    this.formState.set('idle');
    this.form.reset();
  }

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.formState.set('loading');
    const { name, phone, email, interestArea, message } = this.form.value;

    this.service.submit({
      name,
      phone,
      email:        email   || undefined,
      interestArea: interestArea || undefined,
      message:      message || undefined,
      requestType:  this.activeTab(),
    }).subscribe({
      next:  () => this.formState.set('success'),
      error: () => this.formState.set('error'),
    });
  }

  reset() {
    this.formState.set('idle');
    this.form.reset();
  }
}
