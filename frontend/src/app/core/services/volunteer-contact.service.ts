import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  VolunteerContact,
  VolunteerContactRequest,
  RequestType,
} from '../models/volunteer-contact.model';

@Injectable({ providedIn: 'root' })
export class VolunteerContactService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/contacts`;

  getAll(type?: RequestType): Observable<VolunteerContact[]> {
    let params = new HttpParams();
    if (type) params = params.set('type', type);
    return this.http.get<VolunteerContact[]>(this.baseUrl, { params });
  }

  getById(id: number): Observable<VolunteerContact> {
    return this.http.get<VolunteerContact>(`${this.baseUrl}/${id}`);
  }

  submit(payload: VolunteerContactRequest): Observable<VolunteerContact> {
    return this.http.post<VolunteerContact>(this.baseUrl, payload);
  }
}
