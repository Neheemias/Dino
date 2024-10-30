import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { Params } from '@angular/router';
//ionic module sirva
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  

      })
export class PreguntaPage implements OnInit {

  public usuario!: Usuario ;
  public respuesta: string = '';






  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    ) {
      this.activatedRouter.queryParams.subscribe ((params: Params) =>  {
                const navigation = this.router.getCurrentNavigation();
        if (navigation && navigation.extras.state) {
          this.usuario = navigation.extras.state['usuario'];
        } else {
          this.router.navigate(['/login']);
        }
      });
     }

  ngOnInit() {
  }

  public validarRespuesta(): void{
    if (this.usuario.respuestaSecreta === this.respuesta){
      alert ('CORRECTO!!! tu clave es ' + this.usuario.password);
    } else {
      alert ('INCORRECTO!!! ');
    }
  }

}
