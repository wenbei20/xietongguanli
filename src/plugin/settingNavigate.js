let navigate =  {
  install: function(Vue) {
    Vue.prototype.$navigate = function(e, info) {
      const el = this._self

      if (e) {
        el.$emit('navigate', e, info)
      }
    }
  }
}



export  {
  navigate,
  
}