import {InjectionToken} from '@angular/core';
import {JsThemeOptions} from './services/js-themes/theme.options';
import {MediaBreakpoint} from './services/breakpoints/breakpoints.service';

export interface ThemeOptions {
  name: string;
}

export const THEME_OPTIONS = new InjectionToken<ThemeOptions>('Theme Options');
export const BUILT_IN_JS_THEMES = new InjectionToken<JsThemeOptions[]>('Built-in Js Themes');
export const JS_THEMES = new InjectionToken<JsThemeOptions[]>('Js Themes');
export const MEDIA_BREAKPOINTS = new InjectionToken<MediaBreakpoint>('Media breakpoints');

export const APP_WINDOW = new InjectionToken<Window>('Window');
export const APP_DOCUMENT = new InjectionToken<Document>('Document');

