/*globals Borges, Backbone, Logger, MersenneTwister*/

Borges.Models.Book = Backbone.Model.extend({
  defaults: {
    seed: null,
    title: "",
    content: ""
  },
  initialize : function () {
      arguments[0] = arguments[0] || {};
      var i, l, curRandomNo, index;
      //Logger.info("creating new book with %o", arguments);
      var myContent = "";
      var myTitle = "";
      var rng = new MersenneTwister(arguments[0].seed);
      var bookLength = this.constructor.GENERATOR_DEFAULTS.LINES *
                       this.constructor.GENERATOR_DEFAULTS.CHARACTERS *
                       this.constructor.GENERATOR_DEFAULTS.PAGES;
      for (i = 0; i < bookLength; i++) {
          curRandomNo = rng.next();
          index = Math.abs(curRandomNo * this.constructor.ALPHABET.length);
          myContent += this.constructor.ALPHABET.slice(index, index + 1);
      }
      
      for (i = 0, l = rng.next() * 16; i < l; i++) {
          curRandomNo = rng.next();
          index = Math.abs(curRandomNo * this.constructor.ALPHABET.length);
          myTitle += this.constructor.ALPHABET.slice(index, index + 1);
      }
      
      this.set({
          seed    : rng.seed,
          content : myContent,
          title   : myTitle});
  }
});

Borges.Models.Book.GENERATOR_DEFAULTS = {
    LINES: 40,
    CHARACTERS: 80,
    PAGES: 410
};

// see http://dicelog.com/babel
Borges.Models.Book.ALPHABET = 'ABCDEFGHIJLMNOPQRSTVXY .,';