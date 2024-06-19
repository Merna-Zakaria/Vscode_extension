const vscode = require('vscode');

 async function modifyCode() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const selection = editor.selection;
    if (selection?.isEmpty) return;

    const selectionRange = new vscode.Range(selection.start, selection.end);
    const selectionText = editor.document.getText(selectionRange);

    const prompt = await vscode.window.showInputBox({
        prompt: 'prompt',
        placeHolder: 'I should modify the code '
    })
    if (!prompt) {
        vscode.window.showErrorMessage('You Should Provid A Prompt')
        return;
    }

    const systemPrompt = "You are a front-end developer, you are tasked with taking in user requests and providing a basic code edits such as adding a comment, completing functions, inserting a new line, changing variable names, or rearranging code blocks, the user will provide you with a code snippet, and tell you what they are to do, you MUST only output javascript code,and NOT english, you should avoid removing any existing fields in code snippet provided, unless the user asks you explicitly to make to make these changes, DO NOT explain code, DO NOT output markdown.";
    const context = "";
    const promptWithContext = `
    ${prompt}
    ---------
    CONTEXT
    ---------
    ${context}
    ---------
    INPUT CODE 
    ---------
    ${selectionText};
    `

    const messages = [
        {
            role: 'system',
            content: systemPrompt
        },
        {
            role: 'user',
            content: promptWithContext
        },
    ];

    const fireworks_api_key = 'T31JQo7MmIaBT889PSvbA9teGQoPL0B5VliulkOaFgd7xe6n'

    let content = await generateJS(messages);
    await editor.edit((editBuilder) => {
        editBuilder.replace(selection, content)
    })
    async function generateJS(messages) {
        const result = await fetch(`https://api.fireworks.ai/inference/v1/chat/completions`, {
            method: "POST",
            headers: {
                "authorization": `Bearer ${fireworks_api_key}`,
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "accounts/fireworks/models/llama-v3-70b-instruct",
                max_tokens: 500,
                temperature: 0,
                messages,
                stop: "assistant<|end_header_id|>",
                stream: false
              })
        });
        const data = await result.json();
        console.log('data', data);

        // @ts-ignore
        return data?.choices[0].message.content
    }
}

module.exports = {
	modifyCode,
}
