module.exports = {
    root: true,
    overrides: [
        {
            files: ["*.ts"],
            parserOptions: {
                project: [
                    "**/tsconfig.json"
                ],
                createDefaultProgram: true
            },
            extends: [
                "plugin:@angular-eslint/recommended",
                "airbnb-typescript/base",
                "plugin:prettier/recommended"
            ],
            rules: {
                "import/no-unresolved": "off",
                "@typescript-eslint/no-useless-constructor": "off",
                "@typescript-eslint/no-empty-function": "off",
                "prettier/prettier": ["error", {
                    "endOfLine": "auto"
                }
                ]
            }
        },
        {
            files: ["*.component.html"],
            extends: ["plugin:@angular-eslint/template/recommended"],
            rules: {
                "max-len": ["error", { "code": 140 }]
            }
        },
        {
            files: ["*.component.ts"],
            extends: [
                "plugin:@angular-eslint/template/process-inline-templates",
                "plugin:import/recommended",
                "plugin:import/errors",
                "plugin:import/warnings",
                "plugin:import/typescript",
            ],
            rules: {
                "import/no-unresolved": "off",
                "@typescript-eslint/no-useless-constructor": "off",
                "@angular-eslint/no-empty-lifecycle-method": "off",
                "@typescript-eslint/no-empty-function": "off",
                "@angular-eslint/no-output-on-prefix": "off",
                "prettier/prettier": ["error", {
                    "endOfLine": "auto"
                }
                ]
            }
        }
    ]
}