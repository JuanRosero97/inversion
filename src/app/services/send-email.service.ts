import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SendEmailService {
  constructor(private http: HttpClient) {}

  sendMail(user: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`api:${environment.API_KEY_MAILGUN}`)}`,
    });
    const formData = new FormData();
    formData.append(
      'from',
      `Mailgun Sandbox <postmaster@${environment.CLIENT_MAILGUN}.mailgun.org>`
    );
    formData.append('to', user.email);
    formData.append('subject', 'Lokl - Gracias por registrarte');
    formData.append('template', 'lokl-reg');
    formData.append(
      'h:X-Mailgun-Variables',
      JSON.stringify({ name: user.nombre, url: user.url })
    );

    return this.http
      .post(
        `https://api.mailgun.net/v3/${environment.CLIENT_MAILGUN}.mailgun.org/messages`,
        formData,
        { headers }
      )
      .pipe(map((d) => d));
  }
}
