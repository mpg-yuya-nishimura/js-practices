import fs from "fs";

export default class Memo {
  static memoStoragePath = "./memos.json";

  static all() {
    return readJsonFile(Memo.memoStoragePath);
  }

  static selectByFirstLineContent(firstLineContent) {
    const memos = readJsonFile(Memo.memoStoragePath);

    const selectedMemo = memos.filter((memo) => {
      return memo.firstLineContent === firstLineContent;
    })[0];

    return new Memo(selectedMemo.firstLineContent, selectedMemo.fullContent);
  }

  static create(text) {
    const new_memo = {
      firstLineContent: text.match(/^.+/m)[0],
      fullContent: text,
    };

    addDataToJsonFile(Memo.memoStoragePath, new_memo);
  }

  constructor(firstLineContent, fullContent) {
    this.firstLineContent = firstLineContent;
    this.fullContent = fullContent;
  }

  destroy() {
    deleteDataToJsonFile(Memo.memoStoragePath, this.firstLineContent);
  }
}

function addDataToJsonFile(path, newData) {
  const jsonData = readJsonFile(path);

  jsonData.push(newData);

  fs.writeFileSync(path, JSON.stringify(jsonData), "utf8");
}

function deleteDataToJsonFile(path, firstLineContent) {
  const jsonData = readJsonFile(path);

  const deletedJsonData = jsonData.filter((memo) => {
    return memo.firstLineContent !== firstLineContent;
  });

  fs.writeFileSync(path, JSON.stringify(deletedJsonData), "utf8");
}

function readJsonFile(path) {
  if (!fs.existsSync(path)) {
    return [];
  }

  const fileData = fs.readFileSync(path, "utf8");
  return JSON.parse(fileData);
}
