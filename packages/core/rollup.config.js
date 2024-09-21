import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'

const isProduction = process.env.NODE_ENV === 'production'
/** @type {import('rollup').RollupOptions[]} */
function getCommonConfig(fileNames) {
    const inputPathPrefix = ''
    const outPathPrefix = 'dist'

    return fileNames.map((subName) => {
        const plugins = [
            json(),
            commonjs(),
            resolve({
                preferBuiltins: false,
            }),
            babel({ babelHelpers: 'bundled' }),
            typescript({
                tsconfig: './tsconfig.json',
            }),
            isProduction && terser(),
        ]

        const outputName = subName
            ? subName.replace('/', '') + '.js'
            : 'index.js'

        return {
            input: `${inputPathPrefix}${subName ? subName : ''}index.ts`,
            output: [
                // {
                //     file: outPathPrefix + '/cjs/' + outputName,
                //     format: 'cjs',
                //     sourcemap: true,
                // },
                {
                    file: outPathPrefix + '/' + outputName,
                    format: 'es',
                    sourcemap: true,
                },
            ],
            plugins,
        }
    })
}
const configs = getCommonConfig(['', 'utils/', 'http/', 'constants/'])
export default configs
