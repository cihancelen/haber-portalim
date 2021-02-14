# HaberPortalimFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Kullanıcı hesapları

Admin kullanıcısı sadece firebase'den oluşturulabiliyor.

Manager
manager@manager.com
123456

Users
xdxdxd.2@gmail.com
123456

xxxx1@gmail.com
123456

Manager kullanıcına girerken url = http://localhost:4220/auth/manager-login
Son kullanıcı girerken = http://localhost:4220/auth/login
Son kullanıcı kayıt = http://localhost:4220/auth/register

Firebase veri tabanı nosql bir veri tabanı olduğu için 3 tablo yerine 2 tabloda(collection'da) projeyi bitirdik. Normal ilişkisel veri tabanı kullansaydık en az 5 tablomuz olacaktı. Neden olacak diye örnek verirsek haber dökümanının icinde tags diye alt collection var. Normalde bu farklı bir tablo olup onu da many to many(yani çoka çok) tabloda bağlamamız gerekirdi.