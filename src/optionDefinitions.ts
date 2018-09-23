// import * as commandLineArgs from "command-line-args";

const optionDefinitions /* : commandLineArgs.OptionDefinition[]*/ = [
  {
    name: "output",
    alias: "o",
    type: String,
    multiple: true,
    defaultOption: true,
    description: "First argument is the component name and second is the output directory. "
      + "The default output path is `./`",
  },
  {
    name: "redux",
    alias: "r",
    type: Boolean,
    description: "Creates an empty mapStateToProps statement and exports the connected component",
  },
  {
    name: "typescript",
    alias: "t",
    type: Boolean,
    description: "Use TypeScript",
  },
  {
    name: "state",
    alias: "s",
    type: Boolean,
    description: "Initializes state in the constructor (-t creates a State interface)",
  },
  {
    name: "props",
    alias: "p",
    type: Boolean,
    description: "When using TypeScript it will add a Props interface",
  },
  {
    name: "help",
    alias: "h",
    type: Boolean,
    description: "Show this menu",
  },
];

export default optionDefinitions;
