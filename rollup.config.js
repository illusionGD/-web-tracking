import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'
import { rimraf } from 'rimraf'
import minimist from 'minimist'
const args = minimist(process.argv.slice(2))
const packages = []
if (args['package']) {
    packages.push(...args['package'].split(','))
    console.log('🚀 ~ packages:', packages)
}
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
                    tsconfig: `${subPath}\\tsconfig.json`,
                    outDir: outPathPrefix,
                    declaration: true,
                    emitDecoratorMetadata: true,
                    // module: 'esnext',
                    // rootDir: `${inputPathPrefix}`,
                    // declarationDir: 'dist',
                }), // ts语法
                terser(), // 压缩
            ],
        })
    }
    return configs
}
const configs = await getCommonConfig(packages.filter((str) => str))
export default configs
