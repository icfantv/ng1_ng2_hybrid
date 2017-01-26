1. run `npm install`
2. run `npm start`
3. make sure app runs correctly on `localhost:9000`, should display two messages
4. run `npm t` and you'll see the `$injector` error

The one difference between this project and Spinnaker is that in this project, we had to add the `NG2_module` as a
module dependency to the main module in `app.ts`:
```
angular.module('hello.world', [MAIN_APP, NG2_MODULE]);
```
