import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { UtilsService } from "../../services/utils.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-recipient',
  templateUrl: './new-recipient.component.html',
  styleUrls: ['./new-recipient.component.scss']
})
export class NewRecipientComponent implements OnInit {
  
  banksList: Array<string>;
  accountTypes: Array<string> = ['Cuenta Corriente', 'Cuenta Vista', 'Cuenta de Ahorro']

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    rut: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    destinyBank: new FormControl('', Validators.required),
    accountType: new FormControl('', Validators.required),
    accountNumber: new FormControl('', Validators.required),
  });
  
  get f(){
    return this.form.controls;
  }
  
  submit(){
    if(this.form.invalid === false) {
      this.utilsService.createNewRecipient(this.form.value).subscribe(
        (resp) => {
          if(resp.status === 'ok') {
            Swal.fire({
              icon: 'success',
              title: '¡Listo!',
              text: 'Has creado el nuevo destinatario con éxito',
            })
            this.form.reset();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops',
              text: 'Ocurrió un error al crear el nuevo destinatario',
            })
          }
        },
        (error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: 'Ocurrió un error al crear el nuevo destinatario',
          })
        });
    }
  }

  getBanksList():void {
    let banks: Array <any>;
    this.utilsService.getBanksData().subscribe(
      (res) => {
      banks = res.banks;
      banks = banks.map( element => {
        return element.name
      })
      this.banksList = banks;
      },
      (error) => {
        console.log(error);
      });
  }

  constructor(private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.getBanksList();
  }

}
