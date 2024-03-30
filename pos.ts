// import EscPosEncoder from '@freedom_sky/esc-pos-encoder'

// let encoder = new EscPosEncoder();

// let result = encoder
//     .initialize()
//     .text('The quick brown fox jumps over the lazy dog')
//     .newline()
//     .encode();

// console.log({result})

import EscPosEncoder from './encoder'

let encoder = new EscPosEncoder();

let result = encoder
    .init(40, 20)
    .text('The quick brown fox jumps over the lazy dog', 10, 20, 3)
    .encode()

console.log('===', {result})