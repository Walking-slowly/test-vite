import { App } from 'vue'

const coms:any = import.meta.glob('./**/*.vue',{eager:true});

export default function install(app: App) {
  for(let objname in coms) {
    let myval = coms[objname]; 
    app.component(objname.substring(2).replace('/index.vue',''),myval.default)
  }
}
