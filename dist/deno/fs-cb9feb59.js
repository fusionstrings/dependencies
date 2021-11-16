import { X as notImplemented, K as fromFileUrl, Y as assert, Z as ERR_INVALID_CALLBACK, _ as ERR_INVALID_OPT_VALUE_ENCODING, $ as EventEmitter, a0 as Buffer, a1 as intoCallbackAPIWithIntercept, a2 as isWindows, a3 as promisify } from './generator-24f509a3.js';

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
/** Write all the content of the array buffer (`arr`) to the writer (`w`).
 *
 * ```ts
 * import { Buffer } from "../io/buffer.ts";
 * import { writeAll } from "./conversion.ts";

 * // Example writing to stdout
 * let contentBytes = new TextEncoder().encode("Hello World");
 * await writeAll(Deno.stdout, contentBytes);
 *
 * // Example writing to file
 * contentBytes = new TextEncoder().encode("Hello World");
 * const file = await Deno.open('test.file', {write: true});
 * await writeAll(file, contentBytes);
 * Deno.close(file.rid);
 *
 * // Example writing to buffer
 * contentBytes = new TextEncoder().encode("Hello World");
 * const writer = new Buffer();
 * await writeAll(writer, contentBytes);
 * console.log(writer.bytes().length);  // 11
 * ```
 */

async function writeAll(w, arr) {
  let nwritten = 0;

  while (nwritten < arr.length) {
    nwritten += await w.write(arr.subarray(nwritten));
  }
}
/** Synchronously write all the content of the array buffer (`arr`) to the
 * writer (`w`).
 *
 * ```ts
 * import { Buffer } from "../io/buffer.ts";
 * import { writeAllSync } from "./conversion.ts";
 *
 * // Example writing to stdout
 * let contentBytes = new TextEncoder().encode("Hello World");
 * writeAllSync(Deno.stdout, contentBytes);
 *
 * // Example writing to file
 * contentBytes = new TextEncoder().encode("Hello World");
 * const file = Deno.openSync('test.file', {write: true});
 * writeAllSync(file, contentBytes);
 * Deno.close(file.rid);
 *
 * // Example writing to buffer
 * contentBytes = new TextEncoder().encode("Hello World");
 * const writer = new Buffer();
 * writeAllSync(writer, contentBytes);
 * console.log(writer.bytes().length);  // 11
 * ```
 */

function writeAllSync(w, arr) {
  let nwritten = 0;

  while (nwritten < arr.length) {
    nwritten += w.writeSync(arr.subarray(nwritten));
  }
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
/** Revisit once https://github.com/denoland/deno/issues/4017 lands */
// TODO(bartlomieju) 'path' can also be a Buffer.  Neither of these polyfills
//is available yet.  See https://github.com/denoland/deno/issues/3403

function access$2(_path, _modeOrCallback, _callback) {
  notImplemented("Not yet available");
} // TODO(bartlomieju) 'path' can also be a Buffer.  Neither of these polyfills
// is available yet.  See https://github.com/denoland/deno/issues/3403

function accessSync(_path, _mode) {
  notImplemented("Not yet available");
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
function isFileOptions(fileOptions) {
  if (!fileOptions) return false;
  return fileOptions.encoding != undefined || fileOptions.flag != undefined || fileOptions.mode != undefined;
}
function getEncoding$1(optOrCallback) {
  if (!optOrCallback || typeof optOrCallback === "function") {
    return null;
  }

  const encoding = typeof optOrCallback === "string" ? optOrCallback : optOrCallback.encoding;
  if (!encoding) return null;
  return encoding;
}
function checkEncoding(encoding) {
  if (!encoding) return null;
  encoding = encoding.toLowerCase();
  if (["utf8", "hex", "base64"].includes(encoding)) return encoding;

  if (encoding === "utf-8") {
    return "utf8";
  }

  if (encoding === "binary") {
    return "binary"; // before this was buffer, however buffer is not used in Node
    // node -e "require('fs').readFile('../world.txt', 'buffer', console.log)"
  }

  const notImplementedEncodings = ["utf16le", "latin1", "ascii", "ucs2"];

  if (notImplementedEncodings.includes(encoding)) {
    notImplemented(`"${encoding}" encoding`);
  }

  throw new Error(`The value "${encoding}" is invalid for option "encoding"`);
}
function getOpenOptions(flag) {
  if (!flag) {
    return {
      create: true,
      append: true
    };
  }

  let openOptions;

  switch (flag) {
    case "a":
      {
        // 'a': Open file for appending. The file is created if it does not exist.
        openOptions = {
          create: true,
          append: true
        };
        break;
      }

    case "ax":
      {
        // 'ax': Like 'a' but fails if the path exists.
        openOptions = {
          createNew: true,
          write: true,
          append: true
        };
        break;
      }

    case "a+":
      {
        // 'a+': Open file for reading and appending. The file is created if it does not exist.
        openOptions = {
          read: true,
          create: true,
          append: true
        };
        break;
      }

    case "ax+":
      {
        // 'ax+': Like 'a+' but fails if the path exists.
        openOptions = {
          read: true,
          createNew: true,
          append: true
        };
        break;
      }

    case "r":
      {
        // 'r': Open file for reading. An exception occurs if the file does not exist.
        openOptions = {
          read: true
        };
        break;
      }

    case "r+":
      {
        // 'r+': Open file for reading and writing. An exception occurs if the file does not exist.
        openOptions = {
          read: true,
          write: true
        };
        break;
      }

    case "w":
      {
        // 'w': Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
        openOptions = {
          create: true,
          write: true,
          truncate: true
        };
        break;
      }

    case "wx":
      {
        // 'wx': Like 'w' but fails if the path exists.
        openOptions = {
          createNew: true,
          write: true
        };
        break;
      }

    case "w+":
      {
        // 'w+': Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists).
        openOptions = {
          create: true,
          write: true,
          truncate: true,
          read: true
        };
        break;
      }

    case "wx+":
      {
        // 'wx+': Like 'w+' but fails if the path exists.
        openOptions = {
          createNew: true,
          write: true,
          read: true
        };
        break;
      }

    case "as":
      {
        // 'as': Open file for appending in synchronous mode. The file is created if it does not exist.
        openOptions = {
          create: true,
          append: true
        };
        break;
      }

    case "as+":
      {
        // 'as+': Open file for reading and appending in synchronous mode. The file is created if it does not exist.
        openOptions = {
          create: true,
          read: true,
          append: true
        };
        break;
      }

    case "rs+":
      {
        // 'rs+': Open file for reading and writing in synchronous mode. Instructs the operating system to bypass the local file system cache.
        openOptions = {
          create: true,
          read: true,
          write: true
        };
        break;
      }

    default:
      {
        throw new Error(`Unrecognized file system flag: ${flag}`);
      }
  }

  return openOptions;
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
/**
 * TODO: Also accept 'data' parameter as a Node polyfill Buffer type once these
 * are implemented. See https://github.com/denoland/deno/issues/3403
 */

function appendFile$2(pathOrRid, data, optionsOrCallback, callback) {
  pathOrRid = pathOrRid instanceof URL ? fromFileUrl(pathOrRid) : pathOrRid;
  const callbackFn = optionsOrCallback instanceof Function ? optionsOrCallback : callback;
  const options = optionsOrCallback instanceof Function ? undefined : optionsOrCallback;

  if (!callbackFn) {
    throw new Error("No callback function supplied");
  }

  validateEncoding(options);
  let rid = -1;
  const buffer = data instanceof Uint8Array ? data : new TextEncoder().encode(data);
  new Promise((resolve, reject) => {
    if (typeof pathOrRid === "number") {
      rid = pathOrRid;
      Deno.write(rid, buffer).then(resolve, reject);
    } else {
      const mode = isFileOptions(options) ? options.mode : undefined;
      const flag = isFileOptions(options) ? options.flag : undefined;

      if (mode) {
        // TODO(bartlomieju) rework once https://github.com/denoland/deno/issues/4017 completes
        notImplemented("Deno does not yet support setting mode on create");
      }

      Deno.open(pathOrRid, getOpenOptions(flag)).then(({
        rid: openedFileRid
      }) => {
        rid = openedFileRid;
        return Deno.write(openedFileRid, buffer);
      }).then(resolve, reject);
    }
  }).then(() => {
    closeRidIfNecessary(typeof pathOrRid === "string", rid);
    callbackFn(null);
  }, err => {
    closeRidIfNecessary(typeof pathOrRid === "string", rid);
    callbackFn(err);
  });
}

function closeRidIfNecessary(isPathString, rid) {
  if (isPathString && rid != -1) {
    //Only close if a path was supplied and a rid allocated
    Deno.close(rid);
  }
}
/**
 * TODO: Also accept 'data' parameter as a Node polyfill Buffer type once these
 * are implemented. See https://github.com/denoland/deno/issues/3403
 */


function appendFileSync(pathOrRid, data, options) {
  let rid = -1;
  validateEncoding(options);
  pathOrRid = pathOrRid instanceof URL ? fromFileUrl(pathOrRid) : pathOrRid;

  try {
    if (typeof pathOrRid === "number") {
      rid = pathOrRid;
    } else {
      const mode = isFileOptions(options) ? options.mode : undefined;
      const flag = isFileOptions(options) ? options.flag : undefined;

      if (mode) {
        // TODO(bartlomieju) rework once https://github.com/denoland/deno/issues/4017 completes
        notImplemented("Deno does not yet support setting mode on create");
      }

      const file = Deno.openSync(pathOrRid, getOpenOptions(flag));
      rid = file.rid;
    }

    const buffer = data instanceof Uint8Array ? data : new TextEncoder().encode(data);
    Deno.writeSync(rid, buffer);
  } finally {
    closeRidIfNecessary(typeof pathOrRid === "string", rid);
  }
}

function validateEncoding(encodingOption) {
  if (!encodingOption) return;

  if (typeof encodingOption === "string") {
    if (encodingOption !== "utf8") {
      throw new Error("Only 'utf8' encoding is currently supported");
    }
  } else if (encodingOption.encoding && encodingOption.encoding !== "utf8") {
    throw new Error("Only 'utf8' encoding is currently supported");
  }
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
const allowedModes = /^[0-7]{3}/;
/**
 * TODO: Also accept 'path' parameter as a Node polyfill Buffer type once these
 * are implemented. See https://github.com/denoland/deno/issues/3403
 */

function chmod$2(path, mode, callback) {
  path = path instanceof URL ? fromFileUrl(path) : path;
  Deno.chmod(path, getResolvedMode(mode)).then(() => callback(null), callback);
}
/**
 * TODO: Also accept 'path' parameter as a Node polyfill Buffer type once these
 * are implemented. See https://github.com/denoland/deno/issues/3403
 */

function chmodSync(path, mode) {
  path = path instanceof URL ? fromFileUrl(path) : path;
  Deno.chmodSync(path, getResolvedMode(mode));
}

function getResolvedMode(mode) {
  if (typeof mode === "number") {
    return mode;
  }

  if (typeof mode === "string" && !allowedModes.test(mode)) {
    throw new Error("Unrecognized mode: " + mode);
  }

  return parseInt(mode, 8);
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
/**
 * TODO: Also accept 'path' parameter as a Node polyfill Buffer type once these
 * are implemented. See https://github.com/denoland/deno/issues/3403
 */

function chown$2(path, uid, gid, callback) {
  path = path instanceof URL ? fromFileUrl(path) : path;
  Deno.chown(path, uid, gid).then(() => callback(null), callback);
}
/**
 * TODO: Also accept 'path' parameter as a Node polyfill Buffer type once these
 * are implemented. See https://github.com/denoland/deno/issues/3403
 */

function chownSync(path, uid, gid) {
  path = path instanceof URL ? fromFileUrl(path) : path;
  Deno.chownSync(path, uid, gid);
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
function close(fd, callback) {
  setTimeout(() => {
    let error = null;

    try {
      Deno.close(fd);
    } catch (err) {
      error = err instanceof Error ? err : new Error("[non-error thrown]");
    }

    callback(error);
  }, 0);
}
function closeSync(fd) {
  Deno.close(fd);
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
//File access constants
const F_OK = 0;
const R_OK = 4;
const W_OK = 2;
const X_OK = 1; //File mode constants

const S_IRUSR = 0o400; //read by owner

const S_IWUSR = 0o200; //write by owner

const S_IXUSR = 0o100; //execute/search by owner

const S_IRGRP = 0o40; //read by group

const S_IWGRP = 0o20; //write by group

const S_IXGRP = 0o10; //execute/search by group

const S_IROTH = 0o4; //read by others

const S_IWOTH = 0o2; //write by others

const S_IXOTH = 0o1; //execute/search by others

var constants = /*#__PURE__*/Object.freeze({
  __proto__: null,
  F_OK: F_OK,
  R_OK: R_OK,
  W_OK: W_OK,
  X_OK: X_OK,
  S_IRUSR: S_IRUSR,
  S_IWUSR: S_IWUSR,
  S_IXUSR: S_IXUSR,
  S_IRGRP: S_IRGRP,
  S_IWGRP: S_IWGRP,
  S_IXGRP: S_IXGRP,
  S_IROTH: S_IROTH,
  S_IWOTH: S_IWOTH,
  S_IXOTH: S_IXOTH
});

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
function copyFile$2(source, destination, callback) {
  source = source instanceof URL ? fromFileUrl(source) : source;
  Deno.copyFile(source, destination).then(() => callback(null), callback);
}
function copyFileSync(source, destination) {
  source = source instanceof URL ? fromFileUrl(source) : source;
  Deno.copyFileSync(source, destination);
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
class Dirent {
  constructor(entry) {
    this.entry = entry;
  }

  isBlockDevice() {
    notImplemented("Deno does not yet support identification of block devices");
    return false;
  }

  isCharacterDevice() {
    notImplemented("Deno does not yet support identification of character devices");
    return false;
  }

  isDirectory() {
    return this.entry.isDirectory;
  }

  isFIFO() {
    notImplemented("Deno does not yet support identification of FIFO named pipes");
    return false;
  }

  isFile() {
    return this.entry.isFile;
  }

  isSocket() {
    notImplemented("Deno does not yet support identification of sockets");
    return false;
  }

  isSymbolicLink() {
    return this.entry.isSymlink;
  }

  get name() {
    return this.entry.name;
  }

}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
class Dir {
  constructor(path) {
    this.dirPath = path;
  }

  get path() {
    if (this.dirPath instanceof Uint8Array) {
      return new TextDecoder().decode(this.dirPath);
    }

    return this.dirPath;
  } // deno-lint-ignore no-explicit-any


  read(callback) {
    return new Promise((resolve, reject) => {
      if (!this.asyncIterator) {
        this.asyncIterator = Deno.readDir(this.path)[Symbol.asyncIterator]();
      }

      assert(this.asyncIterator);
      this.asyncIterator.next().then(({
        value
      }) => {
        resolve(value ? value : null);

        if (callback) {
          callback(null, value ? value : null);
        }
      }, err => {
        if (callback) {
          callback(err);
        }

        reject(err);
      });
    });
  }

  readSync() {
    if (!this.syncIterator) {
      this.syncIterator = Deno.readDirSync(this.path)[Symbol.iterator]();
    }

    const file = this.syncIterator.next().value;
    return file ? new Dirent(file) : null;
  }
  /**
   * Unlike Node, Deno does not require managing resource ids for reading
   * directories, and therefore does not need to close directories when
   * finished reading.
   */
  // deno-lint-ignore no-explicit-any


  close(callback) {
    return new Promise(resolve => {
      if (callback) {
        callback(null);
      }

      resolve();
    });
  }
  /**
   * Unlike Node, Deno does not require managing resource ids for reading
   * directories, and therefore does not need to close directories when
   * finished reading
   */


  closeSync() {//No op
  }

  async *[Symbol.asyncIterator]() {
    try {
      while (true) {
        const dirent = await this.read();

        if (dirent === null) {
          break;
        }

        yield dirent;
      }
    } finally {
      await this.close();
    }
  }

}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.

/**
 * TODO: Also accept 'path' parameter as a Node polyfill Buffer type once these
 * are implemented. See https://github.com/denoland/deno/issues/3403
 * Deprecated in node api
 */
function exists(path, callback) {
  path = path instanceof URL ? fromFileUrl(path) : path;
  Deno.lstat(path).then(() => callback(true), () => callback(false));
}
/**
 * TODO: Also accept 'path' parameter as a Node polyfill Buffer or URL type once these
 * are implemented. See https://github.com/denoland/deno/issues/3403
 */

function existsSync$1(path) {
  path = path instanceof URL ? fromFileUrl(path) : path;

  try {
    Deno.lstatSync(path);
    return true;
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return false;
    }

    throw err;
  }
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
function fdatasync(fd, callback) {
  Deno.fdatasync(fd).then(() => callback(null), callback);
}
function fdatasyncSync(fd) {
  Deno.fdatasyncSync(fd);
}

function convertFileInfoToStats(origin) {
  return {
    dev: origin.dev,
    ino: origin.ino,
    mode: origin.mode,
    nlink: origin.nlink,
    uid: origin.uid,
    gid: origin.gid,
    rdev: origin.rdev,
    size: origin.size,
    blksize: origin.blksize,
    blocks: origin.blocks,
    mtime: origin.mtime,
    atime: origin.atime,
    birthtime: origin.birthtime,
    mtimeMs: origin.mtime?.getTime() || null,
    atimeMs: origin.atime?.getTime() || null,
    birthtimeMs: origin.birthtime?.getTime() || null,
    isFile: () => origin.isFile,
    isDirectory: () => origin.isDirectory,
    isSymbolicLink: () => origin.isSymlink,
    // not sure about those
    isBlockDevice: () => false,
    isFIFO: () => false,
    isCharacterDevice: () => false,
    isSocket: () => false,
    ctime: origin.mtime,
    ctimeMs: origin.mtime?.getTime() || null
  };
}

function toBigInt(number) {
  if (number === null || number === undefined) return null;
  return BigInt(number);
}

function convertFileInfoToBigIntStats(origin) {
  return {
    dev: toBigInt(origin.dev),
    ino: toBigInt(origin.ino),
    mode: toBigInt(origin.mode),
    nlink: toBigInt(origin.nlink),
    uid: toBigInt(origin.uid),
    gid: toBigInt(origin.gid),
    rdev: toBigInt(origin.rdev),
    size: toBigInt(origin.size) || 0n,
    blksize: toBigInt(origin.blksize),
    blocks: toBigInt(origin.blocks),
    mtime: origin.mtime,
    atime: origin.atime,
    birthtime: origin.birthtime,
    mtimeMs: origin.mtime ? BigInt(origin.mtime.getTime()) : null,
    atimeMs: origin.atime ? BigInt(origin.atime.getTime()) : null,
    birthtimeMs: origin.birthtime ? BigInt(origin.birthtime.getTime()) : null,
    mtimeNs: origin.mtime ? BigInt(origin.mtime.getTime()) * 1000000n : null,
    atimeNs: origin.atime ? BigInt(origin.atime.getTime()) * 1000000n : null,
    birthtimeNs: origin.birthtime ? BigInt(origin.birthtime.getTime()) * 1000000n : null,
    isFile: () => origin.isFile,
    isDirectory: () => origin.isDirectory,
    isSymbolicLink: () => origin.isSymlink,
    // not sure about those
    isBlockDevice: () => false,
    isFIFO: () => false,
    isCharacterDevice: () => false,
    isSocket: () => false,
    ctime: origin.mtime,
    ctimeMs: origin.mtime ? BigInt(origin.mtime.getTime()) : null,
    ctimeNs: origin.mtime ? BigInt(origin.mtime.getTime()) * 1000000n : null
  };
} // shortcut for Convert File Info to Stats or BigIntStats

function CFISBIS(fileInfo, bigInt) {
  if (bigInt) return convertFileInfoToBigIntStats(fileInfo);
  return convertFileInfoToStats(fileInfo);
}
function stat$2(path, optionsOrCallback, maybeCallback) {
  const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : maybeCallback;
  const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {
    bigint: false
  };
  if (!callback) throw new Error("No callback function supplied");
  Deno.stat(path).then(stat => callback(null, CFISBIS(stat, options.bigint)), err => callback(err));
}
function statSync(path, options = {
  bigint: false
}) {
  const origin = Deno.statSync(path);
  return CFISBIS(origin, options.bigint);
}

function fstat(fd, optionsOrCallback, maybeCallback) {
  const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : maybeCallback;
  const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {
    bigint: false
  };
  if (!callback) throw new Error("No callback function supplied");
  Deno.fstat(fd).then(stat => callback(null, CFISBIS(stat, options.bigint)), err => callback(err));
}
function fstatSync(fd, options) {
  const origin = Deno.fstatSync(fd);
  return CFISBIS(origin, options?.bigint || false);
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
function fsync(fd, callback) {
  Deno.fsync(fd).then(() => callback(null), callback);
}
function fsyncSync(fd) {
  Deno.fsyncSync(fd);
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
function ftruncate(fd, lenOrCallback, maybeCallback) {
  const len = typeof lenOrCallback === "number" ? lenOrCallback : undefined;
  const callback = typeof lenOrCallback === "function" ? lenOrCallback : maybeCallback;
  if (!callback) throw new Error("No callback function supplied");
  Deno.ftruncate(fd, len).then(() => callback(null), callback);
}
function ftruncateSync(fd, len) {
  Deno.ftruncateSync(fd, len);
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
function getValidTime$1(time, name) {
  if (typeof time === "string") {
    time = Number(time);
  }

  if (typeof time === "number" && (Number.isNaN(time) || !Number.isFinite(time))) {
    throw new Deno.errors.InvalidData(`invalid ${name}, must not be infinity or NaN`);
  }

  return time;
}

function futimes(fd, atime, mtime, callback) {
  if (!callback) {
    throw new Deno.errors.InvalidData("No callback function supplied");
  }

  atime = getValidTime$1(atime, "atime");
  mtime = getValidTime$1(mtime, "mtime");
  Deno.futime(fd, atime, mtime).then(() => callback(null), callback);
}
function futimesSync(fd, atime, mtime) {
  atime = getValidTime$1(atime, "atime");
  mtime = getValidTime$1(mtime, "mtime");
  Deno.futimeSync(fd, atime, mtime);
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
/**
 * TODO: Also accept 'path' parameter as a Node polyfill Buffer type once these
 * are implemented. See https://github.com/denoland/deno/issues/3403
 */

function link$2(existingPath, newPath, callback) {
  existingPath = existingPath instanceof URL ? fromFileUrl(existingPath) : existingPath;
  newPath = newPath instanceof URL ? fromFileUrl(newPath) : newPath;
  Deno.link(existingPath, newPath).then(() => callback(null), callback);
}
/**
 * TODO: Also accept 'path' parameter as a Node polyfill Buffer type once these
 * are implemented. See https://github.com/denoland/deno/issues/3403
 */

function linkSync(existingPath, newPath) {
  existingPath = existingPath instanceof URL ? fromFileUrl(existingPath) : existingPath;
  newPath = newPath instanceof URL ? fromFileUrl(newPath) : newPath;
  Deno.linkSync(existingPath, newPath);
}

function lstat$2(path, optionsOrCallback, maybeCallback) {
  const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : maybeCallback;
  const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {
    bigint: false
  };
  if (!callback) throw new Error("No callback function supplied");
  Deno.lstat(path).then(stat => callback(null, CFISBIS(stat, options.bigint)), err => callback(err));
}
function lstatSync(path, options) {
  const origin = Deno.lstatSync(path);
  return CFISBIS(origin, options?.bigint || false);
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
/**
 * TODO: Also accept 'path' parameter as a Node polyfill Buffer type once these
 * are implemented. See https://github.com/denoland/deno/issues/3403
 */

function mkdir$2(path, options, callback) {
  path = path instanceof URL ? fromFileUrl(path) : path;
  let mode = 0o777;
  let recursive = false;

  if (typeof options == "function") {
    callback = options;
  } else if (typeof options === "number") {
    mode = options;
  } else if (typeof options === "boolean") {
    recursive = options;
  } else if (options) {
    if (options.recursive !== undefined) recursive = options.recursive;
    if (options.mode !== undefined) mode = options.mode;
  }

  if (typeof recursive !== "boolean") {
    throw new Deno.errors.InvalidData("invalid recursive option , must be a boolean");
  }

  Deno.mkdir(path, {
    recursive,
    mode
  }).then(() => {
    if (typeof callback === "function") {
      callback(null);
    }
  }, err => {
    if (typeof callback === "function") {
      callback(err);
    }
  });
}
function mkdirSync(path, options) {
  path = path instanceof URL ? fromFileUrl(path) : path;
  let mode = 0o777;
  let recursive = false;

  if (typeof options === "number") {
    mode = options;
  } else if (typeof options === "boolean") {
    recursive = options;
  } else if (options) {
    if (options.recursive !== undefined) recursive = options.recursive;
    if (options.mode !== undefined) mode = options.mode;
  }

  if (typeof recursive !== "boolean") {
    throw new Deno.errors.InvalidData("invalid recursive option , must be a boolean");
  }

  Deno.mkdirSync(path, {
    recursive,
    mode
  });
}

// Copyright Node.js contributors. All rights reserved. MIT License.
function mkdtemp$2(prefix, optionsOrCallback, maybeCallback) {
  const callback = typeof optionsOrCallback == "function" ? optionsOrCallback : maybeCallback;
  if (!callback) throw new ERR_INVALID_CALLBACK(callback);
  const encoding = parseEncoding(optionsOrCallback);
  const path = tempDirPath(prefix);
  mkdir$2(path, {
    recursive: false,
    mode: 0o700
  }, err => {
    if (err) callback(err);else callback(null, decode$1(path, encoding));
  });
} // https://nodejs.org/dist/latest-v15.x/docs/api/fs.html#fs_fs_mkdtempsync_prefix_options

function mkdtempSync(prefix, options) {
  const encoding = parseEncoding(options);
  const path = tempDirPath(prefix);
  mkdirSync(path, {
    recursive: false,
    mode: 0o700
  });
  return decode$1(path, encoding);
}

function parseEncoding(optionsOrCallback) {
  let encoding;
  if (typeof optionsOrCallback == "function") encoding = undefined;else if (optionsOrCallback instanceof Object) {
    encoding = optionsOrCallback?.encoding;
  } else encoding = optionsOrCallback;

  if (encoding) {
    try {
      new TextDecoder(encoding);
    } catch {
      throw new ERR_INVALID_OPT_VALUE_ENCODING(encoding);
    }
  }

  return encoding;
}

function decode$1(str, encoding) {
  if (!encoding) return str;else {
    const decoder = new TextDecoder(encoding);
    const encoder = new TextEncoder();
    return decoder.decode(encoder.encode(str));
  }
}

const CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function randomName() {
  return [...Array(6)].map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join("");
}

function tempDirPath(prefix) {
  let path;

  do {
    path = prefix + randomName();
  } while (existsSync$1(path));

  return path;
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
/**
 * Test whether or not the given path exists by checking with the file system
 * @deprecated Checking the state of a file before using it causes a race condition. Perform the actual operation directly instead.
 * @see https://en.wikipedia.org/wiki/Time-of-check_to_time-of-use
 */

function existsSync(filePath) {
  try {
    Deno.lstatSync(filePath);
    return true;
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return false;
    }

    throw err;
  }
}

function convertFlagAndModeToOptions(flag, mode) {
  if (!flag && !mode) return undefined;
  if (!flag && mode) return {
    mode
  };
  return { ...getOpenOptions(flag),
    mode
  };
}

function open$2(path, flagsOrCallback, callbackOrMode, maybeCallback) {
  const flags = typeof flagsOrCallback === "string" ? flagsOrCallback : undefined;
  const callback = typeof flagsOrCallback === "function" ? flagsOrCallback : typeof callbackOrMode === "function" ? callbackOrMode : maybeCallback;
  const mode = typeof callbackOrMode === "number" ? callbackOrMode : undefined;
  path = path instanceof URL ? fromFileUrl(path) : path;
  if (!callback) throw new Error("No callback function supplied");

  if (["ax", "ax+", "wx", "wx+"].includes(flags || "") && existsSync(path)) {
    const err = new Error(`EEXIST: file already exists, open '${path}'`);
    callback(err);
  } else {
    if (flags === "as" || flags === "as+") {
      let err = null,
          res;

      try {
        res = openSync(path, flags, mode);
      } catch (error) {
        err = error instanceof Error ? error : new Error("[non-error thrown]");
      }

      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }

      return;
    }

    Deno.open(path, convertFlagAndModeToOptions(flags, mode)).then(file => callback(null, file.rid), err => callback(err));
  }
}
function openSync(path, flagsOrMode, maybeMode) {
  const flags = typeof flagsOrMode === "string" ? flagsOrMode : undefined;
  const mode = typeof flagsOrMode === "number" ? flagsOrMode : maybeMode;
  path = path instanceof URL ? fromFileUrl(path) : path;

  if (["ax", "ax+", "wx", "wx+"].includes(flags || "") && existsSync(path)) {
    throw new Error(`EEXIST: file already exists, open '${path}'`);
  }

  return Deno.openSync(path, convertFlagAndModeToOptions(flags, mode)).rid;
}

function asyncIterableToCallback(iter, callback) {
  const iterator = iter[Symbol.asyncIterator]();

  function next() {
    iterator.next().then(obj => {
      if (obj.done) {
        callback(obj.value, true);
        return;
      }

      callback(obj.value);
      next();
    });
  }

  next();
}
function watch$2(filename, optionsOrListener, optionsOrListener2) {
  const listener = typeof optionsOrListener === "function" ? optionsOrListener : typeof optionsOrListener2 === "function" ? optionsOrListener2 : undefined;
  const options = typeof optionsOrListener === "object" ? optionsOrListener : typeof optionsOrListener2 === "object" ? optionsOrListener2 : undefined;
  filename = filename instanceof URL ? fromFileUrl(filename) : filename;
  const iterator = Deno.watchFs(filename, {
    recursive: options?.recursive || false
  });
  if (!listener) throw new Error("No callback function supplied");
  const fsWatcher = new FSWatcher(() => {
    if (iterator.return) iterator.return();
  });
  fsWatcher.on("change", listener);
  asyncIterableToCallback(iterator, (val, done) => {
    if (done) return;
    fsWatcher.emit("change", val.kind, val.paths[0]);
  });
  return fsWatcher;
}

class FSWatcher extends EventEmitter {
  constructor(closer) {
    super();
    this.close = closer;
  }

  ref() {
    notImplemented("FSWatcher.ref() is not implemented");
  }

  unref() {
    notImplemented("FSWatcher.unref() is not implemented");
  }

}

function toDirent(val) {
  return new Dirent(val);
}

function readdir$2(path, optionsOrCallback, maybeCallback) {
  const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : maybeCallback;
  const options = typeof optionsOrCallback === "object" ? optionsOrCallback : null;
  const result = [];
  path = path instanceof URL ? fromFileUrl(path) : path;
  if (!callback) throw new Error("No callback function supplied");

  if (options?.encoding) {
    try {
      new TextDecoder(options.encoding);
    } catch {
      throw new Error(`TypeError [ERR_INVALID_OPT_VALUE_ENCODING]: The value "${options.encoding}" is invalid for option "encoding"`);
    }
  }

  try {
    asyncIterableToCallback(Deno.readDir(path), (val, done) => {
      if (typeof path !== "string") return;

      if (done) {
        callback(null, result);
        return;
      }

      if (options?.withFileTypes) {
        result.push(toDirent(val));
      } else result.push(decode(val.name));
    });
  } catch (error) {
    callback(error instanceof Error ? error : new Error("[non-error thrown]"));
  }
}

function decode(str, encoding) {
  if (!encoding) return str;else {
    const decoder = new TextDecoder(encoding);
    const encoder = new TextEncoder();
    return decoder.decode(encoder.encode(str));
  }
}

function readdirSync(path, options) {
  const result = [];
  path = path instanceof URL ? fromFileUrl(path) : path;

  if (options?.encoding) {
    try {
      new TextDecoder(options.encoding);
    } catch {
      throw new Error(`TypeError [ERR_INVALID_OPT_VALUE_ENCODING]: The value "${options.encoding}" is invalid for option "encoding"`);
    }
  }

  for (const file of Deno.readDirSync(path)) {
    if (options?.withFileTypes) {
      result.push(toDirent(file));
    } else result.push(decode(file.name));
  }

  return result;
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.

function maybeDecode(data, encoding) {
  const buffer = new Buffer(data.buffer, data.byteOffset, data.byteLength);
  if (encoding && encoding !== "binary") return buffer.toString(encoding);
  return buffer;
}

function readFile$2(path, optOrCallback, callback) {
  path = path instanceof URL ? fromFileUrl(path) : path;
  let cb;

  if (typeof optOrCallback === "function") {
    cb = optOrCallback;
  } else {
    cb = callback;
  }

  const encoding = getEncoding$1(optOrCallback);
  const p = Deno.readFile(path);

  if (cb) {
    p.then(data => {
      if (encoding && encoding !== "binary") {
        const text = maybeDecode(data, encoding);
        return cb(null, text);
      }

      const buffer = maybeDecode(data, encoding);
      cb(null, buffer);
    }, err => cb && cb(err));
  }
}
function readFileSync(path, opt) {
  path = path instanceof URL ? fromFileUrl(path) : path;
  const data = Deno.readFileSync(path);
  const encoding = getEncoding$1(opt);

  if (encoding && encoding !== "binary") {
    const text = maybeDecode(data, encoding);
    return text;
  }

  const buffer = maybeDecode(data, encoding);
  return buffer;
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.

function maybeEncode(data, encoding) {
  if (encoding === "buffer") {
    return new TextEncoder().encode(data);
  }

  return data;
}

function getEncoding(optOrCallback) {
  if (!optOrCallback || typeof optOrCallback === "function") {
    return null;
  } else {
    if (optOrCallback.encoding) {
      if (optOrCallback.encoding === "utf8" || optOrCallback.encoding === "utf-8") {
        return "utf8";
      } else if (optOrCallback.encoding === "buffer") {
        return "buffer";
      } else {
        notImplemented();
      }
    }

    return null;
  }
}

function readlink$2(path, optOrCallback, callback) {
  path = path instanceof URL ? fromFileUrl(path) : path;
  let cb;

  if (typeof optOrCallback === "function") {
    cb = optOrCallback;
  } else {
    cb = callback;
  }

  const encoding = getEncoding(optOrCallback);
  intoCallbackAPIWithIntercept(Deno.readLink, data => maybeEncode(data, encoding), cb, path);
}
function readlinkSync(path, opt) {
  path = path instanceof URL ? fromFileUrl(path) : path;
  return maybeEncode(Deno.readLinkSync(path), getEncoding(opt));
}

function realpath$2(path, options, callback) {
  if (typeof options === "function") {
    callback = options;
  }

  if (!callback) {
    throw new Error("No callback function supplied");
  }

  Deno.realPath(path).then(path => callback(null, path), err => callback(err));
}
function realpathSync(path) {
  return Deno.realPathSync(path);
}

function rename$2(oldPath, newPath, callback) {
  oldPath = oldPath instanceof URL ? fromFileUrl(oldPath) : oldPath;
  newPath = newPath instanceof URL ? fromFileUrl(newPath) : newPath;
  if (!callback) throw new Error("No callback function supplied");
  Deno.rename(oldPath, newPath).then(_ => callback(), callback);
}
function renameSync(oldPath, newPath) {
  oldPath = oldPath instanceof URL ? fromFileUrl(oldPath) : oldPath;
  newPath = newPath instanceof URL ? fromFileUrl(newPath) : newPath;
  Deno.renameSync(oldPath, newPath);
}

function rmdir$2(path, optionsOrCallback, maybeCallback) {
  const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : maybeCallback;
  const options = typeof optionsOrCallback === "object" ? optionsOrCallback : undefined;
  if (!callback) throw new Error("No callback function supplied");
  Deno.remove(path, {
    recursive: options?.recursive
  }).then(_ => callback(), callback);
}
function rmdirSync(path, options) {
  Deno.removeSync(path, {
    recursive: options?.recursive
  });
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
function symlink$2(target, path, typeOrCallback, maybeCallback) {
  target = target instanceof URL ? fromFileUrl(target) : target;
  path = path instanceof URL ? fromFileUrl(path) : path;
  const type = typeof typeOrCallback === "string" ? typeOrCallback : "file";
  const callback = typeof typeOrCallback === "function" ? typeOrCallback : maybeCallback;
  if (!callback) throw new Error("No callback function supplied");
  Deno.symlink(target, path, {
    type
  }).then(() => callback(null), callback);
}
function symlinkSync(target, path, type) {
  target = target instanceof URL ? fromFileUrl(target) : target;
  path = path instanceof URL ? fromFileUrl(path) : path;
  type = type || "file";
  Deno.symlinkSync(target, path, {
    type
  });
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
function truncate$2(path, lenOrCallback, maybeCallback) {
  path = path instanceof URL ? fromFileUrl(path) : path;
  const len = typeof lenOrCallback === "number" ? lenOrCallback : undefined;
  const callback = typeof lenOrCallback === "function" ? lenOrCallback : maybeCallback;
  if (!callback) throw new Error("No callback function supplied");
  Deno.truncate(path, len).then(() => callback(null), callback);
}
function truncateSync(path, len) {
  path = path instanceof URL ? fromFileUrl(path) : path;
  Deno.truncateSync(path, len);
}

function unlink$2(path, callback) {
  if (!callback) throw new Error("No callback function supplied");
  Deno.remove(path).then(_ => callback(), callback);
}
function unlinkSync(path) {
  Deno.removeSync(path);
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.

function getValidTime(time, name) {
  if (typeof time === "string") {
    time = Number(time);
  }

  if (typeof time === "number" && (Number.isNaN(time) || !Number.isFinite(time))) {
    throw new Deno.errors.InvalidData(`invalid ${name}, must not be infinity or NaN`);
  }

  return time;
}

function utimes$2(path, atime, mtime, callback) {
  path = path instanceof URL ? fromFileUrl(path) : path;

  if (!callback) {
    throw new Deno.errors.InvalidData("No callback function supplied");
  }

  atime = getValidTime(atime, "atime");
  mtime = getValidTime(mtime, "mtime");
  Deno.utime(path, atime, mtime).then(() => callback(null), callback);
}
function utimesSync(path, atime, mtime) {
  path = path instanceof URL ? fromFileUrl(path) : path;
  atime = getValidTime(atime, "atime");
  mtime = getValidTime(mtime, "mtime");
  Deno.utimeSync(path, atime, mtime);
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
function writeFile$2(pathOrRid, data, optOrCallback, callback) {
  const callbackFn = optOrCallback instanceof Function ? optOrCallback : callback;
  const options = optOrCallback instanceof Function ? undefined : optOrCallback;

  if (!callbackFn) {
    throw new TypeError("Callback must be a function.");
  }

  pathOrRid = pathOrRid instanceof URL ? fromFileUrl(pathOrRid) : pathOrRid;
  const flag = isFileOptions(options) ? options.flag : undefined;
  const mode = isFileOptions(options) ? options.mode : undefined;
  const encoding = checkEncoding(getEncoding$1(options)) || "utf8";
  const openOptions = getOpenOptions(flag || "w");
  if (typeof data === "string") data = Buffer.from(data, encoding);
  const isRid = typeof pathOrRid === "number";
  let file;
  let error = null;

  (async () => {
    try {
      file = isRid ? new Deno.File(pathOrRid) : await Deno.open(pathOrRid, openOptions);

      if (!isRid && mode) {
        if (isWindows) notImplemented(`"mode" on Windows`);
        await Deno.chmod(pathOrRid, mode);
      }

      await writeAll(file, data);
    } catch (e) {
      error = e instanceof Error ? e : new Error("[non-error thrown]");
    } finally {
      // Make sure to close resource
      if (!isRid && file) file.close();
      callbackFn(error);
    }
  })();
}
function writeFileSync(pathOrRid, data, options) {
  pathOrRid = pathOrRid instanceof URL ? fromFileUrl(pathOrRid) : pathOrRid;
  const flag = isFileOptions(options) ? options.flag : undefined;
  const mode = isFileOptions(options) ? options.mode : undefined;
  const encoding = checkEncoding(getEncoding$1(options)) || "utf8";
  const openOptions = getOpenOptions(flag || "w");
  if (typeof data === "string") data = Buffer.from(data, encoding);
  const isRid = typeof pathOrRid === "number";
  let file;
  let error = null;

  try {
    file = isRid ? new Deno.File(pathOrRid) : Deno.openSync(pathOrRid, openOptions);

    if (!isRid && mode) {
      if (isWindows) notImplemented(`"mode" on Windows`);
      Deno.chmodSync(pathOrRid, mode);
    }

    writeAllSync(file, data);
  } catch (e) {
    error = e instanceof Error ? e : new Error("[non-error thrown]");
  } finally {
    // Make sure to close resource
    if (!isRid && file) file.close();
  }

  if (error) throw error;
}

const access$1 = promisify(access$2);
const copyFile$1 = promisify(copyFile$2);
const open$1 = promisify(open$2); // export const opendir = promisify(fs.opendir);

const rename$1 = promisify(rename$2);
const truncate$1 = promisify(truncate$2); // export const rm = promisify(fs.rm);

const rmdir$1 = promisify(rmdir$2);
const mkdir$1 = promisify(mkdir$2);
const readdir$1 = promisify(readdir$2);
const readlink$1 = promisify(readlink$2);
const symlink$1 = promisify(symlink$2);
const lstat$1 = promisify(lstat$2);
const stat$1 = promisify(stat$2);
const link$1 = promisify(link$2);
const unlink$1 = promisify(unlink$2);
const chmod$1 = promisify(chmod$2); // export const lchmod = promisify(fs.lchmod);
// export const lchown = promisify(fs.lchown);

const chown$1 = promisify(chown$2);
const utimes$1 = promisify(utimes$2); // export const lutimes = promisify(fs.lutimes);

const realpath$1 = promisify(realpath$2);
const mkdtemp$1 = promisify(mkdtemp$2);
const writeFile$1 = promisify(writeFile$2);
const appendFile$1 = promisify(appendFile$2);
const readFile$1 = promisify(readFile$2);
const watch$1 = promisify(watch$2);
var promises$2 = {
  open: open$1,
  // opendir,
  rename: rename$1,
  truncate: truncate$1,
  // rm,
  rmdir: rmdir$1,
  mkdir: mkdir$1,
  readdir: readdir$1,
  readlink: readlink$1,
  symlink: symlink$1,
  lstat: lstat$1,
  stat: stat$1,
  link: link$1,
  unlink: unlink$1,
  chmod: chmod$1,
  // lchmod,
  // lchown,
  chown: chown$1,
  utimes: utimes$1,
  // lutimes,
  realpath: realpath$1,
  mkdtemp: mkdtemp$1,
  writeFile: writeFile$1,
  appendFile: appendFile$1,
  readFile: readFile$1,
  watch: watch$1
};

var promises$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  access: access$1,
  copyFile: copyFile$1,
  open: open$1,
  rename: rename$1,
  truncate: truncate$1,
  rmdir: rmdir$1,
  mkdir: mkdir$1,
  readdir: readdir$1,
  readlink: readlink$1,
  symlink: symlink$1,
  lstat: lstat$1,
  stat: stat$1,
  link: link$1,
  unlink: unlink$1,
  chmod: chmod$1,
  chown: chown$1,
  utimes: utimes$1,
  realpath: realpath$1,
  mkdtemp: mkdtemp$1,
  writeFile: writeFile$1,
  appendFile: appendFile$1,
  readFile: readFile$1,
  watch: watch$1,
  'default': promises$2
});

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
var fs = {
  access: access$2,
  accessSync,
  appendFile: appendFile$2,
  appendFileSync,
  chmod: chmod$2,
  chmodSync,
  chown: chown$2,
  chownSync,
  close,
  closeSync,
  constants,
  copyFile: copyFile$2,
  copyFileSync,
  Dir,
  Dirent,
  exists,
  existsSync: existsSync$1,
  fdatasync,
  fdatasyncSync,
  fstat,
  fstatSync,
  fsync,
  fsyncSync,
  ftruncate,
  ftruncateSync,
  futimes,
  futimesSync,
  link: link$2,
  linkSync,
  lstat: lstat$2,
  lstatSync,
  mkdir: mkdir$2,
  mkdirSync,
  mkdtemp: mkdtemp$2,
  mkdtempSync,
  open: open$2,
  openSync,
  promises: promises$3,
  readdir: readdir$2,
  readdirSync,
  readFile: readFile$2,
  readFileSync,
  readlink: readlink$2,
  readlinkSync,
  realpath: realpath$2,
  realpathSync,
  rename: rename$2,
  renameSync,
  rmdir: rmdir$2,
  rmdirSync,
  stat: stat$2,
  statSync,
  symlink: symlink$2,
  symlinkSync,
  truncate: truncate$2,
  truncateSync,
  unlink: unlink$2,
  unlinkSync,
  utimes: utimes$2,
  utimesSync,
  watch: watch$2,
  writeFile: writeFile$2,
  writeFileSync
};

const access = promisify(access$2);
const copyFile = promisify(copyFile$2);
const open = promisify(open$2); // export const opendir = promisify(fs.opendir);

const rename = promisify(rename$2);
const truncate = promisify(truncate$2); // export const rm = promisify(fs.rm);

const rmdir = promisify(rmdir$2);
const mkdir = promisify(mkdir$2);
const readdir = promisify(readdir$2);
const readlink = promisify(readlink$2);
const symlink = promisify(symlink$2);
const lstat = promisify(lstat$2);
const stat = promisify(stat$2);
const link = promisify(link$2);
const unlink = promisify(unlink$2);
const chmod = promisify(chmod$2); // export const lchmod = promisify(fs.lchmod);
// export const lchown = promisify(fs.lchown);

const chown = promisify(chown$2);
const utimes = promisify(utimes$2); // export const lutimes = promisify(fs.lutimes);

const realpath = promisify(realpath$2);
const mkdtemp = promisify(mkdtemp$2);
const writeFile = promisify(writeFile$2);
const appendFile = promisify(appendFile$2);
const readFile = promisify(readFile$2);
const watch = promisify(watch$2);
var promises = {
  open,
  // opendir,
  rename,
  truncate,
  // rm,
  rmdir,
  mkdir,
  readdir,
  readlink,
  symlink,
  lstat,
  stat,
  link,
  unlink,
  chmod,
  // lchmod,
  // lchown,
  chown,
  utimes,
  // lutimes,
  realpath,
  mkdtemp,
  writeFile,
  appendFile,
  readFile,
  watch
};

var promises$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  access: access,
  copyFile: copyFile,
  open: open,
  rename: rename,
  truncate: truncate,
  rmdir: rmdir,
  mkdir: mkdir,
  readdir: readdir,
  readlink: readlink,
  symlink: symlink,
  lstat: lstat,
  stat: stat,
  link: link,
  unlink: unlink,
  chmod: chmod,
  chown: chown,
  utimes: utimes,
  realpath: realpath,
  mkdtemp: mkdtemp,
  writeFile: writeFile,
  appendFile: appendFile,
  readFile: readFile,
  watch: watch,
  'default': promises
});

function writev() {
  notImplemented('fs.writev');
} // @ts-ignore

fs.writev = writev;
fs.promises = promises$1;

var h = /*#__PURE__*/Object.freeze({
  __proto__: null,
  promises: promises$1,
  writev: writev,
  'default': fs,
  access: access$2,
  accessSync: accessSync,
  appendFile: appendFile$2,
  appendFileSync: appendFileSync,
  chmod: chmod$2,
  chmodSync: chmodSync,
  chown: chown$2,
  chownSync: chownSync,
  close: close,
  closeSync: closeSync,
  constants: constants,
  copyFile: copyFile$2,
  copyFileSync: copyFileSync,
  Dir: Dir,
  Dirent: Dirent,
  exists: exists,
  existsSync: existsSync$1,
  fdatasync: fdatasync,
  fdatasyncSync: fdatasyncSync,
  fstat: fstat,
  fstatSync: fstatSync,
  fsync: fsync,
  fsyncSync: fsyncSync,
  ftruncate: ftruncate,
  ftruncateSync: ftruncateSync,
  futimes: futimes,
  futimesSync: futimesSync,
  link: link$2,
  linkSync: linkSync,
  lstat: lstat$2,
  lstatSync: lstatSync,
  mkdir: mkdir$2,
  mkdirSync: mkdirSync,
  mkdtemp: mkdtemp$2,
  mkdtempSync: mkdtempSync,
  open: open$2,
  openSync: openSync,
  readdir: readdir$2,
  readdirSync: readdirSync,
  readFile: readFile$2,
  readFileSync: readFileSync,
  readlink: readlink$2,
  readlinkSync: readlinkSync,
  realpath: realpath$2,
  realpathSync: realpathSync,
  rename: rename$2,
  renameSync: renameSync,
  rmdir: rmdir$2,
  rmdirSync: rmdirSync,
  stat: stat$2,
  statSync: statSync,
  symlink: symlink$2,
  symlinkSync: symlinkSync,
  truncate: truncate$2,
  truncateSync: truncateSync,
  unlink: unlink$2,
  unlinkSync: unlinkSync,
  utimes: utimes$2,
  utimesSync: utimesSync,
  watch: watch$2,
  writeFile: writeFile$2,
  writeFileSync: writeFileSync
});

export { fs as f, h };
