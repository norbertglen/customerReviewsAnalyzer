import * as fs from "fs";
import * as es from "event-stream";

const CommentAnalyzer = require("./commentAnalyzer");

type TMetrics = { [key: string]: number };

export default class Report {
  directory: string;

  metrics: TMetrics = {
    SHORTER_THAN_15: 0,
    MOVER_MENTIONS: 0,
    SHAKER_MENTIONS: 0,
    QUESTION: 0,
    SPAM: 0,
  };

  constructor(directory: string) {
    this.directory = directory;
  }

  getDirectoryFiles(): string[] {
    return fs.readdirSync(this.directory);
  }

  private processFile(currFilePath: string): Promise<boolean> {
    return new Promise((resolve, reject) =>
      fs
        .createReadStream(currFilePath)
        .pipe(es.split())
        .pipe(
          es
            .mapSync((line: string) => this.analyzeLine(line))
            .on("error", (err) => {
              console.log("Error while reading file.", err);
              reject(err);
            })
        )
        .on("end", () => resolve(true))
        .on("error", (err) => reject(err))
    );
  }

  private analyzeLine(line: string): void {
    const comment = new CommentAnalyzer(line);
    const analysis = comment.analyze();
    for (const metric in analysis) {
      this.metrics[metric] += analysis[metric] ? 1 : 0;
    }
  }

  async getStats(): Promise<TMetrics> {
    try {
      const files = this.getDirectoryFiles();
      const promises = files.map((file) =>
        this.processFile(this.directory + file)
      );
      await Promise.all(promises);
      return this.metrics;
    } catch (error) {
      console.error(error);
      throw new Error("Error generating report stats");
    }
  }
}
