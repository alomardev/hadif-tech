import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Gender } from 'src/app/models/enums';
import { AuthService } from 'src/app/services/auth.services';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit {

  readonly Gender = Gender;
  section: LoginSection = 'login';

  registerForm: FormGroup = this.fb.group({
    fullname: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    passwordMatch: ['', [Validators.required, (c: FormControl) => {
      if (this.registerForm?.get('password')) {
        return this.registerForm.get('password').value !== c.value ? { mismatch: true } : null
      } else {
        return null;
      }
    }]],
    grade: [1, Validators.required],
    gender: [Gender.Male, Validators.required]
  });

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    remember: [false],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(url => {
      this.section = url[url.length - 1].path as LoginSection;
    });
  }

  setSection(section: LoginSection) {
    const newUrl = this.location.path().replace(new RegExp(`/${this.section}($|/$|/\\?.*$|\\?.*$)`), `/${section}$1`);
    this.section = section;
    this.location.replaceState(newUrl);
  }

  register() {
    this.registerForm.markAllAsTouched();
  }

  login() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }
    const { username, password, remember } = this.loginForm.value;
    this.authService.login(username, password, remember).subscribe(user => {
      this.router.navigateByUrl(`/content/${user.grade}`);
    });
  }

  canShowError(formGroup: FormGroup, controlName: string) {
    const control = formGroup.get(controlName);
    return control?.invalid && (control?.touched || control?.dirty);
  }

}

type LoginSection = 'login' | 'register';
