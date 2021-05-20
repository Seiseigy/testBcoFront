import { Component, OnInit } from '@angular/core';
import { UtilsService } from "../../services/utils.service";

@Component({
  selector: 'app-transfers-history',
  templateUrl: './transfers-history.component.html',
  styleUrls: ['./transfers-history.component.scss']
})
export class TransfersHistoryComponent implements OnInit {

  transferHistory: Array<any>;

  constructor(private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.getTransferHistory();
  }

  getTransferHistory(): void {
    this.utilsService.getTransferHistory().subscribe(
      (res) => {
        if(res.status === 'ok') {
          this.transferHistory = res.data;
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
