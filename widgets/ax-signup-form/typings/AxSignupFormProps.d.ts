/**
 * This file was generated from AxSignupForm.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue } from "mendix";

export interface AxSignupFormContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    fullNameAttr?: EditableValue<string>;
    emailAttr?: EditableValue<string>;
    passwordAttr?: EditableValue<string>;
    showSSO: boolean;
    onSubmit?: ActionValue;
    onNavigateSignIn?: ActionValue;
    onGoogleSSO?: ActionValue;
    onMicrosoftSSO?: ActionValue;
}

export interface AxSignupFormPreviewProps {
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
    fullNameAttr: string;
    emailAttr: string;
    passwordAttr: string;
    showSSO: boolean;
    onSubmit: {} | null;
    onNavigateSignIn: {} | null;
    onGoogleSSO: {} | null;
    onMicrosoftSSO: {} | null;
}
