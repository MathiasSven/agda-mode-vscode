// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Caml_chrome_debugger = require("bs-platform/lib/js/caml_chrome_debugger.js");
var Buffer$AgdaModeVscode = require("./Buffer.bs.js");

function Impl(Editor) {
  var $$Buffer = Buffer$AgdaModeVscode.Impl(Editor);
  var make = function (param) {
    return {
            activated: false,
            buffer: Curry._1($$Buffer.make, undefined),
            textBeforeActivation: ""
          };
  };
  var activate = function (self, text) {
    self.activated = true;
    self.textBeforeActivation = text;
    
  };
  var init = function (s) {
    return s.substring(0, s.length - 1 | 0);
  };
  var last = function (s) {
    return s.substring(s.length - 1 | 0);
  };
  var determineChange = function (self, input) {
    var inputLength = input.length;
    var bufferSurface = Curry._1($$Buffer.toSurface, self.buffer);
    if (init(input) === self.textBeforeActivation + bufferSurface) {
      return {
              offset: inputLength - 1 | 0,
              insertText: last(input),
              replaceLength: 0
            };
    } else if (input === self.textBeforeActivation || input === self.textBeforeActivation + init(bufferSurface)) {
      return {
              offset: inputLength,
              insertText: "",
              replaceLength: 1
            };
    } else {
      return ;
    }
  };
  var update = function (self, input) {
    var change = determineChange(self, input);
    if (change !== undefined) {
      var match = Curry._3($$Buffer.reflectEditorChange, self.buffer, self.textBeforeActivation.length, change);
      var shouldRewrite = match[1];
      var buffer = match[0];
      if (buffer.translation.further) {
        self.buffer = buffer;
        return /* tuple */[
                self.textBeforeActivation + Curry._1($$Buffer.toSurface, buffer),
                /* Update */Caml_chrome_debugger.variant("Update", 1, [
                    Curry._1($$Buffer.toSequence, buffer),
                    buffer.translation,
                    buffer.candidateIndex
                  ])
              ];
      } else {
        self.buffer = Curry._1($$Buffer.make, undefined);
        self.activated = false;
        if (shouldRewrite !== undefined) {
          return /* tuple */[
                  self.textBeforeActivation + shouldRewrite,
                  /* Deactivate */1
                ];
        } else {
          return /* tuple */[
                  input,
                  /* Deactivate */1
                ];
        }
      }
    }
    self.buffer = Curry._1($$Buffer.make, undefined);
    self.activated = false;
    
  };
  var insertChar = function (self, $$char) {
    return update(self, self.textBeforeActivation + (Curry._1($$Buffer.toSurface, self.buffer) + $$char));
  };
  return {
          $$Buffer: $$Buffer,
          make: make,
          activate: activate,
          init: init,
          last: last,
          determineChange: determineChange,
          update: update,
          insertChar: insertChar
        };
}

exports.Impl = Impl;
/* Buffer-AgdaModeVscode Not a pure module */