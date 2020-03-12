import { Injectable } from '@angular/core';
import { Base } from 'src/common';
import { BaseComponent } from './base/base.component';
import { State } from './state.service';
declare var dataLayer: any;

@Injectable({
  providedIn: 'root'
})
export class UtilService {


  constructor(private state: State) { }


  rawCopy<T>(object: T, deleteBaseId: boolean): T {
    const t1 = performance.now();
    const copied = this.cloneObject(object);
    this.removeInternalVariableRecursively(copied);
    if (deleteBaseId) {
      this.deleteBaseIdUsingRecursiveFn(copied);
    }
    const t2 = performance.now();
    // console.log('rawcopy', t2 - t1);
    return copied;
  }
  /**
   * function to remove interal variables
   * @param object 
   */
  removeInternalVariableRecursively(object: Object) {
    const attrRemoveFn = (object) => {
      Object.keys(object).filter(key => key.startsWith("__")).forEach(key => delete object[key])
    };
    this.executeFnRecursively(object, attrRemoveFn);
  }

  cloneObject(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Array
    if (obj instanceof Array) {
      const copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.cloneObject(obj[i]);
      }
      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      const copy = {};
      for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          copy[attr] = this.cloneObject(obj[attr])
        };
      }
      return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
  }


  /**
   * this will go recursively along the passed object and will execute teh given fn
   */
  executeFnRecursively(object: Object, fn: (obj: Object) => any) {
    const objectType = object['objectType'];
    if (objectType !== undefined) {
      fn(object);
    }
    const keys = Object.keys(object);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      // dont wnat to go through internal variables..not sure why wasnt this done earlier
      if (key.startsWith("__") === false) {
        const child = object[key];
        if (this.goFurtherWithChild(child)) {
          this.executeFnRecursively(child, fn);
        }
      }
    }
  }


  /** this one is to decide whether to continue with the child, this is invoked multiple places. */
  goFurtherWithChild(child): boolean {
    return (child !== null && child !== undefined && typeof child === "object" && (child instanceof Base || Array.isArray(child) || Object.keys(child).length > 0))
  }



  /**
   * delete baseid recursively by going through each object, this would be needed while copying styles.
   * @param baseObj remove 
   */
  deleteBaseIdUsingRecursiveFn(baseObj: Base) {
    const execFn = (base: Base) => {
      delete base.baseId;
    };
    this.executeFnRecursively(baseObj, execFn);
  }


  getUniqueId(): string {
    return (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
  }

  getRandomFrom0to25(): number {
    return Math.floor(Math.random() * 26);
  }

  getComponent<T extends BaseComponent>(compId: string): T {
    const component = this.state.components.find(itComp => itComp.compId === compId)
    return <T>component;
  }

  getRoundedValue(value: number, decimals = 2): number {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }

  addToDataLayer(event: string, category: string, action: string, label = '', value = '') {
    dataLayer.push({
      event, category, action, label, value
    });
  }

}


export function isBlank(text: string | number) {
  return text === undefined || text === null || text.toString().trim() === "";
}

export function isNotBlank(text: any) {
  return text !== undefined && text !== null && text.toString().trim() !== "";
}

export function startsWith(text: any, startText: string) {
  return typeof text === 'string' && text.startsWith(startText);
}

export function includes(text: any, searchText: string) {
  return typeof text === 'string' && text.includes(searchText);
}