import{r as e,d as t,h as l,H as i,e as s,i as a}from"./p-b238ac1f.js";import{t as o,e as r}from"./p-c6a64b28.js";import{g as n}from"./p-59a10c97.js";import{c}from"./p-021b20ac.js";import{b as d,f as p,m as h,a as b,p as g}from"./p-62625646.js";import{p as u}from"./p-28e84784.js";import{b as m,l as f,m as x}from"./p-7a1ace02.js";import{i as v}from"./p-506221fe.js";import{h as w,c as y}from"./p-0e4de1d0.js";import{w as k}from"./p-65b51881.js";import"./p-edd32bb2.js";import"./p-add30d46.js";const j=":host{--padding-top:0px;--padding-end:0px;--padding-bottom:0px;--padding-start:0px;--placeholder-color:currentColor;--placeholder-opacity:0.6;--background:transparent;--border-style:solid;--highlight-color-focused:var(--ion-color-primary, #3880ff);--highlight-color-valid:var(--ion-color-success, #2dd36f);--highlight-color-invalid:var(--ion-color-danger, #eb445a);--highlight-color:var(--highlight-color-focused);display:block;position:relative;font-family:var(--ion-font-family, inherit);white-space:nowrap;cursor:pointer;z-index:2}:host(:not(.legacy-select)){width:100%}:host(.ion-color){--highlight-color-focused:var(--ion-color-base)}:host(.legacy-select){-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);display:flex;align-items:center;overflow:hidden}:host(.in-item.legacy-select){position:static;max-width:45%}:host(.select-disabled){pointer-events:none}:host(.ion-focused) button{border:2px solid #5e9ed6}:host([slot=start]:not(.legacy-select)),:host([slot=end]:not(.legacy-select)){width:auto}.select-placeholder{color:var(--placeholder-color);opacity:var(--placeholder-opacity)}:host(.legacy-select) label{top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;appearance:none;outline:none;display:flex;align-items:center;opacity:0}@supports (inset-inline-start: 0){:host(.legacy-select) label{inset-inline-start:0}}@supports not (inset-inline-start: 0){:host(.legacy-select) label{left:0}:host-context([dir=rtl]):host(.legacy-select) label,:host-context([dir=rtl]).legacy-select label{left:unset;right:unset;right:0}@supports selector(:dir(rtl)){:host(.legacy-select) label:dir(rtl){left:unset;right:unset;right:0}}}:host(.legacy-select) label::-moz-focus-inner{border:0}button{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}.select-icon{-webkit-margin-start:4px;margin-inline-start:4px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0;position:relative}:host(.in-item-color) .select-icon{color:inherit}:host(.select-label-placement-stacked) .select-icon,:host(.select-label-placement-floating) .select-icon{position:absolute;height:100%}:host(.select-ltr.select-label-placement-stacked) .select-icon,:host(.select-ltr.select-label-placement-floating) .select-icon{right:var(--padding-end, 0)}:host(.select-rtl.select-label-placement-stacked) .select-icon,:host(.select-rtl.select-label-placement-floating) .select-icon{left:var(--padding-start, 0)}.select-text{flex:1;min-width:16px;font-size:inherit;text-overflow:ellipsis;white-space:inherit;overflow:hidden}.select-wrapper{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);border-radius:var(--border-radius);display:flex;position:relative;flex-grow:1;align-items:center;height:inherit;min-height:inherit;transition:background-color 15ms linear;background:var(--background);line-height:normal;cursor:inherit;box-sizing:border-box}.select-wrapper .select-placeholder{transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)}:host(.ion-touched.ion-invalid){--highlight-color:var(--highlight-color-invalid)}:host(.ion-valid){--highlight-color:var(--highlight-color-valid)}.label-text-wrapper{display:flex;align-items:center;max-width:200px;transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1);pointer-events:none}.label-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.native-wrapper{display:flex;align-items:center;transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);overflow:hidden}:host(.select-justify-space-between) .select-wrapper{justify-content:space-between}:host(.select-justify-start) .select-wrapper{justify-content:start}:host(.select-justify-end) .select-wrapper{justify-content:end}:host(.select-label-placement-start) .select-wrapper{flex-direction:row}:host(.select-label-placement-start) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}:host(.select-label-placement-end) .select-wrapper{flex-direction:row-reverse}:host(.select-label-placement-end) .label-text-wrapper{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}:host(.select-label-placement-fixed) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}:host(.select-label-placement-fixed) .label-text-wrapper{flex:0 0 100px;width:100px;min-width:100px;max-width:200px}:host(.select-label-placement-stacked) .select-wrapper,:host(.select-label-placement-floating) .select-wrapper{flex-direction:column;align-items:start}:host(.select-label-placement-stacked) .label-text-wrapper,:host(.select-label-placement-floating) .label-text-wrapper{max-width:100%}:host(.select-ltr.select-label-placement-stacked) .label-text-wrapper,:host(.select-ltr.select-label-placement-floating) .label-text-wrapper{transform-origin:left top}:host(.select-rtl.select-label-placement-stacked) .label-text-wrapper,:host(.select-rtl.select-label-placement-floating) .label-text-wrapper{transform-origin:right top}:host(.select-label-placement-stacked) .native-wrapper,:host(.select-label-placement-floating) .native-wrapper{margin-left:0;margin-right:0;margin-top:1px;margin-bottom:0;flex-grow:1;width:100%}:host(.select-label-placement-floating) .label-text-wrapper{transform:translateY(100%) scale(1)}:host(.select-label-placement-floating) .native-wrapper .select-placeholder{opacity:0}:host(.select-expanded.select-label-placement-floating) .native-wrapper .select-placeholder,:host(.ion-focused.select-label-placement-floating) .native-wrapper .select-placeholder,:host(.has-value.select-label-placement-floating) .native-wrapper .select-placeholder{opacity:1}:host(.select-label-placement-stacked) .label-text-wrapper,:host(.select-expanded.select-label-placement-floating) .label-text-wrapper,:host(.ion-focused.select-label-placement-floating) .label-text-wrapper,:host(.has-value.select-label-placement-floating) .label-text-wrapper{transform:translateY(50%) scale(0.75);max-width:calc(100% / 0.75)}:host(.legacy-select){--padding-top:10px;--padding-end:8px;--padding-bottom:10px;--padding-start:16px}:host(:not(.legacy-select)){min-height:44px}:host(.select-label-placement-floating),:host(.select-label-placement-stacked){min-height:56px}.select-icon{width:18px;height:18px;color:var(--ion-color-step-650, #595959)}:host(.select-label-placement-stacked) .native-wrapper,:host(.select-label-placement-floating) .native-wrapper{width:calc(100% - 18px - 4px)}:host(.select-disabled){opacity:0.3}";const C=":host{--padding-top:0px;--padding-end:0px;--padding-bottom:0px;--padding-start:0px;--placeholder-color:currentColor;--placeholder-opacity:0.6;--background:transparent;--border-style:solid;--highlight-color-focused:var(--ion-color-primary, #3880ff);--highlight-color-valid:var(--ion-color-success, #2dd36f);--highlight-color-invalid:var(--ion-color-danger, #eb445a);--highlight-color:var(--highlight-color-focused);display:block;position:relative;font-family:var(--ion-font-family, inherit);white-space:nowrap;cursor:pointer;z-index:2}:host(:not(.legacy-select)){width:100%}:host(.ion-color){--highlight-color-focused:var(--ion-color-base)}:host(.legacy-select){-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);display:flex;align-items:center;overflow:hidden}:host(.in-item.legacy-select){position:static;max-width:45%}:host(.select-disabled){pointer-events:none}:host(.ion-focused) button{border:2px solid #5e9ed6}:host([slot=start]:not(.legacy-select)),:host([slot=end]:not(.legacy-select)){width:auto}.select-placeholder{color:var(--placeholder-color);opacity:var(--placeholder-opacity)}:host(.legacy-select) label{top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;appearance:none;outline:none;display:flex;align-items:center;opacity:0}@supports (inset-inline-start: 0){:host(.legacy-select) label{inset-inline-start:0}}@supports not (inset-inline-start: 0){:host(.legacy-select) label{left:0}:host-context([dir=rtl]):host(.legacy-select) label,:host-context([dir=rtl]).legacy-select label{left:unset;right:unset;right:0}@supports selector(:dir(rtl)){:host(.legacy-select) label:dir(rtl){left:unset;right:unset;right:0}}}:host(.legacy-select) label::-moz-focus-inner{border:0}button{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}.select-icon{-webkit-margin-start:4px;margin-inline-start:4px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0;position:relative}:host(.in-item-color) .select-icon{color:inherit}:host(.select-label-placement-stacked) .select-icon,:host(.select-label-placement-floating) .select-icon{position:absolute;height:100%}:host(.select-ltr.select-label-placement-stacked) .select-icon,:host(.select-ltr.select-label-placement-floating) .select-icon{right:var(--padding-end, 0)}:host(.select-rtl.select-label-placement-stacked) .select-icon,:host(.select-rtl.select-label-placement-floating) .select-icon{left:var(--padding-start, 0)}.select-text{flex:1;min-width:16px;font-size:inherit;text-overflow:ellipsis;white-space:inherit;overflow:hidden}.select-wrapper{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);border-radius:var(--border-radius);display:flex;position:relative;flex-grow:1;align-items:center;height:inherit;min-height:inherit;transition:background-color 15ms linear;background:var(--background);line-height:normal;cursor:inherit;box-sizing:border-box}.select-wrapper .select-placeholder{transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)}:host(.ion-touched.ion-invalid){--highlight-color:var(--highlight-color-invalid)}:host(.ion-valid){--highlight-color:var(--highlight-color-valid)}.label-text-wrapper{display:flex;align-items:center;max-width:200px;transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1);pointer-events:none}.label-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.native-wrapper{display:flex;align-items:center;transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);overflow:hidden}:host(.select-justify-space-between) .select-wrapper{justify-content:space-between}:host(.select-justify-start) .select-wrapper{justify-content:start}:host(.select-justify-end) .select-wrapper{justify-content:end}:host(.select-label-placement-start) .select-wrapper{flex-direction:row}:host(.select-label-placement-start) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}:host(.select-label-placement-end) .select-wrapper{flex-direction:row-reverse}:host(.select-label-placement-end) .label-text-wrapper{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0;margin-top:0;margin-bottom:0}:host(.select-label-placement-fixed) .label-text-wrapper{-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:0;margin-bottom:0}:host(.select-label-placement-fixed) .label-text-wrapper{flex:0 0 100px;width:100px;min-width:100px;max-width:200px}:host(.select-label-placement-stacked) .select-wrapper,:host(.select-label-placement-floating) .select-wrapper{flex-direction:column;align-items:start}:host(.select-label-placement-stacked) .label-text-wrapper,:host(.select-label-placement-floating) .label-text-wrapper{max-width:100%}:host(.select-ltr.select-label-placement-stacked) .label-text-wrapper,:host(.select-ltr.select-label-placement-floating) .label-text-wrapper{transform-origin:left top}:host(.select-rtl.select-label-placement-stacked) .label-text-wrapper,:host(.select-rtl.select-label-placement-floating) .label-text-wrapper{transform-origin:right top}:host(.select-label-placement-stacked) .native-wrapper,:host(.select-label-placement-floating) .native-wrapper{margin-left:0;margin-right:0;margin-top:1px;margin-bottom:0;flex-grow:1;width:100%}:host(.select-label-placement-floating) .label-text-wrapper{transform:translateY(100%) scale(1)}:host(.select-label-placement-floating) .native-wrapper .select-placeholder{opacity:0}:host(.select-expanded.select-label-placement-floating) .native-wrapper .select-placeholder,:host(.ion-focused.select-label-placement-floating) .native-wrapper .select-placeholder,:host(.has-value.select-label-placement-floating) .native-wrapper .select-placeholder{opacity:1}:host(.select-label-placement-stacked) .label-text-wrapper,:host(.select-expanded.select-label-placement-floating) .label-text-wrapper,:host(.ion-focused.select-label-placement-floating) .label-text-wrapper,:host(.has-value.select-label-placement-floating) .label-text-wrapper{transform:translateY(50%) scale(0.75);max-width:calc(100% / 0.75)}:host(.select-fill-solid){--background:var(--ion-color-step-50, #f2f2f2);--border-color:var(--ion-color-step-500, gray);--border-radius:4px;--padding-start:16px;--padding-end:16px}:host(.select-fill-solid) .select-wrapper{border-bottom:var(--border-width) var(--border-style) var(--border-color)}:host(.has-focus.select-fill-solid.ion-valid),:host(.select-fill-solid.ion-touched.ion-invalid){--border-color:var(--highlight-color)}:host(.select-fill-solid) .select-bottom{border-top:none}@media (any-hover: hover){:host(.select-fill-solid:hover){--background:var(--ion-color-step-100, #e6e6e6);--border-color:var(--ion-color-step-750, #404040)}}:host(.select-fill-solid.select-expanded),:host(.select-fill-solid.ion-focused){--background:var(--ion-color-step-150, #d9d9d9);--border-color:var(--ion-color-step-750, #404040)}:host(.select-fill-solid) .select-wrapper{border-top-left-radius:var(--border-radius);border-top-right-radius:var(--border-radius);border-bottom-right-radius:0px;border-bottom-left-radius:0px}:host-context([dir=rtl]):host(.select-fill-solid) .select-wrapper,:host-context([dir=rtl]).select-fill-solid .select-wrapper{border-top-left-radius:var(--border-radius);border-top-right-radius:var(--border-radius);border-bottom-right-radius:0px;border-bottom-left-radius:0px}@supports selector(:dir(rtl)){:host(.select-fill-solid) .select-wrapper:dir(rtl){border-top-left-radius:var(--border-radius);border-top-right-radius:var(--border-radius);border-bottom-right-radius:0px;border-bottom-left-radius:0px}}:host(.select-fill-solid.select-label-placement-stacked) .label-text-wrapper,:host(.select-expanded.select-fill-solid.select-label-placement-floating) .label-text-wrapper,:host(.ion-focused.select-fill-solid.select-label-placement-floating) .label-text-wrapper,:host(.has-value.select-fill-solid.select-label-placement-floating) .label-text-wrapper{max-width:calc(100% / 0.75)}:host(.select-fill-outline){--border-color:var(--ion-color-step-300, #b3b3b3);--border-radius:4px;--padding-start:16px;--padding-end:16px}:host(.select-fill-outline.select-shape-round){--border-radius:28px;--padding-start:32px;--padding-end:32px}:host(.has-focus.select-fill-outline.ion-valid),:host(.select-fill-outline.ion-touched.ion-invalid){--border-color:var(--highlight-color)}@media (any-hover: hover){:host(.select-fill-outline:hover){--border-color:var(--ion-color-step-750, #404040)}}:host(.select-fill-outline.select-expanded),:host(.select-fill-outline.ion-focused){--border-width:2px;--border-color:var(--highlight-color)}:host(.select-fill-outline) .select-bottom{border-top:none}:host(.select-fill-outline) .select-wrapper{border-bottom:none}:host(.select-ltr.select-fill-outline.select-label-placement-stacked) .label-text-wrapper,:host(.select-ltr.select-fill-outline.select-label-placement-floating) .label-text-wrapper{transform-origin:left top}:host(.select-rtl.select-fill-outline.select-label-placement-stacked) .label-text-wrapper,:host(.select-rtl.select-fill-outline.select-label-placement-floating) .label-text-wrapper{transform-origin:right top}:host(.select-fill-outline.select-label-placement-stacked) .label-text-wrapper,:host(.select-fill-outline.select-label-placement-floating) .label-text-wrapper{position:absolute;max-width:calc(100% - var(--padding-start) - var(--padding-end))}:host(.select-fill-outline) .label-text-wrapper{position:relative;z-index:1}:host(.select-expanded.select-fill-outline.select-label-placement-floating) .label-text-wrapper,:host(.ion-focused.select-fill-outline.select-label-placement-floating) .label-text-wrapper,:host(.has-value.select-fill-outline.select-label-placement-floating) .label-text-wrapper,:host(.select-fill-outline.select-label-placement-stacked) .label-text-wrapper{transform:translateY(-32%) scale(0.75);margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;max-width:calc((100% - var(--padding-start) - var(--padding-end) - 8px) / 0.75)}:host(.select-fill-outline.select-label-placement-stacked) select,:host(.select-fill-outline.select-label-placement-floating) select{margin-left:0;margin-right:0;margin-top:6px;margin-bottom:6px}:host(.select-fill-outline) .select-outline-container{left:0;right:0;top:0;bottom:0;display:flex;position:absolute;width:100%;height:100%}:host(.select-fill-outline) .select-outline-start,:host(.select-fill-outline) .select-outline-end{pointer-events:none}:host(.select-fill-outline) .select-outline-start,:host(.select-fill-outline) .select-outline-notch,:host(.select-fill-outline) .select-outline-end{border-top:var(--border-width) var(--border-style) var(--border-color);border-bottom:var(--border-width) var(--border-style) var(--border-color);box-sizing:border-box}:host(.select-fill-outline) .select-outline-notch{max-width:calc(100% - var(--padding-start) - var(--padding-end))}:host(.select-fill-outline) .notch-spacer{-webkit-padding-end:8px;padding-inline-end:8px;font-size:calc(1em * 0.75);opacity:0;pointer-events:none}:host(.select-ltr.select-fill-outline) .select-outline-start{border-left:var(--border-width) var(--border-style) var(--border-color);border-radius:var(--border-radius) 0px 0px var(--border-radius)}:host(.select-rtl.select-fill-outline) .select-outline-start{border-right:var(--border-width) var(--border-style) var(--border-color);border-radius:0px var(--border-radius) var(--border-radius) 0px}:host(.select-fill-outline) .select-outline-start{width:calc(var(--padding-start) - 4px)}:host(.select-ltr.select-fill-outline) .select-outline-end{border-right:var(--border-width) var(--border-style) var(--border-color);border-radius:0px var(--border-radius) var(--border-radius) 0px}:host(.select-rtl.select-fill-outline) .select-outline-end{border-left:var(--border-width) var(--border-style) var(--border-color);border-radius:var(--border-radius) 0px 0px var(--border-radius)}:host(.select-fill-outline) .select-outline-end{flex-grow:1}:host(.select-expanded.select-fill-outline.select-label-placement-floating) .select-outline-notch,:host(.ion-focused.select-fill-outline.select-label-placement-floating) .select-outline-notch,:host(.has-value.select-fill-outline.select-label-placement-floating) .select-outline-notch,:host(.select-fill-outline.select-label-placement-stacked) .select-outline-notch{border-top:none}:host{--border-width:1px;--border-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, rgba(0, 0, 0, 0.13))))}:host(.legacy-select){--padding-top:10px;--padding-end:0;--padding-bottom:10px;--padding-start:16px}:host(:not(.legacy-select)){min-height:56px}.select-icon{width:13px;transition:transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);color:var(--ion-color-step-500, gray)}:host(.select-label-placement-floating.select-expanded) .label-text-wrapper,:host(.select-label-placement-floating.ion-focused) .label-text-wrapper,:host(.select-label-placement-stacked.select-expanded) .label-text-wrapper,:host(.select-label-placement-stacked.ion-focused) .label-text-wrapper{color:var(--highlight-color)}:host(.has-focus.select-label-placement-floating.ion-valid) .label-text-wrapper,:host(.select-label-placement-floating.ion-touched.ion-invalid) .label-text-wrapper,:host(.has-focus.select-label-placement-stacked.ion-valid) .label-text-wrapper,:host(.select-label-placement-stacked.ion-touched.ion-invalid) .label-text-wrapper{color:var(--highlight-color)}.select-highlight{bottom:-1px;position:absolute;width:100%;height:2px;transform:scale(0);transition:transform 200ms;background:var(--highlight-color)}@supports (inset-inline-start: 0){.select-highlight{inset-inline-start:0}}@supports not (inset-inline-start: 0){.select-highlight{left:0}:host-context([dir=rtl]) .select-highlight{left:unset;right:unset;right:0}[dir=rtl] .select-highlight{left:unset;right:unset;right:0}@supports selector(:dir(rtl)){.select-highlight:dir(rtl){left:unset;right:unset;right:0}}}:host(.select-expanded) .select-highlight,:host(.ion-focused) .select-highlight{transform:scale(1)}:host(.in-item) .select-highlight{bottom:0}@supports (inset-inline-start: 0){:host(.in-item) .select-highlight{inset-inline-start:0}}@supports not (inset-inline-start: 0){:host(.in-item) .select-highlight{left:0}:host-context([dir=rtl]):host(.in-item) .select-highlight,:host-context([dir=rtl]).in-item .select-highlight{left:unset;right:unset;right:0}@supports selector(:dir(rtl)){:host(.in-item) .select-highlight:dir(rtl){left:unset;right:unset;right:0}}}:host(.select-expanded:not(.legacy-select)) .select-icon{transform:rotate(180deg)}:host(.select-expanded) .select-wrapper .select-icon,:host(.has-focus.ion-valid) .select-wrapper .select-icon,:host(.ion-touched.ion-invalid) .select-wrapper .select-icon,:host(.ion-focused) .select-wrapper .select-icon{color:var(--highlight-color)}:host-context(.item-label-stacked) .select-icon,:host-context(.item-label-floating:not(.item-fill-outline)) .select-icon,:host-context(.item-label-floating.item-fill-outline){transform:translate3d(0,  -9px,  0)}:host-context(.item-has-focus) .select-icon{transform:rotate(180deg)}:host-context(.item-has-focus.item-label-stacked) .select-icon,:host-context(.item-has-focus.item-label-floating:not(.item-fill-outline)) .select-icon{transform:translate3d(0,  -9px,  0) rotate(180deg)}:host(.select-shape-round){--border-radius:16px}:host(.select-label-placement-stacked) .native-wrapper,:host(.select-label-placement-floating) .native-wrapper{width:calc(100% - 13px - 4px)}:host(.select-disabled){opacity:0.38}";const z=class{constructor(l){e(this,l);this.ionChange=t(this,"ionChange",7);this.ionCancel=t(this,"ionCancel",7);this.ionDismiss=t(this,"ionDismiss",7);this.ionFocus=t(this,"ionFocus",7);this.ionBlur=t(this,"ionBlur",7);this.ionStyle=t(this,"ionStyle",7);this.inputId=`ion-sel-${L++}`;this.inheritedAttributes={};this.hasLoggedDeprecationWarning=false;this.onClick=e=>{this.setFocus();this.open(e)};this.onFocus=()=>{this.ionFocus.emit()};this.onBlur=()=>{this.ionBlur.emit()};this.isExpanded=false;this.cancelText="Cancel";this.color=undefined;this.compareWith=undefined;this.disabled=false;this.fill=undefined;this.interface="alert";this.interfaceOptions={};this.justify="space-between";this.label=undefined;this.labelPlacement="start";this.legacy=undefined;this.multiple=false;this.name=this.inputId;this.okText="OK";this.placeholder=undefined;this.selectedText=undefined;this.shape=undefined;this.value=undefined}styleChanged(){this.emitStyle()}setValue(e){this.value=e;this.ionChange.emit({value:e})}componentWillLoad(){this.inheritedAttributes=d(this.el,["aria-label"])}async connectedCallback(){const{el:e}=this;this.legacyFormController=c(e);this.updateOverlayOptions();this.emitStyle();this.mutationO=k(this.el,"ion-select-option",(async()=>{this.updateOverlayOptions();a(this)}))}disconnectedCallback(){if(this.mutationO){this.mutationO.disconnect();this.mutationO=undefined}}async open(e){if(this.disabled||this.isExpanded){return undefined}this.isExpanded=true;const t=this.overlay=await this.createOverlay(e);t.onDidDismiss().then((()=>{this.overlay=undefined;this.isExpanded=false;this.ionDismiss.emit();this.setFocus()}));await t.present();if(this.interface==="popover"){let e=this.childOpts.map((e=>e.value)).indexOf(this.value);e=e>-1?e:0;const l=t.querySelector(`.select-interface-option:nth-child(${e+1})`);if(l){p(l);const e=l.querySelector("ion-radio, ion-checkbox");if(e){e.focus()}}}return t}createOverlay(e){let t=this.interface;if(t==="action-sheet"&&this.multiple){console.warn(`Select interface cannot be "${t}" with a multi-value select. Using the "alert" interface instead.`);t="alert"}if(t==="popover"&&!e){console.warn(`Select interface cannot be a "${t}" without passing an event. Using the "alert" interface instead.`);t="alert"}if(t==="action-sheet"){return this.openActionSheet()}if(t==="popover"){return this.openPopover(e)}return this.openAlert()}updateOverlayOptions(){const e=this.overlay;if(!e){return}const t=this.childOpts;const l=this.value;switch(this.interface){case"action-sheet":e.buttons=this.createActionSheetButtons(t,l);break;case"popover":const i=e.querySelector("ion-select-popover");if(i){i.options=this.createPopoverOptions(t,l)}break;case"alert":const s=this.multiple?"checkbox":"radio";e.inputs=this.createAlertInputs(t,s,l);break}}createActionSheetButtons(e,t){const l=e.map((e=>{const l=O(e);const i=Array.from(e.classList).filter((e=>e!=="hydrated")).join(" ");const s=`${E} ${i}`;return{role:$(t,l,this.compareWith)?"selected":"",text:e.textContent,cssClass:s,handler:()=>{this.setValue(l)}}}));l.push({text:this.cancelText,role:"cancel",handler:()=>{this.ionCancel.emit()}});return l}createAlertInputs(e,t,l){const i=e.map((e=>{const i=O(e);const s=Array.from(e.classList).filter((e=>e!=="hydrated")).join(" ");const a=`${E} ${s}`;return{type:t,cssClass:a,label:e.textContent||"",value:i,checked:$(l,i,this.compareWith),disabled:e.disabled}}));return i}createPopoverOptions(e,t){const l=e.map((e=>{const l=O(e);const i=Array.from(e.classList).filter((e=>e!=="hydrated")).join(" ");const s=`${E} ${i}`;return{text:e.textContent||"",cssClass:s,value:l,checked:$(t,l,this.compareWith),disabled:e.disabled,handler:e=>{this.setValue(e);if(!this.multiple){this.close()}}}}));return l}async openPopover(e){const{fill:t,labelPlacement:l}=this;const i=this.interfaceOptions;const s=n(this);const a=s==="md"?false:true;const o=this.multiple;const r=this.value;let c=e;let d="auto";if(this.legacyFormController.hasLegacyControl()){const t=this.el.closest("ion-item");if(t&&(t.classList.contains("item-label-floating")||t.classList.contains("item-label-stacked"))){c=Object.assign(Object.assign({},e),{detail:{ionShadowTarget:t}});d="cover"}}else{const i=l==="floating"||l==="stacked";if(i||s==="md"&&t!==undefined){d="cover"}else{c=Object.assign(Object.assign({},e),{detail:{ionShadowTarget:this.nativeWrapperEl}})}}const p=Object.assign(Object.assign({mode:s,event:c,alignment:"center",size:d,showBackdrop:a},i),{component:"ion-select-popover",cssClass:["select-popover",i.cssClass],componentProps:{header:i.header,subHeader:i.subHeader,message:i.message,multiple:o,value:r,options:this.createPopoverOptions(this.childOpts,r)}});return m.create(p)}async openActionSheet(){const e=n(this);const t=this.interfaceOptions;const l=Object.assign(Object.assign({mode:e},t),{buttons:this.createActionSheetButtons(this.childOpts,this.value),cssClass:["select-action-sheet",t.cssClass]});return f.create(l)}async openAlert(){let e;let t;if(this.legacyFormController.hasLegacyControl()){e=this.getLabel();t=e?e.textContent:null}else{t=this.label}const l=this.interfaceOptions;const i=this.multiple?"checkbox":"radio";const s=n(this);const a=Object.assign(Object.assign({mode:s},l),{header:l.header?l.header:t,inputs:this.createAlertInputs(this.childOpts,i,this.value),buttons:[{text:this.cancelText,role:"cancel",handler:()=>{this.ionCancel.emit()}},{text:this.okText,handler:e=>{this.setValue(e)}}],cssClass:["select-alert",l.cssClass,this.multiple?"multiple-select-alert":"single-select-alert"]});return x.create(a)}close(){if(!this.overlay){return Promise.resolve(false)}return this.overlay.dismiss()}getLabel(){return h(this.el)}hasValue(){return this.getText()!==""}get childOpts(){return Array.from(this.el.querySelectorAll("ion-select-option"))}getText(){const e=this.selectedText;if(e!=null&&e!==""){return e}return T(this.childOpts,this.value,this.compareWith)}setFocus(){if(this.focusEl){this.focusEl.focus()}}emitStyle(){const{disabled:e}=this;const t={"interactive-disabled":e};if(this.legacyFormController.hasLegacyControl()){t["interactive"]=true;t["select"]=true;t["select-disabled"]=e;t["has-placeholder"]=this.placeholder!==undefined;t["has-value"]=this.hasValue();t["has-focus"]=this.isExpanded}this.ionStyle.emit(t)}renderLabel(){const{label:e}=this;if(e===undefined){return}return l("div",{class:"label-text-wrapper"},l("div",{class:"label-text"},this.label))}renderLabelContainer(){const e=n(this);const t=e==="md"&&this.fill==="outline";if(t){return[l("div",{class:"select-outline-container"},l("div",{class:"select-outline-start"}),l("div",{class:"select-outline-notch"},l("div",{class:"notch-spacer","aria-hidden":"true"},this.label)),l("div",{class:"select-outline-end"})),this.renderLabel()]}return this.renderLabel()}renderSelect(){const{disabled:e,el:t,isExpanded:s,labelPlacement:a,justify:o,placeholder:r,fill:c,shape:d,name:p,value:h}=this;const g=n(this);const u=a==="floating"||a==="stacked";const m=!u;const f=v(t)?"rtl":"ltr";const x=w("ion-item",this.el);const k=g==="md"&&c!=="outline"&&!x;b(true,t,p,A(h),e);return l(i,{onClick:this.onClick,class:y(this.color,{[g]:true,"in-item":x,"in-item-color":w("ion-item.ion-color",t),"select-disabled":e,"select-expanded":s,"has-value":this.hasValue(),"has-placeholder":r!==undefined,"ion-focusable":true,[`select-${f}`]:true,[`select-fill-${c}`]:c!==undefined,[`select-justify-${o}`]:m,[`select-shape-${d}`]:d!==undefined,[`select-label-placement-${a}`]:true})},l("label",{class:"select-wrapper",id:"select-label"},this.renderLabelContainer(),l("div",{class:"native-wrapper",ref:e=>this.nativeWrapperEl=e},this.renderSelectText(),!u&&this.renderSelectIcon(),this.renderListbox()),u&&this.renderSelectIcon(),k&&l("div",{class:"select-highlight"})))}renderLegacySelect(){if(!this.hasLoggedDeprecationWarning){u(`ion-select now requires providing a label with either the "label" property or the "aria-label" attribute. To migrate, remove any usage of "ion-label" and pass the label text to either the "label" property or the "aria-label" attribute.\n\nExample: <ion-select label="Favorite Color">...</ion-select>\nExample with aria-label: <ion-select aria-label="Favorite Color">...</ion-select>\n\nDevelopers can use the "legacy" property to continue using the legacy form markup. This property will be removed in an upcoming major release of Ionic where this form control will use the modern form markup.`,this.el);if(this.legacy){u(`ion-select is being used with the "legacy" property enabled which will forcibly enable the legacy form markup. This property will be removed in an upcoming major release of Ionic where this form control will use the modern form markup.\n    Developers can dismiss this warning by removing their usage of the "legacy" property and using the new select syntax.`,this.el)}this.hasLoggedDeprecationWarning=true}const{disabled:e,el:t,inputId:s,isExpanded:a,name:o,placeholder:r,value:c}=this;const d=n(this);const{labelText:p,labelId:h}=g(t,s);b(true,t,o,A(c),e);const m=this.getText();let f=m;if(f===""&&r!==undefined){f=r}const x=p!==undefined?f!==""?`${f}, ${p}`:p:f;return l(i,{onClick:this.onClick,role:"button","aria-haspopup":"listbox","aria-disabled":e?"true":null,"aria-label":x,class:{[d]:true,"in-item":w("ion-item",t),"in-item-color":w("ion-item.ion-color",t),"select-disabled":e,"select-expanded":a,"legacy-select":true}},this.renderSelectText(),this.renderSelectIcon(),l("label",{id:h},x),this.renderListbox())}renderSelectText(){const{placeholder:e}=this;const t=this.getText();let i=false;let s=t;if(s===""&&e!==undefined){s=e;i=true}const a={"select-text":true,"select-placeholder":i};const o=i?"placeholder":"text";return l("div",{"aria-hidden":"true",class:a,part:o},s)}renderSelectIcon(){const e=n(this);const t=e==="ios"?o:r;return l("ion-icon",{class:"select-icon",part:"icon","aria-hidden":"true",icon:t})}get ariaLabel(){var e;const{placeholder:t,label:l,el:i,inputId:s,inheritedAttributes:a}=this;const o=this.getText();const{labelText:r}=g(i,s);const n=(e=l!==null&&l!==void 0?l:a["aria-label"])!==null&&e!==void 0?e:r;let c=o;if(c===""&&t!==undefined){c=t}if(n!==undefined){c=c===""?n:`${n}, ${c}`}return c}renderListbox(){const{disabled:e,inputId:t,isExpanded:i}=this;return l("button",{disabled:e,id:t,"aria-label":this.ariaLabel,"aria-haspopup":"listbox","aria-expanded":`${i}`,onFocus:this.onFocus,onBlur:this.onBlur,ref:e=>this.focusEl=e})}render(){const{legacyFormController:e}=this;return e.hasLegacyControl()?this.renderLegacySelect():this.renderSelect()}get el(){return s(this)}static get watchers(){return{disabled:["styleChanged"],isExpanded:["styleChanged"],placeholder:["styleChanged"],value:["styleChanged"]}}};const $=(e,t,l)=>{if(e===undefined){return false}if(Array.isArray(e)){return e.some((e=>S(e,t,l)))}else{return S(e,t,l)}};const O=e=>{const t=e.value;return t===undefined?e.textContent||"":t};const A=e=>{if(e==null){return undefined}if(Array.isArray(e)){return e.join(",")}return e.toString()};const S=(e,t,l)=>{if(typeof l==="function"){return l(e,t)}else if(typeof l==="string"){return e[l]===t[l]}else{return Array.isArray(t)?t.includes(e):e===t}};const T=(e,t,l)=>{if(t===undefined){return""}if(Array.isArray(t)){return t.map((t=>I(e,t,l))).filter((e=>e!==null)).join(", ")}else{return I(e,t,l)||""}};const I=(e,t,l)=>{const i=e.find((e=>S(t,O(e),l)));return i?i.textContent:null};let L=0;const E="select-interface-option";z.style={ios:j,md:C};export{z as ion_select};
//# sourceMappingURL=p-60662ea5.entry.js.map