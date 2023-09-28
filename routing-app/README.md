# RoutingApp


## Navigation

We can navigate using two methods:

1- Declarative Navigation

- Is when you use Angular directives like routerLink in your templates to define navigation links.

- This method allows you to define navigation links directly in your HTML templates without writing TypeScript code.

[Example in my code](https://github.com/OubaidaAkilan/Learning-Angular-2/blob/main/routing-app/src/app/app.component.html).

- If you want to add custom style to links you can use the routerLinkActive="your.class" directive.

- If you want to custom style for exact path like /about you can use the [routerLinkActiveOptions]="{ exact: true }" directive, this option will match the same path to apply your custom style.

```typescript
<ul>
  <li routerLinkActive="your.class"><a routerLink="/home">Home</a></li>
  <li  routerLinkActive="another.class"><a routerLink="/about">About</a></li>
</ul>

```

- If you have a param and you want to pass it using router link you can use `[routerLink]` attribute binding to create navigation links dynamically. (localhost:4200/servers/123)

>note: You can pass many param like this [routerLink]="['/users', user.id, user.name]" , here we pass the id and name as param.

- You can pass a queryParam too, using `[queryParams]` attribute. (localhost:4200/servers/123?allowEdit=1)

- And you can navigate into specific section in your page using the `fragment` attribute. (localhost:4200/servers/123?allowEdit=1#cashSection)

```typescript
  <a
        [routerLink]="['/servers', server.id]"
        [queryParams]="{ allowEdit: server.id === 3 ? '1' : '0' }"
        fragment="cashSection"
        class="list-group-item"
        *ngFor="let server of servers"
      >
        {{ server.name }}
      </a>
```

2- Programmatic Navigation

- Is when you use TypeScript code to navigate from one component to another, the main class  responsible for programmatic navigation is the Router class from @angular/router.  

- we typically inject the Router service into your component and use its method like `navigate()` to navigate to different routes.

[Example in my code](https://github.com/OubaidaAkilan/Learning-Angular-2/blob/main/routing-app/src/app/servers/servers.component.ts).

- The navigate() method receives an array of route segments or a string specifying the destination route.

String specifying the destination route.

```typescript
this.router.navigate('products/123/details');
```

Array of route segments

```typescript
  loadServer(id: number): void {
    // /servers/:id/edit 
    this.route.navigate(['/servers', id, 'edit'], {
      queryParams: { allowEdit: '1' },
      fragment: 'loading',
    });
  }
```

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

Here you can add more configration for the route like  

`relativeTo` :that meaning this new route `edit` is related with the current route for example, if the current route is `localhost:4200/server`, and you want to navigate into `localhost:4200/server/edit` you can use the `relativeTo` option to keep the current route.

```typescript

 onEdit() {
    this.router.navigate(['edit'], {
      relativeTo: this.route,
      queryParamsHandling:'preserve'
      // queryParams: { allowEdit: this.route.snapshot.queryParams['allowEdit'] },
    });
  }

```

`queryParamsHandling` : it is allowing us to control how query parameters are handled during navigation.

- `preserve` If you use 'preserve', it will preserve the existing query parameters and add the new ones without overwriting anything assume you have the following URL `/products?category=electronics&sort=price
`:

```typescript

this.router.navigate(['edit'], {
  relativeTo: this.route,
  queryParamsHandling: 'preserve',
  queryParams: { sort: 'date', filter: 'new' }
});


```

Resulting URL: `/products/edit?category=electronics&sort=price&sort=date&filter=new`,
>Notice that it preserved the original 'sort=price' parameter and added the new 'sort=date' and 'filter=new' parameters.

- `merge`: If you use 'merge', it will add or update the specified query parameters without removing any existing ones.

```typescript

this.router.navigate(['edit'], {
  relativeTo: this.route,
  queryParamsHandling: 'merge',
  queryParams: { sort: 'date', filter: 'new' }
});



```

Resulting URL: `/products/edit?category=electronics&sort=date&filter=new`,
>Notice that it merged the new parameters 'sort' and 'filter' with the existing ones.

- [Lazy Loading](https://www.digitalocean.com/community/tutorials/angular-lazy-loading)