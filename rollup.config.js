import json from "rollup-plugin-json"; //将.json文件转换为ES6模块
import license from "rollup-plugin-license"; //在文件前添加版本信息
import resolve from "rollup-plugin-node-resolve"; //该插件会允许加载在 node_modules中的第三方模块
import babel from "rollup-plugin-babel"; //rollup 的 babel 插件，ES6转ES5
import commonjs from "rollup-plugin-commonjs"; //将CommonJS模块转为ES6可用
import replace from "rollup-plugin-replace" // 替换待打包文件里的一些变量，如 process在浏览器端是不存在的，需要被替换
import { terser } from "rollup-plugin-terser"; // 压缩代码
import serve from "rollup-plugin-serve"; // 开启本地服务的插件
import vue from "rollup-plugin-vue" //支持vue
import { eslint } from "rollup-plugin-eslint";// 代码检查
// import livereload from "rollup-plugin-livereload" // 实时刷新页面
// css处理
import postcss from "rollup-plugin-postcss"; // 打包样式文件
import simplevars from "postcss-simple-vars"; // 可以使用Sass风格的变量
import nested from "postcss-nested"; // 允许使用嵌套规则
import cssnext from "postcss-cssnext"; // 这个插件集使得大多数现代CSS语法(通过最新的CSS标准)可用
import cssnano from "cssnano"; // 压缩css代码

import moment from "moment";
import { version, name, author } from "./package.json";

const banner = `/*!
* ${name} v${version} ${author}
*
* Copyright ${moment().format()}
*
*/`;

const env = process.env.NODE_ENV || "development"

const config = {
  input: "src/index.js",
  external: ["vue"], // 告诉rollup，不打包vue将其视为外部依赖
  output: {
    file: "dist/bundle.js",
    format: "umd", //  输出格式：umd = (amd/ iife / cjs) | es
    name:"sdk", // 当format为iife和umd时必须提供，将作为全局变量挂在window(浏览器环境)下：window.sdk=.
    sourcemap: true,
    globals: {  // 这跟external 是配套使用的，指明global.vue即是外部依赖vue
      vue:"Vue"  
    }
  },
  plugins: [ 
    postcss({
      extensions: [".css"],
      plugins: [
        simplevars(),
        nested(),
        cssnext({ warnForDuplicates: false, }),
        cssnano()
      ]
    }),
    vue(),
    resolve(),
    commonjs(),
    json(),
    babel({
      exclude: "node_modules/**", // 只编译我们的源代码
      runtimeHelpers: true //使plugin-transform-runtime生效
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(env)
    }),
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ["src/**"],
      exclude: ["node_modules/**"]
    }),
    license({ banner })
  ]
};


if (env === "production") {
  config.plugins.push(
    terser({
      compress: {
        pure_funcs: ["console.log"] // 去掉console.log函数
      }
    })
  )
} else {
  config.plugins.push(
    serve({
      open: true, // 是否打开浏览器
      contentBase: "./", // 入口html的文件位置
      historyApiFallback: true, // 设置为true以返回index.html而不是404
      host: "localhost",
      port: 9008
    })
    // livereload()
  )
}

export default config