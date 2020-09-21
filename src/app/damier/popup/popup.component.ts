import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

    DEMANDE_CONTRIBUTION : boolean = false;
    ACCEPTE : string = "ACCEPTE";
    REFUSE : string = "REFUSE";
  ngOnInit(): void {
    if(this.data == "Cette structure n'existe pas encore, voulez vous contribuer?"
    || this.data == "Vous pensez que la configuration de l'élément est mauvaise, voulez vous contribuer et voter pour une autre ?"){
      this.DEMANDE_CONTRIBUTION = true;
    }
  }

  oui(){

  }

  non(){
    
  }

}
