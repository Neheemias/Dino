import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageComponent } from 'src/app/components/language/language.component';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'correo-login',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [
      CommonModule            // CGV-Permite usar directivas comunes de Angular
    , FormsModule             // CGV-Permite usar formularios
    , IonicModule             // CGV-Permite usar componentes de Ionic como IonContent, IonItem, etc.
    , TranslateModule         // CGV-Permite usar pipe 'translate'
    , LanguageComponent // CGV-Lista de idiomas
  ]
})
export class CorreoPage implements OnInit {
  
  public correo: string = '';

  constructor(private router: Router, private us: Usuario ) { }
  //el us. es una avreviatura del usuario y lo importa 

  ngOnInit() {
  }

  async validarRespuesta(): Promise<void> {
    const usuarioEncontrado = await this.us.buscarUsuarioPorCuenta(this.correo); // Asegúrate de que esta función sea async
    if (!usuarioEncontrado) {
      alert('EL CORREO NO EXISTE DENTRO DE LAS CUENTAS EXISTENTES');
    } else {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: usuarioEncontrado
        }
      };
      await this.router.navigate(['/pregunta'], navigationExtras);  // Navega solo si el usuario fue encontrado
    }
  }
  


}
