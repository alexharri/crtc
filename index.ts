#! /usr/bin/env node
/* tslint:disable max-line-length */

import * as commandLineArgs from "command-line-args";
import * as path from "path";
import * as fs from "fs";
import * as changeCase from "change-case";
import * as mkdirp from "mkdirp";
import optionDefinitions from "./src/optionDefinitions";
import showUsage from "./src/showUsage";

/**
 * Based on https://stackoverflow.com/a/16317628
 */
const writeFile = (pathStr: string, contents: string) => new Promise((resolve, reject) => {
  mkdirp(path.dirname(pathStr), err => {
    if (err) {
      reject(err);
      return;
    }

    fs.writeFile(pathStr, contents, e => {
      if (e) {
        reject(e);
      } else {
        resolve();
      }
    });
  });
});


const options = commandLineArgs(optionDefinitions);

const main = async () => {
  if (options.help) {
    showUsage();
    return;
  }

  if (!options.output || !options.output[0]) {
    showUsage();
    return;
  }

  const componentName = options.output[0];
  const p = path.resolve(process.cwd(), options.output[1] || "./");

  const inc = (cond: boolean, str: string, fallback?: string) => cond ? str : (fallback || "");
  const ifTs = (str: string, fallback?: string) => inc(options.typescript, str, fallback);
  const ifRedux = (str: string) => inc(options.redux, str);
  const ifProps = (str: string, fallback?: string) => inc(options.props, str, fallback);
  const ifState = (str: string) => inc(options.state, str);

  const ps = [ // Props and State
    ifProps("Props", "{}"),
    ifState("State"),
  ]
    .filter(x => x);

  const text = ""
+ `import React from "react";\n`
+ ifRedux(`import { connect } from "react-redux";\n`)

+ ifProps(ifTs(`\ninterface Props {\n`))
+ ifProps(ifTs(`  \n`))
+ ifProps(ifTs(`}\n`))

+ ifState(ifTs(`\ninterface State {\n`))
+ ifState(ifTs(`  \n`))
+ ifState(ifTs(`}\n`))
+ `\n`
+ inc(!options.redux, "export default ")
+ `class ${componentName} extends React.Component${inc(options.props || options.state, ifTs(`<${ps.join(", ")}>`))} {\n`
+ ifState(`  constructor(props${ifTs(ifProps(": Props", ": {}"))}) {\n`)
+ ifState(`    super(props);\n\n`)
+ ifState(`    this.state = {\n`)
+ ifState(`      \n`)
+ ifState(`    };\n`)
+ ifState(`  }\n\n`)

+ `  ${ifTs("public ")}render() {\n`
+ `    return (\n`
+ `      <div>\n`
+ `        <p>${changeCase.no(componentName)}</p>\n`
+ `      </div>\n`
+ `    );\n`
+ `  }\n`
+ `}\n`

+ ifRedux(`\nconst mapStateToProps = ({}) => ({\n`)
+ ifRedux(`  \n`)
+ ifRedux(`});\n\n`)

+ ifRedux(`export default connect(mapStateToProps)(${componentName});\n`);

  await writeFile(p + "/" + componentName + ifTs(".tsx", ".js"), text);
};

main();
