'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function value(src, next) {
  let k;

  if (src && next && typeof src === 'object' && typeof next === 'object') {
    if (Array.isArray(next)) {
      for (k = 0; k < next.length; k++) {
        src[k] = value(src[k], next[k]);
      }
    } else {
      for (k in next) {
        src[k] = value(src[k], next[k]);
      }
    }

    return src;
  }

  return next;
}

function merge(target) {
  let len = arguments.length <= 1 ? 0 : arguments.length - 1;

  for (let i = 0; i < len; i++) {
    target = value(target, i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1]);
  }

  return target;
}

exports.merge = merge;
