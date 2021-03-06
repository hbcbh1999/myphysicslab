// Copyright 2017 Erik Neumann.  All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.provide('myphysicslab.lab.util.ConcreteMemoList');

goog.require('goog.array');
goog.require('myphysicslab.lab.util.MemoList');
goog.require('myphysicslab.lab.util.Memorizable');
goog.require('myphysicslab.lab.util.Util');

goog.scope(function() {

var MemoList = myphysicslab.lab.util.MemoList;
var Memorizable = myphysicslab.lab.util.Memorizable;
var Util = myphysicslab.lab.util.Util;

/** Concrete implementation of {@link MemoList}.
* @constructor
* @final
* @struct
* @implements {MemoList}
*/
myphysicslab.lab.util.ConcreteMemoList = function() {
  /**
  * @type {!Array<!Memorizable>}
  * @private
  */
  this.memorizables_ = [];
  /** This flag helps to prevent modification of the list while iterating.
  * @type {boolean}
  * @private
  */
  this.isMemorizing_ = false;
};
var ConcreteMemoList = myphysicslab.lab.util.ConcreteMemoList;

if (!Util.ADVANCED) {
  /** @inheritDoc */
  ConcreteMemoList.prototype.toString = function() {
    return 'ConcreteMemoList{'
        +'memorizables_: ['
        + goog.array.map(this.memorizables_, function(a) { return a.toStringShort(); })
        +']}';
  };

  /** @inheritDoc */
  ConcreteMemoList.prototype.toStringShort = function() {
    return 'ConcreteMemoList{memorizables_.length: '+this.memorizables_.length+'}';
  };
};

/** @inheritDoc */
ConcreteMemoList.prototype.addMemo = function(memorizable) {
  if (this.isMemorizing_) {
    throw new Error('addMemo during memorize');
  }
  if (!goog.array.contains(this.memorizables_, memorizable)) {
    this.memorizables_.push(memorizable);
  }
};

/** @inheritDoc */
ConcreteMemoList.prototype.getMemos = function() {
  return goog.array.clone(this.memorizables_);
};

/** @inheritDoc */
ConcreteMemoList.prototype.memorize = function() {
  try {
    this.isMemorizing_ = true;
    goog.array.forEach(this.memorizables_, function(c) { c.memorize(); });
  } finally {
    this.isMemorizing_ = false;
  }
};

/** @inheritDoc */
ConcreteMemoList.prototype.removeMemo = function(memorizable) {
  if (this.isMemorizing_) {
    throw new Error('removeMemo during memorize');
  }
  goog.array.remove(this.memorizables_, memorizable);
};

}); // goog.scope
