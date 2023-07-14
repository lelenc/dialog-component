import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import  {defineCustomElement as dialog} from "dialog-component/dist/components/dialog-component";

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

dialog();

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/