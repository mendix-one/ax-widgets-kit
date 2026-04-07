/**
 * This file was generated from AxRadioGroup.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export interface OptionsType {
    optValue: string;
    optLabel?: DynamicValue<string>;
}

export type ColorEnum = "primary" | "secondary" | "success" | "warning" | "error" | "info";

export type SizeEnum = "small" | "medium";

export interface OptionsPreviewType {
    optValue: string;
    optLabel: string;
}

export interface AxRadioGroupContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    valueAttr?: EditableValue<string>;
    label?: DynamicValue<string>;
    options: OptionsType[];
    row: boolean;
    color: ColorEnum;
    size: SizeEnum;
    disabled: boolean;
    onChange?: ActionValue;
}

export interface AxRadioGroupPreviewProps {
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
    row: boolean;
    color: ColorEnum;
    size: SizeEnum;
    disabled: boolean;
    onChange: {} | null;
}
