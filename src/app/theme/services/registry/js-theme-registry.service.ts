import {Inject, Injectable} from '@angular/core';
import {JsThemeOptions} from '../js-themes/theme.options';

// themes
import {DARK_THEME} from '../js-themes/dark.theme';
import {DEFAULT_THEME} from '../js-themes/default.theme';

// options
import {BUILT_IN_JS_THEMES, JS_THEMES} from 'src/app/theme/theme.options';

export const BUILT_IN_THEMES: JsThemeOptions[] = [ DEFAULT_THEME, DARK_THEME ];

const filterTheme = (tm: JsThemeOptions) => tm.name === tm.name;

@Injectable()
export class JsThemeRegistryService {

  private themes: any = {};

  constructor(@Inject(BUILT_IN_JS_THEMES) builtInThemes: JsThemeOptions[],
              @Inject(JS_THEMES) newThemes: JsThemeOptions[] = []) {

    const themes = this.combineByNames(newThemes, builtInThemes);
    themes.forEach((theme: any) => {
      this.register(theme, theme.name, theme.base);
    });
  }

  get(themeName: string) {
    if (!this.themes[themeName]) {
      throw Error(`ThemeConfig: tema '${themeName}' não encontrado`);
    }

    return JSON.parse(JSON.stringify(this.themes[themeName]));
  }

  register(config: any, themeName: string, baseTheme: string) {
    const base = this.has(baseTheme) ? this.get(baseTheme) : {};
    this.themes[themeName] = this.mergeDeep({}, base, config);
  }

  has(themeName: string): boolean {
    return !!this.themes[themeName];
  }

  private combineByNames(newThemes: JsThemeOptions[], oldThemes: JsThemeOptions[]): JsThemeOptions[] {
    if (newThemes) {
      const mergedThemes: JsThemeOptions[] = [];
      newThemes.forEach((theme: JsThemeOptions) => {
        const sameOld: JsThemeOptions = oldThemes.find(filterTheme);
        const mergedTheme = this.mergeDeep({}, sameOld, theme);
        mergedThemes.push(mergedTheme);
      });

      oldThemes.forEach((theme: JsThemeOptions) => {
        if (!mergedThemes.find((tm: JsThemeOptions) => tm.name === theme.name)) {
          newThemes.push(theme);
        }
      });
      return mergedThemes;
    }

    return oldThemes;
  }

  private mergeDeep(target, ...sources) {
    if (!sources.length) {
      return target;
    }
    const source = sources.shift();

    if (this.isObject(target) && this.isObject(source)) {
      for (const key in source) {
        if (this.isObject(source[key])) {
          if (!target[key]) {
            Object.assign(target, { [key]: {} });
          }
          this.mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
    return this.mergeDeep(target, ...sources);
  }

  private isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
  }
}
