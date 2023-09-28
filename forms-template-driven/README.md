# FormsTemplateDriven

This README provides instructions for creating a template-driven form in an Angular application. A template-driven form allows you to bind HTML forms with TypeScript business logic and apply simple validations.

## Binding the Form with Business Logic

To connect your HTML form with your TypeScript (TS) business logic, follow these simple steps:

1. **Import FormsModule**: Inside your `app.module.ts` file, make sure to import the `FormsModule` module.

2. **Define the Form Tag**: In your HTML file, define your form using the `ngForm` directive. You can do this by adding `#f="ngForm"` to your form tag like this:
```html
  <form #f="ngForm">
```
3. **Pass the Form**: To connect your form with your business logic, use the onSubmit event and pass the form. Here's an example:
  ```html
   <form #f="ngForm" (ngSubmit)="addProduct(f)">
   ```
4. **Add Name Attributes**: Assign clear names to your input fields by adding the name attribute. For instance:
  ```html
   <input name="username" />
   ```
5. **Bind with ngModel**: To link your input fields with ngForm, include the ngModel directive in your input tags like this:
  ```html
   <input ngModel name="username" />
   ```
6. **Use Submit Button**: Make sure your form includes a submit button with type="submit". If you have other buttons, set their type attribute to "button" if they are not intended for form submission.
  ```html
   <form #f="ngForm" (ngSubmit)="addProduct(f)">
   ```
## Validations
For form validations, you can utilize various HTML attributes:  
- required: Use the required attribute to ensure that a field cannot be left empty.
- email: When you want to collect email addresses, apply the email attribute to validate that the input contains a valid email format.
- pattern (Regular Expression): To specify custom validation rules using regular expressions, add the pattern attribute. For example, if you want to accept positive numbers greater than zero, you can define a pattern like this:
  ```html
   <input ngModel name="username" required pattern="^[1-9]+[0-9]*$" />
   ```
This pattern restricts the input to positive numbers greater than zero.
By following these steps and using these validation attributes, you can easily create a template-driven form in your Angular application.
