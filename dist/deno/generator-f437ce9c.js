var e$3={};const t$2=/^([~\^])?(0|[1-9]\d*)(?:\.(0|[1-9]\d*))?$/;const r$3=/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([\da-z-]+(?:\.[\da-z-]+)*))?(\+[\da-z-]+)?$/i;e$3.semverRegEx=r$3;e$3.shortSemverRegEx=t$2;const s$2=Symbol("major");const i$3=Symbol("minor");const n$3=Symbol("patch");const h$3=Symbol("pre");const a$3=Symbol("build");const o$3=Symbol("tag");let m$3=/^\d+$/;class Semver{constructor(e){let t=e.match(r$3);if(t){this[s$2]=parseInt(t[1],10);this[i$3]=parseInt(t[2],10);this[n$3]=parseInt(t[3],10);this[h$3]=t[4]&&t[4].split(".");this[a$3]=t[5];}else this[o$3]=e;}get major(){return this[s$2]}get minor(){return this[i$3]}get patch(){return this[n$3]}get pre(){return this[h$3]}get build(){return this[a$3]}get tag(){return this[o$3]}gt(e){return 1===Semver.compare(this,e)}lt(e){return -1===Semver.compare(this,e)}eq(e){e instanceof Semver||(e=new Semver(e));if(this[o$3]&&e[o$3])return this[o$3]===e[o$3];if(this[o$3]||e[o$3])return false;if(this[s$2]!==e[s$2])return false;if(this[i$3]!==e[i$3])return false;if(this[n$3]!==e[n$3])return false;if(void 0===this[h$3]&&void 0===e[h$3])return true;if(void 0===this[h$3]||void 0===e[h$3])return false;if(this[h$3].length!==e[h$3].length)return false;for(let t=0;t<this[h$3].length;t++)if(this[h$3][t]!==e[h$3][t])return false;return this[a$3]===e[a$3]}matches(e,t=false){e instanceof SemverRange||(e=new SemverRange(e));return e.has(this,t)}toString(){return this[o$3]?this[o$3]:this[s$2]+"."+this[i$3]+"."+this[n$3]+(this[h$3]?"-"+this[h$3].join("."):"")+(this[a$3]?this[a$3]:"")}static isValid(e){let t=e.match(r$3);return t&&void 0!==t[2]&&void 0!==t[3]}static compare(e,t){e instanceof Semver||(e=new Semver(e));t instanceof Semver||(t=new Semver(t));return e[o$3]&&t[o$3]?0:e[o$3]?-1:t[o$3]?1:e[s$2]!==t[s$2]?e[s$2]>t[s$2]?1:-1:e[i$3]!==t[i$3]?e[i$3]>t[i$3]?1:-1:e[n$3]!==t[n$3]?e[n$3]>t[n$3]?1:-1:e[h$3]||t[h$3]?e[h$3]?t[h$3]?prereleaseCompare(e[h$3],t[h$3]):-1:1:0}}e$3.Semver=Semver;function prereleaseCompare(e,t){for(let r=0,s=Math.min(e.length,t.length);r<s;r++)if(e[r]!==t[r]){let s=e[r].match(m$3);let i=t[r].match(m$3);return s&&!i?-1:i&&!s?1:s&&i?parseInt(e[r],10)>parseInt(t[r],10)?1:-1:e[r]>t[r]?1:-1}return e.length===t.length?0:e.length>t.length?1:-1}const c$3=0;const u$3=1;const v$2=2;const l$2=3;const S$2=Symbol("type");const g$2=Symbol("version");class SemverRange{constructor(e){if("*"===e||""===e){this[S$2]=c$3;return}let r=e.match(t$2);if(r){r[1]&&(e=e.substr(1));if(void 0===r[3]){this[g$2]=new Semver(e+".0.0");this[S$2]=u$3;}else {this[g$2]=new Semver(e+".0");"^"===r[1]&&"0"!==r[2]?this[S$2]=u$3:this[S$2]=v$2;}this[g$2][h$3]=this[g$2][h$3]||[];}else if(e.startsWith("^^")){this[g$2]=new Semver(e.substr(2));this[S$2]=u$3;}else if("^"===e[0]){this[g$2]=new Semver(e.substr(1));0===this[g$2][s$2]?0===this[g$2][i$3]?this[S$2]=l$2:this[S$2]=v$2:this[S$2]=u$3;}else if("~"===e[0]){this[g$2]=new Semver(e.substr(1));this[S$2]=v$2;}else {this[g$2]=new Semver(e);this[S$2]=l$2;}this[g$2][o$3]&&this[S$2]!==l$2&&(this[S$2]=l$2);}get isExact(){return this[S$2]===l$2}get isExactSemver(){return this[S$2]===l$2&&void 0===this.version[o$3]}get isExactTag(){return this[S$2]===l$2&&void 0!==this.version[o$3]}get isStable(){return this[S$2]===v$2}get isMajor(){return this[S$2]===u$3}get isWildcard(){return this[S$2]===c$3}get type(){switch(this[S$2]){case c$3:return "wildcard";case u$3:return "major";case v$2:return "stable";case l$2:return "exact"}}get version(){return this[g$2]}gt(e){return 1===SemverRange.compare(this,e)}lt(e){return -1===SemverRange.compare(this,e)}eq(e){return 0===SemverRange.compare(this,e)}has(e,t=false){e instanceof Semver||(e=new Semver(e));return this[S$2]===c$3?t||!e[h$3]&&!e[o$3]:this[S$2]===l$2?this[g$2].eq(e):!e[o$3]&&(this[g$2][s$2]===e[s$2]&&(!(this[S$2]===u$3?this[g$2][i$3]>e[i$3]:this[g$2][i$3]!==e[i$3])&&((this[S$2]===u$3&&this[g$2][i$3]!==e[i$3]||!(this[g$2][n$3]>e[n$3]))&&(void 0===e[h$3]||0===e[h$3].length||(void 0===this[g$2][h$3]||0===this[g$2][h$3].length?t:(false!==t||this[g$2][i$3]===e[i$3]&&this[g$2][n$3]===e[n$3])&&1!==prereleaseCompare(this[g$2][h$3],e[h$3]))))))}contains(e){e instanceof SemverRange||(e=new SemverRange(e));return this[S$2]===c$3||e[S$2]!==c$3&&(e[S$2]>=this[S$2]&&this.has(e[g$2],true))}intersect(e){e instanceof SemverRange||(e=new SemverRange(e));if(this[S$2]===c$3&&e[S$2]===c$3)return this;if(this[S$2]===c$3)return e;if(e[S$2]===c$3)return this;if(this[S$2]===l$2)return e.has(this[g$2],true)?this:void 0;if(e[S$2]===l$2)return this.has(e[g$2],true)?e:void 0;let t,r,s;if(e[g$2].gt(this[g$2])){t=e;r=this;s=true;}else {t=this;r=e;s=false;}if(!r.has(t[g$2],true))return;if(r[S$2]===u$3)return s?e:this;let i=new SemverRange(t[g$2].toString());i[S$2]=v$2;return i}bestMatch(e,t=false){let r;e.forEach((e=>{e instanceof Semver||(e=new Semver(e));this.has(e,t)&&(r?1===Semver.compare(e,r)&&(r=e):r=e);}));return r}toString(){let e=this[g$2];switch(this[S$2]){case c$3:return "*";case u$3:return 0===e[s$2]&&0===e[i$3]&&0===e[n$3]?"0":e[h$3]&&0===e[h$3].length&&0===e[n$3]?"^"+e[s$2]+"."+e[i$3]:"^"+e.toString();case v$2:return e[h$3]&&0===e[h$3].length&&0===e[n$3]||0===e[s$2]&&0===e[i$3]?e[s$2]+"."+e[i$3]:"~"+e.toString();case l$2:return e.toString()}}static match(e,t,r=false){t instanceof Semver||(t=new Semver(t));return t.matches(e,r)}static isValid(e){let t=new SemverRange(e);return t[S$2]!==l$2||void 0===t[g$2][o$3]}static compare(e,t){e instanceof SemverRange||(e=new SemverRange(e));t instanceof SemverRange||(t=new SemverRange(t));if(e[S$2]===c$3&&t[S$2]===c$3)return 0;if(e[S$2]===c$3)return 1;if(t[S$2]===c$3)return -1;let r=Semver.compare(e[g$2],t[g$2]);return 0!==r?r:e[S$2]===t[S$2]?0:e[S$2]>t[S$2]?1:-1}}e$3.SemverRange=SemverRange;const R$2=e$3.SemverRange;

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
// A module to print ANSI terminal colors. Inspired by chalk, kleur, and colors
// on npm.
//

/**
 * ```ts
 * import { bgBlue, red, bold } from "https://deno.land/std@$STD_VERSION/fmt/colors.ts";
 * console.log(bgBlue(red(bold("Hello world!"))));
 * ```
 *
 * This module supports `NO_COLOR` environmental variable disabling any coloring
 * if `NO_COLOR` is set.
 *
 * @module
 */
// This module is browser compatible.
// deno-lint-ignore no-explicit-any
const {
  Deno: Deno$1
} = globalThis;
const noColor = typeof Deno$1?.noColor === "boolean" ? Deno$1.noColor : true;
let enabled = !noColor;
/**
 * Builds color code
 * @param open
 * @param close
 */

function code(open, close) {
  return {
    open: `\x1b[${open.join(";")}m`,
    close: `\x1b[${close}m`,
    regexp: new RegExp(`\\x1b\\[${close}m`, "g")
  };
}
/**
 * Applies color and background based on color code and its associated text
 * @param str text to apply color settings to
 * @param code color code to apply
 */


function run(str, code) {
  return enabled ? `${code.open}${str.replace(code.regexp, code.open)}${code.close}` : str;
}
/**
 * Make the text bold.
 * @param str text to make bold
 */

function bold(str) {
  return run(str, code([1], 22));
}
/**
 * Set text color to red.
 * @param str text to make red
 */

function red(str) {
  return run(str, code([31], 39));
}
/**
 * Set text color to green.
 * @param str text to make green
 */

function green(str) {
  return run(str, code([32], 39));
}
/**
 * Set text color to white.
 * @param str text to make white
 */

function white(str) {
  return run(str, code([37], 39));
}
/**
 * Set text color to gray.
 * @param str text to make gray
 */

function gray(str) {
  return brightBlack(str);
}
/**
 * Set text color to bright black.
 * @param str text to make bright-black
 */

function brightBlack(str) {
  return run(str, code([90], 39));
}
/**
 * Set background color to red.
 * @param str text to make its background red
 */

function bgRed(str) {
  return run(str, code([41], 49));
}
/**
 * Set background color to green.
 * @param str text to make its background green
 */

function bgGreen(str) {
  return run(str, code([42], 49));
}

const ANSI_PATTERN = new RegExp(["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|"), "g");
/**
 * Remove ANSI escape codes from the string.
 * @param string to remove ANSI escape codes from
 */

function stripColor(string) {
  return string.replace(ANSI_PATTERN, "");
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
let DiffType;

(function (DiffType) {
  DiffType["removed"] = "removed";
  DiffType["common"] = "common";
  DiffType["added"] = "added";
})(DiffType || (DiffType = {}));

const REMOVED = 1;
const COMMON = 2;
const ADDED = 3;

function createCommon(A, B, reverse) {
  const common = [];
  if (A.length === 0 || B.length === 0) return [];

  for (let i = 0; i < Math.min(A.length, B.length); i += 1) {
    if (A[reverse ? A.length - i - 1 : i] === B[reverse ? B.length - i - 1 : i]) {
      common.push(A[reverse ? A.length - i - 1 : i]);
    } else {
      return common;
    }
  }

  return common;
}
/**
 * Renders the differences between the actual and expected values
 * @param A Actual value
 * @param B Expected value
 */


function diff$1(A, B) {
  const prefixCommon = createCommon(A, B);
  const suffixCommon = createCommon(A.slice(prefixCommon.length), B.slice(prefixCommon.length), true).reverse();
  A = suffixCommon.length ? A.slice(prefixCommon.length, -suffixCommon.length) : A.slice(prefixCommon.length);
  B = suffixCommon.length ? B.slice(prefixCommon.length, -suffixCommon.length) : B.slice(prefixCommon.length);
  const swapped = B.length > A.length;
  [A, B] = swapped ? [B, A] : [A, B];
  const M = A.length;
  const N = B.length;
  if (!M && !N && !suffixCommon.length && !prefixCommon.length) return [];

  if (!N) {
    return [...prefixCommon.map(c => ({
      type: DiffType.common,
      value: c
    })), ...A.map(a => ({
      type: swapped ? DiffType.added : DiffType.removed,
      value: a
    })), ...suffixCommon.map(c => ({
      type: DiffType.common,
      value: c
    }))];
  }

  const offset = N;
  const delta = M - N;
  const size = M + N + 1;
  const fp = new Array(size).fill({
    y: -1
  });
  /**
   * INFO:
   * This buffer is used to save memory and improve performance.
   * The first half is used to save route and last half is used to save diff
   * type.
   * This is because, when I kept new uint8array area to save type,performance
   * worsened.
   */

  const routes = new Uint32Array((M * N + size + 1) * 2);
  const diffTypesPtrOffset = routes.length / 2;
  let ptr = 0;
  let p = -1;

  function backTrace(A, B, current, swapped) {
    const M = A.length;
    const N = B.length;
    const result = [];
    let a = M - 1;
    let b = N - 1;
    let j = routes[current.id];
    let type = routes[current.id + diffTypesPtrOffset];

    while (true) {
      if (!j && !type) break;
      const prev = j;

      if (type === REMOVED) {
        result.unshift({
          type: swapped ? DiffType.removed : DiffType.added,
          value: B[b]
        });
        b -= 1;
      } else if (type === ADDED) {
        result.unshift({
          type: swapped ? DiffType.added : DiffType.removed,
          value: A[a]
        });
        a -= 1;
      } else {
        result.unshift({
          type: DiffType.common,
          value: A[a]
        });
        a -= 1;
        b -= 1;
      }

      j = routes[prev];
      type = routes[prev + diffTypesPtrOffset];
    }

    return result;
  }

  function createFP(slide, down, k, M) {
    if (slide && slide.y === -1 && down && down.y === -1) {
      return {
        y: 0,
        id: 0
      };
    }

    if (down && down.y === -1 || k === M || (slide && slide.y) > (down && down.y) + 1) {
      const prev = slide.id;
      ptr++;
      routes[ptr] = prev;
      routes[ptr + diffTypesPtrOffset] = ADDED;
      return {
        y: slide.y,
        id: ptr
      };
    } else {
      const prev = down.id;
      ptr++;
      routes[ptr] = prev;
      routes[ptr + diffTypesPtrOffset] = REMOVED;
      return {
        y: down.y + 1,
        id: ptr
      };
    }
  }

  function snake(k, slide, down, _offset, A, B) {
    const M = A.length;
    const N = B.length;
    if (k < -N || M < k) return {
      y: -1,
      id: -1
    };
    const fp = createFP(slide, down, k, M);

    while (fp.y + k < M && fp.y < N && A[fp.y + k] === B[fp.y]) {
      const prev = fp.id;
      ptr++;
      fp.id = ptr;
      fp.y += 1;
      routes[ptr] = prev;
      routes[ptr + diffTypesPtrOffset] = COMMON;
    }

    return fp;
  }

  while (fp[delta + offset].y < N) {
    p = p + 1;

    for (let k = -p; k < delta; ++k) {
      fp[k + offset] = snake(k, fp[k - 1 + offset], fp[k + 1 + offset], offset, A, B);
    }

    for (let k = delta + p; k > delta; --k) {
      fp[k + offset] = snake(k, fp[k - 1 + offset], fp[k + 1 + offset], offset, A, B);
    }

    fp[delta + offset] = snake(delta, fp[delta - 1 + offset], fp[delta + 1 + offset], offset, A, B);
  }

  return [...prefixCommon.map(c => ({
    type: DiffType.common,
    value: c
  })), ...backTrace(A, B, fp[delta + offset], swapped), ...suffixCommon.map(c => ({
    type: DiffType.common,
    value: c
  }))];
}
/**
 * Renders the differences between the actual and expected strings
 * Partially inspired from https://github.com/kpdecker/jsdiff
 * @param A Actual string
 * @param B Expected string
 */

function diffstr(A, B) {
  function tokenize(string, {
    wordDiff = false
  } = {}) {
    if (wordDiff) {
      // Split string on whitespace symbols
      const tokens = string.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/); // Extended Latin character set

      const words = /^[a-zA-Z\u{C0}-\u{FF}\u{D8}-\u{F6}\u{F8}-\u{2C6}\u{2C8}-\u{2D7}\u{2DE}-\u{2FF}\u{1E00}-\u{1EFF}]+$/u; // Join boundary splits that we do not consider to be boundaries and merge empty strings surrounded by word chars

      for (let i = 0; i < tokens.length - 1; i++) {
        if (!tokens[i + 1] && tokens[i + 2] && words.test(tokens[i]) && words.test(tokens[i + 2])) {
          tokens[i] += tokens[i + 2];
          tokens.splice(i + 1, 2);
          i--;
        }
      }

      return tokens.filter(token => token);
    } else {
      // Split string on new lines symbols
      const tokens = [],
            lines = string.split(/(\n|\r\n)/); // Ignore final empty token when text ends with a newline

      if (!lines[lines.length - 1]) {
        lines.pop();
      } // Merge the content and line separators into single tokens


      for (let i = 0; i < lines.length; i++) {
        if (i % 2) {
          tokens[tokens.length - 1] += lines[i];
        } else {
          tokens.push(lines[i]);
        }
      }

      return tokens;
    }
  } // Create details by filtering relevant word-diff for current line
  // and merge "space-diff" if surrounded by word-diff for cleaner displays


  function createDetails(line, tokens) {
    return tokens.filter(({
      type
    }) => type === line.type || type === DiffType.common).map((result, i, t) => {
      if (result.type === DiffType.common && t[i - 1] && t[i - 1]?.type === t[i + 1]?.type && /\s+/.test(result.value)) {
        result.type = t[i - 1].type;
      }

      return result;
    });
  } // Compute multi-line diff


  const diffResult = diff$1(tokenize(`${A}\n`), tokenize(`${B}\n`));
  const added = [],
        removed = [];

  for (const result of diffResult) {
    if (result.type === DiffType.added) {
      added.push(result);
    }

    if (result.type === DiffType.removed) {
      removed.push(result);
    }
  } // Compute word-diff


  const aLines = added.length < removed.length ? added : removed;
  const bLines = aLines === removed ? added : removed;

  for (const a of aLines) {
    let tokens = [],
        b; // Search another diff line with at least one common token

    while (bLines.length) {
      b = bLines.shift();
      tokens = diff$1(tokenize(a.value, {
        wordDiff: true
      }), tokenize(b?.value ?? "", {
        wordDiff: true
      }));

      if (tokens.some(({
        type,
        value
      }) => type === DiffType.common && value.trim().length)) {
        break;
      }
    } // Register word-diff details


    a.details = createDetails(a, tokens);

    if (b) {
      b.details = createDetails(b, tokens);
    }
  }

  return diffResult;
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
const CAN_NOT_DISPLAY = "[Cannot display]";
class AssertionError extends Error {
  name = "AssertionError";

  constructor(message) {
    super(message);
  }

}
/**
 * Converts the input into a string. Objects, Sets and Maps are sorted so as to
 * make tests less flaky
 * @param v Value to be formatted
 */

function _format$1(v) {
  // deno-lint-ignore no-explicit-any
  const {
    Deno
  } = globalThis;
  return typeof Deno?.inspect === "function" ? Deno.inspect(v, {
    depth: Infinity,
    sorted: true,
    trailingComma: true,
    compact: false,
    iterableLimit: Infinity
  }) : `"${String(v).replace(/(?=["\\])/g, "\\")}"`;
}
/**
 * Colors the output of assertion diffs
 * @param diffType Difference type, either added or removed
 */

function createColor(diffType, {
  background = false
} = {}) {
  switch (diffType) {
    case DiffType.added:
      return s => background ? bgGreen(white(s)) : green(bold(s));

    case DiffType.removed:
      return s => background ? bgRed(white(s)) : red(bold(s));

    default:
      return white;
  }
}
/**
 * Prefixes `+` or `-` in diff output
 * @param diffType Difference type, either added or removed
 */


function createSign(diffType) {
  switch (diffType) {
    case DiffType.added:
      return "+   ";

    case DiffType.removed:
      return "-   ";

    default:
      return "    ";
  }
}

function buildMessage(diffResult, {
  stringDiff = false
} = {}) {
  const messages = [],
        diffMessages = [];
  messages.push("");
  messages.push("");
  messages.push(`    ${gray(bold("[Diff]"))} ${red(bold("Actual"))} / ${green(bold("Expected"))}`);
  messages.push("");
  messages.push("");
  diffResult.forEach(result => {
    const c = createColor(result.type);
    const line = result.details?.map(detail => detail.type !== DiffType.common ? createColor(detail.type, {
      background: true
    })(detail.value) : detail.value).join("") ?? result.value;
    diffMessages.push(c(`${createSign(result.type)}${line}`));
  });
  messages.push(...(stringDiff ? [diffMessages.join("")] : diffMessages));
  messages.push("");
  return messages;
}

function isKeyedCollection(x) {
  return [Symbol.iterator, "size"].every(k => k in x);
}
/**
 * Deep equality comparison used in assertions
 * @param c actual value
 * @param d expected value
 */


function equal(c, d) {
  const seen = new Map();
  return function compare(a, b) {
    // Have to render RegExp & Date for string comparison
    // unless it's mistreated as object
    if (a && b && (a instanceof RegExp && b instanceof RegExp || a instanceof URL && b instanceof URL)) {
      return String(a) === String(b);
    }

    if (a instanceof Date && b instanceof Date) {
      const aTime = a.getTime();
      const bTime = b.getTime(); // Check for NaN equality manually since NaN is not
      // equal to itself.

      if (Number.isNaN(aTime) && Number.isNaN(bTime)) {
        return true;
      }

      return a.getTime() === b.getTime();
    }

    if (Object.is(a, b)) {
      return true;
    }

    if (a && typeof a === "object" && b && typeof b === "object") {
      if (a && b && !constructorsEqual(a, b)) {
        return false;
      }

      if (a instanceof WeakMap || b instanceof WeakMap) {
        if (!(a instanceof WeakMap && b instanceof WeakMap)) return false;
        throw new TypeError("cannot compare WeakMap instances");
      }

      if (a instanceof WeakSet || b instanceof WeakSet) {
        if (!(a instanceof WeakSet && b instanceof WeakSet)) return false;
        throw new TypeError("cannot compare WeakSet instances");
      }

      if (seen.get(a) === b) {
        return true;
      }

      if (Object.keys(a || {}).length !== Object.keys(b || {}).length) {
        return false;
      }

      if (isKeyedCollection(a) && isKeyedCollection(b)) {
        if (a.size !== b.size) {
          return false;
        }

        let unmatchedEntries = a.size;

        for (const [aKey, aValue] of a.entries()) {
          for (const [bKey, bValue] of b.entries()) {
            /* Given that Map keys can be references, we need
             * to ensure that they are also deeply equal */
            if (aKey === aValue && bKey === bValue && compare(aKey, bKey) || compare(aKey, bKey) && compare(aValue, bValue)) {
              unmatchedEntries--;
            }
          }
        }

        return unmatchedEntries === 0;
      }

      const merged = { ...a,
        ...b
      };

      for (const key of [...Object.getOwnPropertyNames(merged), ...Object.getOwnPropertySymbols(merged)]) {
        if (!compare(a && a[key], b && b[key])) {
          return false;
        }

        if (key in a && !(key in b) || key in b && !(key in a)) {
          return false;
        }
      }

      seen.set(a, b);

      if (a instanceof WeakRef || b instanceof WeakRef) {
        if (!(a instanceof WeakRef && b instanceof WeakRef)) return false;
        return compare(a.deref(), b.deref());
      }

      return true;
    }

    return false;
  }(c, d);
} // deno-lint-ignore ban-types

function constructorsEqual(a, b) {
  return a.constructor === b.constructor || a.constructor === Object && !b.constructor || !a.constructor && b.constructor === Object;
}
/** Make an assertion, error will be thrown if `expr` does not have truthy value. */


function assert$1(expr, msg = "") {
  if (!expr) {
    throw new AssertionError(msg);
  }
}
/**
 * Make an assertion that `actual` and `expected` are equal, deeply. If not
 * deeply equal, then throw.
 *
 * Type parameter can be specified to ensure values under comparison have the same type.
 * For example:
 * ```ts
 * import { assertEquals } from "./asserts.ts";
 *
 * assertEquals<number>(1, 2)
 * ```
 */

function assertEquals(actual, expected, msg) {
  if (equal(actual, expected)) {
    return;
  }

  let message = "";

  const actualString = _format$1(actual);

  const expectedString = _format$1(expected);

  try {
    const stringDiff = typeof actual === "string" && typeof expected === "string";
    const diffResult = stringDiff ? diffstr(actual, expected) : diff$1(actualString.split("\n"), expectedString.split("\n"));
    const diffMsg = buildMessage(diffResult, {
      stringDiff
    }).join("\n");
    message = `Values are not equal:\n${diffMsg}`;
  } catch {
    message = `\n${red(CAN_NOT_DISPLAY)} + \n\n`;
  }

  if (msg) {
    message = msg;
  }

  throw new AssertionError(message);
}
/**
 * Make an assertion that `actual` and `expected` are not equal, deeply.
 * If not then throw.
 *
 * Type parameter can be specified to ensure values under comparison have the same type.
 * For example:
 * ```ts
 * import { assertNotEquals } from "./asserts.ts";
 *
 * assertNotEquals<number>(1, 2)
 * ```
 */

function assertNotEquals(actual, expected, msg) {
  if (!equal(actual, expected)) {
    return;
  }

  let actualString;
  let expectedString;

  try {
    actualString = String(actual);
  } catch {
    actualString = "[Cannot display]";
  }

  try {
    expectedString = String(expected);
  } catch {
    expectedString = "[Cannot display]";
  }

  if (!msg) {
    msg = `actual: ${actualString} expected: ${expectedString}`;
  }

  throw new AssertionError(msg);
}
/**
 * Make an assertion that `actual` and `expected` are strictly equal. If
 * not then throw.
 *
 * ```ts
 * import { assertStrictEquals } from "./asserts.ts";
 *
 * assertStrictEquals(1, 2)
 * ```
 */

function assertStrictEquals(actual, expected, msg) {
  if (actual === expected) {
    return;
  }

  let message;

  if (msg) {
    message = msg;
  } else {
    const actualString = _format$1(actual);

    const expectedString = _format$1(expected);

    if (actualString === expectedString) {
      const withOffset = actualString.split("\n").map(l => `    ${l}`).join("\n");
      message = `Values have the same structure but are not reference-equal:\n\n${red(withOffset)}\n`;
    } else {
      try {
        const stringDiff = typeof actual === "string" && typeof expected === "string";
        const diffResult = stringDiff ? diffstr(actual, expected) : diff$1(actualString.split("\n"), expectedString.split("\n"));
        const diffMsg = buildMessage(diffResult, {
          stringDiff
        }).join("\n");
        message = `Values are not strictly equal:\n${diffMsg}`;
      } catch {
        message = `\n${red(CAN_NOT_DISPLAY)} + \n\n`;
      }
    }
  }

  throw new AssertionError(message);
}
/**
 * Make an assertion that `actual` and `expected` are not strictly equal.
 * If the values are strictly equal then throw.
 *
 * ```ts
 * import { assertNotStrictEquals } from "./asserts.ts";
 *
 * assertNotStrictEquals(1, 1)
 * ```
 */

function assertNotStrictEquals(actual, expected, msg) {
  if (actual !== expected) {
    return;
  }

  throw new AssertionError(msg ?? `Expected "actual" to be strictly unequal to: ${_format$1(actual)}\n`);
}
/**
 * Make an assertion that `actual` match RegExp `expected`. If not
 * then throw.
 */

function assertMatch(actual, expected, msg) {
  if (!expected.test(actual)) {
    if (!msg) {
      msg = `actual: "${actual}" expected to match: "${expected}"`;
    }

    throw new AssertionError(msg);
  }
}
/**
 * Make an assertion that `actual` not match RegExp `expected`. If match
 * then throw.
 */

function assertNotMatch(actual, expected, msg) {
  if (expected.test(actual)) {
    if (!msg) {
      msg = `actual: "${actual}" expected to not match: "${expected}"`;
    }

    throw new AssertionError(msg);
  }
}
/** Use this to assert unreachable code. */

function unreachable() {
  throw new AssertionError("unreachable");
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
class DenoStdInternalError extends Error {
  constructor(message) {
    super(message);
    this.name = "DenoStdInternalError";
  }

}
/** Make an assertion, if not `true`, then throw. */

function assert(expr, msg = "") {
  if (!expr) {
    throw new DenoStdInternalError(msg);
  }
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
function notImplemented(msg) {
  const message = msg ? `Not implemented: ${msg}` : "Not implemented";
  throw new Error(message);
}
function intoCallbackAPIWithIntercept( // deno-lint-ignore no-explicit-any
func, interceptor, cb, // deno-lint-ignore no-explicit-any
...args) {
  func(...args).then(value => cb && cb(null, interceptor(value)), err => cb && cb(err));
}
// Return undefined if there is no match.
// Move the "slow cases" to a separate function to make sure this function gets
// inlined properly. That prioritizes the common case.

function normalizeEncoding$1(enc) {
  if (enc == null || enc === "utf8" || enc === "utf-8") return "utf8";
  return slowCases(enc);
} // https://github.com/nodejs/node/blob/ba684805b6c0eded76e5cd89ee00328ac7a59365/lib/internal/util.js#L130

function slowCases(enc) {
  switch (enc.length) {
    case 4:
      if (enc === "UTF8") return "utf8";
      if (enc === "ucs2" || enc === "UCS2") return "utf16le";
      enc = `${enc}`.toLowerCase();
      if (enc === "utf8") return "utf8";
      if (enc === "ucs2") return "utf16le";
      break;

    case 3:
      if (enc === "hex" || enc === "HEX" || `${enc}`.toLowerCase() === "hex") {
        return "hex";
      }

      break;

    case 5:
      if (enc === "ascii") return "ascii";
      if (enc === "ucs-2") return "utf16le";
      if (enc === "UTF-8") return "utf8";
      if (enc === "ASCII") return "ascii";
      if (enc === "UCS-2") return "utf16le";
      enc = `${enc}`.toLowerCase();
      if (enc === "utf-8") return "utf8";
      if (enc === "ascii") return "ascii";
      if (enc === "ucs-2") return "utf16le";
      break;

    case 6:
      if (enc === "base64") return "base64";
      if (enc === "latin1" || enc === "binary") return "latin1";
      if (enc === "BASE64") return "base64";
      if (enc === "LATIN1" || enc === "BINARY") return "latin1";
      enc = `${enc}`.toLowerCase();
      if (enc === "base64") return "base64";
      if (enc === "latin1" || enc === "binary") return "latin1";
      break;

    case 7:
      if (enc === "utf16le" || enc === "UTF16LE" || `${enc}`.toLowerCase() === "utf16le") {
        return "utf16le";
      }

      break;

    case 8:
      if (enc === "utf-16le" || enc === "UTF-16LE" || `${enc}`.toLowerCase() === "utf-16le") {
        return "utf16le";
      }

      break;

    default:
      if (enc === "") return "utf8";
  }
}
function once$1(callback) {
  let called = false;
  return function (...args) {
    if (called) return;
    called = true;
    callback.apply(this, args);
  };
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
//
// Adapted from Node.js. Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// Hack: work around the following TypeScript error:
//   error: TS2345 [ERROR]: Argument of type 'typeof kCustomPromisifiedSymbol'
//   is not assignable to parameter of type 'typeof kCustomPromisifiedSymbol'.
//        assertStrictEquals(kCustomPromisifiedSymbol, promisify.custom);
//                                                     ~~~~~~~~~~~~~~~~
// End hack.
// In addition to being accessible through util.promisify.custom,
// this symbol is registered globally and can be accessed in any environment as
// Symbol.for('nodejs.util.promisify.custom').
const kCustomPromisifiedSymbol = Symbol.for("nodejs.util.promisify.custom"); // This is an internal Node symbol used by functions returning multiple
// arguments, e.g. ['bytesRead', 'buffer'] for fs.read().

const kCustomPromisifyArgsSymbol = Symbol.for("nodejs.util.promisify.customArgs");

class NodeInvalidArgTypeError extends TypeError {
  code = "ERR_INVALID_ARG_TYPE";

  constructor(argumentName, type, received) {
    super(`The "${argumentName}" argument must be of type ${type}. Received ${typeof received}`);
  }

}

function promisify( // deno-lint-ignore no-explicit-any
original // deno-lint-ignore no-explicit-any
) {
  if (typeof original !== "function") {
    throw new NodeInvalidArgTypeError("original", "Function", original);
  } // deno-lint-ignore no-explicit-any


  if (original[kCustomPromisifiedSymbol]) {
    // deno-lint-ignore no-explicit-any
    const fn = original[kCustomPromisifiedSymbol];

    if (typeof fn !== "function") {
      throw new NodeInvalidArgTypeError("util.promisify.custom", "Function", fn);
    }

    return Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn,
      enumerable: false,
      writable: false,
      configurable: true
    });
  } // Names to create an object from in case the callback receives multiple
  // arguments, e.g. ['bytesRead', 'buffer'] for fs.read.
  // deno-lint-ignore no-explicit-any


  const argumentNames = original[kCustomPromisifyArgsSymbol]; // deno-lint-ignore no-explicit-any

  function fn(...args) {
    return new Promise((resolve, reject) => {
      original.call(this, ...args, (err, ...values) => {
        if (err) {
          return reject(err);
        }

        if (argumentNames !== undefined && values.length > 1) {
          const obj = {};

          for (let i = 0; i < argumentNames.length; i++) {
            // deno-lint-ignore no-explicit-any
            obj[argumentNames[i]] = values[i];
          }

          resolve(obj);
        } else {
          resolve(values[0]);
        }
      });
    });
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
  Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn,
    enumerable: false,
    writable: false,
    configurable: true
  });
  return Object.defineProperties(fn, Object.getOwnPropertyDescriptors(original));
}
promisify.custom = kCustomPromisifiedSymbol;

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
//
// Adapted from Node.js. Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
const _toString = Object.prototype.toString;

const _isObjectLike = value => value !== null && typeof value === "object";
function isUint8Array(value) {
  return _isObjectLike(value) && _toString.call(value) === "[object Uint8Array]";
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
const NumberIsSafeInteger = Number.isSafeInteger;
const DEFAULT_INSPECT_OPTIONS = {
  showHidden: false,
  depth: 2,
  colors: false,
  customInspect: true,
  showProxy: false,
  maxArrayLength: 100,
  maxStringLength: Infinity,
  breakLength: 80,
  compact: 3,
  sorted: false,
  getters: false
};
inspect.defaultOptions = DEFAULT_INSPECT_OPTIONS;
inspect.custom = Symbol.for("nodejs.util.inspect.custom"); // TODO(schwarzkopfb): make it in-line with Node's implementation
// Ref: https://nodejs.org/dist/latest-v14.x/docs/api/util.html#util_util_inspect_object_options
// deno-lint-ignore no-explicit-any

function inspect(object, ...opts) {
  // In Node.js, strings should be enclosed in single quotes.
  // TODO(uki00a): Strings in objects and arrays should also be enclosed in single quotes.
  if (typeof object === "string" && !object.includes("'")) {
    return `'${object}'`;
  }

  opts = { ...DEFAULT_INSPECT_OPTIONS,
    ...opts
  };
  return Deno.inspect(object, {
    depth: opts.depth,
    iterableLimit: opts.maxArrayLength,
    compact: !!opts.compact,
    sorted: !!opts.sorted,
    showProxy: !!opts.showProxy
  });
}
/**
 * Returns a system error name from an error code number.
 * @param code error code number
 */

function getSystemErrorName(code) {
  if (typeof code !== "number") {
    throw new ERR_INVALID_ARG_TYPE("err", "number", code);
  }

  if (code >= 0 || !NumberIsSafeInteger(code)) {
    throw new ERR_OUT_OF_RANGE("err", "a negative integer", code);
  }

  return errorMap.get(code)?.[0];
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
const osType = (() => {
  // deno-lint-ignore no-explicit-any
  const {
    Deno
  } = globalThis;

  if (typeof Deno?.build?.os === "string") {
    return Deno.build.os;
  } // deno-lint-ignore no-explicit-any


  const {
    navigator
  } = globalThis;

  if (navigator?.appVersion?.includes?.("Win") ?? false) {
    return "windows";
  }

  return "linux";
})();
const isWindows = osType === "windows";

// Copyright Joyent, Inc. and other Node contributors.
// Ref: https://github.com/libuv/libuv/blob/v1.x/include/uv/errno.h
// Ref: https://github.com/nodejs/node/blob/524123fbf064ff64bb6fcd83485cfc27db932f68/lib/internal/errors.js#L383
// Since there is no easy way to port code from libuv and these maps are
// changing very rarely, we simply extract them from Node and store here.
// Note
// Run the following to get the map:
// $ node -e "console.log(process.binding('uv').getErrorMap())"
// This setup automatically exports maps from both "win", "linux" & darwin:
// https://github.com/schwarzkopfb/node_errno_map

const codeToErrorWindows = [[-4093, ["E2BIG", "argument list too long"]], [-4092, ["EACCES", "permission denied"]], [-4091, ["EADDRINUSE", "address already in use"]], [-4090, ["EADDRNOTAVAIL", "address not available"]], [-4089, ["EAFNOSUPPORT", "address family not supported"]], [-4088, ["EAGAIN", "resource temporarily unavailable"]], [-3000, ["EAI_ADDRFAMILY", "address family not supported"]], [-3001, ["EAI_AGAIN", "temporary failure"]], [-3002, ["EAI_BADFLAGS", "bad ai_flags value"]], [-3013, ["EAI_BADHINTS", "invalid value for hints"]], [-3003, ["EAI_CANCELED", "request canceled"]], [-3004, ["EAI_FAIL", "permanent failure"]], [-3005, ["EAI_FAMILY", "ai_family not supported"]], [-3006, ["EAI_MEMORY", "out of memory"]], [-3007, ["EAI_NODATA", "no address"]], [-3008, ["EAI_NONAME", "unknown node or service"]], [-3009, ["EAI_OVERFLOW", "argument buffer overflow"]], [-3014, ["EAI_PROTOCOL", "resolved protocol is unknown"]], [-3010, ["EAI_SERVICE", "service not available for socket type"]], [-3011, ["EAI_SOCKTYPE", "socket type not supported"]], [-4084, ["EALREADY", "connection already in progress"]], [-4083, ["EBADF", "bad file descriptor"]], [-4082, ["EBUSY", "resource busy or locked"]], [-4081, ["ECANCELED", "operation canceled"]], [-4080, ["ECHARSET", "invalid Unicode character"]], [-4079, ["ECONNABORTED", "software caused connection abort"]], [-4078, ["ECONNREFUSED", "connection refused"]], [-4077, ["ECONNRESET", "connection reset by peer"]], [-4076, ["EDESTADDRREQ", "destination address required"]], [-4075, ["EEXIST", "file already exists"]], [-4074, ["EFAULT", "bad address in system call argument"]], [-4036, ["EFBIG", "file too large"]], [-4073, ["EHOSTUNREACH", "host is unreachable"]], [-4072, ["EINTR", "interrupted system call"]], [-4071, ["EINVAL", "invalid argument"]], [-4070, ["EIO", "i/o error"]], [-4069, ["EISCONN", "socket is already connected"]], [-4068, ["EISDIR", "illegal operation on a directory"]], [-4067, ["ELOOP", "too many symbolic links encountered"]], [-4066, ["EMFILE", "too many open files"]], [-4065, ["EMSGSIZE", "message too long"]], [-4064, ["ENAMETOOLONG", "name too long"]], [-4063, ["ENETDOWN", "network is down"]], [-4062, ["ENETUNREACH", "network is unreachable"]], [-4061, ["ENFILE", "file table overflow"]], [-4060, ["ENOBUFS", "no buffer space available"]], [-4059, ["ENODEV", "no such device"]], [-4058, ["ENOENT", "no such file or directory"]], [-4057, ["ENOMEM", "not enough memory"]], [-4056, ["ENONET", "machine is not on the network"]], [-4035, ["ENOPROTOOPT", "protocol not available"]], [-4055, ["ENOSPC", "no space left on device"]], [-4054, ["ENOSYS", "function not implemented"]], [-4053, ["ENOTCONN", "socket is not connected"]], [-4052, ["ENOTDIR", "not a directory"]], [-4051, ["ENOTEMPTY", "directory not empty"]], [-4050, ["ENOTSOCK", "socket operation on non-socket"]], [-4049, ["ENOTSUP", "operation not supported on socket"]], [-4048, ["EPERM", "operation not permitted"]], [-4047, ["EPIPE", "broken pipe"]], [-4046, ["EPROTO", "protocol error"]], [-4045, ["EPROTONOSUPPORT", "protocol not supported"]], [-4044, ["EPROTOTYPE", "protocol wrong type for socket"]], [-4034, ["ERANGE", "result too large"]], [-4043, ["EROFS", "read-only file system"]], [-4042, ["ESHUTDOWN", "cannot send after transport endpoint shutdown"]], [-4041, ["ESPIPE", "invalid seek"]], [-4040, ["ESRCH", "no such process"]], [-4039, ["ETIMEDOUT", "connection timed out"]], [-4038, ["ETXTBSY", "text file is busy"]], [-4037, ["EXDEV", "cross-device link not permitted"]], [-4094, ["UNKNOWN", "unknown error"]], [-4095, ["EOF", "end of file"]], [-4033, ["ENXIO", "no such device or address"]], [-4032, ["EMLINK", "too many links"]], [-4031, ["EHOSTDOWN", "host is down"]], [-4030, ["EREMOTEIO", "remote I/O error"]], [-4029, ["ENOTTY", "inappropriate ioctl for device"]], [-4028, ["EFTYPE", "inappropriate file type or format"]], [-4027, ["EILSEQ", "illegal byte sequence"]]];
const errorToCodeWindows = codeToErrorWindows.map(([status, [error]]) => [error, status]);
const codeToErrorDarwin = [[-7, ["E2BIG", "argument list too long"]], [-13, ["EACCES", "permission denied"]], [-48, ["EADDRINUSE", "address already in use"]], [-49, ["EADDRNOTAVAIL", "address not available"]], [-47, ["EAFNOSUPPORT", "address family not supported"]], [-35, ["EAGAIN", "resource temporarily unavailable"]], [-3000, ["EAI_ADDRFAMILY", "address family not supported"]], [-3001, ["EAI_AGAIN", "temporary failure"]], [-3002, ["EAI_BADFLAGS", "bad ai_flags value"]], [-3013, ["EAI_BADHINTS", "invalid value for hints"]], [-3003, ["EAI_CANCELED", "request canceled"]], [-3004, ["EAI_FAIL", "permanent failure"]], [-3005, ["EAI_FAMILY", "ai_family not supported"]], [-3006, ["EAI_MEMORY", "out of memory"]], [-3007, ["EAI_NODATA", "no address"]], [-3008, ["EAI_NONAME", "unknown node or service"]], [-3009, ["EAI_OVERFLOW", "argument buffer overflow"]], [-3014, ["EAI_PROTOCOL", "resolved protocol is unknown"]], [-3010, ["EAI_SERVICE", "service not available for socket type"]], [-3011, ["EAI_SOCKTYPE", "socket type not supported"]], [-37, ["EALREADY", "connection already in progress"]], [-9, ["EBADF", "bad file descriptor"]], [-16, ["EBUSY", "resource busy or locked"]], [-89, ["ECANCELED", "operation canceled"]], [-4080, ["ECHARSET", "invalid Unicode character"]], [-53, ["ECONNABORTED", "software caused connection abort"]], [-61, ["ECONNREFUSED", "connection refused"]], [-54, ["ECONNRESET", "connection reset by peer"]], [-39, ["EDESTADDRREQ", "destination address required"]], [-17, ["EEXIST", "file already exists"]], [-14, ["EFAULT", "bad address in system call argument"]], [-27, ["EFBIG", "file too large"]], [-65, ["EHOSTUNREACH", "host is unreachable"]], [-4, ["EINTR", "interrupted system call"]], [-22, ["EINVAL", "invalid argument"]], [-5, ["EIO", "i/o error"]], [-56, ["EISCONN", "socket is already connected"]], [-21, ["EISDIR", "illegal operation on a directory"]], [-62, ["ELOOP", "too many symbolic links encountered"]], [-24, ["EMFILE", "too many open files"]], [-40, ["EMSGSIZE", "message too long"]], [-63, ["ENAMETOOLONG", "name too long"]], [-50, ["ENETDOWN", "network is down"]], [-51, ["ENETUNREACH", "network is unreachable"]], [-23, ["ENFILE", "file table overflow"]], [-55, ["ENOBUFS", "no buffer space available"]], [-19, ["ENODEV", "no such device"]], [-2, ["ENOENT", "no such file or directory"]], [-12, ["ENOMEM", "not enough memory"]], [-4056, ["ENONET", "machine is not on the network"]], [-42, ["ENOPROTOOPT", "protocol not available"]], [-28, ["ENOSPC", "no space left on device"]], [-78, ["ENOSYS", "function not implemented"]], [-57, ["ENOTCONN", "socket is not connected"]], [-20, ["ENOTDIR", "not a directory"]], [-66, ["ENOTEMPTY", "directory not empty"]], [-38, ["ENOTSOCK", "socket operation on non-socket"]], [-45, ["ENOTSUP", "operation not supported on socket"]], [-1, ["EPERM", "operation not permitted"]], [-32, ["EPIPE", "broken pipe"]], [-100, ["EPROTO", "protocol error"]], [-43, ["EPROTONOSUPPORT", "protocol not supported"]], [-41, ["EPROTOTYPE", "protocol wrong type for socket"]], [-34, ["ERANGE", "result too large"]], [-30, ["EROFS", "read-only file system"]], [-58, ["ESHUTDOWN", "cannot send after transport endpoint shutdown"]], [-29, ["ESPIPE", "invalid seek"]], [-3, ["ESRCH", "no such process"]], [-60, ["ETIMEDOUT", "connection timed out"]], [-26, ["ETXTBSY", "text file is busy"]], [-18, ["EXDEV", "cross-device link not permitted"]], [-4094, ["UNKNOWN", "unknown error"]], [-4095, ["EOF", "end of file"]], [-6, ["ENXIO", "no such device or address"]], [-31, ["EMLINK", "too many links"]], [-64, ["EHOSTDOWN", "host is down"]], [-4030, ["EREMOTEIO", "remote I/O error"]], [-25, ["ENOTTY", "inappropriate ioctl for device"]], [-79, ["EFTYPE", "inappropriate file type or format"]], [-92, ["EILSEQ", "illegal byte sequence"]]];
const errorToCodeDarwin = codeToErrorDarwin.map(([status, [code]]) => [code, status]);
const codeToErrorLinux = [[-7, ["E2BIG", "argument list too long"]], [-13, ["EACCES", "permission denied"]], [-98, ["EADDRINUSE", "address already in use"]], [-99, ["EADDRNOTAVAIL", "address not available"]], [-97, ["EAFNOSUPPORT", "address family not supported"]], [-11, ["EAGAIN", "resource temporarily unavailable"]], [-3000, ["EAI_ADDRFAMILY", "address family not supported"]], [-3001, ["EAI_AGAIN", "temporary failure"]], [-3002, ["EAI_BADFLAGS", "bad ai_flags value"]], [-3013, ["EAI_BADHINTS", "invalid value for hints"]], [-3003, ["EAI_CANCELED", "request canceled"]], [-3004, ["EAI_FAIL", "permanent failure"]], [-3005, ["EAI_FAMILY", "ai_family not supported"]], [-3006, ["EAI_MEMORY", "out of memory"]], [-3007, ["EAI_NODATA", "no address"]], [-3008, ["EAI_NONAME", "unknown node or service"]], [-3009, ["EAI_OVERFLOW", "argument buffer overflow"]], [-3014, ["EAI_PROTOCOL", "resolved protocol is unknown"]], [-3010, ["EAI_SERVICE", "service not available for socket type"]], [-3011, ["EAI_SOCKTYPE", "socket type not supported"]], [-114, ["EALREADY", "connection already in progress"]], [-9, ["EBADF", "bad file descriptor"]], [-16, ["EBUSY", "resource busy or locked"]], [-125, ["ECANCELED", "operation canceled"]], [-4080, ["ECHARSET", "invalid Unicode character"]], [-103, ["ECONNABORTED", "software caused connection abort"]], [-111, ["ECONNREFUSED", "connection refused"]], [-104, ["ECONNRESET", "connection reset by peer"]], [-89, ["EDESTADDRREQ", "destination address required"]], [-17, ["EEXIST", "file already exists"]], [-14, ["EFAULT", "bad address in system call argument"]], [-27, ["EFBIG", "file too large"]], [-113, ["EHOSTUNREACH", "host is unreachable"]], [-4, ["EINTR", "interrupted system call"]], [-22, ["EINVAL", "invalid argument"]], [-5, ["EIO", "i/o error"]], [-106, ["EISCONN", "socket is already connected"]], [-21, ["EISDIR", "illegal operation on a directory"]], [-40, ["ELOOP", "too many symbolic links encountered"]], [-24, ["EMFILE", "too many open files"]], [-90, ["EMSGSIZE", "message too long"]], [-36, ["ENAMETOOLONG", "name too long"]], [-100, ["ENETDOWN", "network is down"]], [-101, ["ENETUNREACH", "network is unreachable"]], [-23, ["ENFILE", "file table overflow"]], [-105, ["ENOBUFS", "no buffer space available"]], [-19, ["ENODEV", "no such device"]], [-2, ["ENOENT", "no such file or directory"]], [-12, ["ENOMEM", "not enough memory"]], [-64, ["ENONET", "machine is not on the network"]], [-92, ["ENOPROTOOPT", "protocol not available"]], [-28, ["ENOSPC", "no space left on device"]], [-38, ["ENOSYS", "function not implemented"]], [-107, ["ENOTCONN", "socket is not connected"]], [-20, ["ENOTDIR", "not a directory"]], [-39, ["ENOTEMPTY", "directory not empty"]], [-88, ["ENOTSOCK", "socket operation on non-socket"]], [-95, ["ENOTSUP", "operation not supported on socket"]], [-1, ["EPERM", "operation not permitted"]], [-32, ["EPIPE", "broken pipe"]], [-71, ["EPROTO", "protocol error"]], [-93, ["EPROTONOSUPPORT", "protocol not supported"]], [-91, ["EPROTOTYPE", "protocol wrong type for socket"]], [-34, ["ERANGE", "result too large"]], [-30, ["EROFS", "read-only file system"]], [-108, ["ESHUTDOWN", "cannot send after transport endpoint shutdown"]], [-29, ["ESPIPE", "invalid seek"]], [-3, ["ESRCH", "no such process"]], [-110, ["ETIMEDOUT", "connection timed out"]], [-26, ["ETXTBSY", "text file is busy"]], [-18, ["EXDEV", "cross-device link not permitted"]], [-4094, ["UNKNOWN", "unknown error"]], [-4095, ["EOF", "end of file"]], [-6, ["ENXIO", "no such device or address"]], [-31, ["EMLINK", "too many links"]], [-112, ["EHOSTDOWN", "host is down"]], [-121, ["EREMOTEIO", "remote I/O error"]], [-25, ["ENOTTY", "inappropriate ioctl for device"]], [-4028, ["EFTYPE", "inappropriate file type or format"]], [-84, ["EILSEQ", "illegal byte sequence"]]];
const errorToCodeLinux = codeToErrorLinux.map(([status, [code]]) => [code, status]);
const errorMap = new Map(osType === "windows" ? codeToErrorWindows : osType === "darwin" ? codeToErrorDarwin : osType === "linux" ? codeToErrorLinux : unreachable());
const codeMap = new Map(osType === "windows" ? errorToCodeWindows : osType === "darwin" ? errorToCodeDarwin : osType === "linux" ? errorToCodeLinux : unreachable());

// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
// This module is browser compatible.
// Alphabet chars.
const CHAR_UPPERCASE_A = 65;
/* A */

const CHAR_LOWERCASE_A = 97;
/* a */

const CHAR_UPPERCASE_Z = 90;
/* Z */

const CHAR_LOWERCASE_Z = 122;
/* z */
// Non-alphabetic chars.

const CHAR_DOT = 46;
/* . */

const CHAR_FORWARD_SLASH = 47;
/* / */

const CHAR_BACKWARD_SLASH = 92;
/* | */

const CHAR_COLON = 58;
/* : */

const CHAR_QUESTION_MARK = 63;
/* 9 */

// Copyright the Browserify authors. MIT License.
function assertPath(path) {
  if (typeof path !== "string") {
    throw new TypeError(`Path must be a string. Received ${JSON.stringify(path)}`);
  }
}
function isPosixPathSeparator(code) {
  return code === CHAR_FORWARD_SLASH;
}
function isPathSeparator(code) {
  return isPosixPathSeparator(code) || code === CHAR_BACKWARD_SLASH;
}
function isWindowsDeviceRoot(code) {
  return code >= CHAR_LOWERCASE_A && code <= CHAR_LOWERCASE_Z || code >= CHAR_UPPERCASE_A && code <= CHAR_UPPERCASE_Z;
} // Resolves . and .. elements in a path with directory names

function normalizeString(path, allowAboveRoot, separator, isPathSeparator) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let code;

  for (let i = 0, len = path.length; i <= len; ++i) {
    if (i < len) code = path.charCodeAt(i);else if (isPathSeparator(code)) break;else code = CHAR_FORWARD_SLASH;

    if (isPathSeparator(code)) {
      if (lastSlash === i - 1 || dots === 1) ; else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== CHAR_DOT || res.charCodeAt(res.length - 2) !== CHAR_DOT) {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf(separator);

            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
            }

            lastSlash = i;
            dots = 0;
            continue;
          } else if (res.length === 2 || res.length === 1) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }

        if (allowAboveRoot) {
          if (res.length > 0) res += `${separator}..`;else res = "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) res += separator + path.slice(lastSlash + 1, i);else res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }

      lastSlash = i;
      dots = 0;
    } else if (code === CHAR_DOT && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }

  return res;
}
function _format(sep, pathObject) {
  const dir = pathObject.dir || pathObject.root;
  const base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
  if (!dir) return base;
  if (dir === pathObject.root) return dir + base;
  return dir + sep + base;
}
const WHITESPACE_ENCODINGS = {
  "\u0009": "%09",
  "\u000A": "%0A",
  "\u000B": "%0B",
  "\u000C": "%0C",
  "\u000D": "%0D",
  "\u0020": "%20"
};
function encodeWhitespace(string) {
  return string.replaceAll(/[\s]/g, c => {
    return WHITESPACE_ENCODINGS[c] ?? c;
  });
}

// Copyright the Browserify authors. MIT License.
const sep$2 = "\\";
const delimiter$2 = ";";
/**
 * Resolves path segments into a `path`
 * @param pathSegments to process to path
 */

function resolve$2(...pathSegments) {
  let resolvedDevice = "";
  let resolvedTail = "";
  let resolvedAbsolute = false;

  for (let i = pathSegments.length - 1; i >= -1; i--) {
    let path; // deno-lint-ignore no-explicit-any

    const {
      Deno
    } = globalThis;

    if (i >= 0) {
      path = pathSegments[i];
    } else if (!resolvedDevice) {
      if (typeof Deno?.cwd !== "function") {
        throw new TypeError("Resolved a drive-letter-less path without a CWD.");
      }

      path = Deno.cwd();
    } else {
      if (typeof Deno?.env?.get !== "function" || typeof Deno?.cwd !== "function") {
        throw new TypeError("Resolved a relative path without a CWD.");
      }

      path = Deno.cwd(); // Verify that a cwd was found and that it actually points
      // to our drive. If not, default to the drive's root.

      if (path === undefined || path.slice(0, 3).toLowerCase() !== `${resolvedDevice.toLowerCase()}\\`) {
        path = `${resolvedDevice}\\`;
      }
    }

    assertPath(path);
    const len = path.length; // Skip empty entries

    if (len === 0) continue;
    let rootEnd = 0;
    let device = "";
    let isAbsolute = false;
    const code = path.charCodeAt(0); // Try to match a root

    if (len > 1) {
      if (isPathSeparator(code)) {
        // Possible UNC root
        // If we started with a separator, we know we at least have an
        // absolute path of some kind (UNC or otherwise)
        isAbsolute = true;

        if (isPathSeparator(path.charCodeAt(1))) {
          // Matched double path separator at beginning
          let j = 2;
          let last = j; // Match 1 or more non-path separators

          for (; j < len; ++j) {
            if (isPathSeparator(path.charCodeAt(j))) break;
          }

          if (j < len && j !== last) {
            const firstPart = path.slice(last, j); // Matched!

            last = j; // Match 1 or more path separators

            for (; j < len; ++j) {
              if (!isPathSeparator(path.charCodeAt(j))) break;
            }

            if (j < len && j !== last) {
              // Matched!
              last = j; // Match 1 or more non-path separators

              for (; j < len; ++j) {
                if (isPathSeparator(path.charCodeAt(j))) break;
              }

              if (j === len) {
                // We matched a UNC root only
                device = `\\\\${firstPart}\\${path.slice(last)}`;
                rootEnd = j;
              } else if (j !== last) {
                // We matched a UNC root with leftovers
                device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                rootEnd = j;
              }
            }
          }
        } else {
          rootEnd = 1;
        }
      } else if (isWindowsDeviceRoot(code)) {
        // Possible device root
        if (path.charCodeAt(1) === CHAR_COLON) {
          device = path.slice(0, 2);
          rootEnd = 2;

          if (len > 2) {
            if (isPathSeparator(path.charCodeAt(2))) {
              // Treat separator following drive name as an absolute path
              // indicator
              isAbsolute = true;
              rootEnd = 3;
            }
          }
        }
      }
    } else if (isPathSeparator(code)) {
      // `path` contains just a path separator
      rootEnd = 1;
      isAbsolute = true;
    }

    if (device.length > 0 && resolvedDevice.length > 0 && device.toLowerCase() !== resolvedDevice.toLowerCase()) {
      // This path points to another device so it is not applicable
      continue;
    }

    if (resolvedDevice.length === 0 && device.length > 0) {
      resolvedDevice = device;
    }

    if (!resolvedAbsolute) {
      resolvedTail = `${path.slice(rootEnd)}\\${resolvedTail}`;
      resolvedAbsolute = isAbsolute;
    }

    if (resolvedAbsolute && resolvedDevice.length > 0) break;
  } // At this point the path should be resolved to a full absolute path,
  // but handle relative paths to be safe (might happen when process.cwd()
  // fails)
  // Normalize the tail path


  resolvedTail = normalizeString(resolvedTail, !resolvedAbsolute, "\\", isPathSeparator);
  return resolvedDevice + (resolvedAbsolute ? "\\" : "") + resolvedTail || ".";
}
/**
 * Normalizes a `path`
 * @param path to normalize
 */

function normalize$3(path) {
  assertPath(path);
  const len = path.length;
  if (len === 0) return ".";
  let rootEnd = 0;
  let device;
  let isAbsolute = false;
  const code = path.charCodeAt(0); // Try to match a root

  if (len > 1) {
    if (isPathSeparator(code)) {
      // Possible UNC root
      // If we started with a separator, we know we at least have an absolute
      // path of some kind (UNC or otherwise)
      isAbsolute = true;

      if (isPathSeparator(path.charCodeAt(1))) {
        // Matched double path separator at beginning
        let j = 2;
        let last = j; // Match 1 or more non-path separators

        for (; j < len; ++j) {
          if (isPathSeparator(path.charCodeAt(j))) break;
        }

        if (j < len && j !== last) {
          const firstPart = path.slice(last, j); // Matched!

          last = j; // Match 1 or more path separators

          for (; j < len; ++j) {
            if (!isPathSeparator(path.charCodeAt(j))) break;
          }

          if (j < len && j !== last) {
            // Matched!
            last = j; // Match 1 or more non-path separators

            for (; j < len; ++j) {
              if (isPathSeparator(path.charCodeAt(j))) break;
            }

            if (j === len) {
              // We matched a UNC root only
              // Return the normalized version of the UNC root since there
              // is nothing left to process
              return `\\\\${firstPart}\\${path.slice(last)}\\`;
            } else if (j !== last) {
              // We matched a UNC root with leftovers
              device = `\\\\${firstPart}\\${path.slice(last, j)}`;
              rootEnd = j;
            }
          }
        }
      } else {
        rootEnd = 1;
      }
    } else if (isWindowsDeviceRoot(code)) {
      // Possible device root
      if (path.charCodeAt(1) === CHAR_COLON) {
        device = path.slice(0, 2);
        rootEnd = 2;

        if (len > 2) {
          if (isPathSeparator(path.charCodeAt(2))) {
            // Treat separator following drive name as an absolute path
            // indicator
            isAbsolute = true;
            rootEnd = 3;
          }
        }
      }
    }
  } else if (isPathSeparator(code)) {
    // `path` contains just a path separator, exit early to avoid unnecessary
    // work
    return "\\";
  }

  let tail;

  if (rootEnd < len) {
    tail = normalizeString(path.slice(rootEnd), !isAbsolute, "\\", isPathSeparator);
  } else {
    tail = "";
  }

  if (tail.length === 0 && !isAbsolute) tail = ".";

  if (tail.length > 0 && isPathSeparator(path.charCodeAt(len - 1))) {
    tail += "\\";
  }

  if (device === undefined) {
    if (isAbsolute) {
      if (tail.length > 0) return `\\${tail}`;else return "\\";
    } else if (tail.length > 0) {
      return tail;
    } else {
      return "";
    }
  } else if (isAbsolute) {
    if (tail.length > 0) return `${device}\\${tail}`;else return `${device}\\`;
  } else if (tail.length > 0) {
    return device + tail;
  } else {
    return device;
  }
}
/**
 * Verifies whether path is absolute
 * @param path to verify
 */

function isAbsolute$2(path) {
  assertPath(path);
  const len = path.length;
  if (len === 0) return false;
  const code = path.charCodeAt(0);

  if (isPathSeparator(code)) {
    return true;
  } else if (isWindowsDeviceRoot(code)) {
    // Possible device root
    if (len > 2 && path.charCodeAt(1) === CHAR_COLON) {
      if (isPathSeparator(path.charCodeAt(2))) return true;
    }
  }

  return false;
}
/**
 * Join all given a sequence of `paths`,then normalizes the resulting path.
 * @param paths to be joined and normalized
 */

function join$3(...paths) {
  const pathsCount = paths.length;
  if (pathsCount === 0) return ".";
  let joined;
  let firstPart = null;

  for (let i = 0; i < pathsCount; ++i) {
    const path = paths[i];
    assertPath(path);

    if (path.length > 0) {
      if (joined === undefined) joined = firstPart = path;else joined += `\\${path}`;
    }
  }

  if (joined === undefined) return "."; // Make sure that the joined path doesn't start with two slashes, because
  // normalize() will mistake it for an UNC path then.
  //
  // This step is skipped when it is very clear that the user actually
  // intended to point at an UNC path. This is assumed when the first
  // non-empty string arguments starts with exactly two slashes followed by
  // at least one more non-slash character.
  //
  // Note that for normalize() to treat a path as an UNC path it needs to
  // have at least 2 components, so we don't filter for that here.
  // This means that the user can use join to construct UNC paths from
  // a server name and a share name; for example:
  //   path.join('//server', 'share') -> '\\\\server\\share\\')

  let needsReplace = true;
  let slashCount = 0;
  assert(firstPart != null);

  if (isPathSeparator(firstPart.charCodeAt(0))) {
    ++slashCount;
    const firstLen = firstPart.length;

    if (firstLen > 1) {
      if (isPathSeparator(firstPart.charCodeAt(1))) {
        ++slashCount;

        if (firstLen > 2) {
          if (isPathSeparator(firstPart.charCodeAt(2))) ++slashCount;else {
            // We matched a UNC path in the first part
            needsReplace = false;
          }
        }
      }
    }
  }

  if (needsReplace) {
    // Find any more consecutive slashes we need to replace
    for (; slashCount < joined.length; ++slashCount) {
      if (!isPathSeparator(joined.charCodeAt(slashCount))) break;
    } // Replace the slashes if needed


    if (slashCount >= 2) joined = `\\${joined.slice(slashCount)}`;
  }

  return normalize$3(joined);
}
/**
 * It will solve the relative path from `from` to `to`, for instance:
 *  from = 'C:\\orandea\\test\\aaa'
 *  to = 'C:\\orandea\\impl\\bbb'
 * The output of the function should be: '..\\..\\impl\\bbb'
 * @param from relative path
 * @param to relative path
 */

function relative$2(from, to) {
  assertPath(from);
  assertPath(to);
  if (from === to) return "";
  const fromOrig = resolve$2(from);
  const toOrig = resolve$2(to);
  if (fromOrig === toOrig) return "";
  from = fromOrig.toLowerCase();
  to = toOrig.toLowerCase();
  if (from === to) return ""; // Trim any leading backslashes

  let fromStart = 0;
  let fromEnd = from.length;

  for (; fromStart < fromEnd; ++fromStart) {
    if (from.charCodeAt(fromStart) !== CHAR_BACKWARD_SLASH) break;
  } // Trim trailing backslashes (applicable to UNC paths only)


  for (; fromEnd - 1 > fromStart; --fromEnd) {
    if (from.charCodeAt(fromEnd - 1) !== CHAR_BACKWARD_SLASH) break;
  }

  const fromLen = fromEnd - fromStart; // Trim any leading backslashes

  let toStart = 0;
  let toEnd = to.length;

  for (; toStart < toEnd; ++toStart) {
    if (to.charCodeAt(toStart) !== CHAR_BACKWARD_SLASH) break;
  } // Trim trailing backslashes (applicable to UNC paths only)


  for (; toEnd - 1 > toStart; --toEnd) {
    if (to.charCodeAt(toEnd - 1) !== CHAR_BACKWARD_SLASH) break;
  }

  const toLen = toEnd - toStart; // Compare paths to find the longest common path from root

  const length = fromLen < toLen ? fromLen : toLen;
  let lastCommonSep = -1;
  let i = 0;

  for (; i <= length; ++i) {
    if (i === length) {
      if (toLen > length) {
        if (to.charCodeAt(toStart + i) === CHAR_BACKWARD_SLASH) {
          // We get here if `from` is the exact base path for `to`.
          // For example: from='C:\\foo\\bar'; to='C:\\foo\\bar\\baz'
          return toOrig.slice(toStart + i + 1);
        } else if (i === 2) {
          // We get here if `from` is the device root.
          // For example: from='C:\\'; to='C:\\foo'
          return toOrig.slice(toStart + i);
        }
      }

      if (fromLen > length) {
        if (from.charCodeAt(fromStart + i) === CHAR_BACKWARD_SLASH) {
          // We get here if `to` is the exact base path for `from`.
          // For example: from='C:\\foo\\bar'; to='C:\\foo'
          lastCommonSep = i;
        } else if (i === 2) {
          // We get here if `to` is the device root.
          // For example: from='C:\\foo\\bar'; to='C:\\'
          lastCommonSep = 3;
        }
      }

      break;
    }

    const fromCode = from.charCodeAt(fromStart + i);
    const toCode = to.charCodeAt(toStart + i);
    if (fromCode !== toCode) break;else if (fromCode === CHAR_BACKWARD_SLASH) lastCommonSep = i;
  } // We found a mismatch before the first common path separator was seen, so
  // return the original `to`.


  if (i !== length && lastCommonSep === -1) {
    return toOrig;
  }

  let out = "";
  if (lastCommonSep === -1) lastCommonSep = 0; // Generate the relative path based on the path difference between `to` and
  // `from`

  for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
    if (i === fromEnd || from.charCodeAt(i) === CHAR_BACKWARD_SLASH) {
      if (out.length === 0) out += "..";else out += "\\..";
    }
  } // Lastly, append the rest of the destination (`to`) path that comes after
  // the common path parts


  if (out.length > 0) {
    return out + toOrig.slice(toStart + lastCommonSep, toEnd);
  } else {
    toStart += lastCommonSep;
    if (toOrig.charCodeAt(toStart) === CHAR_BACKWARD_SLASH) ++toStart;
    return toOrig.slice(toStart, toEnd);
  }
}
/**
 * Resolves path to a namespace path
 * @param path to resolve to namespace
 */

function toNamespacedPath$2(path) {
  // Note: this will *probably* throw somewhere.
  if (typeof path !== "string") return path;
  if (path.length === 0) return "";
  const resolvedPath = resolve$2(path);

  if (resolvedPath.length >= 3) {
    if (resolvedPath.charCodeAt(0) === CHAR_BACKWARD_SLASH) {
      // Possible UNC root
      if (resolvedPath.charCodeAt(1) === CHAR_BACKWARD_SLASH) {
        const code = resolvedPath.charCodeAt(2);

        if (code !== CHAR_QUESTION_MARK && code !== CHAR_DOT) {
          // Matched non-long UNC root, convert the path to a long UNC path
          return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
        }
      }
    } else if (isWindowsDeviceRoot(resolvedPath.charCodeAt(0))) {
      // Possible device root
      if (resolvedPath.charCodeAt(1) === CHAR_COLON && resolvedPath.charCodeAt(2) === CHAR_BACKWARD_SLASH) {
        // Matched device root, convert the path to a long UNC path
        return `\\\\?\\${resolvedPath}`;
      }
    }
  }

  return path;
}
/**
 * Return the directory name of a `path`.
 * @param path to determine name for
 */

function dirname$2(path) {
  assertPath(path);
  const len = path.length;
  if (len === 0) return ".";
  let rootEnd = -1;
  let end = -1;
  let matchedSlash = true;
  let offset = 0;
  const code = path.charCodeAt(0); // Try to match a root

  if (len > 1) {
    if (isPathSeparator(code)) {
      // Possible UNC root
      rootEnd = offset = 1;

      if (isPathSeparator(path.charCodeAt(1))) {
        // Matched double path separator at beginning
        let j = 2;
        let last = j; // Match 1 or more non-path separators

        for (; j < len; ++j) {
          if (isPathSeparator(path.charCodeAt(j))) break;
        }

        if (j < len && j !== last) {
          // Matched!
          last = j; // Match 1 or more path separators

          for (; j < len; ++j) {
            if (!isPathSeparator(path.charCodeAt(j))) break;
          }

          if (j < len && j !== last) {
            // Matched!
            last = j; // Match 1 or more non-path separators

            for (; j < len; ++j) {
              if (isPathSeparator(path.charCodeAt(j))) break;
            }

            if (j === len) {
              // We matched a UNC root only
              return path;
            }

            if (j !== last) {
              // We matched a UNC root with leftovers
              // Offset by 1 to include the separator after the UNC root to
              // treat it as a "normal root" on top of a (UNC) root
              rootEnd = offset = j + 1;
            }
          }
        }
      }
    } else if (isWindowsDeviceRoot(code)) {
      // Possible device root
      if (path.charCodeAt(1) === CHAR_COLON) {
        rootEnd = offset = 2;

        if (len > 2) {
          if (isPathSeparator(path.charCodeAt(2))) rootEnd = offset = 3;
        }
      }
    }
  } else if (isPathSeparator(code)) {
    // `path` contains just a path separator, exit early to avoid
    // unnecessary work
    return path;
  }

  for (let i = len - 1; i >= offset; --i) {
    if (isPathSeparator(path.charCodeAt(i))) {
      if (!matchedSlash) {
        end = i;
        break;
      }
    } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) {
    if (rootEnd === -1) return ".";else end = rootEnd;
  }

  return path.slice(0, end);
}
/**
 * Return the last portion of a `path`. Trailing directory separators are ignored.
 * @param path to process
 * @param ext of path directory
 */

function basename$2(path, ext = "") {
  if (ext !== undefined && typeof ext !== "string") {
    throw new TypeError('"ext" argument must be a string');
  }

  assertPath(path);
  let start = 0;
  let end = -1;
  let matchedSlash = true;
  let i; // Check for a drive letter prefix so as not to mistake the following
  // path separator as an extra separator at the end of the path that can be
  // disregarded

  if (path.length >= 2) {
    const drive = path.charCodeAt(0);

    if (isWindowsDeviceRoot(drive)) {
      if (path.charCodeAt(1) === CHAR_COLON) start = 2;
    }
  }

  if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
    if (ext.length === path.length && ext === path) return "";
    let extIdx = ext.length - 1;
    let firstNonSlashEnd = -1;

    for (i = path.length - 1; i >= start; --i) {
      const code = path.charCodeAt(i);

      if (isPathSeparator(code)) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else {
        if (firstNonSlashEnd === -1) {
          // We saw the first non-path separator, remember this index in case
          // we need it if the extension ends up not matching
          matchedSlash = false;
          firstNonSlashEnd = i + 1;
        }

        if (extIdx >= 0) {
          // Try to match the explicit extension
          if (code === ext.charCodeAt(extIdx)) {
            if (--extIdx === -1) {
              // We matched the extension, so mark this as the end of our path
              // component
              end = i;
            }
          } else {
            // Extension does not match, so our result is the entire path
            // component
            extIdx = -1;
            end = firstNonSlashEnd;
          }
        }
      }
    }

    if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
    return path.slice(start, end);
  } else {
    for (i = path.length - 1; i >= start; --i) {
      if (isPathSeparator(path.charCodeAt(i))) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // path component
        matchedSlash = false;
        end = i + 1;
      }
    }

    if (end === -1) return "";
    return path.slice(start, end);
  }
}
/**
 * Return the extension of the `path`.
 * @param path with extension
 */

function extname$2(path) {
  assertPath(path);
  let start = 0;
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true; // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find

  let preDotState = 0; // Check for a drive letter prefix so as not to mistake the following
  // path separator as an extra separator at the end of the path that can be
  // disregarded

  if (path.length >= 2 && path.charCodeAt(1) === CHAR_COLON && isWindowsDeviceRoot(path.charCodeAt(0))) {
    start = startPart = 2;
  }

  for (let i = path.length - 1; i >= start; --i) {
    const code = path.charCodeAt(i);

    if (isPathSeparator(code)) {
      // If we reached a path separator that was not part of a set of path
      // separators at the end of the string, stop now
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }

      continue;
    }

    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }

    if (code === CHAR_DOT) {
      // If this is our first dot, mark it as the start of our extension
      if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return "";
  }

  return path.slice(startDot, end);
}
/**
 * Generate a path from `FormatInputPathObject` object.
 * @param pathObject with path
 */

function format$3(pathObject) {
  if (pathObject === null || typeof pathObject !== "object") {
    throw new TypeError(`The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`);
  }

  return _format("\\", pathObject);
}
/**
 * Return a `ParsedPath` object of the `path`.
 * @param path to process
 */

function parse$5(path) {
  assertPath(path);
  const ret = {
    root: "",
    dir: "",
    base: "",
    ext: "",
    name: ""
  };
  const len = path.length;
  if (len === 0) return ret;
  let rootEnd = 0;
  let code = path.charCodeAt(0); // Try to match a root

  if (len > 1) {
    if (isPathSeparator(code)) {
      // Possible UNC root
      rootEnd = 1;

      if (isPathSeparator(path.charCodeAt(1))) {
        // Matched double path separator at beginning
        let j = 2;
        let last = j; // Match 1 or more non-path separators

        for (; j < len; ++j) {
          if (isPathSeparator(path.charCodeAt(j))) break;
        }

        if (j < len && j !== last) {
          // Matched!
          last = j; // Match 1 or more path separators

          for (; j < len; ++j) {
            if (!isPathSeparator(path.charCodeAt(j))) break;
          }

          if (j < len && j !== last) {
            // Matched!
            last = j; // Match 1 or more non-path separators

            for (; j < len; ++j) {
              if (isPathSeparator(path.charCodeAt(j))) break;
            }

            if (j === len) {
              // We matched a UNC root only
              rootEnd = j;
            } else if (j !== last) {
              // We matched a UNC root with leftovers
              rootEnd = j + 1;
            }
          }
        }
      }
    } else if (isWindowsDeviceRoot(code)) {
      // Possible device root
      if (path.charCodeAt(1) === CHAR_COLON) {
        rootEnd = 2;

        if (len > 2) {
          if (isPathSeparator(path.charCodeAt(2))) {
            if (len === 3) {
              // `path` contains just a drive root, exit early to avoid
              // unnecessary work
              ret.root = ret.dir = path;
              return ret;
            }

            rootEnd = 3;
          }
        } else {
          // `path` contains just a drive root, exit early to avoid
          // unnecessary work
          ret.root = ret.dir = path;
          return ret;
        }
      }
    }
  } else if (isPathSeparator(code)) {
    // `path` contains just a path separator, exit early to avoid
    // unnecessary work
    ret.root = ret.dir = path;
    return ret;
  }

  if (rootEnd > 0) ret.root = path.slice(0, rootEnd);
  let startDot = -1;
  let startPart = rootEnd;
  let end = -1;
  let matchedSlash = true;
  let i = path.length - 1; // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find

  let preDotState = 0; // Get non-dir info

  for (; i >= rootEnd; --i) {
    code = path.charCodeAt(i);

    if (isPathSeparator(code)) {
      // If we reached a path separator that was not part of a set of path
      // separators at the end of the string, stop now
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }

      continue;
    }

    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }

    if (code === CHAR_DOT) {
      // If this is our first dot, mark it as the start of our extension
      if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    if (end !== -1) {
      ret.base = ret.name = path.slice(startPart, end);
    }
  } else {
    ret.name = path.slice(startPart, startDot);
    ret.base = path.slice(startPart, end);
    ret.ext = path.slice(startDot, end);
  } // If the directory is the root, use the entire root as the `dir` including
  // the trailing slash if any (`C:\abc` -> `C:\`). Otherwise, strip out the
  // trailing slash (`C:\abc\def` -> `C:\abc`).


  if (startPart > 0 && startPart !== rootEnd) {
    ret.dir = path.slice(0, startPart - 1);
  } else ret.dir = ret.root;

  return ret;
}
/**
 * Converts a file URL to a path string.
 *
 * ```ts
 *      import { fromFileUrl } from "./win32.ts";
 *      fromFileUrl("file:///home/foo"); // "\\home\\foo"
 *      fromFileUrl("file:///C:/Users/foo"); // "C:\\Users\\foo"
 *      fromFileUrl("file://localhost/home/foo"); // "\\\\localhost\\home\\foo"
 * ```
 * @param url of a file URL
 */

function fromFileUrl$2(url) {
  url = url instanceof URL ? url : new URL(url);

  if (url.protocol != "file:") {
    throw new TypeError("Must be a file URL.");
  }

  let path = decodeURIComponent(url.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");

  if (url.hostname != "") {
    // Note: The `URL` implementation guarantees that the drive letter and
    // hostname are mutually exclusive. Otherwise it would not have been valid
    // to append the hostname and path like this.
    path = `\\\\${url.hostname}${path}`;
  }

  return path;
}
/**
 * Converts a path string to a file URL.
 *
 * ```ts
 *      import { toFileUrl } from "./win32.ts";
 *      toFileUrl("\\home\\foo"); // new URL("file:///home/foo")
 *      toFileUrl("C:\\Users\\foo"); // new URL("file:///C:/Users/foo")
 *      toFileUrl("\\\\127.0.0.1\\home\\foo"); // new URL("file://127.0.0.1/home/foo")
 * ```
 * @param path to convert to file URL
 */

function toFileUrl$2(path) {
  if (!isAbsolute$2(path)) {
    throw new TypeError("Must be an absolute path.");
  }

  const [, hostname, pathname] = path.match(/^(?:[/\\]{2}([^/\\]+)(?=[/\\](?:[^/\\]|$)))?(.*)/);
  const url = new URL("file:///");
  url.pathname = encodeWhitespace(pathname.replace(/%/g, "%25"));

  if (hostname != null && hostname != "localhost") {
    url.hostname = hostname;

    if (!url.hostname) {
      throw new TypeError("Invalid hostname.");
    }
  }

  return url;
}

var _win32 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  sep: sep$2,
  delimiter: delimiter$2,
  resolve: resolve$2,
  normalize: normalize$3,
  isAbsolute: isAbsolute$2,
  join: join$3,
  relative: relative$2,
  toNamespacedPath: toNamespacedPath$2,
  dirname: dirname$2,
  basename: basename$2,
  extname: extname$2,
  format: format$3,
  parse: parse$5,
  fromFileUrl: fromFileUrl$2,
  toFileUrl: toFileUrl$2
});

// Copyright the Browserify authors. MIT License.
const sep$1 = "/";
const delimiter$1 = ":"; // path.resolve([from ...], to)

/**
 * Resolves `pathSegments` into an absolute path.
 * @param pathSegments an array of path segments
 */

function resolve$1(...pathSegments) {
  let resolvedPath = "";
  let resolvedAbsolute = false;

  for (let i = pathSegments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    let path;
    if (i >= 0) path = pathSegments[i];else {
      // deno-lint-ignore no-explicit-any
      const {
        Deno
      } = globalThis;

      if (typeof Deno?.cwd !== "function") {
        throw new TypeError("Resolved a relative path without a CWD.");
      }

      path = Deno.cwd();
    }
    assertPath(path); // Skip empty entries

    if (path.length === 0) {
      continue;
    }

    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
  } // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)
  // Normalize the path


  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute, "/", isPosixPathSeparator);

  if (resolvedAbsolute) {
    if (resolvedPath.length > 0) return `/${resolvedPath}`;else return "/";
  } else if (resolvedPath.length > 0) return resolvedPath;else return ".";
}
/**
 * Normalize the `path`, resolving `'..'` and `'.'` segments.
 * @param path to be normalized
 */

function normalize$2(path) {
  assertPath(path);
  if (path.length === 0) return ".";
  const isAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
  const trailingSeparator = path.charCodeAt(path.length - 1) === CHAR_FORWARD_SLASH; // Normalize the path

  path = normalizeString(path, !isAbsolute, "/", isPosixPathSeparator);
  if (path.length === 0 && !isAbsolute) path = ".";
  if (path.length > 0 && trailingSeparator) path += "/";
  if (isAbsolute) return `/${path}`;
  return path;
}
/**
 * Verifies whether provided path is absolute
 * @param path to be verified as absolute
 */

function isAbsolute$1(path) {
  assertPath(path);
  return path.length > 0 && path.charCodeAt(0) === CHAR_FORWARD_SLASH;
}
/**
 * Join all given a sequence of `paths`,then normalizes the resulting path.
 * @param paths to be joined and normalized
 */

function join$2(...paths) {
  if (paths.length === 0) return ".";
  let joined;

  for (let i = 0, len = paths.length; i < len; ++i) {
    const path = paths[i];
    assertPath(path);

    if (path.length > 0) {
      if (!joined) joined = path;else joined += `/${path}`;
    }
  }

  if (!joined) return ".";
  return normalize$2(joined);
}
/**
 * Return the relative path from `from` to `to` based on current working directory.
 * @param from path in current working directory
 * @param to path in current working directory
 */

function relative$1(from, to) {
  assertPath(from);
  assertPath(to);
  if (from === to) return "";
  from = resolve$1(from);
  to = resolve$1(to);
  if (from === to) return ""; // Trim any leading backslashes

  let fromStart = 1;
  const fromEnd = from.length;

  for (; fromStart < fromEnd; ++fromStart) {
    if (from.charCodeAt(fromStart) !== CHAR_FORWARD_SLASH) break;
  }

  const fromLen = fromEnd - fromStart; // Trim any leading backslashes

  let toStart = 1;
  const toEnd = to.length;

  for (; toStart < toEnd; ++toStart) {
    if (to.charCodeAt(toStart) !== CHAR_FORWARD_SLASH) break;
  }

  const toLen = toEnd - toStart; // Compare paths to find the longest common path from root

  const length = fromLen < toLen ? fromLen : toLen;
  let lastCommonSep = -1;
  let i = 0;

  for (; i <= length; ++i) {
    if (i === length) {
      if (toLen > length) {
        if (to.charCodeAt(toStart + i) === CHAR_FORWARD_SLASH) {
          // We get here if `from` is the exact base path for `to`.
          // For example: from='/foo/bar'; to='/foo/bar/baz'
          return to.slice(toStart + i + 1);
        } else if (i === 0) {
          // We get here if `from` is the root
          // For example: from='/'; to='/foo'
          return to.slice(toStart + i);
        }
      } else if (fromLen > length) {
        if (from.charCodeAt(fromStart + i) === CHAR_FORWARD_SLASH) {
          // We get here if `to` is the exact base path for `from`.
          // For example: from='/foo/bar/baz'; to='/foo/bar'
          lastCommonSep = i;
        } else if (i === 0) {
          // We get here if `to` is the root.
          // For example: from='/foo'; to='/'
          lastCommonSep = 0;
        }
      }

      break;
    }

    const fromCode = from.charCodeAt(fromStart + i);
    const toCode = to.charCodeAt(toStart + i);
    if (fromCode !== toCode) break;else if (fromCode === CHAR_FORWARD_SLASH) lastCommonSep = i;
  }

  let out = ""; // Generate the relative path based on the path difference between `to`
  // and `from`

  for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
    if (i === fromEnd || from.charCodeAt(i) === CHAR_FORWARD_SLASH) {
      if (out.length === 0) out += "..";else out += "/..";
    }
  } // Lastly, append the rest of the destination (`to`) path that comes after
  // the common path parts


  if (out.length > 0) return out + to.slice(toStart + lastCommonSep);else {
    toStart += lastCommonSep;
    if (to.charCodeAt(toStart) === CHAR_FORWARD_SLASH) ++toStart;
    return to.slice(toStart);
  }
}
/**
 * Resolves path to a namespace path
 * @param path to resolve to namespace
 */

function toNamespacedPath$1(path) {
  // Non-op on posix systems
  return path;
}
/**
 * Return the directory name of a `path`.
 * @param path to determine name for
 */

function dirname$1(path) {
  assertPath(path);
  if (path.length === 0) return ".";
  const hasRoot = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
  let end = -1;
  let matchedSlash = true;

  for (let i = path.length - 1; i >= 1; --i) {
    if (path.charCodeAt(i) === CHAR_FORWARD_SLASH) {
      if (!matchedSlash) {
        end = i;
        break;
      }
    } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? "/" : ".";
  if (hasRoot && end === 1) return "//";
  return path.slice(0, end);
}
/**
 * Return the last portion of a `path`. Trailing directory separators are ignored.
 * @param path to process
 * @param ext of path directory
 */

function basename$1(path, ext = "") {
  if (ext !== undefined && typeof ext !== "string") {
    throw new TypeError('"ext" argument must be a string');
  }

  assertPath(path);
  let start = 0;
  let end = -1;
  let matchedSlash = true;
  let i;

  if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
    if (ext.length === path.length && ext === path) return "";
    let extIdx = ext.length - 1;
    let firstNonSlashEnd = -1;

    for (i = path.length - 1; i >= 0; --i) {
      const code = path.charCodeAt(i);

      if (code === CHAR_FORWARD_SLASH) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else {
        if (firstNonSlashEnd === -1) {
          // We saw the first non-path separator, remember this index in case
          // we need it if the extension ends up not matching
          matchedSlash = false;
          firstNonSlashEnd = i + 1;
        }

        if (extIdx >= 0) {
          // Try to match the explicit extension
          if (code === ext.charCodeAt(extIdx)) {
            if (--extIdx === -1) {
              // We matched the extension, so mark this as the end of our path
              // component
              end = i;
            }
          } else {
            // Extension does not match, so our result is the entire path
            // component
            extIdx = -1;
            end = firstNonSlashEnd;
          }
        }
      }
    }

    if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
    return path.slice(start, end);
  } else {
    for (i = path.length - 1; i >= 0; --i) {
      if (path.charCodeAt(i) === CHAR_FORWARD_SLASH) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // path component
        matchedSlash = false;
        end = i + 1;
      }
    }

    if (end === -1) return "";
    return path.slice(start, end);
  }
}
/**
 * Return the extension of the `path`.
 * @param path with extension
 */

function extname$1(path) {
  assertPath(path);
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true; // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find

  let preDotState = 0;

  for (let i = path.length - 1; i >= 0; --i) {
    const code = path.charCodeAt(i);

    if (code === CHAR_FORWARD_SLASH) {
      // If we reached a path separator that was not part of a set of path
      // separators at the end of the string, stop now
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }

      continue;
    }

    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }

    if (code === CHAR_DOT) {
      // If this is our first dot, mark it as the start of our extension
      if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return "";
  }

  return path.slice(startDot, end);
}
/**
 * Generate a path from `FormatInputPathObject` object.
 * @param pathObject with path
 */

function format$2(pathObject) {
  if (pathObject === null || typeof pathObject !== "object") {
    throw new TypeError(`The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`);
  }

  return _format("/", pathObject);
}
/**
 * Return a `ParsedPath` object of the `path`.
 * @param path to process
 */

function parse$4(path) {
  assertPath(path);
  const ret = {
    root: "",
    dir: "",
    base: "",
    ext: "",
    name: ""
  };
  if (path.length === 0) return ret;
  const isAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
  let start;

  if (isAbsolute) {
    ret.root = "/";
    start = 1;
  } else {
    start = 0;
  }

  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  let i = path.length - 1; // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find

  let preDotState = 0; // Get non-dir info

  for (; i >= start; --i) {
    const code = path.charCodeAt(i);

    if (code === CHAR_FORWARD_SLASH) {
      // If we reached a path separator that was not part of a set of path
      // separators at the end of the string, stop now
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }

      continue;
    }

    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }

    if (code === CHAR_DOT) {
      // If this is our first dot, mark it as the start of our extension
      if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    if (end !== -1) {
      if (startPart === 0 && isAbsolute) {
        ret.base = ret.name = path.slice(1, end);
      } else {
        ret.base = ret.name = path.slice(startPart, end);
      }
    }
  } else {
    if (startPart === 0 && isAbsolute) {
      ret.name = path.slice(1, startDot);
      ret.base = path.slice(1, end);
    } else {
      ret.name = path.slice(startPart, startDot);
      ret.base = path.slice(startPart, end);
    }

    ret.ext = path.slice(startDot, end);
  }

  if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = "/";
  return ret;
}
/**
 * Converts a file URL to a path string.
 *
 * ```ts
 *      import { fromFileUrl } from "./posix.ts";
 *      fromFileUrl("file:///home/foo"); // "/home/foo"
 * ```
 * @param url of a file URL
 */

function fromFileUrl$1(url) {
  url = url instanceof URL ? url : new URL(url);

  if (url.protocol != "file:") {
    throw new TypeError("Must be a file URL.");
  }

  return decodeURIComponent(url.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
}
/**
 * Converts a path string to a file URL.
 *
 * ```ts
 *      import { toFileUrl } from "./posix.ts";
 *      toFileUrl("/home/foo"); // new URL("file:///home/foo")
 * ```
 * @param path to convert to file URL
 */

function toFileUrl$1(path) {
  if (!isAbsolute$1(path)) {
    throw new TypeError("Must be an absolute path.");
  }

  const url = new URL("file:///");
  url.pathname = encodeWhitespace(path.replace(/%/g, "%25").replace(/\\/g, "%5C"));
  return url;
}

var _posix = /*#__PURE__*/Object.freeze({
  __proto__: null,
  sep: sep$1,
  delimiter: delimiter$1,
  resolve: resolve$1,
  normalize: normalize$2,
  isAbsolute: isAbsolute$1,
  join: join$2,
  relative: relative$1,
  toNamespacedPath: toNamespacedPath$1,
  dirname: dirname$1,
  basename: basename$1,
  extname: extname$1,
  format: format$2,
  parse: parse$4,
  fromFileUrl: fromFileUrl$1,
  toFileUrl: toFileUrl$1
});

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
const SEP = isWindows ? "\\" : "/";
const SEP_PATTERN = isWindows ? /[\\/]+/ : /\/+/;

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
/** Determines the common path from a set of paths, using an optional separator,
 * which defaults to the OS default separator.
 *
 * ```ts
 *       import { common } from "https://deno.land/std@$STD_VERSION/path/mod.ts";
 *       const p = common([
 *         "./deno/std/path/mod.ts",
 *         "./deno/std/fs/mod.ts",
 *       ]);
 *       console.log(p); // "./deno/std/"
 * ```
 */

function common(paths, sep = SEP) {
  const [first = "", ...remaining] = paths;

  if (first === "" || remaining.length === 0) {
    return first.substring(0, first.lastIndexOf(sep) + 1);
  }

  const parts = first.split(sep);
  let endOfPrefix = parts.length;

  for (const path of remaining) {
    const compare = path.split(sep);

    for (let i = 0; i < endOfPrefix; i++) {
      if (compare[i] !== parts[i]) {
        endOfPrefix = i;
      }
    }

    if (endOfPrefix === 0) {
      return "";
    }
  }

  const prefix = parts.slice(0, endOfPrefix).join(sep);
  return prefix.endsWith(sep) ? prefix : `${prefix}${sep}`;
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
const path$2 = isWindows ? _win32 : _posix;
const {
  join: join$1,
  normalize: normalize$1
} = path$2;
const regExpEscapeChars = ["!", "$", "(", ")", "*", "+", ".", "=", "?", "[", "\\", "^", "{", "|"];
const rangeEscapeChars = ["-", "\\", "]"];
/** Convert a glob string to a regular expression.
 *
 * Tries to match bash glob expansion as closely as possible.
 *
 * Basic glob syntax:
 * - `*` - Matches everything without leaving the path segment.
 * - `?` - Matches any single character.
 * - `{foo,bar}` - Matches `foo` or `bar`.
 * - `[abcd]` - Matches `a`, `b`, `c` or `d`.
 * - `[a-d]` - Matches `a`, `b`, `c` or `d`.
 * - `[!abcd]` - Matches any single character besides `a`, `b`, `c` or `d`.
 * - `[[:<class>:]]` - Matches any character belonging to `<class>`.
 *     - `[[:alnum:]]` - Matches any digit or letter.
 *     - `[[:digit:]abc]` - Matches any digit, `a`, `b` or `c`.
 *     - See https://facelessuser.github.io/wcmatch/glob/#posix-character-classes
 *       for a complete list of supported character classes.
 * - `\` - Escapes the next character for an `os` other than `"windows"`.
 * - \` - Escapes the next character for `os` set to `"windows"`.
 * - `/` - Path separator.
 * - `\` - Additional path separator only for `os` set to `"windows"`.
 *
 * Extended syntax:
 * - Requires `{ extended: true }`.
 * - `?(foo|bar)` - Matches 0 or 1 instance of `{foo,bar}`.
 * - `@(foo|bar)` - Matches 1 instance of `{foo,bar}`. They behave the same.
 * - `*(foo|bar)` - Matches _n_ instances of `{foo,bar}`.
 * - `+(foo|bar)` - Matches _n > 0_ instances of `{foo,bar}`.
 * - `!(foo|bar)` - Matches anything other than `{foo,bar}`.
 * - See https://www.linuxjournal.com/content/bash-extended-globbing.
 *
 * Globstar syntax:
 * - Requires `{ globstar: true }`.
 * - `**` - Matches any number of any path segments.
 *     - Must comprise its entire path segment in the provided glob.
 * - See https://www.linuxjournal.com/content/globstar-new-bash-globbing-option.
 *
 * Note the following properties:
 * - The generated `RegExp` is anchored at both start and end.
 * - Repeating and trailing separators are tolerated. Trailing separators in the
 *   provided glob have no meaning and are discarded.
 * - Absolute globs will only match absolute paths, etc.
 * - Empty globs will match nothing.
 * - Any special glob syntax must be contained to one path segment. For example,
 *   `?(foo|bar/baz)` is invalid. The separator will take precedence and the
 *   first segment ends with an unclosed group.
 * - If a path segment ends with unclosed groups or a dangling escape prefix, a
 *   parse error has occurred. Every character for that segment is taken
 *   literally in this event.
 *
 * Limitations:
 * - A negative group like `!(foo|bar)` will wrongly be converted to a negative
 *   look-ahead followed by a wildcard. This means that `!(foo).js` will wrongly
 *   fail to match `foobar.js`, even though `foobar` is not `foo`. Effectively,
 *   `!(foo|bar)` is treated like `!(@(foo|bar)*)`. This will work correctly if
 *   the group occurs not nested at the end of the segment. */

function globToRegExp(glob, {
  extended = true,
  globstar: globstarOption = true,
  os = osType,
  caseInsensitive = false
} = {}) {
  if (glob == "") {
    return /(?!)/;
  }

  const sep = os == "windows" ? "(?:\\\\|/)+" : "/+";
  const sepMaybe = os == "windows" ? "(?:\\\\|/)*" : "/*";
  const seps = os == "windows" ? ["\\", "/"] : ["/"];
  const globstar = os == "windows" ? "(?:[^\\\\/]*(?:\\\\|/|$)+)*" : "(?:[^/]*(?:/|$)+)*";
  const wildcard = os == "windows" ? "[^\\\\/]*" : "[^/]*";
  const escapePrefix = os == "windows" ? "`" : "\\"; // Remove trailing separators.

  let newLength = glob.length;

  for (; newLength > 1 && seps.includes(glob[newLength - 1]); newLength--);

  glob = glob.slice(0, newLength);
  let regExpString = ""; // Terminates correctly. Trust that `j` is incremented every iteration.

  for (let j = 0; j < glob.length;) {
    let segment = "";
    const groupStack = [];
    let inRange = false;
    let inEscape = false;
    let endsWithSep = false;
    let i = j; // Terminates with `i` at the non-inclusive end of the current segment.

    for (; i < glob.length && !seps.includes(glob[i]); i++) {
      if (inEscape) {
        inEscape = false;
        const escapeChars = inRange ? rangeEscapeChars : regExpEscapeChars;
        segment += escapeChars.includes(glob[i]) ? `\\${glob[i]}` : glob[i];
        continue;
      }

      if (glob[i] == escapePrefix) {
        inEscape = true;
        continue;
      }

      if (glob[i] == "[") {
        if (!inRange) {
          inRange = true;
          segment += "[";

          if (glob[i + 1] == "!") {
            i++;
            segment += "^";
          } else if (glob[i + 1] == "^") {
            i++;
            segment += "\\^";
          }

          continue;
        } else if (glob[i + 1] == ":") {
          let k = i + 1;
          let value = "";

          while (glob[k + 1] != null && glob[k + 1] != ":") {
            value += glob[k + 1];
            k++;
          }

          if (glob[k + 1] == ":" && glob[k + 2] == "]") {
            i = k + 2;
            if (value == "alnum") segment += "\\dA-Za-z";else if (value == "alpha") segment += "A-Za-z";else if (value == "ascii") segment += "\x00-\x7F";else if (value == "blank") segment += "\t ";else if (value == "cntrl") segment += "\x00-\x1F\x7F";else if (value == "digit") segment += "\\d";else if (value == "graph") segment += "\x21-\x7E";else if (value == "lower") segment += "a-z";else if (value == "print") segment += "\x20-\x7E";else if (value == "punct") {
              segment += "!\"#$%&'()*+,\\-./:;<=>?@[\\\\\\]^_‘{|}~";
            } else if (value == "space") segment += "\\s\v";else if (value == "upper") segment += "A-Z";else if (value == "word") segment += "\\w";else if (value == "xdigit") segment += "\\dA-Fa-f";
            continue;
          }
        }
      }

      if (glob[i] == "]" && inRange) {
        inRange = false;
        segment += "]";
        continue;
      }

      if (inRange) {
        if (glob[i] == "\\") {
          segment += `\\\\`;
        } else {
          segment += glob[i];
        }

        continue;
      }

      if (glob[i] == ")" && groupStack.length > 0 && groupStack[groupStack.length - 1] != "BRACE") {
        segment += ")";
        const type = groupStack.pop();

        if (type == "!") {
          segment += wildcard;
        } else if (type != "@") {
          segment += type;
        }

        continue;
      }

      if (glob[i] == "|" && groupStack.length > 0 && groupStack[groupStack.length - 1] != "BRACE") {
        segment += "|";
        continue;
      }

      if (glob[i] == "+" && extended && glob[i + 1] == "(") {
        i++;
        groupStack.push("+");
        segment += "(?:";
        continue;
      }

      if (glob[i] == "@" && extended && glob[i + 1] == "(") {
        i++;
        groupStack.push("@");
        segment += "(?:";
        continue;
      }

      if (glob[i] == "?") {
        if (extended && glob[i + 1] == "(") {
          i++;
          groupStack.push("?");
          segment += "(?:";
        } else {
          segment += ".";
        }

        continue;
      }

      if (glob[i] == "!" && extended && glob[i + 1] == "(") {
        i++;
        groupStack.push("!");
        segment += "(?!";
        continue;
      }

      if (glob[i] == "{") {
        groupStack.push("BRACE");
        segment += "(?:";
        continue;
      }

      if (glob[i] == "}" && groupStack[groupStack.length - 1] == "BRACE") {
        groupStack.pop();
        segment += ")";
        continue;
      }

      if (glob[i] == "," && groupStack[groupStack.length - 1] == "BRACE") {
        segment += "|";
        continue;
      }

      if (glob[i] == "*") {
        if (extended && glob[i + 1] == "(") {
          i++;
          groupStack.push("*");
          segment += "(?:";
        } else {
          const prevChar = glob[i - 1];
          let numStars = 1;

          while (glob[i + 1] == "*") {
            i++;
            numStars++;
          }

          const nextChar = glob[i + 1];

          if (globstarOption && numStars == 2 && [...seps, undefined].includes(prevChar) && [...seps, undefined].includes(nextChar)) {
            segment += globstar;
            endsWithSep = true;
          } else {
            segment += wildcard;
          }
        }

        continue;
      }

      segment += regExpEscapeChars.includes(glob[i]) ? `\\${glob[i]}` : glob[i];
    } // Check for unclosed groups or a dangling backslash.


    if (groupStack.length > 0 || inRange || inEscape) {
      // Parse failure. Take all characters from this segment literally.
      segment = "";

      for (const c of glob.slice(j, i)) {
        segment += regExpEscapeChars.includes(c) ? `\\${c}` : c;
        endsWithSep = false;
      }
    }

    regExpString += segment;

    if (!endsWithSep) {
      regExpString += i < glob.length ? sep : sepMaybe;
      endsWithSep = true;
    } // Terminates with `i` at the start of the next segment.


    while (seps.includes(glob[i])) i++; // Check that the next value of `j` is indeed higher than the current value.


    if (!(i > j)) {
      throw new Error("Assertion failure: i > j (potential infinite loop)");
    }

    j = i;
  }

  regExpString = `^${regExpString}$`;
  return new RegExp(regExpString, caseInsensitive ? "i" : "");
}
/** Test whether the given string is a glob */

function isGlob(str) {
  const chars = {
    "{": "}",
    "(": ")",
    "[": "]"
  };
  const regex = /\\(.)|(^!|\*|\?|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\))/;

  if (str === "") {
    return false;
  }

  let match;

  while (match = regex.exec(str)) {
    if (match[2]) return true;
    let idx = match.index + match[0].length; // if an open bracket/brace/paren is escaped,
    // set the index to the next closing character

    const open = match[1];
    const close = open ? chars[open] : null;

    if (open && close) {
      const n = str.indexOf(close, idx);

      if (n !== -1) {
        idx = n + 1;
      }
    }

    str = str.slice(idx);
  }

  return false;
}
/** Like normalize(), but doesn't collapse "**\/.." when `globstar` is true. */

function normalizeGlob(glob, {
  globstar = false
} = {}) {
  if (glob.match(/\0/g)) {
    throw new Error(`Glob contains invalid characters: "${glob}"`);
  }

  if (!globstar) {
    return normalize$1(glob);
  }

  const s = SEP_PATTERN.source;
  const badParentPattern = new RegExp(`(?<=(${s}|^)\\*\\*${s})\\.\\.(?=${s}|$)`, "g");
  return normalize$1(glob.replace(badParentPattern, "\0")).replace(/\0/g, "..");
}
/** Like join(), but doesn't collapse "**\/.." when `globstar` is true. */

function joinGlobs(globs, {
  extended = false,
  globstar = false
} = {}) {
  if (!globstar || globs.length == 0) {
    return join$1(...globs);
  }

  if (globs.length === 0) return ".";
  let joined;

  for (const glob of globs) {
    const path = glob;

    if (path.length > 0) {
      if (!joined) joined = path;else joined += `${SEP}${path}`;
    }
  }

  if (!joined) return ".";
  return normalizeGlob(joined, {
    extended,
    globstar
  });
}

// Copyright the Browserify authors. MIT License.
const path$1 = isWindows ? _win32 : _posix;
const win32 = _win32;
const posix = _posix;
const {
  basename,
  delimiter,
  dirname,
  extname,
  format: format$1,
  fromFileUrl,
  isAbsolute,
  join,
  normalize,
  parse: parse$3,
  relative,
  resolve,
  sep,
  toFileUrl,
  toNamespacedPath
} = path$1;

var m$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  win32: win32,
  posix: posix,
  basename: basename,
  delimiter: delimiter,
  dirname: dirname,
  extname: extname,
  format: format$1,
  fromFileUrl: fromFileUrl,
  isAbsolute: isAbsolute,
  join: join,
  normalize: normalize,
  parse: parse$3,
  relative: relative,
  resolve: resolve,
  sep: sep,
  toFileUrl: toFileUrl,
  toNamespacedPath: toNamespacedPath,
  SEP: SEP,
  SEP_PATTERN: SEP_PATTERN,
  common: common,
  globToRegExp: globToRegExp,
  isGlob: isGlob,
  normalizeGlob: normalizeGlob,
  joinGlobs: joinGlobs
});

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
var path = { ...m$2
};

// Copyright Joyent, Inc. and other Node contributors.
const forwardSlashRegEx = /\//g;
const percentRegEx = /%/g;
const backslashRegEx = /\\/g;
const newlineRegEx = /\n/g;
const carriageReturnRegEx = /\r/g;
const tabRegEx = /\t/g;
const _url = URL;
/**
 * The URL object has both a `toString()` method and `href` property that return string serializations of the URL.
 * These are not, however, customizable in any way.
 * This method allows for basic customization of the output.
 * @param urlObject
 * @param options
 * @param options.auth `true` if the serialized URL string should include the username and password, `false` otherwise. **Default**: `true`.
 * @param options.fragment `true` if the serialized URL string should include the fragment, `false` otherwise. **Default**: `true`.
 * @param options.search `true` if the serialized URL string should include the search query, **Default**: `true`.
 * @param options.unicode `true` if Unicode characters appearing in the host component of the URL string should be encoded directly as opposed to being Punycode encoded. **Default**: `false`.
 * @returns a customizable serialization of a URL `String` representation of a `WHATWG URL` object.
 */

function format(urlObject, options) {
  if (options) {
    if (typeof options !== "object") {
      throw new ERR_INVALID_ARG_TYPE("options", "object", options);
    }
  }

  options = {
    auth: true,
    fragment: true,
    search: true,
    unicode: false,
    ...options
  };
  let ret = urlObject.protocol;

  if (urlObject.host !== null) {
    ret += "//";
    const hasUsername = urlObject.username !== "";
    const hasPassword = urlObject.password !== "";

    if (options.auth && (hasUsername || hasPassword)) {
      if (hasUsername) {
        ret += urlObject.username;
      }

      if (hasPassword) {
        ret += `:${urlObject.password}`;
      }

      ret += "@";
    } // TODO(wafuwfu13): Support unicode option
    // ret += options.unicode ?
    //   domainToUnicode(urlObject.host) : urlObject.host;


    ret += urlObject.host;

    if (urlObject.port) {
      ret += `:${urlObject.port}`;
    }
  }

  ret += urlObject.pathname;

  if (options.search) {
    ret += urlObject.search;
  }

  if (options.fragment) {
    ret += urlObject.hash;
  }

  return ret;
}
/**
 * Get fully resolved platform-specific file path from the given URL string/ object
 * @param path The file URL string or URL object to convert to a path
 */

function fileURLToPath(path) {
  if (typeof path === "string") path = new URL(path);else if (!(path instanceof URL)) {
    throw new ERR_INVALID_ARG_TYPE("path", ["string", "URL"], path);
  }

  if (path.protocol !== "file:") {
    throw new ERR_INVALID_URL_SCHEME("file");
  }

  return isWindows ? getPathFromURLWin(path) : getPathFromURLPosix(path);
}

function getPathFromURLWin(url) {
  const hostname = url.hostname;
  let pathname = url.pathname;

  for (let n = 0; n < pathname.length; n++) {
    if (pathname[n] === "%") {
      const third = pathname.codePointAt(n + 2) | 0x20;

      if (pathname[n + 1] === "2" && third === 102 || // 2f 2F /
      pathname[n + 1] === "5" && third === 99 // 5c 5C \
      ) {
        throw new ERR_INVALID_FILE_URL_PATH("must not include encoded \\ or / characters");
      }
    }
  }

  pathname = pathname.replace(forwardSlashRegEx, "\\");
  pathname = decodeURIComponent(pathname);

  if (hostname !== "") {
    // TODO(bartlomieju): add support for punycode encodings
    return `\\\\${hostname}${pathname}`;
  } else {
    // Otherwise, it's a local path that requires a drive letter
    const letter = pathname.codePointAt(1) | 0x20;
    const sep = pathname[2];

    if (letter < CHAR_LOWERCASE_A || letter > CHAR_LOWERCASE_Z || // a..z A..Z
    sep !== ":") {
      throw new ERR_INVALID_FILE_URL_PATH("must be absolute");
    }

    return pathname.slice(1);
  }
}

function getPathFromURLPosix(url) {
  if (url.hostname !== "") {
    throw new ERR_INVALID_FILE_URL_HOST(osType);
  }

  const pathname = url.pathname;

  for (let n = 0; n < pathname.length; n++) {
    if (pathname[n] === "%") {
      const third = pathname.codePointAt(n + 2) | 0x20;

      if (pathname[n + 1] === "2" && third === 102) {
        throw new ERR_INVALID_FILE_URL_PATH("must not include encoded / characters");
      }
    }
  }

  return decodeURIComponent(pathname);
}
/**
 *  The following characters are percent-encoded when converting from file path
 *  to URL:
 *  - %: The percent character is the only character not encoded by the
 *       `pathname` setter.
 *  - \: Backslash is encoded on non-windows platforms since it's a valid
 *       character but the `pathname` setters replaces it by a forward slash.
 *  - LF: The newline character is stripped out by the `pathname` setter.
 *        (See whatwg/url#419)
 *  - CR: The carriage return character is also stripped out by the `pathname`
 *        setter.
 *  - TAB: The tab character is also stripped out by the `pathname` setter.
 */


function encodePathChars(filepath) {
  if (filepath.includes("%")) {
    filepath = filepath.replace(percentRegEx, "%25");
  } // In posix, backslash is a valid character in paths:


  if (!isWindows && filepath.includes("\\")) {
    filepath = filepath.replace(backslashRegEx, "%5C");
  }

  if (filepath.includes("\n")) {
    filepath = filepath.replace(newlineRegEx, "%0A");
  }

  if (filepath.includes("\r")) {
    filepath = filepath.replace(carriageReturnRegEx, "%0D");
  }

  if (filepath.includes("\t")) {
    filepath = filepath.replace(tabRegEx, "%09");
  }

  return filepath;
}
/**
 * Get fully resolved platform-specific File URL from the given file path
 * @param filepath The file path string to convert to a file URL
 */


function pathToFileURL(filepath) {
  const outURL = new URL("file://");

  if (isWindows && filepath.startsWith("\\\\")) {
    // UNC path format: \\server\share\resource
    const paths = filepath.split("\\");

    if (paths.length <= 3) {
      throw new ERR_INVALID_ARG_VALUE("filepath", filepath, "Missing UNC resource path");
    }

    const hostname = paths[2];

    if (hostname.length === 0) {
      throw new ERR_INVALID_ARG_VALUE("filepath", filepath, "Empty UNC servername");
    } // TODO(wafuwafu13): To be `outURL.hostname = domainToASCII(hostname)` once `domainToASCII` are implemented


    outURL.hostname = hostname;
    outURL.pathname = encodePathChars(paths.slice(3).join("/"));
  } else {
    let resolved = resolve(filepath); // path.resolve strips trailing slashes so we must add them back

    const filePathLast = filepath.charCodeAt(filepath.length - 1);

    if ((filePathLast === CHAR_FORWARD_SLASH || isWindows && filePathLast === CHAR_BACKWARD_SLASH) && resolved[resolved.length - 1] !== sep) {
      resolved += "/";
    }

    outURL.pathname = encodePathChars(resolved);
  }

  return outURL;
}
var url = {
  format,
  fileURLToPath,
  pathToFileURL,
  URL
};

// Copyright Node.js contributors. All rights reserved. MIT License.
/**
 * @see https://github.com/nodejs/node/blob/f3eb224/lib/internal/errors.js
 */

const classRegExp = /^([A-Z][a-z0-9]*)+$/;
/**
 * @see https://github.com/nodejs/node/blob/f3eb224/lib/internal/errors.js
 * @description Sorted by a rough estimate on most frequently used entries.
 */

const kTypes = ["string", "function", "number", "object", // Accept 'Function' and 'Object' as alternative to the lower cased version.
"Function", "Object", "boolean", "bigint", "symbol"];
const nodeInternalPrefix = "__node_internal_"; // deno-lint-ignore no-explicit-any

/** This function removes unnecessary frames from Node.js core errors. */
function hideStackFrames(fn) {
  // We rename the functions that will be hidden to cut off the stacktrace
  // at the outermost one.
  const hidden = nodeInternalPrefix + fn.name;
  Object.defineProperty(fn, "name", {
    value: hidden
  });
  return fn;
}
const captureLargerStackTrace = hideStackFrames(function captureLargerStackTrace(err) {
  Error.captureStackTrace(err);
  return err;
});

/**
 * This creates an error compatible with errors produced in the C++
 * This function should replace the deprecated
 * `exceptionWithHostPort()` function.
 *
 * @param err A libuv error number
 * @param syscall
 * @param address
 * @param port
 * @return The error.
 */
hideStackFrames(function uvExceptionWithHostPort(err, syscall, address, port) {
  const {
    0: code,
    1: uvmsg
  } = uvErrmapGet(err) || uvUnmappedError;
  const message = `${syscall} ${code}: ${uvmsg}`;
  let details = "";

  if (port && port > 0) {
    details = ` ${address}:${port}`;
  } else if (address) {
    details = ` ${address}`;
  } // deno-lint-ignore no-explicit-any


  const ex = new Error(`${message}${details}`);
  ex.code = code;
  ex.errno = err;
  ex.syscall = syscall;
  ex.address = address;

  if (port) {
    ex.port = port;
  }

  return captureLargerStackTrace(ex);
});
/**
 * This used to be `util._errnoException()`.
 *
 * @param err A libuv error number
 * @param syscall
 * @param original
 * @return A `ErrnoException`
 */

hideStackFrames(function errnoException(err, syscall, original) {
  const code = getSystemErrorName(err);
  const message = original ? `${syscall} ${code} ${original}` : `${syscall} ${code}`; // deno-lint-ignore no-explicit-any

  const ex = new Error(message);
  ex.errno = err;
  ex.code = code;
  ex.syscall = syscall;
  return captureLargerStackTrace(ex);
});

function uvErrmapGet(name) {
  return errorMap.get(name);
}

const uvUnmappedError = ["UNKNOWN", "unknown error"];
/**
 * This creates an error compatible with errors produced in the C++
 * function UVException using a context object with data assembled in C++.
 * The goal is to migrate them to ERR_* errors later when compatibility is
 * not a concern.
 *
 * @param ctx
 * @return The error.
 */

hideStackFrames(function uvException(ctx) {
  const {
    0: code,
    1: uvmsg
  } = uvErrmapGet(ctx.errno) || uvUnmappedError;
  let message = `${code}: ${ctx.message || uvmsg}, ${ctx.syscall}`;
  let path;
  let dest;

  if (ctx.path) {
    path = ctx.path.toString();
    message += ` '${path}'`;
  }

  if (ctx.dest) {
    dest = ctx.dest.toString();
    message += ` -> '${dest}'`;
  } // deno-lint-ignore no-explicit-any


  const err = new Error(message);

  for (const prop of Object.keys(ctx)) {
    if (prop === "message" || prop === "path" || prop === "dest") {
      continue;
    }

    err[prop] = ctx[prop];
  }

  err.code = code;

  if (path) {
    err.path = path;
  }

  if (dest) {
    err.dest = dest;
  }

  return captureLargerStackTrace(err);
});
/**
 * Deprecated, new function is `uvExceptionWithHostPort()`
 * New function added the error description directly
 * from C++. this method for backwards compatibility
 * @param err A libuv error number
 * @param syscall
 * @param address
 * @param port
 * @param additional
 */

hideStackFrames(function exceptionWithHostPort(err, syscall, address, port, additional) {
  const code = getSystemErrorName(err);
  let details = "";

  if (port && port > 0) {
    details = ` ${address}:${port}`;
  } else if (address) {
    details = ` ${address}`;
  }

  if (additional) {
    details += ` - Local (${additional})`;
  } // deno-lint-ignore no-explicit-any


  const ex = new Error(`${syscall} ${code}${details}`);
  ex.errno = err;
  ex.code = code;
  ex.syscall = syscall;
  ex.address = address;

  if (port) {
    ex.port = port;
  }

  return captureLargerStackTrace(ex);
});
/**
 * @param code A libuv error number or a c-ares error code
 * @param syscall
 * @param hostname
 */

hideStackFrames(function (code, syscall, hostname) {
  let errno; // If `code` is of type number, it is a libuv error number, else it is a
  // c-ares error code.

  if (typeof code === "number") {
    errno = code; // ENOTFOUND is not a proper POSIX error, but this error has been in place
    // long enough that it's not practical to remove it.

    if (code === codeMap.get("EAI_NODATA") || code === codeMap.get("EAI_NONAME")) {
      code = "ENOTFOUND"; // Fabricated error name.
    } else {
      code = getSystemErrorName(code);
    }
  }

  const message = `${syscall} ${code}${hostname ? ` ${hostname}` : ""}`; // deno-lint-ignore no-explicit-any

  const ex = new Error(message);
  ex.errno = errno;
  ex.code = code;
  ex.syscall = syscall;

  if (hostname) {
    ex.hostname = hostname;
  }

  return captureLargerStackTrace(ex);
});
/**
 * All error instances in Node have additional methods and properties
 * This export class is meant to be extended by these instances abstracting native JS error instances
 */

class NodeErrorAbstraction extends Error {
  constructor(name, code, message) {
    super(message);
    this.code = code;
    this.name = name; //This number changes depending on the name of this class
    //20 characters as of now

    this.stack = this.stack && `${name} [${this.code}]${this.stack.slice(20)}`;
  }

  toString() {
    return `${this.name} [${this.code}]: ${this.message}`;
  }

}
class NodeError extends NodeErrorAbstraction {
  constructor(code, message) {
    super(Error.prototype.name, code, message);
  }

}
class NodeRangeError extends NodeErrorAbstraction {
  constructor(code, message) {
    super(RangeError.prototype.name, code, message);
    Object.setPrototypeOf(this, RangeError.prototype);
  }

}
class NodeTypeError extends NodeErrorAbstraction {
  constructor(code, message) {
    super(TypeError.prototype.name, code, message);
    Object.setPrototypeOf(this, TypeError.prototype);
  }

}
class ERR_INVALID_ARG_TYPE extends NodeTypeError {
  constructor(name, expected, actual) {
    // https://github.com/nodejs/node/blob/f3eb224/lib/internal/errors.js#L1037-L1087
    expected = Array.isArray(expected) ? expected : [expected];
    let msg = "The ";

    if (name.endsWith(" argument")) {
      // For cases like 'first argument'
      msg += `${name} `;
    } else {
      const type = name.includes(".") ? "property" : "argument";
      msg += `"${name}" ${type} `;
    }

    msg += "must be ";
    const types = [];
    const instances = [];
    const other = [];

    for (const value of expected) {
      if (kTypes.includes(value)) {
        types.push(value.toLocaleLowerCase());
      } else if (classRegExp.test(value)) {
        instances.push(value);
      } else {
        other.push(value);
      }
    } // Special handle `object` in case other instances are allowed to outline
    // the differences between each other.


    if (instances.length > 0) {
      const pos = types.indexOf("object");

      if (pos !== -1) {
        types.splice(pos, 1);
        instances.push("Object");
      }
    }

    if (types.length > 0) {
      if (types.length > 2) {
        const last = types.pop();
        msg += `one of type ${types.join(", ")}, or ${last}`;
      } else if (types.length === 2) {
        msg += `one of type ${types[0]} or ${types[1]}`;
      } else {
        msg += `of type ${types[0]}`;
      }

      if (instances.length > 0 || other.length > 0) {
        msg += " or ";
      }
    }

    if (instances.length > 0) {
      if (instances.length > 2) {
        const last = instances.pop();
        msg += `an instance of ${instances.join(", ")}, or ${last}`;
      } else {
        msg += `an instance of ${instances[0]}`;

        if (instances.length === 2) {
          msg += ` or ${instances[1]}`;
        }
      }

      if (other.length > 0) {
        msg += " or ";
      }
    }

    if (other.length > 0) {
      if (other.length > 2) {
        const last = other.pop();
        msg += `one of ${other.join(", ")}, or ${last}`;
      } else if (other.length === 2) {
        msg += `one of ${other[0]} or ${other[1]}`;
      } else {
        if (other[0].toLowerCase() !== other[0]) {
          msg += "an ";
        }

        msg += `${other[0]}`;
      }
    }

    super("ERR_INVALID_ARG_TYPE", `${msg}.${invalidArgTypeHelper(actual)}`);
  }

}
class ERR_INVALID_ARG_VALUE extends NodeTypeError {
  constructor(name, value, reason = "is invalid") {
    const type = name.includes(".") ? "property" : "argument";
    const inspected = inspect(value);
    super("ERR_INVALID_ARG_VALUE", `The ${type} '${name}' ${reason}. Received ${inspected}`);
  }

} // A helper function to simplify checking for ERR_INVALID_ARG_TYPE output.
// deno-lint-ignore no-explicit-any

function invalidArgTypeHelper(input) {
  if (input == null) {
    return ` Received ${input}`;
  }

  if (typeof input === "function" && input.name) {
    return ` Received function ${input.name}`;
  }

  if (typeof input === "object") {
    if (input.constructor && input.constructor.name) {
      return ` Received an instance of ${input.constructor.name}`;
    }

    return ` Received ${inspect(input, {
      depth: -1
    })}`;
  }

  let inspected = inspect(input, {
    colors: false
  });

  if (inspected.length > 25) {
    inspected = `${inspected.slice(0, 25)}...`;
  }

  return ` Received type ${typeof input} (${inspected})`;
}

class ERR_OUT_OF_RANGE extends RangeError {
  code = "ERR_OUT_OF_RANGE";

  constructor(str, range, received) {
    super(`The value of "${str}" is out of range. It must be ${range}. Received ${received}`);
    const {
      name
    } = this; // Add the error code to the name to include it in the stack trace.

    this.name = `${name} [${this.code}]`; // Access the stack to generate the error message including the error code from the name.

    this.stack; // Reset the name to the actual name.

    this.name = name;
  }

}
class ERR_AMBIGUOUS_ARGUMENT extends NodeTypeError {
  constructor(x, y) {
    super("ERR_AMBIGUOUS_ARGUMENT", `The "${x}" argument is ambiguous. ${y}`);
  }

}
class ERR_BUFFER_OUT_OF_BOUNDS extends NodeRangeError {
  constructor(name) {
    super("ERR_BUFFER_OUT_OF_BOUNDS", name ? `"${name}" is outside of buffer bounds` : "Attempt to access memory outside buffer bounds");
  }

}
class ERR_INVALID_CALLBACK extends NodeTypeError {
  constructor(object) {
    super("ERR_INVALID_CALLBACK", `Callback must be a function. Received ${inspect(object)}`);
  }

}
class ERR_INVALID_FILE_URL_HOST extends NodeTypeError {
  constructor(x) {
    super("ERR_INVALID_FILE_URL_HOST", `File URL host must be "localhost" or empty on ${x}`);
  }

}
class ERR_INVALID_FILE_URL_PATH extends NodeTypeError {
  constructor(x) {
    super("ERR_INVALID_FILE_URL_PATH", `File URL path ${x}`);
  }

}
class ERR_INVALID_OPT_VALUE_ENCODING extends NodeTypeError {
  constructor(x) {
    super("ERR_INVALID_OPT_VALUE_ENCODING", `The value "${x}" is invalid for option "encoding"`);
  }

}
class ERR_METHOD_NOT_IMPLEMENTED extends NodeError {
  constructor(x) {
    super("ERR_METHOD_NOT_IMPLEMENTED", `The ${x} method is not implemented`);
  }

}
class ERR_MISSING_ARGS extends NodeTypeError {
  constructor(...args) {
    let msg = "The ";
    const len = args.length;

    const wrap = a => `"${a}"`;

    args = args.map(a => Array.isArray(a) ? a.map(wrap).join(" or ") : wrap(a));

    switch (len) {
      case 1:
        msg += `${args[0]} argument`;
        break;

      case 2:
        msg += `${args[0]} and ${args[1]} arguments`;
        break;

      default:
        msg += args.slice(0, len - 1).join(", ");
        msg += `, and ${args[len - 1]} arguments`;
        break;
    }

    super("ERR_MISSING_ARGS", `${msg} must be specified`);
  }

}
class ERR_MULTIPLE_CALLBACK extends NodeError {
  constructor() {
    super("ERR_MULTIPLE_CALLBACK", `Callback called multiple times`);
  }

}
class ERR_STREAM_ALREADY_FINISHED extends NodeError {
  constructor(x) {
    super("ERR_STREAM_ALREADY_FINISHED", `Cannot call ${x} after a stream was finished`);
  }

}
class ERR_STREAM_CANNOT_PIPE extends NodeError {
  constructor() {
    super("ERR_STREAM_CANNOT_PIPE", `Cannot pipe, not readable`);
  }

}
class ERR_STREAM_DESTROYED extends NodeError {
  constructor(x) {
    super("ERR_STREAM_DESTROYED", `Cannot call ${x} after a stream was destroyed`);
  }

}
class ERR_STREAM_NULL_VALUES extends NodeTypeError {
  constructor() {
    super("ERR_STREAM_NULL_VALUES", `May not write null values to stream`);
  }

}
class ERR_STREAM_PREMATURE_CLOSE extends NodeError {
  constructor() {
    super("ERR_STREAM_PREMATURE_CLOSE", `Premature close`);
  }

}
class ERR_STREAM_PUSH_AFTER_EOF extends NodeError {
  constructor() {
    super("ERR_STREAM_PUSH_AFTER_EOF", `stream.push() after EOF`);
  }

}
class ERR_STREAM_UNSHIFT_AFTER_END_EVENT extends NodeError {
  constructor() {
    super("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", `stream.unshift() after end event`);
  }

}
class ERR_STREAM_WRITE_AFTER_END extends NodeError {
  constructor() {
    super("ERR_STREAM_WRITE_AFTER_END", `write after end`);
  }

}
class ERR_UNKNOWN_ENCODING extends NodeTypeError {
  constructor(x) {
    super("ERR_UNKNOWN_ENCODING", `Unknown encoding: ${x}`);
  }

}
class ERR_INVALID_OPT_VALUE extends NodeTypeError {
  constructor(name, value) {
    super("ERR_INVALID_OPT_VALUE", `The value "${value}" is invalid for option "${name}"`);
  }

}

function buildReturnPropertyType(value) {
  if (value && value.constructor && value.constructor.name) {
    return `instance of ${value.constructor.name}`;
  } else {
    return `type ${typeof value}`;
  }
}
class ERR_INVALID_RETURN_VALUE extends NodeTypeError {
  constructor(input, name, value) {
    super("ERR_INVALID_RETURN_VALUE", `Expected ${input} to be returned from the "${name}" function but got ${buildReturnPropertyType(value)}.`);
  }

}
class ERR_INVALID_URL_SCHEME extends NodeTypeError {
  constructor(expected) {
    expected = Array.isArray(expected) ? expected : [expected];
    const res = expected.length === 2 ? `one of scheme ${expected[0]} or ${expected[1]}` : `of scheme ${expected[0]}`;
    super("ERR_INVALID_URL_SCHEME", `The URL must be ${res}`);
  }

}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.

function ensureArray(maybeArray) {
  return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
} // deno-lint-ignore no-explicit-any


function createIterResult$1(value, done) {
  return {
    value,
    done
  };
}

let defaultMaxListeners = 10;

function validateMaxListeners(n, name) {
  if (!Number.isInteger(n) || Number.isNaN(n) || n < 0) {
    throw new ERR_OUT_OF_RANGE(name, "a non-negative number", inspect(n));
  }
}

function setMaxListeners(n, ...eventTargets) {
  validateMaxListeners(n, "n");

  if (eventTargets.length === 0) {
    defaultMaxListeners = n;
  } else {
    for (const target of eventTargets) {
      if (target instanceof EventEmitter) {
        target.setMaxListeners(n);
      } else if (target instanceof EventTarget) {
        notImplemented("setMaxListeners currently does not support EventTarget");
      } else {
        throw new ERR_INVALID_ARG_TYPE("eventTargets", ["EventEmitter", "EventTarget"], target);
      }
    }
  }
}
/**
 * See also https://nodejs.org/api/events.html
 */


class EventEmitter {
  static captureRejectionSymbol = Symbol.for("nodejs.rejection");
  static errorMonitor = Symbol("events.errorMonitor");

  static get defaultMaxListeners() {
    return defaultMaxListeners;
  }

  static set defaultMaxListeners(value) {
    validateMaxListeners(value, "defaultMaxListeners");
    defaultMaxListeners = value;
  }

  static #init(emitter) {
    if (emitter._events == null || emitter._events === Object.getPrototypeOf(emitter)._events // If `emitter` does not own `_events` but the prototype does
    ) {
      emitter._events = Object.create(null);
    }
  }
  /**
   * Overrides `call` to mimic the es5 behavior with the es6 class.
   */
  // deno-lint-ignore no-explicit-any


  static call = function call(thisArg) {
    EventEmitter.#init(thisArg);
  };

  constructor() {
    EventEmitter.#init(this);
  }

  _addListener(eventName, listener, prepend) {
    this.checkListenerArgument(listener);
    this.emit("newListener", eventName, this.unwrapListener(listener));

    if (this.hasListeners(eventName)) {
      let listeners = this._events[eventName];

      if (!Array.isArray(listeners)) {
        listeners = [listeners];
        this._events[eventName] = listeners;
      }

      if (prepend) {
        listeners.unshift(listener);
      } else {
        listeners.push(listener);
      }
    } else if (this._events) {
      this._events[eventName] = listener;
    } else {
      EventEmitter.#init(this);
      this._events[eventName] = listener;
    }

    const max = this.getMaxListeners();

    if (max > 0 && this.listenerCount(eventName) > max) {
      const warning = new MaxListenersExceededWarning(this, eventName);
      this.warnIfNeeded(eventName, warning);
    }

    return this;
  }
  /** Alias for emitter.on(eventName, listener). */


  addListener(eventName, listener) {
    return this._addListener(eventName, listener, false);
  }
  /**
   * Synchronously calls each of the listeners registered for the event named
   * eventName, in the order they were registered, passing the supplied
   * arguments to each.
   * @return true if the event had listeners, false otherwise
   */
  // deno-lint-ignore no-explicit-any


  emit(eventName, ...args) {
    if (this.hasListeners(eventName)) {
      if (eventName === "error" && this.hasListeners(EventEmitter.errorMonitor)) {
        this.emit(EventEmitter.errorMonitor, ...args);
      }

      const listeners = ensureArray(this._events[eventName]).slice(); // We copy with slice() so array is not mutated during emit

      for (const listener of listeners) {
        try {
          listener.apply(this, args);
        } catch (err) {
          this.emit("error", err);
        }
      }

      return true;
    } else if (eventName === "error") {
      if (this.hasListeners(EventEmitter.errorMonitor)) {
        this.emit(EventEmitter.errorMonitor, ...args);
      }

      const errMsg = args.length > 0 ? args[0] : Error("Unhandled error.");
      throw errMsg;
    }

    return false;
  }
  /**
   * Returns an array listing the events for which the emitter has
   * registered listeners.
   */


  eventNames() {
    return Reflect.ownKeys(this._events);
  }
  /**
   * Returns the current max listener value for the EventEmitter which is
   * either set by emitter.setMaxListeners(n) or defaults to
   * EventEmitter.defaultMaxListeners.
   */


  getMaxListeners() {
    return this.maxListeners == null ? EventEmitter.defaultMaxListeners : this.maxListeners;
  }
  /**
   * Returns the number of listeners listening to the event named
   * eventName.
   */


  listenerCount(eventName) {
    if (this.hasListeners(eventName)) {
      const maybeListeners = this._events[eventName];
      return Array.isArray(maybeListeners) ? maybeListeners.length : 1;
    } else {
      return 0;
    }
  }

  static listenerCount(emitter, eventName) {
    return emitter.listenerCount(eventName);
  }

  _listeners(target, eventName, unwrap) {
    if (!target.hasListeners(eventName)) {
      return [];
    }

    const eventListeners = target._events[eventName];

    if (Array.isArray(eventListeners)) {
      return unwrap ? this.unwrapListeners(eventListeners) : eventListeners.slice(0);
    } else {
      return [unwrap ? this.unwrapListener(eventListeners) : eventListeners];
    }
  }

  unwrapListeners(arr) {
    const unwrappedListeners = new Array(arr.length);

    for (let i = 0; i < arr.length; i++) {
      unwrappedListeners[i] = this.unwrapListener(arr[i]);
    }

    return unwrappedListeners;
  }

  unwrapListener(listener) {
    return listener["listener"] ?? listener;
  }
  /** Returns a copy of the array of listeners for the event named eventName.*/


  listeners(eventName) {
    return this._listeners(this, eventName, true);
  }
  /**
   * Returns a copy of the array of listeners for the event named eventName,
   * including any wrappers (such as those created by .once()).
   */


  rawListeners(eventName) {
    return this._listeners(this, eventName, false);
  }
  /** Alias for emitter.removeListener(). */


  off( // deno-lint-ignore no-unused-vars
  eventName, // deno-lint-ignore no-unused-vars
  listener // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  ) {// The body of this method is empty because it will be overwritten by later code. (`EventEmitter.prototype.off = EventEmitter.prototype.removeListener;`)
    // The purpose of this dirty hack is to get around the current limitation of TypeScript type checking.
  }
  /**
   * Adds the listener function to the end of the listeners array for the event
   *  named eventName. No checks are made to see if the listener has already
   * been added. Multiple calls passing the same combination of eventName and
   * listener will result in the listener being added, and called, multiple
   * times.
   */


  on( // deno-lint-ignore no-unused-vars
  eventName, // deno-lint-ignore no-unused-vars
  listener // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  ) {// The body of this method is empty because it will be overwritten by later code. (`EventEmitter.prototype.addListener = EventEmitter.prototype.on;`)
    // The purpose of this dirty hack is to get around the current limitation of TypeScript type checking.
  }
  /**
   * Adds a one-time listener function for the event named eventName. The next
   * time eventName is triggered, this listener is removed and then invoked.
   */


  once(eventName, listener) {
    const wrapped = this.onceWrap(eventName, listener);
    this.on(eventName, wrapped);
    return this;
  } // Wrapped function that calls EventEmitter.removeListener(eventName, self) on execution.


  onceWrap(eventName, listener) {
    this.checkListenerArgument(listener);

    const wrapper = function ( // deno-lint-ignore no-explicit-any
    ...args) {
      // If `emit` is called in listeners, the same listener can be called multiple times.
      // To prevent that, check the flag here.
      if (this.isCalled) {
        return;
      }

      this.context.removeListener(this.eventName, this.listener);
      this.isCalled = true;
      return this.listener.apply(this.context, args);
    };

    const wrapperContext = {
      eventName: eventName,
      listener: listener,
      rawListener: wrapper,
      context: this
    };
    const wrapped = wrapper.bind(wrapperContext);
    wrapperContext.rawListener = wrapped;
    wrapped.listener = listener;
    return wrapped;
  }
  /**
   * Adds the listener function to the beginning of the listeners array for the
   *  event named eventName. No checks are made to see if the listener has
   * already been added. Multiple calls passing the same combination of
   * eventName and listener will result in the listener being added, and
   * called, multiple times.
   */


  prependListener(eventName, listener) {
    return this._addListener(eventName, listener, true);
  }
  /**
   * Adds a one-time listener function for the event named eventName to the
   * beginning of the listeners array. The next time eventName is triggered,
   * this listener is removed, and then invoked.
   */


  prependOnceListener(eventName, listener) {
    const wrapped = this.onceWrap(eventName, listener);
    this.prependListener(eventName, wrapped);
    return this;
  }
  /** Removes all listeners, or those of the specified eventName. */


  removeAllListeners(eventName) {
    if (this._events === undefined) {
      return this;
    }

    if (eventName) {
      if (this.hasListeners(eventName)) {
        const listeners = ensureArray(this._events[eventName]).slice().reverse();

        for (const listener of listeners) {
          this.removeListener(eventName, this.unwrapListener(listener));
        }
      }
    } else {
      const eventList = this.eventNames();
      eventList.forEach(eventName => {
        if (eventName === "removeListener") return;
        this.removeAllListeners(eventName);
      });
      this.removeAllListeners("removeListener");
    }

    return this;
  }
  /**
   * Removes the specified listener from the listener array for the event
   * named eventName.
   */


  removeListener(eventName, listener) {
    this.checkListenerArgument(listener);

    if (this.hasListeners(eventName)) {
      const maybeArr = this._events[eventName];
      assert(maybeArr);
      const arr = ensureArray(maybeArr);
      let listenerIndex = -1;

      for (let i = arr.length - 1; i >= 0; i--) {
        // arr[i]["listener"] is the reference to the listener inside a bound 'once' wrapper
        if (arr[i] == listener || arr[i] && arr[i]["listener"] == listener) {
          listenerIndex = i;
          break;
        }
      }

      if (listenerIndex >= 0) {
        arr.splice(listenerIndex, 1);

        if (arr.length === 0) {
          delete this._events[eventName];
        } else if (arr.length === 1) {
          // If there is only one listener, an array is not necessary.
          this._events[eventName] = arr[0];
        }

        if (this._events.removeListener) {
          this.emit("removeListener", eventName, listener);
        }
      }
    }

    return this;
  }
  /**
   * By default EventEmitters will print a warning if more than 10 listeners
   * are added for a particular event. This is a useful default that helps
   * finding memory leaks. Obviously, not all events should be limited to just
   * 10 listeners. The emitter.setMaxListeners() method allows the limit to be
   * modified for this specific EventEmitter instance. The value can be set to
   * Infinity (or 0) to indicate an unlimited number of listeners.
   */


  setMaxListeners(n) {
    if (n !== Infinity) {
      validateMaxListeners(n, "n");
    }

    this.maxListeners = n;
    return this;
  }
  /**
   * Creates a Promise that is fulfilled when the EventEmitter emits the given
   * event or that is rejected when the EventEmitter emits 'error'. The Promise
   * will resolve with an array of all the arguments emitted to the given event.
   */


  static once(emitter, name // deno-lint-ignore no-explicit-any
  ) {
    return new Promise((resolve, reject) => {
      if (emitter instanceof EventTarget) {
        // EventTarget does not have `error` event semantics like Node
        // EventEmitters, we do not listen to `error` events here.
        emitter.addEventListener(name, (...args) => {
          resolve(args);
        }, {
          once: true,
          passive: false,
          capture: false
        });
        return;
      } else if (emitter instanceof EventEmitter) {
        // deno-lint-ignore no-explicit-any
        const eventListener = (...args) => {
          if (errorListener !== undefined) {
            emitter.removeListener("error", errorListener);
          }

          resolve(args);
        };

        let errorListener; // Adding an error listener is not optional because
        // if an error is thrown on an event emitter we cannot
        // guarantee that the actual event we are waiting will
        // be fired. The result could be a silent way to create
        // memory or file descriptor leaks, which is something
        // we should avoid.

        if (name !== "error") {
          // deno-lint-ignore no-explicit-any
          errorListener = err => {
            emitter.removeListener(name, eventListener);
            reject(err);
          };

          emitter.once("error", errorListener);
        }

        emitter.once(name, eventListener);
        return;
      }
    });
  }
  /**
   * Returns an AsyncIterator that iterates eventName events. It will throw if
   * the EventEmitter emits 'error'. It removes all listeners when exiting the
   * loop. The value returned by each iteration is an array composed of the
   * emitted event arguments.
   */


  static on(emitter, event) {
    // deno-lint-ignore no-explicit-any
    const unconsumedEventValues = []; // deno-lint-ignore no-explicit-any

    const unconsumedPromises = [];
    let error = null;
    let finished = false;
    const iterator = {
      // deno-lint-ignore no-explicit-any
      next() {
        // First, we consume all unread events
        // deno-lint-ignore no-explicit-any
        const value = unconsumedEventValues.shift();

        if (value) {
          return Promise.resolve(createIterResult$1(value, false));
        } // Then we error, if an error happened
        // This happens one time if at all, because after 'error'
        // we stop listening


        if (error) {
          const p = Promise.reject(error); // Only the first element errors

          error = null;
          return p;
        } // If the iterator is finished, resolve to done


        if (finished) {
          return Promise.resolve(createIterResult$1(undefined, true));
        } // Wait until an event happens


        return new Promise(function (resolve, reject) {
          unconsumedPromises.push({
            resolve,
            reject
          });
        });
      },

      // deno-lint-ignore no-explicit-any
      return() {
        emitter.removeListener(event, eventHandler);
        emitter.removeListener("error", errorHandler);
        finished = true;

        for (const promise of unconsumedPromises) {
          promise.resolve(createIterResult$1(undefined, true));
        }

        return Promise.resolve(createIterResult$1(undefined, true));
      },

      throw(err) {
        error = err;
        emitter.removeListener(event, eventHandler);
        emitter.removeListener("error", errorHandler);
      },

      // deno-lint-ignore no-explicit-any
      [Symbol.asyncIterator]() {
        return this;
      }

    };
    emitter.on(event, eventHandler);
    emitter.on("error", errorHandler);
    return iterator; // deno-lint-ignore no-explicit-any

    function eventHandler(...args) {
      const promise = unconsumedPromises.shift();

      if (promise) {
        promise.resolve(createIterResult$1(args, false));
      } else {
        unconsumedEventValues.push(args);
      }
    } // deno-lint-ignore no-explicit-any


    function errorHandler(err) {
      finished = true;
      const toError = unconsumedPromises.shift();

      if (toError) {
        toError.reject(err);
      } else {
        // The next time we call next()
        error = err;
      }

      iterator.return();
    }
  }

  checkListenerArgument(listener) {
    if (typeof listener !== "function") {
      throw new ERR_INVALID_ARG_TYPE("listener", "function", listener);
    }
  }

  warnIfNeeded(eventName, warning) {
    const listeners = this._events[eventName];

    if (listeners.warned) {
      return;
    }

    listeners.warned = true;
    console.warn(warning); // TODO(uki00a): Here are two problems:
    // * If `global.ts` is not imported, then `globalThis.process` will be undefined.
    // * Importing `process.ts` from this file will result in circular reference.
    // As a workaround, explicitly check for the existence of `globalThis.process`.
    // deno-lint-ignore no-explicit-any

    const maybeProcess = globalThis.process;

    if (maybeProcess instanceof EventEmitter) {
      maybeProcess.emit("warning", warning);
    }
  }

  hasListeners(eventName) {
    return this._events && Boolean(this._events[eventName]);
  }

} // EventEmitter#on should point to the same function as EventEmitter#addListener.

EventEmitter.prototype.on = EventEmitter.prototype.addListener; // EventEmitter#off should point to the same function as EventEmitter#removeListener.

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

class MaxListenersExceededWarning extends Error {
  constructor(emitter, type) {
    const listenerCount = emitter.listenerCount(type);
    const message = "Possible EventEmitter memory leak detected. " + `${listenerCount} ${type == null ? "null" : type.toString()} listeners added to [${emitter.constructor.name}]. ` + " Use emitter.setMaxListeners() to increase limit";
    super(message);
    this.emitter = emitter;
    this.type = type;
    this.count = listenerCount;
    this.name = "MaxListenersExceededWarning";
  }

}

var EventEmitter$1 = Object.assign(EventEmitter, {
  EventEmitter,
  setMaxListeners
});
const captureRejectionSymbol = EventEmitter.captureRejectionSymbol;
EventEmitter.errorMonitor;
EventEmitter.listenerCount;
EventEmitter.on;
const once = EventEmitter.once;

// Ported from Go
// https://github.com/golang/go/blob/go1.12.5/src/encoding/hex/hex.go
// Copyright 2009 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
const hexTable = new TextEncoder().encode("0123456789abcdef");

function errInvalidByte(byte) {
  return new TypeError(`Invalid byte '${String.fromCharCode(byte)}'`);
}

function errLength() {
  return new RangeError("Odd length hex string");
}
/** Converts a hex character into its value. */


function fromHexChar(byte) {
  // '0' <= byte && byte <= '9'
  if (48 <= byte && byte <= 57) return byte - 48; // 'a' <= byte && byte <= 'f'

  if (97 <= byte && byte <= 102) return byte - 97 + 10; // 'A' <= byte && byte <= 'F'

  if (65 <= byte && byte <= 70) return byte - 65 + 10;
  throw errInvalidByte(byte);
}
/** Encodes `src` into `src.length * 2` bytes. */


function encode$1(src) {
  const dst = new Uint8Array(src.length * 2);

  for (let i = 0; i < dst.length; i++) {
    const v = src[i];
    dst[i * 2] = hexTable[v >> 4];
    dst[i * 2 + 1] = hexTable[v & 0x0f];
  }

  return dst;
}
/**
 * Decodes `src` into `src.length / 2` bytes.
 * If the input is malformed, an error will be thrown.
 */

function decode$1(src) {
  const dst = new Uint8Array(src.length / 2);

  for (let i = 0; i < dst.length; i++) {
    const a = fromHexChar(src[i * 2]);
    const b = fromHexChar(src[i * 2 + 1]);
    dst[i] = a << 4 | b;
  }

  if (src.length % 2 == 1) {
    // Check for invalid char before reporting bad length,
    // since the invalid char (if present) is an earlier problem.
    fromHexChar(src[dst.length * 2]);
    throw errLength();
  }

  return dst;
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
const base64abc = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/"];
/**
 * CREDIT: https://gist.github.com/enepomnyaschih/72c423f727d395eeaa09697058238727
 * Encodes a given Uint8Array, ArrayBuffer or string into RFC4648 base64 representation
 * @param data
 */

function encode(data) {
  const uint8 = typeof data === "string" ? new TextEncoder().encode(data) : data instanceof Uint8Array ? data : new Uint8Array(data);
  let result = "",
      i;
  const l = uint8.length;

  for (i = 2; i < l; i += 3) {
    result += base64abc[uint8[i - 2] >> 2];
    result += base64abc[(uint8[i - 2] & 0x03) << 4 | uint8[i - 1] >> 4];
    result += base64abc[(uint8[i - 1] & 0x0f) << 2 | uint8[i] >> 6];
    result += base64abc[uint8[i] & 0x3f];
  }

  if (i === l + 1) {
    // 1 octet yet to write
    result += base64abc[uint8[i - 2] >> 2];
    result += base64abc[(uint8[i - 2] & 0x03) << 4];
    result += "==";
  }

  if (i === l) {
    // 2 octets yet to write
    result += base64abc[uint8[i - 2] >> 2];
    result += base64abc[(uint8[i - 2] & 0x03) << 4 | uint8[i - 1] >> 4];
    result += base64abc[(uint8[i - 1] & 0x0f) << 2];
    result += "=";
  }

  return result;
}
/**
 * Decodes a given RFC4648 base64 encoded string
 * @param b64
 */

function decode(b64) {
  const binString = atob(b64);
  const size = binString.length;
  const bytes = new Uint8Array(size);

  for (let i = 0; i < size; i++) {
    bytes[i] = binString.charCodeAt(i);
  }

  return bytes;
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
const notImplementedEncodings = ["ascii", "binary", "latin1", "ucs2", "utf16le"];

function checkEncoding(encoding = "utf8", strict = true) {
  if (typeof encoding !== "string" || strict && encoding === "") {
    if (!strict) return "utf8";
    throw new TypeError(`Unknown encoding: ${encoding}`);
  }

  const normalized = normalizeEncoding$1(encoding);

  if (normalized === undefined) {
    throw new TypeError(`Unknown encoding: ${encoding}`);
  }

  if (notImplementedEncodings.includes(encoding)) {
    notImplemented(`"${encoding}" encoding`);
  }

  return normalized;
}

// https://github.com/nodejs/node/blob/56dbe466fdbc598baea3bfce289bf52b97b8b8f7/lib/buffer.js#L598
const encodingOps = {
  utf8: {
    byteLength: string => new TextEncoder().encode(string).byteLength
  },
  ucs2: {
    byteLength: string => string.length * 2
  },
  utf16le: {
    byteLength: string => string.length * 2
  },
  latin1: {
    byteLength: string => string.length
  },
  ascii: {
    byteLength: string => string.length
  },
  base64: {
    byteLength: string => base64ByteLength(string, string.length)
  },
  hex: {
    byteLength: string => string.length >>> 1
  }
};

function base64ByteLength(str, bytes) {
  // Handle padding
  if (str.charCodeAt(bytes - 1) === 0x3d) bytes--;
  if (bytes > 1 && str.charCodeAt(bytes - 1) === 0x3d) bytes--; // Base64 ratio: 3/4

  return bytes * 3 >>> 2;
}
/**
 * See also https://nodejs.org/api/buffer.html
 */


class Buffer extends Uint8Array {
  /**
   * Allocates a new Buffer of size bytes.
   */
  static alloc(size, fill, encoding = "utf8") {
    if (typeof size !== "number") {
      throw new TypeError(`The "size" argument must be of type number. Received type ${typeof size}`);
    }

    const buf = new Buffer(size);
    if (size === 0) return buf;
    let bufFill;

    if (typeof fill === "string") {
      const clearEncoding = checkEncoding(encoding);

      if (typeof fill === "string" && fill.length === 1 && clearEncoding === "utf8") {
        buf.fill(fill.charCodeAt(0));
      } else bufFill = Buffer.from(fill, clearEncoding);
    } else if (typeof fill === "number") {
      buf.fill(fill);
    } else if (fill instanceof Uint8Array) {
      if (fill.length === 0) {
        throw new TypeError(`The argument "value" is invalid. Received ${fill.constructor.name} []`);
      }

      bufFill = fill;
    }

    if (bufFill) {
      if (bufFill.length > buf.length) {
        bufFill = bufFill.subarray(0, buf.length);
      }

      let offset = 0;

      while (offset < size) {
        buf.set(bufFill, offset);
        offset += bufFill.length;
        if (offset + bufFill.length >= size) break;
      }

      if (offset !== size) {
        buf.set(bufFill.subarray(0, size - offset), offset);
      }
    }

    return buf;
  }

  static allocUnsafe(size) {
    return new Buffer(size);
  }
  /**
   * Returns the byte length of a string when encoded. This is not the same as
   * String.prototype.length, which does not account for the encoding that is
   * used to convert the string into bytes.
   */


  static byteLength(string, encoding = "utf8") {
    if (typeof string != "string") return string.byteLength;
    encoding = normalizeEncoding$1(encoding) || "utf8";
    return encodingOps[encoding].byteLength(string);
  }
  /**
   * Returns a new Buffer which is the result of concatenating all the Buffer
   * instances in the list together.
   */


  static concat(list, totalLength) {
    if (totalLength == undefined) {
      totalLength = 0;

      for (const buf of list) {
        totalLength += buf.length;
      }
    }

    const buffer = Buffer.allocUnsafe(totalLength);
    let pos = 0;

    for (const item of list) {
      let buf;

      if (!(item instanceof Buffer)) {
        buf = Buffer.from(item);
      } else {
        buf = item;
      }

      buf.copy(buffer, pos);
      pos += buf.length;
    }

    return buffer;
  }
  /**
   * Allocates a new Buffer using an array of bytes in the range 0 – 255. Array
   * entries outside that range will be truncated to fit into it.
   */


  static from( // deno-lint-ignore no-explicit-any
  value, offsetOrEncoding, length) {
    const offset = typeof offsetOrEncoding === "string" ? undefined : offsetOrEncoding;
    let encoding = typeof offsetOrEncoding === "string" ? offsetOrEncoding : undefined;

    if (typeof value == "string") {
      encoding = checkEncoding(encoding, false);

      if (encoding === "hex") {
        return new Buffer(decode$1(new TextEncoder().encode(value)).buffer);
      }

      if (encoding === "base64") return new Buffer(decode(value).buffer);
      return new Buffer(new TextEncoder().encode(value).buffer);
    } // workaround for https://github.com/microsoft/TypeScript/issues/38446


    return new Buffer(value, offset, length);
  }
  /**
   * Returns true if obj is a Buffer, false otherwise.
   */


  static isBuffer(obj) {
    return obj instanceof Buffer;
  } // deno-lint-ignore no-explicit-any


  static isEncoding(encoding) {
    return typeof encoding === "string" && encoding.length !== 0 && normalizeEncoding$1(encoding) !== undefined;
  }

  boundsError(value, length, type) {
    if (Math.floor(value) !== value) {
      throw new ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
    }

    if (length < 0) throw new ERR_BUFFER_OUT_OF_BOUNDS();
    throw new ERR_OUT_OF_RANGE(type || "offset", `>= ${type ? 1 : 0} and <= ${length}`, value);
  }
  /**
   * Reads byteLength number of bytes from buf at the specified offset and interprets
   * the result as an unsigned big-endian integer supporting up to 48 bits of accuracy.
   */


  readUIntBE(offset = 0, byteLength) {
    if (byteLength === 3 || byteLength === 5 || byteLength === 6) {
      notImplemented(`byteLength ${byteLength}`);
    }

    if (byteLength === 4) return this.readUInt32BE(offset);
    if (byteLength === 2) return this.readUInt16BE(offset);
    if (byteLength === 1) return this.readUInt8(offset);
    this.boundsError(byteLength, 4, "byteLength");
  }
  /**
   * Reads byteLength number of bytes from buf at the specified offset and interprets
   * the result as an unsigned, little-endian integer supporting up to 48 bits of accuracy.
   */


  readUIntLE(offset = 0, byteLength) {
    if (byteLength === 3 || byteLength === 5 || byteLength === 6) {
      notImplemented(`byteLength ${byteLength}`);
    }

    if (byteLength === 4) return this.readUInt32LE(offset);
    if (byteLength === 2) return this.readUInt16LE(offset);
    if (byteLength === 1) return this.readUInt8(offset);
    this.boundsError(byteLength, 4, "byteLength");
  }
  /**
   * Copies data from a region of buf to a region in target, even if the target
   * memory region overlaps with buf.
   */


  copy(targetBuffer, targetStart = 0, sourceStart = 0, sourceEnd = this.length) {
    const sourceBuffer = this.subarray(sourceStart, sourceEnd).subarray(0, Math.max(0, targetBuffer.length - targetStart));
    if (sourceBuffer.length === 0) return 0;
    targetBuffer.set(sourceBuffer, targetStart);
    return sourceBuffer.length;
  }
  /*
   * Returns true if both buf and otherBuffer have exactly the same bytes, false otherwise.
   */


  equals(otherBuffer) {
    if (!(otherBuffer instanceof Uint8Array)) {
      throw new TypeError(`The "otherBuffer" argument must be an instance of Buffer or Uint8Array. Received type ${typeof otherBuffer}`);
    }

    if (this === otherBuffer) return true;
    if (this.byteLength !== otherBuffer.byteLength) return false;

    for (let i = 0; i < this.length; i++) {
      if (this[i] !== otherBuffer[i]) return false;
    }

    return true;
  }

  readBigInt64BE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getBigInt64(offset);
  }

  readBigInt64LE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getBigInt64(offset, true);
  }

  readBigUInt64BE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getBigUint64(offset);
  }

  readBigUInt64LE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getBigUint64(offset, true);
  }

  readDoubleBE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getFloat64(offset);
  }

  readDoubleLE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getFloat64(offset, true);
  }

  readFloatBE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getFloat32(offset);
  }

  readFloatLE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getFloat32(offset, true);
  }

  readInt8(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getInt8(offset);
  }

  readInt16BE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getInt16(offset);
  }

  readInt16LE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getInt16(offset, true);
  }

  readInt32BE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getInt32(offset);
  }

  readInt32LE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getInt32(offset, true);
  }

  readUInt8(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getUint8(offset);
  }

  readUInt16BE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getUint16(offset);
  }

  readUInt16LE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getUint16(offset, true);
  }

  readUInt32BE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getUint32(offset);
  }

  readUInt32LE(offset = 0) {
    return new DataView(this.buffer, this.byteOffset, this.byteLength).getUint32(offset, true);
  }
  /**
   * Returns a new Buffer that references the same memory as the original, but
   * offset and cropped by the start and end indices.
   */


  slice(begin = 0, end = this.length) {
    // workaround for https://github.com/microsoft/TypeScript/issues/38665
    return this.subarray(begin, end);
  }
  /**
   * Returns a JSON representation of buf. JSON.stringify() implicitly calls
   * this function when stringifying a Buffer instance.
   */


  toJSON() {
    return {
      type: "Buffer",
      data: Array.from(this)
    };
  }
  /**
   * Decodes buf to a string according to the specified character encoding in
   * encoding. start and end may be passed to decode only a subset of buf.
   */


  toString(encoding = "utf8", start = 0, end = this.length) {
    encoding = checkEncoding(encoding);
    const b = this.subarray(start, end);
    if (encoding === "hex") return new TextDecoder().decode(encode$1(b));
    if (encoding === "base64") return encode(b);
    return new TextDecoder(encoding).decode(b);
  }
  /**
   * Writes string to buf at offset according to the character encoding in
   * encoding. The length parameter is the number of bytes to write. If buf did
   * not contain enough space to fit the entire string, only part of string will
   * be written. However, partially encoded characters will not be written.
   */


  write(string, offset = 0, length = this.length) {
    return new TextEncoder().encodeInto(string, this.subarray(offset, offset + length)).written;
  }

  writeBigInt64BE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setBigInt64(offset, value);
    return offset + 4;
  }

  writeBigInt64LE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setBigInt64(offset, value, true);
    return offset + 4;
  }

  writeBigUInt64BE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setBigUint64(offset, value);
    return offset + 4;
  }

  writeBigUInt64LE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setBigUint64(offset, value, true);
    return offset + 4;
  }

  writeDoubleBE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setFloat64(offset, value);
    return offset + 8;
  }

  writeDoubleLE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setFloat64(offset, value, true);
    return offset + 8;
  }

  writeFloatBE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setFloat32(offset, value);
    return offset + 4;
  }

  writeFloatLE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setFloat32(offset, value, true);
    return offset + 4;
  }

  writeInt8(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setInt8(offset, value);
    return offset + 1;
  }

  writeInt16BE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setInt16(offset, value);
    return offset + 2;
  }

  writeInt16LE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setInt16(offset, value, true);
    return offset + 2;
  }

  writeInt32BE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setUint32(offset, value);
    return offset + 4;
  }

  writeInt32LE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setInt32(offset, value, true);
    return offset + 4;
  }

  writeUInt8(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setUint8(offset, value);
    return offset + 1;
  }

  writeUInt16BE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setUint16(offset, value);
    return offset + 2;
  }

  writeUInt16LE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setUint16(offset, value, true);
    return offset + 2;
  }

  writeUInt32BE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setUint32(offset, value);
    return offset + 4;
  }

  writeUInt32LE(value, offset = 0) {
    new DataView(this.buffer, this.byteOffset, this.byteLength).setUint32(offset, value, true);
    return offset + 4;
  }

} // Make Buffer static methods enumerable (so they can be copied by safe-buffer, etc...)

for (const prop of ["alloc", "allocUnsafe", "byteLength", "from", "isBuffer", "isEncoding"]) {
  Reflect.defineProperty(Buffer, prop, {
    enumerable: true
  });
} // Allow calling Buffer() without new (translate it to a Buffer.from call, for safe-buffer, etc..)


const PBuffer = new Proxy(Buffer, {
  apply(_target, _thisArg, args) {
    // @ts-ignore tedious to replicate types ...
    return Buffer.from(...args);
  }

});
const kMaxLength = 4294967296;
const kStringMaxLength = 536870888;
const constants = {
  MAX_LENGTH: kMaxLength,
  MAX_STRING_LENGTH: kStringMaxLength
};
const atob$1 = globalThis.atob;
const btoa = globalThis.btoa;
var buffer = {
  Buffer: PBuffer,
  kMaxLength,
  kStringMaxLength,
  constants,
  atob: atob$1,
  btoa
};

// Copyright Node.js contributors. All rights reserved. MIT License.

class Stream extends EventEmitter$1 {
  constructor() {
    super();
  }

  static _isUint8Array = isUint8Array;
  static _uint8ArrayToBuffer = chunk => Buffer.from(chunk);

  pipe(dest, options) {
    // deno-lint-ignore no-this-alias
    const source = this; //TODO(Soremwar)
    //isStdio exist on stdin || stdout only, which extend from Duplex
    //if (!dest._isStdio && (options?.end ?? true)) {
    //Find an alternative to be able to pipe streams to stdin & stdout
    //Port them as well?

    if (options?.end ?? true) {
      source.on("end", onend);
      source.on("close", onclose);
    }

    let didOnEnd = false;

    function onend() {
      if (didOnEnd) return;
      didOnEnd = true; // 'end' is only called on Writable streams

      dest.end();
    }

    function onclose() {
      if (didOnEnd) return;
      didOnEnd = true;
      if (typeof dest.destroy === "function") dest.destroy();
    } // Don't leave dangling pipes when there are errors.


    function onerror(er) {
      cleanup();

      if (this.listenerCount("error") === 0) {
        throw er; // Unhandled stream error in pipe.
      }
    }

    source.on("error", onerror);
    dest.on("error", onerror); // Remove all the event listeners that were added.

    function cleanup() {
      source.removeListener("end", onend);
      source.removeListener("close", onclose);
      source.removeListener("error", onerror);
      dest.removeListener("error", onerror);
      source.removeListener("end", cleanup);
      source.removeListener("close", cleanup);
      dest.removeListener("close", cleanup);
    }

    source.on("end", cleanup);
    source.on("close", cleanup);
    dest.on("close", cleanup);
    dest.emit("pipe", source);
    return dest;
  }

}

// Copyright Node.js contributors. All rights reserved. MIT License.
class BufferList {
  head = null;
  tail = null;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(v) {
    const entry = {
      data: v,
      next: null
    };

    if (this.length > 0) {
      this.tail.next = entry;
    } else {
      this.head = entry;
    }

    this.tail = entry;
    ++this.length;
  }

  unshift(v) {
    const entry = {
      data: v,
      next: this.head
    };

    if (this.length === 0) {
      this.tail = entry;
    }

    this.head = entry;
    ++this.length;
  }

  shift() {
    if (this.length === 0) {
      return;
    }

    const ret = this.head.data;

    if (this.length === 1) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next;
    }

    --this.length;
    return ret;
  }

  clear() {
    this.head = this.tail = null;
    this.length = 0;
  }

  join(s) {
    if (this.length === 0) {
      return "";
    }

    let p = this.head;
    let ret = "" + p.data;
    p = p.next;

    while (p) {
      ret += s + p.data;
      p = p.next;
    }

    return ret;
  }

  concat(n) {
    if (this.length === 0) {
      return Buffer.alloc(0);
    }

    const ret = Buffer.allocUnsafe(n >>> 0);
    let p = this.head;
    let i = 0;

    while (p) {
      ret.set(p.data, i);
      i += p.data.length;
      p = p.next;
    }

    return ret;
  } // Consumes a specified amount of bytes or characters from the buffered data.


  consume(n, hasStrings) {
    const data = this.head.data;

    if (n < data.length) {
      // `slice` is the same for buffers and strings.
      const slice = data.slice(0, n);
      this.head.data = data.slice(n);
      return slice;
    }

    if (n === data.length) {
      // First chunk is a perfect match.
      return this.shift();
    } // Result spans more than one buffer.


    return hasStrings ? this._getString(n) : this._getBuffer(n);
  }

  first() {
    return this.head.data;
  }

  *[Symbol.iterator]() {
    for (let p = this.head; p; p = p.next) {
      yield p.data;
    }
  } // Consumes a specified amount of characters from the buffered data.


  _getString(n) {
    let ret = "";
    let p = this.head;
    let c = 0;
    p = p.next;

    do {
      const str = p.data;

      if (n > str.length) {
        ret += str;
        n -= str.length;
      } else {
        if (n === str.length) {
          ret += str;
          ++c;

          if (p.next) {
            this.head = p.next;
          } else {
            this.head = this.tail = null;
          }
        } else {
          ret += str.slice(0, n);
          this.head = p;
          p.data = str.slice(n);
        }

        break;
      }

      ++c;
      p = p.next;
    } while (p);

    this.length -= c;
    return ret;
  } // Consumes a specified amount of bytes from the buffered data.


  _getBuffer(n) {
    const ret = Buffer.allocUnsafe(n);
    const retLen = n;
    let p = this.head;
    let c = 0;
    p = p.next;

    do {
      const buf = p.data;

      if (n > buf.length) {
        ret.set(buf, retLen - n);
        n -= buf.length;
      } else {
        if (n === buf.length) {
          ret.set(buf, retLen - n);
          ++c;

          if (p.next) {
            this.head = p.next;
          } else {
            this.head = this.tail = null;
          }
        } else {
          ret.set(new Uint8Array(buf.buffer, buf.byteOffset, n), retLen - n);
          this.head = p;
          p.data = buf.slice(n);
        }

        break;
      }

      ++c;
      p = p.next;
    } while (p);

    this.length -= c;
    return ret;
  }

}

// Copyright Joyent, Inc. and other Node contributors.
var NotImplemented;

(function (NotImplemented) {
  NotImplemented[NotImplemented["ascii"] = 0] = "ascii";
  NotImplemented[NotImplemented["latin1"] = 1] = "latin1";
  NotImplemented[NotImplemented["utf16le"] = 2] = "utf16le";
})(NotImplemented || (NotImplemented = {}));

function normalizeEncoding(enc) {
  const encoding = normalizeEncoding$1(enc ?? null);
  if (encoding && encoding in NotImplemented) notImplemented(encoding);

  if (!encoding && typeof enc === "string" && enc.toLowerCase() !== "raw") {
    throw new Error(`Unknown encoding: ${enc}`);
  }

  return String(encoding);
}
/*
 * Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
 * continuation byte. If an invalid byte is detected, -2 is returned.
 * */


function utf8CheckByte(byte) {
  if (byte <= 0x7f) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0e) return 3;else if (byte >> 3 === 0x1e) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}
/*
 * Checks at most 3 bytes at the end of a Buffer in order to detect an
 * incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
 * needed to complete the UTF-8 character (if applicable) are returned.
 * */


function utf8CheckIncomplete(self, buf, i) {
  let j = buf.length - 1;
  if (j < i) return 0;
  let nb = utf8CheckByte(buf[j]);

  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }

  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);

  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }

  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);

  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }

    return nb;
  }

  return 0;
}
/*
 * Validates as many continuation bytes for a multi-byte UTF-8 character as
 * needed or are available. If we see a non-continuation byte where we expect
 * one, we "replace" the validated continuation bytes we've seen so far with
 * a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
 * behavior. The continuation byte check is included three times in the case
 * where all of the continuation bytes for a character exist in the same buffer.
 * It is also done this way as a slight performance increase instead of using a
 * loop.
 * */


function utf8CheckExtraBytes(self, buf) {
  if ((buf[0] & 0xc0) !== 0x80) {
    self.lastNeed = 0;
    return "\ufffd";
  }

  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xc0) !== 0x80) {
      self.lastNeed = 1;
      return "\ufffd";
    }

    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xc0) !== 0x80) {
        self.lastNeed = 2;
        return "\ufffd";
      }
    }
  }
}
/*
 * Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
 * */


function utf8FillLastComplete(buf) {
  const p = this.lastTotal - this.lastNeed;
  const r = utf8CheckExtraBytes(this, buf);
  if (r !== undefined) return r;

  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }

  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}
/*
 * Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
 * */


function utf8FillLastIncomplete(buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }

  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
}
/*
 * Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
 * partial character, the character's bytes are buffered until the required
 * number of bytes are available.
 * */


function utf8Text(buf, i) {
  const total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString("utf8", i);
  this.lastTotal = total;
  const end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString("utf8", i, end);
}
/*
 * For UTF-8, a replacement character is added when ending on a partial
 * character.
 * */


function utf8End(buf) {
  const r = buf && buf.length ? this.write(buf) : "";
  if (this.lastNeed) return r + "\ufffd";
  return r;
}

function utf8Write(buf) {
  if (typeof buf === "string") {
    return buf;
  }

  if (buf.length === 0) return "";
  let r;
  let i;

  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return "";
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }

  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || "";
}

function base64Text(buf, i) {
  const n = (buf.length - i) % 3;
  if (n === 0) return buf.toString("base64", i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;

  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }

  return buf.toString("base64", i, buf.length - n);
}

function base64End(buf) {
  const r = buf && buf.length ? this.write(buf) : "";

  if (this.lastNeed) {
    return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
  }

  return r;
}

function simpleWrite(buf) {
  if (typeof buf === "string") {
    return buf;
  }

  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : "";
}

class StringDecoderBase {
  lastNeed = 0;
  lastTotal = 0;

  constructor(encoding, nb) {
    this.encoding = encoding;
    this.lastChar = Buffer.allocUnsafe(nb);
  }

}

class Base64Decoder extends StringDecoderBase {
  end = base64End;
  fillLast = utf8FillLastIncomplete;
  text = base64Text;
  write = utf8Write;

  constructor(encoding) {
    super(normalizeEncoding(encoding), 3);
  }

}

class GenericDecoder extends StringDecoderBase {
  end = simpleEnd;
  fillLast = undefined;
  text = utf8Text;
  write = simpleWrite;

  constructor(encoding) {
    super(normalizeEncoding(encoding), 4);
  }

}

class Utf8Decoder extends StringDecoderBase {
  end = utf8End;
  fillLast = utf8FillLastComplete;
  text = utf8Text;
  write = utf8Write;

  constructor(encoding) {
    super(normalizeEncoding(encoding), 4);
  }

}
/*
 * StringDecoder provides an interface for efficiently splitting a series of
 * buffers into a series of JS strings without breaking apart multi-byte
 * characters.
 * */


class StringDecoder {
  constructor(encoding) {
    let decoder;

    switch (encoding) {
      case "utf8":
        decoder = new Utf8Decoder(encoding);
        break;

      case "base64":
        decoder = new Base64Decoder(encoding);
        break;

      default:
        decoder = new GenericDecoder(encoding);
    }

    this.encoding = decoder.encoding;
    this.end = decoder.end;
    this.fillLast = decoder.fillLast;
    this.lastChar = decoder.lastChar;
    this.lastNeed = decoder.lastNeed;
    this.lastTotal = decoder.lastTotal;
    this.text = decoder.text;
    this.write = decoder.write;
  }

} // Allow calling StringDecoder() without new

new Proxy(StringDecoder, {
  apply(_target, thisArg, args) {
    // @ts-ignore tedious to replicate types ...
    return Object.assign(thisArg, new StringDecoder(...args));
  }

});

// Copyright Node.js contributors. All rights reserved. MIT License.

// TODO(Soremwar)
// Bring back once requests are implemented
// function isRequest(stream: Stream) {
//   return stream.setHeader && typeof stream.abort === "function";
// }
// deno-lint-ignore no-explicit-any
function isReadable$1(stream) {
  return typeof stream.readable === "boolean" || typeof stream.readableEnded === "boolean" || !!stream._readableState;
} // deno-lint-ignore no-explicit-any


function isWritable$1(stream) {
  return typeof stream.writable === "boolean" || typeof stream.writableEnded === "boolean" || !!stream._writableState;
}

function isWritableFinished(stream) {
  if (stream.writableFinished) return true;
  const wState = stream._writableState;
  if (!wState || wState.errored) return false;
  return wState.finished || wState.ended && wState.length === 0;
}

function nop$1() {}

function isReadableEnded(stream) {
  if (stream.readableEnded) return true;
  const rState = stream._readableState;
  if (!rState || rState.errored) return false;
  return rState.endEmitted || rState.ended && rState.length === 0;
}

function eos(stream, x, y) {
  let opts;
  let callback;

  if (!y) {
    if (typeof x !== "function") {
      throw new ERR_INVALID_ARG_TYPE("callback", "function", x);
    }

    opts = {};
    callback = x;
  } else {
    if (!x || Array.isArray(x) || typeof x !== "object") {
      throw new ERR_INVALID_ARG_TYPE("opts", "object", x);
    }

    opts = x;

    if (typeof y !== "function") {
      throw new ERR_INVALID_ARG_TYPE("callback", "function", y);
    }

    callback = y;
  }

  callback = once$1(callback);
  const readable = opts.readable ?? isReadable$1(stream);
  const writable = opts.writable ?? isWritable$1(stream); // deno-lint-ignore no-explicit-any

  const wState = stream._writableState; // deno-lint-ignore no-explicit-any

  const rState = stream._readableState;
  const validState = wState || rState;

  const onlegacyfinish = () => {
    if (!stream.writable) {
      onfinish();
    }
  };

  let willEmitClose = validState?.autoDestroy && validState?.emitClose && validState?.closed === false && isReadable$1(stream) === readable && isWritable$1(stream) === writable;
  let writableFinished = stream.writableFinished || wState?.finished;

  const onfinish = () => {
    writableFinished = true; // deno-lint-ignore no-explicit-any

    if (stream.destroyed) {
      willEmitClose = false;
    }

    if (willEmitClose && (!stream.readable || readable)) {
      return;
    }

    if (!readable || readableEnded) {
      callback.call(stream);
    }
  };

  let readableEnded = stream.readableEnded || rState?.endEmitted;

  const onend = () => {
    readableEnded = true; // deno-lint-ignore no-explicit-any

    if (stream.destroyed) {
      willEmitClose = false;
    }

    if (willEmitClose && (!stream.writable || writable)) {
      return;
    }

    if (!writable || writableFinished) {
      callback.call(stream);
    }
  };

  const onerror = err => {
    callback.call(stream, err);
  };

  const onclose = () => {
    if (readable && !readableEnded) {
      if (!isReadableEnded(stream)) {
        return callback.call(stream, new ERR_STREAM_PREMATURE_CLOSE());
      }
    }

    if (writable && !writableFinished) {
      if (!isWritableFinished(stream)) {
        return callback.call(stream, new ERR_STREAM_PREMATURE_CLOSE());
      }
    }

    callback.call(stream);
  }; // TODO(Soremwar)
  // Bring back once requests are implemented
  // const onrequest = () => {
  //   stream.req.on("finish", onfinish);
  // };
  // TODO(Soremwar)
  // Bring back once requests are implemented
  // if (isRequest(stream)) {
  //   stream.on("complete", onfinish);
  //   stream.on("abort", onclose);
  //   if (stream.req) {
  //     onrequest();
  //   } else {
  //     stream.on("request", onrequest);
  //   }
  // } else


  if (writable && !wState) {
    stream.on("end", onlegacyfinish);
    stream.on("close", onlegacyfinish);
  } // TODO(Soremwar)
  // Bring back once requests are implemented
  // if (typeof stream.aborted === "boolean") {
  //   stream.on("aborted", onclose);
  // }


  stream.on("end", onend);
  stream.on("finish", onfinish);
  if (opts.error !== false) stream.on("error", onerror);
  stream.on("close", onclose);
  const closed = wState?.closed || rState?.closed || wState?.errorEmitted || rState?.errorEmitted || // TODO(Soremwar)
  // Bring back once requests are implemented
  // (rState && stream.req && stream.aborted) ||
  (!writable || wState?.finished) && (!readable || rState?.endEmitted);

  if (closed) {
    queueMicrotask(callback);
  }

  return function () {
    callback = nop$1;
    stream.removeListener("aborted", onclose);
    stream.removeListener("complete", onfinish);
    stream.removeListener("abort", onclose); // TODO(Soremwar)
    // Bring back once requests are implemented
    // stream.removeListener("request", onrequest);
    // if (stream.req) stream.req.removeListener("finish", onfinish);

    stream.removeListener("end", onlegacyfinish);
    stream.removeListener("close", onlegacyfinish);
    stream.removeListener("finish", onfinish);
    stream.removeListener("end", onend);
    stream.removeListener("error", onerror);
    stream.removeListener("close", onclose);
  };
}

// Copyright Node.js contributors. All rights reserved. MIT License.
//This whole module acts as a 'normalizer'
//Idea behind it is you can pass any kind of streams and functions will execute anyways
//TODO(Soremwar)
//Should be any implementation of stream
//This is a guard to check executed methods exist inside the implementation
// TODO(Soremwar)
// Bring back once requests are implemented
// function isRequest(stream: any) {
//   return stream && stream.setHeader && typeof stream.abort === "function";
// }
function destroyer$1(stream, err) {
  // TODO(Soremwar)
  // Bring back once requests are implemented
  // if (isRequest(stream)) return stream.abort();
  // if (isRequest(stream.req)) return stream.req.abort();
  if (typeof stream.destroy === "function") {
    return stream.destroy(err);
  } // A test of async iterator mocks an upcoming implementation of stream
  // his is casted to any in the meanwhile
  // deno-lint-ignore no-explicit-any


  if (typeof stream.close === "function") {
    // deno-lint-ignore no-explicit-any
    return stream.close();
  }
}

// Copyright Node.js contributors. All rights reserved. MIT License.
const kLastResolve = Symbol("lastResolve");
const kLastReject = Symbol("lastReject");
const kError = Symbol("error");
const kEnded = Symbol("ended");
const kLastPromise = Symbol("lastPromise");
const kHandlePromise = Symbol("handlePromise");
const kStream = Symbol("stream"); // TODO(Soremwar)
// Add Duplex streams

function initIteratorSymbols(o, symbols) {
  const properties = {};

  for (const sym in symbols) {
    properties[sym] = {
      configurable: false,
      enumerable: false,
      writable: true
    };
  }

  Object.defineProperties(o, properties);
}

function createIterResult(value, done) {
  return {
    value,
    done
  };
}

function readAndResolve(iter) {
  const resolve = iter[kLastResolve];

  if (resolve !== null) {
    const data = iter[kStream].read();

    if (data !== null) {
      iter[kLastPromise] = null;
      iter[kLastResolve] = null;
      iter[kLastReject] = null;
      resolve(createIterResult(data, false));
    }
  }
}

function onReadable(iter) {
  queueMicrotask(() => readAndResolve(iter));
}

function wrapForNext(lastPromise, iter) {
  return (resolve, reject) => {
    lastPromise.then(() => {
      if (iter[kEnded]) {
        resolve(createIterResult(undefined, true));
        return;
      }

      iter[kHandlePromise](resolve, reject);
    }, reject);
  };
}

function finish$2(self, err) {
  return new Promise((resolve, reject) => {
    const stream = self[kStream];
    eos(stream, err => {
      if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
        reject(err);
      } else {
        resolve(createIterResult(undefined, true));
      }
    });
    destroyer$1(stream, err);
  });
}

const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {}).prototype);
class ReadableStreamAsyncIterator {
  [kError] = null;
  [kHandlePromise] = (resolve, reject) => {
    const data = this[kStream].read();

    if (data) {
      this[kLastPromise] = null;
      this[kLastResolve] = null;
      this[kLastReject] = null;
      resolve(createIterResult(data, false));
    } else {
      this[kLastResolve] = resolve;
      this[kLastReject] = reject;
    }
  };
  [kLastReject] = null;
  [kLastResolve] = null;
  [Symbol.asyncIterator] = AsyncIteratorPrototype[Symbol.asyncIterator];

  constructor(stream) {
    this[kEnded] = stream.readableEnded || stream._readableState.endEmitted;
    this[kStream] = stream;
    initIteratorSymbols(this, [kEnded, kError, kHandlePromise, kLastPromise, kLastReject, kLastResolve, kStream]);
  }

  get stream() {
    return this[kStream];
  }

  next() {
    const error = this[kError];

    if (error !== null) {
      return Promise.reject(error);
    }

    if (this[kEnded]) {
      return Promise.resolve(createIterResult(undefined, true));
    }

    if (this[kStream].destroyed) {
      return new Promise((resolve, reject) => {
        if (this[kError]) {
          reject(this[kError]);
        } else if (this[kEnded]) {
          resolve(createIterResult(undefined, true));
        } else {
          eos(this[kStream], err => {
            if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
              reject(err);
            } else {
              resolve(createIterResult(undefined, true));
            }
          });
        }
      });
    }

    const lastPromise = this[kLastPromise];
    let promise;

    if (lastPromise) {
      promise = new Promise(wrapForNext(lastPromise, this));
    } else {
      const data = this[kStream].read();

      if (data !== null) {
        return Promise.resolve(createIterResult(data, false));
      }

      promise = new Promise(this[kHandlePromise]);
    }

    this[kLastPromise] = promise;
    return promise;
  }

  return() {
    return finish$2(this);
  }

  throw(err) {
    return finish$2(this, err);
  }

}

const createReadableStreamAsyncIterator = stream => {
  // deno-lint-ignore no-explicit-any
  if (typeof stream.read !== "function") {
    const src = stream;
    stream = new Readable({
      objectMode: true
    }).wrap(src);
    eos(stream, err => destroyer$1(src, err));
  }

  const iterator = new ReadableStreamAsyncIterator(stream);
  iterator[kLastPromise] = null;
  eos(stream, {
    writable: false
  }, err => {
    if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
      const reject = iterator[kLastReject];

      if (reject !== null) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        reject(err);
      }

      iterator[kError] = err;
      return;
    }

    const resolve = iterator[kLastResolve];

    if (resolve !== null) {
      iterator[kLastPromise] = null;
      iterator[kLastResolve] = null;
      iterator[kLastReject] = null;
      resolve(createIterResult(undefined, true));
    }

    iterator[kEnded] = true;
  });
  stream.on("readable", onReadable.bind(null, iterator));
  return iterator;
};

// Copyright Node.js contributors. All rights reserved. MIT License.
function from( // deno-lint-ignore no-explicit-any
iterable, opts) {
  let iterator;

  if (typeof iterable === "string" || iterable instanceof Buffer) {
    return new Readable({
      objectMode: true,
      ...opts,

      read() {
        this.push(iterable);
        this.push(null);
      }

    });
  }

  if (Symbol.asyncIterator in iterable) {
    // deno-lint-ignore no-explicit-any
    iterator = iterable[Symbol.asyncIterator]();
  } else if (Symbol.iterator in iterable) {
    // deno-lint-ignore no-explicit-any
    iterator = iterable[Symbol.iterator]();
  } else {
    throw new ERR_INVALID_ARG_TYPE("iterable", ["Iterable"], iterable);
  }

  const readable = new Readable({
    objectMode: true,
    highWaterMark: 1,
    ...opts
  }); // Reading boolean to protect against _read
  // being called before last iteration completion.

  let reading = false; // needToClose boolean if iterator needs to be explicitly closed

  let needToClose = false;

  readable._read = function () {
    if (!reading) {
      reading = true;
      next();
    }
  };

  readable._destroy = function (error, cb) {
    if (needToClose) {
      needToClose = false;
      close().then(() => queueMicrotask(() => cb(error)), e => queueMicrotask(() => cb(error || e)));
    } else {
      cb(error);
    }
  };

  async function close() {
    if (typeof iterator.return === "function") {
      const {
        value
      } = await iterator.return();
      await value;
    }
  }

  async function next() {
    try {
      needToClose = false;
      const {
        value,
        done
      } = await iterator.next();
      needToClose = !done;

      if (done) {
        readable.push(null);
      } else if (readable.destroyed) {
        await close();
      } else {
        const res = await value;

        if (res === null) {
          reading = false;
          throw new ERR_STREAM_NULL_VALUES();
        } else if (readable.push(res)) {
          next();
        } else {
          reading = false;
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        readable.destroy(err);
      }
    }
  }

  return readable;
}

// Copyright Node.js contributors. All rights reserved. MIT License.
const kDestroy = Symbol("kDestroy");
const kPaused = Symbol("kPaused");

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.

/**
 * This implementation is inspired by POSIX and Golang but does not port
 * implementation code. */
var State;

(function (State) {
  State[State["PASSTHROUGH"] = 0] = "PASSTHROUGH";
  State[State["PERCENT"] = 1] = "PERCENT";
  State[State["POSITIONAL"] = 2] = "POSITIONAL";
  State[State["PRECISION"] = 3] = "PRECISION";
  State[State["WIDTH"] = 4] = "WIDTH";
})(State || (State = {}));

var WorP;

(function (WorP) {
  WorP[WorP["WIDTH"] = 0] = "WIDTH";
  WorP[WorP["PRECISION"] = 1] = "PRECISION";
})(WorP || (WorP = {}));

class Flags {
  width = -1;
  precision = -1;
}

const min = Math.min;
const UNICODE_REPLACEMENT_CHARACTER = "\ufffd";
const DEFAULT_PRECISION = 6;
const FLOAT_REGEXP = /(-?)(\d)\.?(\d*)e([+-])(\d+)/;
var F$2;

(function (F) {
  F[F["sign"] = 1] = "sign";
  F[F["mantissa"] = 2] = "mantissa";
  F[F["fractional"] = 3] = "fractional";
  F[F["esign"] = 4] = "esign";
  F[F["exponent"] = 5] = "exponent";
})(F$2 || (F$2 = {}));

class Printf {
  state = State.PASSTHROUGH;
  verb = "";
  buf = "";
  argNum = 0;
  flags = new Flags();

  constructor(format, ...args) {
    this.format = format;
    this.args = args;
    this.haveSeen = new Array(args.length);
    this.i = 0;
  }

  doPrintf() {
    for (; this.i < this.format.length; ++this.i) {
      const c = this.format[this.i];

      switch (this.state) {
        case State.PASSTHROUGH:
          if (c === "%") {
            this.state = State.PERCENT;
          } else {
            this.buf += c;
          }

          break;

        case State.PERCENT:
          if (c === "%") {
            this.buf += c;
            this.state = State.PASSTHROUGH;
          } else {
            this.handleFormat();
          }

          break;

        default:
          throw Error("Should be unreachable, certainly a bug in the lib.");
      }
    } // check for unhandled args


    let extras = false;
    let err = "%!(EXTRA";

    for (let i = 0; i !== this.haveSeen.length; ++i) {
      if (!this.haveSeen[i]) {
        extras = true;
        err += ` '${Deno.inspect(this.args[i])}'`;
      }
    }

    err += ")";

    if (extras) {
      this.buf += err;
    }

    return this.buf;
  } // %[<positional>]<flag>...<verb>


  handleFormat() {
    this.flags = new Flags();
    const flags = this.flags;

    for (; this.i < this.format.length; ++this.i) {
      const c = this.format[this.i];

      switch (this.state) {
        case State.PERCENT:
          switch (c) {
            case "[":
              this.handlePositional();
              this.state = State.POSITIONAL;
              break;

            case "+":
              flags.plus = true;
              break;

            case "<":
              flags.lessthan = true;
              break;

            case "-":
              flags.dash = true;
              flags.zero = false; // only left pad zeros, dash takes precedence

              break;

            case "#":
              flags.sharp = true;
              break;

            case " ":
              flags.space = true;
              break;

            case "0":
              // only left pad zeros, dash takes precedence
              flags.zero = !flags.dash;
              break;

            default:
              if ("1" <= c && c <= "9" || c === "." || c === "*") {
                if (c === ".") {
                  this.flags.precision = 0;
                  this.state = State.PRECISION;
                  this.i++;
                } else {
                  this.state = State.WIDTH;
                }

                this.handleWidthAndPrecision(flags);
              } else {
                this.handleVerb();
                return; // always end in verb
              }

          } // switch c


          break;

        case State.POSITIONAL:
          // TODO(bartlomieju): either a verb or * only verb for now
          if (c === "*") {
            const worp = this.flags.precision === -1 ? WorP.WIDTH : WorP.PRECISION;
            this.handleWidthOrPrecisionRef(worp);
            this.state = State.PERCENT;
            break;
          } else {
            this.handleVerb();
            return; // always end in verb
          }

        default:
          throw new Error(`Should not be here ${this.state}, library bug!`);
      } // switch state

    }
  }
  /**
   * Handle width or precision
   * @param wOrP
   */


  handleWidthOrPrecisionRef(wOrP) {
    if (this.argNum >= this.args.length) {
      // handle Positional should have already taken care of it...
      return;
    }

    const arg = this.args[this.argNum];
    this.haveSeen[this.argNum] = true;

    if (typeof arg === "number") {
      switch (wOrP) {
        case WorP.WIDTH:
          this.flags.width = arg;
          break;

        default:
          this.flags.precision = arg;
      }
    } else {
      const tmp = wOrP === WorP.WIDTH ? "WIDTH" : "PREC";
      this.tmpError = `%!(BAD ${tmp} '${this.args[this.argNum]}')`;
    }

    this.argNum++;
  }
  /**
   * Handle width and precision
   * @param flags
   */


  handleWidthAndPrecision(flags) {
    const fmt = this.format;

    for (; this.i !== this.format.length; ++this.i) {
      const c = fmt[this.i];

      switch (this.state) {
        case State.WIDTH:
          switch (c) {
            case ".":
              // initialize precision, %9.f -> precision=0
              this.flags.precision = 0;
              this.state = State.PRECISION;
              break;

            case "*":
              this.handleWidthOrPrecisionRef(WorP.WIDTH); // force . or flag at this point

              break;

            default:
              {
                const val = parseInt(c); // most likely parseInt does something stupid that makes
                // it unusable for this scenario ...
                // if we encounter a non (number|*|.) we're done with prec & wid

                if (isNaN(val)) {
                  this.i--;
                  this.state = State.PERCENT;
                  return;
                }

                flags.width = flags.width == -1 ? 0 : flags.width;
                flags.width *= 10;
                flags.width += val;
              }
          } // switch c


          break;

        case State.PRECISION:
          {
            if (c === "*") {
              this.handleWidthOrPrecisionRef(WorP.PRECISION);
              break;
            }

            const val = parseInt(c);

            if (isNaN(val)) {
              // one too far, rewind
              this.i--;
              this.state = State.PERCENT;
              return;
            }

            flags.precision *= 10;
            flags.precision += val;
            break;
          }

        default:
          throw new Error("can't be here. bug.");
      } // switch state

    }
  }
  /** Handle positional */


  handlePositional() {
    if (this.format[this.i] !== "[") {
      // sanity only
      throw new Error("Can't happen? Bug.");
    }

    let positional = 0;
    const format = this.format;
    this.i++;
    let err = false;

    for (; this.i !== this.format.length; ++this.i) {
      if (format[this.i] === "]") {
        break;
      }

      positional *= 10;
      const val = parseInt(format[this.i]);

      if (isNaN(val)) {
        //throw new Error(
        //  `invalid character in positional: ${format}[${format[this.i]}]`
        //);
        this.tmpError = "%!(BAD INDEX)";
        err = true;
      }

      positional += val;
    }

    if (positional - 1 >= this.args.length) {
      this.tmpError = "%!(BAD INDEX)";
      err = true;
    }

    this.argNum = err ? this.argNum : positional - 1;
    return;
  }
  /** Handle less than */


  handleLessThan() {
    // deno-lint-ignore no-explicit-any
    const arg = this.args[this.argNum];

    if ((arg || {}).constructor.name !== "Array") {
      throw new Error(`arg ${arg} is not an array. Todo better error handling`);
    }

    let str = "[ ";

    for (let i = 0; i !== arg.length; ++i) {
      if (i !== 0) str += ", ";
      str += this._handleVerb(arg[i]);
    }

    return str + " ]";
  }
  /** Handle verb */


  handleVerb() {
    const verb = this.format[this.i];
    this.verb = verb;

    if (this.tmpError) {
      this.buf += this.tmpError;
      this.tmpError = undefined;

      if (this.argNum < this.haveSeen.length) {
        this.haveSeen[this.argNum] = true; // keep track of used args
      }
    } else if (this.args.length <= this.argNum) {
      this.buf += `%!(MISSING '${verb}')`;
    } else {
      const arg = this.args[this.argNum]; // check out of range

      this.haveSeen[this.argNum] = true; // keep track of used args

      if (this.flags.lessthan) {
        this.buf += this.handleLessThan();
      } else {
        this.buf += this._handleVerb(arg);
      }
    }

    this.argNum++; // if there is a further positional, it will reset.

    this.state = State.PASSTHROUGH;
  } // deno-lint-ignore no-explicit-any


  _handleVerb(arg) {
    switch (this.verb) {
      case "t":
        return this.pad(arg.toString());

      case "b":
        return this.fmtNumber(arg, 2);

      case "c":
        return this.fmtNumberCodePoint(arg);

      case "d":
        return this.fmtNumber(arg, 10);

      case "o":
        return this.fmtNumber(arg, 8);

      case "x":
        return this.fmtHex(arg);

      case "X":
        return this.fmtHex(arg, true);

      case "e":
        return this.fmtFloatE(arg);

      case "E":
        return this.fmtFloatE(arg, true);

      case "f":
      case "F":
        return this.fmtFloatF(arg);

      case "g":
        return this.fmtFloatG(arg);

      case "G":
        return this.fmtFloatG(arg, true);

      case "s":
        return this.fmtString(arg);

      case "T":
        return this.fmtString(typeof arg);

      case "v":
        return this.fmtV(arg);

      case "j":
        return this.fmtJ(arg);

      default:
        return `%!(BAD VERB '${this.verb}')`;
    }
  }
  /**
   * Pad a string
   * @param s text to pad
   */


  pad(s) {
    const padding = this.flags.zero ? "0" : " ";

    if (this.flags.dash) {
      return s.padEnd(this.flags.width, padding);
    }

    return s.padStart(this.flags.width, padding);
  }
  /**
   * Pad a number
   * @param nStr
   * @param neg
   */


  padNum(nStr, neg) {
    let sign;

    if (neg) {
      sign = "-";
    } else if (this.flags.plus || this.flags.space) {
      sign = this.flags.plus ? "+" : " ";
    } else {
      sign = "";
    }

    const zero = this.flags.zero;

    if (!zero) {
      // sign comes in front of padding when padding w/ zero,
      // in from of value if padding with spaces.
      nStr = sign + nStr;
    }

    const pad = zero ? "0" : " ";
    const len = zero ? this.flags.width - sign.length : this.flags.width;

    if (this.flags.dash) {
      nStr = nStr.padEnd(len, pad);
    } else {
      nStr = nStr.padStart(len, pad);
    }

    if (zero) {
      // see above
      nStr = sign + nStr;
    }

    return nStr;
  }
  /**
   * Format a number
   * @param n
   * @param radix
   * @param upcase
   */


  fmtNumber(n, radix, upcase = false) {
    let num = Math.abs(n).toString(radix);
    const prec = this.flags.precision;

    if (prec !== -1) {
      this.flags.zero = false;
      num = n === 0 && prec === 0 ? "" : num;

      while (num.length < prec) {
        num = "0" + num;
      }
    }

    let prefix = "";

    if (this.flags.sharp) {
      switch (radix) {
        case 2:
          prefix += "0b";
          break;

        case 8:
          // don't annotate octal 0 with 0...
          prefix += num.startsWith("0") ? "" : "0";
          break;

        case 16:
          prefix += "0x";
          break;

        default:
          throw new Error("cannot handle base: " + radix);
      }
    } // don't add prefix in front of value truncated by precision=0, val=0


    num = num.length === 0 ? num : prefix + num;

    if (upcase) {
      num = num.toUpperCase();
    }

    return this.padNum(num, n < 0);
  }
  /**
   * Format number with code points
   * @param n
   */


  fmtNumberCodePoint(n) {
    let s = "";

    try {
      s = String.fromCodePoint(n);
    } catch {
      s = UNICODE_REPLACEMENT_CHARACTER;
    }

    return this.pad(s);
  }
  /**
   * Format special float
   * @param n
   */


  fmtFloatSpecial(n) {
    // formatting of NaN and Inf are pants-on-head
    // stupid and more or less arbitrary.
    if (isNaN(n)) {
      this.flags.zero = false;
      return this.padNum("NaN", false);
    }

    if (n === Number.POSITIVE_INFINITY) {
      this.flags.zero = false;
      this.flags.plus = true;
      return this.padNum("Inf", false);
    }

    if (n === Number.NEGATIVE_INFINITY) {
      this.flags.zero = false;
      return this.padNum("Inf", true);
    }

    return "";
  }
  /**
   * Round fraction to precision
   * @param fractional
   * @param precision
   */


  roundFractionToPrecision(fractional, precision) {
    if (fractional.length > precision) {
      fractional = "1" + fractional; // prepend a 1 in case of leading 0

      let tmp = parseInt(fractional.substr(0, precision + 2)) / 10;
      tmp = Math.round(tmp);
      fractional = Math.floor(tmp).toString();
      fractional = fractional.substr(1); // remove extra 1
    } else {
      while (fractional.length < precision) {
        fractional += "0";
      }
    }

    return fractional;
  }
  /**
   * Format float E
   * @param n
   * @param upcase
   */


  fmtFloatE(n, upcase = false) {
    const special = this.fmtFloatSpecial(n);

    if (special !== "") {
      return special;
    }

    const m = n.toExponential().match(FLOAT_REGEXP);

    if (!m) {
      throw Error("can't happen, bug");
    }

    let fractional = m[F$2.fractional];
    const precision = this.flags.precision !== -1 ? this.flags.precision : DEFAULT_PRECISION;
    fractional = this.roundFractionToPrecision(fractional, precision);
    let e = m[F$2.exponent]; // scientific notation output with exponent padded to minlen 2

    e = e.length == 1 ? "0" + e : e;
    const val = `${m[F$2.mantissa]}.${fractional}${upcase ? "E" : "e"}${m[F$2.esign]}${e}`;
    return this.padNum(val, n < 0);
  }
  /**
   * Format float F
   * @param n
   */


  fmtFloatF(n) {
    const special = this.fmtFloatSpecial(n);

    if (special !== "") {
      return special;
    } // stupid helper that turns a number into a (potentially)
    // VERY long string.


    function expandNumber(n) {
      if (Number.isSafeInteger(n)) {
        return n.toString() + ".";
      }

      const t = n.toExponential().split("e");
      let m = t[0].replace(".", "");
      const e = parseInt(t[1]);

      if (e < 0) {
        let nStr = "0.";

        for (let i = 0; i !== Math.abs(e) - 1; ++i) {
          nStr += "0";
        }

        return nStr += m;
      } else {
        const splIdx = e + 1;

        while (m.length < splIdx) {
          m += "0";
        }

        return m.substr(0, splIdx) + "." + m.substr(splIdx);
      }
    } // avoiding sign makes padding easier


    const val = expandNumber(Math.abs(n));
    const arr = val.split(".");
    const dig = arr[0];
    let fractional = arr[1];
    const precision = this.flags.precision !== -1 ? this.flags.precision : DEFAULT_PRECISION;
    fractional = this.roundFractionToPrecision(fractional, precision);
    return this.padNum(`${dig}.${fractional}`, n < 0);
  }
  /**
   * Format float G
   * @param n
   * @param upcase
   */


  fmtFloatG(n, upcase = false) {
    const special = this.fmtFloatSpecial(n);

    if (special !== "") {
      return special;
    } // The double argument representing a floating-point number shall be
    // converted in the style f or e (or in the style F or E in
    // the case of a G conversion specifier), depending on the
    // value converted and the precision. Let P equal the
    // precision if non-zero, 6 if the precision is omitted, or 1
    // if the precision is zero. Then, if a conversion with style E would
    // have an exponent of X:
    //     - If P > X>=-4, the conversion shall be with style f (or F )
    //     and precision P -( X+1).
    //     - Otherwise, the conversion shall be with style e (or E )
    //     and precision P -1.
    // Finally, unless the '#' flag is used, any trailing zeros shall be
    // removed from the fractional portion of the result and the
    // decimal-point character shall be removed if there is no
    // fractional portion remaining.
    // A double argument representing an infinity or NaN shall be
    // converted in the style of an f or F conversion specifier.
    // https://pubs.opengroup.org/onlinepubs/9699919799/functions/fprintf.html


    let P = this.flags.precision !== -1 ? this.flags.precision : DEFAULT_PRECISION;
    P = P === 0 ? 1 : P;
    const m = n.toExponential().match(FLOAT_REGEXP);

    if (!m) {
      throw Error("can't happen");
    }

    const X = parseInt(m[F$2.exponent]) * (m[F$2.esign] === "-" ? -1 : 1);
    let nStr = "";

    if (P > X && X >= -4) {
      this.flags.precision = P - (X + 1);
      nStr = this.fmtFloatF(n);

      if (!this.flags.sharp) {
        nStr = nStr.replace(/\.?0*$/, "");
      }
    } else {
      this.flags.precision = P - 1;
      nStr = this.fmtFloatE(n);

      if (!this.flags.sharp) {
        nStr = nStr.replace(/\.?0*e/, upcase ? "E" : "e");
      }
    }

    return nStr;
  }
  /**
   * Format string
   * @param s
   */


  fmtString(s) {
    if (this.flags.precision !== -1) {
      s = s.substr(0, this.flags.precision);
    }

    return this.pad(s);
  }
  /**
   * Format hex
   * @param val
   * @param upper
   */


  fmtHex(val, upper = false) {
    // allow others types ?
    switch (typeof val) {
      case "number":
        return this.fmtNumber(val, 16, upper);

      case "string":
        {
          const sharp = this.flags.sharp && val.length !== 0;
          let hex = sharp ? "0x" : "";
          const prec = this.flags.precision;
          const end = prec !== -1 ? min(prec, val.length) : val.length;

          for (let i = 0; i !== end; ++i) {
            if (i !== 0 && this.flags.space) {
              hex += sharp ? " 0x" : " ";
            } // TODO(bartlomieju): for now only taking into account the
            // lower half of the codePoint, ie. as if a string
            // is a list of 8bit values instead of UCS2 runes


            const c = (val.charCodeAt(i) & 0xff).toString(16);
            hex += c.length === 1 ? `0${c}` : c;
          }

          if (upper) {
            hex = hex.toUpperCase();
          }

          return this.pad(hex);
        }

      default:
        throw new Error("currently only number and string are implemented for hex");
    }
  }
  /**
   * Format value
   * @param val
   */


  fmtV(val) {
    if (this.flags.sharp) {
      const options = this.flags.precision !== -1 ? {
        depth: this.flags.precision
      } : {};
      return this.pad(Deno.inspect(val, options));
    } else {
      const p = this.flags.precision;
      return p === -1 ? val.toString() : val.toString().substr(0, p);
    }
  }
  /**
   * Format JSON
   * @param val
   */


  fmtJ(val) {
    return JSON.stringify(val);
  }

}
/**
 * Converts and format a variable number of `args` as is specified by `format`.
 * `sprintf` returns the formatted string.
 *
 * @param format
 * @param args
 */


function sprintf(format, ...args) {
  const printf = new Printf(format, ...args);
  return printf.doPrintf();
}

// to `debuglog()` before `initializeDebugEnv()` is called will throw.

let debugImpls;
let testEnabled; // `debugEnv` is initial value of process.env.NODE_DEBUG

function initializeDebugEnv(debugEnv) {
  debugImpls = Object.create(null);

  if (debugEnv) {
    // This is run before any user code, it's OK not to use primordials.
    debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replaceAll("*", ".*").replaceAll(",", "$|^");
    const debugEnvRegex = new RegExp(`^${debugEnv}$`, "i");

    testEnabled = str => debugEnvRegex.exec(str) !== null;
  } else {
    testEnabled = () => false;
  }
} // Emits warning when user sets
// NODE_DEBUG=http or NODE_DEBUG=http2.


function emitWarningIfNeeded(set) {
  if ("HTTP" === set || "HTTP2" === set) {
    console.warn("Setting the NODE_DEBUG environment variable " + "to '" + set.toLowerCase() + "' can expose sensitive " + "data (such as passwords, tokens and authentication headers) " + "in the resulting log.");
  }
}

const noop = () => {};

function debuglogImpl(enabled, set) {
  if (debugImpls[set] === undefined) {
    if (enabled) {
      emitWarningIfNeeded(set);

      debugImpls[set] = function debug(...args) {
        const msg = args.map(arg => inspect(arg)).join(" ");
        console.error(sprintf("%s %s: %s\n", set, String(Deno.pid), msg));
      };
    } else {
      debugImpls[set] = noop;
    }
  }

  return debugImpls[set];
} // debuglogImpl depends on process.pid and process.env.NODE_DEBUG,
// so it needs to be called lazily in top scopes of internal modules
// that may be loaded before these run time states are allowed to
// be accessed.


function debuglog(set, cb) {
  function init() {
    set = set.toUpperCase();
    enabled = testEnabled(set);
  }

  let debug = (...args) => {
    init(); // Only invokes debuglogImpl() when the debug function is
    // called for the first time.

    debug = debuglogImpl(enabled, set);

    if (typeof cb === "function") {
      cb(debug);
    }

    return debug(...args);
  };

  let enabled;

  let test = () => {
    init();

    test = () => enabled;

    return enabled;
  };

  const logger = (...args) => debug(...args);

  Object.defineProperty(logger, "enabled", {
    get() {
      return test();
    },

    configurable: true,
    enumerable: true
  });
  return logger;
}

const {
  state
} = await Deno.permissions.query({
  name: "env",
  variable: "NODE_DEBUG"
});

if (state === "granted") {
  initializeDebugEnv(Deno.env.get("NODE_DEBUG") ?? "");
} else {
  initializeDebugEnv("");
}

// Copyright Node.js contributors. All rights reserved. MIT License.
let debug$3 = debuglog("stream", fn => {
  debug$3 = fn;
});
function _destroy$1(self, err, cb) {
  self._destroy(err || null, err => {
    const r = self._readableState;

    if (err) {
      // Avoid V8 leak, https://github.com/nodejs/node/pull/34103#issuecomment-652002364
      err.stack;

      if (!r.errored) {
        r.errored = err;
      }
    }

    r.closed = true;

    if (typeof cb === "function") {
      cb(err);
    }

    if (err) {
      queueMicrotask(() => {
        if (!r.errorEmitted) {
          r.errorEmitted = true;
          self.emit("error", err);
        }

        r.closeEmitted = true;

        if (r.emitClose) {
          self.emit("close");
        }
      });
    } else {
      queueMicrotask(() => {
        r.closeEmitted = true;

        if (r.emitClose) {
          self.emit("close");
        }
      });
    }
  });
}
function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    if (state.multiAwaitDrain) {
      state.awaitDrainWriters.clear();
    } else {
      state.awaitDrainWriters = null;
    }

    stream.emit("data", chunk);
  } else {
    // Update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;

    if (addToFront) {
      state.buffer.unshift(chunk);
    } else {
      state.buffer.push(chunk);
    }

    if (state.needReadable) {
      emitReadable(stream);
    }
  }

  maybeReadMore(stream, state);
} // Don't raise the hwm > 1GB.

const MAX_HWM = 0x40000000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }

  return n;
}
function emitReadable(stream) {
  const state = stream._readableState;
  debug$3("emitReadable", state.needReadable, state.emittedReadable);
  state.needReadable = false;

  if (!state.emittedReadable) {
    debug$3("emitReadable", state.flowing);
    state.emittedReadable = true;
    queueMicrotask(() => emitReadable_(stream));
  }
}

function emitReadable_(stream) {
  const state = stream._readableState;
  debug$3("emitReadable_", state.destroyed, state.length, state.ended);

  if (!state.destroyed && !state.errored && (state.length || state.ended)) {
    stream.emit("readable");
    state.emittedReadable = false;
  }

  state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
  flow(stream);
}

function endReadable(stream) {
  const state = stream._readableState;
  debug$3("endReadable", state.endEmitted);

  if (!state.endEmitted) {
    state.ended = true;
    queueMicrotask(() => endReadableNT$1(state, stream));
  }
}

function endReadableNT$1(state, stream) {
  debug$3("endReadableNT", state.endEmitted, state.length);

  if (!state.errorEmitted && !state.closeEmitted && !state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.emit("end");

    if (state.autoDestroy) {
      stream.destroy();
    }
  }
}

function errorOrDestroy$2(stream, err, sync = false) {
  const r = stream._readableState;

  if (r.destroyed) {
    return stream;
  }

  if (r.autoDestroy) {
    stream.destroy(err);
  } else if (err) {
    // Avoid V8 leak, https://github.com/nodejs/node/pull/34103#issuecomment-652002364
    err.stack;

    if (!r.errored) {
      r.errored = err;
    }

    if (sync) {
      queueMicrotask(() => {
        if (!r.errorEmitted) {
          r.errorEmitted = true;
          stream.emit("error", err);
        }
      });
    } else if (!r.errorEmitted) {
      r.errorEmitted = true;
      stream.emit("error", err);
    }
  }
}

function flow(stream) {
  const state = stream._readableState;
  debug$3("flow", state.flowing);

  while (state.flowing && stream.read() !== null);
}
/** Pluck off n bytes from an array of buffers.
 * Length is the combined lengths of all the buffers in the list.
 * This function is designed to be inlinable, so please take care when making
 * changes to the function body. */


function fromList(n, state) {
  // nothing buffered.
  if (state.length === 0) {
    return null;
  }

  let ret;

  if (state.objectMode) {
    ret = state.buffer.shift();
  } else if (!n || n >= state.length) {
    if (state.decoder) {
      ret = state.buffer.join("");
    } else if (state.buffer.length === 1) {
      ret = state.buffer.first();
    } else {
      ret = state.buffer.concat(state.length);
    }

    state.buffer.clear();
  } else {
    ret = state.buffer.consume(n, !!state.decoder);
  }

  return ret;
}
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) {
    return 0;
  }

  if (state.objectMode) {
    return 1;
  }

  if (Number.isNaN(n)) {
    // Only flow one buffer at a time.
    if (state.flowing && state.length) {
      return state.buffer.first().length;
    }

    return state.length;
  }

  if (n <= state.length) {
    return n;
  }

  return state.ended ? state.length : 0;
}
function maybeReadMore(stream, state) {
  if (!state.readingMore && state.constructed) {
    state.readingMore = true;
    queueMicrotask(() => maybeReadMore_(stream, state));
  }
}

function maybeReadMore_(stream, state) {
  while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
    const len = state.length;
    debug$3("maybeReadMore read 0");
    stream.read(0);

    if (len === state.length) {
      // Didn't get any data, stop spinning.
      break;
    }
  }

  state.readingMore = false;
}

function nReadingNextTick(self) {
  debug$3("readable nexttick read 0");
  self.read(0);
}
function onEofChunk(stream, state) {
  debug$3("onEofChunk");
  if (state.ended) return;

  if (state.decoder) {
    const chunk = state.decoder.end();

    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }

  state.ended = true;

  if (state.sync) {
    emitReadable(stream);
  } else {
    state.needReadable = false;
    state.emittedReadable = true;
    emitReadable_(stream);
  }
}
function pipeOnDrain(src, dest) {
  return function pipeOnDrainFunctionResult() {
    const state = src._readableState;

    if (state.awaitDrainWriters === dest) {
      debug$3("pipeOnDrain", 1);
      state.awaitDrainWriters = null;
    } else if (state.multiAwaitDrain) {
      debug$3("pipeOnDrain", state.awaitDrainWriters.size);
      state.awaitDrainWriters.delete(dest);
    }

    if ((!state.awaitDrainWriters || state.awaitDrainWriters.size === 0) && src.listenerCount("data")) {
      state.flowing = true;
      flow(src);
    }
  };
}
function prependListener(emitter, event, // deno-lint-ignore no-explicit-any
fn) {
  if (typeof emitter.prependListener === "function") {
    return emitter.prependListener(event, fn);
  } // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  //the prependListener() method. The goal is to eventually remove this hack.
  // TODO(Soremwar)
  // Burn it with fire
  // deno-lint-ignore ban-ts-comment
  // @ts-ignore


  if (emitter._events.get(event)?.length) {
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    const listeners = [fn, ...emitter._events.get(event)]; // deno-lint-ignore ban-ts-comment
    // @ts-ignore

    emitter._events.set(event, listeners);
  } else {
    emitter.on(event, fn);
  }
}
function readableAddChunk$1(stream, chunk, encoding = undefined, addToFront) {
  const state = stream._readableState;
  let usedEncoding = encoding;

  if (!state.objectMode) {
    if (typeof chunk === "string") {
      usedEncoding = encoding || state.defaultEncoding;

      if (state.encoding !== usedEncoding) {
        if (addToFront && state.encoding) {
          chunk = Buffer.from(chunk, usedEncoding).toString(state.encoding);
        } else {
          chunk = Buffer.from(chunk, usedEncoding);
          usedEncoding = "";
        }
      }
    } else if (chunk instanceof Uint8Array) {
      chunk = Buffer.from(chunk);
    }
  }

  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else if (state.objectMode || chunk.length > 0) {
    if (addToFront) {
      if (state.endEmitted) {
        errorOrDestroy$2(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
      } else {
        addChunk(stream, state, chunk, true);
      }
    } else if (state.ended) {
      errorOrDestroy$2(stream, new ERR_STREAM_PUSH_AFTER_EOF());
    } else if (state.destroyed || state.errored) {
      return false;
    } else {
      state.reading = false;

      if (state.decoder && !usedEncoding) {
        //TODO(Soremwar)
        //I don't think this cast is right
        chunk = state.decoder.write(Buffer.from(chunk));

        if (state.objectMode || chunk.length !== 0) {
          addChunk(stream, state, chunk, false);
        } else {
          maybeReadMore(stream, state);
        }
      } else {
        addChunk(stream, state, chunk, false);
      }
    }
  } else if (!addToFront) {
    state.reading = false;
    maybeReadMore(stream, state);
  }

  return !state.ended && (state.length < state.highWaterMark || state.length === 0);
}
function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    queueMicrotask(() => resume_(stream, state));
  }
}

function resume_(stream, state) {
  debug$3("resume", state.reading);

  if (!state.reading) {
    stream.read(0);
  }

  state.resumeScheduled = false;
  stream.emit("resume");
  flow(stream);

  if (state.flowing && !state.reading) {
    stream.read(0);
  }
}

function updateReadableListening(self) {
  const state = self._readableState;
  state.readableListening = self.listenerCount("readable") > 0;

  if (state.resumeScheduled && state[kPaused] === false) {
    // Flowing needs to be set to true now, otherwise
    // the upcoming resume will not flow.
    state.flowing = true; // Crude way to check if we should resume.
  } else if (self.listenerCount("data") > 0) {
    self.resume();
  } else if (!state.readableListening) {
    state.flowing = null;
  }
}

// Copyright Node.js contributors. All rights reserved. MIT License.
const kOnFinished = Symbol("kOnFinished");

function _destroy(self, err, cb) {
  self._destroy(err || null, err => {
    const w = self._writableState;

    if (err) {
      // Avoid V8 leak, https://github.com/nodejs/node/pull/34103#issuecomment-652002364
      err.stack;

      if (!w.errored) {
        w.errored = err;
      }
    }

    w.closed = true;

    if (typeof cb === "function") {
      cb(err);
    }

    if (err) {
      queueMicrotask(() => {
        if (!w.errorEmitted) {
          w.errorEmitted = true;
          self.emit("error", err);
        }

        w.closeEmitted = true;

        if (w.emitClose) {
          self.emit("close");
        }
      });
    } else {
      queueMicrotask(() => {
        w.closeEmitted = true;

        if (w.emitClose) {
          self.emit("close");
        }
      });
    }
  });
}

function afterWrite(stream, state, count, cb) {
  const needDrain = !state.ending && !stream.destroyed && state.length === 0 && state.needDrain;

  if (needDrain) {
    state.needDrain = false;
    stream.emit("drain");
  }

  while (count-- > 0) {
    state.pendingcb--;
    cb();
  }

  if (state.destroyed) {
    errorBuffer(state);
  }

  finishMaybe$1(stream, state);
}
function afterWriteTick({
  cb,
  count,
  state,
  stream
}) {
  state.afterWriteTickInfo = null;
  return afterWrite(stream, state, count, cb);
}
/** If there's something in the buffer waiting, then process it.*/

function clearBuffer(stream, state) {
  if (state.corked || state.bufferProcessing || state.destroyed || !state.constructed) {
    return;
  }

  const {
    buffered,
    bufferedIndex,
    objectMode
  } = state;
  const bufferedLength = buffered.length - bufferedIndex;

  if (!bufferedLength) {
    return;
  }

  let i = bufferedIndex;
  state.bufferProcessing = true;

  if (bufferedLength > 1 && stream._writev) {
    state.pendingcb -= bufferedLength - 1;
    const callback = state.allNoop ? nop : err => {
      for (let n = i; n < buffered.length; ++n) {
        buffered[n].callback(err);
      }
    };
    const chunks = state.allNoop && i === 0 ? buffered : buffered.slice(i);
    doWrite(stream, state, true, state.length, chunks, "", callback);
    resetBuffer(state);
  } else {
    do {
      const {
        chunk,
        encoding,
        callback
      } = buffered[i];
      buffered[i++] = null;
      const len = objectMode ? 1 : chunk.length;
      doWrite(stream, state, false, len, chunk, encoding, callback);
    } while (i < buffered.length && !state.writing);

    if (i === buffered.length) {
      resetBuffer(state);
    } else if (i > 256) {
      buffered.splice(0, i);
      state.bufferedIndex = 0;
    } else {
      state.bufferedIndex = i;
    }
  }

  state.bufferProcessing = false;
}
function destroy(err, cb) {
  const w = this._writableState;

  if (w.destroyed) {
    if (typeof cb === "function") {
      cb();
    }

    return this;
  }

  if (err) {
    // Avoid V8 leak, https://github.com/nodejs/node/pull/34103#issuecomment-652002364
    err.stack;

    if (!w.errored) {
      w.errored = err;
    }
  }

  w.destroyed = true;

  if (!w.constructed) {
    this.once(kDestroy, er => {
      _destroy(this, err || er, cb);
    });
  } else {
    _destroy(this, err, cb);
  }

  return this;
}

function doWrite(stream, state, writev, len, // deno-lint-ignore no-explicit-any
chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;

  if (state.destroyed) {
    state.onwrite(new ERR_STREAM_DESTROYED("write"));
  } else if (writev) {
    stream._writev(chunk, state.onwrite);
  } else {
    stream._write(chunk, encoding, state.onwrite);
  }

  state.sync = false;
}
/** If there's something in the buffer waiting, then invoke callbacks.*/


function errorBuffer(state) {
  if (state.writing) {
    return;
  }

  for (let n = state.bufferedIndex; n < state.buffered.length; ++n) {
    const {
      chunk,
      callback
    } = state.buffered[n];
    const len = state.objectMode ? 1 : chunk.length;
    state.length -= len;
    callback(new ERR_STREAM_DESTROYED("write"));
  }

  for (const callback of state[kOnFinished].splice(0)) {
    callback(new ERR_STREAM_DESTROYED("end"));
  }

  resetBuffer(state);
}
function errorOrDestroy$1(stream, err, sync = false) {
  const w = stream._writableState;

  if (w.destroyed) {
    return stream;
  }

  if (w.autoDestroy) {
    stream.destroy(err);
  } else if (err) {
    // Avoid V8 leak, https://github.com/nodejs/node/pull/34103#issuecomment-652002364
    err.stack;

    if (!w.errored) {
      w.errored = err;
    }

    if (sync) {
      queueMicrotask(() => {
        if (w.errorEmitted) {
          return;
        }

        w.errorEmitted = true;
        stream.emit("error", err);
      });
    } else {
      if (w.errorEmitted) {
        return;
      }

      w.errorEmitted = true;
      stream.emit("error", err);
    }
  }
}

function finish$1(stream, state) {
  state.pendingcb--;

  if (state.errorEmitted || state.closeEmitted) {
    return;
  }

  state.finished = true;

  for (const callback of state[kOnFinished].splice(0)) {
    callback();
  }

  stream.emit("finish");

  if (state.autoDestroy) {
    stream.destroy();
  }
}

function finishMaybe$1(stream, state, sync) {
  if (needFinish(state)) {
    prefinish(stream, state);

    if (state.pendingcb === 0 && needFinish(state)) {
      state.pendingcb++;

      if (sync) {
        queueMicrotask(() => finish$1(stream, state));
      } else {
        finish$1(stream, state);
      }
    }
  }
}
function needFinish(state) {
  return state.ending && state.constructed && state.length === 0 && !state.errored && state.buffered.length === 0 && !state.finished && !state.writing;
}
function nop() {}
function resetBuffer(state) {
  state.buffered = [];
  state.bufferedIndex = 0;
  state.allBuffers = true;
  state.allNoop = true;
}

function onwriteError$1(stream, state, er, cb) {
  --state.pendingcb;
  cb(er);
  errorBuffer(state);
  errorOrDestroy$1(stream, er);
}

function onwrite$1(stream, er) {
  const state = stream._writableState;
  const sync = state.sync;
  const cb = state.writecb;

  if (typeof cb !== "function") {
    errorOrDestroy$1(stream, new ERR_MULTIPLE_CALLBACK());
    return;
  }

  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;

  if (er) {
    // Avoid V8 leak, https://github.com/nodejs/node/pull/34103#issuecomment-652002364
    er.stack;

    if (!state.errored) {
      state.errored = er;
    }

    if (sync) {
      queueMicrotask(() => onwriteError$1(stream, state, er, cb));
    } else {
      onwriteError$1(stream, state, er, cb);
    }
  } else {
    if (state.buffered.length > state.bufferedIndex) {
      clearBuffer(stream, state);
    }

    if (sync) {
      if (state.afterWriteTickInfo !== null && state.afterWriteTickInfo.cb === cb) {
        state.afterWriteTickInfo.count++;
      } else {
        state.afterWriteTickInfo = {
          count: 1,
          cb: cb,
          stream,
          state
        };
        queueMicrotask(() => afterWriteTick(state.afterWriteTickInfo));
      }
    } else {
      afterWrite(stream, state, 1, cb);
    }
  }
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === "function" && !state.destroyed) {
      state.finalCalled = true;
      state.sync = true;
      state.pendingcb++;

      stream._final(err => {
        state.pendingcb--;

        if (err) {
          for (const callback of state[kOnFinished].splice(0)) {
            callback(err);
          }

          errorOrDestroy$1(stream, err, state.sync);
        } else if (needFinish(state)) {
          state.prefinished = true;
          stream.emit("prefinish");
          state.pendingcb++;
          queueMicrotask(() => finish$1(stream, state));
        }
      });

      state.sync = false;
    } else {
      state.prefinished = true;
      stream.emit("prefinish");
    }
  }
}
function writeOrBuffer(stream, state, // deno-lint-ignore no-explicit-any
chunk, encoding, callback) {
  const len = state.objectMode ? 1 : chunk.length;
  state.length += len;
  const ret = state.length < state.highWaterMark;

  if (!ret) {
    state.needDrain = true;
  }

  if (state.writing || state.corked || state.errored || !state.constructed) {
    state.buffered.push({
      chunk,
      encoding,
      callback
    });

    if (state.allBuffers && encoding !== "buffer") {
      state.allBuffers = false;
    }

    if (state.allNoop && callback !== nop) {
      state.allNoop = false;
    }
  } else {
    state.writelen = len;
    state.writecb = callback;
    state.writing = true;
    state.sync = true;

    stream._write(chunk, encoding, state.onwrite);

    state.sync = false;
  }

  return ret && !state.errored && !state.destroyed;
}

// Copyright Node.js contributors. All rights reserved. MIT License.
let debug$2 = debuglog("stream", fn => {
  debug$2 = fn;
});
class ReadableState {
  [kPaused] = null;
  awaitDrainWriters = null;
  buffer = new BufferList();
  closed = false;
  closeEmitted = false;
  decoder = null;
  destroyed = false;
  emittedReadable = false;
  encoding = null;
  ended = false;
  endEmitted = false;
  errored = null;
  errorEmitted = false;
  flowing = null;
  length = 0;
  multiAwaitDrain = false;
  needReadable = false;
  pipes = [];
  readable = true;
  readableListening = false;
  reading = false;
  readingMore = false;
  dataEmitted = false;
  resumeScheduled = false;
  sync = true;

  constructor(options) {
    this.objectMode = !!options?.objectMode;
    this.highWaterMark = options?.highWaterMark ?? (this.objectMode ? 16 : 16 * 1024);

    if (Number.isInteger(this.highWaterMark) && this.highWaterMark >= 0) {
      this.highWaterMark = Math.floor(this.highWaterMark);
    } else {
      throw new ERR_INVALID_OPT_VALUE("highWaterMark", this.highWaterMark);
    }

    this.emitClose = options?.emitClose ?? true;
    this.autoDestroy = options?.autoDestroy ?? true;
    this.defaultEncoding = options?.defaultEncoding || "utf8";

    if (options?.encoding) {
      this.decoder = new StringDecoder(options.encoding);
      this.encoding = options.encoding;
    }

    this.constructed = true;
  }

}

class Readable extends Stream {
  constructor(options) {
    super();

    if (options) {
      if (typeof options.read === "function") {
        this._read = options.read;
      }

      if (typeof options.destroy === "function") {
        this._destroy = options.destroy;
      }
    }

    this._readableState = new ReadableState(options);
  }

  static from( // deno-lint-ignore no-explicit-any
  iterable, opts) {
    return from(iterable, opts);
  }

  static ReadableState = ReadableState;
  static _fromList = fromList; // You can override either this method, or the async _read(n) below.

  read(n) {
    debug$2("read", n); // Same as parseInt(undefined, 10), however V8 7.3 performance regressed
    // in this scenario, so we are doing it manually.

    if (n === undefined) {
      n = NaN;
    }

    const state = this._readableState;
    const nOrig = n;

    if (n > state.highWaterMark) {
      state.highWaterMark = computeNewHighWaterMark(n);
    }

    if (n !== 0) {
      state.emittedReadable = false;
    }

    if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
      if (state.length === 0 && state.ended) {
        endReadable(this);
      } else {
        emitReadable(this);
      }

      return null;
    }

    n = howMuchToRead(n, state);

    if (n === 0 && state.ended) {
      if (state.length === 0) {
        endReadable(this);
      }

      return null;
    }

    let doRead = state.needReadable;

    if (state.length === 0 || state.length - n < state.highWaterMark) {
      doRead = true;
    }

    if (state.ended || state.reading || state.destroyed || state.errored || !state.constructed) {
      doRead = false;
    } else if (doRead) {
      state.reading = true;
      state.sync = true;

      if (state.length === 0) {
        state.needReadable = true;
      }

      this._read();

      state.sync = false;

      if (!state.reading) {
        n = howMuchToRead(nOrig, state);
      }
    }

    let ret;

    if (n > 0) {
      ret = fromList(n, state);
    } else {
      ret = null;
    }

    if (ret === null) {
      state.needReadable = state.length <= state.highWaterMark;
      n = 0;
    } else {
      state.length -= n;

      if (state.multiAwaitDrain) {
        state.awaitDrainWriters.clear();
      } else {
        state.awaitDrainWriters = null;
      }
    }

    if (state.length === 0) {
      if (!state.ended) {
        state.needReadable = true;
      }

      if (nOrig !== n && state.ended) {
        endReadable(this);
      }
    }

    if (ret !== null) {
      this.emit("data", ret);
    }

    return ret;
  }

  _read(_size) {
    throw new ERR_METHOD_NOT_IMPLEMENTED("_read()");
  }

  pipe(dest, pipeOpts) {
    // deno-lint-ignore no-this-alias
    const src = this;
    const state = this._readableState;

    if (state.pipes.length === 1) {
      if (!state.multiAwaitDrain) {
        state.multiAwaitDrain = true;
        state.awaitDrainWriters = new Set(state.awaitDrainWriters ? [state.awaitDrainWriters] : []);
      }
    }

    state.pipes.push(dest);
    debug$2("pipe count=%d opts=%j", state.pipes.length, pipeOpts);
    const doEnd = !pipeOpts || pipeOpts.end !== false; //TODO(Soremwar)
    //Part of doEnd condition
    //In  node, output/input are a duplex Stream
    // &&
    // dest !== stdout &&
    // dest !== stderr

    const endFn = doEnd ? onend : unpipe;

    if (state.endEmitted) {
      queueMicrotask(endFn);
    } else {
      this.once("end", endFn);
    }

    dest.on("unpipe", onunpipe);

    function onunpipe(readable, unpipeInfo) {
      debug$2("onunpipe");

      if (readable === src) {
        if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
          unpipeInfo.hasUnpiped = true;
          cleanup();
        }
      }
    }

    function onend() {
      debug$2("onend");
      dest.end();
    }

    let ondrain;
    let cleanedUp = false;

    function cleanup() {
      debug$2("cleanup");
      dest.removeListener("close", onclose);
      dest.removeListener("finish", onfinish);

      if (ondrain) {
        dest.removeListener("drain", ondrain);
      }

      dest.removeListener("error", onerror);
      dest.removeListener("unpipe", onunpipe);
      src.removeListener("end", onend);
      src.removeListener("end", unpipe);
      src.removeListener("data", ondata);
      cleanedUp = true;

      if (ondrain && state.awaitDrainWriters && (!dest._writableState || dest._writableState.needDrain)) {
        ondrain();
      }
    }

    this.on("data", ondata); // deno-lint-ignore no-explicit-any

    function ondata(chunk) {
      debug$2("ondata");
      const ret = dest.write(chunk);
      debug$2("dest.write", ret);

      if (ret === false) {
        if (!cleanedUp) {
          if (state.pipes.length === 1 && state.pipes[0] === dest) {
            debug$2("false write response, pause", 0);
            state.awaitDrainWriters = dest;
            state.multiAwaitDrain = false;
          } else if (state.pipes.length > 1 && state.pipes.includes(dest)) {
            debug$2("false write response, pause");
            state.awaitDrainWriters.add(dest);
          }

          src.pause();
        }

        if (!ondrain) {
          ondrain = pipeOnDrain(src, dest);
          dest.on("drain", ondrain);
        }
      }
    }

    function onerror(er) {
      debug$2("onerror", er);
      unpipe();
      dest.removeListener("error", onerror);

      if (dest.listenerCount("error") === 0) {
        const s = dest._writableState || dest._readableState;

        if (s && !s.errorEmitted) {
          if (dest instanceof Duplex) {
            errorOrDestroy(dest, er);
          } else {
            errorOrDestroy$1(dest, er);
          }
        } else {
          dest.emit("error", er);
        }
      }
    }

    prependListener(dest, "error", onerror);

    function onclose() {
      dest.removeListener("finish", onfinish);
      unpipe();
    }

    dest.once("close", onclose);

    function onfinish() {
      debug$2("onfinish");
      dest.removeListener("close", onclose);
      unpipe();
    }

    dest.once("finish", onfinish);

    function unpipe() {
      debug$2("unpipe");
      src.unpipe(dest);
    }

    dest.emit("pipe", src);

    if (!state.flowing) {
      debug$2("pipe resume");
      this.resume();
    }

    return dest;
  }

  isPaused() {
    return this._readableState[kPaused] === true || this._readableState.flowing === false;
  }

  setEncoding(enc) {
    const decoder = new StringDecoder(enc);
    this._readableState.decoder = decoder;
    this._readableState.encoding = this._readableState.decoder.encoding;
    const buffer = this._readableState.buffer;
    let content = "";

    for (const data of buffer) {
      content += decoder.write(data);
    }

    buffer.clear();

    if (content !== "") {
      buffer.push(content);
    }

    this._readableState.length = content.length;
    return this;
  }

  on(ev, fn) {
    const res = super.on.call(this, ev, fn);
    const state = this._readableState;

    if (ev === "data") {
      state.readableListening = this.listenerCount("readable") > 0;

      if (state.flowing !== false) {
        this.resume();
      }
    } else if (ev === "readable") {
      if (!state.endEmitted && !state.readableListening) {
        state.readableListening = state.needReadable = true;
        state.flowing = false;
        state.emittedReadable = false;

        if (state.length) {
          emitReadable(this);
        } else if (!state.reading) {
          queueMicrotask(() => nReadingNextTick(this));
        }
      }
    }

    return res;
  }

  removeListener(ev, fn) {
    const res = super.removeListener.call(this, ev, fn);

    if (ev === "readable") {
      queueMicrotask(() => updateReadableListening(this));
    }

    return res;
  }

  off = this.removeListener;

  destroy(err, cb) {
    const r = this._readableState;

    if (r.destroyed) {
      if (typeof cb === "function") {
        cb();
      }

      return this;
    }

    if (err) {
      // Avoid V8 leak, https://github.com/nodejs/node/pull/34103#issuecomment-652002364
      err.stack;

      if (!r.errored) {
        r.errored = err;
      }
    }

    r.destroyed = true; // If still constructing then defer calling _destroy.

    if (!r.constructed) {
      this.once(kDestroy, er => {
        _destroy$1(this, err || er, cb);
      });
    } else {
      _destroy$1(this, err, cb);
    }

    return this;
  }

  _undestroy() {
    const r = this._readableState;
    r.constructed = true;
    r.closed = false;
    r.closeEmitted = false;
    r.destroyed = false;
    r.errored = null;
    r.errorEmitted = false;
    r.reading = false;
    r.ended = r.readable === false;
    r.endEmitted = r.readable === false;
  }

  _destroy(error, callback) {
    callback(error);
  }

  [captureRejectionSymbol](err) {
    this.destroy(err);
  } // deno-lint-ignore no-explicit-any


  push(chunk, encoding) {
    return readableAddChunk$1(this, chunk, encoding, false);
  } // deno-lint-ignore no-explicit-any


  unshift(chunk, encoding) {
    return readableAddChunk$1(this, chunk, encoding, true);
  }

  unpipe(dest) {
    const state = this._readableState;
    const unpipeInfo = {
      hasUnpiped: false
    };

    if (state.pipes.length === 0) {
      return this;
    }

    if (!dest) {
      // remove all.
      const dests = state.pipes;
      state.pipes = [];
      this.pause();

      for (const dest of dests) {
        dest.emit("unpipe", this, {
          hasUnpiped: false
        });
      }

      return this;
    }

    const index = state.pipes.indexOf(dest);

    if (index === -1) {
      return this;
    }

    state.pipes.splice(index, 1);

    if (state.pipes.length === 0) {
      this.pause();
    }

    dest.emit("unpipe", this, unpipeInfo);
    return this;
  }

  removeAllListeners(ev) {
    const res = super.removeAllListeners(ev);

    if (ev === "readable" || ev === undefined) {
      queueMicrotask(() => updateReadableListening(this));
    }

    return res;
  }

  resume() {
    const state = this._readableState;

    if (!state.flowing) {
      debug$2("resume"); // We flow only if there is no one listening
      // for readable, but we still have to call
      // resume().

      state.flowing = !state.readableListening;
      resume(this, state);
    }

    state[kPaused] = false;
    return this;
  }

  pause() {
    debug$2("call pause flowing=%j", this._readableState.flowing);

    if (this._readableState.flowing !== false) {
      debug$2("pause");
      this._readableState.flowing = false;
      this.emit("pause");
    }

    this._readableState[kPaused] = true;
    return this;
  }
  /** Wrap an old-style stream as the async data source. */


  wrap(stream) {
    const state = this._readableState;
    let paused = false;
    stream.on("end", () => {
      if (state.decoder && !state.ended) {
        const chunk = state.decoder.end();

        if (chunk && chunk.length) {
          this.push(chunk);
        }
      }

      this.push(null);
    });
    stream.on("data", chunk => {
      if (state.decoder) {
        chunk = state.decoder.write(chunk);
      }

      if (state.objectMode && (chunk === null || chunk === undefined)) {
        return;
      } else if (!state.objectMode && (!chunk || !chunk.length)) {
        return;
      }

      const ret = this.push(chunk);

      if (!ret) {
        paused = true; // By the time this is triggered, stream will be a readable stream
        // deno-lint-ignore ban-ts-comment
        // @ts-ignore

        stream.pause();
      }
    }); // TODO(Soremwar)
    // There must be a clean way to implement this on TypeScript
    // Proxy all the other methods. Important when wrapping filters and duplexes.

    for (const i in stream) {
      // deno-lint-ignore ban-ts-comment
      // @ts-ignore
      if (this[i] === undefined && typeof stream[i] === "function") {
        // deno-lint-ignore ban-ts-comment
        // @ts-ignore
        this[i] = function methodWrap(method) {
          return function methodWrapReturnFunction() {
            // deno-lint-ignore ban-ts-comment
            // @ts-ignore
            return stream[method].apply(stream);
          };
        }(i);
      }
    }

    stream.on("error", err => {
      errorOrDestroy$2(this, err);
    });
    stream.on("close", () => {
      this.emit("close");
    });
    stream.on("destroy", () => {
      this.emit("destroy");
    });
    stream.on("pause", () => {
      this.emit("pause");
    });
    stream.on("resume", () => {
      this.emit("resume");
    });

    this._read = () => {
      if (paused) {
        paused = false; // By the time this is triggered, stream will be a readable stream
        // deno-lint-ignore ban-ts-comment
        // @ts-ignore

        stream.resume();
      }
    };

    return this;
  }

  [Symbol.asyncIterator]() {
    return createReadableStreamAsyncIterator(this);
  }

  get readable() {
    return this._readableState?.readable && !this._readableState?.destroyed && !this._readableState?.errorEmitted && !this._readableState?.endEmitted;
  }

  set readable(val) {
    if (this._readableState) {
      this._readableState.readable = val;
    }
  }

  get readableHighWaterMark() {
    return this._readableState.highWaterMark;
  }

  get readableBuffer() {
    return this._readableState && this._readableState.buffer;
  }

  get readableFlowing() {
    return this._readableState.flowing;
  }

  set readableFlowing(state) {
    if (this._readableState) {
      this._readableState.flowing = state;
    }
  }

  get readableLength() {
    return this._readableState.length;
  }

  get readableObjectMode() {
    return this._readableState ? this._readableState.objectMode : false;
  }

  get readableEncoding() {
    return this._readableState ? this._readableState.encoding : null;
  }

  get destroyed() {
    if (this._readableState === undefined) {
      return false;
    }

    return this._readableState.destroyed;
  }

  set destroyed(value) {
    if (!this._readableState) {
      return;
    }

    this._readableState.destroyed = value;
  }

  get readableEnded() {
    return this._readableState ? this._readableState.endEmitted : false;
  }

}

Object.defineProperties(Readable, {
  _readableState: {
    enumerable: false
  },
  destroyed: {
    enumerable: false
  },
  readableBuffer: {
    enumerable: false
  },
  readableEncoding: {
    enumerable: false
  },
  readableEnded: {
    enumerable: false
  },
  readableFlowing: {
    enumerable: false
  },
  readableHighWaterMark: {
    enumerable: false
  },
  readableLength: {
    enumerable: false
  },
  readableObjectMode: {
    enumerable: false
  }
});

// Copyright Node.js contributors. All rights reserved. MIT License.
class WritableState {
  [kOnFinished] = [];
  afterWriteTickInfo = null;
  allBuffers = true;
  allNoop = true;
  buffered = [];
  bufferedIndex = 0;
  bufferProcessing = false;
  closed = false;
  closeEmitted = false;
  corked = 0;
  destroyed = false;
  ended = false;
  ending = false;
  errored = null;
  errorEmitted = false;
  finalCalled = false;
  finished = false;
  length = 0;
  needDrain = false;
  pendingcb = 0;
  prefinished = false;
  sync = true;
  writecb = null;
  writable = true;
  writelen = 0;
  writing = false;

  constructor(options, stream) {
    this.objectMode = !!options?.objectMode;
    this.highWaterMark = options?.highWaterMark ?? (this.objectMode ? 16 : 16 * 1024);

    if (Number.isInteger(this.highWaterMark) && this.highWaterMark >= 0) {
      this.highWaterMark = Math.floor(this.highWaterMark);
    } else {
      throw new ERR_INVALID_OPT_VALUE("highWaterMark", this.highWaterMark);
    }

    this.decodeStrings = !options?.decodeStrings === false;
    this.defaultEncoding = options?.defaultEncoding || "utf8";
    this.onwrite = onwrite$1.bind(undefined, stream);
    resetBuffer(this);
    this.emitClose = options?.emitClose ?? true;
    this.autoDestroy = options?.autoDestroy ?? true;
    this.constructed = true;
  }

  getBuffer() {
    return this.buffered.slice(this.bufferedIndex);
  }

  get bufferedRequestCount() {
    return this.buffered.length - this.bufferedIndex;
  }

}
/** A bit simpler than readable streams.
 * Implement an async `._write(chunk, encoding, cb)`, and it'll handle all
 * the drain event emission and buffering. */

class Writable extends Stream {
  _writev = null;

  constructor(options) {
    super();
    this._writableState = new WritableState(options, this);

    if (options) {
      if (typeof options.write === "function") {
        this._write = options.write;
      }

      if (typeof options.writev === "function") {
        this._writev = options.writev;
      }

      if (typeof options.destroy === "function") {
        this._destroy = options.destroy;
      }

      if (typeof options.final === "function") {
        this._final = options.final;
      }
    }
  }

  [captureRejectionSymbol](err) {
    this.destroy(err);
  }

  static WritableState = WritableState;

  get destroyed() {
    return this._writableState ? this._writableState.destroyed : false;
  }

  set destroyed(value) {
    if (this._writableState) {
      this._writableState.destroyed = value;
    }
  }

  get writable() {
    const w = this._writableState;
    return !w.destroyed && !w.errored && !w.ending && !w.ended;
  }

  set writable(val) {
    if (this._writableState) {
      this._writableState.writable = !!val;
    }
  }

  get writableFinished() {
    return this._writableState ? this._writableState.finished : false;
  }

  get writableObjectMode() {
    return this._writableState ? this._writableState.objectMode : false;
  }

  get writableBuffer() {
    return this._writableState && this._writableState.getBuffer();
  }

  get writableEnded() {
    return this._writableState ? this._writableState.ending : false;
  }

  get writableHighWaterMark() {
    return this._writableState && this._writableState.highWaterMark;
  }

  get writableCorked() {
    return this._writableState ? this._writableState.corked : 0;
  }

  get writableLength() {
    return this._writableState && this._writableState.length;
  }

  _undestroy() {
    const w = this._writableState;
    w.constructed = true;
    w.destroyed = false;
    w.closed = false;
    w.closeEmitted = false;
    w.errored = null;
    w.errorEmitted = false;
    w.finalCalled = false;
    w.prefinished = false;
    w.ended = w.writable === false;
    w.ending = w.writable === false;
    w.finished = w.writable === false;
  }

  _destroy(err, cb) {
    cb(err);
  }

  destroy(err, cb) {
    const state = this._writableState;

    if (!state.destroyed) {
      queueMicrotask(() => errorBuffer(state));
    }

    destroy.call(this, err, cb);
    return this;
  }

  end( // deno-lint-ignore no-explicit-any
  x, y, z) {
    const state = this._writableState; // deno-lint-ignore no-explicit-any

    let chunk;
    let encoding;
    let cb;

    if (typeof x === "function") {
      chunk = null;
      encoding = null;
      cb = x;
    } else if (typeof y === "function") {
      chunk = x;
      encoding = null;
      cb = y;
    } else {
      chunk = x;
      encoding = y;
      cb = z;
    }

    if (chunk !== null && chunk !== undefined) {
      this.write(chunk, encoding);
    }

    if (state.corked) {
      state.corked = 1;
      this.uncork();
    }

    let err;

    if (!state.errored && !state.ending) {
      state.ending = true;
      finishMaybe$1(this, state, true);
      state.ended = true;
    } else if (state.finished) {
      err = new ERR_STREAM_ALREADY_FINISHED("end");
    } else if (state.destroyed) {
      err = new ERR_STREAM_DESTROYED("end");
    }

    if (typeof cb === "function") {
      if (err || state.finished) {
        queueMicrotask(() => {
          cb(err);
        });
      } else {
        state[kOnFinished].push(cb);
      }
    }

    return this;
  }

  _write( // deno-lint-ignore no-explicit-any
  chunk, encoding, cb) {
    if (this._writev) {
      this._writev([{
        chunk,
        encoding
      }], cb);
    } else {
      throw new ERR_METHOD_NOT_IMPLEMENTED("_write()");
    }
  } //This signature was changed to keep inheritance coherent


  pipe(dest) {
    errorOrDestroy$1(this, new ERR_STREAM_CANNOT_PIPE());
    return dest;
  } // deno-lint-ignore no-explicit-any


  write( // deno-lint-ignore no-explicit-any
  chunk, x, y) {
    const state = this._writableState;
    let encoding;
    let cb;

    if (typeof x === "function") {
      cb = x;
      encoding = state.defaultEncoding;
    } else {
      if (!x) {
        encoding = state.defaultEncoding;
      } else if (x !== "buffer" && !Buffer.isEncoding(x)) {
        throw new ERR_UNKNOWN_ENCODING(x);
      } else {
        encoding = x;
      }

      if (typeof y !== "function") {
        cb = nop;
      } else {
        cb = y;
      }
    }

    if (chunk === null) {
      throw new ERR_STREAM_NULL_VALUES();
    } else if (!state.objectMode) {
      if (typeof chunk === "string") {
        if (state.decodeStrings !== false) {
          chunk = Buffer.from(chunk, encoding);
          encoding = "buffer";
        }
      } else if (chunk instanceof Buffer) {
        encoding = "buffer";
      } else if (Stream._isUint8Array(chunk)) {
        chunk = Stream._uint8ArrayToBuffer(chunk);
        encoding = "buffer";
      } else {
        throw new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
      }
    }

    let err;

    if (state.ending) {
      err = new ERR_STREAM_WRITE_AFTER_END();
    } else if (state.destroyed) {
      err = new ERR_STREAM_DESTROYED("write");
    }

    if (err) {
      queueMicrotask(() => cb(err));
      errorOrDestroy$1(this, err, true);
      return false;
    }

    state.pendingcb++;
    return writeOrBuffer(this, state, chunk, encoding, cb);
  }

  cork() {
    this._writableState.corked++;
  }

  uncork() {
    const state = this._writableState;

    if (state.corked) {
      state.corked--;

      if (!state.writing) {
        clearBuffer(this, state);
      }
    }
  }

  setDefaultEncoding(encoding) {
    // node::ParseEncoding() requires lower case.
    if (typeof encoding === "string") {
      encoding = encoding.toLowerCase();
    }

    if (!Buffer.isEncoding(encoding)) {
      throw new ERR_UNKNOWN_ENCODING(encoding);
    }

    this._writableState.defaultEncoding = encoding;
    return this;
  }

}

// Copyright Node.js contributors. All rights reserved. MIT License.
let debug$1 = debuglog("stream", fn => {
  debug$1 = fn;
});
function endDuplex(stream) {
  const state = stream._readableState;
  debug$1("endReadable", state.endEmitted);

  if (!state.endEmitted) {
    state.ended = true;
    queueMicrotask(() => endReadableNT(state, stream));
  }
}

function endReadableNT(state, stream) {
  debug$1("endReadableNT", state.endEmitted, state.length); // Check that we didn't get one last unshift.

  if (!state.errorEmitted && !state.closeEmitted && !state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.emit("end");

    if (stream.writable && stream.allowHalfOpen === false) {
      queueMicrotask(() => endWritableNT(stream));
    } else if (state.autoDestroy) {
      // In case of duplex streams we need a way to detect
      // if the writable side is ready for autoDestroy as well.
      const wState = stream._writableState;
      const autoDestroy = !wState || wState.autoDestroy && ( // We don't expect the writable to ever 'finish'
      // if writable is explicitly set to false.
      wState.finished || wState.writable === false);

      if (autoDestroy) {
        stream.destroy();
      }
    }
  }
}

function endWritableNT(stream) {
  const writable = stream.writable && !stream.writableEnded && !stream.destroyed;

  if (writable) {
    stream.end();
  }
}

function errorOrDestroy(stream, err, sync = false) {
  const r = stream._readableState;
  const w = stream._writableState;

  if (w.destroyed || r.destroyed) {
    return this;
  }

  if (r.autoDestroy || w.autoDestroy) {
    stream.destroy(err);
  } else if (err) {
    // Avoid V8 leak, https://github.com/nodejs/node/pull/34103#issuecomment-652002364
    err.stack;

    if (w && !w.errored) {
      w.errored = err;
    }

    if (r && !r.errored) {
      r.errored = err;
    }

    if (sync) {
      queueMicrotask(() => {
        if (w.errorEmitted || r.errorEmitted) {
          return;
        }

        w.errorEmitted = true;
        r.errorEmitted = true;
        stream.emit("error", err);
      });
    } else {
      if (w.errorEmitted || r.errorEmitted) {
        return;
      }

      w.errorEmitted = true;
      r.errorEmitted = true;
      stream.emit("error", err);
    }
  }
}

function finish(stream, state) {
  state.pendingcb--;

  if (state.errorEmitted || state.closeEmitted) {
    return;
  }

  state.finished = true;

  for (const callback of state[kOnFinished].splice(0)) {
    callback();
  }

  stream.emit("finish");

  if (state.autoDestroy) {
    stream.destroy();
  }
}

function finishMaybe(stream, state, sync) {
  if (needFinish(state)) {
    prefinish(stream, state);

    if (state.pendingcb === 0 && needFinish(state)) {
      state.pendingcb++;

      if (sync) {
        queueMicrotask(() => finish(stream, state));
      } else {
        finish(stream, state);
      }
    }
  }
}
function onwrite(stream, er) {
  const state = stream._writableState;
  const sync = state.sync;
  const cb = state.writecb;

  if (typeof cb !== "function") {
    errorOrDestroy(stream, new ERR_MULTIPLE_CALLBACK());
    return;
  }

  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;

  if (er) {
    // Avoid V8 leak, https://github.com/nodejs/node/pull/34103#issuecomment-652002364
    er.stack;

    if (!state.errored) {
      state.errored = er;
    }

    if (stream._readableState && !stream._readableState.errored) {
      stream._readableState.errored = er;
    }

    if (sync) {
      queueMicrotask(() => onwriteError(stream, state, er, cb));
    } else {
      onwriteError(stream, state, er, cb);
    }
  } else {
    if (state.buffered.length > state.bufferedIndex) {
      clearBuffer(stream, state);
    }

    if (sync) {
      if (state.afterWriteTickInfo !== null && state.afterWriteTickInfo.cb === cb) {
        state.afterWriteTickInfo.count++;
      } else {
        state.afterWriteTickInfo = {
          count: 1,
          cb: cb,
          stream: stream,
          state
        };
        queueMicrotask(() => afterWriteTick(state.afterWriteTickInfo));
      }
    } else {
      afterWrite(stream, state, 1, cb);
    }
  }
}

function onwriteError(stream, state, er, cb) {
  --state.pendingcb;
  cb(er);
  errorBuffer(state);
  errorOrDestroy(stream, er);
}

function readableAddChunk(stream, chunk, encoding = undefined, addToFront) {
  debug$1("readableAddChunk", chunk);
  const state = stream._readableState;
  let usedEncoding = encoding;

  if (!state.objectMode) {
    if (typeof chunk === "string") {
      usedEncoding = encoding || state.defaultEncoding;

      if (state.encoding !== usedEncoding) {
        if (addToFront && state.encoding) {
          chunk = Buffer.from(chunk, usedEncoding).toString(state.encoding);
        } else {
          chunk = Buffer.from(chunk, usedEncoding);
          usedEncoding = "";
        }
      }
    } else if (chunk instanceof Uint8Array) {
      chunk = Buffer.from(chunk);
    }
  }

  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else if (state.objectMode || chunk.length > 0) {
    if (addToFront) {
      if (state.endEmitted) {
        errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
      } else {
        addChunk(stream, state, chunk, true);
      }
    } else if (state.ended) {
      errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
    } else if (state.destroyed || state.errored) {
      return false;
    } else {
      state.reading = false;

      if (state.decoder && !usedEncoding) {
        //TODO(Soremwar)
        //I don't think this cast is right
        chunk = state.decoder.write(Buffer.from(chunk));

        if (state.objectMode || chunk.length !== 0) {
          addChunk(stream, state, chunk, false);
        } else {
          maybeReadMore(stream, state);
        }
      } else {
        addChunk(stream, state, chunk, false);
      }
    }
  } else if (!addToFront) {
    state.reading = false;
    maybeReadMore(stream, state);
  }

  return !state.ended && (state.length < state.highWaterMark || state.length === 0);
}

// Copyright Node.js contributors. All rights reserved. MIT License.
let debug = debuglog("stream", fn => {
  debug = fn;
});

/**
 * A duplex is an implementation of a stream that has both Readable and Writable
 * attributes and capabilities
 */
class Duplex extends Stream {
  allowHalfOpen = true;

  constructor(options) {
    super();
    const readableOptions = {
      autoDestroy: options?.autoDestroy,
      defaultEncoding: options?.defaultEncoding,
      destroy: options?.destroy,
      emitClose: options?.emitClose,
      encoding: options?.encoding,
      highWaterMark: options?.highWaterMark ?? options?.readableHighWaterMark,
      objectMode: options?.objectMode ?? options?.readableObjectMode,
      read: options?.read
    };
    const writableOptions = {
      autoDestroy: options?.autoDestroy,
      decodeStrings: options?.decodeStrings,
      defaultEncoding: options?.defaultEncoding,
      destroy: options?.destroy,
      emitClose: options?.emitClose,
      final: options?.final,
      highWaterMark: options?.highWaterMark ?? options?.writableHighWaterMark,
      objectMode: options?.objectMode ?? options?.writableObjectMode,
      write: options?.write,
      writev: options?.writev
    };
    this._readableState = new ReadableState(readableOptions);
    this._writableState = new WritableState(writableOptions, this); //Very important to override onwrite here, duplex implementation adds a check
    //on the readable side

    this._writableState.onwrite = onwrite.bind(undefined, this);

    if (options) {
      if (options.allowHalfOpen === false) {
        this.allowHalfOpen = false;
      }

      if (typeof options.destroy === "function") {
        this._destroy = options.destroy;
      }

      if (typeof options.final === "function") {
        this._final = options.final;
      }

      if (typeof options.read === "function") {
        this._read = options.read;
      }

      if (options.readable === false) {
        this.readable = false;
        this._readableState.readable = false;
        this._readableState.ended = true;
        this._readableState.endEmitted = true;
      }

      if (options.writable === false) {
        this.writable = false;
        this._writableState.writable = false;
        this._writableState.ending = true;
        this._writableState.ended = true;
        this._writableState.finished = true;
      }

      if (typeof options.write === "function") {
        this._write = options.write;
      }

      if (typeof options.writev === "function") {
        this._writev = options.writev;
      }
    }
  }

  [captureRejectionSymbol](err) {
    this.destroy(err);
  }

  [Symbol.asyncIterator]() {
    return createReadableStreamAsyncIterator(this);
  }

  _destroy(error, callback) {
    callback(error);
  }

  _read(size) {
    return Readable.prototype._read.call(this, size);
  }

  _undestroy() {
    Writable.prototype._undestroy.call(this);

    Readable.prototype._undestroy.call(this);

    return;
  }

  destroy(err, cb) {
    const r = this._readableState;
    const w = this._writableState;

    if (w.destroyed || r.destroyed) {
      if (typeof cb === "function") {
        cb();
      }

      return this;
    }

    if (err) {
      // Avoid V8 leak, https://github.com/nodejs/node/pull/34103#issuecomment-652002364
      err.stack;

      if (!w.errored) {
        w.errored = err;
      }

      if (!r.errored) {
        r.errored = err;
      }
    }

    w.destroyed = true;
    r.destroyed = true;

    this._destroy(err || null, err => {
      if (err) {
        // Avoid V8 leak, https://github.com/nodejs/node/pull/34103#issuecomment-652002364
        err.stack;

        if (!w.errored) {
          w.errored = err;
        }

        if (!r.errored) {
          r.errored = err;
        }
      }

      w.closed = true;
      r.closed = true;

      if (typeof cb === "function") {
        cb(err);
      }

      if (err) {
        queueMicrotask(() => {
          const r = this._readableState;
          const w = this._writableState;

          if (!w.errorEmitted && !r.errorEmitted) {
            w.errorEmitted = true;
            r.errorEmitted = true;
            this.emit("error", err);
          }

          r.closeEmitted = true;

          if (w.emitClose || r.emitClose) {
            this.emit("close");
          }
        });
      } else {
        queueMicrotask(() => {
          const r = this._readableState;
          const w = this._writableState;
          r.closeEmitted = true;

          if (w.emitClose || r.emitClose) {
            this.emit("close");
          }
        });
      }
    });

    return this;
  }

  isPaused() {
    return Readable.prototype.isPaused.call(this);
  }

  off = this.removeListener;

  on(ev, fn) {
    const res = super.on.call(this, ev, fn);
    const state = this._readableState;

    if (ev === "data") {
      state.readableListening = this.listenerCount("readable") > 0;

      if (state.flowing !== false) {
        this.resume();
      }
    } else if (ev === "readable") {
      if (!state.endEmitted && !state.readableListening) {
        state.readableListening = state.needReadable = true;
        state.flowing = false;
        state.emittedReadable = false;

        if (state.length) {
          emitReadable(this);
        } else if (!state.reading) {
          queueMicrotask(() => nReadingNextTick(this));
        }
      }
    }

    return res;
  }

  pause() {
    return Readable.prototype.pause.call(this);
  }

  pipe(dest, pipeOpts) {
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    return Readable.prototype.pipe.call(this, dest, pipeOpts);
  } // deno-lint-ignore no-explicit-any


  push(chunk, encoding) {
    return readableAddChunk(this, chunk, encoding, false);
  }
  /** You can override either this method, or the async `_read` method */


  read(n) {
    debug("read", n); // Same as parseInt(undefined, 10), however V8 7.3 performance regressed
    // in this scenario, so we are doing it manually.

    if (n === undefined) {
      n = NaN;
    }

    const state = this._readableState;
    const nOrig = n;

    if (n > state.highWaterMark) {
      state.highWaterMark = computeNewHighWaterMark(n);
    }

    if (n !== 0) {
      state.emittedReadable = false;
    }

    if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
      debug("read: emitReadable", state.length, state.ended);

      if (state.length === 0 && state.ended) {
        endDuplex(this);
      } else {
        emitReadable(this);
      }

      return null;
    }

    n = howMuchToRead(n, state);

    if (n === 0 && state.ended) {
      if (state.length === 0) {
        endDuplex(this);
      }

      return null;
    }

    let doRead = state.needReadable;
    debug("need readable", doRead);

    if (state.length === 0 || state.length - n < state.highWaterMark) {
      doRead = true;
      debug("length less than watermark", doRead);
    }

    if (state.ended || state.reading || state.destroyed || state.errored || !state.constructed) {
      doRead = false;
      debug("reading, ended or constructing", doRead);
    } else if (doRead) {
      debug("do read");
      state.reading = true;
      state.sync = true;

      if (state.length === 0) {
        state.needReadable = true;
      }

      this._read(state.highWaterMark);

      state.sync = false;

      if (!state.reading) {
        n = howMuchToRead(nOrig, state);
      }
    }

    let ret;

    if (n > 0) {
      ret = fromList(n, state);
    } else {
      ret = null;
    }

    if (ret === null) {
      state.needReadable = state.length <= state.highWaterMark;
      n = 0;
    } else {
      state.length -= n;

      if (state.multiAwaitDrain) {
        state.awaitDrainWriters.clear();
      } else {
        state.awaitDrainWriters = null;
      }
    }

    if (state.length === 0) {
      if (!state.ended) {
        state.needReadable = true;
      }

      if (nOrig !== n && state.ended) {
        endDuplex(this);
      }
    }

    if (ret !== null && !state.errorEmitted && !state.closeEmitted) {
      state.dataEmitted = true;
      this.emit("data", ret);
    }

    return ret;
  }

  removeAllListeners(ev) {
    const res = super.removeAllListeners(ev);

    if (ev === "readable" || ev === undefined) {
      queueMicrotask(() => updateReadableListening(this));
    }

    return res;
  }

  removeListener(ev, fn) {
    const res = super.removeListener.call(this, ev, fn);

    if (ev === "readable") {
      queueMicrotask(() => updateReadableListening(this));
    }

    return res;
  }

  resume() {
    return Readable.prototype.resume.call(this);
  }

  setEncoding(enc) {
    return Readable.prototype.setEncoding.call(this, enc);
  } // deno-lint-ignore no-explicit-any


  unshift(chunk, encoding) {
    return readableAddChunk(this, chunk, encoding, true);
  }

  unpipe(dest) {
    return Readable.prototype.unpipe.call(this, dest);
  }

  wrap(stream) {
    return Readable.prototype.wrap.call(this, stream);
  }

  get readable() {
    const r = this._readableState;
    return !!r && r.readable && !r.destroyed && !r.errorEmitted && !r.endEmitted;
  }

  set readable(val) {
    if (this._readableState) {
      this._readableState.readable = val;
    }
  }

  get readableHighWaterMark() {
    return this._readableState.highWaterMark;
  }

  get readableBuffer() {
    return this._readableState && this._readableState.buffer;
  }

  get readableFlowing() {
    return this._readableState.flowing;
  }

  set readableFlowing(state) {
    if (this._readableState) {
      this._readableState.flowing = state;
    }
  }

  get readableLength() {
    return this._readableState.length;
  }

  get readableObjectMode() {
    return this._readableState ? this._readableState.objectMode : false;
  }

  get readableEncoding() {
    return this._readableState ? this._readableState.encoding : null;
  }

  get readableEnded() {
    return this._readableState ? this._readableState.endEmitted : false;
  }

  _write( // deno-lint-ignore no-explicit-any
  chunk, encoding, cb) {
    return Writable.prototype._write.call(this, chunk, encoding, cb);
  }

  write( // deno-lint-ignore no-explicit-any
  chunk, x, y) {
    // deno-lint-ignore no-explicit-any
    return Writable.prototype.write.call(this, chunk, x, y);
  }

  cork() {
    return Writable.prototype.cork.call(this);
  }

  uncork() {
    return Writable.prototype.uncork.call(this);
  }

  setDefaultEncoding(encoding) {
    // node::ParseEncoding() requires lower case.
    if (typeof encoding === "string") {
      encoding = encoding.toLowerCase();
    }

    if (!Buffer.isEncoding(encoding)) {
      throw new ERR_UNKNOWN_ENCODING(encoding);
    }

    this._writableState.defaultEncoding = encoding;
    return this;
  }

  end( // deno-lint-ignore no-explicit-any
  x, y, z) {
    const state = this._writableState; // deno-lint-ignore no-explicit-any

    let chunk;
    let encoding;
    let cb;

    if (typeof x === "function") {
      chunk = null;
      encoding = null;
      cb = x;
    } else if (typeof y === "function") {
      chunk = x;
      encoding = null;
      cb = y;
    } else {
      chunk = x;
      encoding = y;
      cb = z;
    }

    if (chunk !== null && chunk !== undefined) {
      this.write(chunk, encoding);
    }

    if (state.corked) {
      state.corked = 1;
      this.uncork();
    }

    let err;

    if (!state.errored && !state.ending) {
      state.ending = true;
      debug("** Writable.end calling finishMaybe", state);
      finishMaybe(this, state, true);
      state.ended = true;
    } else if (state.finished) {
      err = new ERR_STREAM_ALREADY_FINISHED("end");
    } else if (state.destroyed) {
      err = new ERR_STREAM_DESTROYED("end");
    }

    if (typeof cb === "function") {
      if (err || state.finished) {
        queueMicrotask(() => {
          cb(err);
        });
      } else {
        state[kOnFinished].push(cb);
      }
    }

    return this;
  }

  get destroyed() {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }

    return this._readableState.destroyed && this._writableState.destroyed;
  }

  set destroyed(value) {
    if (this._readableState && this._writableState) {
      this._readableState.destroyed = value;
      this._writableState.destroyed = value;
    }
  }

  get writable() {
    const w = this._writableState;
    return !!w && w.writable !== false && !w.destroyed && !w.errored && !w.ending && !w.ended;
  }

  set writable(val) {
    if (this._writableState) {
      this._writableState.writable = !!val;
    }
  }

  get writableFinished() {
    return this._writableState ? this._writableState.finished : false;
  }

  get writableObjectMode() {
    return this._writableState ? this._writableState.objectMode : false;
  }

  get writableBuffer() {
    return this._writableState && this._writableState.getBuffer();
  }

  get writableEnded() {
    return this._writableState ? this._writableState.ending : false;
  }

  get writableHighWaterMark() {
    return this._writableState && this._writableState.highWaterMark;
  }

  get writableCorked() {
    return this._writableState ? this._writableState.corked : 0;
  }

  get writableLength() {
    return this._writableState && this._writableState.length;
  }

}

// Copyright Node.js contributors. All rights reserved. MIT License.
const kCallback = Symbol("kCallback");
class Transform extends Duplex {
  constructor(options) {
    super(options);
    this._readableState.sync = false;
    this[kCallback] = null;

    if (options) {
      if (typeof options.transform === "function") {
        this._transform = options.transform;
      }

      if (typeof options.flush === "function") {
        this._flush = options.flush;
      }
    }

    this.on("prefinish", function () {
      if (typeof this._flush === "function" && !this.destroyed) {
        this._flush((er, data) => {
          if (er) {
            this.destroy(er);
            return;
          }

          if (data != null) {
            this.push(data);
          }

          this.push(null);
        });
      } else {
        this.push(null);
      }
    });
  }

  _read = () => {
    if (this[kCallback]) {
      const callback = this[kCallback];
      this[kCallback] = null;
      callback();
    }
  };

  _transform( // deno-lint-ignore no-explicit-any
  _chunk, _encoding, // deno-lint-ignore no-explicit-any
  _callback) {
    throw new ERR_METHOD_NOT_IMPLEMENTED("_transform()");
  }

  _write = (chunk, encoding, callback) => {
    const rState = this._readableState;
    const wState = this._writableState;
    const length = rState.length;

    this._transform(chunk, encoding, (err, val) => {
      if (err) {
        callback(err);
        return;
      }

      if (val != null) {
        this.push(val);
      }

      if (wState.ended || // Backwards compat.
      length === rState.length || // Backwards compat.
      rState.length < rState.highWaterMark || rState.length === 0) {
        callback();
      } else {
        this[kCallback] = callback;
      }
    });
  };
}

// Copyright Node.js contributors. All rights reserved. MIT License.
class PassThrough extends Transform {
  constructor(options) {
    super(options);
  }

  _transform( // deno-lint-ignore no-explicit-any
  chunk, _encoding, // deno-lint-ignore no-explicit-any
  cb) {
    cb(null, chunk);
  }

}

// Copyright Node.js contributors. All rights reserved. MIT License.

function destroyer(stream, reading, writing, callback) {
  callback = once$1(callback);
  let finished = false;
  stream.on("close", () => {
    finished = true;
  });
  eos(stream, {
    readable: reading,
    writable: writing
  }, err => {
    finished = !err; // deno-lint-ignore no-explicit-any

    const rState = stream?._readableState;

    if (err && err.code === "ERR_STREAM_PREMATURE_CLOSE" && reading && rState?.ended && !rState?.errored && !rState?.errorEmitted) {
      stream.once("end", callback).once("error", callback);
    } else {
      callback(err);
    }
  });
  return err => {
    if (finished) return;
    finished = true;
    destroyer$1(stream, err);
    callback(err || new ERR_STREAM_DESTROYED("pipe"));
  };
}

function popCallback(streams) {
  if (typeof streams[streams.length - 1] !== "function") {
    throw new ERR_INVALID_CALLBACK(streams[streams.length - 1]);
  }

  return streams.pop();
} // function isPromise(obj) {
//   return !!(obj && typeof obj.then === "function");
// }
// deno-lint-ignore no-explicit-any


function isReadable(obj) {
  return !!(obj && typeof obj.pipe === "function");
} // deno-lint-ignore no-explicit-any


function isWritable(obj) {
  return !!(obj && typeof obj.write === "function");
} // deno-lint-ignore no-explicit-any


function isStream(obj) {
  return isReadable(obj) || isWritable(obj);
} // deno-lint-ignore no-explicit-any


function isIterable(obj, isAsync) {
  if (!obj) return false;
  if (isAsync === true) return typeof obj[Symbol.asyncIterator] === "function";
  if (isAsync === false) return typeof obj[Symbol.iterator] === "function";
  return typeof obj[Symbol.asyncIterator] === "function" || typeof obj[Symbol.iterator] === "function";
} // deno-lint-ignore no-explicit-any


function makeAsyncIterable(val) {
  if (isIterable(val)) {
    return val;
  } else if (isReadable(val)) {
    return fromReadable(val);
  }

  throw new ERR_INVALID_ARG_TYPE("val", ["Readable", "Iterable", "AsyncIterable"], val);
}

async function* fromReadable(val) {
  yield* createReadableStreamAsyncIterator(val);
}

async function pump( // deno-lint-ignore no-explicit-any
iterable, writable, finish) {
  let error = null;

  try {
    for await (const chunk of iterable) {
      if (!writable.write(chunk)) {
        if (writable.destroyed) return;
        await once(writable, "drain");
      }
    }

    writable.end();
  } catch (err) {
    if (err instanceof NodeErrorAbstraction) {
      error = err;
    }
  } finally {
    finish(error);
  }
}

function pipeline$1(...args) {
  const callback = once$1(popCallback(args));
  let streams;

  if (args.length > 1) {
    streams = args;
  } else {
    throw new ERR_MISSING_ARGS("streams");
  }

  let error; // deno-lint-ignore no-explicit-any

  let value;
  const destroys = [];
  let finishCount = 0;

  function finish(err) {
    const final = --finishCount === 0;

    if (err && (!error || error.code === "ERR_STREAM_PREMATURE_CLOSE")) {
      error = err;
    }

    if (!error && !final) {
      return;
    }

    while (destroys.length) {
      destroys.shift()(error);
    }

    if (final) {
      callback(error, value);
    }
  } // TODO(Soremwar)
  // Simplify the hell out of this
  // deno-lint-ignore no-explicit-any


  let ret;

  for (let i = 0; i < streams.length; i++) {
    const stream = streams[i];
    const reading = i < streams.length - 1;
    const writing = i > 0;

    if (isStream(stream)) {
      finishCount++;
      destroys.push(destroyer(stream, reading, writing, finish));
    }

    if (i === 0) {
      if (typeof stream === "function") {
        ret = stream();

        if (!isIterable(ret)) {
          throw new ERR_INVALID_RETURN_VALUE("Iterable, AsyncIterable or Stream", "source", ret);
        }
      } else if (isIterable(stream) || isReadable(stream)) {
        ret = stream;
      } else {
        throw new ERR_INVALID_ARG_TYPE("source", ["Stream", "Iterable", "AsyncIterable", "Function"], stream);
      }
    } else if (typeof stream === "function") {
      ret = makeAsyncIterable(ret);
      ret = stream(ret);

      if (reading) {
        if (!isIterable(ret, true)) {
          throw new ERR_INVALID_RETURN_VALUE("AsyncIterable", `transform[${i - 1}]`, ret);
        }
      } else {
        // If the last argument to pipeline is not a stream
        // we must create a proxy stream so that pipeline(...)
        // always returns a stream which can be further
        // composed through `.pipe(stream)`.
        const pt = new PassThrough({
          objectMode: true
        });

        if (ret instanceof Promise) {
          ret.then(val => {
            value = val;
            pt.end(val);
          }, err => {
            pt.destroy(err);
          });
        } else if (isIterable(ret, true)) {
          finishCount++;
          pump(ret, pt, finish);
        } else {
          throw new ERR_INVALID_RETURN_VALUE("AsyncIterable or Promise", "destination", ret);
        }

        ret = pt;
        finishCount++;
        destroys.push(destroyer(ret, false, true, finish));
      }
    } else if (isStream(stream)) {
      if (isReadable(ret)) {
        ret.pipe(stream); // TODO(Soremwar)
        // Reimplement after stdout and stderr are implemented
        // if (stream === process.stdout || stream === process.stderr) {
        //   ret.on("end", () => stream.end());
        // }
      } else {
        ret = makeAsyncIterable(ret);
        finishCount++;
        pump(ret, stream, finish);
      }

      ret = stream;
    } else {
      const name = reading ? `transform[${i - 1}]` : "destination";
      throw new ERR_INVALID_ARG_TYPE(name, ["Stream", "Function"], ret);
    }
  }

  return ret;
}

// Copyright Node.js contributors. All rights reserved. MIT License.
function pipeline(...streams) {
  return new Promise((resolve, reject) => {
    pipeline$1(...streams, (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
}
function finished(stream, opts) {
  return new Promise((resolve, reject) => {
    eos(stream, opts || null, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

var promises = /*#__PURE__*/Object.freeze({
  __proto__: null,
  pipeline: pipeline,
  finished: finished
});

// Copyright Node.js contributors. All rights reserved.

Stream.Readable = Readable;
Stream.Writable = Writable;
Stream.Duplex = Duplex;
Stream.Transform = Transform;
Stream.PassThrough = PassThrough;
Stream.pipeline = pipeline$1;
Stream.finished = eos;
Stream.promises = promises;
Stream.Stream = Stream;

// Copyright Joyent, Inc. and other Node contributors.
function isInt32(value) {
  return value === (value | 0);
}
hideStackFrames((value, name, min = -2147483648, max = 2147483647) => {
  // The defaults for min and max correspond to the limits of 32-bit integers.
  if (!isInt32(value)) {
    if (typeof value !== "number") {
      throw new ERR_INVALID_ARG_TYPE(name, "number", value);
    }

    if (!Number.isInteger(value)) {
      throw new ERR_OUT_OF_RANGE(name, "an integer", value);
    }

    throw new ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max}`, value);
  }

  if (value < min || value > max) {
    throw new ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max}`, value);
  }
});
function validateString(value, name) {
  if (typeof value !== "string") {
    throw new ERR_INVALID_ARG_TYPE(name, "string", value);
  }
}
hideStackFrames((value, name, oneOf) => {
  if (!Array.prototype.includes.call(oneOf, value)) {
    const allowed = Array.prototype.join.call(Array.prototype.map.call(oneOf, v => typeof v === "string" ? `'${v}'` : String(v)), ", ");
    const reason = "must be one of: " + allowed;
    throw new ERR_INVALID_ARG_VALUE(name, value, reason);
  }
}); // Check that the port number is not NaN when coerced to a number,
hideStackFrames(callback => {
  if (typeof callback !== "function") {
    throw new ERR_INVALID_CALLBACK(callback);
  }
});
hideStackFrames((signal, name) => {
  if (signal !== undefined && (signal === null || typeof signal !== "object" || !("aborted" in signal))) {
    throw new ERR_INVALID_ARG_TYPE(name, "AbortSignal", signal);
  }
});
hideStackFrames((value, name) => {
  if (typeof value !== "function") {
    throw new ERR_INVALID_ARG_TYPE(name, "Function", value);
  }
});

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
const {
  hasOwn
} = Object;

function get(obj, key) {
  if (hasOwn(obj, key)) {
    return obj[key];
  }
}

function getForce(obj, key) {
  const v = get(obj, key);
  assert(v != null);
  return v;
}

function isNumber(x) {
  if (typeof x === "number") return true;
  if (/^0x[0-9a-f]+$/i.test(String(x))) return true;
  return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(String(x));
}

function hasKey(obj, keys) {
  let o = obj;
  keys.slice(0, -1).forEach(key => {
    o = get(o, key) ?? {};
  });
  const key = keys[keys.length - 1];
  return key in o;
}
/** Take a set of command line arguments, with an optional set of options, and
 * return an object representation of those argument.
 *
 * ```ts
 *      import { parse } from "./mod.ts";
 *      const parsedArgs = parse(Deno.args);
 * ```
 */


function parse$2(args, {
  "--": doubleDash = false,
  alias = {},
  boolean = false,
  default: defaults = {},
  stopEarly = false,
  string = [],
  unknown = i => i
} = {}) {
  const flags = {
    bools: {},
    strings: {},
    unknownFn: unknown,
    allBools: false
  };

  if (boolean !== undefined) {
    if (typeof boolean === "boolean") {
      flags.allBools = !!boolean;
    } else {
      const booleanArgs = typeof boolean === "string" ? [boolean] : boolean;

      for (const key of booleanArgs.filter(Boolean)) {
        flags.bools[key] = true;
      }
    }
  }

  const aliases = {};

  if (alias !== undefined) {
    for (const key in alias) {
      const val = getForce(alias, key);

      if (typeof val === "string") {
        aliases[key] = [val];
      } else {
        aliases[key] = val;
      }

      for (const alias of getForce(aliases, key)) {
        aliases[alias] = [key].concat(aliases[key].filter(y => alias !== y));
      }
    }
  }

  if (string !== undefined) {
    const stringArgs = typeof string === "string" ? [string] : string;

    for (const key of stringArgs.filter(Boolean)) {
      flags.strings[key] = true;
      const alias = get(aliases, key);

      if (alias) {
        for (const al of alias) {
          flags.strings[al] = true;
        }
      }
    }
  }

  const argv = {
    _: []
  };

  function argDefined(key, arg) {
    return flags.allBools && /^--[^=]+$/.test(arg) || get(flags.bools, key) || !!get(flags.strings, key) || !!get(aliases, key);
  }

  function setKey(obj, keys, value) {
    let o = obj;
    keys.slice(0, -1).forEach(function (key) {
      if (get(o, key) === undefined) {
        o[key] = {};
      }

      o = get(o, key);
    });
    const key = keys[keys.length - 1];

    if (get(o, key) === undefined || get(flags.bools, key) || typeof get(o, key) === "boolean") {
      o[key] = value;
    } else if (Array.isArray(get(o, key))) {
      o[key].push(value);
    } else {
      o[key] = [get(o, key), value];
    }
  }

  function setArg(key, val, arg = undefined) {
    if (arg && flags.unknownFn && !argDefined(key, arg)) {
      if (flags.unknownFn(arg, key, val) === false) return;
    }

    const value = !get(flags.strings, key) && isNumber(val) ? Number(val) : val;
    setKey(argv, key.split("."), value);
    const alias = get(aliases, key);

    if (alias) {
      for (const x of alias) {
        setKey(argv, x.split("."), value);
      }
    }
  }

  function aliasIsBoolean(key) {
    return getForce(aliases, key).some(x => typeof get(flags.bools, x) === "boolean");
  }

  for (const key of Object.keys(flags.bools)) {
    setArg(key, defaults[key] === undefined ? false : defaults[key]);
  }

  let notFlags = []; // all args after "--" are not parsed

  if (args.includes("--")) {
    notFlags = args.slice(args.indexOf("--") + 1);
    args = args.slice(0, args.indexOf("--"));
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (/^--.+=/.test(arg)) {
      const m = arg.match(/^--([^=]+)=(.*)$/s);
      assert(m != null);
      const [, key, value] = m;

      if (flags.bools[key]) {
        const booleanValue = value !== "false";
        setArg(key, booleanValue, arg);
      } else {
        setArg(key, value, arg);
      }
    } else if (/^--no-.+/.test(arg)) {
      const m = arg.match(/^--no-(.+)/);
      assert(m != null);
      setArg(m[1], false, arg);
    } else if (/^--.+/.test(arg)) {
      const m = arg.match(/^--(.+)/);
      assert(m != null);
      const [, key] = m;
      const next = args[i + 1];

      if (next !== undefined && !/^-/.test(next) && !get(flags.bools, key) && !flags.allBools && (get(aliases, key) ? !aliasIsBoolean(key) : true)) {
        setArg(key, next, arg);
        i++;
      } else if (/^(true|false)$/.test(next)) {
        setArg(key, next === "true", arg);
        i++;
      } else {
        setArg(key, get(flags.strings, key) ? "" : true, arg);
      }
    } else if (/^-[^-]+/.test(arg)) {
      const letters = arg.slice(1, -1).split("");
      let broken = false;

      for (let j = 0; j < letters.length; j++) {
        const next = arg.slice(j + 2);

        if (next === "-") {
          setArg(letters[j], next, arg);
          continue;
        }

        if (/[A-Za-z]/.test(letters[j]) && /=/.test(next)) {
          setArg(letters[j], next.split(/=(.+)/)[1], arg);
          broken = true;
          break;
        }

        if (/[A-Za-z]/.test(letters[j]) && /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) {
          setArg(letters[j], next, arg);
          broken = true;
          break;
        }

        if (letters[j + 1] && letters[j + 1].match(/\W/)) {
          setArg(letters[j], arg.slice(j + 2), arg);
          broken = true;
          break;
        } else {
          setArg(letters[j], get(flags.strings, letters[j]) ? "" : true, arg);
        }
      }

      const [key] = arg.slice(-1);

      if (!broken && key !== "-") {
        if (args[i + 1] && !/^(-|--)[^-]/.test(args[i + 1]) && !get(flags.bools, key) && (get(aliases, key) ? !aliasIsBoolean(key) : true)) {
          setArg(key, args[i + 1], arg);
          i++;
        } else if (args[i + 1] && /^(true|false)$/.test(args[i + 1])) {
          setArg(key, args[i + 1] === "true", arg);
          i++;
        } else {
          setArg(key, get(flags.strings, key) ? "" : true, arg);
        }
      }
    } else {
      if (!flags.unknownFn || flags.unknownFn(arg) !== false) {
        argv._.push(flags.strings["_"] ?? !isNumber(arg) ? arg : Number(arg));
      }

      if (stopEarly) {
        argv._.push(...args.slice(i + 1));

        break;
      }
    }
  }

  for (const key of Object.keys(defaults)) {
    if (!hasKey(argv, key.split("."))) {
      setKey(argv, key.split("."), defaults[key]);

      if (aliases[key]) {
        for (const x of aliases[key]) {
          setKey(argv, x.split("."), defaults[key]);
        }
      }
    }
  }

  if (doubleDash) {
    argv["--"] = [];

    for (const key of notFlags) {
      argv["--"].push(key);
    }
  } else {
    for (const key of notFlags) {
      argv._.push(key);
    }
  }

  return argv;
}

// Copyright Joyent, Inc. and other Node contributors.
function getOptions() {
  const args = parse$2(Deno.args);
  const options = new Map(Object.entries(args).map(([key, value]) => [key, {
    value
  }]));
  return {
    options
  };
}

// Copyright Joyent, Inc. and other Node contributors.
let optionsMap;

function getOptionsFromBinding() {
  if (!optionsMap) {
    ({
      options: optionsMap
    } = getOptions());
  }

  return optionsMap;
}

function getOptionValue(optionName) {
  const options = getOptionsFromBinding();

  if (optionName.startsWith("--no-")) {
    const option = options.get("--" + optionName.slice(5));
    return option && !option.value;
  }

  return options.get(optionName)?.value;
}

// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
const notImplementedEvents = ["beforeExit", "disconnect", "message", "multipleResolves", "rejectionHandled", "SIGBREAK", "SIGBUS", "SIGFPE", "SIGHUP", "SIGILL", "SIGINT", "SIGSEGV", "SIGTERM", "SIGWINCH", "uncaughtException", "uncaughtExceptionMonitor", "unhandledRejection"];
/** https://nodejs.org/api/process.html#process_process_arch */

const arch = Deno.build.arch; // The first 2 items are placeholders.
// They will be overwritten by the below Object.defineProperty calls.

const argv = ["", "", ...Deno.args]; // Overwrites the 1st item with getter.

Object.defineProperty(argv, "0", {
  get: Deno.execPath
}); // Overwrites the 2st item with getter.

Object.defineProperty(argv, "1", {
  get: () => fromFileUrl(Deno.mainModule)
});
/** https://nodejs.org/api/process.html#process_process_chdir_directory */

const chdir = Deno.chdir;
/** https://nodejs.org/api/process.html#process_process_cwd */

const cwd = Deno.cwd;
/**
 * https://nodejs.org/api/process.html#process_process_env
 * Requires env permissions
 */

const env = new Proxy({}, {
  get(_target, prop) {
    return Deno.env.get(String(prop));
  },

  ownKeys: () => Reflect.ownKeys(Deno.env.toObject()),
  getOwnPropertyDescriptor: () => ({
    enumerable: true,
    configurable: true
  }),

  set(_target, prop, value) {
    Deno.env.set(String(prop), String(value));
    return value;
  }

});
/** https://nodejs.org/api/process.html#process_process_exit_code */

const exit = Deno.exit;
/** https://nodejs.org/api/process.html#process_process_nexttick_callback_args */

function nextTick(cb, ...args) {
  if (args) {
    queueMicrotask(() => cb.call(this, ...args));
  } else {
    queueMicrotask(cb);
  }
}
/** https://nodejs.org/api/process.html#process_process_pid */

const pid = Deno.pid;
/** https://nodejs.org/api/process.html#process_process_platform */

const platform = isWindows ? "win32" : Deno.build.os;
/**
 * https://nodejs.org/api/process.html#process_process_version
 *
 * This value is hard coded to latest stable release of Node, as
 * some packages are checking it for compatibility. Previously
 * it pointed to Deno version, but that led to incompability
 * with some packages.
 */

const version = "v16.11.1";
/**
 * https://nodejs.org/api/process.html#process_process_versions
 *
 * This value is hard coded to latest stable release of Node, as
 * some packages are checking it for compatibility. Previously
 * it contained only output of `Deno.version`, but that led to incompability
 * with some packages. Value of `v8` field is still taken from `Deno.version`.
 */

const versions = {
  node: "16.11.1",
  uv: "1.42.0",
  zlib: "1.2.11",
  brotli: "1.0.9",
  ares: "1.17.2",
  modules: "93",
  nghttp2: "1.45.1",
  napi: "8",
  llhttp: "6.0.4",
  openssl: "1.1.1l",
  cldr: "39.0",
  icu: "69.1",
  tz: "2021a",
  unicode: "13.0",
  ...Deno.version
};

// https://github.com/nodejs/node/blob/00738314828074243c9a52a228ab4c68b04259ef/lib/internal/bootstrap/switches/is_main_thread.js#L41
function createWritableStdioStream(writer) {
  const stream = new Writable({
    write(buf, enc, cb) {
      writer.writeSync(buf instanceof Uint8Array ? buf : Buffer.from(buf, enc));
      cb();
    },

    destroy(err, cb) {
      cb(err);

      this._undestroy();

      if (!this._writableState.emitClose) {
        queueMicrotask(() => this.emit("close"));
      }
    }

  });
  stream.fd = writer.rid;
  stream.destroySoon = stream.destroy;
  stream._isStdio = true;
  stream.once("close", () => writer.close());
  Object.defineProperties(stream, {
    columns: {
      enumerable: true,
      configurable: true,
      get: () => Deno.isatty(writer.rid) ? Deno.consoleSize(writer.rid).columns : undefined
    },
    rows: {
      enumerable: true,
      configurable: true,
      get: () => Deno.isatty(writer.rid) ? Deno.consoleSize(writer.rid).rows : undefined
    },
    isTTY: {
      enumerable: true,
      configurable: true,
      get: () => Deno.isatty(writer.rid)
    },
    getWindowSize: {
      enumerable: true,
      configurable: true,
      value: () => Deno.isatty(writer.rid) ? Object.values(Deno.consoleSize(writer.rid)) : undefined
    }
  });
  return stream;
}
/** https://nodejs.org/api/process.html#process_process_stderr */


const stderr = createWritableStdioStream(Deno.stderr);
/** https://nodejs.org/api/process.html#process_process_stdin */

const stdin = new Readable({
  read(size) {
    const p = Buffer.alloc(size || 16 * 1024);
    const length = Deno.stdin.readSync(p);
    this.push(length === null ? null : p.slice(0, length));
  }

});
stdin.on("close", () => Deno.stdin.close());
stdin.fd = Deno.stdin.rid;
Object.defineProperty(stdin, "isTTY", {
  enumerable: true,
  configurable: true,

  get() {
    return Deno.isatty(Deno.stdin.rid);
  }

});
/** https://nodejs.org/api/process.html#process_process_stdout */

const stdout = createWritableStdioStream(Deno.stdout);

function addReadOnlyProcessAlias(name, option, enumerable = true) {
  const value = getOptionValue(option);

  if (value) {
    Object.defineProperty(process$1, name, {
      writable: false,
      configurable: true,
      enumerable,
      value
    });
  }
}

function createWarningObject(warning, type, code, // deno-lint-ignore ban-types
ctor, detail) {
  assert(typeof warning === "string"); // deno-lint-ignore no-explicit-any

  const warningErr = new Error(warning);
  warningErr.name = String(type || "Warning");

  if (code !== undefined) {
    warningErr.code = code;
  }

  if (detail !== undefined) {
    warningErr.detail = detail;
  }

  Error.captureStackTrace(warningErr, ctor || process$1.emitWarning);
  return warningErr;
}

function doEmitWarning(warning) {
  process$1.emit("warning", warning);
}
/** https://nodejs.org/api/process.html#process_process_emitwarning_warning_options */


function emitWarning(warning, type, code, // deno-lint-ignore ban-types
ctor) {
  let detail;

  if (type !== null && typeof type === "object" && !Array.isArray(type)) {
    ctor = type.ctor;
    code = type.code;

    if (typeof type.detail === "string") {
      detail = type.detail;
    }

    type = type.type || "Warning";
  } else if (typeof type === "function") {
    ctor = type;
    code = undefined;
    type = "Warning";
  }

  if (type !== undefined) {
    validateString(type, "type");
  }

  if (typeof code === "function") {
    ctor = code;
    code = undefined;
  } else if (code !== undefined) {
    validateString(code, "code");
  }

  if (typeof warning === "string") {
    warning = createWarningObject(warning, type, code, ctor, detail);
  } else if (!(warning instanceof Error)) {
    throw new ERR_INVALID_ARG_TYPE("warning", ["Error", "string"], warning);
  }

  if (warning.name === "DeprecationWarning") {
    // deno-lint-ignore no-explicit-any
    if (process$1.noDeprecation) {
      return;
    } // deno-lint-ignore no-explicit-any


    if (process$1.throwDeprecation) {
      // Delay throwing the error to guarantee that all former warnings were
      // properly logged.
      return process$1.nextTick(() => {
        throw warning;
      });
    }
  }

  process$1.nextTick(doEmitWarning, warning);
}

class Process extends EventEmitter {
  constructor() {
    super(); //This causes the exit event to be binded to the unload event
    // deno-lint-ignore no-window-prefix

    window.addEventListener("unload", () => {
      //TODO(Soremwar)
      //Get the exit code from the unload event
      super.emit("exit", 0);
    });
  }
  /** https://nodejs.org/api/process.html#process_process_arch */


  arch = arch;
  /**
   * https://nodejs.org/api/process.html#process_process_argv
   * Read permissions are required in order to get the executable route
   */

  argv = argv;
  /** https://nodejs.org/api/process.html#process_process_chdir_directory */

  chdir = chdir;
  /** https://nodejs.org/api/process.html#process_process_cwd */

  cwd = cwd;
  /** https://nodejs.org/api/process.html#process_process_exit_code */

  exit = exit;
  /**
   * https://nodejs.org/api/process.html#process_process_env
   * Requires env permissions
   */

  env = env; // Typed as any to avoid importing "module" module for types
  // deno-lint-ignore no-explicit-any

  mainModule = undefined;
  /** https://nodejs.org/api/process.html#process_process_nexttick_callback_args */

  nextTick = nextTick;
  /** https://nodejs.org/api/process.html#process_process_events */
  //deno-lint-ignore ban-types

  //deno-lint-ignore no-explicit-any
  on(event, listener) {
    if (notImplementedEvents.includes(event)) {
      notImplemented(`process.on("${event}")`);
    }

    super.on(event, listener);
    return this;
  }
  /** https://nodejs.org/api/process.html#process_process_pid */


  pid = pid;
  /** https://nodejs.org/api/process.html#process_process_platform */

  platform = platform;

  removeAllListeners(event) {
    notImplemented(`process.removeAllListeners("${event}")`);
  }

  //deno-lint-ignore no-explicit-any
  removeListener(event, listener) {
    if (notImplementedEvents.includes(event)) {
      notImplemented(`process.removeListener("${event}")`);
    }

    super.removeListener("exit", listener);
    return this;
  }
  /**
   * Returns the current high-resolution real time in a [seconds, nanoseconds]
   * tuple.
   *
   * Note: You need to give --allow-hrtime permission to Deno to actually get
   * nanoseconds precision values. If you don't give 'hrtime' permission, the returned
   * values only have milliseconds precision.
   *
   * `time` is an optional parameter that must be the result of a previous process.hrtime() call to diff with the current time.
   *
   * These times are relative to an arbitrary time in the past, and not related to the time of day and therefore not subject to clock drift. The primary use is for measuring performance between intervals.
   * https://nodejs.org/api/process.html#process_process_hrtime_time
   */


  hrtime(time) {
    const milli = performance.now();
    const sec = Math.floor(milli / 1000);
    const nano = Math.floor(milli * 1_000_000 - sec * 1_000_000_000);

    if (!time) {
      return [sec, nano];
    }

    const [prevSec, prevNano] = time;
    return [sec - prevSec, nano - prevNano];
  }
  /** https://nodejs.org/api/process.html#process_process_stderr */


  stderr = stderr;
  /** https://nodejs.org/api/process.html#process_process_stdin */

  stdin = stdin;
  /** https://nodejs.org/api/process.html#process_process_stdout */

  stdout = stdout;
  /** https://nodejs.org/api/process.html#process_process_version */

  version = version;
  /** https://nodejs.org/api/process.html#process_process_versions */

  versions = versions;
  /** https://nodejs.org/api/process.html#process_process_emitwarning_warning_options */

  emitWarning = emitWarning;
}
/** https://nodejs.org/api/process.html#process_process */


const process$1 = new Process();
Object.defineProperty(process$1, Symbol.toStringTag, {
  enumerable: false,
  writable: true,
  configurable: false,
  value: "process"
});
addReadOnlyProcessAlias("noDeprecation", "--no-deprecation");
addReadOnlyProcessAlias("throwDeprecation", "--throw-deprecation");
process$1.removeListener;
process$1.removeAllListeners;

process$1.env.NODE_ENV = 'production';

var r$2="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:global;var t$1={};var n$2=process$1;t$1=t$1=SemVer;var o$2;o$2="object"===typeof n$2&&n$2.env&&n$2.env.NODE_DEBUG&&/\bsemver\b/i.test(n$2.env.NODE_DEBUG)?function(){var e=Array.prototype.slice.call(arguments,0);e.unshift("SEMVER");console.log.apply(console,e);}:function(){};t$1.SEMVER_SPEC_VERSION="2.0.0";var a$2=256;var i$2=Number.MAX_SAFE_INTEGER||9007199254740991;var s$1=16;var p$1=t$1.re=[];var c$2=t$1.src=[];var l$1=t$1.tokens={};var E$1=0;function tok(e){l$1[e]=E$1++;}tok("NUMERICIDENTIFIER");c$2[l$1.NUMERICIDENTIFIER]="0|[1-9]\\d*";tok("NUMERICIDENTIFIERLOOSE");c$2[l$1.NUMERICIDENTIFIERLOOSE]="[0-9]+";tok("NONNUMERICIDENTIFIER");c$2[l$1.NONNUMERICIDENTIFIER]="\\d*[a-zA-Z-][a-zA-Z0-9-]*";tok("MAINVERSION");c$2[l$1.MAINVERSION]="("+c$2[l$1.NUMERICIDENTIFIER]+")\\."+"("+c$2[l$1.NUMERICIDENTIFIER]+")\\."+"("+c$2[l$1.NUMERICIDENTIFIER]+")";tok("MAINVERSIONLOOSE");c$2[l$1.MAINVERSIONLOOSE]="("+c$2[l$1.NUMERICIDENTIFIERLOOSE]+")\\."+"("+c$2[l$1.NUMERICIDENTIFIERLOOSE]+")\\."+"("+c$2[l$1.NUMERICIDENTIFIERLOOSE]+")";tok("PRERELEASEIDENTIFIER");c$2[l$1.PRERELEASEIDENTIFIER]="(?:"+c$2[l$1.NUMERICIDENTIFIER]+"|"+c$2[l$1.NONNUMERICIDENTIFIER]+")";tok("PRERELEASEIDENTIFIERLOOSE");c$2[l$1.PRERELEASEIDENTIFIERLOOSE]="(?:"+c$2[l$1.NUMERICIDENTIFIERLOOSE]+"|"+c$2[l$1.NONNUMERICIDENTIFIER]+")";tok("PRERELEASE");c$2[l$1.PRERELEASE]="(?:-("+c$2[l$1.PRERELEASEIDENTIFIER]+"(?:\\."+c$2[l$1.PRERELEASEIDENTIFIER]+")*))";tok("PRERELEASELOOSE");c$2[l$1.PRERELEASELOOSE]="(?:-?("+c$2[l$1.PRERELEASEIDENTIFIERLOOSE]+"(?:\\."+c$2[l$1.PRERELEASEIDENTIFIERLOOSE]+")*))";tok("BUILDIDENTIFIER");c$2[l$1.BUILDIDENTIFIER]="[0-9A-Za-z-]+";tok("BUILD");c$2[l$1.BUILD]="(?:\\+("+c$2[l$1.BUILDIDENTIFIER]+"(?:\\."+c$2[l$1.BUILDIDENTIFIER]+")*))";tok("FULL");tok("FULLPLAIN");c$2[l$1.FULLPLAIN]="v?"+c$2[l$1.MAINVERSION]+c$2[l$1.PRERELEASE]+"?"+c$2[l$1.BUILD]+"?";c$2[l$1.FULL]="^"+c$2[l$1.FULLPLAIN]+"$";tok("LOOSEPLAIN");c$2[l$1.LOOSEPLAIN]="[v=\\s]*"+c$2[l$1.MAINVERSIONLOOSE]+c$2[l$1.PRERELEASELOOSE]+"?"+c$2[l$1.BUILD]+"?";tok("LOOSE");c$2[l$1.LOOSE]="^"+c$2[l$1.LOOSEPLAIN]+"$";tok("GTLT");c$2[l$1.GTLT]="((?:<|>)?=?)";tok("XRANGEIDENTIFIERLOOSE");c$2[l$1.XRANGEIDENTIFIERLOOSE]=c$2[l$1.NUMERICIDENTIFIERLOOSE]+"|x|X|\\*";tok("XRANGEIDENTIFIER");c$2[l$1.XRANGEIDENTIFIER]=c$2[l$1.NUMERICIDENTIFIER]+"|x|X|\\*";tok("XRANGEPLAIN");c$2[l$1.XRANGEPLAIN]="[v=\\s]*("+c$2[l$1.XRANGEIDENTIFIER]+")"+"(?:\\.("+c$2[l$1.XRANGEIDENTIFIER]+")"+"(?:\\.("+c$2[l$1.XRANGEIDENTIFIER]+")"+"(?:"+c$2[l$1.PRERELEASE]+")?"+c$2[l$1.BUILD]+"?"+")?)?";tok("XRANGEPLAINLOOSE");c$2[l$1.XRANGEPLAINLOOSE]="[v=\\s]*("+c$2[l$1.XRANGEIDENTIFIERLOOSE]+")"+"(?:\\.("+c$2[l$1.XRANGEIDENTIFIERLOOSE]+")"+"(?:\\.("+c$2[l$1.XRANGEIDENTIFIERLOOSE]+")"+"(?:"+c$2[l$1.PRERELEASELOOSE]+")?"+c$2[l$1.BUILD]+"?"+")?)?";tok("XRANGE");c$2[l$1.XRANGE]="^"+c$2[l$1.GTLT]+"\\s*"+c$2[l$1.XRANGEPLAIN]+"$";tok("XRANGELOOSE");c$2[l$1.XRANGELOOSE]="^"+c$2[l$1.GTLT]+"\\s*"+c$2[l$1.XRANGEPLAINLOOSE]+"$";tok("COERCE");c$2[l$1.COERCE]="(^|[^\\d])"+"(\\d{1,"+s$1+"})"+"(?:\\.(\\d{1,"+s$1+"}))?"+"(?:\\.(\\d{1,"+s$1+"}))?"+"(?:$|[^\\d])";tok("COERCERTL");p$1[l$1.COERCERTL]=new RegExp(c$2[l$1.COERCE],"g");tok("LONETILDE");c$2[l$1.LONETILDE]="(?:~>?)";tok("TILDETRIM");c$2[l$1.TILDETRIM]="(\\s*)"+c$2[l$1.LONETILDE]+"\\s+";p$1[l$1.TILDETRIM]=new RegExp(c$2[l$1.TILDETRIM],"g");var u$2="$1~";tok("TILDE");c$2[l$1.TILDE]="^"+c$2[l$1.LONETILDE]+c$2[l$1.XRANGEPLAIN]+"$";tok("TILDELOOSE");c$2[l$1.TILDELOOSE]="^"+c$2[l$1.LONETILDE]+c$2[l$1.XRANGEPLAINLOOSE]+"$";tok("LONECARET");c$2[l$1.LONECARET]="(?:\\^)";tok("CARETTRIM");c$2[l$1.CARETTRIM]="(\\s*)"+c$2[l$1.LONECARET]+"\\s+";p$1[l$1.CARETTRIM]=new RegExp(c$2[l$1.CARETTRIM],"g");var f$3="$1^";tok("CARET");c$2[l$1.CARET]="^"+c$2[l$1.LONECARET]+c$2[l$1.XRANGEPLAIN]+"$";tok("CARETLOOSE");c$2[l$1.CARETLOOSE]="^"+c$2[l$1.LONECARET]+c$2[l$1.XRANGEPLAINLOOSE]+"$";tok("COMPARATORLOOSE");c$2[l$1.COMPARATORLOOSE]="^"+c$2[l$1.GTLT]+"\\s*("+c$2[l$1.LOOSEPLAIN]+")$|^$";tok("COMPARATOR");c$2[l$1.COMPARATOR]="^"+c$2[l$1.GTLT]+"\\s*("+c$2[l$1.FULLPLAIN]+")$|^$";tok("COMPARATORTRIM");c$2[l$1.COMPARATORTRIM]="(\\s*)"+c$2[l$1.GTLT]+"\\s*("+c$2[l$1.LOOSEPLAIN]+"|"+c$2[l$1.XRANGEPLAIN]+")";p$1[l$1.COMPARATORTRIM]=new RegExp(c$2[l$1.COMPARATORTRIM],"g");var h$2="$1$2$3";tok("HYPHENRANGE");c$2[l$1.HYPHENRANGE]="^\\s*("+c$2[l$1.XRANGEPLAIN]+")"+"\\s+-\\s+"+"("+c$2[l$1.XRANGEPLAIN]+")"+"\\s*$";tok("HYPHENRANGELOOSE");c$2[l$1.HYPHENRANGELOOSE]="^\\s*("+c$2[l$1.XRANGEPLAINLOOSE]+")"+"\\s+-\\s+"+"("+c$2[l$1.XRANGEPLAINLOOSE]+")"+"\\s*$";tok("STAR");c$2[l$1.STAR]="(<|>)?=?\\s*\\*";for(var m$1=0;m$1<E$1;m$1++){o$2(m$1,c$2[m$1]);p$1[m$1]||(p$1[m$1]=new RegExp(c$2[m$1]));}t$1.parse=parse$1;function parse$1(e,r){r&&"object"===typeof r||(r={loose:!!r,includePrerelease:false});if(e instanceof SemVer)return e;if("string"!==typeof e)return null;if(e.length>a$2)return null;var t=r.loose?p$1[l$1.LOOSE]:p$1[l$1.FULL];if(!t.test(e))return null;try{return new SemVer(e,r)}catch(e){return null}}t$1.valid=valid;function valid(e,r){var t=parse$1(e,r);return t?t.version:null}t$1.clean=clean;function clean(e,r){var t=parse$1(e.trim().replace(/^[=v]+/,""),r);return t?t.version:null}t$1.SemVer=SemVer;function SemVer(e,t){t&&"object"===typeof t||(t={loose:!!t,includePrerelease:false});if(e instanceof SemVer){if(e.loose===t.loose)return e;e=e.version;}else if("string"!==typeof e)throw new TypeError("Invalid Version: "+e);if(e.length>a$2)throw new TypeError("version is longer than "+a$2+" characters");if(!((this||r$2)instanceof SemVer))return new SemVer(e,t);o$2("SemVer",e,t);(this||r$2).options=t;(this||r$2).loose=!!t.loose;var n=e.trim().match(t.loose?p$1[l$1.LOOSE]:p$1[l$1.FULL]);if(!n)throw new TypeError("Invalid Version: "+e);(this||r$2).raw=e;(this||r$2).major=+n[1];(this||r$2).minor=+n[2];(this||r$2).patch=+n[3];if((this||r$2).major>i$2||(this||r$2).major<0)throw new TypeError("Invalid major version");if((this||r$2).minor>i$2||(this||r$2).minor<0)throw new TypeError("Invalid minor version");if((this||r$2).patch>i$2||(this||r$2).patch<0)throw new TypeError("Invalid patch version");n[4]?(this||r$2).prerelease=n[4].split(".").map((function(e){if(/^[0-9]+$/.test(e)){var r=+e;if(r>=0&&r<i$2)return r}return e})):(this||r$2).prerelease=[];(this||r$2).build=n[5]?n[5].split("."):[];this.format();}SemVer.prototype.format=function(){(this||r$2).version=(this||r$2).major+"."+(this||r$2).minor+"."+(this||r$2).patch;(this||r$2).prerelease.length&&((this||r$2).version+="-"+(this||r$2).prerelease.join("."));return (this||r$2).version};SemVer.prototype.toString=function(){return (this||r$2).version};SemVer.prototype.compare=function(e){o$2("SemVer.compare",(this||r$2).version,(this||r$2).options,e);e instanceof SemVer||(e=new SemVer(e,(this||r$2).options));return this.compareMain(e)||this.comparePre(e)};SemVer.prototype.compareMain=function(e){e instanceof SemVer||(e=new SemVer(e,(this||r$2).options));return compareIdentifiers((this||r$2).major,e.major)||compareIdentifiers((this||r$2).minor,e.minor)||compareIdentifiers((this||r$2).patch,e.patch)};SemVer.prototype.comparePre=function(e){e instanceof SemVer||(e=new SemVer(e,(this||r$2).options));if((this||r$2).prerelease.length&&!e.prerelease.length)return -1;if(!(this||r$2).prerelease.length&&e.prerelease.length)return 1;if(!(this||r$2).prerelease.length&&!e.prerelease.length)return 0;var t=0;do{var n=(this||r$2).prerelease[t];var a=e.prerelease[t];o$2("prerelease compare",t,n,a);if(void 0===n&&void 0===a)return 0;if(void 0===a)return 1;if(void 0===n)return -1;if(n!==a)return compareIdentifiers(n,a)}while(++t)};SemVer.prototype.compareBuild=function(e){e instanceof SemVer||(e=new SemVer(e,(this||r$2).options));var t=0;do{var n=(this||r$2).build[t];var a=e.build[t];o$2("prerelease compare",t,n,a);if(void 0===n&&void 0===a)return 0;if(void 0===a)return 1;if(void 0===n)return -1;if(n!==a)return compareIdentifiers(n,a)}while(++t)};SemVer.prototype.inc=function(e,t){switch(e){case"premajor":(this||r$2).prerelease.length=0;(this||r$2).patch=0;(this||r$2).minor=0;(this||r$2).major++;this.inc("pre",t);break;case"preminor":(this||r$2).prerelease.length=0;(this||r$2).patch=0;(this||r$2).minor++;this.inc("pre",t);break;case"prepatch":(this||r$2).prerelease.length=0;this.inc("patch",t);this.inc("pre",t);break;case"prerelease":0===(this||r$2).prerelease.length&&this.inc("patch",t);this.inc("pre",t);break;case"major":0===(this||r$2).minor&&0===(this||r$2).patch&&0!==(this||r$2).prerelease.length||(this||r$2).major++;(this||r$2).minor=0;(this||r$2).patch=0;(this||r$2).prerelease=[];break;case"minor":0===(this||r$2).patch&&0!==(this||r$2).prerelease.length||(this||r$2).minor++;(this||r$2).patch=0;(this||r$2).prerelease=[];break;case"patch":0===(this||r$2).prerelease.length&&(this||r$2).patch++;(this||r$2).prerelease=[];break;case"pre":if(0===(this||r$2).prerelease.length)(this||r$2).prerelease=[0];else {var n=(this||r$2).prerelease.length;while(--n>=0)if("number"===typeof(this||r$2).prerelease[n]){(this||r$2).prerelease[n]++;n=-2;}-1===n&&(this||r$2).prerelease.push(0);}t&&((this||r$2).prerelease[0]===t?isNaN((this||r$2).prerelease[1])&&((this||r$2).prerelease=[t,0]):(this||r$2).prerelease=[t,0]);break;default:throw new Error("invalid increment argument: "+e)}this.format();(this||r$2).raw=(this||r$2).version;return this||r$2};t$1.inc=inc;function inc(e,r,t,n){if("string"===typeof t){n=t;t=void 0;}try{return new SemVer(e,t).inc(r,n).version}catch(e){return null}}t$1.diff=diff;function diff(e,r){if(eq(e,r))return null;var t=parse$1(e);var n=parse$1(r);var o="";if(t.prerelease.length||n.prerelease.length){o="pre";var a="prerelease";}for(var i in t)if(("major"===i||"minor"===i||"patch"===i)&&t[i]!==n[i])return o+i;return a}t$1.compareIdentifiers=compareIdentifiers;var R$1=/^[0-9]+$/;function compareIdentifiers(e,r){var t=R$1.test(e);var n=R$1.test(r);if(t&&n){e=+e;r=+r;}return e===r?0:t&&!n?-1:n&&!t?1:e<r?-1:1}t$1.rcompareIdentifiers=rcompareIdentifiers;function rcompareIdentifiers(e,r){return compareIdentifiers(r,e)}t$1.major=major;function major(e,r){return new SemVer(e,r).major}t$1.minor=minor;function minor(e,r){return new SemVer(e,r).minor}t$1.patch=patch;function patch(e,r){return new SemVer(e,r).patch}t$1.compare=compare;function compare(e,r,t){return new SemVer(e,t).compare(new SemVer(r,t))}t$1.compareLoose=compareLoose;function compareLoose(e,r){return compare(e,r,true)}t$1.compareBuild=compareBuild;function compareBuild(e,r,t){var n=new SemVer(e,t);var o=new SemVer(r,t);return n.compare(o)||n.compareBuild(o)}t$1.rcompare=rcompare;function rcompare(e,r,t){return compare(r,e,t)}t$1.sort=sort;function sort(e,r){return e.sort((function(e,n){return t$1.compareBuild(e,n,r)}))}t$1.rsort=rsort;function rsort(e,r){return e.sort((function(e,n){return t$1.compareBuild(n,e,r)}))}t$1.gt=gt;function gt(e,r,t){return compare(e,r,t)>0}t$1.lt=lt;function lt(e,r,t){return compare(e,r,t)<0}t$1.eq=eq;function eq(e,r,t){return 0===compare(e,r,t)}t$1.neq=neq;function neq(e,r,t){return 0!==compare(e,r,t)}t$1.gte=gte;function gte(e,r,t){return compare(e,r,t)>=0}t$1.lte=lte;function lte(e,r,t){return compare(e,r,t)<=0}t$1.cmp=cmp;function cmp(e,r,t,n){switch(r){case"===":"object"===typeof e&&(e=e.version);"object"===typeof t&&(t=t.version);return e===t;case"!==":"object"===typeof e&&(e=e.version);"object"===typeof t&&(t=t.version);return e!==t;case"":case"=":case"==":return eq(e,t,n);case"!=":return neq(e,t,n);case">":return gt(e,t,n);case">=":return gte(e,t,n);case"<":return lt(e,t,n);case"<=":return lte(e,t,n);default:throw new TypeError("Invalid operator: "+r)}}t$1.Comparator=Comparator;function Comparator(e,t){t&&"object"===typeof t||(t={loose:!!t,includePrerelease:false});if(e instanceof Comparator){if(e.loose===!!t.loose)return e;e=e.value;}if(!((this||r$2)instanceof Comparator))return new Comparator(e,t);o$2("comparator",e,t);(this||r$2).options=t;(this||r$2).loose=!!t.loose;this.parse(e);(this||r$2).semver===I$1?(this||r$2).value="":(this||r$2).value=(this||r$2).operator+(this||r$2).semver.version;o$2("comp",this||r$2);}var I$1={};Comparator.prototype.parse=function(e){var t=(this||r$2).options.loose?p$1[l$1.COMPARATORLOOSE]:p$1[l$1.COMPARATOR];var n=e.match(t);if(!n)throw new TypeError("Invalid comparator: "+e);(this||r$2).operator=void 0!==n[1]?n[1]:"";"="===(this||r$2).operator&&((this||r$2).operator="");n[2]?(this||r$2).semver=new SemVer(n[2],(this||r$2).options.loose):(this||r$2).semver=I$1;};Comparator.prototype.toString=function(){return (this||r$2).value};Comparator.prototype.test=function(e){o$2("Comparator.test",e,(this||r$2).options.loose);if((this||r$2).semver===I$1||e===I$1)return true;if("string"===typeof e)try{e=new SemVer(e,(this||r$2).options);}catch(e){return false}return cmp(e,(this||r$2).operator,(this||r$2).semver,(this||r$2).options)};Comparator.prototype.intersects=function(e,t){if(!(e instanceof Comparator))throw new TypeError("a Comparator is required");t&&"object"===typeof t||(t={loose:!!t,includePrerelease:false});var n;if(""===(this||r$2).operator){if(""===(this||r$2).value)return true;n=new Range(e.value,t);return satisfies((this||r$2).value,n,t)}if(""===e.operator){if(""===e.value)return true;n=new Range((this||r$2).value,t);return satisfies(e.semver,n,t)}var o=(">="===(this||r$2).operator||">"===(this||r$2).operator)&&(">="===e.operator||">"===e.operator);var a=("<="===(this||r$2).operator||"<"===(this||r$2).operator)&&("<="===e.operator||"<"===e.operator);var i=(this||r$2).semver.version===e.semver.version;var s=(">="===(this||r$2).operator||"<="===(this||r$2).operator)&&(">="===e.operator||"<="===e.operator);var p=cmp((this||r$2).semver,"<",e.semver,t)&&(">="===(this||r$2).operator||">"===(this||r$2).operator)&&("<="===e.operator||"<"===e.operator);var c=cmp((this||r$2).semver,">",e.semver,t)&&("<="===(this||r$2).operator||"<"===(this||r$2).operator)&&(">="===e.operator||">"===e.operator);return o||a||i&&s||p||c};t$1.Range=Range;function Range(e,t){t&&"object"===typeof t||(t={loose:!!t,includePrerelease:false});if(e instanceof Range)return e.loose===!!t.loose&&e.includePrerelease===!!t.includePrerelease?e:new Range(e.raw,t);if(e instanceof Comparator)return new Range(e.value,t);if(!((this||r$2)instanceof Range))return new Range(e,t);(this||r$2).options=t;(this||r$2).loose=!!t.loose;(this||r$2).includePrerelease=!!t.includePrerelease;(this||r$2).raw=e;(this||r$2).set=e.split(/\s*\|\|\s*/).map((function(e){return this.parseRange(e.trim())}),this||r$2).filter((function(e){return e.length}));if(!(this||r$2).set.length)throw new TypeError("Invalid SemVer Range: "+e);this.format();}Range.prototype.format=function(){(this||r$2).range=(this||r$2).set.map((function(e){return e.join(" ").trim()})).join("||").trim();return (this||r$2).range};Range.prototype.toString=function(){return (this||r$2).range};Range.prototype.parseRange=function(e){var t=(this||r$2).options.loose;e=e.trim();var n=t?p$1[l$1.HYPHENRANGELOOSE]:p$1[l$1.HYPHENRANGE];e=e.replace(n,hyphenReplace);o$2("hyphen replace",e);e=e.replace(p$1[l$1.COMPARATORTRIM],h$2);o$2("comparator trim",e,p$1[l$1.COMPARATORTRIM]);e=e.replace(p$1[l$1.TILDETRIM],u$2);e=e.replace(p$1[l$1.CARETTRIM],f$3);e=e.split(/\s+/).join(" ");var a=t?p$1[l$1.COMPARATORLOOSE]:p$1[l$1.COMPARATOR];var i=e.split(" ").map((function(e){return parseComparator(e,(this||r$2).options)}),this||r$2).join(" ").split(/\s+/);(this||r$2).options.loose&&(i=i.filter((function(e){return !!e.match(a)})));i=i.map((function(e){return new Comparator(e,(this||r$2).options)}),this||r$2);return i};Range.prototype.intersects=function(e,t){if(!(e instanceof Range))throw new TypeError("a Range is required");return (this||r$2).set.some((function(r){return isSatisfiable(r,t)&&e.set.some((function(e){return isSatisfiable(e,t)&&r.every((function(r){return e.every((function(e){return r.intersects(e,t)}))}))}))}))};function isSatisfiable(e,r){var t=true;var n=e.slice();var o=n.pop();while(t&&n.length){t=n.every((function(e){return o.intersects(e,r)}));o=n.pop();}return t}t$1.toComparators=toComparators;function toComparators(e,r){return new Range(e,r).set.map((function(e){return e.map((function(e){return e.value})).join(" ").trim().split(" ")}))}function parseComparator(e,r){o$2("comp",e,r);e=replaceCarets(e,r);o$2("caret",e);e=replaceTildes(e,r);o$2("tildes",e);e=replaceXRanges(e,r);o$2("xrange",e);e=replaceStars(e,r);o$2("stars",e);return e}function isX(e){return !e||"x"===e.toLowerCase()||"*"===e}function replaceTildes(e,r){return e.trim().split(/\s+/).map((function(e){return replaceTilde(e,r)})).join(" ")}function replaceTilde(e,r){var t=r.loose?p$1[l$1.TILDELOOSE]:p$1[l$1.TILDE];return e.replace(t,(function(r,t,n,a,i){o$2("tilde",e,r,t,n,a,i);var s;if(isX(t))s="";else if(isX(n))s=">="+t+".0.0 <"+(+t+1)+".0.0";else if(isX(a))s=">="+t+"."+n+".0 <"+t+"."+(+n+1)+".0";else if(i){o$2("replaceTilde pr",i);s=">="+t+"."+n+"."+a+"-"+i+" <"+t+"."+(+n+1)+".0";}else s=">="+t+"."+n+"."+a+" <"+t+"."+(+n+1)+".0";o$2("tilde return",s);return s}))}function replaceCarets(e,r){return e.trim().split(/\s+/).map((function(e){return replaceCaret(e,r)})).join(" ")}function replaceCaret(e,r){o$2("caret",e,r);var t=r.loose?p$1[l$1.CARETLOOSE]:p$1[l$1.CARET];return e.replace(t,(function(r,t,n,a,i){o$2("caret",e,r,t,n,a,i);var s;if(isX(t))s="";else if(isX(n))s=">="+t+".0.0 <"+(+t+1)+".0.0";else if(isX(a))s="0"===t?">="+t+"."+n+".0 <"+t+"."+(+n+1)+".0":">="+t+"."+n+".0 <"+(+t+1)+".0.0";else if(i){o$2("replaceCaret pr",i);s="0"===t?"0"===n?">="+t+"."+n+"."+a+"-"+i+" <"+t+"."+n+"."+(+a+1):">="+t+"."+n+"."+a+"-"+i+" <"+t+"."+(+n+1)+".0":">="+t+"."+n+"."+a+"-"+i+" <"+(+t+1)+".0.0";}else {o$2("no pr");s="0"===t?"0"===n?">="+t+"."+n+"."+a+" <"+t+"."+n+"."+(+a+1):">="+t+"."+n+"."+a+" <"+t+"."+(+n+1)+".0":">="+t+"."+n+"."+a+" <"+(+t+1)+".0.0";}o$2("caret return",s);return s}))}function replaceXRanges(e,r){o$2("replaceXRanges",e,r);return e.split(/\s+/).map((function(e){return replaceXRange(e,r)})).join(" ")}function replaceXRange(e,r){e=e.trim();var t=r.loose?p$1[l$1.XRANGELOOSE]:p$1[l$1.XRANGE];return e.replace(t,(function(t,n,a,i,s,p){o$2("xRange",e,t,n,a,i,s,p);var c=isX(a);var l=c||isX(i);var E=l||isX(s);var u=E;"="===n&&u&&(n="");p=r.includePrerelease?"-0":"";if(c)t=">"===n||"<"===n?"<0.0.0-0":"*";else if(n&&u){l&&(i=0);s=0;if(">"===n){n=">=";if(l){a=+a+1;i=0;s=0;}else {i=+i+1;s=0;}}else if("<="===n){n="<";l?a=+a+1:i=+i+1;}t=n+a+"."+i+"."+s+p;}else l?t=">="+a+".0.0"+p+" <"+(+a+1)+".0.0"+p:E&&(t=">="+a+"."+i+".0"+p+" <"+a+"."+(+i+1)+".0"+p);o$2("xRange return",t);return t}))}function replaceStars(e,r){o$2("replaceStars",e,r);return e.trim().replace(p$1[l$1.STAR],"")}function hyphenReplace(e,r,t,n,o,a,i,s,p,c,l,E,u){r=isX(t)?"":isX(n)?">="+t+".0.0":isX(o)?">="+t+"."+n+".0":">="+r;s=isX(p)?"":isX(c)?"<"+(+p+1)+".0.0":isX(l)?"<"+p+"."+(+c+1)+".0":E?"<="+p+"."+c+"."+l+"-"+E:"<="+s;return (r+" "+s).trim()}Range.prototype.test=function(e){if(!e)return false;if("string"===typeof e)try{e=new SemVer(e,(this||r$2).options);}catch(e){return false}for(var t=0;t<(this||r$2).set.length;t++)if(testSet((this||r$2).set[t],e,(this||r$2).options))return true;return false};function testSet(e,r,t){for(var n=0;n<e.length;n++)if(!e[n].test(r))return false;if(r.prerelease.length&&!t.includePrerelease){for(n=0;n<e.length;n++){o$2(e[n].semver);if(e[n].semver!==I$1&&e[n].semver.prerelease.length>0){var a=e[n].semver;if(a.major===r.major&&a.minor===r.minor&&a.patch===r.patch)return true}}return false}return true}t$1.satisfies=satisfies;function satisfies(e,r,t){try{r=new Range(r,t);}catch(e){return false}return r.test(e)}t$1.maxSatisfying=maxSatisfying;function maxSatisfying(e,r,t){var n=null;var o=null;try{var a=new Range(r,t);}catch(e){return null}e.forEach((function(e){if(a.test(e)&&(!n||-1===o.compare(e))){n=e;o=new SemVer(n,t);}}));return n}t$1.minSatisfying=minSatisfying;function minSatisfying(e,r,t){var n=null;var o=null;try{var a=new Range(r,t);}catch(e){return null}e.forEach((function(e){if(a.test(e)&&(!n||1===o.compare(e))){n=e;o=new SemVer(n,t);}}));return n}t$1.minVersion=minVersion;function minVersion(e,r){e=new Range(e,r);var t=new SemVer("0.0.0");if(e.test(t))return t;t=new SemVer("0.0.0-0");if(e.test(t))return t;t=null;for(var n=0;n<e.set.length;++n){var o=e.set[n];o.forEach((function(e){var r=new SemVer(e.semver.version);switch(e.operator){case">":0===r.prerelease.length?r.patch++:r.prerelease.push(0);r.raw=r.format();case"":case">=":t&&!gt(t,r)||(t=r);break;case"<":case"<=":break;default:throw new Error("Unexpected operation: "+e.operator)}}));}return t&&e.test(t)?t:null}t$1.validRange=validRange;function validRange(e,r){try{return new Range(e,r).range||"*"}catch(e){return null}}t$1.ltr=ltr;function ltr(e,r,t){return outside(e,r,"<",t)}t$1.gtr=gtr;function gtr(e,r,t){return outside(e,r,">",t)}t$1.outside=outside;function outside(e,r,t,n){e=new SemVer(e,n);r=new Range(r,n);var o,a,i,s,p;switch(t){case">":o=gt;a=lte;i=lt;s=">";p=">=";break;case"<":o=lt;a=gte;i=gt;s="<";p="<=";break;default:throw new TypeError('Must provide a hilo val of "<" or ">"')}if(satisfies(e,r,n))return false;for(var c=0;c<r.set.length;++c){var l=r.set[c];var E=null;var u=null;l.forEach((function(e){e.semver===I$1&&(e=new Comparator(">=0.0.0"));E=E||e;u=u||e;o(e.semver,E.semver,n)?E=e:i(e.semver,u.semver,n)&&(u=e);}));if(E.operator===s||E.operator===p)return false;if((!u.operator||u.operator===s)&&a(e,u.semver))return false;if(u.operator===p&&i(e,u.semver))return false}return true}t$1.prerelease=prerelease;function prerelease(e,r){var t=parse$1(e,r);return t&&t.prerelease.length?t.prerelease:null}t$1.intersects=intersects;function intersects(e,r,t){e=new Range(e,t);r=new Range(r,t);return e.intersects(r)}t$1.coerce=coerce;function coerce(e,r){if(e instanceof SemVer)return e;"number"===typeof e&&(e=String(e));if("string"!==typeof e)return null;r=r||{};var t=null;if(r.rtl){var n;while((n=p$1[l$1.COERCERTL].exec(e))&&(!t||t.index+t[0].length!==e.length)){t&&n.index+n[0].length===t.index+t[0].length||(t=n);p$1[l$1.COERCERTL].lastIndex=n.index+n[1].length+n[2].length;}p$1[l$1.COERCERTL].lastIndex=-1;}else t=e.match(p$1[l$1.COERCE]);return null===t?null:parse$1(t[2]+"."+(t[3]||"0")+"."+(t[4]||"0"),r)}var v$1=t$1;const O$1=t$1.SEMVER_SPEC_VERSION,L$1=t$1.tokens;const N$1=t$1.re,S$1=t$1.src,T$1=t$1.parse,g$1=t$1.valid,A$1=t$1.clean,d$1=t$1.SemVer,C$1=t$1.inc,w$1=t$1.diff,y$1=t$1.compareIdentifiers,P$1=t$1.rcompareIdentifiers,D$1=t$1.major,V$1=t$1.minor,M$1=t$1.patch,X$1=t$1.compare,k$2=t$1.compareLoose,F$1=t$1.compareBuild,G$1=t$1.rcompare,j$1=t$1.sort,U$1=t$1.rsort,b$2=t$1.gt,x$1=t$1.lt,$$1=t$1.eq,B$1=t$1.neq,q$1=t$1.gte,H$1=t$1.lte,_$1=t$1.cmp,Y$1=t$1.Comparator,z$1=t$1.Range,Z$1=t$1.toComparators,J$1=t$1.satisfies,K$1=t$1.maxSatisfying,Q$1=t$1.minSatisfying,W$1=t$1.minVersion,ee=t$1.validRange,re=t$1.ltr,te=t$1.gtr,ne=t$1.outside,oe=t$1.prerelease,ae=t$1.intersects,ie=t$1.coerce;

var e$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': v$1,
  Comparator: Y$1,
  Range: z$1,
  SEMVER_SPEC_VERSION: O$1,
  SemVer: d$1,
  clean: A$1,
  cmp: _$1,
  coerce: ie,
  compare: X$1,
  compareBuild: F$1,
  compareIdentifiers: y$1,
  compareLoose: k$2,
  diff: w$1,
  eq: $$1,
  gt: b$2,
  gte: q$1,
  gtr: te,
  inc: C$1,
  intersects: ae,
  lt: x$1,
  lte: H$1,
  ltr: re,
  major: D$1,
  maxSatisfying: K$1,
  minSatisfying: Q$1,
  minVersion: W$1,
  minor: V$1,
  neq: B$1,
  outside: ne,
  parse: T$1,
  patch: M$1,
  prerelease: oe,
  rcompare: G$1,
  rcompareIdentifiers: P$1,
  re: N$1,
  rsort: U$1,
  satisfies: J$1,
  sort: j$1,
  src: S$1,
  toComparators: Z$1,
  tokens: L$1,
  valid: g$1,
  validRange: ee
});

var n$1="default"in e$2?v$1:e$2;var r$1={};const i$1=n$1;const{Semver:o$1,SemverRange:a$1}=e$3;r$1=function nodeRangeToSemverRange(e){let t=i$1.validRange(e);if(!t)return new a$1(e);if("*"===t)return new a$1(t);try{let t=new a$1(e);if(!t.version.tag)return t}catch(e){if("ENOTSEMVER"!==e.code)throw e}let n;for(let e of t.split("||")){let t,r,i,f;for(let n of e.split(" ")){let e="<"===n[0];let a=">"===n[0];if(!e&&!a){t=n;i=true;break}let l="="===n[1];if(a){if(!e){let e="="===n[1];let t=new o$1(n.substr(1+e));if(!r||r.lt(t)){r=t;f=e;}}}else {let e=new o$1(n.substr(1+l));if(!t||t.gt(e)){t=e;i=l;}}}if(!t){n=new a$1("*");continue}if(r&&t&&r.gt(t)){let e=new a$1(r.toString());n&&(n.contains(e)||!e.gt(n)&&!e.contains(n))||(n=e);continue}let l;if(t){if(i){let e=new a$1(t.toString());n&&(n.contains(e)||!e.gt(n)&&!e.contains(n))||(n=e);continue}let e=0,o=0,f=0,c="";if(t.pre&&r.major===t.major&&r.minor===t.minor&&r.patch===t.patch){n=new a$1("~"+r.toString());continue}if(0===t.patch)if(0===t.minor){if(t.major>0){e=t.major-1;c="^";}}else {e=t.major;o=t.minor-1;c="~";}else {e=t.major;o=t.minor;f=0;c="~";}l=new a$1(0===e&&"^"===c?"0":c+e+"."+o+"."+f);}if(!r){n=l;continue}let c;c=f?new a$1("^^"+r.toString()):r.pre?new a$1("^^"+r.major+"."+r.minor+"."+r.patch+"-"+[...r.pre,1].join(".")):new a$1("^^"+r.major+"."+r.minor+"."+(r.patch+1));let m=l?c.intersect(l)||l:c;n&&(n.contains(m)||!m.gt(n)&&!m.contains(n))||(n=m);}return n};var f$2=r$1;

const fetch$1=async function(r,...e){const n=r.toString();if(!(n.startsWith("file:")||n.startsWith("data:")||n.startsWith("node:")))return globalThis.fetch(n,...e);try{let r;r=n.startsWith("file:")?await Deno.readTextFile(fileURLToPath(n)):n.startsWith("node:")?"":decodeURIComponent(n.slice(n.indexOf(",")));return {status:200,async text(){return r.toString()},async json(){return JSON.parse(r.toString())},arrayBuffer(){return r}}}catch(t){return "EISDIR"===t.code?{status:200,async text(){return ""},async json(){throw new Error("Not JSON")},arrayBuffer(){return new ArrayBuffer(0)}}:"NotFound"===t.name?{status:404,statusText:t.toString()}:{status:500,statusText:t.toString()}}};

var e$1;if("undefined"!==typeof Deno)new URL("file://"+Deno.cwd()+"/");else if("undefined"!==typeof process&&(null===(e$1=process.versions)||void 0===e$1?void 0:e$1.node))new URL("file://"+process.cwd()+"/");else if("undefined"!==typeof document){const e=document.querySelector("base[href]");e?new URL(e.href+(e.href.endsWith("/")?"":"/")):"undefined"!==typeof location&&new URL("../",new URL(location.href));}function matchesRoot(e,t){return e.protocol===t.protocol&&e.host===t.host&&e.port===t.port&&e.username===t.username&&e.password===t.password}function rebase(e,t=new URL("/",e),s=false){"boolean"===typeof s?s=s?"/":"./":s.endsWith("/")||(s+="/");t.search=t.hash="";t.pathname.endsWith("/")||(t.pathname+="/");const r=e.href;const i=t.href;if(r.startsWith(i))return s+r.slice(i.length);if(!matchesRoot(e,t))return e.href;const o=t.pathname;const n=e.pathname;const l=Math.min(o.length,n.length);let c=-1;for(let e=0;e<l;e++){if(o[e]!==n[e])break;"/"===n[e]&&(c=e);}return "../".repeat(o.slice(c+1).split("/").length-1)+n.slice(c+1)+e.search+e.hash}function isURL$1(e){try{if("#"===e[0])return false;new URL(e);}catch{return false}return true}function isPlain$1(e){return !isRelative$1(e)&&!isURL$1(e)}function isRelative$1(e){return e.startsWith("./")||e.startsWith("../")||e.startsWith("/")}function alphabetize(e){const t={};for(const s of Object.keys(e).sort())t[s]=e[s];return t}function replaceTarget(e,t,s){const r=e[t];if("string"===typeof r||null===r){const i=s(r);void 0!==i&&(e[t]=i);}else for(const e of Object.keys(r))replaceTarget(r,e,s);}function mapTarget(e,t){if("string"===typeof e||null===e)return t(e);const s={};for(const r of Object.keys(e))s[r]=mapTarget(e[r],t);return s}function targetEquals(e,t,s){if(null===e||null===t)return e===t;if("string"===typeof e||"string"===typeof t)return "string"===typeof e&&"string"===typeof t&&new URL(e,s).href===new URL(t,s).href;const r=Object.keys(e);const i=Object.keys(t);if(r.length!==i.length)return false;for(let o=0;o<r.length;o++){const n=r[o];const l=i[o];if(n!==l)return false;if(!targetEquals(e[n],t[l],s))return false}return true}class ImportMap{constructor(e,t){this.imports=Object.create(null);this.scopes=Object.create(null);"string"===typeof e&&(e=new URL(e));this.baseUrl=e;t&&this.extend(t,true);}clone(){return new ImportMap(this.baseUrl,this.toJSON())}extend(e,t=false){Object.assign(this.imports,e.imports);if(t)Object.assign(this.scopes,e.scopes);else if(e.scopes)for(const t of Object.keys(e.scopes))Object.assign(this.scopes[t]=this.scopes[t]||Object.create(null),e.scopes[t]);this.rebase(this.baseUrl.href);return this}sort(){this.imports=alphabetize(this.imports);this.scopes=alphabetize(this.scopes);for(const e of Object.keys(this.scopes))this.scopes[e]=alphabetize(this.scopes[e]);}set(e,t,s){if(s){this.scopes[s]=this.scopes[s]||{};this.scopes[s][e]=t;}else this.imports[e]=t;}replace(e,t){const s=e.endsWith("/");if(!isURL$1(e))throw new Error("URL remapping only supports URLs");const r=rebase(new URL(t),this.baseUrl);for(const t of Object.keys(this.imports))replaceTarget(this.imports,t,(t=>{if(null!==t)return s&&t.startsWith(e)||t===e?r+t.slice(e.length):void 0}));for(const t of Object.keys(this.scopes)){const i=this.scopes[t];const o=new URL(t,this.baseUrl).href;if(s&&o.startsWith(e)||o===e){const s=r+o.slice(e.length);delete this.scopes[t];this.scopes[s]=i;}for(const t of Object.keys(i))replaceTarget(i,t,(t=>{if(null!==t)return s&&t.startsWith(e)||t===e?r+t.slice(e.length):void 0}));}return this}combineSubpaths(){}
/**
     * Groups the import map scopes to shared URLs to reduce duplicate mappings.
     *
     * @param baseScope {String | URL}
     *
     * For two given scopes, "https://site.com/x/" and "https://site.com/y/",
     * a single scope will be constructed for "https://site.com/" including
     * their shared mappings.
     *
     * In the case where the scope is on the same origin as the baseUrl, the grouped
     * root will never backtrack below the baseUrl, unless specifying the baseScope
     * option to permit a custom backtracking base.
     *
     */flatten(e=this.baseUrl){"string"===typeof e&&(e=new URL(e.endsWith("/")?e:e+"/"));if(!e.pathname.endsWith("/")){e=new URL(e.href);e.pathname+="/";}for(const t of Object.keys(this.scopes)){const s=this.scopes[t];const r=new URL(t,this.baseUrl);let i;i=r.protocol===this.baseUrl.protocol&&r.hostname===this.baseUrl.hostname&&r.port===this.baseUrl.port?rebase(r.href.startsWith(e.href)?e:r,this.baseUrl):r.protocol+"//"+r.hostname+(r.port?":"+r.port:"")+"/";let o=this.scopes[i]||{};o===s&&(o=null);let n=true;for(const e of Object.keys(s)){const t=s[e];if(targetEquals(this.imports[e],t,this.baseUrl))delete s[e];else if(!o||o[e]&&!targetEquals(o[e],t,this.baseUrl))n=false;else {o[e]=t;replaceTarget(o,e,(e=>rebase(new URL(e,this.baseUrl),this.baseUrl)));delete s[e];this.scopes[i]=alphabetize(o);}}n&&delete this.scopes[t];}return this}rebase(e=this.baseUrl.href,t=false){const s=this.baseUrl;this.baseUrl=new URL(e,this.baseUrl);this.baseUrl.pathname.endsWith("/")||(this.baseUrl.pathname+="/");let r=false;for(const e of Object.keys(this.imports)){replaceTarget(this.imports,e,(e=>{if(null!==e)return rebase(new URL(e,s),this.baseUrl,t)}));if(!isPlain$1(e)){const i=rebase(new URL(e,s),this.baseUrl,t);if(i!==e){r=true;this.imports[i]=this.imports[e];delete this.imports[e];}}}r&&(this.imports=alphabetize(this.imports));let i=false;for(const e of Object.keys(this.scopes)){const r=this.scopes[e];let o=false;for(let e of Object.keys(r)){replaceTarget(r,e,(e=>{if(null!==e)return rebase(new URL(e,s),this.baseUrl,t)}));if(!isPlain$1(e)){const i=rebase(new URL(e,s),this.baseUrl,t);if(i!==e){o=true;r[i]=r[e];delete r[e];}}}o&&(this.scopes[e]=alphabetize(r));const n=rebase(new URL(e,s),this.baseUrl,t);if(e!==n){i=true;delete this.scopes[e];this.scopes[n]=r;}}i&&(this.scopes=alphabetize(this.scopes));return this}setEnv(e){for(const t of Object.keys(this.imports)){const s=this.imports[t];"string"!==typeof s&&null!==s&&(this.imports[t]=resolveConditional(s,e));}for(const t of Object.keys(this.scopes)){const s=this.scopes[t];for(const t of Object.keys(s)){const r=s[t];"string"!==typeof r&&null!==r&&(s[t]=resolveConditional(r,e));}}return this}resolve(e,t=this.baseUrl,s){"string"===typeof t&&(t=new URL(t));let r;if(!isPlain$1(e)){r=new URL(e,t);e=r.href;}const i=getScopeMatches(t,this.scopes,this.baseUrl);for(const[t]of i){let i=getMapMatch(e,this.scopes[t]);!i&&r&&(i=getMapMatch(e=rebase(r,this.baseUrl,true),this.scopes[t])||getMapMatch(e=rebase(r,this.baseUrl,false),this.scopes[t]));if(i){const r=s?resolveConditional(this.scopes[t][i],s):this.scopes[t][i];return mapTarget(r,(t=>null===t?null:new URL(t+e.slice(i.length),this.baseUrl).href))}}let o=getMapMatch(e,this.imports);!o&&r&&(o=getMapMatch(e=rebase(r,this.baseUrl,true),this.imports)||getMapMatch(e=rebase(r,this.baseUrl,false),this.imports));if(o){const t=s?resolveConditional(this.imports[o],s):this.imports[o];return mapTarget(t,(t=>null===t?null:new URL(t+e.slice(o.length),this.baseUrl).href))}return r?r.href:null}toJSON(){const e={};Object.keys(this.imports).length&&(e.imports=this.imports);Object.keys(this.scopes).length&&(e.scopes=this.scopes);return JSON.parse(JSON.stringify(e))}}function getScopeMatches(e,t,s){const r=e.href;let i=Object.keys(t).map((e=>[e,new URL(e,s).href]));i=i.sort((([,e],[,t])=>e.length<t.length?1:-1));return i.filter((([,e])=>e===r||e.endsWith("/")&&r.startsWith(e)))}function getMapMatch(e,t){if(e in t)return e;let s;for(const r of Object.keys(t)){const t=r.endsWith("*");(r.endsWith("/")||t)&&(e.startsWith(t?r.slice(0,-1):r)&&(!s||r.length>s.length)&&(s=r));}return s}function resolveConditional(e,t={}){if("string"===typeof e||null===e)return e;Array.isArray(t)&&(t={include:t});const{include:s=[],exclude:r=[],covers:i=[]}=t;const{resolved:o}=internalResolveConditional(e,{include:s,exclude:r,covers:i},[],[]);return void 0===o?null:o}function internalResolveConditional(e,t,s,r){if("string"===typeof e)return {exhaustive:true,resolved:e};if(null===e)return {exhaustive:true,resolved:e};let{include:i,exclude:o,covers:n}=t;let l={};let c=0;const a=[];for(const t of Object.keys(e)){if(r.includes(t))continue;if(a.includes(t))continue;const h=[t,...s];const{exhaustive:f,resolved:p}=internalResolveConditional(e[t],{include:i,exclude:o,covers:n},h,[...r,...a]);f&&a.push(t);if(void 0!==p&&!o.includes(t)){l[t]=p;c++;}if("default"===t||i.includes(t)||s.includes(t))return {exhaustive:true,resolved:1===c?l[t]:l};if(n.some((e=>e.every((e=>i.includes(e)||s.includes(e)||r.includes(e)||a.includes(e))))))return {exhaustive:true,resolved:l}}return 0===c?{exhaustive:false,resolved:void 0}:{exhaustive:false,resolved:l}}

let e,r,a,i=4194304;const s=1===new Uint8Array(new Uint16Array([1]).buffer)[0];let t,f$1,c$1;function parse(ke,le="@"){if(t=ke,f$1=le,t.length>i||!e){for(;t.length>i;)i*=2;r=new ArrayBuffer(4*i),e=function(e,r,a){"use asm";var i=new e.Int8Array(a),s=new e.Int16Array(a),t=new e.Int32Array(a),f=new e.Uint8Array(a),c=new e.Uint16Array(a),ke=816;function b(e){e=e|0;var r=0,a=0,f=0,le=0,oe=0;oe=ke;ke=ke+14336|0;le=oe;i[589]=1;s[291]=0;s[292]=0;s[293]=-1;t[15]=t[2];i[590]=0;t[14]=0;i[588]=0;t[16]=oe+10240;t[17]=oe+2048;i[591]=0;e=(t[3]|0)+-2|0;t[18]=e;r=e+(t[12]<<1)|0;t[19]=r;e:while(1){a=e+2|0;t[18]=a;if(e>>>0>=r>>>0){f=18;break}r:do{switch(s[a>>1]|0){case 9:case 10:case 11:case 12:case 13:case 32:break;case 101:{if((((s[292]|0)==0?R(a)|0:0)?B(e+4|0,120,112,111,114,116)|0:0)?(u(),(i[589]|0)==0):0){f=9;break e}else f=17;break}case 105:{if(R(a)|0?B(e+4|0,109,112,111,114,116)|0:0){k();f=17;}else f=17;break}case 59:{f=17;break}case 47:switch(s[e+4>>1]|0){case 47:{G();break r}case 42:{p(1);break r}default:{f=16;break e}}default:{f=16;break e}}}while(0);if((f|0)==17){f=0;t[15]=t[18];}e=t[18]|0;r=t[19]|0;}if((f|0)==9){e=t[18]|0;t[15]=e;f=19;}else if((f|0)==16){i[589]=0;t[18]=e;f=19;}else if((f|0)==18)if(!(i[588]|0)){e=a;f=19;}else e=0;do{if((f|0)==19){e:while(1){r=e+2|0;t[18]=r;a=r;if(e>>>0>=(t[19]|0)>>>0){f=75;break}r:do{switch(s[r>>1]|0){case 9:case 10:case 11:case 12:case 13:case 32:break;case 101:{if(((s[292]|0)==0?R(r)|0:0)?B(e+4|0,120,112,111,114,116)|0:0){u();f=74;}else f=74;break}case 105:{if(R(r)|0?B(e+4|0,109,112,111,114,116)|0:0){k();f=74;}else f=74;break}case 99:{if((R(r)|0?z(e+4|0,108,97,115,115)|0:0)?Z(s[e+12>>1]|0)|0:0){i[591]=1;f=74;}else f=74;break}case 40:{r=t[15]|0;a=t[17]|0;f=s[292]|0;s[292]=f+1<<16>>16;t[a+((f&65535)<<2)>>2]=r;f=74;break}case 41:{e=s[292]|0;if(!(e<<16>>16)){f=36;break e}f=e+-1<<16>>16;s[292]=f;e=t[11]|0;if((e|0)!=0?(t[e+20>>2]|0)==(t[(t[17]|0)+((f&65535)<<2)>>2]|0):0){r=e+4|0;if(!(t[r>>2]|0))t[r>>2]=a;t[e+12>>2]=a;t[11]=0;f=74;}else f=74;break}case 123:{f=t[15]|0;a=t[8]|0;e=f;do{if((s[f>>1]|0)==41&(a|0)!=0?(t[a+4>>2]|0)==(f|0):0){r=t[9]|0;t[8]=r;if(!r){t[4]=0;break}else {t[r+28>>2]=0;break}}}while(0);r=s[292]|0;f=r&65535;i[le+f>>0]=i[591]|0;i[591]=0;a=t[17]|0;s[292]=r+1<<16>>16;t[a+(f<<2)>>2]=e;f=74;break}case 125:{e=s[292]|0;if(!(e<<16>>16)){f=49;break e}a=e+-1<<16>>16;s[292]=a;r=s[293]|0;if(e<<16>>16!=r<<16>>16)if(r<<16>>16!=-1&(a&65535)<(r&65535)){f=53;break e}else {f=74;break r}else {a=t[16]|0;f=(s[291]|0)+-1<<16>>16;s[291]=f;s[293]=s[a+((f&65535)<<1)>>1]|0;h();f=74;break r}}case 39:{d(39);f=74;break}case 34:{d(34);f=74;break}case 47:switch(s[e+4>>1]|0){case 47:{G();break r}case 42:{p(1);break r}default:{r=t[15]|0;a=s[r>>1]|0;a:do{if(!(x(a)|0)){switch(a<<16>>16){case 41:if(L(t[(t[17]|0)+(c[292]<<2)>>2]|0)|0){f=71;break a}else {f=68;break a}case 125:break;default:{f=68;break a}}e=c[292]|0;if(!(y(t[(t[17]|0)+(e<<2)>>2]|0)|0)?(i[le+e>>0]|0)==0:0)f=68;else f=71;}else switch(a<<16>>16){case 46:if(((s[r+-2>>1]|0)+-48&65535)<10){f=68;break a}else {f=71;break a}case 43:if((s[r+-2>>1]|0)==43){f=68;break a}else {f=71;break a}case 45:if((s[r+-2>>1]|0)==45){f=68;break a}else {f=71;break a}default:{f=71;break a}}}while(0);a:do{if((f|0)==68){f=0;if(!(o(r)|0)){switch(a<<16>>16){case 0:{f=71;break a}case 47:break;default:{e=1;break a}}if(!(i[590]|0))e=1;else f=71;}else f=71;}}while(0);if((f|0)==71){I();e=0;}i[590]=e;f=74;break r}}case 96:{h();f=74;break}default:f=74;}}while(0);if((f|0)==74){f=0;t[15]=t[18];}e=t[18]|0;}if((f|0)==36){Y();e=0;break}else if((f|0)==49){Y();e=0;break}else if((f|0)==53){Y();e=0;break}else if((f|0)==75){e=(s[293]|0)==-1&(s[292]|0)==0&(i[588]|0)==0;break}}}while(0);ke=oe;return e|0}function u(){var e=0,r=0,a=0,f=0,c=0,ke=0;c=t[18]|0;ke=c+12|0;t[18]=ke;r=w(1)|0;e=t[18]|0;if(!((e|0)==(ke|0)?!(S(r)|0):0))f=3;e:do{if((f|0)==3){r:do{switch(r<<16>>16){case 100:{J(e,e+14|0);break e}case 97:{t[18]=e+10;w(1)|0;e=t[18]|0;f=6;break}case 102:{f=6;break}case 99:{if(z(e+2|0,108,97,115,115)|0?(a=e+10|0,F(s[a>>1]|0)|0):0){t[18]=a;c=w(1)|0;ke=t[18]|0;H(c)|0;J(ke,t[18]|0);t[18]=(t[18]|0)+-2;break e}e=e+4|0;t[18]=e;f=13;break}case 108:case 118:{f=13;break}case 123:{t[18]=e+2;e=w(1)|0;a=t[18]|0;while(1){if(_(e)|0){d(e);e=(t[18]|0)+2|0;t[18]=e;}else {H(e)|0;e=t[18]|0;}w(1)|0;e=g(a,e)|0;if(e<<16>>16==44){t[18]=(t[18]|0)+2;e=w(1)|0;}r=a;a=t[18]|0;if(e<<16>>16==125){f=32;break}if((a|0)==(r|0)){f=29;break}if(a>>>0>(t[19]|0)>>>0){f=31;break}}if((f|0)==29){Y();break e}else if((f|0)==31){Y();break e}else if((f|0)==32){t[18]=a+2;f=34;break r}break}case 42:{t[18]=e+2;w(1)|0;f=t[18]|0;g(f,f)|0;f=34;break}default:{}}}while(0);if((f|0)==6){t[18]=e+16;e=w(1)|0;if(e<<16>>16==42){t[18]=(t[18]|0)+2;e=w(1)|0;}ke=t[18]|0;H(e)|0;J(ke,t[18]|0);t[18]=(t[18]|0)+-2;break}else if((f|0)==13){e=e+4|0;t[18]=e;i[589]=0;r:while(1){t[18]=e+2;ke=w(1)|0;e=t[18]|0;switch((H(ke)|0)<<16>>16){case 91:case 123:{f=15;break r}default:{}}r=t[18]|0;if((r|0)==(e|0))break e;J(e,r);switch((w(1)|0)<<16>>16){case 61:{f=19;break r}case 44:break;default:{f=20;break r}}e=t[18]|0;}if((f|0)==15){t[18]=(t[18]|0)+-2;break}else if((f|0)==19){t[18]=(t[18]|0)+-2;break}else if((f|0)==20){t[18]=(t[18]|0)+-2;break}}else if((f|0)==34)r=w(1)|0;e=t[18]|0;if(r<<16>>16==102?K(e+2|0,114,111,109)|0:0){t[18]=e+8;l(c,w(1)|0);break}t[18]=e+-2;}}while(0);return}function k(){var e=0,r=0,a=0,f=0,c=0;c=t[18]|0;r=c+12|0;t[18]=r;e:do{switch((w(1)|0)<<16>>16){case 40:{r=t[17]|0;a=s[292]|0;s[292]=a+1<<16>>16;t[r+((a&65535)<<2)>>2]=c;if((s[t[15]>>1]|0)!=46){v(c,(t[18]|0)+2|0,0,c);t[11]=t[8];t[18]=(t[18]|0)+2;switch((w(1)|0)<<16>>16){case 39:{d(39);break}case 34:{d(34);break}default:{t[18]=(t[18]|0)+-2;break e}}t[18]=(t[18]|0)+2;switch((w(1)|0)<<16>>16){case 44:{c=t[18]|0;t[(t[8]|0)+4>>2]=c;t[18]=c+2;w(1)|0;c=t[18]|0;a=t[8]|0;t[a+16>>2]=c;i[a+24>>0]=1;t[18]=c+-2;break e}case 41:{s[292]=(s[292]|0)+-1<<16>>16;a=t[18]|0;c=t[8]|0;t[c+4>>2]=a;t[c+12>>2]=a;i[c+24>>0]=1;break e}default:{t[18]=(t[18]|0)+-2;break e}}}break}case 46:{t[18]=(t[18]|0)+2;if(((w(1)|0)<<16>>16==109?(e=t[18]|0,K(e+2|0,101,116,97)|0):0)?(s[t[15]>>1]|0)!=46:0)v(c,c,e+8|0,2);break}case 42:case 39:case 34:{f=16;break}case 123:{e=t[18]|0;if(s[292]|0){t[18]=e+-2;break e}while(1){if(e>>>0>=(t[19]|0)>>>0)break;e=w(1)|0;if(!(_(e)|0)){if(e<<16>>16==125){f=31;break}}else d(e);e=(t[18]|0)+2|0;t[18]=e;}if((f|0)==31)t[18]=(t[18]|0)+2;w(1)|0;e=t[18]|0;if(!(z(e,102,114,111,109)|0)){Y();break e}t[18]=e+8;e=w(1)|0;if(_(e)|0){l(c,e);break e}else {Y();break e}}default:if((t[18]|0)!=(r|0))f=16;}}while(0);do{if((f|0)==16){if(s[292]|0){t[18]=(t[18]|0)+-2;break}e=t[19]|0;r=t[18]|0;while(1){if(r>>>0>=e>>>0){f=23;break}a=s[r>>1]|0;if(_(a)|0){f=21;break}f=r+2|0;t[18]=f;r=f;}if((f|0)==21){l(c,a);break}else if((f|0)==23){Y();break}}}while(0);return}function l(e,r){e=e|0;r=r|0;var a=0,i=0;a=(t[18]|0)+2|0;switch(r<<16>>16){case 39:{d(39);i=5;break}case 34:{d(34);i=5;break}default:Y();}do{if((i|0)==5){v(e,a,t[18]|0,1);t[18]=(t[18]|0)+2;i=(w(0)|0)<<16>>16==97;r=t[18]|0;if(i?B(r+2|0,115,115,101,114,116)|0:0){t[18]=r+12;if((w(1)|0)<<16>>16!=123){t[18]=r;break}e=t[18]|0;a=e;e:while(1){t[18]=a+2;a=w(1)|0;switch(a<<16>>16){case 39:{d(39);t[18]=(t[18]|0)+2;a=w(1)|0;break}case 34:{d(34);t[18]=(t[18]|0)+2;a=w(1)|0;break}default:a=H(a)|0;}if(a<<16>>16!=58){i=16;break}t[18]=(t[18]|0)+2;switch((w(1)|0)<<16>>16){case 39:{d(39);break}case 34:{d(34);break}default:{i=20;break e}}t[18]=(t[18]|0)+2;switch((w(1)|0)<<16>>16){case 125:{i=25;break e}case 44:break;default:{i=24;break e}}t[18]=(t[18]|0)+2;if((w(1)|0)<<16>>16==125){i=25;break}a=t[18]|0;}if((i|0)==16){t[18]=r;break}else if((i|0)==20){t[18]=r;break}else if((i|0)==24){t[18]=r;break}else if((i|0)==25){i=t[8]|0;t[i+16>>2]=e;t[i+12>>2]=(t[18]|0)+2;break}}t[18]=r+-2;}}while(0);return}function o(e){e=e|0;e:do{switch(s[e>>1]|0){case 100:switch(s[e+-2>>1]|0){case 105:{e=q(e+-4|0,118,111)|0;break e}case 108:{e=P(e+-4|0,121,105,101)|0;break e}default:{e=0;break e}}case 101:{switch(s[e+-2>>1]|0){case 115:break;case 116:{e=E(e+-4|0,100,101,108,101)|0;break e}default:{e=0;break e}}switch(s[e+-4>>1]|0){case 108:{e=D(e+-6|0,101)|0;break e}case 97:{e=D(e+-6|0,99)|0;break e}default:{e=0;break e}}}case 102:{if((s[e+-2>>1]|0)==111?(s[e+-4>>1]|0)==101:0)switch(s[e+-6>>1]|0){case 99:{e=O(e+-8|0,105,110,115,116,97,110)|0;break e}case 112:{e=q(e+-8|0,116,121)|0;break e}default:{e=0;break e}}else e=0;break}case 110:{e=e+-2|0;if(D(e,105)|0)e=1;else e=$(e,114,101,116,117,114)|0;break}case 111:{e=D(e+-2|0,100)|0;break}case 114:{e=m(e+-2|0,100,101,98,117,103,103,101)|0;break}case 116:{e=E(e+-2|0,97,119,97,105)|0;break}case 119:switch(s[e+-2>>1]|0){case 101:{e=D(e+-4|0,110)|0;break e}case 111:{e=P(e+-4|0,116,104,114)|0;break e}default:{e=0;break e}}default:e=0;}}while(0);return e|0}function h(){var e=0,r=0,a=0;r=t[19]|0;a=t[18]|0;e:while(1){e=a+2|0;if(a>>>0>=r>>>0){r=8;break}switch(s[e>>1]|0){case 96:{r=9;break e}case 36:{if((s[a+4>>1]|0)==123){r=6;break e}break}case 92:{e=a+4|0;break}default:{}}a=e;}if((r|0)==6){t[18]=a+4;e=s[293]|0;r=t[16]|0;a=s[291]|0;s[291]=a+1<<16>>16;s[r+((a&65535)<<1)>>1]=e;a=(s[292]|0)+1<<16>>16;s[292]=a;s[293]=a;}else if((r|0)==8){t[18]=e;Y();}else if((r|0)==9)t[18]=e;return}function w(e){e=e|0;var r=0,a=0,i=0;a=t[18]|0;e:do{r=s[a>>1]|0;r:do{if(r<<16>>16!=47)if(e)if(Z(r)|0)break;else break e;else if(Q(r)|0)break;else break e;else switch(s[a+2>>1]|0){case 47:{G();break r}case 42:{p(e);break r}default:{r=47;break e}}}while(0);i=t[18]|0;a=i+2|0;t[18]=a;}while(i>>>0<(t[19]|0)>>>0);return r|0}function d(e){e=e|0;var r=0,a=0,i=0,f=0;f=t[19]|0;r=t[18]|0;while(1){i=r+2|0;if(r>>>0>=f>>>0){r=9;break}a=s[i>>1]|0;if(a<<16>>16==e<<16>>16){r=10;break}if(a<<16>>16==92){a=r+4|0;if((s[a>>1]|0)==13){r=r+6|0;r=(s[r>>1]|0)==10?r:a;}else r=a;}else if(ae(a)|0){r=9;break}else r=i;}if((r|0)==9){t[18]=i;Y();}else if((r|0)==10)t[18]=i;return}function v(e,r,a,s){e=e|0;r=r|0;a=a|0;s=s|0;var f=0,c=0;f=t[13]|0;t[13]=f+32;c=t[8]|0;t[((c|0)==0?16:c+28|0)>>2]=f;t[9]=c;t[8]=f;t[f+8>>2]=e;do{if(2!=(s|0))if(1==(s|0)){t[f+12>>2]=a+2;break}else {t[f+12>>2]=t[3];break}else t[f+12>>2]=a;}while(0);t[f>>2]=r;t[f+4>>2]=a;t[f+16>>2]=0;t[f+20>>2]=s;i[f+24>>0]=1==(s|0)&1;t[f+28>>2]=0;return}function A(){var e=0,r=0,a=0;a=t[19]|0;r=t[18]|0;e:while(1){e=r+2|0;if(r>>>0>=a>>>0){r=6;break}switch(s[e>>1]|0){case 13:case 10:{r=6;break e}case 93:{r=7;break e}case 92:{e=r+4|0;break}default:{}}r=e;}if((r|0)==6){t[18]=e;Y();e=0;}else if((r|0)==7){t[18]=e;e=93;}return e|0}function C(e,r,a,i,t,f,c,ke){e=e|0;r=r|0;a=a|0;i=i|0;t=t|0;f=f|0;c=c|0;ke=ke|0;if((((((s[e+12>>1]|0)==ke<<16>>16?(s[e+10>>1]|0)==c<<16>>16:0)?(s[e+8>>1]|0)==f<<16>>16:0)?(s[e+6>>1]|0)==t<<16>>16:0)?(s[e+4>>1]|0)==i<<16>>16:0)?(s[e+2>>1]|0)==a<<16>>16:0)r=(s[e>>1]|0)==r<<16>>16;else r=0;return r|0}function y(e){e=e|0;switch(s[e>>1]|0){case 62:{e=(s[e+-2>>1]|0)==61;break}case 41:case 59:{e=1;break}case 104:{e=E(e+-2|0,99,97,116,99)|0;break}case 121:{e=O(e+-2|0,102,105,110,97,108,108)|0;break}case 101:{e=P(e+-2|0,101,108,115)|0;break}default:e=0;}return e|0}function g(e,r){e=e|0;r=r|0;var a=0,i=0;a=t[18]|0;i=s[a>>1]|0;if(i<<16>>16==97){t[18]=a+4;a=w(1)|0;e=t[18]|0;if(_(a)|0){d(a);r=(t[18]|0)+2|0;t[18]=r;}else {H(a)|0;r=t[18]|0;}i=w(1)|0;a=t[18]|0;}if((a|0)!=(e|0))J(e,r);return i|0}function I(){var e=0,r=0,a=0;e:while(1){e=t[18]|0;r=e+2|0;t[18]=r;if(e>>>0>=(t[19]|0)>>>0){a=7;break}switch(s[r>>1]|0){case 13:case 10:{a=7;break e}case 47:break e;case 91:{A()|0;break}case 92:{t[18]=e+4;break}default:{}}}if((a|0)==7)Y();return}function p(e){e=e|0;var r=0,a=0,i=0,f=0,c=0;f=(t[18]|0)+2|0;t[18]=f;a=t[19]|0;while(1){r=f+2|0;if(f>>>0>=a>>>0)break;i=s[r>>1]|0;if(!e?ae(i)|0:0)break;if(i<<16>>16==42?(s[f+4>>1]|0)==47:0){c=8;break}f=r;}if((c|0)==8){t[18]=r;r=f+4|0;}t[18]=r;return}function U(e,r,a,i,t,f,c){e=e|0;r=r|0;a=a|0;i=i|0;t=t|0;f=f|0;c=c|0;if(((((s[e+10>>1]|0)==c<<16>>16?(s[e+8>>1]|0)==f<<16>>16:0)?(s[e+6>>1]|0)==t<<16>>16:0)?(s[e+4>>1]|0)==i<<16>>16:0)?(s[e+2>>1]|0)==a<<16>>16:0)r=(s[e>>1]|0)==r<<16>>16;else r=0;return r|0}function m(e,r,a,i,f,c,ke,le){e=e|0;r=r|0;a=a|0;i=i|0;f=f|0;c=c|0;ke=ke|0;le=le|0;var oe=0,we=0;we=e+-12|0;oe=t[3]|0;if(we>>>0>=oe>>>0?C(we,r,a,i,f,c,ke,le)|0:0)if((we|0)==(oe|0))oe=1;else oe=F(s[e+-14>>1]|0)|0;else oe=0;return oe|0}function S(e){e=e|0;e:do{switch(e<<16>>16){case 38:case 37:case 33:{e=1;break}default:if((e&-8)<<16>>16==40|(e+-58&65535)<6)e=1;else {switch(e<<16>>16){case 91:case 93:case 94:{e=1;break e}default:{}}e=(e+-123&65535)<4;}}}while(0);return e|0}function x(e){e=e|0;e:do{switch(e<<16>>16){case 38:case 37:case 33:break;default:if(!((e+-58&65535)<6|(e+-40&65535)<7&e<<16>>16!=41)){switch(e<<16>>16){case 91:case 94:break e;default:{}}return e<<16>>16!=125&(e+-123&65535)<4|0}}}while(0);return 1}function O(e,r,a,i,f,c,ke){e=e|0;r=r|0;a=a|0;i=i|0;f=f|0;c=c|0;ke=ke|0;var le=0,oe=0;oe=e+-10|0;le=t[3]|0;if(oe>>>0>=le>>>0?U(oe,r,a,i,f,c,ke)|0:0)if((oe|0)==(le|0))le=1;else le=F(s[e+-12>>1]|0)|0;else le=0;return le|0}function $(e,r,a,i,f,c){e=e|0;r=r|0;a=a|0;i=i|0;f=f|0;c=c|0;var ke=0,le=0;le=e+-8|0;ke=t[3]|0;if(le>>>0>=ke>>>0?B(le,r,a,i,f,c)|0:0)if((le|0)==(ke|0))ke=1;else ke=F(s[e+-10>>1]|0)|0;else ke=0;return ke|0}function j(e){e=e|0;var r=0,a=0,i=0,f=0;a=ke;ke=ke+16|0;i=a;t[i>>2]=0;t[12]=e;r=t[3]|0;f=r+(e<<1)|0;e=f+2|0;s[f>>1]=0;t[i>>2]=e;t[13]=e;t[4]=0;t[8]=0;t[6]=0;t[5]=0;t[10]=0;t[7]=0;ke=a;return r|0}function B(e,r,a,i,t,f){e=e|0;r=r|0;a=a|0;i=i|0;t=t|0;f=f|0;if((((s[e+8>>1]|0)==f<<16>>16?(s[e+6>>1]|0)==t<<16>>16:0)?(s[e+4>>1]|0)==i<<16>>16:0)?(s[e+2>>1]|0)==a<<16>>16:0)r=(s[e>>1]|0)==r<<16>>16;else r=0;return r|0}function E(e,r,a,i,f){e=e|0;r=r|0;a=a|0;i=i|0;f=f|0;var c=0,ke=0;ke=e+-6|0;c=t[3]|0;if(ke>>>0>=c>>>0?z(ke,r,a,i,f)|0:0)if((ke|0)==(c|0))c=1;else c=F(s[e+-8>>1]|0)|0;else c=0;return c|0}function P(e,r,a,i){e=e|0;r=r|0;a=a|0;i=i|0;var f=0,c=0;c=e+-4|0;f=t[3]|0;if(c>>>0>=f>>>0?K(c,r,a,i)|0:0)if((c|0)==(f|0))f=1;else f=F(s[e+-6>>1]|0)|0;else f=0;return f|0}function q(e,r,a){e=e|0;r=r|0;a=a|0;var i=0,f=0;f=e+-2|0;i=t[3]|0;if(f>>>0>=i>>>0?N(f,r,a)|0:0)if((f|0)==(i|0))i=1;else i=F(s[e+-4>>1]|0)|0;else i=0;return i|0}function z(e,r,a,i,t){e=e|0;r=r|0;a=a|0;i=i|0;t=t|0;if(((s[e+6>>1]|0)==t<<16>>16?(s[e+4>>1]|0)==i<<16>>16:0)?(s[e+2>>1]|0)==a<<16>>16:0)r=(s[e>>1]|0)==r<<16>>16;else r=0;return r|0}function D(e,r){e=e|0;r=r|0;var a=0;a=t[3]|0;if(a>>>0<=e>>>0?(s[e>>1]|0)==r<<16>>16:0)if((a|0)==(e|0))a=1;else a=F(s[e+-2>>1]|0)|0;else a=0;return a|0}function F(e){e=e|0;e:do{if((e+-9&65535)<5)e=1;else {switch(e<<16>>16){case 32:case 160:{e=1;break e}default:{}}e=e<<16>>16!=46&(S(e)|0);}}while(0);return e|0}function G(){var e=0,r=0,a=0;e=t[19]|0;a=t[18]|0;e:while(1){r=a+2|0;if(a>>>0>=e>>>0)break;switch(s[r>>1]|0){case 13:case 10:break e;default:a=r;}}t[18]=r;return}function H(e){e=e|0;while(1){if(Z(e)|0)break;if(S(e)|0)break;e=(t[18]|0)+2|0;t[18]=e;e=s[e>>1]|0;if(!(e<<16>>16)){e=0;break}}return e|0}function J(e,r){e=e|0;r=r|0;var a=0,i=0;a=t[13]|0;t[13]=a+12;i=t[10]|0;t[((i|0)==0?20:i+8|0)>>2]=a;t[10]=a;t[a>>2]=e;t[a+4>>2]=r;t[a+8>>2]=0;return}function K(e,r,a,i){e=e|0;r=r|0;a=a|0;i=i|0;if((s[e+4>>1]|0)==i<<16>>16?(s[e+2>>1]|0)==a<<16>>16:0)r=(s[e>>1]|0)==r<<16>>16;else r=0;return r|0}function L(e){e=e|0;if(!($(e,119,104,105,108,101)|0)?!(P(e,102,111,114)|0):0)e=q(e,105,102)|0;else e=1;return e|0}function M(){var e=0;e=t[(t[6]|0)+20>>2]|0;switch(e|0){case 1:{e=-1;break}case 2:{e=-2;break}default:e=e-(t[3]|0)>>1;}return e|0}function N(e,r,a){e=e|0;r=r|0;a=a|0;if((s[e+2>>1]|0)==a<<16>>16)r=(s[e>>1]|0)==r<<16>>16;else r=0;return r|0}function Q(e){e=e|0;switch(e<<16>>16){case 160:case 32:case 12:case 11:case 9:{e=1;break}default:e=0;}return e|0}function R(e){e=e|0;if((t[3]|0)==(e|0))e=1;else e=F(s[e+-2>>1]|0)|0;return e|0}function T(){var e=0;e=t[(t[6]|0)+16>>2]|0;if(!e)e=-1;else e=e-(t[3]|0)>>1;return e|0}function V(){var e=0;e=t[6]|0;e=t[((e|0)==0?16:e+28|0)>>2]|0;t[6]=e;return (e|0)!=0|0}function W(){var e=0;e=t[7]|0;e=t[((e|0)==0?20:e+8|0)>>2]|0;t[7]=e;return (e|0)!=0|0}function X(e){e=e|0;var r=0;r=ke;ke=ke+e|0;ke=ke+15&-16;return r|0}function Y(){i[588]=1;t[14]=(t[18]|0)-(t[3]|0)>>1;t[18]=(t[19]|0)+2;return}function Z(e){e=e|0;return (e|128)<<16>>16==160|(e+-9&65535)<5|0}function _(e){e=e|0;return e<<16>>16==39|e<<16>>16==34|0}function ee(){return (t[(t[6]|0)+12>>2]|0)-(t[3]|0)>>1|0}function re(){return (t[(t[6]|0)+8>>2]|0)-(t[3]|0)>>1|0}function ae(e){e=e|0;return e<<16>>16==13|e<<16>>16==10|0}function ie(){return (t[(t[6]|0)+4>>2]|0)-(t[3]|0)>>1|0}function se(){return (t[(t[7]|0)+4>>2]|0)-(t[3]|0)>>1|0}function te(){return (t[t[6]>>2]|0)-(t[3]|0)>>1|0}function fe(){return (t[t[7]>>2]|0)-(t[3]|0)>>1|0}function ce(){return f[(t[6]|0)+24>>0]|0|0}function ne(e){e=e|0;t[3]=e;return}function be(){return (i[589]|0)!=0|0}function ue(){return t[14]|0}return {ai:T,e:ue,ee:se,es:fe,f:be,id:M,ie:ie,ip:ce,is:te,p:b,re:W,ri:V,sa:j,se:ee,ses:ne,ss:re,sta:X}}({Int8Array:Int8Array,Int16Array:Int16Array,Int32Array:Int32Array,Uint8Array:Uint8Array,Uint16Array:Uint16Array},{},r),a=e.sta(2*i);}const oe=t.length+1;e.ses(a),e.sa(oe-1),(s?b$1:n)(t,new Uint16Array(r,a,oe)),e.p()||(c$1=e.e(),h$1());const we=[],he=[];for(;e.ri();){const r=e.is(),a=e.ie(),i=e.ai(),s=e.id(),f=e.ss(),c=e.se();let ke;e.ip()&&(ke=u$1(-1===s?r:r+1,t.charCodeAt(-1===s?r-1:r))),we.push({n:ke,s:r,e:a,ss:f,se:c,d:s,a:i});}for(;e.re();){const r=e.es(),a=t.charCodeAt(r);he.push(34===a||39===a?u$1(r+1,a):t.slice(e.es(),e.ee()));}return [we,he,!!e.f()]}function n(e,r){const a=e.length;let i=0;for(;i<a;){const a=e.charCodeAt(i);r[i++]=(255&a)<<8|a>>>8;}}function b$1(e,r){const a=e.length;let i=0;for(;i<a;)r[i]=e.charCodeAt(i++);}function u$1(e,r){c$1=e;let a="",i=c$1;for(;;){c$1>=t.length&&h$1();const e=t.charCodeAt(c$1);if(e===r)break;92===e?(a+=t.slice(i,c$1),a+=k$1(),i=c$1):(8232===e||8233===e||o(e)&&h$1(),++c$1);}return a+=t.slice(i,c$1++),a}function k$1(){let e=t.charCodeAt(++c$1);switch(++c$1,e){case 110:return "\n";case 114:return "\r";case 120:return String.fromCharCode(l(2));case 117:return function(){let e;123===t.charCodeAt(c$1)?(++c$1,e=l(t.indexOf("}",c$1)-c$1),++c$1,e>1114111&&h$1()):e=l(4);return e<=65535?String.fromCharCode(e):(e-=65536,String.fromCharCode(55296+(e>>10),56320+(1023&e)))}();case 116:return "\t";case 98:return "\b";case 118:return "\v";case 102:return "\f";case 13:10===t.charCodeAt(c$1)&&++c$1;case 10:return "";case 56:case 57:h$1();default:if(e>=48&&e<=55){let r=t.substr(c$1-1,3).match(/^[0-7]+/)[0],a=parseInt(r,8);return a>255&&(r=r.slice(0,-1),a=parseInt(r,8)),c$1+=r.length-1,e=t.charCodeAt(c$1),"0"===r&&56!==e&&57!==e||h$1(),String.fromCharCode(a)}return o(e)?"":String.fromCharCode(e)}}function l(e){const r=c$1;let a=0,i=0;for(let r=0;r<e;++r,++c$1){let e,s=t.charCodeAt(c$1);if(95!==s){if(s>=97)e=s-97+10;else if(s>=65)e=s-65+10;else {if(!(s>=48&&s<=57))break;e=s-48;}if(e>=16)break;i=s,a=16*a+e;}else 95!==i&&0!==r||h$1(),i=s;}return 95!==i&&c$1-r===e||h$1(),a}function o(e){return 13===e||10===e}function h$1(){throw Object.assign(new Error(`Parse error ${f$1}:${t.slice(0,c$1).split("\n").length}:${c$1-t.lastIndexOf("\n",c$1-1)}`),{idx:c$1})}

let c;if("undefined"!==typeof Deno){const t=Deno.cwd();c=new URL("file://"+("/"===t[0]?"":"/")+t+"/");}else if("undefined"!==typeof process&&process.versions.node)c=new URL("file://"+process.cwd()+"/");else if("undefined"!==typeof document){const t=document.querySelector("base[href]");t?c=new URL(t.href+(t.href.endsWith("/")?"":"/")):"undefined"!==typeof location&&(c=new URL("../",new URL(location.href)));}function importedFrom(t){return t?` imported from ${t}`:""}function isURL(t){try{if("#"===t[0])return false;new URL(t);}catch{return false}return true}function isPlain(t){return !isRelative(t)&&!isURL(t)}function isRelative(t){return t.startsWith("./")||t.startsWith("../")||t.startsWith("/")}class JspmError extends Error{constructor(t,e){super(t);this.jspmError=true;this.code=e;}}function throwInternalError(...t){throw new Error("Internal Error"+(t.length?" "+t.join(", "):""))}const{SemverRange:h}=e$3;const f=["https","http","data","file","ipfs"];async function parseUrlTarget(t,e,s){var r;const i=e.indexOf(":");if(isRelative(e)||-1!==i&&f.includes(e.slice(0,i))){const i=e.indexOf("|");let n;if(-1===i)n=".";else {n=`./${e.slice(i+1)}`;e=e.slice(0,i);}const a=new URL(e+(e.endsWith("/")?"":"/"),s||c);const o=await t.getPackageBase(a.href);const l=(null===(r=o?await t.getPackageConfig(o):null)||void 0===r?void 0:r.name)||a.pathname.split("/").slice(0,-1).pop();if(!l)throw new JspmError(`Unable to determine an alias for target package ${a.href}`);return {alias:l,target:a,subpath:n}}}async function toPackageTarget(t,e,s){const r=await parseUrlTarget(t,e,s);if(r)return r;const i=e.indexOf(":");const n=e.indexOf("@");if(-1!==e.indexOf(":")&&-1!==n&&n<i)throw new Error("Package aliases not yet supported. PRs welcome.");const a=parsePkg(e);if(!a)throw new JspmError(`Invalid package name ${e}`);let o=a.pkgName;const l=a.pkgName.indexOf("@",1);o=-1!==l?a.pkgName.slice(i+1,l):a.pkgName.slice(i+1);return {alias:o,target:newPackageTarget(a.pkgName,s),subpath:a.subpath}}function newPackageTarget(t,e,r){let i,n,a;const o=t.indexOf(":");if(t.startsWith("./")||t.startsWith("../")||t.startsWith("/")||1===o)return new URL(t,e);i=o<1?"npm":t.substr(0,o);if("file"===i)return new URL(t.slice(i.length+1),e);if("https"===i||"http"===i)return new URL(t);const l=t.lastIndexOf("@");if(l>o+1){n=t.slice(o+1,l);const e=t.slice(l+1);a=r||h.isValid(e)?[new h(e)]:e.split("||").map((t=>f$2(t)));}else if(-1===o&&r){n=r;a=h.isValid(t)?[new h(t)]:t.split("||").map((t=>f$2(t)));}else {n=t.slice(o+1);a=[new h("*")];}-1===o&&-1!==n.indexOf("/")&&"@"!==n[0]&&(i="github");const c=n.split("/").length;if(c>2||1===c&&"@"===n[0])throw new JspmError(`Invalid package target ${t}`);return {registry:i,name:n,ranges:a}}function pkgToStr(t){return `${t.registry?t.registry+":":""}${t.name}${t.version?"@"+t.version:""}`}function parsePkg(t){let e=t.indexOf("/");if("@"===t[0]){if(-1===e)return;e=t.indexOf("/",e+1);}return -1===e?{pkgName:t,subpath:"."}:{pkgName:t.slice(0,e),subpath:"."+t.slice(e)}}const u=new Set(["_http_agent","_http_client","_http_common","_http_incoming","_http_outgoing","_http_server","_stream_duplex","_stream_passthrough","_stream_readable","_stream_transform","_stream_wrap","_stream_writable","_tls_common","_tls_wrap","assert","assert/strict","async_hooks","buffer","child_process","cluster","console","constants","crypto","dgram","diagnostics_channel","dns","dns/promises","domain","events","fs","fs/promises","http","http2","https","inspector","module","net","os","path","path/posix","path/win32","perf_hooks","process","punycode","querystring","readline","repl","stream","stream/promises","string_decoder","sys","timers","timers/promises","tls","trace_events","tty","url","util","util/types","v8","vm","wasi","worker_threads","zlib"]);function pkgToUrl$5(t){if("node"!==t.registry)throw new Error("Node a Node.js URL");return "node:"+t.name}function parseUrlPkg$5(t){if(t.startsWith("node:"))return {registry:"node",name:t.slice(5),version:""}}async function getPackageConfig$1(){return null}async function resolveLatestTarget$2(){throw new Error("No version resolution is provided for node:_ builtins")}var p=Object.freeze({__proto__:null,nodeBuiltinSet:u,pkgToUrl:pkgToUrl$5,parseUrlPkg:parseUrlPkg$5,getPackageConfig:getPackageConfig$1,resolveLatestTarget:resolveLatestTarget$2});const d="https://ga.jspm.io/";const g="https://ga.system.jspm.io/";const m="https://api.jspm.io/";const w=3e5;const v=5e3;function pkgToUrl$4(t,e){return ("system"===e?g:d)+pkgToStr(t)+"/"}const y=/^(([a-z]+):)?((?:@[^/\\%@]+\/)?[^./\\%@][^/\\%@]*)@([^\/]+)(\/.*)?$/;function parseUrlPkg$4(t){let e;if(t.startsWith(d))e="default";else {if(!t.startsWith(g))return;e="system";}const[,,s,r,i]=t.slice(("default"===e?d:g).length).match(y)||[];return {pkg:{registry:s,name:r,version:i},layer:e}}let U={};function clearResolveCache(){U={};}async function checkBuildOrError(t,e){const s=pkgToStr(t);const i=await fetch$1(`${d}${s}/package.json`,e);if(i.ok)return true;const n=await fetch$1(`${d}${s}/_error.log`,e);if(n.ok){const e=await n.text();throw new JspmError(`Resolved dependency ${s} with error:\n\n${e}\nPlease post an issue at jspm/project on GitHub, or by following the link below:\n\nhttps://github.com/jspm/project/issues/new?title=CDN%20build%20error%20for%20${encodeURIComponent(t.name+"@"+t.version)}&body=_Reporting%20CDN%20Build%20Error._%0A%0A%3C!--%20%20No%20further%20description%20necessary,%20just%20click%20%22Submit%20new%20issue%22%20--%3E`)}return false}async function ensureBuild(t,e){const s=pkgToStr(t);if(await checkBuildOrError(t,e))return;const i=await fetch$1(`${m}build/${t.name}@${t.version}`,e);if(!i.ok&&403!==i.status){const t=(await i.json()).error;throw new JspmError(`Unable to request the JSPM API for a build of ${s}, with error: ${t}.`)}let n=Date.now();while(true){await new Promise((t=>setTimeout(t,v)));if(await checkBuildOrError(t,e))return;if(Date.now()-n>=w)throw new JspmError(`Timed out waiting for the build of ${s} to be ready on the JSPM CDN. Try again later, or post a JSPM project issue if the issue persists.`)}}async function resolveLatestTarget$1(t,e,s,r){const{registry:i,name:n,range:a}=t;if(a.isExact&&!a.version.tag){const t={registry:i,name:n,version:a.version.toString()};await ensureBuild(t,this.fetchOpts);return t}const o=U[t.registry+":"+t.name]=U[t.registry+":"+t.name]||{latest:null,majors:Object.create(null),minors:Object.create(null),tags:Object.create(null)};if(a.isWildcard){let s=await(o.latest||(o.latest=lookupRange.call(this,i,n,"",e,r)));s instanceof Promise&&(s=await s);if(s){s instanceof Promise&&throwInternalError();this.log("resolve",`${t.registry}:${t.name}@${a} -> WILDCARD ${s.version}${r?" ["+r+"]":""}`);await ensureBuild(s,this.fetchOpts);return s}}else if(a.isExact&&a.version.tag){const s=a.version.tag;let l=await(o.tags[s]||(o.tags[s]=lookupRange.call(this,i,n,s,e,r)));l instanceof Promise&&(l=await l);if(l){l instanceof Promise&&throwInternalError();this.log("resolve",`${t.registry}:${t.name}@${a} -> TAG ${s}${r?" ["+r+"]":""}`);await ensureBuild(l,this.fetchOpts);return l}}else if(a.isMajor){const s=a.version.major;let l=await(o.majors[s]||(o.majors[s]=lookupRange.call(this,i,n,s,e,r)));l instanceof Promise&&(l=await l);if(l){l instanceof Promise&&throwInternalError();this.log("resolve",`${t.registry}:${t.name}@${a} -> MAJOR ${l.version}${r?" ["+r+"]":""}`);await ensureBuild(l,this.fetchOpts);return l}}else if(a.isStable){const s=`${a.version.major}.${a.version.minor}`;let l=await(o.minors[s]||(o.minors[s]=lookupRange.call(this,i,n,s,e,r)));l instanceof Promise&&(l=await l);if(l){l instanceof Promise&&throwInternalError();this.log("resolve",`${t.registry}:${t.name}@${a} -> MINOR ${l.version}${r?" ["+r+"]":""}`);await ensureBuild(l,this.fetchOpts);return l}}return null}function pkgToLookupUrl(t,e=false){return `${d}${t.registry}:${t.name}${t.version?"@"+t.version:e?"@":""}`}async function lookupRange(t,e,s,i,n){const a=await fetch$1(pkgToLookupUrl({registry:t,name:e,version:s},i),this.fetchOpts);switch(a.status){case 304:case 200:return {registry:t,name:e,version:(await a.text()).trim()};case 404:return null;default:throw new JspmError(`Invalid status code ${a.status} looking up "${t}:${e}" - ${a.statusText}${importedFrom(n)}`)}}var k=Object.freeze({__proto__:null,pkgToUrl:pkgToUrl$4,parseUrlPkg:parseUrlPkg$4,clearResolveCache:clearResolveCache,resolveLatestTarget:resolveLatestTarget$1});const{Semver:b,SemverRange:$}=e$3;function addInstalledRange(t,e,s,r){const i=getInstalledRanges(t,r);for(const t of i)if(t.name===e&&t.pkgUrl===s)return;i.push({name:e,pkgUrl:s,target:r});}function getInstalledRanges(t,e){return t[e.registry+":"+e.name]=t[e.registry+":"+e.name]||[]}function pruneResolutions(t,e){const s={};for(const[r,i]of e){const e=t[i][r];s[i]=s[i]||{};s[i][r]=e;}return s}function getResolution(t,e,s){s.endsWith("/")||throwInternalError(s);t[s]=t[s]||{};return t[s][e]}function stringResolution(t,e){t.endsWith("/")||throwInternalError(t);return e?t.slice(0,-1)+"|"+e:t}function setResolution(t,e,s,r,i){s.endsWith("/")||throwInternalError(s);t[s]=t[s]||{};const n=stringResolution(r,i);if(t[s][e]===n)return false;t[s][e]=n;return true}class Installer{constructor(t,e,s,r){this.installedRanges={};this.installing=false;this.newInstalls=false;this.currentInstall=Promise.resolve();this.added=new Map;this.hasLock=false;this.defaultProvider={provider:"jspm",layer:"default"};this.log=s;this.resolver=r;this.resolutions=e.resolutions||{};this.installBaseUrl=t.href;this.opts=e;let i={};e.lock&&({resolutions:i,exists:this.hasLock}=e.lock);e.defaultProvider&&(this.defaultProvider={provider:e.defaultProvider.split(".")[0],layer:e.defaultProvider.split(".")[1]||"default"});this.providers=e.providers||{};this.installs=i;if(e.stdlib)if(isURL(e.stdlib)||"."===e.stdlib[0]){this.stdlibTarget=new URL(e.stdlib,t);this.stdlibTarget.href.endsWith("/")&&(this.stdlibTarget.pathname=this.stdlibTarget.pathname.slice(0,-1));}else this.stdlibTarget=newPackageTarget(e.stdlib,this.installBaseUrl);}async startInstall(){if(this.installing)return this.currentInstall.then((()=>this.startInstall()));let t;this.installing=true;this.newInstalls=false;this.added=new Map;this.currentInstall=new Promise((e=>{t=async t=>{if(!t){this.installing=false;e();return false}this.installing=false;e();return {pjsonChanged:false,lock:this.installs}};}));return t}async lockInstall(t,e=this.installBaseUrl,s=true){const r=new Set;const visitInstall=async(t,e)=>{if(r.has(t+"##"+e))return;r.add(t+"##"+e);const s=await this.install(t,e);const i=s.split("|")[0]+(-1===s.indexOf("|")?"":"/");const n=await this.resolver.getDepList(i);const a=Object.keys(this.installs[i]||{});await Promise.all([...new Set([...n,...a])].map((t=>visitInstall(t,i))));};await Promise.all(t.map((t=>visitInstall(t,e))));if(s){const t=[...r].map((t=>{const[e,s]=t.split("##");return [e,s]}));this.installs=pruneResolutions(this.installs,t);}}replace(t,e,s){let r;if(t instanceof URL)r=t.href;else {const i=this.getBestMatch(t);if(!i){if(this.installs[e])return false;throw new Error("No installation found to replace.")}r=this.resolver.pkgToUrl(i,s);}let i=false;for(const t of Object.keys(this.installs)){for(const s of Object.keys(this.installs[t]))if(this.installs[t][s]===r){this.installs[t][s]=e;i=true;}if(t===r){this.installs[e]=this.installs[t];delete this.installs[t];i=true;}}return i}async installTarget(t,e,s,r,i,n){if(this.opts.freeze)throw new JspmError(`"${t}" is not installed in the jspm lockfile, imported from ${n}.`,"ERR_NOT_INSTALLED");r&&(s===this.installBaseUrl&&s.startsWith("file:")?this.added.set(t,e):this.log("info",`Package ${t} not declared in package.json dependencies${importedFrom(n)}.`));if(e instanceof URL){this.log("install",`${t} ${s} -> ${e.href}`);const r=e.href+(e.href.endsWith("/")?"":"/");this.newInstalls=setResolution(this.installs,t,s,r,i);return stringResolution(r,i)}let a=this.defaultProvider;for(const t of Object.keys(this.providers))if(e.name.startsWith(t)&&(e.name.length===t.length||"/"===e.name[t.length])){a={provider:this.providers[t],layer:"default"};const e=a.provider.indexOf(".");if(-1!==e){a.layer=a.provider.slice(e+1);a.provider=a.provider.slice(0,e);}break}if(this.opts.freeze){const r=this.getBestMatch(e);if(r){this.log("install",`${t} ${s} -> ${r.registry}:${r.name}@${r.version}`);const n=this.resolver.pkgToUrl(r,a);this.newInstalls=setResolution(this.installs,t,s,n,i);addInstalledRange(this.installedRanges,t,s,e);return stringResolution(n,i)}}const o=await this.resolver.resolveLatestTarget(e,false,a,n);const l=getInstalledRanges(this.installedRanges,e);const c=this.tryUpgradePackagesTo(o,e,l,a);if(c&&!this.opts.latest){c instanceof URL?this.log("install",`${t} ${s} -> ${c.href}`):this.log("install",`${t} ${s} -> ${c.registry}:${c.name}@${c.version}`);const r=c instanceof URL?c.href:this.resolver.pkgToUrl(c,a);this.newInstalls=setResolution(this.installs,t,s,r,i);addInstalledRange(this.installedRanges,t,s,e);return stringResolution(r,i)}this.log("install",`${t} ${s} -> ${o.registry}:${o.name}@${o.version}`);const h=this.resolver.pkgToUrl(o,a);this.newInstalls=setResolution(this.installs,t,s,h,i);addInstalledRange(this.installedRanges,t,s,e);return stringResolution(h,i)}async install(t,e,s=true,r=this.installBaseUrl){var i,n,a,o,l,c;this.installing||throwInternalError("Not installing");if(!this.opts.reset){const s=null===(i=this.installs[e])||void 0===i?void 0:i[t];if(s&&!this.opts.reset)return s}if(this.resolutions[t])return this.installTarget(t,newPackageTarget(this.resolutions[t],this.opts.baseUrl.href,t),e,false,null,r);const h=await this.resolver.getPackageConfig(e)||{};if(s&&u.has(t))return this.installTarget(t,this.stdlibTarget,e,false,"nodelibs/"+t,r);const f=(null===(n=h.dependencies)||void 0===n?void 0:n[t])||(null===(a=h.peerDependencies)||void 0===a?void 0:a[t])||(null===(o=h.optionalDependencies)||void 0===o?void 0:o[t])||e===this.installBaseUrl&&(null===(l=h.devDependencies)||void 0===l?void 0:l[t]);if(f){const s=newPackageTarget(f,e,t);return this.installTarget(t,s,e,false,null,r)}if(null===(c=this.installs[this.installBaseUrl])||void 0===c?void 0:c[t])return this.installs[this.installBaseUrl][t];const p=newPackageTarget("*",e,t);const d=await this.installTarget(t,p,e,true,null,r);return d}getBestMatch(t){let e=null;for(const s of Object.keys(this.installs)){const r=this.resolver.parseUrlPkg(s);r&&this.inRange(r.pkg,t)&&(e=e?-1===b.compare(new b(e.version),r.pkg.version)?r.pkg:e:r.pkg);}return e}inRange(t,e){return t.registry===e.registry&&t.name===e.name&&e.ranges.some((e=>e.has(t.version,true)))}tryUpgradePackagesTo(t,e,s,r){if(this.opts.freeze)return;const i=new b(t.version);let n=true;for(const{target:t}of s)t.ranges.every((t=>!t.has(i)))&&(n=false);if(n)for(const{name:e,pkgUrl:i}of s){const[s,n]=getResolution(this.installs,e,i).split("|");const a=parseUrlPkg$4(s);if(a){const{pkg:{version:a}}=parseUrlPkg$4(s);a!==t.version&&(this.newInstalls=setResolution(this.installs,e,i,this.resolver.pkgToUrl(t,r),n));}else this.newInstalls=setResolution(this.installs,e,i,s,n);}else for(const{name:r,pkgUrl:i}of s){const s=getResolution(this.installs,r,i).split("|")[0];const n=parseUrlPkg$4(s);if(!n)return new URL(s.endsWith("/")?s:s+"/");{const{pkg:{version:r}}=parseUrlPkg$4(s);if(e.ranges.some((t=>t.has(r))))return {registry:t.registry,name:t.name,version:r}}}}}const R="https://cdn.skypack.dev/";function pkgToUrl$3(t){return R+t.name+"@"+t.version+"/"}const P=/^((?:@[^/\\%@]+\/)?[^./\\%@][^/\\%@]*)@([^\/]+)(\/.*)?$/;function parseUrlPkg$3(t){if(!t.startsWith(R))return;const[,e,s]=t.slice(R.length).match(P)||[];return {registry:"npm",name:e,version:s}}var L=Object.freeze({__proto__:null,pkgToUrl:pkgToUrl$3,parseUrlPkg:parseUrlPkg$3,resolveLatestTarget:resolveLatestTarget$1});const T="https://cdn.jsdelivr.net/";function pkgToUrl$2(t){return T+t.registry+"/"+t.name+"@"+t.version+"/"}const j=/^([^\/]+)\/((?:@[^/\\%@]+\/)?[^./\\%@][^/\\%@]*)@([^\/]+)(\/.*)?$/;function parseUrlPkg$2(t){if(!t.startsWith(T))return;const[,e,s,r]=t.slice(T.length).match(j)||[];return {registry:e,name:s,version:r}}var E=Object.freeze({__proto__:null,pkgToUrl:pkgToUrl$2,parseUrlPkg:parseUrlPkg$2,resolveLatestTarget:resolveLatestTarget$1});const x="https://unpkg.com/";function pkgToUrl$1(t){return x+t.name+"@"+t.version+"/"}const S=/^((?:@[^/\\%@]+\/)?[^./\\%@][^/\\%@]*)@([^\/]+)(\/.*)?$/;function parseUrlPkg$1(t){if(!t.startsWith(x))return;const[,e,s]=t.slice(x.length).match(S)||[];return {registry:"npm",name:e,version:s}}var O=Object.freeze({__proto__:null,pkgToUrl:pkgToUrl$1,parseUrlPkg:parseUrlPkg$1,resolveLatestTarget:resolveLatestTarget$1});function pkgToUrl(t){return new URL(t.version+t.name+"/").href}function parseUrlPkg(t){const e=t.lastIndexOf("/node_modules/");if(-1===e)return;const s=t.slice(0,e+14);const r=t.slice(e+14).split("/");const i="@"===r[0][0]?r[0]+"/"+r[1]:r[0];return {registry:"node_modules",name:i,version:s}}async function dirExists(t,e){const s=await fetch$1(t,this.fetchOpts);switch(s.status){case 304:case 200:return true;case 404:return false;default:throw new JspmError(`Invalid status code ${s.status} looking up "${t}" - ${s.statusText}${importedFrom(e)}`)}}async function resolveLatestTarget(t,e,s,r){let i=new URL(`node_modules/${t.name}`,r);const n=new URL(`/node_modules/${t.name}`,r).href;while(!await dirExists.call(this,i)){if(i.href===n)return null;i=new URL(`../../${-1===t.name.indexOf("/")?"":"../"}node_modules/${t.name}`,i);}return {registry:"node_modules",name:t.name,version:i.href.slice(0,-t.name.length)}}var I=Object.freeze({__proto__:null,pkgToUrl:pkgToUrl,parseUrlPkg:parseUrlPkg,resolveLatestTarget:resolveLatestTarget});const D={jsdelivr:E,jspm:k,node:p,nodemodules:I,skypack:L,unpkg:O};function getProvider(t,e=D){const s=e[t];if(s)return s;throw new Error("No "+t+" provider is defined.")}let _,M;const C=globalThis.console;const W={log(){},warn(){},memory(){},assert(){},clear(){},count(){},countReset(){},debug(){},dir(){},dirxml(){},error(){},exception(){},group(){},groupCollapsed(){},groupEnd(){},info(){},table(){},time(){},timeEnd(){},timeLog(){},timeStamp(){},trace(){}};async function createTsAnalysis(t,e){_||([{default:_},{default:{default:M}}]=await Promise.all([import('./index-b112b80d.js').then(function (n) { return n.b; }),import('./index-6d1c39a7.js')]));const s=new Set;const r=new Set;let i=false;globalThis.console=W;try{_.transform(t,{filename:"/"+e,ast:false,sourceMaps:false,inputSourceMap:false,babelrc:false,babelrcRoots:false,configFile:false,highlightCode:false,compact:false,sourceType:"module",parserOpts:{plugins:["jsx"],errorRecovery:true},presets:[[M,{onlyRemoveTypeImports:true}]],plugins:[({types:t})=>({visitor:{ExportAllDeclaration(t){s.add(t.node.source.value);},ExportNamedDeclaration(t){t.node.source&&s.add(t.node.source.value);},ImportDeclaration(t){s.add(t.node.source.value);},Import(t){r.add(buildDynamicString$1(t.parentPath.get("arguments.0").node,e,true));},MetaProperty(e){t.isIdentifier(e.node.meta,{name:"import"})&&t.isIdentifier(e.node.property,{name:"meta"})&&(i=true);}}})]});}finally{globalThis.console=C;}return {deps:[...s],dynamicDeps:[...r],cjsLazyDeps:null,size:t.length,format:"typescript"}}function buildDynamicString$1(t,e,s=false,r=false){if("StringLiteral"===t.type)return t.value;if("TemplateLiteral"===t.type){let i="";for(let n=0;n<t.quasis.length;n++){const a=t.quasis[n].value.cooked;if(a.length){i+=a;r=false;}const o=t.expressions[n];if(o){const t=buildDynamicString$1(o,e,s,r);if(t.length){r=t.endsWith("*");i+=t;}}}return i}if("BinaryExpression"===t.type&&"+"===t.operator){const i=buildDynamicString$1(t.left,e,s,r);i.length&&(r=i.endsWith("*"));const n=buildDynamicString$1(t.right,e,s,r);return i+n}if(s&&"Identifier"===t.type){if("__dirname"===t.name)return ".";if("__filename"===t.name)return "./"+e}return r?"":"*"}let A;async function createCjsAnalysis(t,e,s){A||({default:A}=await import('./index-b112b80d.js').then(function (n) { return n.b; }));const r=new Set;const i=new Set;A.transform(e,{ast:false,sourceMaps:false,inputSourceMap:false,babelrc:false,babelrcRoots:false,configFile:false,highlightCode:false,compact:false,sourceType:"script",parserOpts:{allowReturnOutsideFunction:true,errorRecovery:true},plugins:[({types:t})=>({visitor:{Program(t,e){e.functionDepth=0;},CallExpression(e,n){if(t.isIdentifier(e.node.callee,{name:"require"})||t.isIdentifier(e.node.callee.object,{name:"require"})&&t.isIdentifier(e.node.callee.property,{name:"resolve"})||t.isMemberExpression(e.node.callee)&&t.isIdentifier(e.node.callee.object,{name:"module"})&&t.isIdentifier(e.node.callee.property,{name:"require"})){const t=buildDynamicString(e.get("arguments.0").node,s);r.add(t);n.functionDepth>0&&i.add(t);}},Scope:{enter(e,s){t.isFunction(e.scope.block)&&s.functionDepth++;},exit(e,s){t.isFunction(e.scope.block)&&s.functionDepth--;}}}})]});return {deps:[...r],dynamicDeps:t.filter((t=>t.n)).map((t=>t.n)),cjsLazyDeps:[...i],size:e.length,format:"commonjs"}}function buildDynamicString(t,e,s=false,r=false){if("StringLiteral"===t.type)return t.value;if("TemplateLiteral"===t.type){let i="";for(let n=0;n<t.quasis.length;n++){const a=t.quasis[n].value.cooked;if(a.length){i+=a;r=false;}const o=t.expressions[n];if(o){const t=buildDynamicString(o,e,s,r);if(t.length){r=t.endsWith("*");i+=t;}}}return i}if("BinaryExpression"===t.type&&"+"===t.operator){const i=buildDynamicString(t.left,e,s,r);i.length&&(r=i.endsWith("*"));const n=buildDynamicString(t.right,e,s,r);return i+n}if("Identifier"===t.type){if("__dirname"===t.name)return ".";if("__filename"===t.name)return "./"+e}return r?"":"*"}function createEsmAnalysis(t,e,s){if(!t.length&&N.test(e))return createSystemAnalysis(e,t);const r=[];const i=[];for(const s of t)if(-1!==s.d){if(s.d>=0){const t=e.slice(s.s,s.e);if(t.startsWith('"')||t.startsWith("'"))try{i.push(JSON.parse('"'+t.slice(1,-1)+'"'));}catch(t){console.warn("TODO: Dynamic import custom expression tracing.");}}}else r.push(e.slice(s.s,s.e));const n=e.length;return {deps:r,dynamicDeps:i,cjsLazyDeps:null,size:n,format:"esm"}}const N=/^\s*(\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*)*\s*System\s*\.\s*register\s*\(\s*(\[[^\]]*\])\s*,\s*\(?function\s*\(\s*([^\),\s]+\s*(,\s*([^\),\s]+)\s*)?\s*)?\)/;function createSystemAnalysis(t,e,s){const[,,,r,,,i]=t.match(N)||[];if(!r)return createEsmAnalysis(e,t);const n=JSON.parse(r.replace(/'/g,'"'));const a=[];if(i){const e=`${i}.import(`;let s=-1;while(-1!==(s=t.indexOf(e,s+1))){const r=s+e.length+1;const i=t[s+e.length];if('"'===i||"'"===i){const n=t.indexOf(i,s+e.length+1);if(-1!==n)try{a.push(JSON.parse('"'+t.slice(r,n)+'"'));continue}catch(t){}}console.warn("TODO: Dynamic import custom expression tracing.");}}const o=t.length;return {deps:n,dynamicDeps:a,cjsLazyDeps:null,size:o,format:"system"}}let z,J;class Resolver{constructor(t,e,s=false){this.pcfgPromises=Object.create(null);this.pcfgs=Object.create(null);this.preserveSymlinks=false;this.providers=D;this.log=t;this.fetchOpts=e;this.preserveSymlinks=s;}addCustomProvider(t,e){if(!e.pkgToUrl)throw new Error('Custom provider "'+t+'" must define a "pkgToUrl" method.');if(!e.parseUrlPkg)throw new Error('Custom provider "'+t+'" must define a "parseUrlPkg" method.');if(!e.resolveLatestTarget)throw new Error('Custom provider "'+t+'" must define a "resolveLatestTarget" method.');this.providers=Object.assign({},this.providers,{[t]:e});}parseUrlPkg(t){for(const e of Object.keys(this.providers)){const s=this.providers[e];const r=s.parseUrlPkg.call(this,t);if(r)return {pkg:"pkg"in r?r.pkg:r,source:{provider:e,layer:"layer"in r?r.layer:"default"}}}return null}pkgToUrl(t,{provider:e,layer:s}){return getProvider(e,this.providers).pkgToUrl.call(this,t,s)}async getPackageBase(t){const e=this.parseUrlPkg(t);if(e)return this.pkgToUrl(e.pkg,e.source);let s;try{s=new URL("./",t);}catch{return t}const r=new URL("/",s).href;do{let e;if(e=await this.checkPjson(s.href))return new URL(".",e).href;if(s.href===r)return new URL("./",t).href}while(s=new URL("../",s))}async getPackageConfig(t){if(!t.startsWith("file:")&&!t.startsWith("http:")&&!t.startsWith("https:")&&!t.startsWith("ipfs:"))return null;if(!t.endsWith("/"))throw new Error(`Internal Error: Package URL must end in "/". Got ${t}`);let e=this.pcfgs[t];if(e)return e;this.pcfgPromises[t]||(this.pcfgPromises[t]=(async()=>{var e,s;const i=this.parseUrlPkg(t);if(i){const s=await(null===(e=getProvider(i.source.provider,this.providers).getPackageConfig)||void 0===e?void 0:e.call(this,t));if(void 0!==s){this.pcfgs[t]=s;return}}const n=await fetch$1(`${t}package.json`,this.fetchOpts);switch(n.status){case 200:case 304:break;case 401:case 403:case 404:case 406:this.pcfgs[t]=null;return;default:throw new JspmError(`Invalid status code ${n.status} reading package config for ${t}. ${n.statusText}`)}if(n.headers&&!(null===(s=n.headers.get("Content-Type"))||void 0===s?void 0:s.match(/^application\/json(;|$)/)))this.pcfgs[t]=null;else try{this.pcfgs[t]=await n.json();}catch(e){this.pcfgs[t]=null;}})());await this.pcfgPromises[t];return this.pcfgs[t]}async getDepList(t,e=false){const s=await this.getPackageConfig(t);return s?[...new Set([Object.keys(s.dependencies||{}),Object.keys(e&&s.devDependencies||{}),Object.keys(s.peerDependencies||{}),Object.keys(s.optionalDependencies||{}),Object.keys(s.imports||{})].flat())]:[]}async checkPjson(t){return null!==await this.getPackageConfig(t)&&t}async exists(t){const e=await fetch$1(t,this.fetchOpts);switch(e.status){case 200:case 304:return true;case 404:case 406:return false;default:throw new JspmError(`Invalid status code ${e.status} loading ${t}. ${e.statusText}`)}}async resolveLatestTarget(t,e,{provider:s,layer:r},i){let n;for(const e of t.ranges.sort(t.ranges[0].constructor.compare))n?e.gt(n)&&!n.contains(e)&&(n=e):n=e;const a={registry:t.registry,name:t.name,range:n};const o=await getProvider(s,this.providers).resolveLatestTarget.call(this,a,e,r,i);if(o)return o;throw new JspmError(`Unable to resolve package ${a.registry}:${a.name} to "${a.range}"${importedFrom(i)}`)}async wasCommonJS(t){var e;const s=await this.getPackageBase(t);if(!s)return false;const r=await this.getPackageConfig(s);if(!r)return false;const i="./"+t.slice(s.length);return !!(null===(e=null===r||void 0===r?void 0:r.exports)||void 0===e?void 0:e[i+"!cjs"])}async realPath(t){if(!t.startsWith("file:")||this.preserveSymlinks)return t;let e=false;t=t.replace(/%3a/i,(()=>{e=true;return ":"}));z||([{realpath:z},{pathToFileURL:J}]=await Promise.all([import('./fs-c3aa15ef.js').then(function (n) { return n.h; }),import('./url-b4256e70.js')]));const s=J(await new Promise(((e,s)=>z(new URL(t),((t,r)=>t?s(t):e(r)))))).href;return e?s.replace(":","%3a"):s}async finalizeResolve(t,e,s,r,i){e&&t.endsWith("/")&&(t=t.slice(0,-1));e&&(t=await(async()=>{if(await this.exists(t+"/package.json")){const n=await this.getPackageConfig(t)||{};return s.includes("browser")&&"string"===typeof n.browser?this.finalizeResolve(await legacyMainResolve.call(this,n.browser,new URL(t)),e,s,r,i):s.includes("module")&&"string"===typeof n.module?this.finalizeResolve(await legacyMainResolve.call(this,n.module,new URL(t)),e,s,r,i):"string"===typeof n.main?this.finalizeResolve(await legacyMainResolve.call(this,n.main,new URL(t)),e,s,r,i):this.finalizeResolve(await legacyMainResolve.call(this,null,new URL(t)),e,s,r,i)}return await this.exists(t+"/index.js")?t+"/index.js":await this.exists(t+"/index.json")?t+"/index.json":await this.exists(t+"/index.node")?t+"/index.node":await this.exists(t)?t:await this.exists(t+".js")?t+".js":await this.exists(t+".json")?t+".json":await this.exists(t+".node")?t+".node":t})());if(s.includes("browser")){i=i||await this.getPackageBase(t);if(t.startsWith(i)){const n=await this.getPackageConfig(i);if(n&&"object"===typeof n.browser&&null!==n.browser){const a="./"+t.slice(i.length);if(n.browser[a]){const o=n.browser[a];if(false===o)throw new Error(`TODO: Empty browser map for ${a} in ${t}`);if(!o.startsWith("./"))throw new Error(`TODO: External browser map for ${a} to ${o} in ${t}`);return await this.finalizeResolve(i+o.slice(2),e,s,r,i)}}}}if(t.startsWith("node:")){const n=await r.installTarget(t.slice(5),r.stdlibTarget,i,false,"nodelibs/"+t.slice(5),i);let[a,o]=n.split("|");a.endsWith("/")||(a+="/");o=o.length?"./"+o:".";return this.finalizeResolve(await this.resolveExport(a,o,s,e,t,r,new URL(i)),e,s,r,a)}return t}async resolveExport(t,e,s,r,i,a,o){const l=await this.getPackageConfig(t)||{};function throwExportNotDefined(){throw new JspmError(`No '${e}' exports subpath defined in ${t} resolving ${i}${importedFrom(o)}.`,"MODULE_NOT_FOUND")}if(void 0===l.exports||null===l.exports)return "."===e||r&&"./"===e?s.includes("browser")&&"string"===typeof l.browser?this.finalizeResolve(await legacyMainResolve.call(this,l.browser,new URL(t),i,t),r,s,a,t):s.includes("module")&&"string"===typeof l.module?this.finalizeResolve(await legacyMainResolve.call(this,l.module,new URL(t),i,t),r,s,a,t):"string"===typeof l.main?this.finalizeResolve(await legacyMainResolve.call(this,l.main,new URL(t),i,t),r,s,a,t):this.finalizeResolve(await legacyMainResolve.call(this,null,new URL(t),i,t),r,s,a,t):this.finalizeResolve(new URL(e,new URL(t)).href,r,s,a,t);{function allDotKeys(t){for(let e in t)if("."!==e[0])return false;return true}if("string"===typeof l.exports){if("."===e)return this.finalizeResolve(new URL(l.exports,t).href,r,s,a,t);throwExportNotDefined();}else if(allDotKeys(l.exports)){const i=getMapMatch(e,l.exports);if(i){const n=resolvePackageTarget(l.exports[i],t,s,e.slice(i.length-(i.endsWith("*")?1:0)));null===n&&throwExportNotDefined();return this.finalizeResolve(n,r,s,a,t)}throwExportNotDefined();}else {if("."===e)return this.finalizeResolve(resolvePackageTarget(l.exports,t,s,""),r,s,a,t);throwExportNotDefined();}}}async analyze(t,e,s,i,n=true){var a,o;const c=await fetch$1(t,this.fetchOpts);switch(c.status){case 200:case 304:break;case 404:throw new JspmError(`Module not found: ${t}${importedFrom(e)}`,"MODULE_NOT_FOUND");default:throw new JspmError(`Invalid status code ${c.status} loading ${t}. ${c.statusText}`)}let h=await c.text();try{if(t.endsWith(".ts")||t.endsWith(".tsx")||t.endsWith(".jsx"))return await createTsAnalysis(h,t);if(t.endsWith(".json"))try{JSON.parse(h);return {deps:[],dynamicDeps:[],cjsLazyDeps:null,size:h.length,format:"json"}}catch{}const[e,r]=parse(h);if(e.every((t=>t.d>0))&&!r.length&&t.startsWith("file:"))if(i){if(!(t.endsWith(".mjs")||t.endsWith(".js")&&"module"===(null===(a=await this.getPackageConfig(await this.getPackageBase(t)))||void 0===a?void 0:a.type)))return createCjsAnalysis(e,h,t)}else if(t.endsWith(".cjs")||t.endsWith(".js")&&"module"!==(null===(o=await this.getPackageConfig(await this.getPackageBase(t)))||void 0===o?void 0:o.type))return createCjsAnalysis(e,h,t);return s?createSystemAnalysis(h,e,t):createEsmAnalysis(e,h,t)}catch(r){if(!r.message||!r.message.startsWith("Parse error @:"))throw r;if(n)try{return this.analyze(t,e,s,i,false)}catch{}if(r.message&&r.message.startsWith("Parse error @:")){const[e]=r.message.split("\n",1);const s=e.slice(14);let[i,n]=s.split(":");const a=h.split("\n");let o="";i>1&&(o+="\n  "+a[i-2]);o+="\n> "+a[i-1];o+="\n  "+" ".repeat(n-1)+"^";a.length>1&&(o+="\n  "+a[i]);throw new JspmError(`${o}\n\nError parsing ${t}:${s}`)}throw r}}}function resolvePackageTarget(t,e,s,r,i){if("string"===typeof t){if(""===r)return new URL(t,e).href;if(-1!==t.indexOf("*"))return new URL(t.replace(/\*/g,r),e).href;if(t.endsWith("/"))return new URL(t+r,e).href;throw new Error("Expected pattern or path export")}if("object"!==typeof t||null===t||Array.isArray(t)){if(Array.isArray(t))for(const i of t)return resolvePackageTarget(i,e,s,r)}else for(const i in t)if("default"===i||s.includes(i)){const n=resolvePackageTarget(t[i],e,s,r);if(n)return n}return null}async function legacyMainResolve(t,e,s,r){let i;if(t){if(await this.exists(i=new URL(`./${t}/index.js`,e).href))return i;if(await this.exists(i=new URL(`./${t}/index.json`,e).href))return i;if(await this.exists(i=new URL(`./${t}/index.node`,e).href))return i;if(await this.exists(i=new URL(`./${t}`,e).href))return i;if(await this.exists(i=new URL(`./${t}.js`,e).href))return i;if(await this.exists(i=new URL(`./${t}.json`,e).href))return i;if(await this.exists(i=new URL(`./${t}.node`,e).href))return i}else {if(await this.exists(i=new URL("./index.js",e).href))return i;if(await this.exists(i=new URL("./index.json",e).href))return i;if(await this.exists(i=new URL("./index.node",e).href))return i}throw new JspmError(`Unable to resolve ${t?t+" in ":""}${e} resolving ${s}${importedFrom(r)}.`,"MODULE_NOT_FOUND")}class TraceMap{constructor(t,e,s,r){this.env=["browser","development","module"];this.tracedUrls={};this.traces=new Set;this.staticList=new Set;this.dynamicList=new Set;this.log=s;this.resolver=r;this.mapBase=t;this.opts=e;this.opts.env&&(this.env=this.opts.env);e.inputMap?this.map=e.inputMap instanceof ImportMap?e.inputMap:new ImportMap(t).extend(e.inputMap):this.map=new ImportMap(t);this.installer=new Installer(this.mapBase,this.opts,this.log,this.resolver);}clearLists(){this.staticList=new Set;this.dynamicList=new Set;this.tracedUrls={};this.traces=new Set;}replace(t,e,s){return this.installer.replace(t,e,s)}async visit(t,e,s=new Set){if(s.has(t))return;s.add(t);const r=this.tracedUrls[t];if(r){for(const t of Object.keys(r.deps))-1===t.indexOf("*")&&await this.visit(r.deps[t],e,s);await e(t,r);}}checkTypes(){let t=false,e=false;for(const s of [...this.staticList,...this.dynamicList]){const r=this.tracedUrls[s];"system"===r.format?t=true:e=true;}return {system:t,esm:e}}async startInstall(){const t=await this.installer.startInstall();return async e=>{if(!e){t(false);return false}if(!this.opts.fullMap){const t={};do{this.installer.newInstalls=false;await Promise.all([...this.traces].map((async e=>{var s,r;const[i,n]=e.split("##");try{const a=await this.trace(i,new URL(n),(null===(r=null===(s=this.tracedUrls)||void 0===s?void 0:s[n])||void 0===r?void 0:r.wasCJS)?["require",...this.env]:["import",...this.env]);a&&(t[e]=a);}catch(t){throw t}})));}while(this.installer.newInstalls);let e=this.staticList;const s=new Set;const depVisitor=async(r,i)=>{var n,a,o,l,c,h,f,u,p;e.add(r);const d=await this.resolver.getPackageBase(r);for(const e of i.dynamicDeps){if(-1!==e.indexOf("*"))continue;const i=t[e+"##"+r];if(isPlain(e)){const t=null===(n=this.map.scopes[d])||void 0===n?void 0:n[e];(!t||t!==i&&(null===(o=null===(a=this.tracedUrls)||void 0===a?void 0:a[r])||void 0===o?void 0:o.wasCJS))&&this.map.set(e,i,d);}s.add(i);}for(const e of i.deps){if(-1!==e.indexOf("*"))continue;const s=t[e+"##"+r];if(isPlain(e)){const t=null===(l=this.map.scopes[d])||void 0===l?void 0:l[e];(!t||t!==s&&(null===(h=null===(c=this.tracedUrls)||void 0===c?void 0:c[r])||void 0===h?void 0:h.wasCJS))&&this.map.set(e,s,d);}}for(const e of i.cjsLazyDeps){if(-1!==e.indexOf("*"))continue;const s=t[e+"##"+r];if(isPlain(e)){const t=null===(f=this.map.scopes[d])||void 0===f?void 0:f[e];(!t||t!==s&&(null===(p=null===(u=this.tracedUrls)||void 0===u?void 0:u[r])||void 0===p?void 0:p.wasCJS))&&this.map.set(e,s,d);}}};const r=new Set;for(const e of this.traces){const s=t[e];if(void 0===s)continue;const[i,n]=e.split("##");isPlain(i)&&n===this.mapBase.href&&this.map.set(i,s);await this.visit(s,depVisitor,r);}e=this.dynamicList;for(const t of s)await this.visit(t,depVisitor,r);}return t(true)}}async add(t,e,s=true){const r=await this.installer.installTarget(t,e,this.mapBase.href,s,null,this.mapBase.href);return r.slice(0,-1)}
/**
     * @returns `resolved` - either a URL `string` pointing to the module or `null` if the specifier should be ignored.
     */
async trace(t,e=this.mapBase,s=["import",...this.env]){var r,i,a,l,c;if(null===(r=this.opts.ignore)||void 0===r?void 0:r.includes(t))return null;const h=await this.resolver.getPackageBase(e.href);h||throwInternalError();const f="commonjs"===(null===(i=this.tracedUrls[e.href])||void 0===i?void 0:i.format);this.traces.add(t+"##"+e.href);if(!isPlain(t)){let r=new URL(t,e);if("file:"!==r.protocol&&"https:"!==r.protocol&&"http:"!==r.protocol&&"node:"!==r.protocol&&"data:"!==r.protocol)throw new JspmError(`Found unexpected protocol ${r.protocol}${importedFrom(e)}`);const i=r.href;const n=await this.resolver.realPath(await this.resolver.finalizeResolve(i,f,s,this.installer,h));if(n!==i){this.map.set(i.endsWith("/")?i.slice(0,-1):i,n,h);r=new URL(n);}this.log("trace",`${t} ${e.href} -> ${r}`);await this.traceUrl(r.href,e,s);return r.href}const u=parsePkg(t);if(!u)throw new JspmError(`Invalid package name ${t}`);const{pkgName:p,subpath:d}=u;const g=getScopeMatches(e,this.map.scopes,this.map.baseUrl);const m=g.filter((([,t])=>t.startsWith(h)));if(m.length)for(const[r]of m){const i=getMapMatch(t,this.map.scopes[r]);if(i){const n=await this.resolver.realPath(new URL(this.map.scopes[r][i]+t.slice(i.length),this.map.baseUrl).href);this.log("trace",`${t} ${e.href} -> ${n}`);await this.traceUrl(n,e,s);return n}}const w=g.find((([,t])=>t===h));if(w){const r=this.map.scopes[w[0]];const i=getMapMatch(t,r);const a=i?await this.resolver.realPath(new URL(r[i]+t.slice(i.length),this.map.baseUrl).href):null;if(a){this.log("trace",`${t} ${e.href} -> ${a}`);await this.traceUrl(a,e,s);return a}}const v=getMapMatch(t,this.map.imports);const y=v?await this.resolver.realPath(new URL(this.map.imports[v]+t.slice(v.length),this.map.baseUrl).href):null;if(y){this.log("trace",`${t} ${e.href} -> ${y}`);await this.traceUrl(y,e,s);return y}const U=await this.resolver.getPackageConfig(h)||{};if(U.exports&&U.name===p){const r=await this.resolver.realPath(await this.resolver.resolveExport(h,d,s,f,t,this.installer,e));this.log("trace",`${t} ${e.href} -> ${r}`);await this.traceUrl(r,e,s);return r}if(U.imports&&"#"===p[0]){const r=getMapMatch(t,U.imports);if(!r)throw new JspmError(`No '${t}' import defined in ${h}${importedFrom(e)}.`);const i=await this.resolver.realPath(resolvePackageTarget(U.imports[r],h,s,t.slice(r.length),this.installer));this.map.set(r,i,h);this.log("trace",`${t} ${e.href} -> ${i}`);await this.traceUrl(i,e,s);return i}const k=this.opts.freeze?null===(l=null===(a=this.installer)||void 0===a?void 0:a.installs[h])||void 0===l?void 0:l[p]:await(null===(c=this.installer)||void 0===c?void 0:c.install(p,h,"./"!==d,e.href));if(k){let[r,i]=k.split("|");i&&!r.endsWith("/")&&(r+="/");const n=i?"./"+i+d.slice(1):d;const a=await this.resolver.realPath(await this.resolver.resolveExport(r,n,s,f,t,this.installer,e));this.log("trace",`${t} ${e.href} -> ${a}`);await this.traceUrl(a,e,s);return a}throw new JspmError(`No resolution in map for ${t}${importedFrom(e)}`)}async traceUrl(t,e,s){var r;if(t in this.tracedUrls)return;const i=this.tracedUrls[t]={wasCJS:false,deps:[],dynamicDeps:[],cjsLazyDeps:[],hasStaticParent:true,size:NaN,integrity:"",format:void 0};if(t.endsWith("/"))throw new JspmError(`Trailing "/" installs not yet supported installing ${t} for ${e.href}`);const n="commonjs"===(null===(r=this.tracedUrls[e.href])||void 0===r?void 0:r.format);const{deps:a,dynamicDeps:o,cjsLazyDeps:l,size:c,format:h}=await this.resolver.analyze(t,e,this.opts.system,n);i.format=h;i.size=c;const f="commonjs"===h||await this.resolver.wasCommonJS(t);f&&(i.wasCJS=true);f&&s.includes("import")?s=s.map((t=>"import"===t?"require":t)):!f&&s.includes("require")&&(s=s.map((t=>"require"===t?"import":t)));let u=[...a];if(o.length&&!this.opts.static)for(const t of o)u.includes(t)||u.push(t);if(l&&!this.opts.static)for(const t of l)u.includes(t)||u.push(t);const p=new URL(t);await Promise.all(u.map((async e=>{if(-1!==e.indexOf("*")){this.log("todo","Handle wildcard trace "+e+" in "+t);return}const r=await this.trace(e,p,s);if(null!==r){a.includes(e)&&!i.deps.includes(e)&&i.deps.push(e);o.includes(e)&&!i.dynamicDeps.includes(e)&&i.dynamicDeps.push(e);l&&l.includes(e)&&!i.cjsLazyDeps.includes(e)&&i.cjsLazyDeps.push(e);}})));}}function createLogger(){let t;let e=new Promise((e=>t=e));let s=[];const logStream=async function*(){while(true){while(s.length)yield s.shift();await e;}};function log(r,i){if(s.length)s.push({type:r,message:i});else {s=[{type:r,message:i}];const n=t;e=new Promise((e=>t=e));n();}}return {log:log,logStream:logStream}}var B,F,q;const H="win32"===(null===(B=globalThis.process)||void 0===B?void 0:B.platform);H?Object.keys(null===(F=globalThis.process)||void 0===F?void 0:F.env).find((t=>Boolean(t.match(/^PATH$/i))))||"Path":"PATH";"win32"===(null===(q=globalThis.process)||void 0===q?void 0:q.platform)?";":":";const G={tab:"  ",newline:H?"\r\n":"\n",trailingNewline:H?"\r\n":"\n",indent:"",quote:'"'};function detectNewline(t){let e=t.match(/\r?\n|\r(?!\n)/);return e?e[0]:H?"\r\n":"\n"}function detectIndent$1(t,e){let s;let r=t.split(e);for(const t of r){const e=t.match(/^\s*[^\s]/);e&&(void 0===s||e.length<s.length)&&(s=e[0].slice(0,-1));}r=r.map((t=>t.slice(s.length)));let i=r.map((t=>{var e;return (null===(e=t.match(/^[ \t]*/))||void 0===e?void 0:e[0])||""}))||[];let n=new Map;let a=0;i.forEach((t=>{let e=Math.abs(t.length-a);0!==e&&n.set(e,(n.get(e)||0)+1);a=t.length;}));let o=0;for(const t of n.keys())(!o||n.get(t)>=n.get(o))&&(o=t);let l=new Map;i.forEach((t=>{let e=t.substr(t.length-o);l.set(e,(l.get(e)||0)+1);}));let c="";for(const[t,e]of l)(!c||e>l.get(c))&&(c=t);r.length<5&&r.reduce(((t,e)=>t+e.length),0)<100&&(c="  ");return {indent:s||"",tab:c}}function detectStyle(t){let e=Object.assign({},G);e.newline=detectNewline(t);let{indent:s,tab:r}=detectIndent$1(t,e.newline);e.indent=s;e.tab=r;let i=t.match(/"|'/);i&&(e.quote=i[0]);e.trailingNewline=t&&t.match(new RegExp(e.newline+"$"))?e.newline:"";return e}function parseStyled(t,e){t.startsWith("\ufeff")&&(t=t.substr(1));let s=detectStyle(t);try{return {json:JSON.parse(t),style:s}}catch(t){throw new JspmError("Error parsing JSON file"+(e?" "+e:""))}}let K,V;const Q=["link","base"];function parseHtml(t,e=["script","link","base"]){var s;const r=[];K=t;V=0;let i={tagName:void 0,start:-1,end:-1,attributes:[],innerStart:-1,innerEnd:-1};while(V<K.length){while(60!==K.charCodeAt(V++))if(V===K.length)return r;const t=V;V=t;const n=null===(s=readTagName())||void 0===s?void 0:s.toLowerCase();if("!--"===n){while(45!==K.charCodeAt(V)||45!==K.charCodeAt(V+1)||62!==K.charCodeAt(V+2))if(++V===K.length)return r;V+=3;}else {if(void 0===n)return r;if(e.includes(n)){i.tagName=n;i.start=V-n.length-2;const t=i.attributes;let e;while(e=scanAttr())t.push(e);let s=Q.includes(n);47===K.charCodeAt(V-2)&&62===K.charCodeAt(V-1)&&(s=true);if(s)i.end=V;else {i.innerStart=V;while(true){while(60!==K.charCodeAt(V++))if(V===K.length)return r;const t=readTagName();if(void 0===t)return r;if("/script"===t){i.innerEnd=V-8;while(scanAttr());i.end=V;break}}}r.push(i);i={tagName:void 0,start:-1,end:-1,attributes:[],innerStart:-1,innerEnd:-1};}else while(scanAttr());}}return r}function readTagName(){let t=V;let e;while(!isWs(e=K.charCodeAt(V++))&&62!==e)if(V===K.length)return null;return K.slice(t,62===e?--V:V-1)}function scanAttr(){let t;while(isWs(t=K.charCodeAt(V)))if(++V===K.length)return null;if(62===t||47===t&&62===(t=K.charCodeAt(++V))){V++;return null}const e=V;while(!isWs(t=K.charCodeAt(V++))&&61!==t){if(V===K.length)return null;if(62===t)return e+2===V&&47===K.charCodeAt(e)?null:{nameStart:e,nameEnd:--V,valueStart:-1,valueEnd:-1}}const s=V-1;if(61!==t){while(isWs(t=K.charCodeAt(V))&&61!==t){if(++V===K.length)return null;if(62===t)return null}if(61!==t)return {nameStart:e,nameEnd:s,valueStart:-1,valueEnd:-1}}while(isWs(t=K.charCodeAt(V++))){if(V===K.length)return null;if(62===t)return null}if(34===t){const t=V;while(34!==K.charCodeAt(V++))if(V===K.length)return null;return {nameStart:e,nameEnd:s,valueStart:t,valueEnd:V-1}}if(39===t){const t=V;while(39!==K.charCodeAt(V++))if(V===K.length)return null;return {nameStart:e,nameEnd:s,valueStart:t,valueEnd:V-1}}{const r=V-1;V++;while(!isWs(t=K.charCodeAt(V))&&62!==t)if(++V===K.length)return null;return {nameStart:e,nameEnd:s,valueStart:r,valueEnd:V}}}function isWs(t){return 32===t||t<14&&t>8}function getAttr(t,e,s){for(const r of e.attributes)if(t.slice(r.nameStart,r.nameEnd)===s)return t.slice(r.valueStart,r.valueEnd);return null}const X=/(^|\/)(es-module-shims|esms)(\.min)?\.js$/;function toHtmlAttrs(t,e){return Object.fromEntries(e.map((e=>readAttr(t,e))).map((t=>[t.name,t])))}function analyzeHtml(t,e=c){const s={base:e,map:{json:null,style:null,start:-1,end:-1,newlineTab:"\n",newScript:false,attrs:null},staticImports:new Set,dynamicImports:new Set,preloads:[],modules:[],esModuleShims:null};const r=parseHtml(t);for(const i of r)switch(i.tagName){case"base":s.map.json||createInjectionPoint(t,s.map,i);const r=getAttr(t,i,"href");r&&(s.base=new URL(r,e));break;case"script":const n=getAttr(t,i,"type");if("importmap"===n){const{json:r,style:n}=parseStyled(t.slice(i.innerStart,i.innerEnd),e.href+"#importmap");const{start:a,end:o}=i;const l=toHtmlAttrs(t,i.attributes);s.map={json:r,style:n,start:a,end:o,attrs:l,newlineTab:"\n"+detectIndent(t,o),newScript:false};}else if("module"===n){const e=getAttr(t,i,"src");if(e)X.test(e)?s.esModuleShims={start:i.start,end:i.end,attrs:toHtmlAttrs(t,i.attributes)}:s.staticImports.add(isPlain(e)?"./"+e:e);else {const[e]=parse(t.slice(i.innerStart,i.innerEnd))||[];for(const{n:t,d:r}of e)t&&(-1===r?s.staticImports:s.dynamicImports).add(t);}}else if(!n||"javascript"===n){const e=getAttr(t,i,"src");if(e)X.test(e)?s.esModuleShims={start:i.start,end:i.end,attrs:toHtmlAttrs(t,i.attributes)}:s.staticImports.add(e);else {const[e]=parse(t.slice(i.innerStart,i.innerEnd))||[];for(const{n:t,d:r}of e)t&&(-1===r?s.staticImports:s.dynamicImports).add(t);}}s.map.json||createInjectionPoint(t,s.map,i);break;case"link":s.map.json||createInjectionPoint(t,s.map,i);if("modulepreload"===getAttr(t,i,"rel")){const{start:e,end:r}=i;const n=toHtmlAttrs(t,i.attributes);s.preloads.push({start:e,end:r,attrs:n});}}return s}function createInjectionPoint(t,e,s){e.newlineTab="\n"+detectIndent(t,s.start);e.newScript=true;e.attrs=toHtmlAttrs(t,s.attributes);e.start=e.end=s.start;}function readAttr(t,{nameStart:e,nameEnd:s,valueStart:r,valueEnd:i}){return {start:e,end:-1!==i?i:s,quote:-1===r||'"'!==t[r-1]&&"'"!==t[r-1]?"":t[r-1],name:t.slice(e,s),value:-1===r?null:t.slice(r,i)}}function detectIndent(t,e){if(""===t||-1===e)return "";const s=t.lastIndexOf("\n",e);const r=(-1===s?t:t.slice(s,e)).match(/^[ \t]*/);return r?r[0]:""}const Y=/^\s+/;class Replacer{constructor(t){this.offsetTable=[];this.source=t;}replace(t,e,s){const r=findOffset(this.offsetTable,t);const i=findOffset(this.offsetTable,e);this.source=this.source.slice(0,t+r)+s+this.source.slice(e+i);addOffset(this.offsetTable,e,s.length-(e+i-t-r));}remove(t,e,s=false){var r,i,n;this.replace(t,e,"");if(s){"boolean"===typeof s&&(s=Y);const t=this.idx(e);const[a]=null!==(r=this.source.slice(t).match(s))&&void 0!==r?r:[];this.source=this.source.slice(0,t)+this.source.slice(null!==(i=t+(null===a||void 0===a?void 0:a.length))&&void 0!==i?i:0);addOffset(this.offsetTable,e,null!==(n=-(null===a||void 0===a?void 0:a.length))&&void 0!==n?n:0);}}idx(t){return t+findOffset(this.offsetTable,t)}}function addOffset(t,e,s){let r=t.length,i=false;while(r-- >0){const[s]=t[r];if(s<e||s===e&&(i=true))break}i?t.splice(r,1,[e,s+t[r][1]]):t.splice(r+1,0,[e,s]);}function findOffset(t,e){let s=0;for(const[r,i]of t){if(r>e)break;s+=i;}return s}let Z;async function getIntegrity(t,e){Z||({createHash:Z}=await import('./crypto-5aaa8099.js'));const s=await fetch$1(t,e);const i=await s.text();const n=Z("sha384");n.update(i);return "sha384-"+n.digest("base64")}function clearCache(){}class Generator{
/**
     * @param options GeneratorOptions
     *
     * For example:
     *
     * ```js
     * const generator = new Generator({
     *   mapUrl: import.meta.url,
     *   inputMap: {
     *     "imports": {
     *       "react": "https://cdn.skypack.dev/react"
     *     }
     *   },
     *   defaultProvider: 'jspm',
     *   providers: {
     *     '@orgscope': 'nodemodules'
     *   },
     *   customProviders: {},
     *   env: ['production', 'browser'],
     *   cache: false,
     * });
     * ```
     */
constructor({baseUrl:t,mapUrl:e,rootUrl:s,inputMap:r,env:i=["browser","development","module"],defaultProvider:n="jspm",customProviders:a,providers:o={},resolutions:l={},cache:h=true,stdlib:f="@jspm/core",ignore:u=[],ipfsAPI:p}={}){this.finishInstall=null;this.installCnt=0;let d;d="offline"===h?{cache:"force-cache"}:h?{}:{cache:"no-store"};p&&(d.ipfsAPI=p);const{log:g,logStream:m}=createLogger();const w=new Resolver(g,d,true);if(a)for(const t of Object.keys(a))w.addCustomProvider(t,a[t]);this.logStream=m;if(e&&!t){e="string"===typeof e?new URL(e,c):e;try{t=new URL("./",e);}catch{t=new URL(e+"/");}}else t&&!e?e=t:e||t||(t=e=c);this.baseUrl="string"===typeof t?new URL(t,c):t;if(!this.baseUrl.pathname.endsWith("/")){this.baseUrl=new URL(this.baseUrl.href);this.baseUrl.pathname+="/";}this.mapUrl="string"===typeof e?new URL(e,this.baseUrl):e;this.rootUrl="string"===typeof s?new URL(s,this.baseUrl):s||null;if(!this.mapUrl.pathname.endsWith("/"))try{this.mapUrl=new URL("./",this.mapUrl);}catch{this.mapUrl=new URL(this.mapUrl.href+"/");}this.traceMap=new TraceMap(this.mapUrl,{baseUrl:this.baseUrl,stdlib:f,env:i,defaultProvider:n,providers:o,inputMap:r,ignore:u,resolutions:l},g,w);}
/**
     * Trace a module and install all dependencies necessary into the map
     * to support its execution including static and dynamic module imports.
     *
     * @param specifier Import specifier to trace
     * @param parentUrl Parent URL to trace this specifier from
     */async traceInstall(t,e){"string"===typeof e&&(e=new URL(e));let s=false;0===this.installCnt++&&(this.finishInstall=await this.traceMap.startInstall());try{await this.traceMap.trace(t,e||this.baseUrl);}catch(t){s=true;throw t}finally{0===--this.installCnt&&await this.finishInstall(true);if(!s)return {staticDeps:[...this.traceMap.staticList],dynamicDeps:[...this.traceMap.dynamicList]}}}
/**
     * Generate and inject an import map for an HTML file
     *
     * Traces the module scripts of the HTML via traceInstall and install
     * for URL-like specifiers and bare specifiers respectively.
     *
     * Injects the final generated import map returning the injected HTML
     *
     * @param html String
     * @param injectOptions Injection options
     *
     * Injection options are: `htmlUrl`, `preload`, `integrity`, `whitespace`
     * and `esModuleShims`. The default is `{ esModuleShims: true, whitespace: true }`.
     *
     * ES Module shims will be resolved to the latest version against the provider
     *
     * Example:
     *
     * ```js
     *  const outputHtml = await generator.htmlGenerate(`
     *    <!doctype html>
     *    <script type="module">import 'react'<\/script>
     *  `);
     * ```
     *
     * which outputs:
     *
     * ```
     *   <!doctype html>
     *   <script async src="https://ga.jspm.io/npm:es-module-shims@1.4.1/dist/es-module-shims.js"></script>
     *   <script type="importmap">
     *   {...}
     *   </script>
     *   <script type="module">import 'react'</script>
     * ```
     *
     */async htmlGenerate(t,{htmlUrl:s,preload:r=false,integrity:i=false,whitespace:n=true,esModuleShims:a=true}={}){"string"===typeof s&&(s=new URL(s));i&&(r=true);const o=analyzeHtml(t,s);let l=[];await Promise.all([...new Set([...o.staticImports,...o.dynamicImports])].map((async t=>{if(isPlain(t))var{staticDeps:e}=await this.install(t);else var{staticDeps:e}=await this.traceInstall(t,o.base);l=l.concat(e);})));const c=new Replacer(t);let h="";if(a){const t=await this.traceMap.resolver.resolveLatestTarget({name:"es-module-shims",registry:"npm",ranges:[new R$2("*")]},false,this.traceMap.installer.defaultProvider);const s=this.traceMap.resolver.pkgToUrl(t,this.traceMap.installer.defaultProvider)+"dist/es-module-shims.js";h=`<script async src="${s}" crossorigin="anonymous"${i?` integrity="${await getIntegrity(s,this.traceMap.resolver.fetchOpts)}"`:""}><\/script>${o.map.newlineTab}`;}void 0!==a&&o.esModuleShims&&c.remove(o.esModuleShims.start,o.esModuleShims.end,true);let f="";if(r&&l.length){let t=true;for(let e of l){(t||n)&&(f+=o.map.newlineTab);t&&(t=false);f+=i?`<link rel="modulepreload" href="${e}" integrity="${await getIntegrity(e,this.traceMap.resolver.fetchOpts)}" />`:`<link rel="modulepreload" href="${e}" />`;}}if(void 0!==r)for(const t of o.preloads)c.remove(t.start,t.end,true);c.replace(o.map.start,o.map.end,h+'<script type="importmap">'+(n?"\n":"")+JSON.stringify(this.getMap(),null,n?2:0)+(n?o.map.newlineTab:"")+"<\/script>"+f+(o.map.newScript?o.map.newlineTab:""));return c.source}
/**
     * Install a package target into the import map, including all its dependency resolutions via tracing.
     * @param install Package to install
     *
     * For example:
     *
     * ```js
     * // Install a new package into the import map
     * await generator.install('react-dom');
     *
     * // Install a package version and subpath into the import map (installs lit/decorators.js)
     * await generator.install('lit@2/decorators.js');
     *
     * // Install a package version to a custom alias
     * await generator.install({ alias: 'react16', target: 'react@16' });
     *
     * // Install a specific subpath of a package
     * await generator.install({ target: 'lit@2', subpath: './html.js' });
     *
     * // Install an export from a locally located package folder into the map
     * // The package.json is used to determine the exports and dependencies.
     * await generator.install({ alias: 'mypkg', target: './packages/local-pkg', subpath: './feature' });
     * ```
     *
     */async install(t){this.traceMap.clearLists();if(Array.isArray(t))return await Promise.all(t.map((t=>this.install(t)))).then((()=>({staticDeps:[...this.traceMap.staticList],dynamicDeps:[...this.traceMap.dynamicList]})));if(1!==arguments.length)throw new Error("Install takes a single target string or object.");if("string"!==typeof t&&void 0!==t.subpaths){t.subpaths.every((t=>{if("string"!==typeof t||"."!==t&&!t.startsWith("./"))throw new Error(`Install subpath "${t}" must be equal to "." or start with "./".`)}));return await Promise.all(t.subpaths.map((e=>this.install({target:t.target,alias:t.alias,subpath:e})))).then((()=>({staticDeps:[...this.traceMap.staticList],dynamicDeps:[...this.traceMap.dynamicList]})))}let e=false;0===this.installCnt++&&(this.finishInstall=await this.traceMap.startInstall());try{const{alias:s,target:r,subpath:i}=await installToTarget.call(this,t);await this.traceMap.add(s,r);await this.traceMap.trace(s+i.slice(1),this.mapUrl);}catch(t){e=true;throw t}finally{0===--this.installCnt&&await this.finishInstall(true);if(!e)return {staticDeps:[...this.traceMap.staticList],dynamicDeps:[...this.traceMap.dynamicList]}}}
/**
     * Resolve a specifier using the import map.
     *
     * @param specifier Module to resolve
     * @param parentUrl ParentURL of module to resolve
     * @returns Resolved URL string
     */resolve(t,e=this.baseUrl){"string"===typeof e&&(e=new URL(e,this.baseUrl));const s=this.traceMap.map.resolve(t,e);if(null===s)throw new JspmError(`Unable to resolve "${t}" from ${e.href}`,"MODULE_NOT_FOUND");return s}get importMap(){return this.traceMap.map}
/**
     *
     * @param url
     * @returns
     */getAnalysis(t){"string"!==typeof t&&(t=t.href);const e=this.traceMap.tracedUrls[t];if(!e)throw new Error(`The URL ${t} has not been traced by this generator instance.`);return {format:e.format,staticDeps:e.deps,dynamicDeps:e.dynamicDeps,cjsLazyDeps:e.cjsLazyDeps||[]}}getMap(){const t=this.traceMap.map.clone();t.flatten(this.rootUrl?this.rootUrl:this.baseUrl);this.rootUrl&&t.rebase(this.rootUrl.href,true);t.sort();return t.toJSON()}}async function fetch(t,e={}){return fetch$1(t,e)}
/**
 * Get the lookup resolution information for a specific install.
 *
 * @param install The install object
 * @param lookupOptions Provider and cache defaults for lookup
 * @returns The resolved install and exact package { install, resolved }
 */async function lookup(t,{provider:e,cache:s}={}){const r=new Generator({cache:!s,defaultProvider:e});const{target:i,subpath:n,alias:a}=await installToTarget.call(r,t);if(i instanceof URL)throw new Error("URL lookups not supported");const o=await r.traceMap.resolver.resolveLatestTarget(i,true,r.traceMap.installer.defaultProvider);return {install:{target:{registry:i.registry,name:i.name,range:i.ranges.map((t=>t.toString())).join(" || ")},subpath:n,alias:a},resolved:o}}
/**
 * Get the package.json configuration for a specific URL or package.
 *
 * @param pkg Package to lookup configuration for
 * @param lookupOptions Optional provider and cache defaults for lookup
 * @returns Package JSON configuration
 *
 * Example:
 * ```js
 * import { getPackageConfig } from '@jspm/generator';
 *
 * // Supports a resolved package
 * {
 *   const packageJson = await getPackageConfig({ registry: 'npm', name: 'lit-element', version: '2.5.1' });
 * }
 *
 * // Or alternatively provide any URL
 * {
 *   const packageJson = await getPackageConfig('https://ga.jspm.io/npm:lit-element@2.5.1/lit-element.js');
 * }
 * ```
 */async function getPackageConfig(t,{provider:e,cache:s}={}){const r=new Generator({cache:!s,defaultProvider:e});t="object"===typeof t&&"name"in t?r.traceMap.resolver.pkgToUrl(t,r.traceMap.installer.defaultProvider):"string"===typeof t?new URL(t).href:t.href;return r.traceMap.resolver.getPackageConfig(t)}
/**
 * Get the package base URL for the given module URL.
 *
 * @param url module URL
 * @param lookupOptions Optional provider and cache defaults for lookup
 * @returns Base package URL
 *
 * Modules can be remote CDN URLs or local file:/// URLs.
 *
 * All modules in JSPM are resolved as within a package boundary, which is the
 * parent path of the package containing a package.json file.
 *
 * For JSPM CDN this will always be the base of the package as defined by the
 * JSPM CDN provider. For non-provider-defined origins it is always determined
 * by trying to fetch the package.json in each parent path until the root is reached
 * or one is found. On file:/// URLs this exactly matches the Node.js resolution
 * algorithm boundary lookup.
 *
 * This package.json file controls the package name, imports resolution, dependency
 * resolutions and other package information.
 *
 * getPackageBase will return the folder containing the package.json,
 * with a trailing '/'.
 *
 * This URL will either be the root URL of the origin, or it will be a
 * path "pkgBase" such that fetch(`${pkgBase}package.json`) is an existing
 * package.json file.
 *
 * For example:
 *
 * ```js
 *   import { getPackageBase } from '@jspm/generator';
 *   const pkgUrl = await getPackageBase('https://ga.jspm.io/npm:lit-element@2.5.1/lit-element.js');
 *   // Returns: https://ga.jspm.io/npm:lit-element@2.5.1/
 * ```
 */async function getPackageBase(t,{provider:e,cache:s}={}){const r=new Generator({cache:!s,defaultProvider:e});return r.traceMap.resolver.getPackageBase("string"===typeof t?t:t.href)}async function installToTarget(t){"string"===typeof t&&(t={target:t});if("string"!==typeof t.target)throw new Error('All installs require a "target" string.');if(void 0!==t.subpath&&("string"!==typeof t.subpath||"."!==t.subpath&&!t.subpath.startsWith("./")))throw new Error(`Install subpath "${t.subpath}" must be a string equal to "." or starting with "./".${"string"===typeof t.subpath?`\nTry setting the subpath to "./${t.subpath}"`:""}`);const{alias:e,target:s,subpath:r}=await toPackageTarget(this.traceMap.resolver,t.target,this.baseUrl.href);return {alias:t.alias||e,target:s,subpath:t.subpath||r}}

export { ERR_INVALID_OPT_VALUE_ENCODING as $, AssertionError as A, joinGlobs as B, win32 as C, posix as D, ERR_INVALID_ARG_TYPE as E, basename as F, Generator as G, delimiter as H, dirname as I, extname as J, format$1 as K, fromFileUrl as L, isAbsolute as M, join as N, normalize as O, parse$3 as P, relative as Q, resolve as R, SEP as S, sep as T, toFileUrl as U, toNamespacedPath as V, e$2 as W, v$1 as X, notImplemented as Y, assert as Z, ERR_INVALID_CALLBACK as _, getPackageBase as a, EventEmitter as a0, Buffer as a1, intoCallbackAPIWithIntercept as a2, isWindows as a3, promisify as a4, url as a5, _url as a6, format as a7, fileURLToPath as a8, pathToFileURL as a9, decode as aa, Transform as ab, encode as ac, encode$1 as ad, buffer as b, clearCache as c, ERR_INVALID_ARG_VALUE as d, ERR_MISSING_ARGS as e, fetch as f, getPackageConfig as g, ERR_INVALID_RETURN_VALUE as h, inspect as i, ERR_AMBIGUOUS_ARGUMENT as j, assert$1 as k, lookup as l, assertStrictEquals as m, assertNotStrictEquals as n, assertEquals as o, process$1 as p, assertNotEquals as q, assertMatch as r, stripColor as s, assertNotMatch as t, path as u, SEP_PATTERN as v, common as w, globToRegExp as x, isGlob as y, normalizeGlob as z };
