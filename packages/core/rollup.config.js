import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'

const isProduction = process.env.NODE_ENV === 'production'
/** @type {import('rollup').RollupOptions[]} */
function getCommonConfig(fileNames) {
    const inputPathPrefix = 'src/'
    const outPathPrefix = 'dist/'

    return fileNames.map((subName) => {
        const plugins = [
            json(), // json语法
            commonjs(), // commonjs
            resolve({
                preferBuiltins: false,
            }), // node_modules模块
            babel({ babelHelpers: 'bundled', exclude: 'node_modules' }),
            typescript({
                tsconfig: './tsconfig.json',
                declarationDir: './',
            }), // ts语法
            isProduction && terser(), // 压缩
        ]

        const outputName = subName
            ? subName.replace('/', '') + '.js'
            : 'index.js'

        return {
            input: `${inputPathPrefix}${subName ? subName : ''}index.ts`,
            output: {
                file: outPathPrefix + outputName,
                format: 'umd',
                sourcemap: true,
                name: subName || 'index',
            },
            plugins,
        }
    })
}
const configs = getCommonConfig([''])
export default configs
