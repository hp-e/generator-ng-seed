## AventoSample

Et lite og enkelt system for å vise hvordan et Angular2 kan settes opp

### Bruk

Koden er basert på Angular2

Før du kjører koden må du sørge for at [node.js](https://nodejs.org/) og Npm (følger med node) er installert.

For windows brukere kjør dette i command prompt:
```cmd
npm install -g webpack webpack-dev-server typescript
```

For å hente ned all nødvendig kode
```cmd
npm install
```

eller som en hardcore utvikler
For å hente ned all nødvendig kode
```cmd
npm i
```


### Services

Noe av innholdet henter data fra AventoSample -> Web Api. For å "tanke" frontend- prosjektet med data må du laste ned WebApi prosjektet her: ***http://svn-edge/svn/avento/Avento/AventoSample/mvc***

Når prosjektet er lastet ned sørg for at **localhost:2234** er satt i prosjektinnstillingene. 
Hvis du ønsker å kjøre fra en annen port så kan du fint gjøre det, men da må du endre 'apiUrl' i **src/app/app.settings.ts** til korrekt adresse.    

```typescript
apiUrl: string = 'http://localhost:2234/api';
```

### Kompilere/Kjøre
For å kjøre løsning på dev server 
```cmd
npm start
```

åpne deretter en nettleser på adressen [`http://localhost:3001`](http://localhost:3001)