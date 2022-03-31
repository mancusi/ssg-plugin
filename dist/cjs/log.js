var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var log_exports = {};
__export(log_exports, {
  default: () => log_default
});
module.exports = __toCommonJS(log_exports);
var import_timing = require("./timing");
var import_ora = __toESM(require("ora"));
var import_chalk = __toESM(require("chalk"));
const logger = {};
logger.timedLog = (opts) => {
  const { startLog } = opts;
  const timer = (0, import_timing.startTimer)();
  const spinner = (0, import_ora.default)(startLog).start();
  return {
    fail: (text) => spinner.fail(addTimingToLog(timer.stop(), text)),
    succeed: (text) => spinner.succeed(addTimingToLog(timer.stop(), text))
  };
};
const addTimingToLog = (prettyPrintedTime, text) => {
  return `${import_chalk.default.grey(`[${prettyPrintedTime}]`)} ${text}`;
};
var log_default = logger;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
