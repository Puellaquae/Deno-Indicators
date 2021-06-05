import { BasicProcessBar } from "../mod.ts";

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
  bar.tick();
  if (bar.complete) {
    clearInterval(id);
  }
}, 200);