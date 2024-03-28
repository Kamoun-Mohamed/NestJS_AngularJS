import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  // submit(): void {
  //   this.http.post('http://localhost:8000/api/login', this.form.getRawValue(), {
  //     withCredentials: true
  //   }).subscribe(() => this.router.navigate(['/home']));
  // }
  submit(): void {
    if (this.form.valid) {
      this.http.post<any>('http://localhost:8000/api/login', this.form.getRawValue(), { withCredentials: true })
        .subscribe(response => {
          if (response && response.message === 'success' && response.name) {
            // Récupérer le nom de l'utilisateur
            const username = response.name;
            //console.log(response.name);
            // Naviguer vers la page /home en transmettant le nom d'utilisateur
            this.router.navigate(['/home'], { queryParams: { username: response.name } });
          } else {
            console.error('Login failed:', response);
            // Gérer les échecs de connexion ici
          }
        });
    }
  }
}