export const CODEBOOK_NAME_GENDER = "GENDER";
export const CODEBOOK_NAME_HOUSE = "HOUSE";
export const CODEBOOK_NAME_YEAR = "YEAR";

const LANGUAGE = "en";

export const getCodebookItemName = (codebookCode, codebookItemCode) => {
  let codebookItemName = codebookItemCode;
  const codebook = codebooks[codebookCode];
  if (codebook)
  {
    const codebookItem = codebook.find((item) => item.code === codebookItemCode);
    if (codebookItem && codebookItem.names[LANGUAGE])
    {
      codebookItemName = codebookItem.names[LANGUAGE];
    }
  }
  return codebookItemName;
};

export const getCodebookRadioButtons = (codebookCode, checkedValue, radioOnChange) =>
  codebooks[codebookCode] ? (
    <>
      { codebooks[codebookCode].map((item) => (
        <span key={ item.code }>
          <label className="form-check-label">
            <input
              type="radio"
              value={ item.code }
              checked={ item.code === checkedValue }
              onChange={ radioOnChange }
              className="form-check-input"
            />{ " " }
            { item.names[LANGUAGE] ?? item.code }
          </label>{ " " }
        </span>
      )) }
    </>
  ) : null;

export const getCodebookOptions = (codebookCode, withEmpty = false) =>
  codebooks[codebookCode] ? (
    <>
      { withEmpty ? <option key=""></option> : null }
      { codebooks[codebookCode].map((item) => (
        <option key={ item.code } value={ item.code }>
          { item.names[LANGUAGE] ?? item.code }
        </option>
      )) }
    </>
  ) : null;

const codebooks = {
  GENDER: [
    { code: "M", names: { cs: "Muž", en: "Male" }, order: 1 },
    { code: "F", names: { cs: "Žena", en: "Female" }, order: 2 },
  ],
  HOUSE: [
    { code: "GRYFFINDOR", names: { cs: "Nebelvír", en: "Gryffindor" }, order: 1 },
    { code: "HUFFLEPUFF", names: { cs: "Mrzimor", en: "Hufflepuff" }, order: 2 },
    { code: "RAVENCLAW", names: { cs: "Havraspár", en: "Ravenclaw" }, order: 3 },
    { code: "SLYTHERIN", names: { cs: "Zmijozel", en: "Slytherin" }, order: 4 },
  ],
  YEAR: [
    { code: "1", names: { cs: "První", en: "First" }, order: 1 },
    { code: "2", names: { cs: "Druhý", en: "Second" }, order: 2 },
    { code: "3", names: { cs: "Třetí", en: "Third" }, order: 2 },
    { code: "4", names: { cs: "Čtvrtý", en: "Fourth" }, order: 2 },
    { code: "5", names: { cs: "Pátý", en: "Fifth" }, order: 2 },
    { code: "6", names: { cs: "Šestý", en: "Sixth" }, order: 2 },
    { code: "7", names: { cs: "Sedmý", en: "Seventh" }, order: 2 },
  ],
};
