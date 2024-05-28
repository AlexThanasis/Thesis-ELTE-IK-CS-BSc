import { Component } from '@angular/core';
import { EncryptionDto } from 'src/app/models/encryptionDto';
import { Rc6Service } from 'src/app/services/rc6.service';

@Component({
  selector: 'app-rc6',
  templateUrl: './rc6.component.html',
  styleUrls: ['./rc6.component.css']
})
export class Rc6Component {
  key = 'secretKeyForThesis';
  keySize: 128 | 192 | 256 = 128;
  plainText = 'Hello World';
  cipherText = '';
  decipheredText = '';

  constructor(private rc6Service: Rc6Service) { }

  setKeySize(keySize: string) {
    this.keySize = +keySize as 128 | 192 | 256;
  }

  encrypt(plainText: string, keySize: number, key: string) {
    this.rc6Service.encrypt({ plainText, keySize, key }).subscribe(data => this.cipherText = data);
  }

  decrypt(cipherText: string, keySize: number, key: string) {
    this.rc6Service.decrypt({ cipherText, keySize, key }).subscribe(data => this.decipheredText = data);
  }

  isKeyBiggerThenSize(): boolean {
    return this.key.length >= (this.keySize / 8);
  }
}
