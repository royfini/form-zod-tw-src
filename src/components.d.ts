/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface RfForm {
    }
    interface RfSelectOptions {
    }
}
declare global {
    interface HTMLRfFormElement extends Components.RfForm, HTMLStencilElement {
    }
    var HTMLRfFormElement: {
        prototype: HTMLRfFormElement;
        new (): HTMLRfFormElement;
    };
    interface HTMLRfSelectOptionsElement extends Components.RfSelectOptions, HTMLStencilElement {
    }
    var HTMLRfSelectOptionsElement: {
        prototype: HTMLRfSelectOptionsElement;
        new (): HTMLRfSelectOptionsElement;
    };
    interface HTMLElementTagNameMap {
        "rf-form": HTMLRfFormElement;
        "rf-select-options": HTMLRfSelectOptionsElement;
    }
}
declare namespace LocalJSX {
    interface RfForm {
    }
    interface RfSelectOptions {
    }
    interface IntrinsicElements {
        "rf-form": RfForm;
        "rf-select-options": RfSelectOptions;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "rf-form": LocalJSX.RfForm & JSXBase.HTMLAttributes<HTMLRfFormElement>;
            "rf-select-options": LocalJSX.RfSelectOptions & JSXBase.HTMLAttributes<HTMLRfSelectOptionsElement>;
        }
    }
}
