import { BasicProcessBar } from "../mod.ts";

const bar = new BasicProcessBar({
  barWidth: 50,
});

function task(time: number) {
    return new Promise((todo) => setTimeout((todo), time));
}

await task(200);
bar.text = "Task 1/4";
bar.setProcess(25);

await task(200);
bar.text = "Task 2/4";
bar.setProcess(50);

await task(200);
bar.text = "Task 3/4";
bar.setProcess(75);

await task(200);
bar.text = "Task 4/4";
bar.setProcess(100);
