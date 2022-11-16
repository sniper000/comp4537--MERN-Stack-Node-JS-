class PokemonBadRequest extends Error {
    constructor(message) {
      super(message);
      this.name = 'PokemonBadRequest';
    }
  }
  
  class PokemonBadRequestMissingID extends PokemonBadRequest {
    constructor(message) {
      super(message);
      this.name = 'PokemonBadRequestMissingID';
    }
  }
  
  class PokemonBadRequestPostFailedToAddPokemon extends PokemonBadRequest {
    constructor(message) {
      super(message);
      this.name = 'PokemonBadRequestPostFailedToAddPokemon';
    }
  }
  
  class PokemonBadRequestSpecialValuesReturnEmptyArray extends PokemonBadRequest {
    constructor(message) {
      super(message);
      this.name = 'PokemonBadRequestSpecialValuessReturnEmptyArray';
    }
  }
  
  class PokemonBadRequestSpecialValueReturnNull extends PokemonBadRequest {
    constructor(message) {
      super(message);
      this.name = 'PokemonBadRequestSpecialValuesReturnNull';
    }
  }
  
  class PokemonBadRequestSpecialValueReturnEmptyStrings extends PokemonBadRequest {
    constructor(message) {
      super(message);
      this.name = 'PokemonBadRequestSpecialValuesReturnEmptyStrings';
    }
  }
  
  class PokemonNotFoundError extends PokemonBadRequest {
    constructor(message) {
      super(message);
      this.name = 'PokemonNotFoundError';
    }
  }

  module.exports = {
    PokemonBadRequest,
    PokemonBadRequestMissingID,
    PokemonBadRequestPostFailedToAddPokemon,
    PokemonBadRequestSpecialValuesReturnEmptyArray,
    PokemonNotFoundError,
    PokemonBadRequestSpecialValueReturnNull,
    PokemonBadRequestSpecialValueReturnEmptyStrings
  };