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
  keySize: 16 | 24 | 32 | 128 = 128;
  plainText = 'Hello World';
  cipherText = '';
  decipheredText = '';

  constructor(private rc6Service: Rc6Service) { }

  setKeySize(keySize: string) {
    this.keySize = +keySize as 16 | 24 | 32 | 128;
    console.log("key", this.keySize);
  }

  encrypt(plainText: string, keySize: number, key: string) {
    this.rc6Service.encrypt({ plainText, keySize, key }).subscribe(data => this.cipherText = data);
  }

  decrypt(cipherText: string, keySize: number, key: string) {
    this.rc6Service.decrypt({ cipherText, keySize, key }).subscribe(data => this.decipheredText = data);
  }
}
