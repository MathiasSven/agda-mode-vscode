// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var $$Promise = require("reason-promise/lib/js/src/js/promise.bs.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Chan$AgdaModeVscode = require("../Util/Chan.bs.js");
var Task$AgdaModeVscode = require("./Task.bs.js");
var Util$AgdaModeVscode = require("../Util/Util.bs.js");
var State$AgdaModeVscode = require("../State.bs.js");
var Config$AgdaModeVscode = require("../Config.bs.js");
var Parser$AgdaModeVscode = require("../Parser.bs.js");
var Request$AgdaModeVscode = require("../Request.bs.js");
var Connection$AgdaModeVscode = require("../Connection.bs.js");
var Handle__Response$AgdaModeVscode = require("./Handle__Response.bs.js");

function sendAgdaRequest(dispatchCommand, state, request) {
  var match_0 = function (param) {
    
  };
  var match_1 = function (param, param$1) {
    
  };
  var log2 = match_1;
  var displayConnectionError = function (error) {
    var match = Connection$AgdaModeVscode.$$Error.toString(error);
    return Task$AgdaModeVscode.display(state, {
                TAG: 3,
                _0: "Connection Error: " + match[0],
                [Symbol.for("name")]: "Error"
              }, {
                TAG: 0,
                _0: match[1],
                [Symbol.for("name")]: "Plain"
              });
  };
  var deferredLastResponses = [];
  var match = $$Promise.pending(undefined);
  var resolve = match[1];
  var promise = match[0];
  var handle = {
    contents: undefined
  };
  var handler = function (x) {
    if (x.TAG) {
      displayConnectionError(x._0);
      return ;
    }
    var match = x._0;
    if (!match) {
      return $$Promise.get(Util$AgdaModeVscode.oneByOne(Belt_Array.map(deferredLastResponses, (function (param) {
                            return Handle__Response$AgdaModeVscode.handle(state, dispatchCommand, (function (param) {
                                          return sendAgdaRequest(dispatchCommand, state, param);
                                        }), param);
                          }))), (function (param) {
                    return Curry._1(resolve, undefined);
                  }));
    }
    var error = match._0;
    if (error.TAG) {
      var body = Parser$AgdaModeVscode.$$Error.toString(error._0);
      Task$AgdaModeVscode.display(state, {
            TAG: 3,
            _0: "Internal Parse Error",
            [Symbol.for("name")]: "Error"
          }, {
            TAG: 0,
            _0: body,
            [Symbol.for("name")]: "Plain"
          });
      return ;
    }
    var response = error._0;
    if (response.TAG) {
      deferredLastResponses.push(response._1);
      return ;
    }
    Handle__Response$AgdaModeVscode.handle(state, dispatchCommand, (function (param) {
            return sendAgdaRequest(dispatchCommand, state, param);
          }), response._0);
    
  };
  return $$Promise.tap($$Promise.flatMap($$Promise.mapOk(State$AgdaModeVscode.connect(state), (function (connection) {
                        var $$document = state.editor.document;
                        var version = connection.metadata.version;
                        var filepath = Parser$AgdaModeVscode.filepath($$document.fileName);
                        var libraryPath = Config$AgdaModeVscode.getLibraryPath(undefined);
                        var highlightingMethod = Config$AgdaModeVscode.getHighlightingMethod(undefined);
                        var backend = Config$AgdaModeVscode.getBackend(undefined);
                        var encoded = Request$AgdaModeVscode.encode($$document, version, filepath, backend, libraryPath, highlightingMethod, request);
                        Curry._2(log2, "<<<", encoded);
                        Connection$AgdaModeVscode.send(encoded, connection);
                        return connection;
                      })), (function (x) {
                    if (x.TAG) {
                      return $$Promise.flatMap(displayConnectionError(x._0), (function (param) {
                                    return promise;
                                  }));
                    }
                    handle.contents = Chan$AgdaModeVscode.on(x._0.chan, handler);
                    return promise;
                  })), (function (param) {
                return Belt_Option.forEach(handle.contents, (function (f) {
                              return Curry._1(f, undefined);
                            }));
              }));
}

exports.sendAgdaRequest = sendAgdaRequest;
/* Promise Not a pure module */