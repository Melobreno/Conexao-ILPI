import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DonationNeed, DonationNeedRequest } from '../models/donation-need.model';

@Injectable({ providedIn: 'root' })
export class DonationNeedService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/donation-needs`;

  getAll(activeOnly = false): Observable<DonationNeed[]> {
    const params = new HttpParams().set('activeOnly', String(activeOnly));
    return this.http.get<DonationNeed[]>(this.baseUrl, { params });
  }

  getById(id: number): Observable<DonationNeed> {
    return this.http.get<DonationNeed>(`${this.baseUrl}/${id}`);
  }

  create(payload: DonationNeedRequest): Observable<DonationNeed> {
    return this.http.post<DonationNeed>(this.baseUrl, payload);
  }

  update(id: number, payload: DonationNeedRequest): Observable<DonationNeed> {
    return this.http.put<DonationNeed>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
