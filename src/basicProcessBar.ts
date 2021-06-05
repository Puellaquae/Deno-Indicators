export interface ProcessBarOption {
  barWidth: number;
  start?: string;
  fill?: string;
  lead?: string;
  remainder?: string;
  end?: string;
  text?: string;
}

export class BasicProcessBar {
  barWidth: number;
  start: string;
  fill: string;
  lead: string;
  remainder: string;
  end: string;
  text: string;
  percent: number;
  complete: boolean;

  constructor(opt: ProcessBarOption) {
    this.barWidth = opt.barWidth;
    this.start = opt.start ?? "[";
    this.fill = opt.fill ?? "=";
    this.lead = opt.lead ?? ">";
    this.remainder = opt.remainder ?? " ";
    this.end = opt.end ?? "]";
    this.text = opt.text ?? "";
    this.percent = 0;
    this.complete = false;
    this.draw();
  }

  tick(percent?: number): void {
    if (this.complete) {
      return;
    }
    this.percent += percent ?? 1;
    if (this.percent >= 100) {
      this.percent = 100;
      this.complete = true;
    }
    this.clear();
    this.draw();
  }

  setProcess(percent: number) {
    if (this.complete) {
      return;
    }
    this.percent = percent;
    if (this.percent >= 100) {
      this.percent = 100;
      this.complete = true;
    }
    this.clear();
    this.draw();
  }

  clear(): void {
    const encoder = new TextEncoder();
    Deno.stdout.write(encoder.encode("\r"));
  }

  render(): string {
    let buf = this.start;
    const fillWidth = Math.floor(this.barWidth / 100 * this.percent);
    const remainderWidth = this.barWidth - fillWidth;
    for (let i = 0; i < fillWidth; i++) {
      buf += this.fill;
    }
    if (remainderWidth >= 1) {
      buf += this.lead;
    }
    for (let i = 0; i < remainderWidth - 1; i++) {
      buf += this.remainder;
    }
    buf += `${this.end} ${this.percent}% ${this.text}`;
    return buf;
  }

  draw(): void {
    const encoder = new TextEncoder();
    Deno.stdout.write(encoder.encode(this.render()));
    if (this.complete) {
      this.terminate();
    }
  }

  terminate(): void {
    const encoder = new TextEncoder();
    Deno.stdout.write(encoder.encode("\r\n"));
  }
}
