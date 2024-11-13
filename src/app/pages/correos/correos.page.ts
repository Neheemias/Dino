import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';  // Asegúrate de que esta importación esté correcta
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { NavigationExtras, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageComponent } from 'src/app/components/language/language.component';
import { DataBaseService  } from 'src/app/services/data-base.service';
import { showToast  } from 'src/app/tools/message-routines';
import { HeaderComponent } from 'src/app/components/header/header.component';


@Component({
  selector: 'app-correos',
  templateUrl: './correos.page.html',
  styleUrls: ['./correos.page.scss'],
  standalone: true,
  imports: [
    //IonContent, 
    //IonHeader, 
    //IonTitle, 
    //IonToolbar, 
    CommonModule,
    FormsModule, 
    IonicModule,             // Permite usar componentes de Ionic
    TranslateModule,        // Permite usar el pipe 'translate'
    LanguageComponent, // Lista de idiomas
    HeaderComponent // CGV-Permite usar el componente Header
  ]
})
export class CorreosPage implements OnInit {

  correo: string = '';

  // Inyección de Usuario
  constructor(private router: Router, private us: Usuario,

    private bd: DataBaseService
   ) { }

  ngOnInit() {}

  async validarRespuesta() {
    if (!this.correo) {
      // Si no se ingresa un correo, mostramos un mensaje de error
      showToast('Por favor, ingresa un correo electrónico.');
      return;
    }

    // Consultamos si el correo está registrado en la base de datos
    try {
      const usuario = await this.bd.buscarUsuarioPorCuenta(this.correo);

      if (this.correo) {
        // Si el correo es encontrado, redirigimos a la página que desees
//       showToast('Correo validado con éxito. Redirigiendo...');
        this.router.navigate(['/preguntas'], {  // Ejemplo: redirigir a la página de contraseña
          state: { correo: this.correo }  // Pasar el correo a la siguiente página
        });
      } else {
        // Si el correo no existe, mostramos un mensaje de error
//        showToast('El correo ingresado no está registrado.');
        this.router.navigate(['/incorrecto']);  // Redirigir a la página de inicio de sesión
      }
    } catch (error) {
      // Manejo de errores si hay problemas con la consulta
      console.error('Error al validar el correo:', error);
      showToast('Hubo un problema al validar el correo. Intenta nuevamente.');
     }
    }
  
    Salir(){
      this.router.navigate(['/ingreso'])
    }

}
