import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {

  validation_messages = {
    'name': [
      { type: 'required', message: 'The name field is required' }
    ],
    'lastname': [
      { type: 'required', message: 'The lastname field is required' }
    ],
    'email': [
        { type: 'required', message: 'The email is required' },
        { type: 'pattern', message: 'The email is incorrect.' }
      ],
    'cellphone':[
      { type: 'required', message: 'The contact number is required' },
      { type: 'pattern', message: 'Incorrect format for the contact number' }
    ]
  } 
  user = new FormGroup({
    name: new FormControl('',Validators.required),
    lastname: new FormControl('',Validators.required),
    cellphone: new FormControl('',Validators.compose([
      Validators.required,
      Validators.pattern("[0-9 ]{10}")
    ])),
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
    ]))
  })
  constructor() { }

  ngOnInit() {
    this.changeValues();
  }

  changeValues() {
    //Aqui se guarda la info del usuario loggeado
    // const {id, name, lastname, cellphone, email}= this.loggedUser;
    // const user = {
    //   id, 
    //   name, 
    //   lastname,
    //   cellphone,
    //   email
    // }
    // this.user.setValue(user);
  }

  update() {
    //Metodo para actualizar la información del usuario
  }

}
