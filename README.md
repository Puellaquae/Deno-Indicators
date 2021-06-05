# Deno Indicators

Process bars and spinners module for deno, inspired from [Indicators](https://github.com/p-ranav/indicators)

## Contents

* Developing
    * [Basic Process Bar](BasicProcessBar)
* Future
    * Inderminate Process Bar
    * Process Spinner
    * Multi Process

## BasicProcessBar

A basic type of process bar. Here's the general structure of a progress bar:

```
{start} {fill} {lead} {remaining} {end} {percentage} {text}
        ^^^^^ Bar Width ^^^^^^^^^   
```

### Sample

#### Update with `tick(step = 1)`

``` typescript
import { ProcessBar } from "https://deno.land/x/indicators@<version>/mod.ts";

const bar = new BasicProcessBar({
  barWidth: 50,
  start: "[",
  fill: "=",
  lead: ">",
  remainder: " ",
  end: "]",
  text: "Processing",
});

const id = setInterval(() => {
  bar.tick(10);
  if (bar.complete) {
    clearInterval(id);
  }
}, 200);

```

#### Update with `setProcess(value)`


``` typescript
import { ProcessBar } from "https://deno.land/x/indicators@<version>/mod.ts";

const bar = new BasicProcessBar({
  barWidth: 50,
});

task1();
bar.text = "Task 1/4";
bar.setProcess(25);

task2();
bar.text = "Task 2/4";
bar.setProcess(50);

task3();
bar.text = "Task 3/4";
bar.setProcess(75);

task4();
bar.text = "Task 4/4";
bar.setProcess(100);

```