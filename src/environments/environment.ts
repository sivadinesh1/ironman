// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export const restApiUrl = 'http://localhost:8080';
//export const restApiUrl = 'http://192.168.43.199:8080';
export const errorApiUrl = 'http://localhost:5555';
export const testApiUrl = 'https://jsonplaceholder.typicode.com/todos/1';

export const paymentApiUrl = 'http://localhost:8080';

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
