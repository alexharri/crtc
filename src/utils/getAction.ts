import chalk from "chalk";
import { emojify } from "node-emoji";
import getUserInput from "./getUserInput";
import clear from "./clear";

const actions = {
  a: (a, b) => a + b,
  s: (a, b) => a - b,
  m: (a, b) => a * b,
  d: (a, b) => a / b,
};

/**
 * Asks the user to select an action from a few arithmetic actions via stdin
 */
const getAction = async () => new Promise<((a: number, b: number) => number)>(async resolve => {
  console.log([
    ["a", "Add"],
    ["s", "Subtract"],
    ["m", "Multiply"],
    ["d", "Divide"],
  ]
    .map(([key, label]) => `  ${chalk.grey(key + ":")} ${chalk.green(label)}\n`).join(""));

  const action = await getUserInput(chalk.grey("> "));

  if (!actions[action.toLowerCase()]) {
    clear();
    console.log(chalk.red(emojify(`:no_entry_sign: Invalid action, try again\n`)));
    resolve(await getAction());
  } else {
    resolve(actions[action.toLowerCase()]);
  }
});

export default getAction;
