import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import rimraf from 'rimraf'

const isProduction = process.env.NODE_ENV === 'production'
/** @type {import('rollup').RollupOptions[]} */
async function getCommonConfig(subs) {
    const configs = []
    for (let index = 0; index < subs.length; index++) {
        const subName = subs[index]
        const subPath = process.cwd() + `\\packages\\${subName}`
        const inputPathPrefix = `${subPath}\\src`
        const outPathPrefix = `${subPath}\\dist`
        await rimraf(outPathPrefix)
        configs.push({
            input: `${inputPathPrefix}\\index.ts`,
            output: {
                file: `${outPathPrefix}\\index.js`,
                format: 'umd',
                sourcemap: true,
                name: 'index',
            },
            plugins: [
                json(), // json语法
                commonjs(), // commonjs
                resolve({
                    preferBuiltins: false,
                }), // node_modules模块
                babel({ babelHelpers: 'bundled', exclude: 'node_modules' }),
                typescript({
                    tsconfig: './tsconfig.json',
                    module: 'esnext',
                    declarationDir: outPathPrefix,
                }), // ts语法
                isProduction && terser(), // 压缩
            ],
        })
    }
    return configs
}
const configs = await getCommonConfig(['core'])
export default configs
