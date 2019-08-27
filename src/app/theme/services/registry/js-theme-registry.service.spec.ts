import { TestBed, inject, async } from '@angular/core/testing';

import { JsThemeOptions } from '../js-themes/theme.options';
import { BUILT_IN_THEMES, JsThemeRegistryService } from './js-theme-registry.service';
import { BUILT_IN_JS_THEMES, JS_THEMES } from 'src/app/theme/theme.options';

describe('js-themes-registry-service', () => {
  let jsThemesRegistry: JsThemeRegistryService;
  const customThemes: JsThemeOptions[] = [
    {
      name: 'default',
      base: 'default',
      variables: {
        someNewValue: 'black',
        colorBg: 'yellow',
      },
    },
    {
      name: 'dark',
      base: 'default',
      variables: {
        someNewValueForCosmic: 'red',
      },
    },
    {
      name: 'super-new-theme',
      variables: {
        someNewValueForCosmic: 'blue',
      },
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: JS_THEMES, useValue: customThemes },
        { provide: BUILT_IN_JS_THEMES, useValue: BUILT_IN_THEMES },

        JsThemeRegistryService,
      ]
    });
  });

  beforeEach(async(inject(
    [JsThemeRegistryService],
    (newJsThemesRegistry) => {
      jsThemesRegistry = newJsThemesRegistry;
    },
  )));

  it('has built in themes', () => {
    expect(jsThemesRegistry.get('default')).not.toBeUndefined();
    expect(jsThemesRegistry.get('dark')).not.toBeUndefined();

    expect(jsThemesRegistry.has('default')).toBeTruthy();
    expect(jsThemesRegistry.has('dark')).toBeTruthy();
  });

  it('has built in themes with inherited font', () => {
    expect(jsThemesRegistry.get('default').variables.fontMain)
      .toEqual('Open Sans, sans-serif');
    expect(jsThemesRegistry.get('dark').variables.fontMain)
      .toEqual('Open Sans, sans-serif');
  });

  it('has also new themes', () => {
    expect(jsThemesRegistry.get('super-new-theme')).not.toBeUndefined();
    expect(jsThemesRegistry.has('super-new-theme')).toBeTruthy();
    expect(jsThemesRegistry.get('super-new-theme').variables.someNewValueForCosmic).toEqual('blue');
  });

  it('has changes from custom settings', () => {
    expect(jsThemesRegistry.get('default').variables.colorBg).toEqual('yellow');
  });

  it('has new values from custom settings', () => {
    expect(jsThemesRegistry.get('dark').variables.someNewValueForCosmic).toEqual('red');
    expect(jsThemesRegistry.get('default').variables.someNewValue).toEqual('black');
  });
});
