import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
heroes: HeroeModel[]=[];
cargando= false;
  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
this.cargando=true;
    this.heroesService.getHeroes()
    .subscribe(resp =>{
     
      this.heroes=resp;
      this.cargando=false;
    });
  }

  getHeroe(id:string){
    return this.http.get(`${ this.url }/heroes/${id}.json`);
  }
borrarHeroe(heroe: HeroeModel, i:number){
  Swal.fire({
    title: 'Esta seguro?',
    text: `Está seguro que desea borrar a ${heroe.nombre}`,
    type: 'question',
    showConfirmButton: true,
    showCancelButton:true
  }).then(resp =>{

    if(resp.value){
      this.heroes.splice(i,1);
    this.heroesService.borrarHeroes(heroe.id).subscribe();
  }
   
});

  }
}

