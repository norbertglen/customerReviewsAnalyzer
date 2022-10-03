import CommentReport from "./report";

const report = new CommentReport("docs/");
report
  .getStats()
  .then((stats) => {
    const logReport = (value: number, key: string) => {
      console.log(`${key}: ${value}`);
    };
    console.log('Results................')
    return new Map(Object.entries(stats)).forEach(logReport);
  })
  .catch((err) => console.error(err));
