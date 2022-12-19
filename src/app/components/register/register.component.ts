import { Component, OnInit } from '@angular/core';
import { SendEmailService } from '../../services/send-email.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: any;
  register: any = {
    nombre: 'Juan',
    email: 'juanrosero1407@gmail.com',
    indicativo: '',
    know: 0,
    url: '',
  };
  typeDataPass: boolean = false;

  validation_messages = {
    nombre: [{ type: 'required', message: '* Nombre es requerido.' }],
    indicativo: [{ type: 'required', message: '* Indicativo es requerido.' }],
    numero: [
      { type: 'required', message: '* Número es requerido.' },
      {
        type: 'minlength',
        message: '* Número móvil debe tener al menos 10 caracteres.',
      },
      { type: 'pattern', message: '* Solo debe contener números.' },
    ],
    email: [
      { type: 'required', message: '* Email es requerido.' },
      {
        type: 'pattern',
        message: '* Ingresa un email válido.',
      },
    ],
    password: [{ type: 'required', message: '* Contraseña es requerida' }],
  };

  options = [
    { id: 1, nombre: 'Anuncio en redes' },
    { id: 2, nombre: 'Familiar o amigo' },
    { id: 3, nombre: 'Colectivo millenial' },
    { id: 4, nombre: 'Google' },
    { id: 5, nombre: 'Referido u otro:' },
  ];

  acceptTermns = false;

  constructor(
    private formBuilder: FormBuilder,
    private emailService: SendEmailService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      numero: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.pattern('^[0-9]*$'),
        ])
      ),
      nombre: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      indicativo: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      password: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  showPass() {
    this.typeDataPass = !this.typeDataPass;
  }

  selectOption(o: any) {
    this.register.know = o.id;
  }

  clearForm() {
    this.registerForm.reset();
    this.register.know = 0;
    this.acceptTermns = false;
  }

  registroFunc() {
    let code = Math.floor(100000 + Math.random() * 900000);
    this.register.url = `http://localhost:4200/simulador/${code}`;
    this.emailService.sendMail(this.register).subscribe(
      (res) => {
        this.toast.show(
          'Se ha registrado exitosamente. Para realizar la simulación revisa tu email.',
          {
            classname: 'bg-success text-light',
          }
        );
        this.clearForm();
      },
      (err) => {
        this.toast.show(
          'Ha ocurrido un error en el registro. Intenta más tarde',
          {
            classname: 'bg-danger text-light',
          }
        );
        throw err;
      }
    );
  }
}
