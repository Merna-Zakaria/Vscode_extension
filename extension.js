
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const modifyCode = require('./src/commands/modifyCode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "toolbox" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('toolbox.modifyCode', function () {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from toolbox!');
		
		modifyCode.modifyCode();
		
		// var panel = vscode.window.createWebviewPanel(
		// 	'toobox',
		// 	'Visual Studio Toolbox Extention',
		// 	vscode.ViewColumn.One,
		// 	{ enableScripts: true }
		// )
		// panel.webview.html = getWebViewContent();

		// panel.webview.onDidReceiveMessage(message => {
		// 	switch(message.command){
		// 		case 'alert':
		// 			vscode.window.showInformationMessage(message.text);
		// 		return;
		// 	}
		// })
	});

	context.subscriptions.push(disposable);
}

function getWebViewContent() {
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
	<title></title>
	<script>

	const vscode = acquireVsCodeApi();
    document.addEventListener('DOMContentLoaded', function() {
	const p1 = document.getElementById('p1');
	p1.style.color = 'yellow';
    });
	</script>
	</head>
	<body>
	<h1>Visual Studio Code</h1>
	<p id='p1'>Visual Studio Toolbox Extention by Merna Zakaria</p>
	<input type='Call extensio.js' value='Call extensio.js' onclick="vscode.postMessage({command: 'alert', text: 'Hello from webview'});"/>
	</body>
	</html>`
}
// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}

