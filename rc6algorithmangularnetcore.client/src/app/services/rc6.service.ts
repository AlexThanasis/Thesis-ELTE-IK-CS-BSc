import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EncryptionDto } from '../models/encryptionDto';
import { DecryptionDto } from '../models/decryptionDto';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class Rc6Service {
  encryptionUrl = 'RC6/Encrypt';
  decryptionUrl = 'RC6/Decrypt';

  constructor(private httpClient: HttpClient) { }

  encrypt(encryptionDto: EncryptionDto) {
    return this.httpClient.post<string>(`${environment.apiUrl}/${this.encryptionUrl}`, encryptionDto);
  }
  decrypt(decryptionDto: DecryptionDto) {
    return this.httpClient.post<string>(`${environment.apiUrl}/${this.decryptionUrl}`, decryptionDto);
  }
}
