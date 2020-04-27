// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var $$Promise = require("reason-promise/lib/js/src/js/promise.js");
var P$AgdaModeVscode = require("../Util/P.bs.js");
var Task$AgdaModeVscode = require("./Task.bs.js");
var State$AgdaModeVscode = require("../State.bs.js");
var Task__Command$AgdaModeVscode = require("./Task__Command.bs.js");

function Impl(Editor) {
  var TaskCommand = Task__Command$AgdaModeVscode.Impl(Editor);
  var Task = Task$AgdaModeVscode.Impl(Editor);
  var State = State$AgdaModeVscode.Impl(Editor);
  var run = function (state, tasks) {
    var runTask = function (task) {
      switch (task.tag | 0) {
        case /* WithState */0 :
            return $$Promise.flatMap(Curry._1(task[0], state), (function (param) {
                          return run(state, param);
                        }));
        case /* DispatchCommand */1 :
            var command = task[0];
            console.log("[ dispatch command ]", command);
            return run(state, Curry._1(TaskCommand.dispatch, command));
        case /* SendRequest */2 :
            console.log("[ send request ]");
            return $$Promise.resolved(undefined);
        
      }
    };
    var runEach = function (param) {
      if (!param) {
        return $$Promise.resolved(undefined);
      }
      var xs = param[1];
      return P$AgdaModeVscode.let_(runTask(param[0]), (function (param) {
                    return P$AgdaModeVscode.let_(runEach(xs), (function (param) {
                                  return $$Promise.resolved(undefined);
                                }));
                  }));
    };
    return runEach(tasks);
  };
  return {
          TaskCommand: TaskCommand,
          Task: Task,
          State: State,
          run: run
        };
}

exports.Impl = Impl;
/* Promise Not a pure module */