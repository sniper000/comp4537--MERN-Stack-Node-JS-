import React from "react";

function SearchBar({ search, setSearch }) {
  const onChangeHandler = (e) => {
    setSearch({ ...search, text: e.target.value });
  };
  const onChangeHandlerNormalTypeCheckBox = (e) => {
    setSearch({ ...search, normalType: e.target.checked });
  };
  const onChangeHandlerFightingTypeCheckBox = (e) => {
    setSearch({ ...search, fightingType: e.target.checked });
  };
  const onChangeHandlerFlyingTypeCheckBox = (e) => {
    setSearch({ ...search, flyingType: e.target.checked });
  };
  const onChangeHandlerPoisonTypeCheckBox = (e) => {
    setSearch({ ...search, poisonType: e.target.checked });
  };
  const onChangeHandlerGroundTypeCheckBox = (e) => {
    setSearch({ ...search, groundType: e.target.checked });
  };
  const onChangeHandlerRockTypeCheckBox = (e) => {
    setSearch({ ...search, rockType: e.target.checked });
  };
  const onChangeHandlerBugTypeCheckBox = (e) => {
    setSearch({ ...search, bugType: e.target.checked });
  };
  const onChangeHandlerGhostTypeCheckBox = (e) => {
    setSearch({ ...search, ghostType: e.target.checked });
  };
  const onChangeHandlerSteelTypeCheckBox = (e) => {
    setSearch({ ...search, steelType: e.target.checked });
  };
  const onChangeHandlerFireTypeCheckBox = (e) => {
    setSearch({ ...search, fireType: e.target.checked });
  };
  const onChangeHandlerWaterTypeCheckBox = (e) => {
    setSearch({ ...search, waterType: e.target.checked });
  };
  const onChangeHandlerGrassTypeCheckBox = (e) => {
    setSearch({ ...search, grassType: e.target.checked });
  };
  const onChangeHandlerElectricTypeCheckBox = (e) => {
    setSearch({ ...search, electricType: e.target.checked });
  };
  const onChangeHandlerPsychicTypeCheckBox = (e) => {
    setSearch({ ...search, psychicType: e.target.checked });
  };
  const onChangeHandlerIceTypeCheckBox = (e) => {
    setSearch({ ...search, iceType: e.target.checked });
  };
  const onChangeHandlerDragonTypeCheckBox = (e) => {
    setSearch({ ...search, dragonType: e.target.checked });
  };
  const onChangeHandlerDarkTypeCheckBox = (e) => {
    setSearch({ ...search, darkType: e.target.checked });
  };
  const onChangeHandlerFairyTypeCheckBox = (e) => {
    setSearch({ ...search, fairyType: e.target.checked });
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={onChangeHandler}
      ></input>
      <br />
      <input
        type="checkbox"
        name="normal"
        onChange={onChangeHandlerNormalTypeCheckBox}
      ></input>
      <label htmlFor="" name="normal">
        Normal
      </label>
      <input
        type="checkbox"
        name="fighting"
        onChange={onChangeHandlerFightingTypeCheckBox}
      ></input>
      <label htmlFor="" name="fighting">
        Fighting
      </label>
      <input
        type="checkbox"
        name="flying"
        onChange={onChangeHandlerFlyingTypeCheckBox}
      ></input>
      <label htmlFor="" name="flying">
        Flying
      </label>
      <input
        type="checkbox"
        name="poison"
        onChange={onChangeHandlerPoisonTypeCheckBox}
      ></input>
      <label htmlFor="" name="poison">
        Poison
      </label>
      <input
        type="checkbox"
        name="ground"
        onChange={onChangeHandlerGroundTypeCheckBox}
      ></input>
      <label htmlFor="" name="ground">
        Ground
      </label>
      <input
        type="checkbox"
        name="rock"
        onChange={onChangeHandlerRockTypeCheckBox}
      ></input>
      <label htmlFor="" name="rock">
        Rock
      </label>
      <input
        type="checkbox"
        name="bug"
        onChange={onChangeHandlerBugTypeCheckBox}
      ></input>
      <label htmlFor="" name="bug">
        Bug
      </label>
      <input
        type="checkbox"
        name="ghost"
        onChange={onChangeHandlerGhostTypeCheckBox}
      ></input>
      <label htmlFor="" name="ghost">
        Ghost
      </label>
      <input
        type="checkbox"
        name="steel"
        onChange={onChangeHandlerSteelTypeCheckBox}
      ></input>
      <label htmlFor="" name="steel">
        Steel
      </label>
      <input
        type="checkbox"
        name="fire"
        onChange={onChangeHandlerFireTypeCheckBox}
      ></input>
      <label htmlFor="" name="fire">
        Fire
      </label>
      <input
        type="checkbox"
        name="water"
        onChange={onChangeHandlerWaterTypeCheckBox}
      ></input>
      <label htmlFor="" name="water">
        Water
      </label>
      <input
        type="checkbox"
        name="grass"
        onChange={onChangeHandlerGrassTypeCheckBox}
      ></input>
      <label htmlFor="" name="grass">
        Grass
      </label>
      <input
        type="checkbox"
        name="electric"
        onChange={onChangeHandlerElectricTypeCheckBox}
      ></input>
      <label htmlFor="" name="electric">
        Electric
      </label>
      <input
        type="checkbox"
        name="psychic"
        onChange={onChangeHandlerPsychicTypeCheckBox}
      ></input>
      <label htmlFor="" name="psychic">
        Psychic
      </label>
      <input
        type="checkbox"
        name="ice"
        onChange={onChangeHandlerIceTypeCheckBox}
      ></input>
      <label htmlFor="" name="ice">
        Ice
      </label>
      <input
        type="checkbox"
        name="dragon"
        onChange={onChangeHandlerDragonTypeCheckBox}
      ></input>
      <label htmlFor="" name="dragon">
        Dragon
      </label>
      <input
        type="checkbox"
        name="dark"
        onChange={onChangeHandlerDarkTypeCheckBox}
      ></input>
      <label htmlFor="" name="dark">
        Dark
      </label>
      <input
        type="checkbox"
        name="fairy"
        onChange={onChangeHandlerFairyTypeCheckBox}
      ></input>
      <label htmlFor="" name="fairy">
        Fairy
      </label>
    </div>
  );
}

export default SearchBar;
