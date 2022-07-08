module.exports = {
  // 简单配置几个常用的格式化方案
  useTabs: false, // 使用tab缩进，默认false
  printWidth: 120,
  semi: false, // 末尾必须有分号
  singleQuote: true, // 使用单引号包裹字符串
  jsxBracketSameLine: true, // 在jsx中把'>' 是否单独放一行
  jsxSingleQuote: true, // jsx内也使用单引号包裹字符串
  proseWrap: 'preserve', // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
  arrowParens: 'avoid', //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
  disableLanguages: ['vue'], // 不格式化vue文件，vue文件的格式化单独设置
  endOfLine: 'auto', // 结尾是 \n \r \n\r auto
  eslintIntegration: false, // 不让prettier使用eslint的代码格式进行校验
  htmlWhitespaceSensitivity: 'ignore',
  ignorePath: '.prettierignore', // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
  requireConfig: false, // Require a 'prettierconfig' to format prettier
  stylelintIntegration: false, // 不让prettier使用stylelint的代码格式进行校验
  trailingComma: 'none', // 行尾逗号,默认 none,可选 none|es5|all
  tslintIntegration: false, // 不让prettier使用tslint的代码格式进行校验
  bracketSpacing: true //字面量对象括号中的空格，默认true;true - Example: { foo: bar };false - Example: {foo: bar}.
}
