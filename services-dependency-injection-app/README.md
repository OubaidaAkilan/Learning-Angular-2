# Services Dependency Injection App

## Dependency Injection DI
**Dependencies:** It is tools like (data or methods, featuers) whereas we can add it into the component to work correctly.  

Assume we have a treehouse as a component and to be the treehouse intresting and funny we should provide a ladder for it.  
A ladder here as (Dependencies) because the treehouse that represent a (component) depend on it, and here when you try to provide the depndencies for the component called (Dependency Injection).  

**Dependency Injection:** Provide and inject dependencies like services into components, in another meaning it is an encapsulate logic you can share it with many components.

## Steps to create a service
* You can create a service utilizes CLI 
```bash
ng g s [service-name]
```
* You should import the service inside the componet.
* Inside the decorator of component, add the providers property and put the service there.
> ***Note***: *Don't do this step with its children and if the parent's component has service don't do this one too, don't ignore this note because If you did that, the service will not work correctly.(review the hierarchical Injector )*
```typescript
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers:[AccountService ]
})
```
* Inject the service into the component through its constructor
```typescript
constructor(private accountService: AccountService) {}
```
## Understanding the hierarchical Injector

* APPModule => Same instance of service is availabe Application-wide.
* AppComponent => Same instance of service is available for all components "But not for other services".
* Any Other Component => Same instance of service is available for the component and all its children components. 

