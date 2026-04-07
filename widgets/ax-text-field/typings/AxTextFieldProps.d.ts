/**
 * This file was generated from AxTextField.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export type VariantEnum = "outlined" | "filled" | "standard";

export type SizeEnum = "small" | "medium";

export type InputTypeEnum = "text" | "email" | "password" | "number" | "tel" | "url";

export interface AxTextFieldContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    valueAttr?: EditableValue<string>;
    label?: DynamicValue<string>;
    placeholder?: DynamicValue<string>;
    helperText?: DynamicValue<string>;
    variant: VariantEnum;
    size: SizeEnum;
    fullWidth: boolean;
    inputType: InputTypeEnum;
    multiline: boolean;
    rows: number;
    maxRows: number;
    required: boolean;
    onChange?: ActionValue;
}

export interface AxTextFieldPreviewProps {
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
    valueAttr: string;
    label: string;
    placeholder: string;
    helperText: string;
    variant: VariantEnum;
    size: SizeEnum;
    fullWidth: boolean;
    inputType: InputTypeEnum;
    multiline: boolean;
    rows: number | null;
    maxRows: number | null;
    required: boolean;
    onChange: {} | null;
}
