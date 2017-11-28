function MyArray(initialCapacity) {
  if (initialCapacity === undefined) {
    initialCapacity = 3;
  }

  this.elements = new PlainArray(initialCapacity);
  this.size = 0;
}

function grow(newSize, oldElements) {
  let newElements = new PlainArray(newSize);
  for (let i = 0; i < oldElements.length; i++) {
    newElements.set(i, oldElements.get(i));
  }
  return newElements;
}

MyArray.prototype.length = function() {
  return this.size;
};

MyArray.prototype.push = function(value) {
  if (this.size >= this.elements.length) {
    this.elements = grow(this.size + 1, this.elements);
  }
  this.elements.set(this.size, value);
  this.size++;
};

MyArray.prototype.get = function(index) {
  if (index >= this.size || index < 0) {
    return undefined;
  }
  return this.elements.get(index);
};

MyArray.prototype.set = function(index, value) {
  if (index < 0) {
    throw new ReferenceError();
  }
  if (index >= this.elements.length) {
    this.elements = grow(index + 1, this.elements);
    this.size = index + 1;
  }
  if (index >= this.size) {
    this.size = index + 1;
  }
  this.elements.set(index, value);
};

MyArray.of = function() {
  if (arguments) {
    let newArr = new MyArray(arguments.length);
    for (let i = 0; i < arguments.length; i++) {
      newArr.set(i, arguments[i]);
    }
    return newArr;
  }
  return new MyArray(0);
};

MyArray.prototype.pop = function() {
  if (this.size === 0) {
    return undefined;
  }
  this.size--;
  const lastValue = this.elements.get(this.size);
  this.elements.set(this.size, undefined);
  return lastValue;
};

MyArray.prototype.concat = function(other) {
  if (!other || !other.length()) {
    return this;
  }
  const newSize = this.size + other.length();
  let newArray = new MyArray(newSize);
  for (let i = 0; i < newSize; i++) {
    newArray.set(
      i,
      i >= this.size ? other.get(i - this.size) : this.elements.get(i)
    );
  }
  return newArray;
};

MyArray.prototype.indexOf = function(element) {
  if (!element) {
    return -1;
  }
  for (let i = 0; i < this.size; i++) {
    if (element === this.elements.get(i)) {
      return i;
    }
  }
  return -1;
};

MyArray.prototype.lastIndexOf = function(element) {
  if (!element) {
    return -1;
  }
  for (let i = this.size - 1; i >= 0; i--) {
    if (element === this.elements.get(i)) {
      return i;
    }
  }
  return -1;
};

MyArray.prototype.includes = function(element) {
  return this.indexOf(element) !== -1;
};

MyArray.prototype.find = function(fn) {
  if (!fn || typeof fn !== "function") {
    return undefined;
  }
  let currElement = null;
  for (let i = 0; i < this.size; i++) {
    currElement = this.elements.get(i);
    if (fn(currElement)) {
      return currElement;
    }
  }
};

MyArray.prototype.findIndex = function(fn) {
  if (!fn || typeof fn !== "function") {
    return -1;
  }
  let currElement = null;
  for (let i = 0; i < this.size; i++) {
    currElement = this.elements.get(i);
    if (fn(currElement)) {
      return i;
    }
  }
  return -1;
};

MyArray.prototype.equals = function(other) {
  if (!other) {
    return false;
  }
  if (this.size !== other.length()) {
    return false;
  }
  for (let i = 0; i < this.size; i++) {
    if (this.elements.get(i) !== other.get(i)) {
      return false;
    }
  }
  return true;
};

MyArray.prototype.forEach = function(fn) {
  if (!fn || typeof fn !== "function") {
    return;
  }
  for (let i = 0; i < this.size; i++) {
    fn(this.elements.get(i), i);
  }
};

MyArray.prototype.join = function(separator) {
  if (separator === undefined) {
    separator = ",";
  }
  let outputString = "";
  for (let i = 0; i < this.size; i++) {
    if (i === this.size - 1) {
      outputString += this.elements.get(i);
    } else {
      outputString += this.elements.get(i) + separator;
    }
  }
  return outputString;
};

MyArray.prototype.toString = function() {
  return this.join();
};

MyArray.prototype.map = function(fn) {
  if (!fn || typeof fn !== "function") {
    return this;
  }
  const newArr = new MyArray(this.size);
  for (let i = 0; i < this.size; i++) {
    newArr.set(i, fn(this.elements.get(i)));
  }
  return newArr;
};

MyArray.prototype.filter = function(fn) {
  if (!fn || typeof fn !== "function") {
    return this;
  }
  const newArr = new MyArray(this.size);
  let currElement = null;
  for (let i = 0; i < this.size; i++) {
    currElement = this.elements.get(i);
    if (fn(currElement)) {
      newArr.push(currElement);
    }
  }
  return newArr;
};

MyArray.prototype.some = function(fn) {
  if (!fn || typeof fn !== "function") {
    return false;
  }
  for (let i = 0; i < this.size; i++) {
    currElement = this.elements.get(i);
    if (fn(currElement)) {
      return true;
    }
  }
  return false;
};

MyArray.prototype.every = function(fn) {
  if (!fn || typeof fn !== "function") {
    return false;
  }
  for (let i = 0; i < this.size; i++) {
    currElement = this.elements.get(i);
    if (!fn(currElement)) {
      return false;
    }
  }
  return true;
};

MyArray.prototype.fill = function(value, start, end) {
  if (!start) {
    start = 0;
  }
  if (!end) {
    end = this.size;
  }
  for (let i = start; i < end; i++) {
    this.elements.set(i, value);
  }
};

MyArray.prototype.reverse = function() {
  let swapped = null;
  for (let i = 0; i < Math.floor(this.size / 2); i++) {
    swapped = this.elements.get(i);
    this.elements.set(i, this.elements.get(this.size - 1 - i));
    this.elements.set(this.size - 1 - i, swapped);
  }
};

MyArray.prototype.shift = function() {
  if (!this.size) {
    return undefined;
  }
  const firstElem = this.elements.get(0);
  this.size--;
  for (let i = 0; i < this.size; i++) {
    this.elements.set(i, this.elements.get(i + 1));
  }
  this.elements.set(this.size, undefined);
  return firstElem;
};

MyArray.prototype.unshift = function(element) {
  if (this.size >= this.elements.length) {
    this.elements = grow(this.size + 1, this.elements);
  }
  let prevElem = this.elements.get(0);
  let nextElem = null;
  for (let i = 0; i < this.size; i++) {
    nextElem = this.elements.get(i + 1);
    this.elements.set(i + 1, prevElem);
    prevElem = nextElem;
  }
  this.elements.set(0, element);
  this.size++;
};

MyArray.prototype.slice = function(start, end) {
  if (!start) {
    start = 0;
  }
  if (!end) {
    end = this.size;
  }
  const newSize = end - start;
  let slicedArr = new MyArray(newSize);
  for (let i = 0; i < newSize; i++) {
    slicedArr.set(i, this.elements.get(start + i));
  }
  return slicedArr;
};

MyArray.prototype.splice = function(start, deleteCount, ...items) {
  if (deleteCount === undefined) {
    deleteCount = this.size - start;
  }
  let firstPart = this.slice(0, start);
  let secondPart = this.slice(start + deleteCount);
  this.elements = firstPart.concat(MyArray.of(...items)).concat(secondPart);
  this.size = this.size - deleteCount + items.length;
};
