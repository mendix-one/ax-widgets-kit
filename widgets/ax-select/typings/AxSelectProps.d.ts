/**
 * This file was generated from AxSelect.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export interface OptionsType {
    optValue: string;
    optLabel?: DynamicValue<string>;
}

export type VariantEnum = "outlined" | "filled" | "standard";

export type SizeEnum = "small" | "medium";

export interface OptionsPreviewType {
    optValue: string;
    optLabel: string;
}

export interface AxSelectContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    valueAttr?: EditableValue<string>;
    label?: DynamicValue<string>;
    options: OptionsType[];
    variant: VariantEnum;
    size: SizeEnum;
    disabled: boolean;
    fullWidth: boolean;
    helperText?: DynamicValue<string>;
    onChange?: ActionValue;
}

export interface AxSelectPreviewProps {
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
    options: OptionsPreviewType[];
    variant: VariantEnum;
    size: SizeEnum;
    disabled: boolean;
    fullWidth: boolean;
    helperText: string;
    onChange: {} | null;
}
