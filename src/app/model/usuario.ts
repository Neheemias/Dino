import { NivelEducacional } from './nivel-educacional';
import { Persona } from "./persona";
import { Asistencia } from '../interfaces/asistencia';
import { DataBaseService } from '../services/data-base.service';
import { Optional } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

export class Usuario extends Persona {

  public cuenta: string;
  public correo: string;
  public password: string;
  public preguntaSecreta: string;
  public respuestaSecreta: string;
  public asistencia?: Asistencia | null;
  public listaUsuarios: Usuario[];
  


  constructor(@Optional() private db?: DataBaseService) {
    super();
    this.cuenta = '';
    this.correo = '';
    this.password = '';
    this.preguntaSecreta = '';
    this.respuestaSecreta = '';
    this.nombre = '';
    this.apellido = '';
    this.nivelEducacional = NivelEducacional.buscarNivelEducacional(1)!;
    this.fechaNacimiento = undefined;
    this.direccion = '';
    this.asistencia = null;
    this.listaUsuarios = [];
  }

  public asistenciaVacia(): Asistencia {
    return {  
      bloqueInicio: 0,
      bloqueTermino: 0,
      dia: '',
      horaFin: '',
      horaInicio: '',
      idAsignatura: '',
      nombreAsignatura: '',
      nombreProfesor: '',
      seccion: '',
      sede: ''
    };
  }

  public static getNewUsuario(
    cuenta: string,
    correo: string,
    password: string,
    preguntaSecreta: string,
    respuestaSecreta: string,
    nombre: string,
    apellido: string,
    nivelEducacional: NivelEducacional,
    fechaNacimiento: Date | undefined,
    direccion: string
  ) {
    let usuario = new Usuario() ;
    usuario.cuenta = cuenta;
    usuario.correo = correo;
    usuario.password = password;
    usuario.preguntaSecreta = preguntaSecreta;
    usuario.respuestaSecreta = respuestaSecreta;
    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.nivelEducacional = nivelEducacional;
    usuario.fechaNacimiento = fechaNacimiento;
    usuario.direccion = direccion;
    return usuario;
  }

  async buscarUsuarioValido(cuenta: string, password: string): Promise<Usuario | undefined> {
    return await this.db?.buscarUsuarioValido(cuenta, password);
  }

  async buscarUsuarioPorCuenta(cuenta: string): Promise<Usuario | undefined>  {
    return await this.db?.buscarUsuarioPorCuenta(cuenta);
  }

  async guardarUsuario(usuario: Usuario): Promise<void> {
    this.db!.guardarUsuario(usuario);
  }

  async eliminarUsuario(cuenta: string): Promise<void>  {
    this.db!.eliminarUsuarioUsandoCuenta(cuenta);
  }

  navegarEnviandousuario(router: Router, pagina: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        cuenta: this.cuenta,
        password: this.password, 
      }
    }
    if (this.cuenta.trim() !== '' && this.password.trim()) {
      router.navigate([pagina], navigationExtras);
    } else {
      router.navigate(['/login']);
    }
  }

  async recibirUsuario(activatedRoute: ActivatedRoute, router: Router) {
    activatedRoute.queryParams.subscribe(async () => { // Cambiar a async
      const nav = router.getCurrentNavigation();
      if (nav) {
        if (nav.extras.state) {
          const cuenta = nav.extras.state ['cuenta'];
          const password = nav.extras.state['password'];
          const usuarioInstance = new Usuario(this.db); // Crear instancia
          const usu = await usuarioInstance.buscarUsuarioValido(cuenta, password); // Usar await
          if (usu) {
            this.cuenta = usu.cuenta;
            this.correo = usu.correo;
            this.password = usu.password;
            this.preguntaSecreta = usu.preguntaSecreta;
            this.respuestaSecreta = usu.respuestaSecreta;
            this.nombre = usu.nombre;
            this.apellido = usu.apellido;
            this.nivelEducacional = usu.nivelEducacional;
            this.fechaNacimiento = usu.fechaNacimiento;
            return;
          }
        }
      }
      router.navigate(['/login']);
    });
  }
  


  public override toString(): string {
    return `
      ${this.cuenta}
      ${this.correo}
      ${this.password}
      ${this.preguntaSecreta}
      ${this.respuestaSecreta}
      ${this.nombre}
      ${this.apellido}
      ${this.nivelEducacional.getEducacion()}
      ${this.getFechaNacimiento()}
      ${this.direccion}`;
  }

}

export { Asistencia };
