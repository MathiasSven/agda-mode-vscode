// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Belt_Array = require("rescript/lib/js/belt_Array.js");
var Mocha$BsMocha = require("bs-mocha/lib/js/src/Mocha.bs.js");
var Assert$BsMocha = require("bs-mocha/lib/js/src/Assert.bs.js");
var Promise$BsMocha = require("bs-mocha/lib/js/src/Promise.bs.js");
var SourceFile$AgdaModeVscode = require("../../../src/Parser/SourceFile.bs.js");
var Test__Util$AgdaModeVscode = require("../Test__Util.bs.js");

Mocha$BsMocha.describe("when parsing file paths")(undefined, undefined, undefined, (function (param) {
        return Mocha$BsMocha.it("should recognize the file extensions")(undefined, undefined, undefined, (function (param) {
                      Assert$BsMocha.equal(undefined, SourceFile$AgdaModeVscode.FileType.parse("a.agda"), /* Agda */0);
                      Assert$BsMocha.equal(undefined, SourceFile$AgdaModeVscode.FileType.parse("a.lagda"), /* LiterateTeX */1);
                      Assert$BsMocha.equal(undefined, SourceFile$AgdaModeVscode.FileType.parse("a.lagda.tex"), /* LiterateTeX */1);
                      Assert$BsMocha.equal(undefined, SourceFile$AgdaModeVscode.FileType.parse("a.lagda.md"), /* LiterateMarkdown */3);
                      Assert$BsMocha.equal(undefined, SourceFile$AgdaModeVscode.FileType.parse("a.lagda.rst"), /* LiterateRST */2);
                      return Assert$BsMocha.equal(undefined, SourceFile$AgdaModeVscode.FileType.parse("a.lagda.org"), /* LiterateOrg */4);
                    }));
      }));

if (Test__Util$AgdaModeVscode.onUnix) {
  Mocha$BsMocha.describe("when parsing source files (Unix only)")(undefined, undefined, undefined, (function (param) {
          Mocha$BsMocha.describe("Regex.comment")(undefined, undefined, undefined, (function (param) {
                  Mocha$BsMocha.it("should work")(undefined, undefined, undefined, (function (param) {
                          Assert$BsMocha.equal(undefined, "no comment".search(SourceFile$AgdaModeVscode.Regex.comment), -1);
                          Assert$BsMocha.equal(undefined, "no comment\n".search(SourceFile$AgdaModeVscode.Regex.comment), -1);
                          Assert$BsMocha.equal(undefined, "-- comment".search(SourceFile$AgdaModeVscode.Regex.comment), 0);
                          return Assert$BsMocha.equal(undefined, "-- comment with newline\n".search(SourceFile$AgdaModeVscode.Regex.comment), 0);
                        }));
                  return Mocha$BsMocha.it("should work when \"--\" is placed immediately after some text (issue #56)")(undefined, undefined, undefined, (function (param) {
                                Assert$BsMocha.equal(undefined, "a -- comment after some text".search(SourceFile$AgdaModeVscode.Regex.comment), 2);
                                Assert$BsMocha.equal(undefined, "a-- comment placed immediately after some text".search(SourceFile$AgdaModeVscode.Regex.comment), -1);
                                Assert$BsMocha.equal(undefined, "_-- comment placed immediately after name parts".search(SourceFile$AgdaModeVscode.Regex.comment), 1);
                                Assert$BsMocha.equal(undefined, ";-- comment placed immediately after name parts".search(SourceFile$AgdaModeVscode.Regex.comment), 1);
                                Assert$BsMocha.equal(undefined, ".-- comment placed immediately after name parts".search(SourceFile$AgdaModeVscode.Regex.comment), 1);
                                Assert$BsMocha.equal(undefined, "\"-- comment placed immediately after name parts".search(SourceFile$AgdaModeVscode.Regex.comment), 1);
                                Assert$BsMocha.equal(undefined, "(-- comment placed immediately after name parts".search(SourceFile$AgdaModeVscode.Regex.comment), 1);
                                Assert$BsMocha.equal(undefined, ")-- comment placed immediately after name parts".search(SourceFile$AgdaModeVscode.Regex.comment), 1);
                                Assert$BsMocha.equal(undefined, "{-- comment placed immediately after name parts".search(SourceFile$AgdaModeVscode.Regex.comment), 1);
                                Assert$BsMocha.equal(undefined, "}-- comment placed immediately after name parts".search(SourceFile$AgdaModeVscode.Regex.comment), 1);
                                return Assert$BsMocha.equal(undefined, "@-- comment placed immediately after name parts".search(SourceFile$AgdaModeVscode.Regex.comment), 1);
                              }));
                }));
          return Belt_Array.forEach(Test__Util$AgdaModeVscode.Golden.getGoldenFilepathsSync("../../../../test/tests/Parser/SourceFile"), (function (filepath) {
                        return Promise$BsMocha.it("should golden test " + filepath)(undefined, undefined, undefined, (function (param) {
                                      return Test__Util$AgdaModeVscode.Golden.readFile(filepath).then(function (raw) {
                                                  var partial_arg = [
                                                    0,
                                                    1,
                                                    2,
                                                    3,
                                                    4,
                                                    5,
                                                    6,
                                                    7,
                                                    8,
                                                    9
                                                  ];
                                                  return Test__Util$AgdaModeVscode.Golden.compare(Test__Util$AgdaModeVscode.Golden.map(Test__Util$AgdaModeVscode.Golden.map(raw, (function (param) {
                                                                        return SourceFile$AgdaModeVscode.parse(partial_arg, filepath, param);
                                                                      })), (function (param) {
                                                                    return Test__Util$AgdaModeVscode.Strings.serializeWith(SourceFile$AgdaModeVscode.Diff.toString, param);
                                                                  })));
                                                });
                                    }));
                      }));
        }));
}

/*  Not a pure module */
