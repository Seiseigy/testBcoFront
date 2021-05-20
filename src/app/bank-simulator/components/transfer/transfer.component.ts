import { Component, OnInit } from '@angular/core';
import { UtilsService } from "../../services/utils.service";
import { FormGroup, FormControl, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  selectedRecipient: any;
  recipientsList: Array<any>;

  form = new FormGroup({
    recipient: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
  });

  get f(){
    return this.form.controls;
  }

  constructor(private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.getRecipientsList();
  }

  getRecipientsList(): void {
    this.utilsService.getRecipients().subscribe(
      (res) => {
        if(res.status === 'ok') {
          this.recipientsList = res.data;
          console.log(this.recipientsList);
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  submit(){
    if(this.form.invalid === false) {
      let data = {
        recipient: this.form.value.recipient._id,
        amount: this.form.value.amount
      }
      this.utilsService.createTransfer(data).subscribe(
        (resp) => {
          if(resp.status === 'ok') {
            Swal.fire({
              icon: 'success',
              title: '¡Listo!',
              text: 'La transferencia ha sido realizada con éxito',
            })
            this.form.reset();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops',
              text: 'Ocurrió un error al realizar la transferencia',
            })
          }
        },
        (error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: 'Ocurrió un error al realizar la transferencia',
          })
        });
    }
  }

}
