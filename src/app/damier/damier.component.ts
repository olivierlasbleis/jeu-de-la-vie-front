import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import Case from '../models/Case'
import Index from '../models/Index'
import {JeuDeLaVieService} from '../services/jeu-de-la-vie.service'
import {cloneDeep} from 'lodash';
import TableauPost from '../models/TableauPost';
import TailleTableau from '../models/TailleTableau';
import {MatDialog} from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';
import Structure from '../models/Structure';
import {StructureService} from '../services/structure.service';
import { NouvelleStructureComponent } from './nouvelle-structure/nouvelle-structure.component';

@Component({
  selector: 'app-damier',
  templateUrl: './damier.component.html',
  styleUrls: ['./damier.component.scss']
})
export class DamierComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private cdr: ChangeDetectorRef, 
    public jeuService : JeuDeLaVieService,
    public structureService : StructureService) { }


  tableauVueVide : Case[][] = [];
  tableauVue : Case[][] = [];
  situationInitialeIndex : Index[] = [];
tableauPost : TableauPost = {} as TableauPost;
tableauPostPrecedent : TableauPost = {} as TableauPost;
isStarted : boolean = false;
isCalculating : boolean = false;
situationStable : boolean = false;
structures : Structure[] = [];
panelOpenState = false;
typeStructures : string[] = [];
structureCourante : Structure;
xpandStatus = false;
opened :boolean = true;

ngOnInit(): void {
  this.structureService.getAllTypeStructure().subscribe(typeStructures => this.typeStructures = typeStructures)
  this.tableauPost.listeIndex = [] 
  this.tableauPost.tailleTableau = {} as TailleTableau;
  this.tableauPost.tailleTableau.x = 40;
  this.tableauPost.tailleTableau.y = 40;
    for (let i = 0; i < this.tableauPost.tailleTableau.x; i++) {
      this.tableauVueVide.push([])
      for (let j = 0; j < this.tableauPost.tailleTableau.y; j++) {
        this.tableauVueVide[i].push({'index' : {'i':i,'j':j},'value':0});
      }
    }
    this.tableauVue = cloneDeep(this.tableauVueVide);
}

openSidenav(){
  if (this.opened) {
    this.opened = false;
  } else {
    this.opened = true;
  }
}

enregistrerElement(structure : Structure){
  console.log(structure.listePoints)
  if(structure.listePoints.length ===0){
    this.openDialog("Cette structure n'existe pas encore, voulez vous contribuer?",structure);
  }else{
  this.structureCourante = structure;
  }
  this.openSidenav()
}

signalerElement(structure : Structure){
  this.openDialog("Vous pensez que la configuration de l'élément est mauvaise, voulez vous contribuer et voter pour une autre ?",structure);
  this.openSidenav()
}

openNouvelleStructure(structure : Structure) {
  

  const dialogRef = this.dialog.open(NouvelleStructureComponent,{
   
    data: structure
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: `);
    result.listePoints.forEach(p => {
      console.log("i");
      console.log(p.i);
      console.log("j");
      console.log(p.j)
    });
    this.structureService.getStructures(result.typeStructure).subscribe(structures => {this.structures = structures;console.log(this.structures)})
  });
      
  
}

  openDialog(message : string, structure : Structure) : any {
    const dialogRef = this.dialog.open(PopupComponent,{
     
      data: message
    });
    dialogRef.afterClosed().subscribe(result => {
     console.log(result);
      if ((message === "Cette structure n'existe pas encore, voulez vous contribuer?"
      || message === "Vous pensez que la configuration de l'élément est mauvaise, voulez vous contribuer et voter pour une autre ?")
       && result == "ACCEPTE") {
        this.openNouvelleStructure(structure);
      }
    });
  }

  selectStructure(typeStructure : string){
    this.structureService.getStructures(typeStructure).subscribe(structures => {this.structures = structures;console.log(this.structures)})
    
  }

gridsize: number = 500;
  updateSetting(event) {
    this.gridsize = event.value;
  }

  
   stopCalculating(){
    this.isCalculating =false
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  getNextSituation(){
      this.jeuService.getNextSituation(this.tableauVue).subscribe((situationFinale) => {
        this.tableauVue = situationFinale;})
  }

  async getNextSituationIndex(){
    if (this.tableauPost.listeIndex.length!==0) {
      
   
    this.isCalculating = true;
    this.situationStable = false;
    while (this.isCalculating) {
      if(!this.sameSituation()){
      this.jeuService.getNextSituationIndex(this.tableauPost).subscribe((situationFinaleIndex) => {
        this.situationInitialeIndex = situationFinaleIndex;
        this.transformSituationInitialeIndex(situationFinaleIndex);
        this.tableauPost.listeIndex = situationFinaleIndex;})
        this.tableauPostPrecedent = cloneDeep(this.tableauPost);
      await this.delay(1100 - this.gridsize);
    }else{
      this.isCalculating = false
      this.situationStable = true
      this.openDialog("Vous avez atteint une situation stable!",null);
    }
    }
  }else{
    this.openDialog("Vous devez au moins créer une cellule vivante, cliquer sur la grille ou sélectionnez une structure",null);
  }
  }

  sameSituation() : boolean {
    if(JSON.stringify(this.tableauPostPrecedent) === JSON.stringify(this.tableauPost)){
      return true;
    }else{
      return false;
    }
    
  }

  transformSituationInitialeIndex(situationFinaleIndex : Index[]){
    let situationFinaleCase : Case[][] = cloneDeep(this.tableauVueVide);
    situationFinaleIndex.forEach(index => {
      situationFinaleCase[index.i][index.j].value = 1;
    });
    this.tableauVue = situationFinaleCase;
    
  }

  stopNextSituation(){
    this.isCalculating = false;
  }

  clickCase(caseCourante : Case) : void{
    if(!this.structureCourante){
    if (caseCourante.value == 0) {
      caseCourante.value = 1;
      this.tableauVue[caseCourante.index.i][caseCourante.index.j] = caseCourante;
      this.tableauPost.listeIndex.push(caseCourante.index)
    } else {
      caseCourante.value = 0;
      this.tableauVue[caseCourante.index.i][caseCourante.index.j] = caseCourante;
      this.tableauPost.listeIndex = this.tableauPost.listeIndex.filter((index) => index.i !== caseCourante.index.i || index.j !== caseCourante.index.j)
    }
    this.cdr.detectChanges();
  }else{
    
    this.structureCourante.listePoints.forEach(point => {
      this.tableauVue[caseCourante.index.i + point.i][caseCourante.index.j+ point.j].value = 1;
      let newIndex : Index = {i:caseCourante.index.i + point.i,j:caseCourante.index.j+ point.j};
      this.tableauPost.listeIndex.push(newIndex)
    });
    this.structureCourante = null;
  
  }
}

}
