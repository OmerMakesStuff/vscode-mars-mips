import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as fs from 'fs';

/**
 * Get active file path.
 * @returns The path to the active file.
 */
function getActiveFilePath(): string | undefined {
  const activeEditor = vscode.window.activeTextEditor;
  if (activeEditor) {
    const filePath = activeEditor.document.uri.fsPath;
    return filePath;
  }
}

/**
 * Gets the path to MARS.
 * @returns The path to MARS jar file.
 */
function getMarsPath(): string {
  let marsPath: string | undefined = vscode.workspace
    .getConfiguration('mars-mips')
    .get('marsPath');
  if (!marsPath) {
    let marsExtension = vscode.extensions.getExtension(
      'OmerMakesStuff.mars-mips',
    );
    marsPath = marsExtension ? marsExtension.extensionPath + '/mars.jar' : '';
    if (!fs.existsSync(marsPath)) {
      console.log(
        `MARS simulator not found. Please set the path to MARS in the settings.`,
      );
    }
  }
  return marsPath;
}

/**
 * Gets the Java command used for running MARS.
 * @returns The Java command, including arguments if any.
 */
function getJavaCommand(): string {
  const javaCommand: string | undefined = vscode.workspace
    .getConfiguration('mars-mips')
    .get('javaCommand');
  return javaCommand || 'java';
}

/**
 * Gets the Java command to use inside the terminal (for assemble/run/debug).
 * @returns The Java command string.
 */
function getTerminalJavaCommand(): string {
  const terminalJavaCommand: string | undefined = vscode.workspace
    .getConfiguration('mars-mips')
    .get('terminalJavaCommand');
  return terminalJavaCommand || getJavaCommand();
}

/**
 * Gets the MARS terminal.
 * @returns The MARS terminal.
 */
function getMarsTerminal(): vscode.Terminal {
  let terminal: vscode.Terminal | undefined = vscode.window.terminals.find(
    (t) => t.name === 'MARS',
  );
  if (!terminal) {
    return vscode.window.createTerminal('MARS');
  }
  return terminal;
}

/**
 * Register extension commands.
 * @param context The extension context.
 */
export function registerCommands(context: vscode.ExtensionContext) {
  const marsPath: string = getMarsPath();
  const javaCommand: string = getJavaCommand(),
    terminalJavaCommand: string = getTerminalJavaCommand();

  let disposable = vscode.commands.registerCommand(
    'mars-mips.assembleExec',
    () => {
      const fileName = getActiveFilePath();
      let terminal = getMarsTerminal();

      // Assemble and execute
      terminal.sendText(
        `${terminalJavaCommand} -jar ${marsPath} nc me "${fileName}"`,
      );
      terminal.show();
    },
  );

  let assembleDisposable = vscode.commands.registerCommand(
    'mars-mips.assembleMips',
    () => {
      const fileName = getActiveFilePath();
      let terminal = getMarsTerminal();

      // Assemble but don't execute
      terminal.sendText(
        `${terminalJavaCommand} -jar ${marsPath} me a "${fileName}"`,
      );
      terminal.show();
    },
  );

  let debug = vscode.commands.registerCommand('mars-mips.debugMips', () => {
    const fileName = getActiveFilePath();
    let terminal = getMarsTerminal();

    terminal.sendText(
      `${terminalJavaCommand} -jar ${marsPath} nc me d "${fileName}"`,
    );
    terminal.show();
  });

  let openMars = vscode.commands.registerCommand('mars-mips.openMars', () => {
    exec(
      `${javaCommand} -jar ${marsPath}`,
      (err: any, stdout: string, stderr: string) => {
        if (err) {
          vscode.window.showErrorMessage(`Error: ${stderr}`);
          return;
        }
      },
    );
  });

  context.subscriptions.push(disposable, assembleDisposable, debug, openMars);
}
