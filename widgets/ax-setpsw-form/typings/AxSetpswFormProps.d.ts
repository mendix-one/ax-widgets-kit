/**
 * This file was generated from AxSetpswForm.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue } from "mendix";

export interface AxSetpswFormContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    passwordAttr?: EditableValue<string>;
    onSubmit?: ActionValue;
    onNavigateSignIn?: ActionValue;
}

export interface AxSetpswFormPreviewProps {
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
    passwordAttr: string;
    onSubmit: {} | null;
    onNavigateSignIn: {} | null;
}
