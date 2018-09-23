import * as commandLineUsage from "command-line-usage";
import optionDefinitions from "./optionDefinitions";

const sections: commandLineUsage.Content | commandLineUsage.OptionList | commandLineUsage.Section[] = [
  {
    content: (""
      + "{yellow       } {red       } {green  _   } {blue       \n}"
      + "{yellow       } {red       } {green | |  } {blue       \n}"
      + "{yellow   ___ } {red  _ __ } {green | |_ } {blue   ___ \n}"
      + "{yellow  / __|} {red | '__|} {green | __|} {blue  / __|\n}"
      + "{yellow | (__ } {red | |   } {green | |_ } {blue | (__ \n}"
      + "{yellow  \\\\___|} {red |_|   } {green  \\\\__|} {blue  \\\\___|\n}"),
    raw: true,
  },
  {
    header: "Create React TypeScript Component",
    content: "A tool for creating React component scaffoldings.\n\n"
      + "{bold Usage}: {italic `crtc <component_name> <?output_path> [...options]`}",
  },
  {
    header: "Options",
    optionList: optionDefinitions,
  },
];

export default function showUsage() {
  const usage = commandLineUsage(sections);
  console.log(usage);
}
