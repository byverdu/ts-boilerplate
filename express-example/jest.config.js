"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jestConfig = {
    preset: 'ts-jest/presets/default-esm',
    transform: {
        '^.+\\.ts?$': [
            'ts-jest',
            {
                useESM: true,
            },
        ],
    },
};
exports.default = jestConfig;
