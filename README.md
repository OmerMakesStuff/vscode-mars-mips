# MARS MIPS Support

This extension combines the functionality of four popular VSCode extensions into one, providing a comprehensive toolset for MIPS assembly development.

## New Features

- **Run Code with MARS Simulator**: Execute your MIPS code directly using the MARS simulator by pressing `F5`.
- **Run with Extra Information**: Get detailed execution information by pressing `F6`.
- **Open MARS**: Launch the MARS simulator interface with `F7`.
- **Formatter**: Automatically format your MIPS assembly files for better readability and consistency.

Enjoy a seamless development experience with enhanced features and improved workflow for MIPS assembly programming.

## Features

### Syntax Highlighting

Semantic syntax highlighting only colourizes labels and constants that are defined elsewhere in the document.

![Syntax](./images/syntax.gif)

### Code Completion

Context-aware code completion for instructions, directives, instructions, labels, and constants.

![Completion](./images/completion.gif)

### Snippets

Snippets with configurable comment indentation for all mipsy-supported syscalls.

![Snippets](./images/snippets.gif)

### Label & Constant Definitions / References

Support for navigating definitions and usages of labels and constants through visual studio code's UI.

![Definitions](./images/definitions.gif)

## Known Issues

- No support for multi-file projects

## Building

To contribute to or modify the extension, first clone the repository, install dependencies, and open in VSCode:

```
git clone https://github.com/OmerMakesStuff/vscode-mars-mips/
cd vscode-mars-mips
pnpm i
code .
```

Then, inside VSCode, press `F5`. This will compile and run the extension in a new Extension Development Host window.

For information on packaging and distributing the extension, see the [VSCode docs](https://code.visualstudio.com/api/working-with-extensions/publishing-extension).

## Used Repositories

- **Based on : [MIPSy Support](https://github.com/Bahnschrift/vscode-mipsy-support)**
- Formatter code using : [ASM Formatter](https://github.com/AngaBlue/asm-formatter)
- Run menu and commands and MARS package using : [vscode-mips](https://github.com/triciopo/vscode-mips)
- Also using [this](https://github.com/duskmoon314/vscode-mips-mars) and [this](https://github.com/Cheuring/mpis-lauguage-support)
