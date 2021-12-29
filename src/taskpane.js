/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global console, document, Excel, Office */

// The initialize function must be run each time a new page is loaded
Office.initialize = () => {
  document.getElementById("run").onclick = run;
};
function mark_it(context){
  const range = context.workbook.getSelectedRange();

  // Read the range address
  range.load("address");

  // Update the fill color
  range.format.fill.color = "yellow";

  context.sync();
  console.log(`The range address was ${range.address}.`);
}

export function run() {
  Excel.run(mark_it)
}
