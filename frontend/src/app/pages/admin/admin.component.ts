import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { DonationNeedService } from '../../core/services/donation-need.service';
import { VolunteerContactService } from '../../core/services/volunteer-contact.service';
import { DonationNeed } from '../../core/models/donation-need.model';
import { VolunteerContact } from '../../core/models/volunteer-contact.model';

type AdminTab = 'needs' | 'contacts';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <!-- Header -->
    <section class="bg-olive text-white py-10 px-4">
      <div class="max-w-5xl mx-auto">
        <h1 class="text-3xl font-bold">🛠️ Painel Administrativo</h1>
        <p class="text-white/70 mt-1">Gerencie as necessidades de doação e visualize os contatos recebidos.</p>
      </div>
    </section>

    <div class="section">

      <!-- Tab nav -->
      <div class="flex rounded-xl overflow-hidden border border-gray-200 mb-8 w-fit" role="tablist">
        <button (click)="tab.set('needs')" role="tab"
                [attr.aria-selected]="tab() === 'needs'"
                class="min-h-[48px] px-6 font-semibold text-sm transition-colors"
                [class]="tab() === 'needs' ? 'bg-olive text-white' : 'bg-white text-warm-gray hover:bg-sand'">
          📋 Necessidades
        </button>
        <button (click)="tab.set('contacts')" role="tab"
                [attr.aria-selected]="tab() === 'contacts'"
                class="min-h-[48px] px-6 font-semibold text-sm transition-colors"
                [class]="tab() === 'contacts' ? 'bg-olive text-white' : 'bg-white text-warm-gray hover:bg-sand'">
          📬 Contatos
        </button>
      </div>

      <!-- NEEDS TAB -->
      @if (tab() === 'needs') {
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <!-- Form -->
          <aside class="lg:col-span-1">
            <div class="card">
              <h2 class="font-semibold text-olive mb-4">
                {{ editingId() ? 'Editar Necessidade' : 'Nova Necessidade' }}
              </h2>
              <form [formGroup]="needForm" (ngSubmit)="saveNeed()" class="space-y-4" novalidate>

                <div>
                  <label for="adm-title" class="form-label">Título *</label>
                  <input id="adm-title" type="text" formControlName="title" class="form-input" placeholder="Ex.: Fraldas Geriátricas G">
                  @if (needForm.get('title')?.invalid && needForm.get('title')?.touched) {
                    <p class="form-error">Título obrigatório.</p>
                  }
                </div>

                <div>
                  <label for="adm-category" class="form-label">Categoria *</label>
                  <input id="adm-category" type="text" formControlName="category" class="form-input" placeholder="Ex.: Higiene">
                </div>

                <div>
                  <label for="adm-description" class="form-label">Descrição</label>
                  <textarea id="adm-description" formControlName="description" class="form-input min-h-[80px]"></textarea>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label for="adm-target" class="form-label">Meta *</label>
                    <input id="adm-target" type="number" formControlName="targetQuantity" class="form-input" min="1">
                  </div>
                  <div>
                    <label for="adm-current" class="form-label">Atual</label>
                    <input id="adm-current" type="number" formControlName="currentQuantity" class="form-input" min="0">
                  </div>
                </div>

                <div>
                  <label for="adm-status" class="form-label">Status</label>
                  <select id="adm-status" formControlName="status" class="form-input">
                    <option value="NEEDED">Necessário</option>
                    <option value="PARTIALLY_MET">Parcialmente atendido</option>
                    <option value="MET">Atendido</option>
                  </select>
                </div>

                <div class="flex gap-2">
                  <button type="submit" class="btn-secondary flex-1"
                          [disabled]="savingNeed()">
                    {{ savingNeed() ? 'Salvando…' : (editingId() ? 'Atualizar' : 'Criar') }}
                  </button>
                  @if (editingId()) {
                    <button type="button" (click)="cancelEdit()" class="btn-ghost">
                      Cancelar
                    </button>
                  }
                </div>
              </form>
            </div>
          </aside>

          <!-- List -->
          <div class="lg:col-span-2">
            @if (loadingNeeds()) {
              <div class="flex justify-center py-16">
                <div class="w-10 h-10 border-4 border-olive border-t-transparent rounded-full animate-spin"></div>
              </div>
            } @else {
              <ul class="space-y-3" role="list">
                @for (need of needs(); track need.id) {
                  <li class="card flex items-start gap-4">
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-2 flex-wrap">
                        <span class="font-semibold text-gray-800">{{ need.title }}</span>
                        <span class="text-xs bg-sand text-warm-gray rounded-full px-2 py-0.5">{{ need.category }}</span>
                        <span class="text-xs rounded-full px-2 py-0.5 font-medium"
                              [class]="statusClass(need.status)">
                          {{ statusLabel(need.status) }}
                        </span>
                      </div>
                      <p class="text-sm text-warm-gray mt-1">
                        {{ need.currentQuantity }} / {{ need.targetQuantity }} unidades
                      </p>
                    </div>
                    <div class="flex gap-2 shrink-0">
                      <button (click)="editNeed(need)"
                              class="min-h-[40px] px-3 rounded-lg bg-olive/10 text-olive hover:bg-olive/20 text-sm font-medium transition-colors">
                        Editar
                      </button>
                      <button (click)="deleteNeed(need.id)"
                              class="min-h-[40px] px-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-sm font-medium transition-colors">
                        Excluir
                      </button>
                    </div>
                  </li>
                }
              </ul>
            }
          </div>
        </div>
      }

      <!-- CONTACTS TAB -->
      @if (tab() === 'contacts') {
        @if (loadingContacts()) {
          <div class="flex justify-center py-16">
            <div class="w-10 h-10 border-4 border-olive border-t-transparent rounded-full animate-spin"></div>
          </div>
        } @else {
          <ul class="space-y-4" role="list">
            @for (c of contacts(); track c.id) {
              <li class="card">
                <div class="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <p class="font-semibold text-gray-800">{{ c.name }}</p>
                    <p class="text-sm text-warm-gray">{{ c.phone }}{{ c.email ? ' · ' + c.email : '' }}</p>
                  </div>
                  <span class="text-xs font-semibold rounded-full px-3 py-1"
                        [class]="c.requestType === 'VOLUNTEER' ? 'bg-olive/10 text-olive' : 'bg-terra/10 text-terra'">
                    {{ c.requestType === 'VOLUNTEER' ? '🤝 Voluntário' : '💬 Apoio' }}
                  </span>
                </div>
                @if (c.interestArea) {
                  <p class="text-sm text-warm-gray">Área: <span class="font-medium text-gray-700">{{ c.interestArea }}</span></p>
                }
                @if (c.message) {
                  <p class="text-sm text-gray-700 mt-2 bg-sand rounded-lg p-3">{{ c.message }}</p>
                }
                <p class="text-xs text-warm-gray mt-2">
                  Recebido em {{ c.sentAt | date:'dd/MM/yyyy HH:mm' }}
                </p>
              </li>
            }
          </ul>
        }
      }
    </div>
  `,
})
export class AdminComponent implements OnInit {
  private readonly needService     = inject(DonationNeedService);
  private readonly contactService  = inject(VolunteerContactService);
  private readonly fb              = inject(FormBuilder);

  tab             = signal<AdminTab>('needs');
  needs           = signal<DonationNeed[]>([]);
  contacts        = signal<VolunteerContact[]>([]);
  loadingNeeds    = signal(true);
  loadingContacts = signal(true);
  savingNeed      = signal(false);
  editingId       = signal<number | null>(null);

  needForm!: FormGroup;

  ngOnInit() {
    this.buildNeedForm();
    this.loadNeeds();
    this.loadContacts();
  }

  buildNeedForm() {
    this.needForm = this.fb.group({
      title:           ['', [Validators.required, Validators.maxLength(150)]],
      category:        ['', [Validators.required, Validators.maxLength(80)]],
      description:     [''],
      targetQuantity:  [1, [Validators.required, Validators.min(1)]],
      currentQuantity: [0, [Validators.min(0)]],
      status:          ['NEEDED'],
    });
  }

  loadNeeds() {
    this.loadingNeeds.set(true);
    this.needService.getAll().subscribe({
      next:  (data) => { this.needs.set(data); this.loadingNeeds.set(false); },
      error: ()     => this.loadingNeeds.set(false),
    });
  }

  loadContacts() {
    this.loadingContacts.set(true);
    this.contactService.getAll().subscribe({
      next:  (data) => { this.contacts.set(data); this.loadingContacts.set(false); },
      error: ()     => this.loadingContacts.set(false),
    });
  }

  editNeed(need: DonationNeed) {
    this.editingId.set(need.id);
    this.needForm.patchValue({
      title:           need.title,
      category:        need.category,
      description:     need.description ?? '',
      targetQuantity:  need.targetQuantity,
      currentQuantity: need.currentQuantity,
      status:          need.status,
    });
  }

  cancelEdit() {
    this.editingId.set(null);
    this.needForm.reset({ status: 'NEEDED', targetQuantity: 1, currentQuantity: 0 });
  }

  saveNeed() {
    this.needForm.markAllAsTouched();
    if (this.needForm.invalid) return;

    this.savingNeed.set(true);
    const payload = this.needForm.value;
    const id = this.editingId();

    const obs = id
      ? this.needService.update(id, payload)
      : this.needService.create(payload);

    obs.subscribe({
      next: () => {
        this.savingNeed.set(false);
        this.cancelEdit();
        this.loadNeeds();
      },
      error: () => this.savingNeed.set(false),
    });
  }

  deleteNeed(id: number) {
    if (!confirm('Deseja realmente excluir esta necessidade?')) return;
    this.needService.delete(id).subscribe({ next: () => this.loadNeeds() });
  }

  statusLabel(status: string): string {
    const map: Record<string, string> = {
      NEEDED: 'Necessário', PARTIALLY_MET: 'Parcial', MET: 'Atendido',
    };
    return map[status] ?? status;
  }

  statusClass(status: string): string {
    const map: Record<string, string> = {
      NEEDED: 'bg-red-100 text-red-700',
      PARTIALLY_MET: 'bg-yellow-100 text-yellow-700',
      MET: 'bg-green-100 text-green-700',
    };
    return map[status] ?? '';
  }
}
