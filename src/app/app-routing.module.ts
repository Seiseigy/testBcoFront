import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewRecipientComponent } from "./bank-simulator/components/new-recipient/new-recipient.component";
import { TransferComponent } from "./bank-simulator/components/transfer/transfer.component";
import { TransfersHistoryComponent } from "./bank-simulator/components/transfers-history/transfers-history.component";

const routes: Routes = [
  { path: 'new-recipient', component: NewRecipientComponent },
  { path: 'transfer', component: TransferComponent },
  { path: 'transfer-history', component: TransfersHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
