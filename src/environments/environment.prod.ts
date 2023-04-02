/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {
  production: false,
 // apiUrl: 'http://localhost:64893'
  apiUrl: `http://${window.location.hostname}:6489`
   //apiUrl: `http://${window.location.hostname}:5000`
  //apiUrl: `${window.location.origin}:5000`
};

