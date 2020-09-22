import { Component, OnInit, Inject } from '@angular/core';
import Case from '../../models/Case';
import Index from '../../models/Index';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StructureService } from 'src/app/services/structure.service';
import Structure from 'src/app/models/Structure';
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-nouvelle-structure',
  templateUrl: './nouvelle-structure.component.html',
  styleUrls: ['./nouvelle-structure.component.scss']
})
export class NouvelleStructureComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NouvelleStructureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Structure,
    public structureService : StructureService) { }

  postEffectue : boolean = false;
  tableauVue : Case[][] = [];
  tableauIndexPost : Index[] = [];

  ngOnInit(): void {
    console.log(this.data)
    for (let i = 0; i < 10; i++) {
      this.tableauVue.push([])
      for (let j = 0; j < 10; j++) {
        this.tableauVue[i].push({'index' : {'i':i,'j':j},'value':0});
      }
    }
  }

  plusPetit(){
    let tableauVuePrecedent : Case[][] = cloneDeep(this.tableauVue);
    let longeurTableauVuePrecedent : number = this.tableauVue[0].length;
    this.tableauVue = [];
    for (let i = 0; i < longeurTableauVuePrecedent - 1; i++) {
      this.tableauVue.push([])
      for (let j = 0; j < longeurTableauVuePrecedent - 1; j++) {
        this.tableauVue[i].push({'index' : {'i':i,'j':j},'value':tableauVuePrecedent[i][j].value});
      }
    }
    
  }

  plusGrand(){
    let tableauVuePrecedent : Case[][] = cloneDeep(this.tableauVue);
    let longeurTableauVuePrecedent : number = this.tableauVue[0].length;
    this.tableauVue = [];
    for (let i = 0; i < longeurTableauVuePrecedent + 1; i++) {
      this.tableauVue.push([])
      for (let j = 0; j < longeurTableauVuePrecedent + 1; j++) {
        if (tableauVuePrecedent.length>i && tableauVuePrecedent[i].length>j) {
          this.tableauVue[i].push({'index' : {'i':i,'j':j},'value':tableauVuePrecedent[i][j].value});
         
        }else{
          this.tableauVue[i].push({'index' : {'i':i,'j':j},'value':0});
        }
      }
    }
  }

  clickCase(caseCourante : Case) : void{
    if (caseCourante.value == 0) {
      this.tableauVue[caseCourante.index.i][caseCourante.index.j].value = 1;
      this.tableauIndexPost.push(caseCourante.index)
    } else {
      this.tableauVue[caseCourante.index.i][caseCourante.index.j].value = 0;
      this.tableauIndexPost = this.tableauIndexPost.filter((index) => index.i !== caseCourante.index.i || index.j !== caseCourante.index.j)
    }
  }

  postNouvelStructure(){
    this.data.listePoints = this.tableauIndexPost;
    this.structureService.postStructures( this.data).subscribe(structure => {this.data = structure;
      console.log("post : ");console.log(this.data); this.postEffectue = true;});
    
  }

  

}
