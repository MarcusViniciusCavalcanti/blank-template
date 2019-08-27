import { Inject, Injectable } from '@angular/core';
import { MEDIA_BREAKPOINTS } from 'src/app/theme/theme.options';

export interface MediaBreakpoint {
  name: string;
  width: number;
}

export const DEFAULT_MEDIA_BREAKPOINTS = [
  { name: 'xs', width: 0 },
  { name: 'is', width: 400 },
  { name: 'sm', width: 576 },
  { name: 'md', width: 768 },
  { name: 'lg', width: 992 },
  { name: 'xl', width: 1200 },
  { name: 'xxl', width: 1400 },
  { name: 'xxxl', width: 1600 },
];

@Injectable()
export class BreakpointsService {

  private breakpointsMap: { [breakpoint: string]: number };

  constructor(@Inject(MEDIA_BREAKPOINTS) private breakpoints) {
    this.breakpointsMap = this.breakpoints.reduce((res, breakpoint: MediaBreakpoint) => {
      res[breakpoint.name] = breakpoint.width;
      return res;
    }, {});
  }

  getBreakpoints(): MediaBreakpoint[] {
    return this.breakpoints;
  }

  getByWidth(width: number) {
    const unknown = { name: 'unknown', width };
    const breakpoints = this.getBreakpoints();

    return breakpoints.find((point: MediaBreakpoint, index: number) => {
      const next = breakpoints[index + 1];
      return width >= point.width && (!next || width < next.width);
    }) || unknown;
  }

  getByName(name: string): MediaBreakpoint {
    const unknown = { name: 'unknown', width: NaN };
    const breakpoints = this.getBreakpoints();

    const filteredByName = (point: MediaBreakpoint) => name === point.name;
    return breakpoints.find(filteredByName) || unknown;
  }
}
