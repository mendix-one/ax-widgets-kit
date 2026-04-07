/**
 * This file was generated from AxCheckbox.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export type ColorEnum = "primary" | "secondary" | "success" | "warning" | "error" | "info" | "default";

export type SizeEnum = "small" | "medium";

export interface AxCheckboxContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    checkedAttr?: EditableValue<boolean>;
    label?: DynamicValue<string>;
    color: ColorEnum;
    size: SizeEnum;
    disabled: boolean;
    onChange?: ActionValue;
}

export interface AxCheckboxPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    checkedAttr: string;
    label: string;
    color: ColorEnum;
    size: SizeEnum;
    disabled: boolean;
    onChange: {} | null;
}
