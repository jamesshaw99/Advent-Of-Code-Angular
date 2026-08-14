import { provideZoneChangeDetection, importProvidersFrom } from "@angular/core";

import { InputService } from "./app/services/input.service";
import { challengeInstances } from "./app/helpers/challenge-definitions";
import { provideHttpClient, withXhr } from "@angular/common/http";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { routes } from "./app/app.routes";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatIconModule } from "@angular/material/icon";
import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, MatProgressBarModule, MatIconModule),
        provideRouter(routes),
        provideZoneChangeDetection({ eventCoalescing: true }),
        InputService,
        { provide: 'CHALLENGES', useValue: challengeInstances },
        provideHttpClient(withXhr()),
        provideAnimationsAsync()
    ]
})
  .catch(err => console.error(err));
