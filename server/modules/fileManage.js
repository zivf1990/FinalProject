const fs = require("fs");

const fileSys = {
  //Read File
  readFile: (filePath, cb) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      cb(data.toString());
    });
  },
  //Read Folder
  readFolder: (folderPath, cb) => {
    console.log("readFolder()");
    const fileNames = [];

    fs.readdir(folderPath, (err, folder) => {
      if (err) {
        console.log(err);
        return;
      }

      folder.forEach((item, index) => {
        const path = folderPath + "/" + item;
        module.exports.getStats(path, ({ isAFile, stats }) => {
          fileNames.push({
            itemName: item,
            isAFile: isAFile,
            stats: stats,
            path: path,
          });
          if (index === folder.length - 1) {
            cb(fileNames);
          }
        });
      });
    });
  },
  readFolderAndFiles: (folderName, cb) => {
    const directoryPath = path.join(__dirname, folderName);

    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }
      files.forEach(function (file) {
        const filePath = path.join(directoryPath, file);
        fs.readFile(filePath, "utf8", function (err, data) {
          if (err) {
            return console.log(err);
          }
          cb(data);
          console.log(data);
        });
      });
    });
  },
  //Get the stats of an item.
  getStats: (fileOrFolderPath, cb) => {
    fs.stat(fileOrFolderPath, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }

      cb({ isAFile: stats.isFile(), stats: stats });
    });
  },
  deleteFile: (file, cb) => {
    fs.unlink(file, function (err) {
      if (err) {
        cb(false);
        console.log(err);
        return;
      }
      cb(true);
      console.log("File deleted!");
    });
  },
  writeFile: (filePath, data, cb) => {
    fs.writeFile(filePath, data, function (err) {
      if (err) {
        console.log(err);
        cb(false);
        return;
      }
      cb(true);
      console.log("File created!");
    });
  },
  renameFile: (oldPath, newPath, cb) => {
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.log(err);
        cb(false);
        return;
      }
      cb(true);
      console.log("File renamed!");
    });
  },
  createDirectory: async (dirPath, cb) => {
    if (!fs.existsSync(dirPath)) {
      fs.mkdir(dirPath, (err) => {
        if (err) {
          console.log(err);
          cb(false);
          return;
        }
        cb(true);
        console.log("Directory  created: ", dirPath);
      });
    }
  },
  deleteFolder: async (dirPath, cb) => {
    fs.rmdir(dirPath, (err) => {
      if (err) {
        console.log(err);
        cb(false);
        return;
      }
      cb(true);
      console.log("Directory  deleted: ", dirPath);
    });
  },
};

module.exports = fileSys;
