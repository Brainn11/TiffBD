function typeWriter(instructions, elementId) {
    const textElement = document.getElementById(elementId);
    let currentIndex = 0;
    let currentCommands = [];

    function executeCommands() {
        if (currentCommands.length > 0) {
            const command = currentCommands.shift();
            executeCommand(command, executeCommands);
        } else {
            nextInstruction();
        }
    }

    function executeCommand(command, callback) {
        if (command) {
            const [action, value] = command.split(":").map(item => item.trim());

            switch (action) {
                case "delay":
                    setTimeout(callback, parseInt(value) * 1000);
                    break;
                case "function":
                    if (typeof window[value] === "function") {
                        window[value]();
                        callback();
                    }
                    break;
                case "true":
                    if (typeof window[value] === "boolean") {
                        window[value] = true;
                        callback();
                    }
                    break;
                case "false":
                    if (typeof window[value] === "boolean") {
                        window[value] = false;
                        callback();
                    }
                    break;
                case "backspace":
                    removeTo = 0;
                        if (value != null)
                            removeTo = textElement.textContent.length - value;
                    function backspace() {
                        textElement.textContent = textElement.textContent.slice(0, -1);
                        if (textElement.textContent.length > removeTo)
                            setTimeout(backspace, 20);
                        else
                            callback();
                    }
                    backspace();
                    break;
                case "clear":
                    textElement.textContent = "";
                    callback();
                    break;
                default:
                    break;
            }
        } else {
            callback();
        }
    }

    function nextInstruction() {
        if (currentIndex < instructions.length) {
            currentCommands = (instructions[currentIndex].commands || "").split(",").map(command => command.trim());
            typeText(instructions[currentIndex].text, instructions[currentIndex].speed);
            currentIndex++;
        }
    }

    function typeText(text, speed) {
        let index = 0;
        speed += 0;

        if (speed == 0) {
            textElement.textContent += text;
            setTimeout(executeCommands, 1);
            return;
        }

        function type() {
            textElement.textContent += text[index];
            index++;

            if (index < text.length) {
                setTimeout(type, speed); // Adjust typing speed as needed
                textElement.scrollTop = textElement.scrollHeight;
            } else {
                setTimeout(executeCommands, 1);
            }
        }

        type();
    }

    nextInstruction();
}