// Enable LiveReload
// if(process.env.NODE_ENV === "development"){
//   document.write(
//     '<script src="http://' + (location.host || 'localhost').split(':')[0] +
//     ':35729/livereload.js?snipver=1"></' + 'script>'
//   );
// }
// import Vue from "vue"
import App from "./app.vue";
// new Vue({
//   el: "#root",
//   render: h => h(App)
// });
const components = [App];
const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

// 自动注册组件
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default install;


// import Dog from './a'
// import Cat from './b'
// import PoodleDog from './c'
// const Animals = {
//     Dog,
//     Cat,
//     PoodleDog
// };

// export default Animals;
