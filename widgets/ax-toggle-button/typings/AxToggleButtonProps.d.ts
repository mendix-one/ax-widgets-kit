/**
 * This file was generated from AxToggleButton.xml
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

export type SizeEnum = "small" | "medium" | "large";

export type OrientationEnum = "horizontal" | "vertical";

export interface OptionsPreviewType {
    optValue: string;
    optLabel: string;
}

export interface AxToggleButtonContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    valueAttr?: EditableValue<string>;
    options: OptionsType[];
    exclusive: boolean;
    disabled: boolean;
    fullWidth: boolean;
    color: ColorEnum;
    size: SizeEnum;
    orientation: OrientationEnum;
    onChange?: ActionValue;
}

export interface AxToggleButtonPreviewProps {
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
    options: OptionsPreviewType[];
    exclusive: boolean;
    disabled: boolean;
    fullWidth: boolean;
    color: ColorEnum;
    size: SizeEnum;
    orientation: OrientationEnum;
    onChange: {} | null;
}
