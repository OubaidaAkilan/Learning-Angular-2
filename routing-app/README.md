# RoutingApp


## Navigation

We can navigate using two methods:

1- Declarative Navigation

- is when you use Angular directives like routerLink in your templates to define navigation links.

- This method allows you to define navigation links directly in your HTML templates without writing TypeScript code.

[Example in my code](https://github.com/OubaidaAkilan/Learning-Angular-2/blob/main/routing-app/src/app/app.component.html).

- If you want to add custom style to links you can use the routerLinkActive="your.class" directive.

- If you want to custom style for exact path like /home/detail you can use the [routerLinkActiveOptions]="{ exact: true }" directive, this option will match the same path to apply your custom style.

```typescript
<ul>
  <li routerLinkActive="your.class"><a routerLink="/home">Home</a></li>
  <li  routerLinkActive="another.class"><a routerLink="/about">About</a></li>
</ul>

```


2- Programmatic Navigation

- is when you use TypeScript code to navigate from one component to another, the main class  responsible for programmatic navigation is the Router class from @angular/router.  

- we typically inject the Router service into your component and use its methods like navigateByUrl() or navigate() to navigate to different routes.

[Example in my code](https://github.com/OubaidaAkilan/Learning-Angular-2/blob/main/routing-app/src/app/servers/servers.component.ts).

```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-example',
  template: `
    <button (click)="navigateToHome()">Go to Home</button>
  `,
})
export class ExampleComponent {
  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/home']); // Navigate to the 'home' route
  }
}

```

- [Lazy Loading](https://www.digitalocean.com/community/tutorials/angular-lazy-loading)

