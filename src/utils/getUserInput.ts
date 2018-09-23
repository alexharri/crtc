import rl from "./rl";

const getUserInput = async (prompt: string) => new Promise<string>(resolve => rl.question(prompt, resolve));

export default getUserInput;
