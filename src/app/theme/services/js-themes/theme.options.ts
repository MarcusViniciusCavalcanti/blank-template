interface JsThemeVariable {
  [key: string]: string | string[] | JsThemeVariable;
}

export interface JsThemeOptions {
  name: string;
  base?: string;
  variables?: JsThemeVariable;
}
