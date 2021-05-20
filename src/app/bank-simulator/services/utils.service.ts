import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private urlBack = environment.urlBack;
  private urlBankListProvider = environment.urlBankListProvider;

  constructor(private http: HttpClient) { }

  getBanksData() {
    return this.http.get<any>(this.urlBankListProvider);
  }

  createNewRecipient(data: any) {
    return this.http.post<any>(`${this.urlBack}/createRecipient`, data);
  }

  createTransfer(data: any) {
    return this.http.post<any>(`${this.urlBack}/createTransfer`, data);
  }

  getTransferHistory() {
    return this.http.get<any>(`${this.urlBack}/getTransferHistory`)
  }
  
  getRecipients() {
    return this.http.get<any>(`${this.urlBack}/getRecipients`)
  }
}

