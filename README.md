# vue-exchange

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## creacion de proyecto vue

> vue create name_proyecto

revisar el siguiente proyecto
https://github.com/RetaxMaster/VueTube


## rutas
para trabajar con rutas en vue 3 instalamos router/next
> npm i vue-router@next

se intalo un paquete para trabajar los numeros
> npm i -s numeral

## notas
los filters ya no se usan para vue3 por ende se remplazan por funciones en methods o computed

v-bind se puede remplazar por :
v-on se puede remplazar por @

formas de navegar en rutas

>this.$router.push({name: component, params:valueId})

ó

<router-link :to="{ name: 'coin-detail', params: { id: a.id } }">
  {{ a.name }}</router-link
>

## ejemplo de posibles spinner
<pulse-loader :loading="loading" :color="color" ></pulse-loader>
<grid-loader :loading="loading" :color="color" ></grid-loader>
<clip-loader :loading="loading" :color="color" ></clip-loader>
<rise-loader :loading="loading" :color="color" ></rise-loader>
<beat-loader :loading="loading" :color="color" ></beat-loader>
<sync-loader :loading="loading" :color="color" ></sync-loader>
<rotate-loader :loading="loading" :color="color" ></rotate-loader>
<fade-loader :loading="loading" :color="color" :height="height" :width="width"></fade-loader>
<pacman-loader :loading="loading" :color="color" ></pacman-loader>
<square-loader :loading="loading" :color="color" ></square-loader>
<scale-loader :loading="loading" :color="color" :height="height" :width="width"></scale-loader>
<skew-loader :loading="loading" :color="color" ></skew-loader>
<moon-loader :loading="loading" :color="color" ></moon-loader>
<ring-loader :loading="loading" :color="color" ></ring-loader>
<bounce-loader :loading="loading" :color="color" ></bounce-loader>
<dot-loader :loading="loading" :color="color" ></dot-loader>